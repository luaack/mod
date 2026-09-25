import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Reveal from "../ui/Reveal";
import { AdsMock, CreativesMock, FunnelMock, SocialMock, ManagementMock, CrmMock, DesignMock, VideoMock } from "../mocks/Mocks";
import { services } from "../../content";

const INTERVAL = 6000;

const mocks = {
  ads: AdsMock,
  creatives: CreativesMock,
  funnel: FunnelMock,
  social: SocialMock,
  management: ManagementMock,
  crm: CrmMock,
  design: DesignMock,
  video: VideoMock,
};

// Abas que avançam sozinhas enquanto a seção está visível, como na referência.
const ServicesTabs = () => {
  const items = services.items;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const tabsRef = useRef(null);
  const inView = useInView(sectionRef, { margin: "-20% 0px" });
  const current = items[active];
  const Mock = mocks[current.mock];

  const select = useCallback((index) => {
    setActive(index);
    const tab = tabsRef.current?.children[index];
    const list = tabsRef.current;
    if (tab && list) list.scrollTo({ left: tab.offsetLeft - list.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = setTimeout(() => select((active + 1) % items.length), INTERVAL);
    return () => clearTimeout(timer);
  }, [active, inView, paused, items.length, select]);

  // Links do menu e do rodapé podem abrir uma aba específica.
  useEffect(() => {
    const onService = (e) => {
      const index = items.findIndex((s) => s.id === e.detail);
      if (index >= 0) select(index);
    };
    window.addEventListener("mod:service", onService);
    return () => window.removeEventListener("mod:service", onService);
  }, [items, select]);

  return (
    <section id="servicos" ref={sectionRef} className="scroll-mt-24 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container-mod text-center">
        <Reveal as="h2" className="display mx-auto max-w-[15ch] text-[38px] sm:text-[52px] lg:text-[64px]">
          {services.title}
        </Reveal>
        <div className="mx-auto mt-5 min-h-[3.2em] max-w-[46ch] text-[16px] leading-snug text-muted md:text-[17px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {current.text}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="container-mod mt-8">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Serviços"
            className="no-scrollbar fade-x flex gap-1.5 overflow-x-auto px-[8%] py-1 md:justify-center md:px-0 md:[mask-image:none]"
          >
            {items.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="servicos-painel"
                  onClick={() => select(i)}
                  className={`relative shrink-0 overflow-hidden rounded-[10px] px-3.5 py-2 text-[14px] transition-colors duration-300 ${
                    selected ? "text-ink" : "text-ink/55 hover:bg-mist hover:text-ink"
                  }`}
                  style={selected ? { background: `color-mix(in srgb, ${s.color} 45%, white)` } : undefined}
                >
                  {s.label}
                  {selected && !paused && inView && (
                    <motion.span
                      key={`${s.id}-progress`}
                      className="absolute bottom-0 left-0 h-[2px]"
                      style={{ background: s.color }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto mt-10 max-w-[1180px] px-3 md:px-6">
          {/* faixa colorida atrás da tela, muda de cor com a aba */}
          <motion.div
            aria-hidden
            className="absolute inset-x-3 top-[28%] bottom-6 rounded-[28px] md:inset-x-6"
            animate={{ backgroundColor: current.color }}
            transition={{ duration: 0.6 }}
          />
          <div id="servicos-painel" role="tabpanel" className="relative mx-auto max-w-[900px] px-2 pb-14 md:px-0 md:pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.985 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Mock />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTabs;
