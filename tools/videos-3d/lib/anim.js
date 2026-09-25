export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const seg = (t, a, b) => clamp((t - a) / (b - a));
export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);
export const easeIn = (t) => t * t * t;
export const easeOutBack = (t, s = 1.70158) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
// 0 → 1 → 0 dentro do intervalo
export const bump = (t, a, b) => Math.sin(seg(t, a, b) * Math.PI);
// oscilação amortecida que começa em `start`
export const damped = (t, start, freq = 3, decay = 5) =>
  t < start ? 0 : Math.exp(-(t - start) * decay) * Math.sin((t - start) * freq * 2 * Math.PI);
export const TAU = Math.PI * 2;
// posição de uma bolinha caindo com gravidade entre dois pontos (arco parabólico)
export const arc = (p0, p1, h, u) => ({
  x: lerp(p0.x, p1.x, u),
  y: lerp(p0.y, p1.y, u) + 4 * h * u * (1 - u),
  z: lerp(p0.z, p1.z, u),
});
export const mulberry32 = (a) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
