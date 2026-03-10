FROM node:24.14.0-bookworm AS client-deps

WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci

FROM node:24.14.0-bookworm AS client-builder

WORKDIR /app/client
COPY --from=client-deps /app/client/node_modules ./node_modules
COPY client ./
RUN npm run build

FROM node:24.14.0-bookworm AS client-prod-deps

WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --omit=dev

FROM node:24.14.0-bookworm AS api-prod-deps

WORKDIR /app/api
COPY api/package*.json ./
RUN npm ci --omit=dev

FROM node:24.14.0-bookworm AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001
ENV API_ORIGIN=http://127.0.0.1:3001

COPY --from=client-prod-deps /app/client/node_modules ./client/node_modules
COPY --from=client-builder /app/client/.next ./client/.next
COPY --from=client-builder /app/client/public ./client/public
COPY --from=client-builder /app/client/package.json ./client/package.json
COPY --from=client-builder /app/client/next.config.mjs ./client/next.config.mjs

COPY --from=api-prod-deps /app/api/node_modules ./api/node_modules
COPY api/package.json ./api/package.json
COPY api/server.js ./api/server.js

COPY docker/start.sh ./docker/start.sh
RUN chmod +x /app/docker/start.sh

EXPOSE 3000 3001

CMD ["/app/docker/start.sh"]
