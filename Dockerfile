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

# Expose port (if needed for health checks or other purposes)
EXPOSE 3000

# Start the application in development mode
CMD ["pnpm", "dev"]


# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Copy built application
COPY --from=development --chown=coinbot:nodejs /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S coinbot -u 1001

# Change ownership of the app directory to the non-root user
RUN chown -R coinbot:nodejs /app
USER coinbot

# Expose port (if needed for health checks or other purposes)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]