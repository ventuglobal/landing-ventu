FROM nginx:1.27-alpine

# The official image runs envsubst over /etc/nginx/templates/*.template at
# startup, which is how ${PORT} from Railway reaches the server block.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

COPY index.html suppliers.html drivers.html styles.css main.js ventu-logo.png \
     /usr/share/nginx/html/

# Local default; Railway injects its own PORT.
ENV PORT=8080
# Substitute ONLY ${PORT}, so nginx runtime vars like $uri survive envsubst.
ENV NGINX_ENVSUBST_FILTER=PORT
EXPOSE 8080
