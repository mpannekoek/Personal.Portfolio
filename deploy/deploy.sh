#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <image_tag> <image_name> <registry>" >&2
  exit 1
fi

IMAGE_TAG="$1"
IMAGE_NAME="$2"
REGISTRY="$3"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="${SCRIPT_DIR}/compose.yml"
IMAGE_REF="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required but not installed." >&2
  exit 1
fi

if [ ! -f "${COMPOSE_FILE}" ]; then
  echo "Missing compose file: ${COMPOSE_FILE}" >&2
  exit 1
fi

# Optional: authenticate to GHCR when credentials are provided.
if [ -n "${GHCR_USERNAME:-}" ] && [ -n "${GHCR_PAT:-}" ]; then
  printf '%s' "${GHCR_PAT}" | docker login "${REGISTRY}" -u "${GHCR_USERNAME}" --password-stdin
fi

echo "Deploying ${IMAGE_REF}"
IMAGE_TAG="${IMAGE_TAG}" IMAGE_NAME="${IMAGE_NAME}" REGISTRY="${REGISTRY}" \
  docker compose -f "${COMPOSE_FILE}" down
docker pull "${IMAGE_REF}"
IMAGE_TAG="${IMAGE_TAG}" IMAGE_NAME="${IMAGE_NAME}" REGISTRY="${REGISTRY}" \
  docker compose -f "${COMPOSE_FILE}" up -d

echo "Deployment finished."
