import { Magnet, Funnel, Star, Bars } from "./Objects";
import { dark } from "./clay";
import { ClayGradient } from "./ClayParts";

const objects = { magnet: Magnet, funnel: Funnel, star: Star, bars: Bars };

// Palco bege com um cano e o objeto do pilar, no estilo dos vídeos da referência.
const PillarScene = ({ shape, color, id }) => {
  const Object3D = objects[shape];
  return (
    <svg viewBox="0 0 500 600" preserveAspectRatio="xMidYMid slice" className="size-full" aria-hidden>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6efe4" />
          <stop offset="100%" stopColor="#ede2d0" />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e6d9c4" />
          <stop offset="100%" stopColor="#f3ebde" />
        </linearGradient>
        <ClayGradient id={`${id}-ball`} color="#ff7a2e" />
      </defs>
      <rect width="500" height="600" fill={`url(#${id}-bg)`} />
      <path d="M0 360 L500 330 L500 600 L0 600 Z" fill={`url(#${id}-floor)`} />
      {/* cano */}
      <g strokeLinecap="round" fill="none">
        <path d="M560 230 L330 330" stroke="#cfc3ad" strokeWidth="46" />
        <path d="M560 230 L330 330" stroke="#ebe3d6" strokeWidth="38" />
        <path d="M560 222 L336 318" stroke="#fff" strokeWidth="6" opacity="0.7" />
      </g>
      <circle
        cx="400"
        cy="296"
        r="15"
        fill={`url(#${id}-ball)`}
        className="animate-float"
        style={{ transformOrigin: "400px 296px" }}
      />
      <ellipse cx="220" cy="470" rx="110" ry="18" fill={dark("#e6d9c4", 0.25)} opacity="0.6" />
      <g className="animate-float" style={{ transformOrigin: "220px 360px" }}>
        <g transform="translate(220 360) scale(1.15)">
          <Object3D color={color} id={id} />
        </g>
      </g>
    </svg>
  );
};

export default PillarScene;
