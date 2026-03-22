# Use Node Alpine as base for better compatibility
FROM node:20-alpine

# Install dependencies for Bun and curl
RUN apk add --no-cache curl bash git

# Install Bun via official script
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy dependency files first for caching
COPY package.json bun.lockb* ./

# Install dependencies with Bun
RUN bun install

# Set production environment
ENV NODE_ENV=production

# Copy the rest of the application
COPY . .

# Build the app with Bun
RUN bun run build

# Expose the port (Railway will use PORT env var)
EXPOSE 3999

# Run the app with Bun
CMD ["bun", "run", "start"]