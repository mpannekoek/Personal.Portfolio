# Personal Portfolio

This repository contains:

- `src/web/`: a Next.js frontend
- `src/api/`: a minimal Express API
- `docs/`: project and deployment documentation
- `Dockerfile`: a single image that runs both services in one container

## Local Structure

Frontend:
- [src/web/package.json](src/web/package.json)

API:
- [src/api/package.json](src/api/package.json)
- [src/api/server.js](src/api/server.js)

Container startup:
- [Dockerfile](Dockerfile)
- [scripts/docker-entrypoint.sh](scripts/docker-entrypoint.sh)
- [docs/deployment.md](docs/deployment.md)

## Running Locally

Install dependencies:

```bash
cd src/web
npm install

cd ../api
npm install
```

Run the API:

```bash
cd src/api
npm run dev
```

Run the web app:

```bash
cd src/web
npm run dev
```

Default ports:
- web: `3000`
- api: `3001`

## Docker

Build the image:

```bash
docker build -t personal-portfolio .
```

Run the container:

```bash
docker run -p 3000:3000 -p 3001:3001 personal-portfolio
```

Notes:
- the public app runs on `3000`
- the API listens internally on `127.0.0.1:3001`
- the web app proxies `/api/*` to the API

## Deployment

Deployment instructions are documented in [docs/deployment.md](docs/deployment.md).

That includes:
- publishing the image to GitHub Container Registry
- deploying the image to Azure App Service
- required GitHub secrets and variables

## GitHub Workflows

Image publish workflow:
- [.github/workflows/publish-image.yml](.github/workflows/publish-image.yml)

Azure deploy workflow:
- [.github/workflows/deploy-azure.yml](.github/workflows/deploy-azure.yml)
