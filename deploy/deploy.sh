#!/usr/bin/env bash

# This script is meant to run on the VPS.
# Its job is to:
# 1. figure out which image should be deployed,
# 2. load optional deploy settings from deploy/.env,
# 3. check that Docker and the Compose file exist,
# 4. optionally log in to GHCR,
# 5. ask Docker Compose to pull and start the container.

# Fail fast:
# -e: stop when a command fails
# -u: stop when an unset variable is used
# -o pipefail: fail a pipeline when any command fails
set -euo pipefail

# Print a small help message when the script is called with --help
# or when the required arguments are missing.
usage() {
  cat <<'EOF'
Usage: deploy.sh <image-tag> <image-name> <registry> [app-root]

Optional runtime configuration can be loaded from deploy/.env on the VPS.
Supported env vars:
  COMPOSE_PROJECT_NAME
  APP_PORT
  GHCR_USERNAME
  GHCR_TOKEN
EOF
}

# Support common help flags for people running the script manually.
if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  usage
  exit 0
fi

# We need at least:
# 1. the image tag to deploy
# 2. the image name in the registry
# 3. the registry hostname
if [ "$#" -lt 3 ]; then
  usage >&2
  exit 1
fi

# Positional arguments:
# - IMAGE_TAG: the tag to deploy, for example `sha-abc1234`
# - IMAGE_NAME: the image path in the registry
# - REGISTRY: usually `ghcr.io`
IMAGE_TAG="$1"
IMAGE_NAME="$2"
REGISTRY="$3"

# APP_ROOT is optional.
# If it is not passed in, we infer it from the current script location:
# deploy/deploy.sh -> go one folder up -> app root
APP_ROOT="${4:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
DEPLOY_DIR="${APP_ROOT}/deploy"
COMPOSE_FILE="${DEPLOY_DIR}/compose.yml"
ENV_FILE="${DEPLOY_DIR}/.env"

# This becomes the full image name Docker should pull.
# Example: ghcr.io/example/personal.portfolio:sha-abc1234
IMAGE_REFERENCE="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"

# Deployment cannot continue without Docker itself.
if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required on the VPS." >&2
  exit 1
fi

# Prefer the modern `docker compose` command.
# Fall back to the older standalone `docker-compose` binary when needed.
if docker compose version >/dev/null 2>&1; then
  DOCKER_COMPOSE=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE=(docker-compose)
else
  echo "docker compose is required on the VPS." >&2
  exit 1
fi

# The workflow copies the compose file to the VPS before running this script.
# If the file is missing, deployment should stop immediately.
if [ ! -f "${COMPOSE_FILE}" ]; then
  echo "Compose file not found at ${COMPOSE_FILE}." >&2
  exit 1
fi

# Load extra settings from deploy/.env when that file exists.
# `set -a` means variables loaded from the file are automatically exported,
# so Docker Compose can read them later.
if [ -f "${ENV_FILE}" ]; then
  set -a
  # shellcheck disable=SC1090
  . "${ENV_FILE}"
  set +a
fi

# Provide sensible defaults when deploy/.env does not define them.
COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-personal-portfolio}"
APP_PORT="${APP_PORT:-3000}"

# Export values so the compose file can interpolate them.
export IMAGE_REFERENCE
export COMPOSE_PROJECT_NAME
export APP_PORT

# Optional registry login.
# This is useful when GHCR is private and the VPS must authenticate first.
# If GHCR_USERNAME or GHCR_TOKEN is missing, we skip the login step.
if [ -n "${GHCR_USERNAME:-}" ] && [ -n "${GHCR_TOKEN:-}" ]; then
  printf '%s' "${GHCR_TOKEN}" | docker login "${REGISTRY}" --username "${GHCR_USERNAME}" --password-stdin
fi

# 1. `config` validates that the compose file resolves correctly.
# 2. `pull` downloads the requested image tag.
# 3. `up -d --remove-orphans` starts or updates the app in the background.
# 4. `ps` prints the final container state as a quick deployment summary.
"${DOCKER_COMPOSE[@]}" --project-directory "${APP_ROOT}" -f "${COMPOSE_FILE}" config >/dev/null
"${DOCKER_COMPOSE[@]}" --project-directory "${APP_ROOT}" -f "${COMPOSE_FILE}" pull
"${DOCKER_COMPOSE[@]}" --project-directory "${APP_ROOT}" -f "${COMPOSE_FILE}" up -d --remove-orphans
"${DOCKER_COMPOSE[@]}" --project-directory "${APP_ROOT}" -f "${COMPOSE_FILE}" ps
