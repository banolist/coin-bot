# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY src/ ./src/
COPY tsconfig.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S coinbot -u 1001

# Change ownership of the app directory to the non-root user
RUN chown -R coinbot:nodejs /app
USER coinbot

RUN pnpm build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN apk --no-cache add ca-certificates curl && \
  update-ca-certificates 

RUN npm install -g pnpm && \
  pnpm install --prod

COPY --from=development /app/dist ./dist

RUN addgroup -g 1001 -S nodejs
RUN adduser -S coinbot -u 1001

# Change ownership of the app directory to the non-root user
RUN chown -R coinbot:nodejs /app
USER coinbot

ENV NODE_ENV=production 

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Start the application
CMD ["node", "dist/main.js"]
