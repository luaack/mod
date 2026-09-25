#!/bin/bash
# Junta os quadros em WebM + MP4 (com grão leve e vinheta) e gera o poster JPG.
# uso: ./encode.sh <nome> <pasta-de-quadros> [fps] [crf-mp4] [crf-webm]
set -e
FF=${FFMPEG:-ffmpeg}
NAME=$1; DIR=$2; FPS=${3:-15}; CRF264=${4:-20}; CRFVP9=${5:-31}
OUT=${OUT:-../../client/public/videos}
mkdir -p "$OUT"
VF="noise=alls=5:allf=t+u,vignette=angle=0.32,format=yuv420p"
$FF -hide_banner -loglevel error -y -framerate $FPS -i "$DIR/f_%04d.png" -vf "$VF" -c:v libvpx-vp9 -b:v 0 -crf $CRFVP9 -row-mt 1 -deadline good -cpu-used 2 -an "$OUT/$NAME.webm"
$FF -hide_banner -loglevel error -y -framerate $FPS -i "$DIR/f_%04d.png" -vf "$VF" -c:v libx264 -crf $CRF264 -preset slow -movflags +faststart -an "$OUT/$NAME.mp4"
$FF -hide_banner -loglevel error -y -i "$DIR/f_0000.png" -vf "vignette=angle=0.32" -q:v 4 "$OUT/$NAME.jpg"
ls -la "$OUT/$NAME".*
