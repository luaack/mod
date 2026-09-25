// Faixa infinita: o conteúdo é duplicado e desliza 50% em loop. Pausa ao passar o mouse.
const Marquee = ({ children, duration = 60, className = "" }) => (
  <div className={`group/marquee flex overflow-hidden fade-x ${className}`}>
    <div
      className="flex w-max shrink-0 animate-marquee group-hover/marquee:[animation-play-state:paused]"
      style={{ "--marquee-duration": `${duration}s` }}
    >
      <div className="flex shrink-0">{children}</div>
      <div className="flex shrink-0" aria-hidden>
        {children}
      </div>
    </div>
  </div>
);

export default Marquee;
