const Tag = ({ children, color = "var(--color-ink)", className = "" }) => (
  <span
    className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white ${className}`}
    style={{ backgroundColor: color, boxShadow: `0 0 0 4px color-mix(in srgb, ${color} 18%, transparent)` }}
  >
    {children}
  </span>
);

export default Tag;
