import { SiWhatsapp, SiInstagram } from "react-icons/si";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import VideoSlot from "../ui/VideoSlot";
import BallPit from "../scenes/BallPit";
import { finalCta, footer, services, pillars, nav, brands, contact, videos } from "../../content";
import { whatsappUrl, agendaUrl } from "../../lib/links";

const Column = ({ title, children }) => (
  <div>
    <p className="eyebrow mb-4 text-ink">{title}</p>
    <ul className="space-y-2 text-[14px] text-ink/60">{children}</ul>
  </div>
);

const Item = ({ href, children, onClick }) => (
  <li>
    {href ? (
      <a
        href={href}
        onClick={onClick}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="transition-colors hover:text-ink"
      >
        {children}
      </a>
    ) : (
      children
    )}
  </li>
);

const selectService = (id) => window.dispatchEvent(new CustomEvent("mod:service", { detail: id }));

const FinalCta = () => (
  <footer className="relative">
    <div className="container-mod pt-16 text-center md:pt-24">
      <Reveal as="h2" className="display mx-auto max-w-[18ch] text-[34px] sm:text-[44px] lg:text-[52px]">
        {finalCta.title}
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-4 text-[15px] text-muted">{finalCta.text}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button href={whatsappUrl()} variant="black">
            <SiWhatsapp className="size-4" /> {finalCta.primary}
          </Button>
          <Button href={agendaUrl()} variant="outline">
            {finalCta.secondary}
          </Button>
        </div>
      </Reveal>
    </div>

    <div className="relative mt-4 overflow-hidden pt-[260px] md:pt-[360px]">
      <VideoSlot video={videos.final} fallback={<BallPit />} className="absolute inset-0" />

      <div className="relative mx-3 mb-3 md:mx-auto md:mb-8 md:max-w-[1100px]">
        <div className="rounded-[28px] bg-mist/95 p-6 backdrop-blur md:p-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            <Column title="Serviços">
              {services.items.map((s) => (
                <Item key={s.id} href="#servicos" onClick={() => selectService(s.id)}>
                  {s.label}
                </Item>
              ))}
            </Column>
            <Column title="Como funciona">
              {pillars.map((p) => (
                <Item key={p.id} href="#pilares">
                  {p.tag}
                </Item>
              ))}
            </Column>
            <Column title="Navegação">
              <Item href="#top">Início</Item>
              {nav.map((n) => (
                <Item key={n.href} href={n.href}>
                  {n.label}
                </Item>
              ))}
            </Column>
            <Column title="Contato">
              <Item href={whatsappUrl()}>WhatsApp {contact.whatsappLabel}</Item>
              <Item href={agendaUrl()}>Agendar call</Item>
              {contact.instagram && <Item href={contact.instagram}>Instagram</Item>}
            </Column>
            <Column title="Atendimento">
              {footer.areas.map((a) => (
                <Item key={a}>{a}</Item>
              ))}
            </Column>
          </div>
          <div className="mt-8">
            <Column title="Clientes">
              <li className="flex flex-wrap gap-x-6 gap-y-2">
                {brands.map((b) => (
                  <span key={b.name}>{b.name}</span>
                ))}
              </li>
            </Column>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-line pt-6 text-center md:flex-row md:justify-between md:text-left">
            <a href="#top" className="text-[26px]" aria-label="Voltar ao início">
              <Logo />
            </a>
            <p className="text-[12px] leading-relaxed text-muted">
              © {new Date().getFullYear()} Mod. · {footer.tagline}
              <br />
              {footer.madeIn}
            </p>
            <div className="flex gap-2">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-line hover:bg-line"
              >
                <SiWhatsapp />
              </a>
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-line hover:bg-line"
                >
                  <SiInstagram />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default FinalCta;
