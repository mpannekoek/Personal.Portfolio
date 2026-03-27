#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_DIR="$ROOT_DIR/src/api"
WEB_DIR="$ROOT_DIR/src/web"

npm install --prefix "$API_DIR"
npm install --prefix "$WEB_DIR"

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
