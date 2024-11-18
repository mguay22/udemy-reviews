# Step 1: Builder Stage
FROM node:lts AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install all dependencies (including dev dependencies) using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Step 2: Production Stage
FROM node:lts-slim AS production

# Set the working directory
WORKDIR /app

# Copy only the built files and production dependencies from the builder stage
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml

# Set environment variables
ENV NODE_ENV=production

# Install only production dependencies in the production stage
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Run the application in production mode
CMD ["node", "dist/main.js"]
