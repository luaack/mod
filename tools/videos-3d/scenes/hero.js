import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { V, trough, ball, squash, funnel, rollBall, shadowed } from '../lib/parts.js';
import { clay } from '../lib/clay.js';
import { seg, easeIn, easeOut, easeInOut, easeOutBack, bump, damped, arc, TAU, lerp, mulberry32 } from '../lib/anim.js';

export const T = 10;

const rbox = (w, h, d, r, color, opts) => shadowed(new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 5, r), clay(color, opts)));

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

function tree(h = 2.2, color = '#1f7a4b') {
  const g = new THREE.Group();
  const prof = [];
  const r = h * 0.36;
  for (let i = 0; i <= 24; i++) {
    const u = i / 24;
    // perfil de cone gordinho com ponta arredondada
    const rad = r * Math.pow(Math.sin(Math.min(1, (1 - u) * 1.15) * Math.PI * 0.5), 0.9) * (u < 0.08 ? u / 0.08 * 0.6 + 0.4 : 1);
    prof.push(new THREE.Vector2(Math.max(0.001, rad * (1 - u * 0.15)), u * h));
  }
  const crown = shadowed(new THREE.Mesh(new THREE.LatheGeometry(prof, 32), clay(color, { rough: 0.8 })));
  crown.position.y = h * 0.18;
  const trunk = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.1 * h * 0.5, 0.12 * h * 0.5, h * 0.3, 12), clay('#7a5236')));
  trunk.position.y = h * 0.1;
  g.add(trunk, crown);
  return g;
}

function cloud(seed = 1) {
  const g = new THREE.Group();
  const rand = mulberry32(seed);
  const mat = clay('#ffffff', { rough: 0.9, sheen: 0.2, bump: 0.6 });
  const n = 5 + Math.floor(rand() * 3);
  for (let i = 0; i < n; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), mat);
    const r = 0.8 + rand() * 0.9;
    s.scale.set(r * 1.2, r * 0.75, r);
    s.position.set((i - n / 2) * 1.1 + rand() * 0.4, rand() * 0.5, rand() * 0.6);
    g.add(s);
  }
  return g;
}

function phone() {
  const g = new THREE.Group();
  const body = rbox(1.7, 3.1, 0.32, 0.28, '#3f6fe8', { rough: 0.5 });
  const screen = rbox(1.42, 2.72, 0.1, 0.16, '#eef7ff', { rough: 0.4, sheen: 0.1 });
  screen.position.z = 0.15;
  const ad = rbox(1.1, 0.9, 0.08, 0.1, '#ffb68a', { rough: 0.5 });
  ad.position.set(0, 0.72, 0.21);
  const btn = rbox(0.7, 0.2, 0.08, 0.08, '#1d1d24', { rough: 0.5 });
  btn.position.set(0, 0.12, 0.22);
  g.add(body, screen, ad, btn);
  const bubbleCols = ['#c6e85a', '#ff9a5c', '#c6e85a'];
  const bubbles = bubbleCols.map((c, i) => {
    const b = rbox(0.78, 0.26, 0.08, 0.12, c, { rough: 0.5 });
    b.position.set(i % 2 ? 0.14 : -0.14, -0.35 - i * 0.36, 0.22);
    g.add(b);
    return b;
  });
  const heart = new THREE.Group();
  const hm = clay('#ff4d6d', { rough: 0.5 });
  const lobeA = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 14), hm));
  const lobeB = lobeA.clone();
  lobeA.position.set(-0.14, 0.05, 0);
  lobeB.position.set(0.14, 0.05, 0);
  const tip = shadowed(new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.42, 20), hm));
  tip.rotation.z = Math.PI;
  tip.position.y = -0.17;
  heart.add(lobeA, lobeB, tip);
  g.add(heart);
  g.userData = { bubbles, heart };
  return g;
}

function shop() {
  const g = new THREE.Group();
  const body = rbox(3.4, 2.2, 2.2, 0.25, '#f3e6cf', { rough: 0.75 });
  body.position.y = 1.1;
  g.add(body);
  // toldo listrado inclinado, com babados na frente
  const n = 7, w = 3.7 / n;
  for (let i = 0; i < n; i++) {
    const col = i % 2 ? '#ffffff' : '#e8412f';
    const stripe = rbox(w * 0.99, 0.12, 1.25, 0.05, col, { rough: 0.6 });
    stripe.rotation.x = 0.55;
    stripe.position.set(-3.7 / 2 + w / 2 + i * w, 2.3, 1.2);
    const scallop = shadowed(new THREE.Mesh(new THREE.SphereGeometry(w / 2, 20, 12, 0, TAU, Math.PI / 2, Math.PI / 2), clay(col, { rough: 0.6, side: THREE.DoubleSide })));
    scallop.scale.set(1, 0.7, 0.5);
    scallop.position.set(-3.7 / 2 + w / 2 + i * w, 2.0, 1.73);
    g.add(stripe, scallop);
  }
  const door = rbox(0.8, 1.35, 0.14, 0.12, '#3f6fe8', { rough: 0.5 });
  door.position.set(-0.75, 0.68, 1.1);
  const knob = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), clay('#ffd84a')));
  knob.position.set(-0.5, 0.68, 1.2);
  const win = rbox(1.2, 0.9, 0.12, 0.12, '#9fdcf5', { rough: 0.2, sheen: 0 });
  win.position.set(0.72, 1.05, 1.1);
  g.add(door, knob, win);
  ['#ff6a2b', '#c6e85a', '#ff5fc1'].forEach((c, i) => {
    const s = ball(c, 0.13);
    s.position.set(0.4 + i * 0.32, 0.78, 1.12);
    g.add(s);
  });
  const sign = rbox(1.7, 0.5, 0.3, 0.22, '#27b3a6', { rough: 0.5 });
  sign.position.set(0, 2.62, 0.4);
  g.add(sign);
  g.userData = { door, doorPos: V(-0.75, 0.5, 1.25) };
  return g;
}

function deliveryBox() {
  const g = new THREE.Group();
  const col = '#d9a066';
  const body = rbox(2.1, 1.4, 1.7, 0.14, col, { rough: 0.85 });
  body.position.y = 0.7;
  g.add(body);
  const inner = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.05, 1.4), clay('#7a5130', { rough: 1 }));
  inner.position.y = 1.39;
  g.add(inner);
  const flaps = [];
  [
    [0, 1.4, 0.85, 2.0, 0.6, 1, 'x', 1],
    [0, 1.4, -0.85, 2.0, 0.6, 1, 'x', -1],
    [1.05, 1.4, 0, 1.6, 0.6, 1, 'z', -1],
    [-1.05, 1.4, 0, 1.6, 0.6, 1, 'z', 1],
  ].forEach(([x, y, z, len, depth, , axis, sgn]) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, y, z);
    const flap = rbox(axis === 'x' ? len : depth, 0.07, axis === 'x' ? depth : len, 0.03, col, { rough: 0.85 });
    if (axis === 'x') flap.position.set(0, 0, (sgn * depth) / 2);
    else flap.position.set((-sgn * depth) / 2, 0, 0);
    pivot.add(flap);
    pivot.userData = { axis, sgn };
    g.add(pivot);
    flaps.push(pivot);
  });
  g.userData = { flaps, mouth: V(0, 1.45, 0) };
  return g;
}

function hill(color, sx, sy, sz, seed = 3) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 48), clay(color, { rough: 0.95, sheen: 0.15, bump: 1.4, repeat: 10, seed }));
  m.scale.set(sx, sy, sz);
  m.receiveShadow = true;
  return m;
}

export function build(studio, { variant }) {
  const mobile = variant === 'mobile';
  const { scene, camera, key, hemi, fill } = studio;
  const X = mobile ? 0.5 : 1; // no celular os objetos ficam mais juntos (o site corta as laterais do vídeo)
  const P = mobile ? { phone: -3.7, shop: -1.25, box: 1.55, chart: 3.85 } : { phone: -7.4, shop: -2.3, box: 3.8, chart: 9.4 };

  scene.background = skyTexture([
    [0, '#5cc9df'],
    [0.45, '#9ee6ef'],
    [0.7, '#d4f6f1'],
    [1, '#e9fbf4'],
  ]);
  scene.environmentIntensity = 0.35;
  hemi.color.set('#e6f8ff');
  hemi.groundColor.set('#3f7d50');
  hemi.intensity = 0.8;
  key.intensity = 2.3;
  key.position.set(-10, 20, 14);
  key.target.position.set(0, 2, 0);
  Object.assign(key.shadow.camera, { left: -20, right: 20, top: 20, bottom: -20, far: 80 });
  key.shadow.camera.updateProjectionMatrix();
  key.shadow.radius = 6;
  fill.intensity = 0.3;

  const lookBase = mobile ? V(0, -3.7, 0) : V(0, 1.45, 0);
  if (mobile) {
    camera.fov = 52;
    camera.position.set(0, 6.2, 25);
  } else {
    camera.fov = 30;
    camera.position.set(0, 5.5, 22);
  }
  camera.lookAt(lookBase);
  camera.updateProjectionMatrix();

  // colinas: fundo claro, meio médio, frente escura (onde fica o título)
  const back = [
    [-17, -3.0, -24, 15, 7.0, 8, '#7dbb8f'],
    [3, -3.4, -28, 19, 8.0, 8, '#86c298'],
    [20, -3.0, -22, 14, 6.8, 8, '#78b78b'],
  ];
  back.forEach(([x, y, z, sx, sy, sz, c], i) => {
    const h = hill(c, sx, sy, sz, 11 + i);
    h.position.set(x, y, z);
    scene.add(h);
  });
  const mid = [
    [-9, -4.6, -7.5, 12, 6.6, 7, '#3f8f5f'],
    [3, -4.4, -10, 13, 6.8, 7, '#3a895a'],
    [14, -4.8, -8, 11, 6.6, 7, '#428f61'],
  ];
  mid.forEach(([x, y, z, sx, sy, sz, c], i) => {
    const h = hill(c, sx, sy, sz, 21 + i);
    h.position.set(x, y, z);
    scene.add(h);
  });
  const front = hill('#115b39', 48, 12, 7, 31);
  front.position.set(-4, 2.5 - 12, 8.5);
  scene.add(front);
  const front2 = hill('#0c5134', 52, 12, 7, 32);
  front2.position.set(10, 1.6 - 12, 12);
  scene.add(front2);

  // árvores nas colinas do fundo e do meio
  const trees = [];
  const treeSpots = [
    [-13.5, 1.2, -8, 2.2], [-11.2, 1.3, -10, 1.8], [-16, 0.8, -6, 2.4], [-9.8, 3.4, -18, 1.6],
    [11.5, 1.1, -8, 2.0], [13.8, 0.9, -6, 2.4], [16.5, 0.6, -8, 1.9], [9.6, 3.3, -19, 1.6],
    [-5, 3.8, -24, 1.4], [6, 4.2, -26, 1.5], [-1.5, 4.4, -28, 1.3],
  ];
  treeSpots.forEach(([x, y, z, h], i) => {
    const t = tree(h, i % 3 === 0 ? '#1b6e43' : i % 3 === 1 ? '#23804f' : '#2c8c58');
    t.position.set(x * (mobile ? 0.75 : 1), y - 0.3, z);
    scene.add(t);
    trees.push(t);
  });

  const clouds = [
    [-13, 8.2, -22, 1.0, 3],
    [1, 9.0, -30, 1.3, 7],
    [14, 8.0, -20, 0.9, 9],
    [-4.5, 7.6, -16, 0.7, 12],
  ].map(([x, y, z, s, seed]) => {
    const c = cloud(seed);
    c.position.set(x * X, y - (mobile ? -1.5 : 1.2), z);
    c.scale.setScalar(s);
    c.userData.x = x * X;
    scene.add(c);
    return c;
  });

  // ------- objetos -------
  const ph = phone();
  ph.position.set(P.phone, 4.4, -5);
  ph.rotation.set(0, 0.35, -0.12);
  scene.add(ph);

  const sh = shop();
  sh.position.set(P.shop, 1.95, -7.4);
  sh.scale.setScalar(1.15);
  sh.rotation.y = -0.12;
  scene.add(sh);
  sh.updateMatrixWorld();
  const doorW = sh.localToWorld(sh.userData.doorPos.clone());

  // trilho do celular até a porta da loja (dois trechos)
  ph.updateMatrixWorld();
  const phOut = ph.localToWorld(V(0.6, -1.6, 0.3));
  const midP = V(lerp(phOut.x, doorW.x, 0.5), lerp(phOut.y, doorW.y, 0.55) + 0.1, lerp(phOut.z, doorW.z, 0.5) + 0.6);
  const BR = 0.24;
  const trA = trough(phOut.clone().add(V(0.2, -0.3, 0)), midP, { R: 0.36, r: 0.27 });
  const trB = trough(midP.clone().add(V(-0.05, 0.02, 0)), doorW.clone().add(V(-0.35, 0.25, 0.1)), { R: 0.36, r: 0.27 });
  scene.add(trA.group, trB.group);
  const postH = Math.max(0.6, midP.y - 1.4);
  const post = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, postH, 12), clay('#efe3cd')));
  post.position.set(midP.x, midP.y - 0.35 - postH / 2, midP.z);
  scene.add(post);

  const box = deliveryBox();
  box.position.set(P.box, 2.25, -10.5);
  box.scale.setScalar(1.2);
  box.rotation.y = -0.35;
  scene.add(box);
  box.updateMatrixWorld();
  const boxMouth = box.localToWorld(box.userData.mouth.clone());

  const fun = funnel({ color: '#f3e6cf' });
  fun.scale.setScalar(0.8);
  fun.rotation.x = 0.38;
  fun.position.set(boxMouth.x + 0.1, boxMouth.y + 1.7, boxMouth.z);
  scene.add(fun);

  // gráfico de barras
  const chart = new THREE.Group();
  chart.position.set(P.chart, 1.75, -8.5);
  chart.scale.setScalar(1.15);
  chart.rotation.y = -0.4;
  scene.add(chart);
  const barSpecs = [1.1, 1.8, 2.5, 3.5];
  const barsList = barSpecs.map((h, i) => {
    const pivot = new THREE.Group();
    pivot.position.set((i - 1.5) * 0.85, 0, 0);
    const m = rbox(0.7, 1, 0.7, 0.14, i === 3 ? '#ff6a2b' : '#f3e6cf', { rough: 0.6 });
    m.position.y = 0.5;
    pivot.add(m);
    pivot.userData.h = h;
    chart.add(pivot);
    return pivot;
  });
  const topBall = ball('#ffd84a', 0.22);
  scene.add(topBall);

  // bolinhas (clientes) indo do celular para a loja
  const custCols = ['#ff6a2b', '#c6e85a', '#ff5fc1', '#ffd84a', '#7cc4ff'];
  const cust = custCols.map((c) => {
    const b = ball(c, BR);
    scene.add(b);
    return b;
  });
  // formas caindo no funil e na caixa
  const shapeCols = ['#ff5fc1', '#7cc4ff', '#c6e85a', '#ff9a5c'];
  const shapes = shapeCols.map((c, i) => {
    const m = i % 2 === 0
      ? ball(c, 0.2)
      : shadowed(new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.36, 0.36, 4, 0.08), clay(c, { rough: 0.55 })));
    scene.add(m);
    return m;
  });

  const camBase = camera.position.clone();

  return (t) => {
    const w = (TAU * t) / T;
    camera.position.set(camBase.x + Math.sin(w) * 0.35, camBase.y + Math.sin(w * 2) * 0.08, camBase.z);
    camera.lookAt(lookBase);

    clouds.forEach((c, i) => (c.position.x = c.userData.x + Math.sin(w + i * 1.7) * 0.6));
    trees.forEach((tr, i) => (tr.rotation.z = Math.sin(w * 2 + i) * 0.025));

    // celular: flutua, balões aparecem em sequência, coração pulsa
    ph.position.y = 4.4 + Math.sin(w * 2) * 0.12;
    const { bubbles, heart } = ph.userData;
    bubbles.forEach((b, i) => {
      const cyc = (t % 2.5) / 2.5;
      const on = easeOutBack(seg(cyc, 0.1 + i * 0.18, 0.22 + i * 0.18)) * (1 - seg(cyc, 0.86, 0.96));
      b.scale.set(Math.max(0.001, on), Math.max(0.001, on), 1);
    });
    const hc = (t % 2.5) / 2.5;
    const hk = easeOutBack(seg(hc, 0.5, 0.65)) * (1 - easeIn(seg(hc, 0.8, 0.95)));
    heart.visible = hk > 0.001;
    heart.scale.setScalar(Math.max(0.001, hk));
    heart.position.set(0.95, 1.55 + seg(hc, 0.5, 0.95) * 0.7, 0.3);

    // clientes: saem do celular, descem o trilho e entram na loja
    let doorHit = 0;
    const lenA = trA.len, lenB = trB.len;
    cust.forEach((b, k) => {
      const u = (((t + k * 0.4) % 2) + 2) % 2 / 2;
      b.visible = u < 0.9;
      squash(b, 0);
      if (u < 0.12) {
        const p = seg(u, 0, 0.12);
        b.position.copy(phOut).lerp(trA.pointAt(0, BR), p);
        b.scale.setScalar(BR * easeOutBack(p));
      } else if (u < 0.82) {
        const p = easeIn(seg(u, 0.12, 0.82)) * 0.55 + seg(u, 0.12, 0.82) * 0.45;
        const s = p * (lenA + lenB);
        if (s < lenA) {
          b.position.copy(trA.pointAt(s, BR));
          rollBall(b, trA.dir, s, BR);
        } else {
          b.position.copy(trB.pointAt(s - lenA, BR));
          rollBall(b, trB.dir, s, BR);
        }
      } else {
        const p = seg(u, 0.82, 0.9);
        b.position.copy(trB.pointAt(lenB, BR)).lerp(doorW, p);
        b.scale.setScalar(BR * (1 - p * 0.9));
        doorHit = Math.max(doorHit, Math.sin(p * Math.PI));
      }
    });
    sh.userData.door.scale.set(1 + doorHit * 0.08, 1 - doorHit * 0.05, 1);
    sh.scale.set(1, 1 - doorHit * 0.015, 1);

    // formas: caem no funil, giram e vão para a caixa
    fun.position.y = boxMouth.y + 1.7 + Math.sin(w * 2 + 1) * 0.1;
    fun.rotation.z = Math.sin(w * 4) * 0.03;
    fun.updateMatrixWorld();
    let flapKick = 0;
    shapes.forEach((m, k) => {
      const u = (((t + k * 0.625) % 2.5) + 2.5) % 2.5 / 2.5;
      m.visible = u < 0.92;
      const mouth = fun.localToWorld(V(0, 2.2, 0));
      const spout = fun.localToWorld(V(0, 0, 0));
      if (u < 0.3) {
        const p = seg(u, 0, 0.3);
        const start = V(mouth.x + 1.6, mouth.y + 2.2, mouth.z - 0.3);
        const pos = arc(start, mouth, 0.4, p);
        m.position.set(pos.x, pos.y, pos.z);
      } else if (u < 0.62) {
        const p = seg(u, 0.3, 0.62);
        const th = p * 2.2 * TAU;
        const rad = lerp(0.8, 0.1, p);
        m.position.set(mouth.x + Math.cos(th) * rad, lerp(mouth.y - 0.1, spout.y + 0.3, p), mouth.z + Math.sin(th) * rad);
      } else {
        const p = easeIn(seg(u, 0.62, 0.9));
        m.position.copy(spout).lerp(boxMouth.clone().add(V(0, -0.2, 0)), p);
        flapKick = Math.max(flapKick, bump(u, 0.86, 0.95));
      }
      m.rotation.set(t * 1.3 + k, t * 1.7 + k * 2, 0);
    });
    box.userData.flaps.forEach((f, i) => {
      const base = 0.45 + (i % 2) * 0.1;
      const a = -(base + flapKick * 0.35 + Math.sin(w * 4 + i) * 0.04);
      if (f.userData.axis === 'x') f.rotation.x = a * -f.userData.sgn;
      else f.rotation.z = a * f.userData.sgn;
    });

    // gráfico cresce e volta, bolinha quica no topo
    const grow = easeInOut(t < 6 ? seg(t, 0.5, 6) : 1 - seg(t, 7.5, 9.8));
    barsList.forEach((bar, i) => {
      const h = bar.userData.h * (0.45 + 0.55 * grow) * (1 + 0.03 * Math.sin(w * 4 + i));
      bar.scale.y = h;
    });
    chart.updateMatrixWorld();
    const tallest = barsList[3];
    const topLocal = V(tallest.position.x, tallest.scale.y + 0.22, 0);
    const top = chart.localToWorld(topLocal);
    const hopU = (t % 1.25) / 1.25;
    topBall.position.set(top.x, top.y + Math.sin(hopU * Math.PI) * 0.9, top.z);
    squash(topBall, hopU < 0.1 || hopU > 0.95 ? 0.25 : 0);
  };
}
