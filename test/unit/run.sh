#!/bin/sh
# Unit tests: randomised equivalence of the optimised engine against the original algorithm,
# plus regression scenarios. Needs node; bundles with esbuild via npx.
set -e
cd "$(dirname "$0")/../.."
for t in regressions equivalence; do
  npx --yes esbuild "test/unit/$t.test.ts" --bundle --platform=node --format=cjs \
    --banner:js="globalThis.window=globalThis;" --outfile="/tmp/auto-entities-$t.cjs" --log-level=error
  node "/tmp/auto-entities-$t.cjs"
done
