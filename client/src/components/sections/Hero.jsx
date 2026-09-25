import { motion } from "framer-motion";
import { SiMeta, SiGoogleads, SiWhatsapp } from "react-icons/si";
import VideoSlot from "../ui/VideoSlot";
import Button from "../ui/Button";
import ClayWorld from "../scenes/ClayWorld";
import { hero, videos } from "../../content";
import { whatsappUrl, agendaUrl } from "../../lib/links";

const rise = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

const Hero = () => (
  <section id="top" className="relative isolate overflow-hidden pb-40 md:min-h-[max(820px,100svh)] md:pb-0">
    <VideoSlot src={videos.hero.src} poster={videos.hero.poster} fallback={<ClayWorld />} className="absolute inset-0 -z-10" />
    {/* contraste para o texto branco e transição para o branco da página */}
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_20%_70%,rgba(0,40,20,0.35),transparent_70%)]" />
    <div className="absolute inset-x-0 bottom-0 -z-10 h-[34%] bg-gradient-to-b from-transparent to-white" />

    <div className="container-mod grid gap-8 pt-[300px] md:grid-cols-[1.45fr_1fr] md:gap-12 md:pt-[max(330px,36svh)]">
      <motion.h1
        {...rise(0.1)}
        className="display max-w-[10.5ch] text-[44px] text-white [text-shadow:0_2px_30px_rgba(0,40,20,0.25)] sm:text-[58px] lg:text-[76px]"
      >
        {hero.title}
      </motion.h1>

      <motion.div {...rise(0.25)} className="flex flex-col items-start gap-5 md:pt-2">
        <p className="max-w-[34ch] text-[17px] leading-snug text-white [text-shadow:0_1px_16px_rgba(0,40,20,0.35)] md:text-[19px]">
          {hero.text}
        </p>
        <div className="flex flex-col items-start gap-2.5">
          <Button href={agendaUrl()} variant="white">
            {hero.primary}
          </Button>
          <Button href={whatsappUrl()} variant="lime">
            <SiWhatsapp className="size-4" /> {hero.secondary}
          </Button>
        </div>
        <p className="flex items-center gap-2 text-[13px] text-white/85">
          {hero.platformsLabel}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-1 backdrop-blur">
            <SiMeta aria-label="Meta Ads" /> <SiGoogleads aria-label="Google Ads" />
          </span>
        </p>
      </motion.div>
    </div>
  </section>
);

export default Hero;
