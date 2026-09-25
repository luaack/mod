import { HiArrowRight, HiOutlineMapPin } from "react-icons/hi2";
import Reveal from "../ui/Reveal";
import VideoSlot from "../ui/VideoSlot";
import SystemScene from "../scenes/SystemScene";
import { strategy, videos } from "../../content";
import { agendaUrl } from "../../lib/links";

const StrategySection = () => (
  <section className="px-3 py-16 md:px-6 md:py-24">
    <Reveal className="mx-auto max-w-[1100px] rounded-[32px] bg-mist p-5 md:p-10">
      <div className="grid gap-6 md:grid-cols-2 md:gap-12">
        <div>
          <p className="eyebrow text-teal">{strategy.tag}</p>
          <h2 className="display mt-4 text-[32px] sm:text-[40px] lg:text-[46px]">
            {strategy.title} <span className="text-teal">{strategy.highlight}</span>
          </h2>
          <a
            href={agendaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-1 text-[14px] font-medium underline-offset-4 hover:underline"
          >
            {strategy.cta} <HiArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <div className="md:pt-8">
          <p className="text-[17px] leading-relaxed text-ink/80">{strategy.text}</p>
          <p className="mt-5 flex items-start gap-2 text-[13px] text-muted">
            <HiOutlineMapPin className="mt-0.5 size-4 shrink-0" /> {strategy.note}
          </p>
        </div>
      </div>
      <VideoSlot
        video={videos.sistema}
        fallback={<SystemScene />}
        className="mt-8 aspect-[16/9] rounded-[24px] bg-sand sm:aspect-[16/8] md:mt-10 md:aspect-[16/7]"
      />
    </Reveal>
  </section>
);

export default StrategySection;
