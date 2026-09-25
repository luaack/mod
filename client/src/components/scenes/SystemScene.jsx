import { Magnet, Funnel, Star, Bars } from "./Objects";

// Os quatro objetos dos pilares ligados por um cano: o "sistema inteiro trabalhando junto".
const SystemScene = () => (
  <svg viewBox="0 0 1000 440" preserveAspectRatio="xMidYMid slice" className="size-full" aria-hidden>
    <defs>
      <linearGradient id="ss-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f6efe4" />
        <stop offset="100%" stopColor="#e9dcc8" />
      </linearGradient>
    </defs>
    <rect width="1000" height="440" fill="url(#ss-bg)" />
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M150 250 C 220 150, 300 320, 380 240 C 450 170, 540 330, 620 250 C 690 180, 780 320, 850 240"
        stroke="#cfc3ad"
        strokeWidth="30"
      />
      <path
        d="M150 250 C 220 150, 300 320, 380 240 C 450 170, 540 330, 620 250 C 690 180, 780 320, 850 240"
        stroke="#fbf7f0"
        strokeWidth="22"
      />
    </g>
    {[
      { x: 150, Obj: Magnet, color: "#3d4bff", id: "ss-a" },
      { x: 380, Obj: Funnel, color: "#ff6a2b", id: "ss-b" },
      { x: 620, Obj: Star, color: "#8ccf1f", id: "ss-c" },
      { x: 850, Obj: Bars, color: "#e03cb8", id: "ss-d" },
    ].map((item, i) => {
      const { x, Obj, color, id } = item;
      return (
        <g key={id}>
          <ellipse cx={x} cy="345" rx="70" ry="12" fill="#000" opacity="0.1" />
          <g className="animate-float" style={{ transformOrigin: `${x}px 240px`, animationDelay: `${-i * 1.2}s` }}>
            <g transform={`translate(${x} 240) scale(0.72)`}>
              <Obj color={color} id={id} />
            </g>
          </g>
        </g>
      );
    })}
    <path d="M470 400 L490 366 L510 400 Z" fill="#8a8274" opacity="0.5" />
    <rect x="560" y="376" width="26" height="26" rx="3" fill="#8a8274" opacity="0.45" />
    <ellipse cx="520" cy="420" rx="22" ry="7" fill="#8a8274" opacity="0.45" />
  </svg>
);

export default SystemScene;
