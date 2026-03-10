# Personal Portfolio

This repository contains:

- `client/`: a Next.js frontend
- `api/`: a minimal Express API
- `Dockerfile`: a single image that runs both services in one container

## Local Structure

Frontend:
- [client/package.json](/home/martijn/dev/projects/personal/Personal.Portfolio/client/package.json)

API:
- [api/package.json](/home/martijn/dev/projects/personal/Personal.Portfolio/api/package.json)
- [api/server.js](/home/martijn/dev/projects/personal/Personal.Portfolio/api/server.js)

Container startup:
- [Dockerfile](/home/martijn/dev/projects/personal/Personal.Portfolio/Dockerfile)
- [docker/start.sh](/home/martijn/dev/projects/personal/Personal.Portfolio/docker/start.sh)

## Running Locally

Install dependencies:

```bash
cd client
npm install

cd ../api
npm install
```

Run the API:

```bash
cd api
npm run dev
```

Run the client:

```bash
cd client
npm run dev
```

Default ports:
- client: `3000`
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
- the client proxies `/api/*` to the API

## Deployment

Deployment instructions are documented in [DEPLOYMENT.md](/home/martijn/dev/projects/personal/Personal.Portfolio/DEPLOYMENT.md).

That includes:
- publishing the image to GitHub Container Registry
- deploying the image to Azure App Service
- required GitHub secrets and variables

## GitHub Workflows

Image publish workflow:
- [.github/workflows/publish-image.yml](/home/martijn/dev/projects/personal/Personal.Portfolio/.github/workflows/publish-image.yml)

Azure deploy workflow:
- [.github/workflows/deploy-azure.yml](/home/martijn/dev/projects/personal/Personal.Portfolio/.github/workflows/deploy-azure.yml)
