// api/feedback/index.ts (or .js)
export const prerender = false;

import type { APIRoute } from "astro";
import sanitizeHtml from "sanitize-html";
import emailTemplate from "../../email_templates/email_template";
import { Resend } from "resend";

// Simple in-memory rate limiting store
// For production, use Redis or a database
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

// Rate limit configuration
const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 3, // Max 3 submissions per IP in the window
  COOLDOWN_MS: 60 * 1000, // 1 minute cooldown after hitting limit
};

// Helper function to get client IP from request
function getClientIP(request: Request): string {
  // Check for Cloudflare headers
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP;
  
  // Check for forwarded headers
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  
  // Check for real IP
  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP;
  
  // Fallback to a placeholder (should not happen in production)
  return "unknown";
}

// Helper function to check rate limit
function checkRateLimit(ip: string): { allowed: boolean; waitTime?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record) {
    // First request from this IP
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return { allowed: true };
  }
  
  // Check if window has expired
  if (now - record.timestamp > RATE_LIMIT.WINDOW_MS) {
    // Reset the window
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return { allowed: true };
  }
  
  // Check if within rate limit
  if (record.count < RATE_LIMIT.MAX_REQUESTS) {
    // Increment count
    record.count++;
    rateLimitStore.set(ip, record);
    return { allowed: true };
  }
  
  // Rate limit exceeded, calculate wait time
  const timeSinceFirst = now - record.timestamp;
  const waitTime = RATE_LIMIT.WINDOW_MS - timeSinceFirst;
  
  return { allowed: false, waitTime: Math.ceil(waitTime / 1000) };
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now - record.timestamp > RATE_LIMIT.WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 60 * 1000); // Clean up every hour

// Simple spam detection
function isSpam(name: string, email: string, message: string): boolean {
  const spamKeywords = [
    // Common spam terms
    "casino", "viagra", "cialis", "poker", "lottery", "bitcoin", 
    "crypto", "forex", "loan", "mortgage", "pharmacy", "porn",
    // Multiple links
    "http://", "https://", "www.",
    // Excessive special characters
    /[!@#$%^&*()]{5,}/,
    // All caps messages
    /^[A-Z\s]{20,}$/,
  ];
  
  const combinedText = `${name} ${email} ${message}`.toLowerCase();
  
  // Check for spam keywords
  for (const keyword of spamKeywords) {
    if (typeof keyword === "string") {
      if (combinedText.includes(keyword)) return true;
    } else if (keyword.test(combinedText)) {
      return true;
    }
  }
  
  // Check for too many links
  const urlCount = (combinedText.match(/https?:\/\//g) || []).length;
  if (urlCount > 2) return true;
  
  // Check for suspicious email patterns
  const suspiciousEmails = [
    /^\d{10,}@/, // Phone number as email
    /\.ru$/, // Russian domains
    /\.cn$/, // Chinese domains
    /mailinator\.com/, // Temporary email services
    /tempmail/, // Temporary email services
  ];
  
  for (const pattern of suspiciousEmails) {
    if (pattern.test(email.toLowerCase())) return true;
  }
  
  // Check for repeated characters (like "helllllllooooo")
  if (/(.)\1{10,}/.test(message)) return true;
  
  // Check for message length (too short or too long)
  if (message.length < 5) return true; // Too short
  if (message.length > 5000) return true; // Too long
  
  return false;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    
    // Check rate limit
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({
          success: false,
          notice: `Too many submissions. Please wait ${rateLimit.waitTime} seconds before trying again.`,
        }),
        { status: 429 } // Too Many Requests
      );
    }
    
    // Add a small delay to prevent rapid-fire requests (500ms)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const data = await request.formData();

    const name = sanitizeHtml(String(data.get("name") || ""));
    const phone = sanitizeHtml(String(data.get("phone") || ""));
    const email = sanitizeHtml(String(data.get("email") || ""));
    const message = sanitizeHtml(String(data.get("message") || ""));

    // Log received data for debugging
    console.log("Form submission received:", { name, email, phone, message, ip: clientIP });

    // Spam detection
    if (isSpam(name, email, message)) {
      console.warn(`Spam detected from IP: ${clientIP}`);
      // Return success to not alert spammers, but don't actually send
      return new Response(
        JSON.stringify({
          success: true,
          notice: "Your message was sent. Thank you!",
        }),
        { status: 200 }
      );
    }

    const errors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    /* VALIDATION */
    if (!name.trim()) errors.name = "Please enter a name.";
    if (!email.trim()) errors.email = "Please enter an email.";
    if (!phone.trim()) errors.phone = "Please enter a phone number.";
    if (!message.trim()) errors.message = "Please enter a message.";
    
    // Email format validation
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    
    // Phone number validation (basic)
    const phoneDigits = phone.replace(/\D/g, "");
    if (phone.trim() && phoneDigits.length < 10) {
      errors.phone = "Please enter a valid phone number with area code.";
    }

    if (errors.name || errors.email || errors.phone || errors.message) {
      console.log("Validation errors:", errors);
      return new Response(
        JSON.stringify({
          success: false,
          notice: "Please fix the errors below.",
          issues: errors,
        }),
        { status: 400 }
      );
    }

    // Check if environment variables exist
    if (!import.meta.env.RESEND_API) {
      console.error("RESEND_API environment variable is not set");
      return new Response(
        JSON.stringify({
          success: false,
          notice: "Server configuration error. Please contact support.",
        }),
        { status: 500 }
      );
    }

    if (!import.meta.env.EMAIL_USER) {
      console.error("EMAIL_USER environment variable is not set");
      return new Response(
        JSON.stringify({
          success: false,
          notice: "Server configuration error. Please contact support.",
        }),
        { status: 500 }
      );
    }

    const resend = new Resend(import.meta.env.RESEND_API);

    console.log("Attempting to send email with Resend...");
    
    const result = await resend.emails.send({
      from: `Cascadia Custom Framing <${import.meta.env.EMAIL_USER}>`,
      to: "brian@ridgeform.us",
      subject: "Inquiry for Cascadia Custom Framing",
      html: emailTemplate({ name, email, phone, message }),
    });

    console.log("Email sent successfully:", result);

    return new Response(
      JSON.stringify({
        success: true,
        notice: "Your message was sent. Thank you!",
      }),
      { status: 200 }
    );

  } catch (err) {
    // This will catch any errors from Resend or other parts
    console.error("Detailed email error:", err);
    
    // Check if it's a Resend-specific error
    if (err instanceof Error) {
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        notice: "Failed to send email. Please try again later or call us directly.",
        error: import.meta.env.DEV ? err.message : undefined, // Only show error details in development
      }),
      { status: 500 }
    );
  }
};  