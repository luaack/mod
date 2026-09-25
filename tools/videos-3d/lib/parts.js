import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { clay } from './clay.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
export { V };

const shadowed = (mesh, cast = true, receive = true) => {
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  return mesh;
};
export { shadowed };

// ---------- palco dos pilares ----------
export function pillarStage(studio, { wall = '#ebe5db', floor = '#dbd0bf', camY = 4.6, camZ = 13.5, lookY = 1.35 } = {}) {
  const { scene, camera, key } = studio;
  scene.background = new THREE.Color(wall);
  const floorM = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), clay(floor, { rough: 0.95, sheen: 0, bump: 0.5, repeat: 8, seed: 3 }));
  floorM.rotation.x = -Math.PI / 2;
  floorM.receiveShadow = true;
  scene.add(floorM);
  const wallM = new THREE.Mesh(new THREE.PlaneGeometry(90, 40), clay(wall, { rough: 1, sheen: 0, bump: 0.3, repeat: 6, seed: 5 }));
  wallM.position.set(0, 20, -6);
  wallM.receiveShadow = true;
  scene.add(wallM);
  camera.position.set(0, camY, camZ);
  camera.lookAt(0, lookY, 0);
  key.position.set(-3.2, 14, 4.2);
  key.target.position.set(0, 0, 0);
  return { floor: floorM, wall: wallM };
}

// ---------- sombra de contato (oclusão suave sob os objetos) ----------
let contactTex;
export function contactShadow(radius = 1, opacity = 0.35) {
  if (!contactTex) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(40,28,15,1)');
    g.addColorStop(0.45, 'rgba(40,28,15,0.55)');
    g.addColorStop(1, 'rgba(40,28,15,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    contactTex = new THREE.CanvasTexture(c);
  }
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(radius * 2, radius * 2),
    new THREE.MeshBasicMaterial({ map: contactTex, transparent: true, opacity, depthWrite: false }),
  );
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.006;
  m.renderOrder = 1;
  return m;
}

// ---------- trilho (meia-cana) ----------
export function trough(a, b, { R = 0.36, r = 0.27, color = '#ece4d6', bevel = 0.05 } = {}) {
  const dir = b.clone().sub(a);
  const len = dir.length();
  dir.normalize();
  const shape = new THREE.Shape();
  shape.moveTo(-R, 0);
  shape.absarc(0, 0, R, Math.PI, 2 * Math.PI, false);
  shape.lineTo(r, 0);
  shape.absarc(0, 0, r, 2 * Math.PI, Math.PI, true);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: len,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 5,
    curveSegments: 40,
  });
  const mesh = shadowed(new THREE.Mesh(geo, clay(color, { rough: 0.6 })));
  const x = V(0, 1, 0).cross(dir).normalize();
  const y = dir.clone().cross(x).normalize();
  const group = new THREE.Group();
  group.add(mesh);
  group.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, y, dir));
  group.position.copy(a);
  // centro de uma bolinha de raio br a uma distância s do início do trilho
  const pointAt = (s, br) => a.clone().addScaledVector(dir, s).addScaledVector(y, -r + br + 0.01);
  return { group, dir, len, x, y, a, b, pointAt };
}

// rotação de rolamento de uma bolinha que andou `dist` na direção `dir`
export function rollBall(ball, dir, dist, r) {
  const axis = V(0, 1, 0).cross(dir).normalize();
  if (axis.lengthSq() < 1e-6) return;
  ball.quaternion.setFromAxisAngle(axis, dist / r);
}

// ---------- bolinha ----------
const sphereGeo = new THREE.SphereGeometry(1, 40, 28);
export function ball(color, r = 0.22) {
  const m = shadowed(new THREE.Mesh(sphereGeo, clay(color, { rough: 0.55, sheen: 0.45 })));
  m.scale.setScalar(r);
  m.userData.r = r;
  return m;
}
// achata/estica mantendo o volume (squash & stretch)
export function squash(mesh, k, r = mesh.userData.r ?? 1) {
  const s = 1 - k;
  mesh.scale.set(r / Math.sqrt(s), r * s, r / Math.sqrt(s));
}

// ---------- base redonda com borda arredondada ----------
export function puck(radius = 0.9, height = 0.32, color = '#efe3cd', bevel = 0.1) {
  const pts = [V(0, 0, 0)];
  pts.push(new THREE.Vector2(radius - bevel, 0));
  for (let i = 0; i <= 8; i++) {
    const a = -Math.PI / 2 + (i / 8) * (Math.PI / 2);
    pts.push(new THREE.Vector2(radius - bevel + Math.cos(a) * bevel, bevel + Math.sin(a) * bevel));
  }
  for (let i = 0; i <= 8; i++) {
    const a = (i / 8) * (Math.PI / 2);
    pts.push(new THREE.Vector2(radius - bevel + Math.cos(a) * bevel, height - bevel + Math.sin(a) * bevel));
  }
  pts.push(new THREE.Vector2(0, height));
  const geo = new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p.x, p.y)), 64);
  return shadowed(new THREE.Mesh(geo, clay(color, { rough: 0.8 })));
}

// ---------- buraco no chão ----------
export function hole(radius = 0.5, { color = '#2c2119', rim = '#d6c6ab' } = {}) {
  const g = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.CircleGeometry(radius, 48), new THREE.MeshBasicMaterial({ color }));
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.004;
  const ring = new THREE.Mesh(new THREE.RingGeometry(radius, radius * 1.12, 48), clay(rim, { rough: 0.9, sheen: 0 }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.003;
  ring.receiveShadow = true;
  g.add(disc, ring);
  return g;
}

// ---------- ímã em U (Atrair) ----------
export function magnet({ color = '#3d4bff', tip = '#eef1f6' } = {}) {
  const Ro = 0.95, Ri = 0.43, H = 1.05, D = 0.72, bv = 0.13;
  const s = new THREE.Shape();
  s.moveTo(-Ro, H);
  s.lineTo(-Ro, 0);
  s.absarc(0, 0, Ro, Math.PI, 2 * Math.PI, false);
  s.lineTo(Ro, H);
  s.lineTo(Ri, H);
  s.lineTo(Ri, 0);
  s.absarc(0, 0, Ri, 2 * Math.PI, Math.PI, true);
  s.lineTo(-Ri, H);
  s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, { depth: D, bevelEnabled: true, bevelThickness: bv, bevelSize: bv, bevelSegments: 8, curveSegments: 56 });
  geo.translate(0, 0, -D / 2);
  const g = new THREE.Group();
  g.add(shadowed(new THREE.Mesh(geo, clay(color, { rough: 0.55 }))));
  const tipH = 0.42;
  const tipGeo = new RoundedBoxGeometry(Ro - Ri + 2 * bv + 0.02, tipH, D + 2 * bv + 0.02, 6, 0.14);
  const tips = [-1, 1].map((sx) => {
    const t = shadowed(new THREE.Mesh(tipGeo, clay(tip, { rough: 0.45 })));
    t.position.set((sx * (Ro + Ri)) / 2, H + bv + tipH / 2 - 0.06, 0);
    g.add(t);
    return t;
  });
  g.userData.bottom = Ro + bv; // distância do centro do arco até a base
  // ponto (local) em cima de cada ponta, onde uma bolinha gruda
  g.userData.tipTop = (i) => V(tips[i].position.x, tips[i].position.y + tipH / 2, 0);
  return g;
}

// ---------- funil (Converter) ----------
export function funnel({ color = '#ff6a2b' } = {}) {
  const outer = [
    [0.2, 0],
    [0.33, 0],
    [0.36, 0.05],
    [0.36, 0.78],
    [1.55, 2.05],
    [1.68, 2.14],
    [1.7, 2.24],
    [1.62, 2.3],
    [1.5, 2.28],
    [0.24, 0.92],
    [0.2, 0.85],
    [0.2, 0],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const geo = new THREE.LatheGeometry(new THREE.SplineCurve(outer).getPoints(160), 72);
  const g = new THREE.Group();
  const m = shadowed(new THREE.Mesh(geo, clay(color, { rough: 0.55, side: THREE.DoubleSide })));
  g.add(m);
  g.userData.mouthY = 2.24;
  g.userData.body = m;
  return g;
}

// ---------- estrela com carinha (Presença) ----------
export function starCharacter({ color = '#8ccf1f' } = {}) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = Math.PI / 2 + (i * Math.PI) / 5;
    const r = i % 2 === 0 ? 1.45 : 0.72;
    pts.push(V(Math.cos(a) * r, Math.sin(a) * r, 0));
  }
  const curve = new THREE.CatmullRomCurve3(pts, true, 'centripetal', 0.5);
  const shape = new THREE.Shape(curve.getPoints(240).map((p) => new THREE.Vector2(p.x, p.y)));
  const D = 0.55, bv = 0.28;
  const geo = new THREE.ExtrudeGeometry(shape, { depth: D, bevelEnabled: true, bevelThickness: bv, bevelSize: bv * 0.9, bevelSegments: 10, curveSegments: 12 });
  geo.translate(0, 0, -D / 2);
  const g = new THREE.Group();
  const body = shadowed(new THREE.Mesh(geo, clay(color, { rough: 0.6 })));
  g.add(body);
  const face = new THREE.Group();
  const eyeMat = clay('#1c2410', { rough: 0.3, sheen: 0.1 });
  const hiMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const eyes = [-1, 1].map((sx) => {
    const e = new THREE.Group();
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.16, 28, 20), eyeMat);
    ball.scale.set(1, 1.35, 0.55);
    const hi = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 12), hiMat);
    hi.position.set(0.05, 0.08, 0.08);
    e.add(ball, hi);
    e.position.set(sx * 0.3, 0.12, D / 2 + bv - 0.02);
    face.add(e);
    return e;
  });
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.045, 12, 32, Math.PI), eyeMat);
  mouth.rotation.z = Math.PI;
  mouth.position.set(0, -0.2, D / 2 + bv - 0.02);
  face.add(mouth);
  g.add(face);
  g.userData = { eyes, mouth, face, body };
  return g;
}

// estrelinha de brilho
export function sparkle(color = '#ffd84a', size = 0.22) {
  const pts = [];
  for (let i = 0; i < 8; i++) {
    const a = Math.PI / 2 + (i * Math.PI) / 4;
    const r = i % 2 === 0 ? 1 : 0.38;
    pts.push(new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r));
  }
  const geo = new THREE.ExtrudeGeometry(new THREE.Shape(pts), { depth: 0.25, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.1, bevelSegments: 4 });
  geo.translate(0, 0, -0.125);
  const m = shadowed(new THREE.Mesh(geo, clay(color, { rough: 0.5 })), true, false);
  m.scale.setScalar(size);
  m.userData.size = size;
  return m;
}

// ---------- barras + seta (Crescer) ----------
export function bars({ accent = '#e03cb8', cream = '#f1e3ca' } = {}) {
  const g = new THREE.Group();
  const specs = [
    { x: -1.25, h: 1.0, c: cream },
    { x: 0, h: 1.75, c: cream },
    { x: 1.25, h: 2.6, c: accent },
  ];
  const list = specs.map(({ x, h, c }) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0, 0);
    const m = shadowed(new THREE.Mesh(new RoundedBoxGeometry(0.95, h, 0.95, 6, 0.16), clay(c, { rough: 0.6 })));
    m.position.y = h / 2;
    pivot.add(m);
    pivot.userData.h = h;
    g.add(pivot);
    return pivot;
  });
  // seta em zigue-zague subindo
  const path = new THREE.CatmullRomCurve3([V(-1.6, 1.55, 0.7), V(-0.6, 2.25, 0.7), V(0.2, 1.95, 0.7), V(1.35, 3.25, 0.7)], false, 'centripetal', 0.2);
  const tubeGeo = new THREE.TubeGeometry(path, 120, 0.1, 16, false);
  const arrow = new THREE.Group();
  const tube = shadowed(new THREE.Mesh(tubeGeo, clay(accent, { rough: 0.5 })));
  const head = shadowed(new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.5, 24), clay(accent, { rough: 0.5 })));
  const end = path.getPoint(1);
  const tan = path.getTangent(1);
  head.position.copy(end).addScaledVector(tan, 0.15);
  head.quaternion.setFromUnitVectors(V(0, 1, 0), tan);
  const capA = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), clay(accent)));
  capA.position.copy(path.getPoint(0));
  arrow.add(tube, head, capA);
  g.add(arrow);
  g.userData = { bars: list, arrow, tube, head, path };
  return g;
}

// ---------- trilho curvo (meia-cana varrida ao longo de uma curva, sempre com a abertura para cima) ----------
export function curvedTrough(curve, { R = 0.4, r = 0.3, color = '#3f7bff', segs = 160, radial = 24 } = {}) {
  const pos = [];
  const idx = [];
  const frames = [];
  for (let i = 0; i <= segs; i++) {
    const u = i / segs;
    const c = curve.getPointAt(u);
    const tan = curve.getTangentAt(u).normalize();
    const x = V(0, 1, 0).cross(tan).normalize();
    const y = tan.clone().cross(x).normalize();
    frames.push({ c, x, y, tan });
  }
  // anéis: externo (R) e interno (r), meia-volta de baixo (π → 2π)
  const ringVerts = (radius, f) => {
    const out = [];
    for (let j = 0; j <= radial; j++) {
      const th = Math.PI + (j / radial) * Math.PI;
      out.push(f.c.clone().addScaledVector(f.x, Math.cos(th) * radius).addScaledVector(f.y, Math.sin(th) * radius));
    }
    return out;
  };
  const W = radial + 1;
  const outerStart = 0;
  frames.forEach((f) => ringVerts(R, f).forEach((p) => pos.push(p.x, p.y, p.z)));
  const innerStart = pos.length / 3;
  frames.forEach((f) => ringVerts(r, f).forEach((p) => pos.push(p.x, p.y, p.z)));
  for (let i = 0; i < segs; i++) {
    for (let j = 0; j < radial; j++) {
      const a = outerStart + i * W + j, b = a + W, c = b + 1, d = a + 1;
      idx.push(a, d, b, b, d, c); // externo (normal para fora)
      const a2 = innerStart + i * W + j, b2 = a2 + W, c2 = b2 + 1, d2 = a2 + 1;
      idx.push(a2, b2, d2, b2, c2, d2); // interno (normal para dentro)
    }
    // bordas superiores ligando externo e interno
    for (const j of [0, radial]) {
      const o0 = outerStart + i * W + j, o1 = o0 + W, i0 = innerStart + i * W + j, i1 = i0 + W;
      if (j === 0) idx.push(o0, i0, o1, o1, i0, i1);
      else idx.push(o0, o1, i0, o1, i1, i0);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mesh = shadowed(new THREE.Mesh(geo, clay(color, { rough: 0.5, side: THREE.DoubleSide })));
  const pointAt = (u, br) => {
    const c = curve.getPointAt(u);
    const tan = curve.getTangentAt(u).normalize();
    const x = V(0, 1, 0).cross(tan).normalize();
    const y = tan.clone().cross(x).normalize();
    return c.addScaledVector(y, -r + br + 0.01);
  };
  return { mesh, pointAt, length: curve.getLength() };
}
