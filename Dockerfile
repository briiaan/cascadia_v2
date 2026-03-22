FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Build
RUN npm run build

# Railway sets PORT automatically
ENV NODE_ENV=production

# Railway will override with its PORT environment variable
CMD ["npm", "run", "start"]