import { useEffect, useRef, useState } from "react";

const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

// Mostra o vídeo (WebM, com MP4 de reserva) e o poster enquanto carrega. Sem vídeo, mostra a ilustração `fallback`.
// Em telas de até 767px usa `video.mobile`, se existir. O vídeo só toca enquanto está visível.
const VideoSlot = ({ video, fallback, className = "", label }) => {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  const [source] = useState(() => (video?.mobile && isMobile() ? video.mobile : video));
  const hasVideo = Boolean(source?.src || source?.webm) && !failed;

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasVideo) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasVideo]);

  return (
    <div
      className={`overflow-hidden ${/\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative"} ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {!hasVideo && <div className="absolute inset-0">{fallback}</div>}
      {hasVideo && (
        <video
          ref={ref}
          className="absolute inset-0 size-full object-cover"
          poster={source.poster || undefined}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          {source.webm && <source src={source.webm} type="video/webm" onError={source.src ? undefined : () => setFailed(true)} />}
          {source.src && <source src={source.src} type="video/mp4" onError={() => setFailed(true)} />}
        </video>
      )}
    </div>
  );
};

export default VideoSlot;
