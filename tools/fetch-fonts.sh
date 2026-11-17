#!/usr/bin/env bash
# Downloads the variable Saira fonts (SIL Open Font License) that saira_build.py reads.
# Run from the repository root: bash tools/fetch-fonts.sh
set -euo pipefail
mkdir -p tools/fonts
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
CSS=$(curl -fsS -A "$UA" "https://fonts.googleapis.com/css2?family=Saira:ital,wdth,wght@0,50..125,100..900;1,50..125,100..900&display=swap")
url_for() { # $1 = normal | italic ; prints the latin-subset woff2 URL
  printf '%s\n' "$CSS" | awk -v style="$1" '
    /\/\* latin \*\// { want = 1; next }
    /\/\*/ { want = 0 }
    want && /font-style:/ { ok = ($0 ~ style) }
    want && ok && /src:/ { match($0, /https:[^)]+/); print substr($0, RSTART, RLENGTH); exit }'
}
curl -fsS -o tools/fonts/saira.woff2 "$(url_for normal)"
curl -fsS -o tools/fonts/saira-italic.woff2 "$(url_for italic)"
ls -l tools/fonts
