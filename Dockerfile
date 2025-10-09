# ===========================
# Stage 1: Build the Astro app
# ===========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package and lock files first for caching
COPY package*.json ./
RUN npm ci

# Copy everything else and build the project
COPY . .
RUN npm run build

# ===========================
# Stage 2: Run the built app
# ===========================
FROM node:20-alpine AS runner

WORKDIR /app

# Copy the built app and node_modules from the builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the same port as in astro.config.mjs
EXPOSE 3999

# Environment variables (optional fallback)
ENV PORT=3999
ENV NODE_ENV=production

# Start the Astro server
CMD ["node", "./dist/server/entry.mjs"]
