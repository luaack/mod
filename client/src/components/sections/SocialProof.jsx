import { SiMeta, SiGoogleads, SiWhatsapp } from "react-icons/si";
import Marquee from "../ui/Marquee";
import Reveal from "../ui/Reveal";
import { brands, socialProof } from "../../content";

// Tratamento tipográfico provisório para cada marca, até chegarem os logos oficiais.
const brandStyles = {
  "BNS Nutrition": "font-bold uppercase tracking-[0.2em] text-[#2b3bd6]",
  "Rei das Castanhas": "font-serif italic font-semibold text-[#9a3b0c] text-[19px]",
  "Empório Casa do Rei": "uppercase tracking-[0.08em] text-[12px] font-bold text-[#3f7a0a] whitespace-nowrap",
  "Little Lulli": "lowercase font-bold tracking-tight text-[#c8129f] text-[21px]",
};

const Tile = ({ children, tall = false, className = "" }) => (
  <div
    className={`flex rounded-xl bg-white px-4 ring-1 ring-black/[0.04] ${tall ? "h-[140px] py-4" : "h-[64px] items-center"} ${className}`}
  >
    {children}
  </div>
);

const BrandTile = ({ brand }) => (
  <Tile className="justify-center">
    {brand.logo ? (
      <img src={brand.logo} alt={brand.name} className="max-h-8 w-auto" />
    ) : (
      <span className={`text-[16px] ${brandStyles[brand.name] ?? "font-bold"}`}>{brand.name}</span>
    )}
  </Tile>
);

const icons = { "Meta Ads": SiMeta, "Google Ads": SiGoogleads };

const CapTile = ({ cap }) => {
  const Icon = icons[cap.title];
  return (
    <Tile className="gap-3">
      {Icon && <Icon className="size-5 shrink-0" />}
      <span className="leading-tight">
        <span className="block text-[16px] font-medium">{cap.title}</span>
        <span className="block text-[10px] uppercase tracking-[0.08em] text-muted">{cap.text}</span>
      </span>
    </Tile>
  );
};

const QuoteTile = ({ quote }) => (
  <Tile tall className="flex-col justify-between">
    <p className="text-[13px] leading-snug text-ink/80">{quote}</p>
    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">Lucas · Mod.</p>
  </Tile>
);

const [bns, rei, emporio, lulli] = brands;
const [meta, google, since, pixel, crm] = socialProof.capabilities;

const columns = [
  { w: 210, tiles: [<BrandTile brand={bns} />, <CapTile cap={meta} />] },
  { w: 290, tiles: [<QuoteTile quote={socialProof.quotes[0]} />] },
  { w: 220, tiles: [<BrandTile brand={rei} />, <CapTile cap={google} />] },
  { w: 230, tiles: [<CapTile cap={since} />, <BrandTile brand={emporio} />] },
  { w: 290, tiles: [<QuoteTile quote={socialProof.quotes[1]} />] },
  { w: 210, tiles: [<BrandTile brand={lulli} />, <CapTile cap={pixel} />] },
  {
    w: 220,
    tiles: [
      <CapTile cap={crm} />,
      <Tile className="gap-3">
        <SiWhatsapp className="size-5 text-emerald-500" />
        <span className="text-[14px] font-medium leading-tight">Atendimento pelo WhatsApp</span>
      </Tile>,
    ],
  },
];

const SocialProof = () => (
  <section className="relative z-10 -mt-24 px-3 md:-mt-56 md:px-6">
    <Reveal className="mx-auto max-w-[1100px] rounded-[32px] bg-mist/95 pt-9 pb-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur">
      <p className="mx-auto max-w-[44ch] px-6 text-center text-[16px] leading-snug text-ink/80">
        {socialProof.title} <strong className="font-bold text-ink">{socialProof.highlight}</strong>
      </p>
      <Marquee duration={55} className="mt-7">
        {columns.map((col, i) => (
          <div key={i} className="mr-3 flex flex-col gap-3" style={{ width: col.w }}>
            {col.tiles.map((tile, j) => (
              <div key={j}>{tile}</div>
            ))}
          </div>
        ))}
      </Marquee>
    </Reveal>
  </section>
);

export default SocialProof;
