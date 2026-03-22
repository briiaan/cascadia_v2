FROM node:20-alpine

WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN npm install

# Build
RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "run", "start"]