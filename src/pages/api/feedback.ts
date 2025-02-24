export const prerender = false;
import type { APIRoute } from 'astro'
import sanitizeHtml from 'sanitize-html';
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
        // GETS DATA
        const data = await request.formData();

        let name = sanitizeHtml(String(data.get("name")));
        let phone_number = sanitizeHtml(String(data.get("phone")));
        let email = sanitizeHtml(String(data.get("email")));
        let message = sanitizeHtml(String(data.get("message")));
        const errors = {name: "", email: "", phone_number: "", message: ""}  

        // VALIDATES
        if(typeof name !== "string" || name.length < 1) {
            errors.name += "Please enter a name.";
        }
        if(typeof email !== "string" || email.length < 1) {
            errors.email += "Please enter a a valid email.";
        }
        if(typeof phone_number !== "string" || phone_number.length < 1) {
            errors.phone_number += "Please enter a a valid email.";
        }
        if(typeof message !== "string" || message.length < 1) {
            errors.message += "Please enter a message.";
        }

        if(errors.name || errors.email || errors.message) {
            return new Response(
                JSON.stringify(
                    {notice: "error", issues: errors}
                ),
                { status: 400 }
            )
        } else {
            // WRITE EMAIL HERE
            const transporter = nodemailer.createTransport({
                host: "",
                port: 587,
                secure: false,
                auth: {
                    user: "",
                    pass: "",
                },
                tls: {
                    rejectUnathorized: false,
                },
            });

            async function main() {
                const info = await transporter.sendMail({
                    from: `bot@cascadiacustomframing.com`,
                    to: `info@cascadiacustomframing.com`,
                    subject: `${name} sent a message from cascadiacustomframing.com`,
                    text: `Phone Number: ${phone_number} Email: ${email} The message: ${message}`,
                    html: `<p>Phone Number: ${phone_number} <br><br> Email: ${email} <br><br> Message: ${message}</p>`
                })

                console.log("message: ", info.messageId);
            }

            main().catch(console.error)


            return new Response(
                JSON.stringify({
                    notice: "Your message was sent. Thank you.",
                    success: true,
                }),
                { status: 200 }
            )
        }
}
