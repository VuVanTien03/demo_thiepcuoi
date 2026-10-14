# ==========================================
# Stage 1: Build Vite React App
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

# Copy source code and assets
COPY . .

# Build production bundle
RUN npm run build

# ==========================================
# Stage 2: Serve with Nginx Alpine (Ultra Lightweight & Fast)
# ==========================================
FROM nginx:alpine

# Copy custom nginx configuration for SPA & caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built production assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
