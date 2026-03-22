# Multi-stage build - smaller final image
FROM node:20-alpine AS builder

# Install Bun
RUN apk add --no-cache curl
RUN curl -fsSL https://bun.sh/install | bash
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install
COPY . .
RUN bun run build

# Final stage - smaller image
FROM node:20-alpine

# Install Bun for runtime
RUN apk add --no-cache curl
RUN curl -fsSL https://bun.sh/install | bash
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb ./

# Install only production dependencies
RUN bun install --production

ENV NODE_ENV=production
EXPOSE 3999

CMD ["bun", "./dist/server/entry.mjs"]