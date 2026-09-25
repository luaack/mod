import * as THREE from 'three';
import { V, pillarStage, trough, ball, squash, hole, funnel, rollBall, contactShadow, shadowed } from '../lib/parts.js';
import { clay } from '../lib/clay.js';
import { seg, easeIn, easeOut, bump, damped, arc, TAU, lerp } from '../lib/anim.js';

export const T = 8;

// perna (cápsula) entre dois pontos
function leg(a, b, r, color) {
  const d = b.clone().sub(a);
  const m = shadowed(new THREE.Mesh(new THREE.CapsuleGeometry(r, d.length(), 8, 16), clay(color, { rough: 0.75 })));
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize());
  return m;
}

export function build(studio) {
  const { scene } = studio;
  pillarStage(studio);

  const FY = 0.95; // base do bico do funil
  const cx = -0.2;
  // o funil fica num suporte inclinado para a câmera, para vermos as bolinhas girando dentro
  const holder = new THREE.Group();
  holder.position.set(cx, FY, 0);
  holder.rotation.x = 0.26;
  scene.add(holder);
  const fun = funnel({ color: '#ff6a2b' });
  holder.add(fun);
  holder.updateMatrixWorld();

  // tripé creme segurando o funil
  const cream = '#efe3cd';
  const attachLocalY = 1.45;
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * TAU + 0.95;
    const top = holder.localToWorld(V(Math.cos(a) * 1.02, attachLocalY, Math.sin(a) * 1.02));
    const foot = V(cx + Math.cos(a) * 1.6, 0.1, Math.sin(a) * 1.6);
    scene.add(leg(foot, top, 0.085, cream));
    const f = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 14), clay(cream)));
    f.scale.set(1, 0.6, 1);
    f.position.copy(foot).setY(0.08);
    scene.add(f);
  }
  const collar = shadowed(new THREE.Mesh(new THREE.TorusGeometry(1.03, 0.08, 14, 64), clay(cream)));
  collar.rotation.x = Math.PI / 2;
  collar.position.set(0, attachLocalY, 0);
  holder.add(collar);
  const cs = contactShadow(2.2, 0.28);
  cs.position.set(cx, 0.006, 0);
  scene.add(cs);

  const tr = trough(V(6.2, 4.6, -2.6), V(2.3, 3.6, 0.0));
  scene.add(tr.group);

  const pitPos = V(-2.45, 0, 1.45);
  const pit = hole(0.46);
  pit.position.copy(pitPos);
  scene.add(pit);

  const R = 0.2;
  const colors = ['#c6e85a', '#ff5fc1', '#ffd84a'];
  const small = colors.map((c) => {
    const b = ball(c, R);
    scene.add(b);
    return b;
  });
  const RB = 0.3;
  const big = ball('#3d4bff', RB);
  scene.add(big);

  const starts = [0.2, 1.1, 2.0];
  const rollDur = 0.9, dropDur = 0.35, spinDur = 1.15;
  const mouthY = FY + 2.24;

  // raio da parede interna do funil em função da altura local
  const innerR = (yl) => 0.24 + ((yl - 0.92) / (2.28 - 0.92)) * 1.26;
  const spiralPos = (u, theta0) => {
    const yl = lerp(2.0, 1.02, Math.pow(u, 1.25));
    const rc = Math.max(0.02, innerR(yl) - 0.3);
    const th = theta0 + u * 2.6 * TAU;
    return holder.localToWorld(V(Math.cos(th) * rc, yl + 0.1, Math.sin(th) * rc));
  };

  return (t) => {
    let wob = 0;
    starts.forEach((s) => (wob += damped(t, s + rollDur + dropDur, 3, 5) * 0.035));
    const digest = bump(t, 4.35, 4.85);
    fun.rotation.z = wob + damped(t, 4.8, 5, 6) * 0.04;
    fun.scale.set(1 + digest * 0.06, 1 - digest * 0.1, 1 + digest * 0.06);
    holder.updateMatrixWorld();

    small.forEach((b, i) => {
      const s0 = starts[i];
      const t1 = s0 + rollDur, t2 = t1 + dropDur, t3 = t2 + spinDur;
      b.visible = t < t3;
      squash(b, 0);
      if (t < t1) {
        const u = easeIn(Math.pow(seg(t, s0, t1), 0.85));
        const s = -0.6 + u * (tr.len + 0.6);
        b.position.copy(tr.pointAt(Math.min(s, tr.len), R));
        if (s < 0) b.position.addScaledVector(tr.dir, s);
        rollBall(b, tr.dir, s, R);
      } else if (t < t2) {
        const u = seg(t, t1, t2);
        const p0 = tr.pointAt(tr.len, R);
        const p1 = spiralPos(0, 0);
        const p = arc(p0, p1, 0.35, u);
        p.y = lerp(p0.y, p1.y, u * u) + 0.35 * 4 * u * (1 - u);
        b.position.set(p.x, p.y, p.z);
      } else if (t < t3) {
        const u = easeIn(seg(t, t2, t3)) * 0.85 + seg(t, t2, t3) * 0.15;
        b.position.copy(spiralPos(u, 0));
        rollBall(b, V(1, 0, 0), u * 9, R);
      }
    });

    // o cliente convertido sai pelo bico
    const e0 = 4.75, e1 = 5.05, e2 = 5.35, e3 = 6.35, e4 = 6.6;
    big.visible = t >= e0 && t < e4;
    squash(big, 0);
    const spout = holder.localToWorld(V(0, -0.05, 0));
    const land = V(cx - 0.35, RB, 0.95);
    const mid = V(lerp(land.x, pitPos.x, 0.35), RB, lerp(land.z, pitPos.z, 0.35));
    if (t < e1) {
      const u = easeIn(seg(t, e0, e1));
      big.position.set(lerp(spout.x, land.x, u), lerp(spout.y, land.y, u), lerp(spout.z, land.z, u));
      const st = 1 + seg(t, e0, e1) * 0.2;
      big.scale.set(RB / Math.sqrt(st), RB * st, RB / Math.sqrt(st));
    } else if (t < e2) {
      const u = seg(t, e1, e2);
      const p = arc(land, mid, 0.45, u);
      big.position.set(p.x, p.y, p.z);
      squash(big, bump(t, e1, e1 + 0.12) * 0.35);
    } else if (t < e3) {
      const u = easeIn(seg(t, e2, e3)) * 0.7 + seg(t, e2, e3) * 0.3;
      big.position.set(lerp(mid.x, pitPos.x, u), RB, lerp(mid.z, pitPos.z, u));
      const dir = pitPos.clone().sub(mid).setY(0).normalize();
      rollBall(big, dir, u * mid.distanceTo(pitPos), RB);
    } else if (t < e4) {
      const u = easeIn(seg(t, e3, e4));
      big.position.set(pitPos.x, RB - u * 1.0, pitPos.z);
    }
  };
}
