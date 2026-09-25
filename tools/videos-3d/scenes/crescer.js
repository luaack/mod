import * as THREE from 'three';
import { V, pillarStage, trough, ball, squash, hole, bars, sparkle, rollBall, contactShadow } from '../lib/parts.js';
import { seg, easeIn, easeOutBack, bump, damped, arc, TAU, lerp } from '../lib/anim.js';

export const T = 8;

export function build(studio) {
  const { scene } = studio;
  pillarStage(studio);

  const g = bars({ accent: '#e03cb8' });
  g.position.set(0.15, 0, -0.1);
  scene.add(g);
  const { bars: list, arrow } = g.userData;
  // seta mais alta e atrás das barras, para não esconder a bolinha
  arrow.position.set(0, 0.85, -0.9);
  const cs = contactShadow(2.6, 0.3);
  cs.scale.set(1.4, 0.6, 1);
  cs.position.set(0.15, 0.006, -0.1);
  scene.add(cs);

  const tr = trough(V(-6.3, 2.85, -2.2), V(-2.45, 1.65, 0.3));
  scene.add(tr.group);

  const pitPos = V(2.3, 0, 1.65);
  const pit = hole(0.44);
  pit.position.copy(pitPos);
  scene.add(pit);

  const R = 0.21;
  const balls = ['#ff6a2b', '#c6e85a'].map((c) => {
    const b = ball(c, R);
    scene.add(b);
    return b;
  });
  const starts = [0.25, 3.95];

  const pops = [0, 1].map((k) => {
    const s = sparkle(k ? '#ffd84a' : '#ffffff', 0.2);
    scene.add(s);
    return s;
  });

  // topo de cada barra (em coordenadas do mundo)
  const topOf = (i) => V(g.position.x + list[i].position.x, list[i].userData.h * list[i].scale.y + R - 0.02, -0.1);

  return (t) => {
    // barras respiram e afundam um pouco quando a bolinha pousa
    list.forEach((bar, i) => {
      let k = 0;
      starts.forEach((s) => {
        const land = s + 0.8 + 0.45 * (i + 1);
        k += bump(t, land, land + 0.22) * 0.07;
      });
      bar.scale.y = 1 - k + 0.015 * Math.sin((TAU * (t * 2 + i * 0.7)) / T);
    });
    let pulse = 0;
    starts.forEach((s) => (pulse += bump(t, s + 2.15, s + 2.6)));
    arrow.scale.setScalar(1 + pulse * 0.08);
    arrow.rotation.z = damped(t, starts[0] + 2.15, 3, 4) * 0.03 + damped(t, starts[1] + 2.15, 3, 4) * 0.03;

    pops.forEach((p, k) => {
      const t0 = starts[k] + 2.15;
      const kk = t >= t0 && t < t0 + 0.9 ? easeOutBack(seg(t, t0, t0 + 0.3)) * (1 - easeIn(seg(t, t0 + 0.6, t0 + 0.9))) : 0;
      p.visible = kk > 0.001;
      p.scale.setScalar(0.22 * Math.max(0.001, kk));
      p.position.set(g.position.x + 1.25 + 0.55, 3.35 + seg(t, t0, t0 + 0.9) * 0.4, 0.2);
      p.rotation.z = (t - t0) * 3;
    });

    balls.forEach((b, i) => {
      const s0 = starts[i];
      const r1 = s0 + 0.8;
      const hops = [r1, r1 + 0.45, r1 + 0.9, r1 + 1.35];
      const tTop = hops[3];
      const tOff = tTop + 0.45, tFall = tOff + 0.4, tRoll = tFall + 0.5, tSink = tRoll + 0.22;
      squash(b, 0);
      b.visible = t >= s0 - 0.05 && t < tSink;
      if (t < r1) {
        const u = easeIn(Math.pow(seg(t, s0, r1), 0.85));
        const s = -0.6 + u * (tr.len + 0.6);
        b.position.copy(tr.pointAt(Math.min(s, tr.len), R));
        if (s < 0) b.position.addScaledVector(tr.dir, s);
        rollBall(b, tr.dir, s, R);
      } else if (t < tTop) {
        // três pulos, degrau por degrau
        const k = t < hops[1] ? 0 : t < hops[2] ? 1 : 2;
        const from = k === 0 ? tr.pointAt(tr.len, R) : topOf(k - 1);
        const to = topOf(k);
        const u = seg(t, hops[k], hops[k + 1]);
        const p = arc(from, to, 0.85, u);
        b.position.set(p.x, p.y, p.z);
        const st = 1 + Math.sin(u * Math.PI) * 0.12;
        b.scale.set(R / Math.sqrt(st), R * st, R / Math.sqrt(st));
      } else if (t < tOff) {
        b.position.copy(topOf(2));
        squash(b, bump(t, tTop, tTop + 0.2) * 0.35);
      } else if (t < tFall) {
        const u = seg(t, tOff, tFall);
        const from = topOf(2);
        const to = V(from.x + 0.95, R, 0.8);
        const p = arc(from, to, 0.45, u);
        p.y = lerp(from.y, to.y, u * u) + 0.45 * 4 * u * (1 - u);
        b.position.set(p.x, p.y, p.z);
      } else if (t < tRoll) {
        const from = V(topOf(2).x + 0.95, R, 0.8);
        const u = easeIn(seg(t, tFall, tRoll)) * 0.6 + seg(t, tFall, tRoll) * 0.4;
        b.position.set(lerp(from.x, pitPos.x, u), R, lerp(from.z, pitPos.z, u));
        squash(b, bump(t, tFall, tFall + 0.1) * 0.3);
        rollBall(b, pitPos.clone().sub(from).setY(0).normalize(), u * from.distanceTo(pitPos), R);
      } else {
        const u = easeIn(seg(t, tRoll, tSink));
        b.position.set(pitPos.x, R - u * 0.8, pitPos.z);
      }
    });
  };
}
