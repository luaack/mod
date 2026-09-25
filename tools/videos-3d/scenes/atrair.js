import * as THREE from 'three';
import { V, pillarStage, trough, ball, squash, puck, hole, magnet, rollBall, contactShadow } from '../lib/parts.js';
import { seg, easeIn, easeOut, bump, damped, arc, TAU, lerp } from '../lib/anim.js';

export const T = 8;

export function build(studio) {
  const { scene } = studio;
  pillarStage(studio);

  const tr = trough(V(6.0, 3.3, -2.2), V(2.0, 2.25, 0.35));
  scene.add(tr.group);

  const base = puck(1.05, 0.3);
  base.position.set(-0.25, 0, 0);
  scene.add(base);
  const cs = contactShadow(1.6, 0.4);
  cs.position.set(-0.25, 0.006, 0);
  scene.add(cs);

  const mag = magnet({ color: '#4353f5' });
  const magY = 0.3 + mag.userData.bottom;
  mag.position.set(-0.25, magY, 0);
  scene.add(mag);

  const pit = hole(0.42);
  pit.position.set(-2.35, 0, 1.5);
  scene.add(pit);

  const R = 0.22;
  const colors = ['#ff6a2b', '#c6e85a', '#ff5fc1'];
  const balls = colors.map((c) => {
    const b = ball(c, R);
    scene.add(b);
    return b;
  });
  const starts = [0.2, 1.25, 2.3];
  const rollDur = 1.0;
  const flyDur = 0.45;
  const tipOf = [1, 0, 1];
  const stackOf = [0, 0, 1];
  const releases = [5.55, 5.3, 5.3];
  const landing = [V(1.25, R, 1.1), V(-1.55, R, 0.95), V(0.35, R, 1.6)];
  const pitPos = V(-2.35, 0, 1.5);

  const tmp = new THREE.Vector3();
  const stuckPos = (i) => {
    mag.updateMatrixWorld();
    const top = mag.userData.tipTop(tipOf[i]);
    top.y += R - 0.035 + stackOf[i] * (2 * R - 0.05);
    return mag.localToWorld(top);
  };

  return (t) => {
    // ímã: balanço lento, recuo a cada bolinha que gruda e pulso antes de soltar
    let wobble = 0;
    starts.forEach((s) => (wobble += damped(t, s + rollDur + flyDur, 2.5, 5) * 0.07));
    const pulse = bump(t, 5.0, 5.35);
    mag.rotation.set(0, 0.32 * Math.sin((TAU * t) / T), wobble + damped(t, 5.0, 7, 6) * 0.06);
    mag.scale.setScalar(1 + pulse * 0.07);
    mag.position.y = magY + pulse * 0.08;

    balls.forEach((b, i) => {
      const s0 = starts[i];
      const tStick = s0 + rollDur + flyDur;
      const tRel = releases[i];
      b.visible = true;
      squash(b, 0);
      if (t < s0 + rollDur) {
        // descendo o trilho (acelerando)
        const u = easeIn(Math.pow(seg(t, s0, s0 + rollDur), 0.8));
        const s = -0.6 + u * (tr.len + 0.6);
        b.position.copy(tr.pointAt(Math.min(s, tr.len), R));
        if (s < 0) b.position.addScaledVector(tr.dir, s);
        rollBall(b, tr.dir, s, R);
      } else if (t < tStick) {
        // voo puxado pelo ímã (curva de Bézier acelerando)
        const u = easeIn(seg(t, s0 + rollDur, tStick));
        const p0 = tr.pointAt(tr.len, R);
        const p2 = stuckPos(i);
        const p1 = p0.clone().addScaledVector(tr.dir, 0.9).add(V(0, 0.9, 0));
        b.position.set(0, 0, 0)
          .addScaledVector(p0, (1 - u) * (1 - u))
          .addScaledVector(p1, 2 * u * (1 - u))
          .addScaledVector(p2, u * u);
        const st = 1 + u * 0.25;
        b.scale.set(R / Math.sqrt(st), R * st, R / Math.sqrt(st));
      } else if (t < tRel) {
        // grudada na ponta do ímã
        b.position.copy(stuckPos(i));
        squash(b, bump(t, tStick, tStick + 0.28) * 0.3);
      } else {
        const p0 = stuckPos(i);
        const L = landing[i];
        const fall = 0.5, bounce = 0.32, roll = 0.62, sink = 0.22;
        const t1 = tRel + fall, t2 = t1 + bounce, t3 = t2 + roll, t4 = t3 + sink;
        if (t < t1) {
          const u = seg(t, tRel, t1);
          const p = arc(p0, L, 0.35, u);
          p.y = lerp(p0.y, L.y, u * u) + 0.35 * 4 * u * (1 - u);
          b.position.set(p.x, p.y, p.z);
        } else if (t < t2) {
          const u = seg(t, t1, t2);
          const mid = L.clone().lerp(pitPos, 0.3);
          mid.y = R;
          const p = arc(L, mid, 0.28, u);
          b.position.set(p.x, p.y, p.z);
          squash(b, bump(t, t1, t1 + 0.12) * 0.35);
        } else if (t < t3) {
          const mid = L.clone().lerp(pitPos, 0.3);
          const u = easeIn(seg(t, t2, t3));
          b.position.set(lerp(mid.x, pitPos.x, u), R, lerp(mid.z, pitPos.z, u));
          const dir = pitPos.clone().sub(mid).setY(0).normalize();
          rollBall(b, dir, u * mid.distanceTo(pitPos), R);
        } else if (t < t4) {
          const u = easeIn(seg(t, t3, t4));
          b.position.set(pitPos.x, R - u * 0.8, pitPos.z);
        } else {
          b.visible = false;
        }
      }
    });
  };
}
