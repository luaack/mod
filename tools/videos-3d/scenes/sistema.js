import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { V, pillarStage, trough, ball, squash, puck, hole, magnet, funnel, starCharacter, bars, rollBall, contactShadow, shadowed } from '../lib/parts.js';
import { clay } from '../lib/clay.js';
import { seg, easeIn, easeOutBack, bump, damped, arc, TAU, lerp } from '../lib/anim.js';

export const T = 10;
const CYCLE = 5;

function leg(a, b, r, color) {
  const d = b.clone().sub(a);
  const m = shadowed(new THREE.Mesh(new THREE.CapsuleGeometry(r, d.length(), 8, 16), clay(color, { rough: 0.75 })));
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize());
  return m;
}

export function build(studio) {
  const { scene, camera, key } = studio;
  pillarStage(studio);
  camera.fov = 20;
  camera.position.set(0, 4.6, 26);
  camera.lookAt(0, 1.55, 0);
  camera.updateProjectionMatrix();
  Object.assign(key.shadow.camera, { left: -13, right: 13, top: 10, bottom: -10 });
  key.shadow.camera.updateProjectionMatrix();
  key.position.set(-3, 15, 5);

  const cream = '#efe3cd';
  const S = 0.82;

  // --- ímã
  const magX = -6.6;
  const mBase = puck(0.95, 0.28);
  mBase.position.set(magX, 0, 0.2);
  scene.add(mBase);
  const mag = magnet({ color: '#4353f5' });
  mag.scale.setScalar(S);
  const magY = 0.28 + mag.userData.bottom * S;
  mag.position.set(magX, magY, 0.2);
  scene.add(mag);

  // --- funil no tripé
  const funX = -2.2, FY = 0.72, FS = 0.72;
  const holder = new THREE.Group();
  holder.position.set(funX, FY, 0);
  holder.rotation.x = 0.42;
  scene.add(holder);
  const fun = funnel({ color: '#ff6a2b' });
  fun.scale.setScalar(FS);
  holder.add(fun);
  const collar = shadowed(new THREE.Mesh(new THREE.TorusGeometry(1.03 * FS, 0.07, 12, 56), clay(cream)));
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 1.45 * FS;
  holder.add(collar);
  holder.updateMatrixWorld();
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * TAU + 0.95;
    const top = holder.localToWorld(V(Math.cos(a) * 1.02 * FS, 1.45 * FS, Math.sin(a) * 1.02 * FS));
    const foot = V(funX + Math.cos(a) * 1.2, 0.08, Math.sin(a) * 1.2);
    scene.add(leg(foot, top, 0.07, cream));
  }

  // --- estrela
  const starX = 2.3;
  const sBase = puck(0.9, 0.26);
  sBase.position.set(starX, 0, 0.2);
  scene.add(sBase);
  const pivot = new THREE.Group();
  pivot.position.set(starX, 0.26, 0.2);
  scene.add(pivot);
  const star = starCharacter({ color: '#8ccf1f' });
  const SS = 0.72;
  star.position.y = 1.42 * SS;
  pivot.add(star);
  const { eyes, mouth } = star.userData;

  // --- barras
  const barsG = bars({ accent: '#e03cb8' });
  barsG.scale.setScalar(S);
  barsG.position.set(6.5, 0, -0.1);
  scene.add(barsG);
  const { bars: barList, arrow } = barsG.userData;
  arrow.position.set(0, 0.85, -0.9);

  [magX, funX, starX, 6.5].forEach((x, i) => {
    const cs = contactShadow(i === 3 ? 2.2 : 1.5, 0.3);
    cs.position.set(x, 0.006, 0.1);
    scene.add(cs);
  });

  // formas geométricas no chão
  const grey = '#a39b8f';
  const tri = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.3, 3), clay(grey, { rough: 0.8 })));
  tri.position.set(-4.3, 0.15, 2.6);
  tri.rotation.y = 0.4;
  const cube = shadowed(new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.5, 0.5, 4, 0.08), clay(grey, { rough: 0.8 })));
  cube.position.set(0.2, 0.25, 2.9);
  cube.rotation.y = 0.6;
  const disc = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.14, 32), clay(grey, { rough: 0.8 })));
  disc.position.set(4.4, 0.07, 2.7);
  scene.add(tri, cube, disc);

  // trilho de entrada e buraco de saída
  const tr = trough(V(-12.5, 3.9, -1.2), V(-8.4, 2.75, 0.1));
  scene.add(tr.group);
  const pitPos = V(8.9, 0, 1.1);
  const pit = hole(0.42);
  pit.position.copy(pitPos);
  scene.add(pit);

  const R = 0.2;
  const balls = ['#ff6a2b', '#ffd84a'].map((c) => {
    const b = ball(c, R);
    scene.add(b);
    return b;
  });

  const tipPos = () => {
    mag.updateMatrixWorld();
    const p = mag.userData.tipTop(0);
    p.y += R / S - 0.03;
    return mag.localToWorld(p);
  };
  const innerR = (yl) => 0.24 + ((yl - 0.92) / (2.28 - 0.92)) * 1.26;
  const spiral = (u) => {
    const yl = lerp(2.0, 1.02, Math.pow(u, 1.25));
    const rc = Math.max(0.02, innerR(yl) - 0.3);
    const th = u * 2.4 * TAU + Math.PI;
    holder.updateMatrixWorld();
    return holder.localToWorld(V(Math.cos(th) * rc * FS, (yl + 0.1) * FS, Math.sin(th) * rc * FS));
  };
  const barTop = (i) => {
    barsG.updateMatrixWorld();
    const b = barList[i];
    return barsG.localToWorld(V(b.position.x, b.userData.h * b.scale.y, 0)).add(V(0, R - 0.02, 0));
  };

  return (t) => {
    // reações dos personagens (duas bolinhas por loop)
    let magW = 0, funW = 0, hit = 0;
    const barK = [0, 0, 0];
    for (let k = 0; k < 2; k++) {
      const o = k * CYCLE;
      magW += damped(t, o + 1.1, 2.5, 5) * 0.07 + damped(t, o + 1.6, 4, 6) * 0.06;
      funW += bump(t, o + 2.75, o + 3.05);
      hit += damped(t, o + 3.55, 2.2, 3.2);
      [3.85, 4.2, 4.55].forEach((tl, i) => (barK[i] += bump(t, o + tl, o + tl + 0.2) * 0.08));
    }
    mag.rotation.set(0, 0.3 * Math.sin((TAU * t) / T), magW);
    fun.scale.set(FS * (1 + funW * 0.06), FS * (1 - funW * 0.1), FS * (1 + funW * 0.06));
    pivot.rotation.z = 0.06 * Math.sin((TAU * t * 2) / T) + hit * 0.2;
    pivot.rotation.y = 0.15 * Math.sin((TAU * t) / T);
    star.scale.set(SS, SS * (1 + 0.02 * Math.sin((TAU * t * 5) / T)), SS);
    const wide = bump(t, 3.55, 4.1) + bump(t, 8.55, 9.1);
    const blink = Math.max(bump(t, 1.9, 2.05), bump(t, 6.9, 7.05));
    eyes.forEach((e) => e.scale.set(1 + wide * 0.25, Math.max(0.08, 1 - blink) * (1 + wide * 0.35), 1));
    mouth.scale.set(1 + wide * 0.35, 1 + wide * 0.6, 1);
    barList.forEach((b, i) => (b.scale.y = 1 - barK[i] + 0.015 * Math.sin((TAU * (t * 2 + i)) / T)));
    arrow.scale.setScalar(1 + (bump(t, 4.55, 4.95) + bump(t, 9.55, 9.95)) * 0.08);

    balls.forEach((b, k) => {
      const u = (((t - k * CYCLE) % T) + T) % T;
      squash(b, 0);
      b.visible = u < 5.0;
      if (u < 0.8) {
        const p = easeIn(Math.pow(seg(u, 0, 0.8), 0.85));
        const s = -0.6 + p * (tr.len + 0.6);
        b.position.copy(tr.pointAt(Math.min(s, tr.len), R));
        if (s < 0) b.position.addScaledVector(tr.dir, s);
        rollBall(b, tr.dir, s, R);
      } else if (u < 1.1) {
        const p = easeIn(seg(u, 0.8, 1.1));
        const p0 = tr.pointAt(tr.len, R), p2 = tipPos();
        const p1 = p0.clone().addScaledVector(tr.dir, 0.7).add(V(0, 0.7, 0));
        b.position.set(0, 0, 0).addScaledVector(p0, (1 - p) * (1 - p)).addScaledVector(p1, 2 * p * (1 - p)).addScaledVector(p2, p * p);
      } else if (u < 1.6) {
        b.position.copy(tipPos());
        squash(b, bump(u, 1.1, 1.35) * 0.3);
      } else if (u < 2.05) {
        const p = seg(u, 1.6, 2.05);
        const from = tipPos(), to = spiral(0);
        const q = arc(from, to, 1.5, p);
        b.position.set(q.x, q.y, q.z);
      } else if (u < 2.85) {
        const p = easeIn(seg(u, 2.05, 2.85)) * 0.8 + seg(u, 2.05, 2.85) * 0.2;
        b.position.copy(spiral(p));
      } else if (u < 3.1) {
        const p = easeIn(seg(u, 2.85, 3.1));
        holder.updateMatrixWorld();
        const spout = holder.localToWorld(V(0, -0.05, 0));
        const land = V(funX + 0.7, R, 0.7);
        b.position.copy(spout).lerp(land, p);
      } else if (u < 3.55) {
        const p = easeIn(seg(u, 3.1, 3.55)) * 0.5 + seg(u, 3.1, 3.55) * 0.5;
        const from = V(funX + 0.7, R, 0.7), to = V(starX - 0.95, R + 0.35, 0.6);
        b.position.set(lerp(from.x, to.x, p), lerp(from.y, to.y, p * p), lerp(from.z, to.z, p));
        rollBall(b, V(1, 0, 0), p * 3.5, R);
        squash(b, bump(u, 3.1, 3.2) * 0.3);
      } else if (u < 3.85) {
        const p = seg(u, 3.55, 3.85);
        const from = V(starX - 0.95, R + 0.35, 0.6);
        const q = arc(from, barTop(0), 1.6, p);
        b.position.set(q.x, q.y, q.z);
        squash(b, bump(u, 3.55, 3.63) * 0.35);
      } else if (u < 4.55) {
        const k2 = u < 4.2 ? 0 : 1;
        const p = seg(u, 3.85 + k2 * 0.35, 4.2 + k2 * 0.35);
        const q = arc(barTop(k2), barTop(k2 + 1), 0.7, p);
        b.position.set(q.x, q.y, q.z);
      } else if (u < 4.8) {
        const p = seg(u, 4.55, 4.8);
        const from = barTop(2);
        const q = arc(from, V(pitPos.x, R, pitPos.z), 0.4, p);
        q.y = lerp(from.y, R, p * p) + 0.4 * 4 * p * (1 - p);
        b.position.set(q.x, q.y, q.z);
      } else {
        const p = easeIn(seg(u, 4.8, 5.0));
        b.position.set(pitPos.x, R - p * 0.8, pitPos.z);
      }
    });
  };
}
