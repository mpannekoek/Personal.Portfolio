#!/bin/sh
set -eu

cd /app/src/api
npm start &
api_pid=$!

cd /app/src/web
node server.js &
client_pid=$!

cleanup() {
  kill "$api_pid" "$client_pid" 2>/dev/null || true
}

trap cleanup INT TERM

wait "$api_pid" "$client_pid"
