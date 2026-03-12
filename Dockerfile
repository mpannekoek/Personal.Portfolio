FROM node:24.14.0-bookworm AS web-deps

WORKDIR /app/src/web
COPY src/web/package*.json ./
RUN npm ci

FROM node:24.14.0-bookworm AS web-builder

WORKDIR /app/src/web
COPY --from=web-deps /app/src/web/node_modules ./node_modules
COPY src/web ./
RUN npm run build

FROM node:24.14.0-bookworm AS web-prod-deps

WORKDIR /app/src/web
COPY src/web/package*.json ./
RUN npm ci --omit=dev

FROM node:24.14.0-bookworm AS api-deps

WORKDIR /app/src/api
COPY src/api/package*.json ./
RUN npm ci

FROM node:24.14.0-bookworm AS api-builder

WORKDIR /app/src/api
COPY --from=api-deps /app/src/api/node_modules ./node_modules
COPY src/api ./
RUN npm run build

FROM node:24.14.0-bookworm AS api-prod-deps

WORKDIR /app/src/api
COPY src/api/package*.json ./
RUN npm ci --omit=dev

FROM node:24.14.0-bookworm AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001
ENV API_ORIGIN=http://127.0.0.1:3001

COPY --from=web-prod-deps /app/src/web/node_modules ./src/web/node_modules
COPY --from=web-builder /app/src/web/.next ./src/web/.next
COPY --from=web-builder /app/src/web/public ./src/web/public
COPY --from=web-builder /app/src/web/package.json ./src/web/package.json
COPY --from=web-builder /app/src/web/next.config.mjs ./src/web/next.config.mjs

COPY --from=api-prod-deps /app/src/api/node_modules ./src/api/node_modules
COPY --from=api-builder /app/src/api/dist ./src/api/dist
COPY --from=api-builder /app/src/api/package.json ./src/api/package.json

COPY scripts/docker-entrypoint.sh ./scripts/docker-entrypoint.sh
RUN chmod +x /app/scripts/docker-entrypoint.sh

EXPOSE 3000 3001

CMD ["/app/scripts/docker-entrypoint.sh"]
