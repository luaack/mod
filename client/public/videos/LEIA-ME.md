# Vídeos do site

Cada espaço de vídeo tem três arquivos com o mesmo nome:

- `<nome>.webm`: versão principal, mais leve.
- `<nome>.mp4`: reserva para navegadores sem WebM (Safari antigo).
- `<nome>.jpg`: poster, exibido enquanto o vídeo carrega.

Nomes: `hero` (e `hero-mobile`, a versão vertical para o celular), `atrair`, `converter`, `presenca`, `crescer`, `sistema` e `final`. Os caminhos ficam em `src/content.js` → `videos`.

Os vídeos atuais são renders 3D gerados por `tools/videos-3d`. Para trocar por outros, mantenha os mesmos nomes e formatos.

Nunca publique vídeos de terceiros. A pasta `_ref/` é ignorada pelo git e serve só para testes locais.
