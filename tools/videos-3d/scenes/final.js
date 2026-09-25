import * as THREE from 'three';
import { V, ball, squash, curvedTrough, shadowed } from '../lib/parts.js';
import { clay } from '../lib/clay.js';
import { seg, easeIn, easeOut, bump, TAU, lerp, mulberry32 } from '../lib/anim.js';

export const T = 8;

function skyTexture(stops) {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 512);
  stops.forEach(([o, col]) => g.addColorStop(o, col));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 4, 512);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function tree(h, color) {
  const g = new THREE.Group();
  const prof = [];
  const r = h * 0.34;
  for (let i = 0; i <= 20; i++) {
    const u = i / 20;
    const rad = r * Math.sin(Math.min(1, (1 - u) * 1.12) * Math.PI * 0.5) * (u < 0.08 ? 0.5 + u * 6 : 1);
    prof.push(new THREE.Vector2(Math.max(0.001, rad), u * h));
  }
  const crown = shadowed(new THREE.Mesh(new THREE.LatheGeometry(prof, 28), clay(color, { rough: 0.8 })));
  crown.position.y = h * 0.16;
  const trunk = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.06 * h, 0.07 * h, h * 0.3, 10), clay('#7a5236')));
  trunk.position.y = h * 0.1;
  g.add(trunk, crown);
  return g;
}

function hill(color, sx, sy, sz, seed) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 48), clay(color, { rough: 0.95, sheen: 0.15, bump: 1.4, repeat: 10, seed }));
  m.scale.set(sx, sy, sz);
  m.receiveShadow = true;
  return m;
}

export function build(studio) {
  const { scene, camera, key, hemi, fill } = studio;
  scene.background = skyTexture([
    [0, '#ffffff'],
    [0.3, '#ffffff'],
    [0.55, '#eefaf3'],
    [1, '#e3f5ea'],
  ]);
  scene.environmentIntensity = 0.4;
  hemi.color.set('#ffffff');
  hemi.groundColor.set('#4d8a5c');
  hemi.intensity = 0.9;
  key.intensity = 2.5;
  key.position.set(-8, 18, 12);
  key.target.position.set(0, 0, 0);
  Object.assign(key.shadow.camera, { left: -20, right: 20, top: 16, bottom: -16, far: 70 });
  key.shadow.camera.updateProjectionMatrix();
  key.shadow.radius = 5;
  fill.intensity = 0.35;

  camera.fov = 34;
  camera.position.set(0, 8.5, 24);
  camera.lookAt(0, 1.2, 0);
  camera.updateProjectionMatrix();

  // colinas e árvores
  [
    [-15, -3.2, -18, 16, 7.4, 8, '#8ccf9d', 41],
    [4, -3.6, -22, 20, 8.2, 8, '#94d3a4', 42],
    [20, -3.2, -16, 14, 7.0, 8, '#86ca98', 43],
  ].forEach(([x, y, z, sx, sy, sz, c, seed]) => {
    const h = hill(c, sx, sy, sz, seed);
    h.position.set(x, y, z);
    scene.add(h);
  });
  const midHill = hill('#47a466', 26, 6.2, 11, 44);
  midHill.position.set(-3, -3.9, -5);
  scene.add(midHill);
  const midHill2 = hill('#4aa869', 18, 5.6, 10, 45);
  midHill2.position.set(15, -3.6, -4);
  scene.add(midHill2);
  const ground = hill('#3f9a5d', 60, 3, 30, 46);
  ground.position.set(0, -2.6, 8);
  scene.add(ground);
  const trees = [];
  [
    [-17, 1.4, -10, 2.2, '#1f7a4b'], [-14.6, 1.8, -12, 1.8, '#23804f'], [-19.5, 1.0, -8, 2.5, '#2c8c58'],
    [12, 1.9, -12, 1.9, '#1f7a4b'], [14.5, 1.5, -9, 2.4, '#23804f'], [17.5, 1.2, -10, 2.0, '#2c8c58'],
    [-8, 3.2, -18, 1.5, '#2c8c58'], [7, 3.4, -20, 1.6, '#23804f'], [-2, 3.6, -22, 1.3, '#1f7a4b'],
  ].forEach(([x, y, z, h, c]) => {
    const t = tree(h, c);
    t.position.set(x, y - 0.4, z);
    scene.add(t);
    trees.push(t);
  });

  // túnel escuro na colina e escorregador azul
  const tunnelRing = shadowed(new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.22, 16, 40), clay('#2f5f3f', { rough: 0.9 })));
  tunnelRing.position.set(-9.2, 2.85, -3.1);
  tunnelRing.rotation.y = 0.5;
  const tunnelHole = new THREE.Mesh(new THREE.CircleGeometry(0.72, 40), new THREE.MeshBasicMaterial({ color: '#141814' }));
  tunnelHole.position.copy(tunnelRing.position).add(V(0.01, 0, 0.02));
  tunnelHole.rotation.y = 0.5;
  scene.add(tunnelRing, tunnelHole);
  const slideCurve = new THREE.CatmullRomCurve3([
    V(-8.95, 2.55, -2.45),
    V(-8.2, 2.35, -1.0),
    V(-9.0, 1.98, 0.4),
    V(-7.8, 1.58, 1.6),
    V(-6.3, 1.3, 2.5),
    V(-5.0, 1.18, 3.1),
  ], false, 'centripetal', 0.5);
  const slide = curvedTrough(slideCurve, { R: 0.52, r: 0.4, color: '#3f7bff' });
  scene.add(slide.mesh);

  // túnel de anéis coloridos
  const rings = new THREE.Group();
  [['#2fb5d0', 1.25, 0.28], ['#ff8a3d', 0.92, 0.26], ['#ffd23f', 0.6, 0.24]].forEach(([c, r, tube], i) => {
    const m = shadowed(new THREE.Mesh(new THREE.TorusGeometry(r, tube, 18, 56), clay(c, { rough: 0.55 })));
    m.position.z = i * 0.12;
    rings.add(m);
  });
  rings.position.set(1.2, 1.95, -1.8);
  scene.add(rings);

  // piscina de bolinhas: borda + ~1100 bolinhas instanciadas
  const cx = 1.0, cz = 4.2, RX = 9.2, RZ = 4.4;
  const rim = shadowed(new THREE.Mesh(new THREE.TorusGeometry(1, 0.1, 16, 120), clay('#f3e6cf', { rough: 0.7 })));
  rim.rotation.x = Math.PI / 2;
  rim.scale.set(RX + 0.2, RZ + 0.2, 3.5);
  rim.position.set(cx, 0.35, cz);
  scene.add(rim);
  const COLORS = ['#ff4d6d', '#ffd23f', '#3d8bff', '#4fd17a', '#ff8a3d', '#b56cff', '#2fd0e0', '#ff5fc1'];
  const rand = mulberry32(1234);
  const BR = 0.26;
  const items = [];
  for (let layer = 0; layer < 3; layer++) {
    for (let i = 0; i < 700; i++) {
      const a = rand() * TAU;
      const d = Math.sqrt(rand());
      const x = cx + Math.cos(a) * d * (RX - 0.3);
      const z = cz + Math.sin(a) * d * (RZ - 0.3);
      const mound = (1 - d * d) * 0.9;
      const y = 0.2 + layer * 0.34 + mound * (layer / 2) + rand() * 0.08;
      if (layer === 2 && d > 0.85) continue;
      items.push({ x, y, z, c: Math.floor(rand() * COLORS.length), ph: rand() * TAU, amp: 0.03 + rand() * 0.05 });
    }
  }
  const pit = new THREE.InstancedMesh(new THREE.SphereGeometry(BR, 16, 11), clay('#ffffff', { rough: 0.5, sheen: 0.4 }), items.length);
  pit.castShadow = true;
  pit.receiveShadow = true;
  const col = new THREE.Color();
  items.forEach((it, i) => pit.setColorAt(i, col.set(COLORS[it.c])));
  scene.add(pit);
  const m4 = new THREE.Matrix4();

  // bolinhas descendo o escorregador e saindo dos anéis
  const sliders = [0, 1, 2, 3].map((k) => {
    const b = ball(COLORS[(k * 3) % COLORS.length], 0.28);
    scene.add(b);
    return b;
  });
  const hoppers = [0, 1].map((k) => {
    const b = ball(COLORS[(k * 5 + 1) % COLORS.length], 0.28);
    scene.add(b);
    return b;
  });

  return (t) => {
    const w = (TAU * t) / T;
    trees.forEach((tr, i) => (tr.rotation.z = Math.sin(w * 2 + i) * 0.03));
    rings.rotation.z = Math.sin(w) * 0.05;

    // as bolinhas da piscina "respiram"
    let splash = 0;
    sliders.forEach((b, k) => {
      const u = (((t + k * 2) % T) + T) % T / 4; // 4s por descida, 4 bolinhas defasadas em 2s
      if (u > 1) {
        b.visible = false;
        return;
      }
      b.visible = true;
      squash(b, 0);
      if (u < 0.75) {
        const p = easeIn(seg(u, 0, 0.75)) * 0.7 + seg(u, 0, 0.75) * 0.3;
        b.position.copy(slide.pointAt(p, 0.28));
      } else {
        const p = seg(u, 0.75, 1);
        const from = slide.pointAt(1, 0.28);
        const to = V(-1.4 + k * 0.4, 0.95, 3.8);
        b.position.set(lerp(from.x, to.x, p), lerp(from.y, to.y, p) + Math.sin(p * Math.PI) * 0.8 - p * p * 0.4, lerp(from.z, to.z, p));
        splash = Math.max(splash, bump(p, 0.8, 1));
      }
    });
    hoppers.forEach((b, k) => {
      const u = (((t + k * 4 + 1) % T) + T) % T / 2.2;
      b.visible = u < 1;
      if (!b.visible) return;
      const from = rings.position.clone().add(V(0, 0, 0.5));
      const to = V(2.5 + k * 1.2, 0.95, 3.2);
      b.position.set(lerp(from.x, to.x, u), lerp(from.y, to.y, u) + Math.sin(u * Math.PI) * 1.3, lerp(from.z, to.z, u));
      squash(b, 0);
    });
    items.forEach((it, i) => {
      const y = it.y + Math.sin(w * 2 + it.ph) * it.amp + splash * 0.06 * Math.exp(-((it.x + 1) ** 2 + (it.z - 3.8) ** 2) / 4);
      m4.makeTranslation(it.x, y, it.z);
      pit.setMatrixAt(i, m4);
    });
    pit.instanceMatrix.needsUpdate = true;
  };
}
