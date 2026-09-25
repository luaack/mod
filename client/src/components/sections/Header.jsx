import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiBars3, HiXMark, HiChevronDown, HiArrowRight } from "react-icons/hi2";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { announcement, nav, services, hero } from "../../content";
import { whatsappUrl, agendaUrl } from "../../lib/links";

const MegaMenu = ({ onNavigate }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.18 }}
    // pt-2 (e não mt-2) para o mouse não "sair" do menu no vão entre a barra e o painel
    className="absolute inset-x-0 top-full hidden pt-2 lg:block"
  >
    <div className="grid grid-cols-[1fr_1fr_300px] gap-2 rounded-2xl bg-white p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
      {[services.items.slice(0, 4), services.items.slice(4)].map((col, c) => (
        <ul key={c} className="p-2">
          {col.map((s) => (
            <li key={s.id}>
              <a
                href="#servicos"
                onClick={() => onNavigate(s.id)}
                className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-mist"
              >
                <span className="mt-1 size-3 shrink-0 rounded-full" style={{ background: s.color }} />
                <span>
                  <span className="block text-[14px] font-medium">{s.label}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted">{s.text}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ))}
      <a
        href={agendaUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br from-[#88e6ee] via-[#6fcf97] to-[#1f7a47] p-5 text-white"
      >
        <span className="eyebrow text-white/80">Diagnóstico gratuito</span>
        <span className="mt-2 text-xl font-medium leading-tight tracking-tight">Descubra o que está travando suas vendas.</span>
        <span className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium">
          {hero.primary} <HiArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>
    </div>
  </motion.div>
);

const Header = () => {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectService = (id) => {
    setMegaOpen(false);
    setMobileOpen(false);
    window.dispatchEvent(new CustomEvent("mod:service", { detail: id }));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 md:px-6 lg:px-9">
      <div className="mx-auto max-w-[1400px]">
        <a
          href={agendaUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 items-center gap-3 bg-plum px-4 text-[13px] text-white md:px-5"
        >
          <span className="shrink-0 whitespace-nowrap rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-ink">
            {announcement.badge}
          </span>
          <span className="truncate text-white/90">{announcement.text}</span>
          <span className="ml-auto hidden items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold sm:inline-flex">
            {announcement.cta} <HiArrowRight />
          </span>
        </a>

        <nav
          className="relative flex h-14 items-center gap-6 rounded-b-2xl bg-white/95 px-4 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.3)] backdrop-blur md:px-5"
          onMouseLeave={() => setMegaOpen(false)}
        >
          <a href="#top" aria-label="Mod. — início" className="text-[22px]">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                {item.mega ? (
                  <button
                    type="button"
                    onMouseEnter={() => setMegaOpen(true)}
                    onClick={() => setMegaOpen((v) => !v)}
                    aria-expanded={megaOpen}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] text-ink/80 transition-colors hover:bg-mist hover:text-ink"
                  >
                    {item.label}
                    <HiChevronDown className={`size-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onMouseEnter={() => setMegaOpen(false)}
                    className="rounded-lg px-3 py-2 text-[14px] text-ink/80 transition-colors hover:bg-mist hover:text-ink"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <Button href={agendaUrl()} variant="gray" size="sm" arrow={false} className="max-sm:hidden">
              Agendar call
            </Button>
            <Button href={whatsappUrl()} variant="black" size="sm" arrow={false}>
              <span className="max-sm:hidden">Chamar no</span>WhatsApp
            </Button>
            <button
              type="button"
              className="grid size-9 place-items-center rounded-lg hover:bg-mist lg:hidden"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <HiXMark className="size-5" /> : <HiBars3 className="size-5" />}
            </button>
          </div>

          <AnimatePresence>{megaOpen && <MegaMenu onNavigate={selectService} />}</AnimatePresence>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-3 mt-2 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 lg:hidden"
            >
              <ul className="divide-y divide-line">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} onClick={() => setMobileOpen(false)} className="block py-3 text-[17px] font-medium">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid gap-2">
                <Button href={agendaUrl()} variant="gray" className="w-full">
                  Agendar call
                </Button>
                <Button href={whatsappUrl()} variant="black" className="w-full">
                  Chamar no WhatsApp
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
