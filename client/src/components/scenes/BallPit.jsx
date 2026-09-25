import { seeded, light, dark } from "./clay";
import { Tree } from "./ClayParts";

const COLORS = ["#ff4d6d", "#ffd23f", "#3d8bff", "#4fd17a", "#ff8a3d", "#b56cff", "#2fd0e0", "#ff5fc1"];

// Gera as bolinhas uma vez (determinístico): elipse de bolinhas coloridas no primeiro plano.
const balls = (() => {
  const rand = seeded(42);
  const list = [];
  for (let i = 0; i < 900; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand());
    const x = 720 + Math.cos(a) * d * 820;
    const y = 700 + Math.sin(a) * d * 260;
    if (y < 440) continue;
    list.push({ x, y, r: 9 + rand() * 5 + (y - 440) * 0.025, c: Math.floor(rand() * COLORS.length) });
  }
  return list.sort((p, q) => p.y - q.y);
})();

// Paisagem do CTA final: colinas, árvores, um escorregador azul e a piscina de bolinhas.
const BallPit = () => (
  <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMin slice" className="size-full" aria-hidden>
    <defs>
      <linearGradient id="bp-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#eefbf4" />
      </linearGradient>
      <linearGradient id="bp-hill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2f9a5c" />
        <stop offset="100%" stopColor="#1b7a45" />
      </linearGradient>
      <linearGradient id="bp-hill2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6cc486" />
        <stop offset="100%" stopColor="#3f9e62" />
      </linearGradient>
      {COLORS.map((c, i) => (
        <radialGradient key={c} id={`bp-b${i}`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={light(c, 0.55)} />
          <stop offset="55%" stopColor={c} />
          <stop offset="100%" stopColor={dark(c, 0.3)} />
        </radialGradient>
      ))}
    </defs>
    <rect width="1440" height="800" fill="url(#bp-sky)" />
    <path d="M0 140 C 260 60, 520 120, 760 110 C 1000 100, 1200 40, 1440 90 L1440 800 L0 800 Z" fill="url(#bp-hill2)" />
    {[120, 190, 250, 1100, 1170, 1240, 1320].map((x, i) => (
      <Tree key={x} x={x} y={120 - (i % 3) * 10} s={0.7 + (i % 2) * 0.15} color="#237a4b" />
    ))}
    <path d="M0 260 C 300 190, 600 230, 900 220 C 1150 212, 1300 180, 1440 200 L1440 800 L0 800 Z" fill="url(#bp-hill)" />
    {[60, 140, 1290, 1380].map((x, i) => (
      <Tree key={x} x={x} y={250 - (i % 2) * 12} s={1} color="#1a6b40" />
    ))}
    {/* escorregador */}
    <circle cx="320" cy="120" r="22" fill="#1a1a1a" />
    <g fill="none" strokeLinecap="round">
      <path d="M320 130 C 330 200, 200 200, 260 260 C 300 300, 480 250, 520 330" stroke="#2350b8" strokeWidth="34" />
      <path d="M320 130 C 330 200, 200 200, 260 260 C 300 300, 480 250, 520 330" stroke="#3f7bff" strokeWidth="26" />
    </g>
    {/* túnel colorido */}
    <g transform="translate(720 360)">
      <ellipse cx="0" cy="0" rx="70" ry="64" fill="#2fb5d0" />
      <ellipse cx="0" cy="4" rx="52" ry="48" fill="#ff8a3d" />
      <ellipse cx="0" cy="8" rx="34" ry="32" fill="#ffd23f" />
    </g>
    {balls.map((b, i) => (
      <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={`url(#bp-b${b.c})`} />
    ))}
  </svg>
);

export default BallPit;
