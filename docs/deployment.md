# Deployment

This document lives under `docs/` as part of the repo structure cleanup.

This repo publishes a Docker image to GitHub Container Registry and can deploy that image to Azure App Service.

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

For a VPS deployment that pulls from GHCR instead of building locally, use [deploy/compose.yml](../deploy/compose.yml).

## Azure VPS Deployment

Workflow:
- [.github/workflows/deploy-azure-vps.yml](../.github/workflows/deploy-azure-vps.yml)

This workflow uses the same trigger behavior as the Azure App Service deploy workflow:
- runs after `Publish Docker Image` succeeds on `main`
- can also run manually via `workflow_dispatch`

The deploy job opens an SSH session and runs a deploy script on the VPS.
The script receives:
- image tag
- image name (`<github-owner>/<repo-name>` in lowercase)
- container registry (`ghcr.io`)

Reference script:
- [deploy/deploy.sh](../deploy/deploy.sh)

The workflow passes these positional arguments to the script:
```text
<image_tag> <image_name> <registry>
```

`deploy/compose.yml` uses environment variable interpolation for the image:
```text
${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
```
with defaults when variables are not set.

If your GHCR package is private, set these environment variables on the VPS so the script can run `docker login` before pulling:
- `GHCR_USERNAME`
- `GHCR_PAT`

Required repository variables:
- `VPS_HOST`
- `VPS_USER`
- `VPS_DEPLOY_SCRIPT_PATH`

Optional repository variable:
- `VPS_PORT` (defaults to `22`)

Required repository secret:
- `VPS_SSH_PRIVATE_KEY`

## Azure Deployment

Workflow:
- [.github/workflows/deploy-azure.yml](../.github/workflows/deploy-azure.yml)

This workflow expects an existing Azure App Service for Linux that runs a custom container.

The container exposed to Azure is:
- Next.js on port `3000`

The internal API stays inside the same container on:
- `127.0.0.1:3001`

Required App Service setting:
```text
WEBSITES_PORT=3000
```

## GitHub Repository Variables

Add these repository variables:

- `AZURE_WEBAPP_NAME`
- `AZURE_RESOURCE_GROUP`

## GitHub Repository Secrets

Add these Azure secrets for OIDC login:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

If the GHCR package is private, also add:

- `GHCR_USERNAME`
- `GHCR_PAT`

`GHCR_PAT` should have at least:
- `read:packages`

## Azure OIDC Setup

Create an Azure Entra application or service principal and federate it with this GitHub repository.

The identity needs permission on the target resource group or web app to:
- update App Service container configuration
- update App Service app settings

Typical role:
- `Contributor`

## Deployment Flow

1. Push to `main`.
2. GitHub publishes the Docker image to GHCR.
3. The Azure deploy workflow runs after the publish workflow succeeds.
4. Azure App Service is updated to use the new image.

You can also run the deploy workflow manually and provide a specific image tag.

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
- This is fine for Azure App Service because only port `3000` needs to be public.
