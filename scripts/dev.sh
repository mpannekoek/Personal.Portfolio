#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_DIR="$ROOT_DIR/src/api"
WEB_DIR="$ROOT_DIR/src/web"

for app_dir in "$API_DIR" "$WEB_DIR"; do
  if [[ ! -d "$app_dir/node_modules" ]]; then
    printf 'Missing dependencies in %s\n' "$app_dir" >&2
    printf 'Run npm install in both src/api and src/web before starting.\n' >&2
    exit 1
  fi
done

cleanup() {
  trap - INT TERM EXIT

  if [[ -n "${api_pid:-}" ]]; then
    kill "$api_pid" 2>/dev/null || true
  fi

  if [[ -n "${web_pid:-}" ]]; then
    kill "$web_pid" 2>/dev/null || true
  fi

  wait "${api_pid:-}" "${web_pid:-}" 2>/dev/null || true
}

trap cleanup INT TERM EXIT

printf 'Starting API on http://localhost:3001\n'
npm --prefix "$API_DIR" run dev &
api_pid=$!

printf 'Starting web on http://localhost:3000\n'
npm --prefix "$WEB_DIR" run dev &
web_pid=$!

wait "$api_pid" "$web_pid"
