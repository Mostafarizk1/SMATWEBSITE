#!/usr/bin/env bash
# Sum gzipped JS each prerendered page loads (module scripts only; noModule polyfills excluded).
cd "$(dirname "$0")/.."
for p in "$@"; do
  f=".next/server/app/$p.html"; tot=0; n=0
  for s in $(grep -o '<script[^>]*src="/_next/static/[^"]*\.js"[^>]*>' "$f" | grep -v noModule | grep -o 'src="[^"]*"' | sed 's/src="//;s/"$//' | sort -u); do
    tot=$((tot + $(gzip -9 -c ".next${s#/_next}" | wc -c))); n=$((n+1))
  done
  echo "/$p: $n scripts, $((tot/1024)) KB gzipped"
done
