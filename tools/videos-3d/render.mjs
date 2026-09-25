// Renderiza uma cena quadro a quadro (PNG) usando o Chromium do Playwright.
// uso: node render.mjs <cena> <largura> <altura> <fps> <segundos> <pasta-saida> [variante]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const [scene, w, h, fps, secs, outDir, variant = ''] = process.argv.slice(2);
if (!scene || !outDir) {
  console.log('uso: node render.mjs <cena> <largura> <altura> <fps> <segundos> <pasta-saida> [variante]');
  process.exit(1);
}
const root = path.dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json' };
const server = http
  .createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      return res.end();
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(0);
const port = server.address().port;

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
page.on('pageerror', (e) => console.log('erro na página:', e.message));
await page.goto(`http://localhost:${port}/index.html?scene=${scene}&w=${w}&h=${h}&fps=${fps}&variant=${variant}`);
await page.waitForFunction(() => window.ready === true, null, { timeout: 180000 });
const total = Math.round(+fps * +secs);
const t0 = Date.now();
for (let i = 0; i < total; i++) {
  const data = await page.evaluate((i) => window.frame(i), i);
  fs.writeFileSync(path.join(outDir, `f_${String(i).padStart(4, '0')}.png`), Buffer.from(data.split(',')[1], 'base64'));
  if (i % 15 === 0) process.stdout.write(`\r${scene}: ${i}/${total}`);
}
console.log(`\r${scene}: ${total} quadros em ${((Date.now() - t0) / 1000).toFixed(0)}s`);
await browser.close();
server.close();
