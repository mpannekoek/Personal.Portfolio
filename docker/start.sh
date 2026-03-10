#!/bin/sh
set -eu

cd /app/api
npm start &
api_pid=$!

cd /app/client
npm start &
client_pid=$!

cleanup() {
  kill "$api_pid" "$client_pid" 2>/dev/null || true
}

trap cleanup INT TERM

wait "$api_pid" "$client_pid"
