FROM node:22-alpine

WORKDIR /app

# Dependencies first so a copy-only change does not reinstall them.
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund

COPY server.js ./
COPY index.html suppliers.html drivers.html styles.css main.js ./
COPY ventu-logo.png clickbox-logo.png ./

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
