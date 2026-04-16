#!/bin/sh
set -eu

cd /app/src/api
PORT=3001 npm start &
api_pid=$!

cd /app/src/web
PORT=3000 node server.js &
client_pid=$!

cleanup() {
  kill "$api_pid" "$client_pid" 2>/dev/null || true
}

trap cleanup INT TERM

wait "$api_pid" "$client_pid"
