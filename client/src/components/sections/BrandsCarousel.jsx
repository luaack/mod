import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Reveal from "../ui/Reveal";
import { brands, clients } from "../../content";
import { whatsappUrl } from "../../lib/links";

const INTERVAL = 5000;
const GAP = 16;

// Letras "de massinha" em 3D (sombra empilhada), como os cards de marca da referência.
const extrude = Array.from({ length: 14 }, (_, i) => `${i + 1}px ${i + 1}px 0 #262626`).join(", ");

const BrandCard = ({ brand, active }) => (
  <article
    className="relative h-full overflow-hidden rounded-[24px]"
    style={{ background: `linear-gradient(to bottom, #f4f3f0 0 58%, ${brand.colors[0]} 58% 100%)` }}
  >
    {brand.logo ? (
      <img
        src={brand.logo}
        alt={brand.name}
        className="absolute left-1/2 top-[42%] max-h-[40%] max-w-[60%] -translate-x-1/2 -translate-y-1/2"
      />
    ) : (
      <span
        aria-hidden
        className="absolute left-1/2 top-[40%] whitespace-nowrap text-[clamp(56px,11vw,150px)] font-bold tracking-[-0.04em] text-[#3a3a3a] transition-transform duration-700"
        style={{
          textShadow: `${extrude}, 20px 30px 40px rgba(0,0,0,0.25)`,
          transform: `translate(-50%, -50%) rotate(${active ? -12 : -6}deg)`,
        }}
      >
        {brand.short}
      </span>
    )}
    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-6 text-center">
      <p className="text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: brand.colors[1] }}>
        {brand.segment}
      </p>
      <h3 className="mt-1 text-[20px] font-medium tracking-tight md:text-[24px]">{brand.name}</h3>
      <p className="mt-1 max-w-[46ch] text-[14px] leading-snug text-ink/70">{brand.work}</p>
    </div>
  </article>
);

// Carrossel infinito: as marcas são repetidas 3x e a posição volta para a cópia do meio sem animação.
const BrandsCarousel = () => {
  const total = brands.length;
  const slides = [...brands, ...brands, ...brands];
  const [pos, setPos] = useState(total);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(0);
  const viewport = useRef(null);
  const inView = useInView(viewport, { margin: "-20% 0px" });
  const index = ((pos % total) + total) % total;

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => {
      setInstant(false);
      setPos((p) => p + 1);
    }, INTERVAL);
    return () => clearTimeout(timer);
  }, [pos, inView, paused]);

  const cardWidth = width < 640 ? width * 0.86 : width * 0.8;
  const x = (width - cardWidth) / 2 - pos * (cardWidth + GAP);
  const go = (dir) => {
    setInstant(false);
    setPos((p) => p + dir);
  };
  const recenter = () => {
    if (pos >= total * 2 || pos < total) {
      setInstant(true);
      setPos(total + index);
    }
  };

  return (
    <section id="clientes" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-mod">
        <Reveal as="h2" className="display mx-auto max-w-[17ch] text-center text-[34px] sm:text-[44px] lg:text-[52px]">
          {clients.title}
        </Reveal>

        <div
          ref={viewport}
          className="relative mt-10 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carrossel"
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            style={{ gap: GAP }}
            animate={{ x }}
            transition={instant ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 24 }}
            onAnimationComplete={recenter}
            drag="x"
            dragConstraints={{ left: x, right: x }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
          >
            {slides.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="aspect-[4/5] shrink-0 sm:aspect-[16/9]"
                style={{ width: cardWidth || "80%" }}
                aria-hidden={i !== pos}
              >
                <BrandCard brand={brand} active={i === pos} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Marca anterior"
            className="grid size-10 place-items-center rounded-full bg-mist hover:bg-line"
          >
            <HiArrowLeft />
          </button>
          <div className="flex gap-1.5">
            {brands.map((b, i) => (
              <button
                key={b.name}
                type="button"
                aria-label={`Ver ${b.name}`}
                onClick={() => {
                  setInstant(false);
                  setPos(total + i);
                }}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-ink" : "w-1.5 bg-ink/20"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima marca"
            className="grid size-10 place-items-center rounded-full bg-mist hover:bg-line"
          >
            <HiArrowRight />
          </button>
        </div>
        <p className="mt-6 text-center">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-[14px] font-medium underline-offset-4 hover:underline"
          >
            Quero que o meu negócio seja o próximo <HiArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </p>
      </div>
    </section>
  );
};

export default BrandsCarousel;
