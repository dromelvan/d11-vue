# Stage 1: Use a lightweight Node.js image for copying files
FROM node:14-alpine AS copyFiles
WORKDIR /app

# Copy the pre-built artifacts into the container
COPY dist/ .

# Stage 2: Serve the Vue.js application using Nginx
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Copy conf file to enable client side routing
COPY ./docker /

# Copy the pre-built artifacts from the previous stage
COPY --from=copyFiles /app .

# Expose the port that Nginx will run on
EXPOSE 80
