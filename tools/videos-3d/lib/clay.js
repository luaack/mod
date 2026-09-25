import * as THREE from 'three';
import { mulberry32 } from './anim.js';

// Textura de ruído fractal: dá a superfície irregular de massinha (bump) sem imagem externa.
const cache = {};
function noiseCanvas(seed = 7) {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);
  const rand = mulberry32(seed);
  for (const [n, a] of [[8, 0.35], [16, 0.3], [32, 0.25], [64, 0.2], [128, 0.16], [256, 0.12], [512, 0.08]]) {
    const s = document.createElement('canvas');
    s.width = s.height = n;
    const sx = s.getContext('2d');
    const d = sx.createImageData(n, n);
    for (let i = 0; i < n * n; i++) {
      const v = rand() * 255;
      d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v;
      d.data[i * 4 + 3] = 255;
    }
    sx.putImageData(d, 0, 0);
    ctx.globalAlpha = a;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(s, 0, 0, size, size);
  }
  return c;
}

export function noiseTexture(repeat = 1, seed = 7) {
  const key = `${repeat}-${seed}`;
  if (cache[key]) return cache[key];
  const tex = new THREE.CanvasTexture(noiseCanvas(seed));
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.colorSpace = THREE.NoColorSpace;
  cache[key] = tex;
  return tex;
}

// Material de massinha: fosco, com leve "veludo" (sheen) e micro-relevo.
export function clay(color, { rough = 0.72, bump = 1.2, sheen = 0.35, repeat = 1, seed = 7, ...rest } = {}) {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: rough,
    metalness: 0,
    sheen,
    sheenRoughness: 0.75,
    sheenColor: new THREE.Color('#ffffff'),
    bumpMap: noiseTexture(repeat, seed),
    bumpScale: bump,
    ...rest,
  });
}
