FROM nginx:alpine

# Remove default configuration and use ours
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
