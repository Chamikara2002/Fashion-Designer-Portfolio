import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

async function prerender() {
  console.log('🚀 Prerendering root route at build time...');
  let template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');

  // Import server bundle
  const { render } = await import('./dist-server/entry-server.js');
  const { html: appHtml, helmetContext } = render();

  if (helmetContext && helmetContext.helmet) {
    const { title, meta } = helmetContext.helmet;
    if (title && title.toString()) {
      template = template.replace(/<title.*?>.*?<\/title>/, title.toString());
    }
    if (meta && meta.toString()) {
      const metaStr = meta.toString();
      const descMatch = metaStr.match(/<meta[^>]*name="description"[^>]*>/);
      if (descMatch) {
        template = template.replace(/<meta[^>]*name="description"[^>]*\/?>/, descMatch[0]);
      }
      const ogTitleMatch = metaStr.match(/<meta[^>]*property="og:title"[^>]*>/);
      if (ogTitleMatch) {
        template = template.replace(/<meta[^>]*property="og:title"[^>]*\/?>/, ogTitleMatch[0]);
      }
      const ogDescMatch = metaStr.match(/<meta[^>]*property="og:description"[^>]*>/);
      if (ogDescMatch) {
        template = template.replace(/<meta[^>]*property="og:description"[^>]*\/?>/, ogDescMatch[0]);
      }
    }
  }

  // Inject rendered HTML into <div id="root"> after stripping any Helmet head tags (<title>, <meta>) from appHtml
  const cleanAppHtml = appHtml
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta[^>]*\/?>/gi, '');

  const finalHtml = template.replace('<div id="root"></div>', `<div id="root">${cleanAppHtml}</div>`);

  fs.writeFileSync(toAbsolute('dist/index.html'), finalHtml, 'utf-8');
  console.log('✨ Successfully prerendered root route! dist/index.html updated with real HTML content.');
}

prerender().catch((err) => {
  console.error('❌ Prerendering error:', err);
  process.exit(1);
});
