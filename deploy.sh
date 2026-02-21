#!/usr/bin/env bash
set -Eeuo pipefail

BRANCH="${DEPLOY_BRANCH:-master}"
REMOTE="${DEPLOY_REMOTE:-origin}"
HOST_PORT="${HOST_PORT:-8080}"
SITE_BASE="${SITE_BASE:-/}"
SITE_URL="${SITE_URL:-http://localhost:${HOST_PORT}}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yml}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: '$1' is not installed or not in PATH." >&2
    exit 1
  fi
}

require_cmd git
require_cmd docker

if ! docker info >/dev/null 2>&1; then
  echo "Error: Docker daemon is not running." >&2
  exit 1
fi

cd "$SCRIPT_DIR"

if [[ ! -d .git ]]; then
  echo "Error: deploy.sh must be run from inside the git repository root." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Error: Working tree is not clean. Commit/stash changes before deploy." >&2
  exit 1
fi

echo "==> Fetching latest '${BRANCH}' from '${REMOTE}'..."
git fetch "$REMOTE" "$BRANCH"

if git show-ref --verify --quiet "refs/heads/${BRANCH}"; then
  git checkout "$BRANCH"
else
  git checkout -b "$BRANCH" "${REMOTE}/${BRANCH}"
fi

echo "==> Pulling latest changes..."
git pull --ff-only "$REMOTE" "$BRANCH"

if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "Error: '${COMPOSE_FILE}' not found." >&2
  exit 1
fi

export HOST_PORT SITE_BASE SITE_URL

echo "==> Building and starting containers..."
docker compose -f "$COMPOSE_FILE" up -d --build --remove-orphans

echo "==> Container status:"
docker compose -f "$COMPOSE_FILE" ps

echo
echo "Deployment completed."
echo "App should be available at: http://<SERVER_IP>:${HOST_PORT}"
