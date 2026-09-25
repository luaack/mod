import { light } from "./clay";
import { ClayGradient } from "./ClayParts";

// Personagens/objetos de massinha, um por pilar. Todos desenhados numa caixa de 200x200 centrada em (0,0).

export const Magnet = ({ color, id }) => (
  <g>
    <defs>
      <ClayGradient id={`${id}-m`} color={color} />
      <ClayGradient id={`${id}-t`} color="#e9edf2" />
    </defs>
    <path
      d="M-70 -60 L-70 10 C -70 70, 70 70, 70 10 L70 -60 L32 -60 L32 10 C 32 34, -32 34, -32 10 L-32 -60 Z"
      fill={`url(#${id}-m)`}
    />
    <rect x="-72" y="-96" width="42" height="38" rx="8" fill={`url(#${id}-t)`} />
    <rect x="30" y="-96" width="42" height="38" rx="8" fill={`url(#${id}-t)`} />
    <path d="M-60 -40 L-60 8" stroke={light(color, 0.5)} strokeWidth="6" strokeLinecap="round" opacity="0.6" />
  </g>
);

export const Funnel = ({ color, id }) => (
  <g>
    <defs>
      <ClayGradient id={`${id}-f`} color={color} />
      <ClayGradient id={`${id}-b1`} color="#3d4bff" />
      <ClayGradient id={`${id}-b2`} color="#d4f23a" />
    </defs>
    <circle cx="-26" cy="-96" r="16" fill={`url(#${id}-b1)`} />
    <circle cx="18" cy="-104" r="14" fill={`url(#${id}-b2)`} />
    <path
      d="M-86 -70 L86 -70 C 88 -56, 76 -48, 66 -46 L22 34 L-22 34 L-66 -46 C -76 -48, -88 -56, -86 -70 Z"
      fill={`url(#${id}-f)`}
    />
    <ellipse cx="0" cy="-69" rx="86" ry="14" fill={light(color, 0.2)} opacity="0.6" />
    <rect x="-18" y="30" width="36" height="42" rx="8" fill={`url(#${id}-f)`} />
    <circle cx="0" cy="92" r="13" fill={`url(#${id}-b1)`} />
  </g>
);

export const Star = ({ color, id }) => (
  <g>
    <defs>
      <ClayGradient id={`${id}-s`} color={color} />
    </defs>
    <path
      d="M0 -92 C 10 -92, 14 -60, 26 -44 C 38 -30, 84 -34, 88 -24 C 92 -12, 54 12, 48 30 C 42 48, 60 88, 50 94 C 40 100, 12 70, 0 70 C -12 70, -40 100, -50 94 C -60 88, -42 48, -48 30 C -54 12, -92 -12, -88 -24 C -84 -34, -38 -30, -26 -44 C -14 -60, -10 -92, 0 -92 Z"
      fill={`url(#${id}-s)`}
    />
    <ellipse cx="-22" cy="-20" rx="10" ry="14" fill="#1d2a10" />
    <ellipse cx="22" cy="-20" rx="10" ry="14" fill="#1d2a10" />
    <circle cx="-19" cy="-25" r="3.5" fill="#fff" />
    <circle cx="25" cy="-25" r="3.5" fill="#fff" />
    <path d="M-18 14 C -8 26, 8 26, 18 14" stroke="#1d2a10" strokeWidth="6" fill="none" strokeLinecap="round" />
  </g>
);

export const Bars = ({ color, id }) => (
  <g>
    <defs>
      <ClayGradient id={`${id}-p`} color={color} />
      <ClayGradient id={`${id}-c`} color="#f3e6cf" />
    </defs>
    <rect x="-84" y="10" width="44" height="70" rx="10" fill={`url(#${id}-c)`} />
    <rect x="-24" y="-30" width="44" height="110" rx="10" fill={`url(#${id}-c)`} />
    <rect x="36" y="-80" width="44" height="160" rx="10" fill={`url(#${id}-p)`} />
    <path
      d="M-80 -20 L-20 -60 L20 -44 L70 -112"
      stroke={color}
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M52 -114 L74 -116 L72 -94"
      stroke={color}
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
);
