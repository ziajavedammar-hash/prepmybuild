import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = 'dist';
const ASSETS = path.join(OUT, 'assets');
const BASE = 'https://prepmybuild.com';
await mkdir(ASSETS, { recursive: true });

for (const name of ['hero','concrete','gravel','fence','paint']) {
  const b64 = (await readFile(path.join('visuals', `${name}.b64`), 'utf8')).trim();
  await writeFile(path.join(ASSETS, `${name}.webp`), Buffer.from(b64, 'base64'));
}

async function patchFile(rel, transform) {
  const p = path.join(OUT, rel);
  const src = await readFile(p, 'utf8');
  await writeFile(p, transform(src));
}

const imageRe = /(?:https:\/\/6aa9a979661088941767b157--silver-pegasus-333e25\.netlify\.app\/assets\/images\/|\/assets\/)(hero|concrete|gravel|fence|paint)\.(?:webp|svg)/g;
const replaceImages = html => html.replace(imageRe, (_, name) => `/assets/${name}.webp`);

for (const rel of ['index.html', 'calculators/index.html']) {
  await patchFile(rel, replaceImages);
}

await patchFile('quote-check.html', html => {
  html = replaceImages(html);
  if (!html.includes('upload-choice')) {
    html = html.replace(
      '<input id="quoteFile" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.txt" required>',
      '<input id="quoteFile" class="file-input" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,image/*" required><label for="quoteFile" class="btn upload-choice">📷 Take a photo or choose a file</label><div id="quoteFileName" class="file-name">No file selected</div>'
    );
    html = html.replace(
      '<strong>PDF, PNG, JPG, WebP or TXT</strong>',
      '<strong>Take a photo or upload your quote</strong><p class="upload-sub">Use your camera for a paper quote, or choose a PDF/image already on your device.</p>'
    );
    html = html.replace(
      '</style>',
      '.file-input{position:absolute;inline-size:1px;block-size:1px;opacity:0;pointer-events:none}.upload-choice{margin-top:14px;background:#fff;border:1px solid #b9cec2}.file-name{margin-top:10px;font-size:.88rem;color:var(--muted);overflow-wrap:anywhere}.upload-sub{margin:8px auto 0;max-width:420px;color:var(--muted);font-size:.94rem}@media(max-width:650px){.upload{padding:24px 18px}.upload-choice{width:100%;min-height:52px}}\n</style>'
    );
    html = html.replace(
      '<script type="module">',
      '<script>document.addEventListener("DOMContentLoaded",()=>{const f=document.getElementById("quoteFile"),n=document.getElementById("quoteFileName");if(f&&n)f.addEventListener("change",()=>{n.textContent=f.files&&f.files[0]?f.files[0].name:"No file selected"})});</script><script type="module">'
    );
  }
  return html;
});

// SEO URL normalization: use one clean, extensionless URL everywhere.
const aliasTargets = new Map([
  ['/calculators/concrete-bags-calculator', '/calculators/concrete-calculator'],
  ['/calculators/concrete-patio-calculator', '/calculators/concrete-calculator'],
  ['/calculators/concrete-slab-calculator', '/calculators/concrete-calculator'],
  ['/calculators/gravel-depth-calculator', '/calculators/gravel-calculator'],
  ['/calculators/gravel-driveway-calculator', '/calculators/gravel-calculator'],
  ['/calculators/fence-material-calculator', '/calculators/fence-calculator'],
  ['/calculators/fence-post-spacing-calculator', '/calculators/fence-calculator'],
  ['/calculators/interior-paint-calculator', '/calculators/paint-calculator'],
  ['/calculators/exterior-paint-calculator', '/calculators/paint-calculator'],
  ['/calculators/paint-coverage-calculator', '/calculators/paint-calculator']
]);

function cleanUrl(url) {
  if (!url) return url;
  let out = url.replace(/\.html(?=([?#]|$))/g, '');
  if (out.endsWith('/index')) out = out.slice(0, -5);
  return out;
}

async function htmlFiles(dir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    const rel = path.join(prefix, entry.name);
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...await htmlFiles(full, rel));
    else if (entry.name.endsWith('.html')) found.push(rel.replaceAll('\\', '/'));
  }
  return found;
}

for (const rel of await htmlFiles(OUT)) {
  await patchFile(rel, html => {
    let out = html;
    out = out.replace(/href="([^"]+\.html(?:[?#][^"]*)?)"/g, (_, u) => `href="${cleanUrl(u)}"`);
    out = out.replace(/content="0;url=([^";]+\.html)"/g, (_, u) => `content="0;url=${cleanUrl(u)}"`);
    out = out.replace(new RegExp(`${BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^"'< >]*?)\\.html`, 'g'), (_, p) => `${BASE}${p}`);
    return out;
  });
}

// Rebuild sitemap with only canonical, index-worthy clean URLs.
const sitemapUrls = [
  '/',
  '/calculators/',
  '/calculators/concrete-calculator',
  '/calculators/gravel-calculator',
  '/calculators/fence-calculator',
  '/calculators/paint-calculator',
  '/quote-check',
  '/guides/',
  '/guides/how-much-concrete-for-patio',
  '/guides/how-much-gravel-for-driveway',
  '/guides/how-many-fence-posts-do-i-need',
  '/about',
  '/methodology',
  '/privacy',
  '/terms'
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(u => `  <url><loc>${BASE}${u}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(OUT, 'sitemap.xml'), sitemap, 'utf8');

// Permanent redirects consolidate every old .html and calculator alias URL.
const redirects = [
  '/calculators /calculators/ 301',
  '/guides /guides/ 301',
  '/index.html / 301',
  '/calculators/index.html /calculators/ 301',
  '/guides/index.html /guides/ 301',
  '/quote-check.html /quote-check 301',
  '/about.html /about 301',
  '/methodology.html /methodology 301',
  '/privacy.html /privacy 301',
  '/terms.html /terms 301',
  '/guides/how-much-concrete-for-patio.html /guides/how-much-concrete-for-patio 301',
  '/guides/how-much-gravel-for-driveway.html /guides/how-much-gravel-for-driveway 301',
  '/guides/how-many-fence-posts-do-i-need.html /guides/how-many-fence-posts-do-i-need 301',
  '/calculators/concrete-calculator.html /calculators/concrete-calculator 301',
  '/calculators/gravel-calculator.html /calculators/gravel-calculator 301',
  '/calculators/fence-calculator.html /calculators/fence-calculator 301',
  '/calculators/paint-calculator.html /calculators/paint-calculator 301'
];
for (const [alias, target] of aliasTargets) {
  redirects.push(`${alias}.html ${target} 301`);
  redirects.push(`${alias} ${target} 301`);
}
await writeFile(path.join(OUT, '_redirects'), `${redirects.join('\n')}\n`, 'utf8');

console.log('Photorealistic visual polish + SEO URL normalization complete');
