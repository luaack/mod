import { SiMeta, SiGoogleads, SiWhatsapp, SiInstagram } from "react-icons/si";
import {
  HiCheck,
  HiPlay,
  HiOutlineCursorArrowRays,
  HiOutlineGlobeAlt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import Logo from "../ui/Logo";

// Telas de exemplo (dados fictícios e neutros) que ilustram cada serviço, como as telas de produto da referência.

const Window = ({ title, children, className = "" }) => (
  <div
    className={`overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgba(20,20,40,0.25)] ring-1 ring-black/5 ${className}`}
  >
    <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-[13px]">
      <Logo className="text-[13px]" />
      <span className="text-muted">{title}</span>
      <span className="ml-auto rounded-full bg-mist px-2 py-0.5 text-[10px] font-medium text-muted">exemplo</span>
    </div>
    {children}
  </div>
);

const Pill = ({ children, tone = "gray" }) => {
  const tones = {
    gray: "bg-mist text-muted",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    blue: "bg-blue-50 text-blue-700",
    pink: "bg-pink-50 text-pink-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
};

const Channel = ({ type }) =>
  type === "Meta" ? (
    <span className="inline-flex items-center gap-1.5">
      <SiMeta className="text-[#0866ff]" /> Meta
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5">
      <SiGoogleads className="text-[#fbbc04]" /> Google
    </span>
  );

const Side = ({ title, children, className = "" }) => (
  <div
    className={`rounded-2xl bg-white p-4 text-[13px] shadow-[0_24px_60px_-20px_rgba(20,20,40,0.3)] ring-1 ring-black/5 ${className}`}
  >
    <p className="mb-3 font-medium">{title}</p>
    {children}
  </div>
);

const Check = ({ done, children }) => (
  <li className="flex items-center gap-2 py-1">
    <span className={`grid size-4 place-items-center rounded-full ${done ? "bg-emerald-500 text-white" : "ring-1 ring-line"}`}>
      {done && <HiCheck className="size-3" />}
    </span>
    <span className={done ? "text-muted line-through decoration-muted/40" : ""}>{children}</span>
  </li>
);

export const AdsMock = () => (
  <div className="relative">
    <Window title="Campanhas">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[620px] text-left text-[13px]">
          <thead className="text-muted">
            <tr className="border-b border-line">
              {["Campanha", "Canal", "Objetivo", "Público", "Status"].map((h) => (
                <th key={h} className="px-4 py-2.5 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Loja · raio de 5 km", "Meta", "Visitas à loja", "Bairros próximos", "Ativa"],
              ["Pesquisa · marca", "Google", "Pesquisa", "Quem busca a marca", "Ativa"],
              ["Remarketing 30 dias", "Meta", "Vendas", "Visitou o site", "Ativa"],
              ["Shopping · catálogo", "Google", "Vendas", "Produtos do catálogo", "Em teste"],
              ["Maps · como chegar", "Google", "Rotas", "Perto da loja", "Ativa"],
              ["Mensagens · WhatsApp", "Meta", "Conversas", "Interesses do nicho", "Em teste"],
            ].map((r) => (
              <tr key={r[0]} className="border-b border-line/70 last:border-0">
                <td className="px-4 py-2.5 font-medium">{r[0]}</td>
                <td className="px-4 py-2.5">
                  <Channel type={r[1]} />
                </td>
                <td className="px-4 py-2.5 text-muted">{r[2]}</td>
                <td className="px-4 py-2.5 text-muted">{r[3]}</td>
                <td className="px-4 py-2.5">
                  <Pill tone={r[4] === "Ativa" ? "green" : "amber"}>{r[4]}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Window>
    <Side title="Otimização da semana" className="absolute -right-3 -bottom-8 hidden w-64 md:block">
      <ul>
        <Check done>Pausar anúncios que só geram clique</Check>
        <Check done>Duplicar o criativo vencedor</Check>
        <Check>Ajustar o raio para 3 km</Check>
      </ul>
    </Side>
  </div>
);

const creatives = [
  { hook: "Gancho A · problema", line: "Cansou de pagar caro e esperar dias?", bg: "from-[#ffe1cc] to-[#ffb68a]" },
  { hook: "Gancho B · oferta", line: "Só nesta semana, na loja ou no site.", bg: "from-[#dfe4ff] to-[#9fa9ff]" },
  { hook: "Gancho C · prova", line: "O que os clientes mais levam daqui.", bg: "from-[#f4ffd0] to-[#cbe86a]" },
];

export const CreativesMock = () => (
  <Window title="Teste de criativos">
    <div className="grid grid-cols-3 gap-3 p-4">
      {creatives.map((c, i) => (
        <div key={c.hook} className="flex flex-col gap-2">
          <div className={`relative aspect-[9/14] overflow-hidden rounded-xl bg-gradient-to-b ${c.bg} p-3`}>
            <div className="absolute inset-x-3 top-3 flex items-center gap-1.5">
              <span className="size-5 rounded-full bg-white/80" />
              <span className="h-2 w-14 rounded-full bg-white/70" />
            </div>
            <p className="absolute inset-x-3 bottom-10 text-[13px] font-bold leading-tight text-ink md:text-base">{c.line}</p>
            <span className="absolute inset-x-3 bottom-3 rounded-md bg-ink py-1 text-center text-[10px] font-medium text-white">
              Saiba mais
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] md:text-[12px]">
            <span className="text-muted">{c.hook}</span>
            {i === 1 ? <Pill tone="green">Melhor até aqui</Pill> : <Pill>Em teste</Pill>}
          </div>
        </div>
      ))}
    </div>
  </Window>
);

const steps = [
  { icon: HiOutlineCursorArrowRays, label: "Anúncio" },
  { icon: HiOutlineGlobeAlt, label: "Página" },
  { icon: HiOutlineChatBubbleLeftRight, label: "WhatsApp" },
  { icon: HiOutlineUserGroup, label: "CRM" },
  { icon: HiOutlineBanknotes, label: "Venda" },
];

export const FunnelMock = () => (
  <Window title="Estrutura de conversão">
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between gap-1">
        {steps.map((s, i) => (
          <div key={s.label} className="flex flex-1 items-center gap-1">
            <div className="flex flex-1 flex-col items-center gap-2 rounded-xl bg-mist px-1 py-3 md:py-4">
              <s.icon className="size-5 md:size-6" />
              <span className="text-[11px] font-medium md:text-[13px]">{s.label}</span>
            </div>
            {i < steps.length - 1 && <span className="h-0.5 w-2 shrink-0 rounded bg-line md:w-4" />}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl ring-1 ring-line">
        {[
          ["Pixel do Meta", "PageView · ViewContent · Lead", "Recebendo"],
          ["API de Conversões", "Lead · Purchase (servidor)", "Recebendo"],
          ["Google Ads", "Conversão de compra e de WhatsApp", "Recebendo"],
          ["CRM", "Origem do lead salva em cada contato", "Ligado"],
        ].map((r) => (
          <div key={r[0]} className="flex items-center gap-3 border-b border-line/70 px-4 py-2.5 text-[13px] last:border-0">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="w-36 font-medium">{r[0]}</span>
            <span className="hidden flex-1 text-muted sm:block">{r[1]}</span>
            <Pill tone="green">{r[2]}</Pill>
          </div>
        ))}
      </div>
    </div>
  </Window>
);

const tiles = ["#ffd9c2", "#1d1d1f", "#d4f23a", "#b9a6ff", "#f3e6cf", "#ff6b8b", "#7cc4ff", "#f3f3f1", "#ff9a5c"];

export const SocialMock = () => (
  <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
    <Window title="Instagram">
      <div className="p-4">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-gradient-to-tr from-[#ffb86b] via-[#ff5fa2] to-[#8a5cff] p-0.5">
            <span className="size-full rounded-full bg-white" />
          </span>
          <div className="flex-1">
            <p className="flex items-center gap-1.5 text-[13px] font-medium">
              <SiInstagram /> @sualoja
            </p>
            <span className="mt-1.5 block h-2 w-40 rounded-full bg-mist" />
            <span className="mt-1 block h-2 w-28 rounded-full bg-mist" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {tiles.map((c, i) => (
            <div key={i} className="relative aspect-square rounded-md" style={{ background: c }}>
              {i % 4 === 1 && <HiPlay className="absolute right-1.5 top-1.5 size-3.5 text-white" />}
            </div>
          ))}
        </div>
      </div>
    </Window>
    <Side title="Calendário da semana" className="hidden md:block">
      <ul className="space-y-2">
        {[
          ["SEG", "Reels · bastidores", "pink"],
          ["TER", "Carrossel · dúvidas", "blue"],
          ["QUA", "Stories · oferta", "amber"],
          ["QUI", "Reels · produto", "pink"],
          ["SEX", "Post · prova social", "green"],
        ].map(([d, t, tone]) => (
          <li key={d} className="flex items-center gap-3">
            <span className="w-8 text-[11px] font-bold text-muted">{d}</span>
            <Pill tone={tone}>{t}</Pill>
          </li>
        ))}
      </ul>
    </Side>
  </div>
);

export const ManagementMock = () => (
  <Window title="Plano do mês">
    <div className="grid gap-4 p-4 md:grid-cols-[1fr_1.1fr] md:p-5">
      <div>
        <p className="mb-2 text-[13px] font-medium">Prioridades</p>
        <ul className="text-[13px]">
          <Check done>Revisar a oferta principal</Check>
          <Check done>Script de atendimento no WhatsApp</Check>
          <Check>Metas por canal (loja e site)</Check>
          <Check>Rotina de follow-up de orçamentos</Check>
        </ul>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-mist px-3 py-2.5 text-[13px]">
          <HiOutlineCalendarDays className="size-4" /> Reunião de estratégia · quinta, 10h
        </div>
      </div>
      <div className="rounded-xl ring-1 ring-line p-4">
        <div className="mb-3 flex items-center justify-between text-[13px]">
          <span className="font-medium">Evolução por semana</span>
          <span className="text-muted">ilustrativo</span>
        </div>
        <div className="flex h-36 items-end gap-3">
          {[38, 52, 47, 66, 74, 88].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="w-full rounded-md" style={{ height: `${h}%`, background: i === 5 ? "#c8129f" : "#f5c6e8" }} />
              <span className="text-[10px] text-muted">S{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Window>
);

const columns = [
  {
    title: "Novo lead",
    cards: [
      ["Ana", "Instagram", "pink"],
      ["Marcos", "Meta Ads", "blue"],
    ],
  },
  {
    title: "Em conversa",
    cards: [
      ["Carlos", "Google", "amber"],
      ["Juliana", "WhatsApp", "green"],
    ],
  },
  { title: "Proposta", cards: [["Loja parceira", "Indicação", "gray"]] },
  { title: "Fechado", cards: [["Renata", "Meta Ads", "blue"]] },
];

export const CrmMock = () => (
  <Window title="CRM · funil de vendas">
    <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
      {columns.map((col) => (
        <div key={col.title} className="rounded-xl bg-mist p-2.5">
          <p className="mb-2 flex items-center justify-between px-1 text-[12px] font-medium">
            {col.title} <span className="text-muted">{col.cards.length}</span>
          </p>
          <div className="space-y-2">
            {col.cards.map(([name, source, tone]) => (
              <div key={name} className="rounded-lg bg-white p-2.5 text-[12px] shadow-sm ring-1 ring-black/5">
                <p className="font-medium">{name}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <Pill tone={tone}>{source}</Pill>
                  {source === "WhatsApp" && <SiWhatsapp className="text-emerald-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Window>
);

export const DesignMock = () => (
  <Window title="Identidade visual">
    <div className="grid gap-3 p-4 md:grid-cols-3">
      <div className="rounded-xl bg-mist p-4">
        <p className="mb-3 text-[12px] text-muted">Cores</p>
        <div className="grid grid-cols-4 gap-2">
          {["#0a0a0a", "#c6e85a", "#ff6b3d", "#f3e6cf"].map((c) => (
            <span key={c} className="aspect-square rounded-lg ring-1 ring-black/5" style={{ background: c }} />
          ))}
        </div>
        <p className="mt-4 mb-1 text-[12px] text-muted">Tipografia</p>
        <p className="text-4xl font-medium tracking-tight">Aa</p>
      </div>
      <div className="grid place-items-center rounded-xl bg-[#0a0a0a] p-4 text-white">
        <div className="text-center">
          <span className="mx-auto mb-2 grid size-12 place-items-center rounded-2xl bg-[#c6e85a] text-2xl font-bold text-ink">
            S
          </span>
          <p className="text-lg font-medium tracking-tight">Sua Marca</p>
          <p className="text-[11px] text-white/60">aplicação do logo</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-mist p-4">
        <p className="text-[12px] text-muted">Componentes</p>
        <span className="rounded-lg bg-ink py-2 text-center text-[12px] text-white">Comprar agora</span>
        <span className="rounded-lg bg-white py-2 text-center text-[12px] ring-1 ring-line">Falar no WhatsApp</span>
        <div className="mt-1 flex-1 rounded-lg bg-gradient-to-br from-[#ff6b3d] to-[#ffb68a] p-3 text-[12px] font-bold leading-tight text-white">
          Post da campanha
        </div>
      </div>
    </div>
  </Window>
);

export const VideoMock = () => (
  <Window title="Edição · anúncio em vídeo">
    <div className="grid gap-3 p-4 md:grid-cols-[1fr_1.6fr]">
      <div className="relative mx-auto aspect-[9/14] w-full max-w-[200px] overflow-hidden rounded-xl bg-gradient-to-b from-[#2d2250] to-[#0f0c1d]">
        <span className="absolute left-3 top-3 rounded bg-lime px-1.5 py-0.5 text-[10px] font-bold text-ink">GANCHO · 0–3s</span>
        <HiPlay className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 text-white/90" />
        <p className="absolute inset-x-3 bottom-4 text-center text-[12px] font-bold text-white">Legenda dinâmica aqui</p>
      </div>
      <div className="relative flex flex-col justify-center gap-2 rounded-xl bg-[#16151c] p-3">
        {[
          [
            "V2",
            [
              [8, 18, "#b9a6ff"],
              [40, 22, "#b9a6ff"],
              [70, 16, "#b9a6ff"],
            ],
          ],
          [
            "V1",
            [
              [0, 30, "#ff9a5c"],
              [31, 26, "#7cc4ff"],
              [58, 22, "#ff6b8b"],
              [81, 19, "#c6e85a"],
            ],
          ],
          ["A1", null],
        ].map(([track, clips]) => (
          <div key={track} className="flex items-center gap-2">
            <span className="w-6 text-[10px] font-bold text-white/50">{track}</span>
            <div className="relative h-8 flex-1 rounded-md bg-white/5">
              {clips ? (
                clips.map(([left, width, c], i) => (
                  <span
                    key={i}
                    className="absolute inset-y-1 rounded"
                    style={{ left: `${left}%`, width: `${width}%`, background: c }}
                  />
                ))
              ) : (
                <div className="absolute inset-1 flex items-center gap-[3px] overflow-hidden">
                  {Array.from({ length: 64 }, (_, i) => (
                    <span
                      key={i}
                      className="w-[3px] shrink-0 rounded bg-emerald-400/80"
                      style={{ height: `${25 + ((i * 37) % 70)}%` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <span className="pointer-events-none absolute inset-y-2 left-[45%] w-0.5 bg-white animate-[playhead_6s_linear_infinite]" />
      </div>
    </div>
  </Window>
);
