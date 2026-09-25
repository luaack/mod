// Utilitários para desenhar formas com aparência de massinha (luz no topo, sombra na base).

export const mix = (hex, target, amount) => {
  const a = parseInt(hex.slice(1), 16);
  const b = parseInt(target.slice(1), 16);
  const ch = (v, s) => (v >> s) & 255;
  const m = (s) => Math.round(ch(a, s) + (ch(b, s) - ch(a, s)) * amount);
  return `#${((1 << 24) | (m(16) << 16) | (m(8) << 8) | m(0)).toString(16).slice(1)}`;
};

export const light = (hex, amount = 0.35) => mix(hex, "#ffffff", amount);
export const dark = (hex, amount = 0.3) => mix(hex, "#000000", amount);

// Gerador pseudoaleatório determinístico (as cenas saem iguais em todo render).
export const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
