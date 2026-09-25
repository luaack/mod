# Pensamento de Vídeo: vídeos claymation do site da Mod.

Documento de produção dos 7 vídeos em loop do site. Enquanto eles não existem, o site mostra ilustrações no mesmo lugar, e as imagens em `briefing/referencias/` mostram a composição de cada espaço.

> **Regra do projeto:** não use, copie nem "referencie por nome" vídeos de outras marcas. Os prompts abaixo descrevem uma estética de massinha genérica. O mundo, os objetos e as cores são da Mod.

---

## 1. Visão geral

| | |
|---|---|
| **Marca** | Mod.: tráfego pago, conversão e estratégia para negócios locais e e-commerce |
| **Uso** | Vídeos de fundo do site, **mudos**, em loop contínuo |
| **Arco de cada loop** | Abertura (cena calma) → Desenvolvimento (bolinhas/elementos entram em movimento) → Clímax (a "conversão": bolinha entra na loja, no funil, sobe no gráfico) → Fechamento (volta exatamente ao 1º quadro) |
| **Mensagem** | Marketing como um **sistema de peças que funcionam juntas**: atrair → converter → presença → crescer |
| **Ferramenta recomendada** | **Kling 2.x** (Start Frame + End Frame iguais = loop perfeito). Alternativas: Runway Gen-4 (image-to-video) ou Veo 3 (desligue o áudio) |
| **Pipeline** | 1) gerar o **quadro-chave** (imagem parada) com Midjourney / Flow / Imagen / GPT Image → 2) animar com image-to-video usando o mesmo quadro como início e fim → 3) comprimir e colocar no site |
| **FPS** | 24 fps |

### Os 7 vídeos

| Arquivo | Onde aparece no site | Proporção | Duração | Chave em `content.js` |
|---|---|---|---|---|
| `hero.mp4` | Fundo da primeira dobra | 16:9 · 1920×1080 | 8–10 s | `videos.hero` |
| `atrair.mp4` | Card ATRAIR (azul) | 1:1 · 1080×1080 | 6–8 s | `videos.atrair` |
| `converter.mp4` | Card CONVERTER (laranja) | 1:1 · 1080×1080 | 6–8 s | `videos.converter` |
| `presenca.mp4` | Card PRESENÇA (verde) | 1:1 · 1080×1080 | 6–8 s | `videos.presenca` |
| `crescer.mp4` | Card CRESCER (rosa) | 1:1 · 1080×1080 | 6–8 s | `videos.crescer` |
| `sistema.mp4` | Card "Estratégia de negócio" | 16:9 · 1920×1080 (o site corta para ~16:7) | 8–10 s | `videos.sistema` |
| `final.mp4` | Paisagem atrás do CTA final e do rodapé | 16:9 · 1920×1080 | 8–10 s | `videos.final` |

**Enquadramento:** o site usa `object-cover`, então as bordas podem ser cortadas no celular. Deixe tudo o que importa nos **60% centrais** do quadro.

---

## 2. Camada Global (copiar no início de TODOS os prompts)

```
[GLOBAL STYLE] Stylized 3D claymation miniature world. Handmade plasticine look: matte clay surfaces,
soft rounded edges, very subtle fingerprint texture, gentle subsurface scattering. Cheerful, optimistic, tactile.
Lighting: soft diffused daylight, large softbox key light from top-left, gentle ambient occlusion,
soft contact shadows under every object. No harsh specular highlights.
Palette: sky cyan #88E6EE, meadow greens #2B8F55 to #085A39, cream #F3E6CF, warm beige #F0E7D8,
accents electric blue #3D4BFF, orange #FF6A2B, lime #D4F23A, magenta #E03CB8.
Camera: 35mm, locked-off or extremely slow drift, mild depth of field, 24fps.
Motion: slow, satisfying, toy-like (marbles rolling, gentle bobbing, soft squash and stretch).
Absolutely no text, letters, numbers, logos, UI, or people. Clean, uncluttered composition.
Seamless loop: the last frame is identical to the first frame.
```

---

## 3. Breakdown vídeo a vídeo

Cada vídeo tem dois prompts:
- **(A) Quadro-chave:** a imagem parada, que vira o Start Frame e o End Frame.
- **(B) Movimento:** o prompt de image-to-video.

### VÍDEO 1: HERO · 8–10 s · `hero.mp4`

- **Função no arco:** Abertura do site. Primeira impressão: "um mundinho onde o marketing funciona como um brinquedo bem montado".
- **Câmera:** fixa, frontal, levemente de cima (≈10°), push-in de 2% ao longo do loop e volta.
- **Elementos:**
  - colinas verdes arredondadas com pinheirinhos;
  - no terço superior, flutuando: um celular azul com balões de conversa coloridos, um cano azul em espiral, uma lojinha com toldo listrado vermelho e branco, um funil creme soltando bolinhas coloridas, uma lupa e um gráfico de barras creme com a barra mais alta laranja.
- **Composição obrigatória:** metade inferior esquerda **livre** (colina verde-escura lisa), porque o título branco fica ali. Metade inferior direita também limpa (texto e botões).
- **Iluminação:** dia claro, céu ciano.
- **Entrada/saída:** loop. O último quadro é idêntico ao primeiro.

--- PROMPT (A) QUADRO-CHAVE ---
```
[GLOBAL STYLE] (colar)
Wide 16:9 miniature clay landscape: rolling rounded green hills with small rounded pine trees under a bright cyan sky
with soft clay clouds. Floating in the upper 45% of the frame, left to right: a chunky blue clay smartphone showing
colorful pill-shaped chat bubbles; a thick blue clay tube curling into a loop; a small cream clay shop with a red-and-white
striped awning and blue windows; a cream clay funnel with colorful clay balls (magenta, lime, blue cube) on top;
a cream magnifying glass with red handle; a cream clay bar chart with four rising bars, the tallest one orange,
with an orange ball on top. The lower half of the frame is clean, smooth, darker green hill with no objects,
darker toward the bottom. Front view, slightly from above.
```

--- PROMPT (B) MOVIMENTO ---
```
[GLOBAL STYLE] (colar)
[camera: locked-off, very slow push-in then back out]. The floating clay objects bob gently up and down, out of sync.
Colorful clay balls drop one by one from the funnel, travel through the blue tube loop and pop into the little shop.
Chat bubbles on the smartphone pop in one at a time with soft squash and stretch. The orange bar of the chart
grows slightly and settles. Trees sway very subtly. Lower half of the frame stays calm and empty.
[ANCHOR] Start frame and end frame are the provided reference image. Seamless loop.
```

---

### PALCO COMUM DOS 4 PILARES (colar na cena de cada pilar)

```
[STAGE] Square 1:1 frame. Warm beige seamless studio backdrop (#F0E7D8), slightly lighter floor plane meeting the wall
at a soft horizon one third from the bottom. A thick cream clay tube enters diagonally from the right edge, pointing
down-left toward the center. One single character stands centered on the floor with a soft contact shadow.
Minimal, clean, lots of breathing room.
```

### VÍDEO 2: ATRAIR · 6–8 s · `atrair.mp4`

- **Função:** apresentar o pilar "Atrair" (tráfego + criativos). O ímã puxa o cliente certo.
- **Personagem:** ímã em U de massinha azul-elétrico (#3D4BFF) com pontas brancas.
- **Ação:** bolinhas saem do cano e são **puxadas** pelo ímã, grudam nele e se soltam suavemente no fim.

--- PROMPT (A) ---
```
[GLOBAL STYLE] (colar)
[STAGE] (colar)
Character: a chunky electric-blue clay horseshoe magnet with white clay tips, standing upright, slightly tilted.
Two small clay balls (lime and orange) rest at the mouth of the tube.
```
--- PROMPT (B) ---
```
[GLOBAL STYLE] (colar)
[camera: locked-off]. Small colorful clay balls roll out of the cream tube, curve through the air as if pulled by
magnetism and stick softly to the magnet's tips with a tiny squash. The magnet bobs gently. At the end the balls roll
back to the mouth of the tube, returning exactly to the first frame.
[ANCHOR] Start frame and end frame are the provided reference image. Seamless loop.
```

### VÍDEO 3: CONVERTER · 6–8 s · `converter.mp4`

- **Função:** pilar "Converter" (estrutura de conversão + CRM). Muitas entradas, um resultado.
- **Personagem:** funil de massinha laranja (#FF6A2B).
- **Ação:** bolinhas azuis e lima caem no funil. O funil "espreme" de leve e sai uma bolinha azul por baixo, que rola para fora.

--- PROMPT (A) ---
```
[GLOBAL STYLE] (colar)
[STAGE] (colar)
Character: a chunky orange clay funnel standing on a short orange spout, one blue ball and one lime ball resting on its rim.
```
--- PROMPT (B) ---
```
[GLOBAL STYLE] (colar)
[camera: locked-off]. Clay balls roll out of the cream tube and drop into the orange funnel. The funnel squashes softly
as they pass, and a single blue ball pops out of the spout and rolls gently off frame to the left. The rim balls wobble.
Loop returns exactly to the first frame.
[ANCHOR] Start frame and end frame are the provided reference image. Seamless loop.
```

### VÍDEO 4: PRESENÇA · 6–8 s · `presenca.mp4`

- **Função:** pilar "Presença" (social media, design, vídeo). A marca com carisma.
- **Personagem:** estrela gorducha de massinha verde-lima (#8CCF1F) com olhinhos pretos e sorriso.
- **Ação:** pisca, balança, pequenas estrelinhas de massinha surgem em volta. Uma bolinha do cano encosta nela e ela dá uma "rebolada" feliz.

--- PROMPT (A) ---
```
[GLOBAL STYLE] (colar)
[STAGE] (colar)
Character: a chubby lime-green clay star with rounded tips, simple glossy black oval eyes with white highlights
and a small black smile, standing on the floor.
```
--- PROMPT (B) ---
```
[GLOBAL STYLE] (colar)
[camera: locked-off]. The star character blinks, sways side to side with soft squash and stretch, and tiny clay
sparkle stars pop in and out around it. An orange ball rolls out of the tube, bumps the star gently, and the star
wiggles happily. Everything settles back to the first frame.
[ANCHOR] Start frame and end frame are the provided reference image. Seamless loop.
```

### VÍDEO 5: CRESCER · 6–8 s · `crescer.mp4`

- **Função:** pilar "Crescer" (gestão empresarial). Estratégia que faz subir.
- **Personagem:** três barras de massinha creme, a mais alta magenta (#E03CB8), com uma seta magenta subindo.
- **Ação:** a bolinha sai do cano e sobe as barras como degraus até o topo. A seta cresce junto.

--- PROMPT (A) ---
```
[GLOBAL STYLE] (colar)
[STAGE] (colar)
Character: three rounded clay bars of increasing height, the first two cream, the tallest magenta, with a thick
magenta clay arrow line zig-zagging upward above them.
```
--- PROMPT (B) ---
```
[GLOBAL STYLE] (colar)
[camera: locked-off]. An orange clay ball rolls out of the cream tube and hops up the bars like steps, landing on top
of the magenta bar with a soft squash. The magenta arrow stretches upward a little as the ball climbs, then everything
relaxes back to the first frame.
[ANCHOR] Start frame and end frame are the provided reference image. Seamless loop.
```

### VÍDEO 6: SISTEMA · 8–10 s · `sistema.mp4`

- **Função:** Clímax do site. Os 4 pilares conectados, "o sistema inteiro trabalhando junto".
- **Composição:** os 4 personagens enfileirados da esquerda para a direita (ímã azul, funil laranja, estrela verde, barras magenta), ligados por um cano creme ondulado. No chão, formas geométricas cinza pequenas (triângulo, quadrado, círculo). Tudo na faixa central horizontal, porque o site corta o topo e a base.
- **Ação:** uma bolinha laranja percorre o cano: é puxada pelo ímã, entra no funil, passa pela estrela (que a acompanha com os olhos) e sobe as barras.

--- PROMPT (A) ---
```
[GLOBAL STYLE] (colar)
Wide 16:9 warm beige seamless studio set (#F0E7D8). In a horizontal row across the middle of the frame: the blue clay
horseshoe magnet, the orange clay funnel, the lime-green clay star character with eyes and smile, and the three clay bars
with the tallest magenta. A thick cream clay tube weaves in a gentle wave connecting all four. Small grey clay shapes
(triangle, cube, flat disc) sit on the floor in the foreground. Keep the top and bottom 15% of the frame empty.
```
--- PROMPT (B) ---
```
[GLOBAL STYLE] (colar)
[camera: very slow lateral drift left to right and back]. An orange clay ball travels along the cream tube: it is pulled
toward the magnet, drops through the funnel, rolls past the star (whose eyes follow it), then climbs the bars and lands on
top of the magenta bar. Each character reacts with a small squash. The ball fades back into the tube start for the loop.
[ANCHOR] Start frame and end frame are the provided reference image. Seamless loop.
```

### VÍDEO 7: FINAL · 8–10 s · `final.mp4`

- **Função:** Fechamento. Alegria e abundância: um "mar" de clientes (bolinhas).
- **Composição:**
  - terço superior: céu **quase branco** (o título do CTA fica logo acima);
  - colinas verdes com pinheirinhos, com um escorregador azul saindo de um túnel escuro à esquerda;
  - no centro, um túnel de anéis coloridos;
  - metade inferior: uma enorme piscina oval de bolinhas coloridas.

  O centro da parte de baixo fica coberto pelo card do rodapé. As laterais e o topo são o que aparece.
- **Ação:** bolinhas descem pelo escorregador e caem na piscina; as bolinhas da piscina "respiram"; algumas saem do túnel colorido.

--- PROMPT (A) ---
```
[GLOBAL STYLE] (colar)
Wide 16:9 claymation landscape. Top third: very pale, almost white sky. Middle: rolling green clay hills with small
rounded pine trees; on the left hill a dark tunnel opening with a glossy blue clay slide winding down toward the center.
In the center, a round tunnel made of concentric clay rings (cyan, orange, yellow). Bottom half: a huge oval ball pit
filled with hundreds of small multicolor clay balls (pink, yellow, blue, green, orange, purple, cyan).
```
--- PROMPT (B) ---
```
[GLOBAL STYLE] (colar)
[camera: locked-off]. A few colorful clay balls slide down the blue slide and plop into the ball pit with soft bounces.
The balls in the pit jiggle gently like they are breathing. Two or three balls pop out of the ring tunnel and roll into
the pit. The sky stays clean and bright. Loop returns exactly to the first frame.
[ANCHOR] Start frame and end frame are the provided reference image. Seamless loop.
```

---

## 4. Mapa de transições

Cada vídeo é um loop independente. A "transição" é o ponto de loop, e a continuidade entre eles vem da **Camada Global** e dos mesmos personagens.

| Vídeo | Transição | Destino | Timing | Lógica |
|---|---|---|---|---|
| Hero | Loop (fim = início) | Hero | último quadro = 1º | Bolinhas sempre entrando na loja: fluxo contínuo de clientes |
| Atrair → Converter → Presença → Crescer | Corte por rolagem (os cards se empilham no site) | Próximo pilar | Scroll | O mesmo palco bege e o mesmo cano dão continuidade de "série" |
| Pilares | → | Sistema | Scroll | Os 4 personagens se reencontram, conectados |
| Sistema | → | Final | Scroll | Da "máquina" para o resultado: a piscina de bolinhas (abundância) |

## 5. Protocolo de imagens de referência

- `briefing/referencias/*.png` mostram a **composição** esperada de cada espaço, tirada das ilustrações atuais do site. Use como guia de enquadramento no gerador de imagem (image prompt / referência de composição), **não** como estilo final.
- Gere primeiro os **4 personagens** isolados e aprove o visual. Depois, use essas imagens aprovadas como referência de personagem no quadro-chave do **Sistema**, para os bonecos ficarem iguais.
- No Kling, anexe o mesmo quadro-chave em **Start Frame** e **End Frame**. No Runway, use o quadro-chave como imagem inicial e feche o loop na edição (veja abaixo).

## 6. Direção sonora

Os vídeos tocam **sem som** no site. Se quiser reaproveitá-los no Instagram:
- **Base:** trilha lo-fi alegre e leve, ~95 BPM.
- **Efeitos por cena:**
  - "plop" macio de massinha a cada bolinha;
  - "pop" nos balões de conversa (hero);
  - "tlim" discreto quando a bolinha chega ao topo das barras (crescer);
  - risadinha curta da estrela (presença).

## 7. Finalização e publicação

Se o loop não fechar perfeito, duplique o clipe na timeline (CapCut/DaVinci) e faça um *crossfade* de 0,5–1 s entre o fim e o começo.

Comprimir e gerar o poster:

```bash
ffmpeg -i bruto.mp4 -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -vf "scale=1920:-2" hero.mp4
ffmpeg -i hero.mp4 -frames:v 1 -q:v 3 hero.jpg
```

- Hero e final: até ~4 MB. Pilares: até ~2 MB cada (use `scale=1080:-2`).
- Coloque os arquivos em `client/public/videos/` e preencha em `client/src/content.js`:

```js
hero: { src: "/videos/hero.mp4", poster: "/videos/hero.jpg" },
```

## 8. Checklist pré-geração

- [ ] Camada Global copiada em todos os prompts
- [ ] Palco comum colado nos 4 pilares
- [ ] 4 personagens aprovados antes de gerar o vídeo "Sistema"
- [ ] Hero: metade de baixo livre para o título e os botões
- [ ] Final: céu quase branco no terço superior
- [ ] Start Frame = End Frame (loop) ou crossfade na edição
- [ ] Sem texto, logo ou pessoas nos vídeos
- [ ] Arquivos comprimidos, com poster, nomes iguais aos da tabela
