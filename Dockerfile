# NOTE: Edit the package.json file before doing Docker builds and change the serve, build and lint scripts
# Build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY lib/d11-boot-api-*.tgz /app/lib/
# This Python thing is needed now for some reason
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install
COPY . .
RUN npm run build

# Production stage
# x86
# FROM nginx:stable-alpine as production-stage
# m1
FROM arm64v8/nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./docker /
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]