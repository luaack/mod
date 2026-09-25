import { light, dark } from "./clay";

// Gradiente radial "de massinha" para usar como fill.
export const ClayGradient = ({ id, color, cx = "35%", cy = "30%" }) => (
  <radialGradient id={id} cx={cx} cy={cy} r="80%">
    <stop offset="0%" stopColor={light(color, 0.45)} />
    <stop offset="45%" stopColor={color} />
    <stop offset="100%" stopColor={dark(color, 0.28)} />
  </radialGradient>
);

export const Tree = ({ x, y, s = 1, color = "#1f6b45" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="0" cy="2" rx="16" ry="4" fill="#000" opacity="0.12" />
    <rect x="-3" y="-14" width="6" height="16" rx="3" fill="#6b4a2f" />
    <path d="M0 -78 C 10 -60, 22 -32, 20 -18 C 18 -8, -18 -8, -20 -18 C -22 -32, -10 -60, 0 -78 Z" fill={color} />
    <path
      d="M0 -78 C -6 -60, -12 -36, -10 -20 C -16 -22, -20 -24, -20 -18 C -22 -32, -10 -60, 0 -78 Z"
      fill={light(color, 0.22)}
      opacity="0.8"
    />
  </g>
);
