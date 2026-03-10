# Personal Portfolio

This repository contains:

- `src/web/`: a Next.js frontend
- `src/api/`: a minimal Express API
- `docs/`: project and deployment documentation
- `Dockerfile`: a single image that runs both services in one container

## Local Structure

Frontend:
- [src/web/package.json](/home/martijn/dev/projects/personal/Personal.Portfolio/src/web/package.json)

API:
- [src/api/package.json](/home/martijn/dev/projects/personal/Personal.Portfolio/src/api/package.json)
- [src/api/server.js](/home/martijn/dev/projects/personal/Personal.Portfolio/src/api/server.js)

Container startup:
- [Dockerfile](/home/martijn/dev/projects/personal/Personal.Portfolio/Dockerfile)
- [scripts/docker-entrypoint.sh](/home/martijn/dev/projects/personal/Personal.Portfolio/scripts/docker-entrypoint.sh)
- [docs/deployment.md](/home/martijn/dev/projects/personal/Personal.Portfolio/docs/deployment.md)

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

Deployment instructions are documented in [docs/deployment.md](/home/martijn/dev/projects/personal/Personal.Portfolio/docs/deployment.md).

That includes:
- publishing the image to GitHub Container Registry
- deploying the image to Azure App Service
- required GitHub secrets and variables

## GitHub Workflows

Image publish workflow:
- [.github/workflows/publish-image.yml](/home/martijn/dev/projects/personal/Personal.Portfolio/.github/workflows/publish-image.yml)

Azure deploy workflow:
- [.github/workflows/deploy-azure.yml](/home/martijn/dev/projects/personal/Personal.Portfolio/.github/workflows/deploy-azure.yml)
