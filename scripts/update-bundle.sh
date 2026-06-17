#!/bin/bash
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
VALIDARE_DIR="$(cd "$REPO_ROOT/../validare" && pwd)"

echo "Building validare..."
(cd "$VALIDARE_DIR" && npm run build)

echo "Copying UMD bundle..."
cp "$VALIDARE_DIR/dist/index.umd.js" "$REPO_ROOT/public/validare.umd.js"

echo "Done. validare.umd.js updated."
