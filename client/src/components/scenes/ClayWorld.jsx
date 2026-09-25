import { light, dark } from "./clay";
import { ClayGradient, Tree } from "./ClayParts";

// Ilustração da hero: um mundinho de massinha com loja, funil, celular e gráfico.
const ClayWorld = ({ className = "" }) => (
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className={`size-full ${className}`} aria-hidden>
    <defs>
      <linearGradient id="cw-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6fd6e4" />
        <stop offset="55%" stopColor="#b9eff2" />
        <stop offset="100%" stopColor="#e3fbf6" />
      </linearGradient>
      <linearGradient id="cw-hill-back" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7cc98d" />
        <stop offset="100%" stopColor="#4fa56b" />
      </linearGradient>
      <linearGradient id="cw-hill-mid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2b8f55" />
        <stop offset="100%" stopColor="#136a3e" />
      </linearGradient>
      <linearGradient id="cw-hill-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0f6640" />
        <stop offset="100%" stopColor="#053f28" />
      </linearGradient>
      <ClayGradient id="cw-cream" color="#f3e6cf" />
      <ClayGradient id="cw-blue" color="#3f8fe0" />
      <ClayGradient id="cw-orange" color="#ff7a2e" />
      <ClayGradient id="cw-pink" color="#ea4fb5" />
      <ClayGradient id="cw-lime" color="#b7e03a" />
      <ClayGradient id="cw-red" color="#e8412f" />
      <ClayGradient id="cw-teal" color="#27b3a6" />
      <filter id="cw-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="10" />
      </filter>
    </defs>

    <rect width="1440" height="900" fill="url(#cw-sky)" />
    {/* nuvens */}
    <g fill="#fff" opacity="0.75" filter="url(#cw-soft)">
      <ellipse cx="260" cy="120" rx="120" ry="26" />
      <ellipse cx="1120" cy="90" rx="150" ry="24" />
      <ellipse cx="760" cy="60" rx="90" ry="18" />
    </g>

    {/* colinas */}
    <path
      d="M0 360 C 200 300, 380 330, 560 350 C 760 372, 940 300, 1140 320 C 1280 334, 1380 320, 1440 330 L1440 900 L0 900 Z"
      fill="url(#cw-hill-back)"
    />
    {[80, 150, 1240, 1320, 1390, 330].map((x, i) => (
      <Tree key={`b${i}`} x={x} y={352 - (i % 3) * 8} s={0.55 + (i % 2) * 0.12} color="#2f8a55" />
    ))}
    <path d="M0 470 C 240 400, 470 430, 700 470 C 920 508, 1150 420, 1440 450 L1440 900 L0 900 Z" fill="url(#cw-hill-mid)" />
    {[40, 120, 190, 1180, 1260, 1330, 1410].map((x, i) => (
      <Tree key={`m${i}`} x={x} y={470 - (i % 2) * 14} s={0.8 + (i % 3) * 0.1} color="#1c6a41" />
    ))}
    <path d="M0 610 C 260 540, 560 560, 820 600 C 1060 636, 1260 580, 1440 590 L1440 900 L0 900 Z" fill="url(#cw-hill-front)" />

    {/* celular com mensagens (esquerda) */}
    <g className="animate-float" style={{ transformOrigin: "250px 210px", animationDelay: "-1s" }}>
      <g transform="translate(2 -90) scale(0.8)">
        <ellipse cx="300" cy="520" rx="70" ry="12" fill="#000" opacity="0.15" />
        <rect x="248" y="262" width="110" height="220" rx="24" fill="url(#cw-blue)" transform="rotate(-8 300 380)" />
        <rect x="260" y="280" width="86" height="180" rx="14" fill="#eaf6ff" transform="rotate(-8 300 380)" />
        <g transform="rotate(-8 300 380)">
          <rect x="270" y="300" width="56" height="20" rx="10" fill="url(#cw-lime)" />
          <rect x="282" y="330" width="56" height="20" rx="10" fill="url(#cw-orange)" />
          <rect x="270" y="360" width="46" height="20" rx="10" fill="url(#cw-lime)" />
          <rect x="286" y="390" width="52" height="20" rx="10" fill="url(#cw-pink)" />
        </g>
      </g>
    </g>

    {/* funil com bolinhas (centro) */}
    <g className="animate-float" style={{ transformOrigin: "830px 215px" }}>
      <g transform="translate(269 75) scale(0.78)">
        <circle cx="690" cy="96" r="18" fill="url(#cw-pink)" />
        <circle cx="728" cy="88" r="16" fill="url(#cw-lime)" />
        <rect x="752" y="84" width="30" height="30" rx="8" fill="url(#cw-blue)" transform="rotate(18 767 99)" />
        <circle cx="712" cy="118" r="15" fill="url(#cw-orange)" />
        <path
          d="M630 120 L810 120 C 812 132, 800 140, 790 142 L748 232 L692 232 L650 142 C 640 140, 628 132, 630 120 Z"
          fill="url(#cw-cream)"
        />
        <ellipse cx="720" cy="121" rx="90" ry="14" fill={dark("#f3e6cf", 0.12)} />
        <rect x="700" y="228" width="40" height="36" rx="8" fill="url(#cw-cream)" />
        <path d="M708 262 L732 262 L720 290 Z" fill="url(#cw-pink)" />
      </g>
    </g>

    {/* cano azul em espiral (centro-direita) */}
    <g fill="none" strokeLinecap="round" transform="translate(-134 -9) scale(0.58)">
      <path
        d="M800 300 C 860 240, 960 250, 960 310 C 960 360, 890 370, 880 330 C 872 296, 930 280, 1000 300 L1060 320"
        stroke={dark("#3f8fe0", 0.2)}
        strokeWidth="44"
      />
      <path
        d="M800 300 C 860 240, 960 250, 960 310 C 960 360, 890 370, 880 330 C 872 296, 930 280, 1000 300 L1060 320"
        stroke="#3f8fe0"
        strokeWidth="36"
      />
      <path d="M800 294 C 860 234, 956 246, 954 306" stroke={light("#3f8fe0", 0.4)} strokeWidth="8" opacity="0.7" />
    </g>

    {/* loja (centro) */}
    <g transform="translate(157 -92) scale(0.73)">
      <ellipse cx="620" cy="560" rx="150" ry="18" fill="#000" opacity="0.18" />
      <rect x="490" y="420" width="260" height="140" rx="14" fill="url(#cw-cream)" />
      <path d="M470 400 L770 400 L760 450 L480 450 Z" fill="url(#cw-red)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${482 + i * 56} 450 q 14 22 28 0`} fill={i % 2 ? "#fff" : light("#e8412f", 0.15)} />
      ))}
      {[0, 2, 4].map((i) => (
        <rect key={i} x={482 + i * 56} y="400" width="28" height="50" fill="#fff" opacity="0.85" />
      ))}
      <rect x="515" y="478" width="90" height="82" rx="8" fill="#9ed8f0" />
      <rect x="520" y="483" width="36" height="72" rx="5" fill={light("#9ed8f0", 0.4)} />
      <rect x="630" y="478" width="92" height="56" rx="8" fill="#9ed8f0" />
      <circle cx="660" cy="520" r="10" fill="url(#cw-orange)" />
      <circle cx="690" cy="522" r="9" fill="url(#cw-lime)" />
      <rect x="560" y="370" width="120" height="34" rx="17" fill="url(#cw-teal)" />
    </g>

    {/* gráfico de barras (direita) */}
    <g transform="translate(351 -53) scale(0.7)">
      <ellipse cx="1060" cy="540" rx="120" ry="14" fill="#000" opacity="0.16" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={970 + i * 48}
          y={470 - i * 60}
          width="42"
          height={70 + i * 60}
          rx="8"
          fill={i === 3 ? "url(#cw-orange)" : "url(#cw-cream)"}
        />
      ))}
      <circle
        cx="1136"
        cy="270"
        r="18"
        fill="url(#cw-orange)"
        className="animate-float"
        style={{ transformOrigin: "1136px 270px" }}
      />
    </g>

    {/* lupa (esquerda-centro) */}
    <g transform="translate(652 20) scale(0.7) rotate(-18 440 300)">
      <circle cx="440" cy="300" r="42" fill="#d9f6ff" opacity="0.8" />
      <circle cx="440" cy="300" r="42" fill="none" stroke="url(#cw-cream)" strokeWidth="14" />
      <rect x="432" y="344" width="16" height="70" rx="8" fill="url(#cw-red)" />
    </g>

    {/* bolinhas no chão */}
    <circle cx="1000" cy="318" r="12" fill="url(#cw-red)" />
    <circle cx="455" cy="318" r="10" fill="url(#cw-lime)" />
    <circle cx="1345" cy="336" r="11" fill="url(#cw-pink)" />
  </svg>
);

export default ClayWorld;
