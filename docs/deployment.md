# Deployment

This document lives under `docs/` as part of the repo structure cleanup.

This repo publishes a Docker image to GitHub Container Registry and deploys that image to an Azure-hosted VPS.

## Image Publishing

Workflow:
- [.github/workflows/publish-image.yml](../.github/workflows/publish-image.yml)

Published image format:
```text
ghcr.io/<github-owner>/<repo-name>:latest
```

Other tags produced by the workflow:
- branch tag
- commit SHA tag

For VPS deployment that pulls from GHCR instead of building locally, use [deploy/compose.yml](../deploy/compose.yml).

## Linux VPS Deployment

Workflow:
- [.github/workflows/deploy-linux-vps.yml](../.github/workflows/deploy-linux-vps.yml)

This workflow:
- runs after `Publish Docker Image` succeeds on `main`
- can also run manually via `workflow_dispatch`
- copies the deploy assets from this repo to the VPS before executing them

Files copied to the VPS:
- `deploy/compose.yml`
- `deploy/deploy.sh`

The deploy script receives:
- image tag
- image name (`<github-owner>/<repo-name>` in lowercase)
- container registry (`ghcr.io`)
- app root on the VPS

Reference script:
- [deploy/deploy.sh](../deploy/deploy.sh)

The workflow passes these positional arguments to the script:
```text
<image_tag> <image_name> <registry> <app_root>
```

`deploy/compose.yml` uses the resolved image reference:
```text
${IMAGE_REFERENCE}
```

The deploy script exports these values for Compose:
- `IMAGE_REFERENCE`
- `COMPOSE_PROJECT_NAME` (defaults to `personal-portfolio`)
- `APP_PORT` (defaults to `3000`)

If your GHCR package is private, set these environment variables in `deploy/.env` on the VPS so the script can log in before pulling:
- `GHCR_USERNAME`
- `GHCR_TOKEN`

Optional `deploy/.env` values:
- `COMPOSE_PROJECT_NAME`
- `APP_PORT`

Required repository variables:
- `VPS_HOST`
- `VPS_USER`
- `VPS_APP_PATH`

Optional repository variable:
- `VPS_PORT` (defaults to `22`)

Required repository secret:
- `VPS_SSH_PRIVATE_KEY`

Optional repository secret:
- `VPS_SSH_PASSPHRASE` (required when `VPS_SSH_PRIVATE_KEY` is encrypted)
## Deployment Flow

1. Push to `main`.
2. GitHub publishes the Docker image to GHCR.
3. The VPS deploy workflow runs after the publish workflow succeeds.
4. GitHub copies the deploy assets to the VPS and starts the requested image with Docker Compose.

You can also run the deploy workflow manually and provide an exact image tag.

## Useful Checks

List published container packages:
```bash
gh api /users/<github-username>/packages?package_type=container
```

List versions for one image:
```bash
gh api /users/<github-username>/packages/container/<image-name>/versions
```

For organization-owned packages, replace `/users/` with `/orgs/`.

## Notes

- If you keep the API bound to `127.0.0.1`, direct host access to port `3001` is not expected.
- This is fine for the VPS deployment because only port `3000` needs to be public.
