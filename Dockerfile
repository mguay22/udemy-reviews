FROM node:lts AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Step 2: Production Stage
FROM node:lts-slim AS production

# Set the working directory
WORKDIR /app

# Copy the built files and node_modules from the builder stage
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

# Set environment variables
ENV NODE_ENV=production

# Run the application in production mode
CMD ["node", "dist/main.js"]
