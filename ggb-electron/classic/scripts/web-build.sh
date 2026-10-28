#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
APP_DIR="$ROOT/ggb-electron/classic/war"
WAR_DIR="$ROOT/source/web/web/war"

echo "==> Compilation"
cd "$ROOT"
./gradlew -p source/web :web:gwtCompile :web:deployIntoWar

if [[ ! -f "$WAR_DIR/classic.html" ]]; then
  echo "Error: $WAR_DIR/classic.html not found." >&2
  exit 1
fi

echo "==> Copying Web Resources in Electron"
mkdir -p "$APP_DIR"
rsync -a --delete "$WAR_DIR/" "$APP_DIR"

echo "==> Done"
