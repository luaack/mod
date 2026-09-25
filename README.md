# Mod. — site

Home da Mod.: tráfego pago (Meta Ads e Google Ads), criativos, estrutura de conversão, CRM, social media e estratégia de negócio para negócios locais e e-commerce.

Visual inspirado na estrutura da clay.com: hero com mundinho em claymation, card de marcas em marquee, abas de serviços com telas de exemplo, cards de pilares que se empilham ao rolar, carrossel de marcas e rodapé sobre uma paisagem.

## Rodando

```bash
npm run install-all   # instala as dependências do client
npm run dev           # http://localhost:5173
npm run build         # gera client/dist
npm run lint
```

Stack: React 19 + Vite 7, Tailwind CSS v4, Framer Motion, Lenis (rolagem suave). Deploy na Vercel a partir de `client/` (veja `client/vercel.json`).

## Onde editar

- **Textos, links e marcas:** `client/src/content.js`. Todas as seções leem daqui.
  - `contact.agendaUrl`: link do Google Agenda. Enquanto estiver vazio, "Agendar" abre o WhatsApp pedindo um horário.
  - `contact.instagram`: preenchido, o link aparece no rodapé.
  - `brands[].logo`: caminho do logo (ex.: `/logos/bns.svg` em `client/public/logos/`). Sem logo, aparece um tratamento tipográfico.
  - `about.person.photo`: foto do Lucas (ex.: `/lucas.jpg`).
- **Vídeos:** coloque os MP4 em `client/public/videos/` e preencha `videos` em `content.js`. Sem vídeo, cada espaço mostra uma ilustração em SVG (`client/src/components/scenes/`).
- **Prompts para gerar os vídeos com IA:** `briefing/videos-claymation.md` (com referências de composição em `briefing/referencias/`).
- **Cores e fonte:** `client/src/index.css` (`@theme`). A fonte é a Satoshi (Fontshare), com a Onest embutida como reserva.

## Estrutura

```
client/src/
  content.js            conteúdo do site
  lib/links.js          links do WhatsApp e da agenda
  components/
    sections/           seções da página, na ordem do App.jsx
    mocks/              telas de exemplo das abas de serviços
    scenes/             ilustrações de massinha (fallback dos vídeos)
    ui/                 botão, etiqueta, marquee, vídeo, logo, animação de entrada
```

> Vídeos de referência de terceiros podem ser testados localmente em `client/public/videos/_ref/` (fora do git), mas nunca publicados.
