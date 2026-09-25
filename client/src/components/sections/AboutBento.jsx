import { HiArrowRight } from "react-icons/hi2";
import { SiWhatsapp } from "react-icons/si";
import Reveal from "../ui/Reveal";
import Logo from "../ui/Logo";
import { about } from "../../content";
import { whatsappUrl, agendaUrl } from "../../lib/links";

const Arrow = ({ href, children, className = "" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group mt-4 inline-flex items-center gap-1 text-[14px] font-medium underline-offset-4 hover:underline ${className}`}
  >
    {children} <HiArrowRight className="transition-transform group-hover:translate-x-0.5" />
  </a>
);

const Waves = () => (
  <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
    <rect width="400" height="300" fill="#41002e" />
    <path d="M0 40 C 80 0, 140 70, 220 30 C 300 -8, 360 30, 400 10 L400 0 L0 0 Z" fill="#b9a6ff" />
    <path d="M0 250 C 90 200, 160 280, 260 240 C 330 212, 370 250, 400 230 L400 300 L0 300 Z" fill="#b9a6ff" />
    <path d="M0 272 C 100 236, 170 300, 270 266 C 340 244, 380 276, 400 262 L400 300 L0 300 Z" fill="#ff8ad8" />
    <path d="M0 290 C 110 262, 180 312, 290 286 C 350 272, 385 294, 400 288 L400 300 L0 300 Z" fill="#ff6a2b" />
  </svg>
);

const AboutBento = () => {
  const { person, howItWorks, journey, area, model } = about;
  return (
    <section id="sobre" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-mod">
        <Reveal as="h2" className="display text-center text-[34px] sm:text-[44px] lg:text-[52px]">
          {about.title}
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {/* Lucas */}
          <Reveal className="flex flex-col overflow-hidden rounded-[24px] bg-[#f3efff] md:row-span-2">
            <div className="relative aspect-[4/3.4]">
              {person.photo ? (
                <img src={person.photo} alt={`${person.name}, da Mod.`} className="absolute inset-0 size-full object-cover" />
              ) : (
                <>
                  <Waves />
                  <span className="absolute inset-0 grid place-items-center text-[64px] text-white">
                    <Logo mono />
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="eyebrow text-[#6b4de6]">{person.eyebrow}</p>
              <h3 className="mt-3 text-[24px] font-medium leading-tight tracking-tight">
                {person.name}, {person.role.toLowerCase()}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{person.text}</p>
              <Arrow href={whatsappUrl()} className="mt-auto pt-4">
                <SiWhatsapp /> Conversar com o Lucas
              </Arrow>
            </div>
          </Reveal>

          {/* Como funciona */}
          <Reveal delay={0.05} className="rounded-[24px] bg-mist p-6 md:col-span-2 md:p-8">
            <h3 className="text-[24px] font-medium tracking-tight">{howItWorks.title}</h3>
            <ol className="mt-5 grid gap-4 sm:grid-cols-3">
              {howItWorks.steps.map((s) => (
                <li key={s.n} className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                  <span className="text-[13px] font-bold text-muted">{s.n}</span>
                  <p className="mt-2 text-[17px] font-medium">{s.title}</p>
                  <p className="mt-1 text-[14px] leading-snug text-ink/65">{s.text}</p>
                </li>
              ))}
            </ol>
            <Arrow href={agendaUrl()}>Agendar diagnóstico</Arrow>
          </Reveal>

          {/* Trajetória */}
          <Reveal delay={0.1} className="rounded-[24px] bg-ink p-6 text-white">
            <p className="eyebrow text-lime">{journey.eyebrow}</p>
            <h3 className="mt-3 text-[19px] font-medium leading-snug tracking-tight">{journey.title}</h3>
            <ol className="mt-5 space-y-3 border-l border-white/15 pl-4">
              {journey.steps.map((s) => (
                <li key={s.year} className="relative text-[14px] leading-snug">
                  <span className="absolute -left-[21px] top-1.5 size-2.5 rounded-full bg-lime" />
                  <span className="font-bold">{s.year}</span> <span className="text-white/70">· {s.text}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Onde atende */}
          <Reveal
            delay={0.15}
            className="relative flex min-h-[280px] flex-col overflow-hidden rounded-[24px] bg-blue p-6 text-white md:row-span-2"
          >
            <p className="eyebrow text-white/75">{area.eyebrow}</p>
            <h3 className="relative z-10 mt-3 text-[24px] font-medium leading-tight tracking-tight">{area.title}</h3>
            <svg viewBox="0 0 300 260" className="mt-auto w-full" aria-hidden>
              {Array.from({ length: 9 }, (_, r) =>
                Array.from({ length: 12 }, (_, c) => (
                  <circle key={`${r}-${c}`} cx={14 + c * 25} cy={14 + r * 28} r="3" fill="#fff" opacity={0.18} />
                )),
              )}
              <circle
                cx="164"
                cy="126"
                r="40"
                fill="#fff"
                opacity="0.12"
                className="animate-float"
                style={{ transformOrigin: "164px 126px" }}
              />
              <circle cx="164" cy="126" r="22" fill="#fff" opacity="0.22" />
              <circle cx="164" cy="126" r="9" fill="#d4f23a" />
              <text x="182" y="100" fill="#fff" fontSize="14" fontWeight="600">
                Brasília-DF
              </text>
            </svg>
          </Reveal>

          {/* Modelo */}
          <Reveal
            delay={0.2}
            className="flex flex-col justify-between gap-6 rounded-[24px] bg-[#fff2ea] p-6 md:col-span-2 md:flex-row md:items-end md:p-8"
          >
            <div>
              <p className="eyebrow text-orange">{model.eyebrow}</p>
              <h3 className="mt-3 max-w-[22ch] text-[24px] font-medium leading-tight tracking-tight">{model.title}</h3>
              <p className="mt-2 text-[15px] text-ink/70">{model.text}</p>
            </div>
            <Arrow href={whatsappUrl()} className="mt-0 shrink-0">
              Chamar no WhatsApp
            </Arrow>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutBento;
