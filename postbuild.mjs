import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = 'dist';
const ASSETS = path.join(OUT, 'assets');
await mkdir(ASSETS, { recursive: true });

for (const name of ['hero','concrete','gravel','fence','paint']) {
  await copyFile(path.join('visuals', `${name}.webp`), path.join(ASSETS, `${name}.webp`));
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

console.log('Photorealistic visual polish complete');
