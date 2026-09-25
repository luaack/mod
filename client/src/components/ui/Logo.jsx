const Logo = ({ className = "", mono = false }) => (
  <span className={`inline-flex items-center gap-1.5 select-none ${className}`}>
    <svg viewBox="0 0 24 22" aria-hidden className="h-[0.95em] w-auto">
      <rect x="0" y="9" width="6" height="13" rx="3" fill={mono ? "currentColor" : "#3D4BFF"} />
      <rect x="9" y="5" width="6" height="17" rx="3" fill={mono ? "currentColor" : "#FF6A2B"} />
      <rect x="18" y="0" width="6" height="22" rx="3" fill={mono ? "currentColor" : "#C8129F"} />
    </svg>
    <span className="font-bold tracking-[-0.04em]">mod.</span>
  </span>
);

export default Logo;
