FROM node:16-slim as build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps && npm run build:production

FROM nginx:1.17.1-alpine as release
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/front-pa-al /usr/share/nginx/html
EXPOSE 80