import * as THREE from 'three';
import { V, pillarStage, trough, ball, squash, puck, hole, starCharacter, sparkle, rollBall, contactShadow } from '../lib/parts.js';
import { seg, easeIn, easeOut, easeOutBack, bump, damped, arc, TAU, lerp } from '../lib/anim.js';

export const T = 8;

export function build(studio) {
  const { scene } = studio;
  pillarStage(studio);

  const base = puck(1.05, 0.28, '#efe3cd');
  base.position.set(-0.3, 0, 0);
  scene.add(base);
  const cs = contactShadow(1.6, 0.38);
  cs.position.set(-0.3, 0.006, 0);
  scene.add(cs);

  const star = starCharacter({ color: '#8ccf1f' });
  const pivot = new THREE.Group(); // gira a partir da base, para o balanço parecer natural
  pivot.position.set(-0.3, 0.28, 0);
  star.position.y = 1.25;
  pivot.add(star);
  const S = 0.88;
  scene.add(pivot);
  const { eyes, mouth } = star.userData;

  const tr = trough(V(6.1, 3.7, -2.1), V(2.2, 2.55, 0.3));
  scene.add(tr.group);

  const pitPos = V(2.25, 0, 1.55);
  const pit = hole(0.44);
  pit.position.copy(pitPos);
  scene.add(pit);

  const R = 0.22;
  const b = ball('#ff6a2b', R);
  scene.add(b);

  // brilhos que aparecem em volta da estrela
  const sparkSpecs = [
    { p: V(-2.1, 3.2, 0.2), c: '#ffd84a', t: 0.5, s: 0.26 },
    { p: V(1.3, 3.6, -0.2), c: '#ff5fc1', t: 1.2, s: 0.2 },
    { p: V(-1.6, 1.3, 0.8), c: '#ffffff', t: 2.0, s: 0.18 },
    { p: V(1.1, 2.9, 0.6), c: '#ffd84a', t: 3.45, s: 0.3 },
    { p: V(0.4, 4.0, 0.1), c: '#ff9a3d', t: 3.55, s: 0.22 },
    { p: V(1.7, 2.1, 0.4), c: '#ff5fc1', t: 3.65, s: 0.2 },
    { p: V(-2.3, 2.3, 0.5), c: '#ffffff', t: 5.2, s: 0.2 },
    { p: V(-0.9, 4.1, -0.1), c: '#ffd84a', t: 6.7, s: 0.24 },
  ];
  const sparks = sparkSpecs.map((sp) => {
    const m = sparkle(sp.c, sp.s);
    m.position.copy(sp.p);
    scene.add(m);
    return m;
  });

  const tRoll0 = 2.1, tRoll1 = 2.95, tHit = 3.35;
  const hitPoint = V(0.66, 2.12, 0.35);
  const land = V(1.45, R, 1.25);

  return (t) => {
    // balanço, respiração e reação à batida
    const hit = damped(t, tHit, 2.2, 3.2);
    const hop = bump(t, 6.2, 6.75);
    const crouch = bump(t, 6.0, 6.25) + bump(t, 6.72, 6.95);
    pivot.rotation.z = 0.07 * Math.sin((TAU * t * 2) / T) + hit * 0.22;
    pivot.rotation.y = 0.18 * Math.sin((TAU * t) / T);
    star.position.y = 1.25 + hop * 0.75;
    const breathe = 0.018 * Math.sin((TAU * t * 4) / T);
    const sq = crouch * 0.12 + Math.max(0, hit) * 0.08;
    star.scale.set(S * (1 + sq * 0.5), S * (1 - sq + breathe), S * (1 + sq * 0.5));

    // piscar e olhos arregalados na batida
    const blink = Math.max(bump(t, 1.55, 1.75), bump(t, 5.6, 5.8), bump(t, 5.85, 6.0));
    const wide = bump(t, tHit, tHit + 0.7);
    eyes.forEach((e) => e.scale.set(1 + wide * 0.25, Math.max(0.08, 1 - blink) * (1 + wide * 0.35), 1));
    mouth.scale.set(1 + wide * 0.35, 1 + wide * 0.6, 1);

    sparks.forEach((m, i) => {
      const t0 = sparkSpecs[i].t;
      const grow = easeOutBack(seg(t, t0, t0 + 0.35));
      const shrink = 1 - easeIn(seg(t, t0 + 0.8, t0 + 1.1));
      const k = t >= t0 && t < t0 + 1.1 ? grow * shrink : 0;
      m.visible = k > 0.001;
      m.scale.setScalar(sparkSpecs[i].s * Math.max(0.001, k));
      m.rotation.z = (t - t0) * 2.2;
      m.rotation.y = Math.sin((t - t0) * 3) * 0.5;
    });

    // bolinha: desce, bate na estrela, quica e cai no buraco
    squash(b, 0);
    b.visible = true;
    const t2 = tHit + 0.5, t3 = t2 + 0.3, t4 = t3 + 0.55, t5 = t4 + 0.22;
    if (t < tRoll1) {
      const u = easeIn(Math.pow(seg(t, tRoll0, tRoll1), 0.85));
      const s = -0.6 + u * (tr.len + 0.6);
      b.position.copy(tr.pointAt(Math.min(s, tr.len), R));
      if (s < 0) b.position.addScaledVector(tr.dir, s);
      rollBall(b, tr.dir, s, R);
      b.visible = t >= tRoll0 - 0.05;
    } else if (t < tHit) {
      const u = seg(t, tRoll1, tHit);
      const p0 = tr.pointAt(tr.len, R);
      const p = arc(p0, hitPoint, 0.3, u);
      b.position.set(p.x, p.y, p.z);
    } else if (t < t2) {
      const u = seg(t, tHit, t2);
      const p = arc(hitPoint, land, 0.7, u);
      p.y = lerp(hitPoint.y, land.y, u * u) + 0.7 * 4 * u * (1 - u) * 0.6;
      b.position.set(p.x, p.y, p.z);
      squash(b, bump(t, tHit, tHit + 0.1) * 0.35);
    } else if (t < t3) {
      const u = seg(t, t2, t3);
      const mid = land.clone().lerp(pitPos, 0.4).setY(R);
      const p = arc(land, mid, 0.25, u);
      b.position.set(p.x, p.y, p.z);
      squash(b, bump(t, t2, t2 + 0.1) * 0.3);
    } else if (t < t4) {
      const mid = land.clone().lerp(pitPos, 0.4).setY(R);
      const u = easeIn(seg(t, t3, t4)) * 0.6 + seg(t, t3, t4) * 0.4;
      b.position.set(lerp(mid.x, pitPos.x, u), R, lerp(mid.z, pitPos.z, u));
      rollBall(b, pitPos.clone().sub(mid).setY(0).normalize(), u * mid.distanceTo(pitPos), R);
    } else if (t < t5) {
      const u = easeIn(seg(t, t4, t5));
      b.position.set(pitPos.x, R - u * 0.8, pitPos.z);
    } else {
      b.visible = false;
    }
  };
}
