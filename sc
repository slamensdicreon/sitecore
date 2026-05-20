#!/usr/bin/env bash
# Wrapper for `dotnet sitecore` that pins to the nix-store dotnet 8 binary
# so the CLI works even when nix PATH is missing from the shell.
set -euo pipefail
export DOTNET_CLI_TELEMETRY_OPTOUT=1
export DOTNET_NOLOGO=1
DOTNET_BIN="$(ls -d /nix/store/*dotnet-sdk-8*/bin/dotnet 2>/dev/null | head -1)"
if [[ -z "$DOTNET_BIN" ]]; then
  echo "dotnet 8 SDK not found in /nix/store" >&2
  exit 127
fi
cd "$(dirname "$0")"
exec "$DOTNET_BIN" sitecore "$@"
