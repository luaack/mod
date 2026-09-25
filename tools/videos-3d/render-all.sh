#!/bin/bash
# Renderiza e codifica todos os vídeos do site (leva uns 40–60 min sem GPU).
set -e
cd "$(dirname "$0")"
run() { node render.mjs "$1" "$2" "$3" 15 "$4" "out/$5" "$6" && ./encode.sh "$5" "out/$5" 15 "$7" "$8"; }
run atrair 1000 1000 8 atrair "" 20 31
run converter 1000 1000 8 converter "" 20 31
run presenca 1000 1000 8 presenca "" 20 31
run crescer 1000 1000 8 crescer "" 20 31
run hero 1920 960 10 hero "" 23 33
run hero 900 1600 10 hero-mobile mobile 23 33
run sistema 1920 840 10 sistema "" 22 33
run final 1920 1080 8 final "" 23 33
