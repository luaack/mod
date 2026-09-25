// Todo o conteúdo do site em um só lugar.
// Para trocar um texto, um link ou um vídeo, edite aqui — as seções só leem estes dados.

export const contact = {
  whatsapp: "5561991551292",
  whatsappLabel: "(61) 99155-1292",
  // Link da página de agendamento do Google Agenda.
  // Enquanto estiver vazio, os botões de agendamento abrem o WhatsApp pedindo um horário.
  agendaUrl: "https://calendar.app.google/zZbpdLBNiG75ej5k9",
  instagram: "", // ex.: "https://instagram.com/seuperfil"
  defaultMessage: "Olá, Lucas! Vim pelo site da Mod. e quero conversar sobre o marketing do meu negócio.",
  agendaMessage: "Olá, Lucas! Vim pelo site da Mod. e quero agendar uma call de diagnóstico.",
};

// Vídeos em /public/videos: WebM (leve) com MP4 de reserva para o Safari antigo, e poster JPG.
// `mobile` é a versão usada em telas de até 767px. Troque por null para mostrar a ilustração no lugar.
// Os vídeos atuais são renders 3D gerados por tools/videos-3d (dá para editar as cenas e renderizar de novo).
const video = (name) => ({ src: `/videos/${name}.mp4`, webm: `/videos/${name}.webm`, poster: `/videos/${name}.jpg` });

export const videos = {
  hero: video("hero"), // versão vertical do celular em renderização: { ...video("hero"), mobile: video("hero-mobile") }
  atrair: video("atrair"),
  converter: video("converter"),
  presenca: video("presenca"),
  crescer: video("crescer"),
  sistema: video("sistema"),
  final: null, // em renderização: video("final")
};

export const nav = [
  { label: "Serviços", href: "#servicos", mega: true },
  { label: "Como funciona", href: "#pilares" },
  { label: "Clientes", href: "#clientes" },
  { label: "Sobre", href: "#sobre" },
];

export const announcement = {
  badge: "Agenda aberta",
  text: "Diagnóstico gratuito de tráfego para negócios locais e e-commerce.",
  cta: "Agendar",
};

export const hero = {
  title: "Sistemas que vendem todos os dias",
  text: "Tráfego pago no Meta e no Google, criativos que vendem e a estratégia por trás, para negócios locais e e-commerce.",
  primary: "Agendar diagnóstico",
  secondary: "Chamar no WhatsApp",
  platformsLabel: "anúncios em",
};

// Marcas atendidas. Só nomes — sem números. Troque `logo` pelo caminho do arquivo quando tiver (ex.: "/logos/bns.svg").
export const brands = [
  {
    name: "BNS Nutrition",
    short: "BNS",
    segment: "Indústria de suplementos",
    work: "Gestão de marketing de uma indústria de suplementos e produtos naturais.",
    logo: null,
    colors: ["#dfe9ff", "#3d4bff"],
  },
  {
    name: "Rei das Castanhas",
    short: "REI",
    segment: "Produtos naturais",
    work: "Gestão de marketing da marca irmã da BNS Nutrition.",
    logo: null,
    colors: ["#fff1d6", "#e8490f"],
  },
  {
    name: "Empório Casa do Rei",
    short: "EMPÓRIO",
    segment: "Loja física · Brasília-DF",
    work: "Estratégia, conteúdo, tráfego pago no Meta e no Google e social media de uma loja física.",
    logo: null,
    colors: ["#e8f5d0", "#4f8f0a"],
  },
  {
    name: "Little Lulli",
    short: "LULLI",
    segment: "Moda infantil · e-commerce",
    work: "Marketing para uma marca infantil que vende pela internet.",
    logo: null,
    colors: ["#fde3f3", "#c8129f"],
  },
];

export const socialProof = {
  title: "A estratégia por trás de negócios que vendem,",
  highlight: "na loja e na internet.",
  capabilities: [
    { title: "Meta Ads", text: "Facebook, Instagram e WhatsApp" },
    { title: "Google Ads", text: "Pesquisa, Maps, YouTube e Shopping" },
    { title: "Desde 2016", text: "no marketing, de Manaus a Brasília" },
    { title: "Pixel + API", text: "rastreamento de ponta a ponta" },
    { title: "CRM", text: "cada lead acompanhado até a venda" },
  ],
  quotes: [
    "“Tráfego sem estratégia é só custo. O anúncio é a ponta de um sistema.”",
    "“O trabalho é sempre o mesmo: fazer alguém confiar o suficiente para comprar.”",
  ],
};

export const services = {
  title: "Tudo o que seu negócio precisa para vender",
  items: [
    {
      id: "trafego",
      label: "Tráfego pago",
      text: "Campanhas no Meta Ads e no Google Ads estruturadas para trazer quem compra, não só quem clica.",
      color: "#b9a6ff",
      mock: "ads",
    },
    {
      id: "criativos",
      label: "Criativos que vendem",
      text: "Anúncios pensados para parar o dedo e levar à ação: gancho, oferta e variações para testar.",
      color: "#ff9a5c",
      mock: "creatives",
    },
    {
      id: "conversao",
      label: "Estrutura de conversão",
      text: "Página, WhatsApp, pixel e API de conversões conectados para nenhum clique se perder.",
      color: "#7cc4ff",
      mock: "funnel",
    },
    {
      id: "social",
      label: "Social media",
      text: "Calendário, roteiros e posts que mantêm a marca viva e dão contexto para os anúncios.",
      color: "#ff6b8b",
      mock: "social",
    },
    {
      id: "gestao",
      label: "Gestão empresarial",
      text: "Oferta, preço, metas e rotina comercial: olhar para o negócio inteiro, não só para o anúncio.",
      color: "#f58ee0",
      mock: "management",
    },
    {
      id: "crm",
      label: "CRM",
      text: "Cada contato registrado com origem, etapa e follow-up, para saber de onde vem o faturamento.",
      color: "#5fd1c4",
      mock: "crm",
    },
    {
      id: "design",
      label: "Design",
      text: "Identidade e peças com padrão visual que transmite confiança antes da primeira conversa.",
      color: "#c6e85a",
      mock: "design",
    },
    {
      id: "video",
      label: "Edição de vídeo",
      text: "Reels e anúncios em vídeo gravados e editados com ritmo de quem vende.",
      color: "#9d8cff",
      mock: "video",
    },
  ],
};

export const prompt = {
  title: "O que você quer resolver?",
  placeholders: [
    "Quero mais clientes na minha loja…",
    "Meu e-commerce tem visitas, mas não vende…",
    "Preciso organizar o atendimento no WhatsApp…",
    "Quero criativos que convertam de verdade…",
  ],
  chips: [
    "Mais clientes na loja",
    "E-commerce que não vende",
    "Organizar o comercial",
    "Criativos que convertem",
    "Começar a anunciar",
    "Melhorar o Instagram",
  ],
  messagePrefix: "Olá, Lucas! Vim pelo site da Mod.\n\nO que eu quero resolver: ",
};

export const pillars = [
  {
    id: "atrair",
    tag: "Atrair",
    title: "Anúncios que trazem",
    highlight: "o cliente certo.",
    text: "Meta Ads e Google Ads com público, orçamento e criativos pensados para quem realmente compra — do bairro ao Brasil inteiro.",
    services: ["Tráfego pago", "Criativos que vendem"],
    note: "Na prática: campanhas que levam gente até a porta da loja física e campanhas de venda para o e-commerce.",
    cta: "Quero mais clientes",
    tint: "#f0f9ff",
    accent: "#3d4bff",
    sceneColor: "#3d4bff",
    shape: "magnet",
  },
  {
    id: "converter",
    tag: "Converter",
    title: "Transforme clique",
    highlight: "em cliente.",
    text: "Página, WhatsApp, pixel, API de conversões e CRM funcionando juntos. Cada lead registrado, respondido e acompanhado até a venda.",
    services: ["Estrutura de conversão", "CRM"],
    note: "Na prática: do anúncio ao WhatsApp, do WhatsApp ao caixa, com rastreamento de ponta a ponta.",
    cta: "Quero converter mais",
    tint: "#fff2ea",
    accent: "#e8490f",
    sceneColor: "#ff6a2b",
    shape: "funnel",
  },
  {
    id: "presenca",
    tag: "Presença",
    title: "Uma marca que",
    highlight: "dá vontade de comprar.",
    text: "Social media, design e edição de vídeo para que quem vê o anúncio encontre um perfil que passa confiança.",
    services: ["Social media", "Design", "Edição de vídeo"],
    note: "Na prática: roteiro, gravação, edição e calendário de posts alinhados com o que está rodando nos anúncios.",
    cta: "Quero uma marca forte",
    tint: "#f6fbe4",
    accent: "#4f8f0a",
    sceneColor: "#8ccf1f",
    shape: "star",
  },
  {
    id: "crescer",
    tag: "Crescer",
    title: "Estratégia de quem senta",
    highlight: "do seu lado da mesa.",
    text: "Participação na parte estratégica do negócio: oferta, preço, metas e rotina comercial. O tráfego é a ponta; o crescimento vem do sistema.",
    services: ["Gestão empresarial"],
    note: "Na prática: reuniões de estratégia, metas claras e ajustes de rota com base no que os números mostram.",
    cta: "Quero crescer com estratégia",
    tint: "#fdedf8",
    accent: "#c8129f",
    sceneColor: "#e03cb8",
    shape: "bars",
  },
];

export const strategy = {
  tag: "Estratégia de negócio",
  title: "Não é só anúncio.",
  highlight: "É o sistema inteiro trabalhando junto.",
  text: "Anúncio bom com atendimento lento não vende. Página bonita sem oferta clara não converte. A Mod. olha para o caminho inteiro — do primeiro clique ao pós-venda — e ajusta o que estiver travando o faturamento.",
  note: "Para negócios locais em Brasília-DF e e-commerces em todo o Brasil.",
  cta: "Agendar diagnóstico",
};

export const clients = {
  title: "Marcas que cresceram com a estratégia da Mod.",
};

export const about = {
  title: "Por trás da Mod.",
  person: {
    eyebrow: "Quem está por trás",
    name: "Lucas",
    role: "Estrategista de tráfego e crescimento",
    text: "Mais estratégico do que operacional — mas com a mão na massa quando precisa.",
    photo: null, // ex.: "/lucas.jpg"
  },
  howItWorks: {
    title: "Como funciona",
    steps: [
      { n: "01", title: "Diagnóstico", text: "Entender o negócio, a oferta, o público e o que já foi feito." },
      { n: "02", title: "Estrutura", text: "Organizar anúncios, página, WhatsApp, rastreamento e CRM." },
      { n: "03", title: "Escala", text: "Otimização contínua, novos criativos e ajustes de estratégia." },
    ],
  },
  journey: {
    eyebrow: "Trajetória",
    title: "Da política ao varejo: sempre o mesmo desafio — gerar confiança para converter.",
    steps: [
      { year: "2016", text: "Campanhas políticas em Manaus-AM" },
      { year: "2021", text: "Recomeço do zero em Brasília-DF" },
      { year: "Depois", text: "Marketing da BNS Nutrition e da Rei das Castanhas" },
      { year: "Hoje", text: "Estratégia do Empório Casa do Rei e novos clientes" },
    ],
  },
  area: {
    eyebrow: "Onde atende",
    title: "Negócios locais em Brasília-DF. E-commerces em todo o Brasil.",
  },
  model: {
    eyebrow: "Modelo de trabalho",
    title: "Parceria direta, sem intermediários.",
    text: "Você fala com quem planeja e executa a estratégia.",
  },
};

export const finalCta = {
  title: "Transforme seu marketing num sistema que vende. Hoje.",
  text: "Diagnóstico gratuito e sem compromisso. Resposta rápida pelo WhatsApp.",
  primary: "Chamar no WhatsApp",
  secondary: "Agendar call",
};

export const footer = {
  tagline: "Tráfego pago, conteúdo e estratégia",
  madeIn: "Feito em Brasília-DF",
  areas: ["Brasília-DF · negócios locais", "Todo o Brasil · e-commerce"],
};
