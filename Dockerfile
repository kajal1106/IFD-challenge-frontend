# Stage 1: Build stage
FROM node:18 as builder

# Set working directory for the build stage
WORKDIR /ui

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the project
RUN npm run build

# Stage 2: Production stage
FROM nginx:1.19.0

# Set working directory for the production stage
WORKDIR /usr/share/nginx/html

# Remove existing files in the production directory
RUN rm -rf ./*

# Copy the built files from the build stage to the production directory
COPY --from=builder /ui/build .

# Set the entrypoint command to start Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]