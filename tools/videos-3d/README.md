# Vídeos 3D do site (massinha)

Os vídeos de fundo do site da Mod. são cenas 3D feitas em código com three.js, no estilo de massinha, e renderizadas quadro a quadro em WebM e MP4.

| Cena | Arquivo gerado | Formato | Onde aparece |
|---|---|---|---|
| `hero` | `hero` | 1920×960, 10 s | Fundo da primeira dobra |
| `hero` (variante `mobile`) | `hero-mobile` | 900×1600, 10 s | Primeira dobra no celular |
| `atrair` | `atrair` | 1000×1000, 8 s | Card ATRAIR (ímã puxando os clientes) |
| `converter` | `converter` | 1000×1000, 8 s | Card CONVERTER (funil que gera o cliente) |
| `presenca` | `presenca` | 1000×1000, 8 s | Card PRESENÇA (estrela com brilhos) |
| `crescer` | `crescer` | 1000×1000, 8 s | Card CRESCER (bolinha subindo as barras) |
| `sistema` | `sistema` | 1920×840, 10 s | Card "Estratégia de negócio" (os 4 conectados) |
| `final` | `final` | 1920×1080, 8 s | Paisagem do CTA final e do rodapé |

Todos rodam a 15 quadros por segundo (ritmo de stop-motion) e fecham o loop: o último quadro emenda no primeiro.

## Como renderizar de novo

Requisitos: Node 20+ e `ffmpeg` no PATH.

```bash
cd tools/videos-3d
npm install
npx playwright install chromium
./render-all.sh            # todos os vídeos; sem GPU leva uns 40–60 min
```

Para uma cena só:

```bash
node render.mjs atrair 1000 1000 15 8 out/atrair
./encode.sh atrair out/atrair          # grava em client/public/videos/
```

O `encode.sh` aplica um grão leve de filme e uma vinheta sutil, e gera `<nome>.webm`, `<nome>.mp4` e `<nome>.jpg` (poster).

## Estrutura

- `index.html`: página que monta a cena e expõe `window.frame(i)` para o renderizador.
- `lib/studio.js`: renderizador, luzes e sombras suaves.
- `lib/clay.js`: material de massinha (fosco, com micro-relevo).
- `lib/parts.js`: peças (trilho em meia-cana, bolinhas, ímã, funil, estrela, barras, buraco no chão…).
- `lib/anim.js`: curvas de animação.
- `scenes/*.js`: cada cena exporta `T` (duração do loop) e `build(studio)`, que devolve `update(t)`.

Para mudar cores, tempos ou posições, edite a cena em `scenes/` e renderize de novo.
