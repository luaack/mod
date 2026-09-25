import { useEffect, useRef, useState } from "react";

// Mostra o vídeo quando existe um `src`; até ele carregar (ou se não existir), mostra a ilustração `fallback`.
// O vídeo só toca enquanto está visível na tela.
const VideoSlot = ({ src, poster, fallback, className = "", label }) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  const showVideo = src && !failed;

  return (
    <div
      className={`overflow-hidden ${/\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative"} ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {(!showVideo || !ready) && <div className="absolute inset-0">{fallback}</div>}
      {showVideo && (
        <video
          ref={ref}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          src={src}
          poster={poster || undefined}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onLoadedData={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};

export default VideoSlot;
