import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Tag from "../ui/Tag";
import Button from "../ui/Button";
import VideoSlot from "../ui/VideoSlot";
import PillarScene from "../scenes/PillarScene";
import { pillars, videos } from "../../content";
import { whatsappUrl, agendaUrl } from "../../lib/links";

const HEADER = 104; // altura do cabeçalho fixo + respiro
const STEP = 18; // quanto de cada card anterior continua aparecendo

const PillarCard = ({ pillar, index, total, progress }) => {
  // O card encolhe um pouco à medida que os próximos passam por cima dele.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.035]);
  const video = videos[pillar.id];

  return (
    <div className="md:sticky" style={{ top: HEADER + index * STEP }}>
      <motion.article
        style={{ scale, backgroundColor: pillar.tint, transformOrigin: "50% 0%" }}
        className="grid gap-6 rounded-[32px] p-5 ring-1 ring-black/[0.03] md:min-h-[600px] md:grid-cols-[1fr_1.05fr] md:gap-10 md:p-9"
      >
        <div className="flex flex-col">
          <Tag color={pillar.accent}>{pillar.tag}</Tag>
          <h3 className="display mt-5 text-[32px] sm:text-[40px] lg:text-[46px]">
            {pillar.title} <span style={{ color: pillar.accent }}>{pillar.highlight}</span>
          </h3>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-ink/70">{pillar.text}</p>

          <div className="mt-8 md:mt-auto">
            <ul className="flex flex-wrap gap-1.5">
              {pillar.services.map((s) => (
                <li key={s} className="rounded-full bg-white/80 px-3 py-1 text-[12px] font-medium ring-1 ring-black/5">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[44ch] text-[13px] leading-relaxed text-ink/60">{pillar.note}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                href={whatsappUrl(`Olá, Lucas! Vim pelo site da Mod. — ${pillar.cta.toLowerCase()}.`)}
                variant="accent"
                accent={pillar.accent}
              >
                {pillar.cta}
              </Button>
              <Button href={agendaUrl()} variant="ghost" arrow={false}>
                Agendar diagnóstico
              </Button>
            </div>
          </div>
        </div>

        <VideoSlot
          src={video.src}
          poster={video.poster}
          fallback={<PillarScene shape={pillar.shape} color={pillar.sceneColor} id={`p-${pillar.id}`} />}
          className="aspect-[5/5.4] rounded-[24px] bg-sand md:aspect-auto md:min-h-[520px]"
        />
      </motion.article>
    </div>
  );
};

const PillarStack = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="pilares" className="scroll-mt-24 pb-10">
      <div ref={ref} className="mx-auto flex max-w-[1120px] flex-col gap-6 px-3 md:gap-10 md:px-8">
        {pillars.map((pillar, i) => (
          <PillarCard key={pillar.id} pillar={pillar} index={i} total={pillars.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
};

export default PillarStack;
