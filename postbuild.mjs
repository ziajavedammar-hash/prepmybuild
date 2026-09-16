import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = 'dist';
const ASSETS = path.join(OUT, 'assets');
await mkdir(ASSETS, { recursive: true });

const svgs = {
  hero: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" role="img" aria-label="Home project planning workspace"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eef7f2"/><stop offset="1" stop-color="#dbeee4"/></linearGradient><linearGradient id="desk" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d7b995"/><stop offset="1" stop-color="#b88d63"/></linearGradient></defs><rect width="1200" height="760" fill="url(#bg)"/><rect x="0" y="470" width="1200" height="290" fill="url(#desk)"/><rect x="110" y="135" width="570" height="360" rx="28" fill="#fff" stroke="#d8e5de" stroke-width="4"/><rect x="160" y="190" width="470" height="34" rx="10" fill="#173126" opacity=".9"/><rect x="160" y="252" width="360" height="20" rx="8" fill="#9fb7aa"/><rect x="160" y="302" width="240" height="120" rx="18" fill="#e9f5ef"/><rect x="430" y="302" width="200" height="120" rx="18" fill="#f4efe8"/><circle cx="280" cy="362" r="42" fill="#1f6b4d"/><path d="M260 362l15 15 28-34" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><rect x="755" y="190" width="260" height="330" rx="18" fill="#fff" stroke="#d8e5de" stroke-width="4" transform="rotate(5 885 355)"/><path d="M800 260h150M800 305h170M800 350h120M800 395h160" stroke="#7a9185" stroke-width="12" stroke-linecap="round"/><rect x="750" y="535" width="300" height="34" rx="17" fill="#f3c458" transform="rotate(-8 900 552)"/><circle cx="1060" cy="575" r="88" fill="#1f6b4d" opacity=".18"/><path d="M1020 605c35-90 65-110 105-125-8 54-38 103-105 125z" fill="#2f8a63"/></svg>`,
  concrete: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" role="img" aria-label="Concrete patio project"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#cfe8f5"/><stop offset="1" stop-color="#f6fbfd"/></linearGradient></defs><rect width="800" height="460" fill="url(#s)"/><rect y="275" width="800" height="185" fill="#8bb46f"/><rect x="80" y="115" width="640" height="220" rx="8" fill="#f7f4ec"/><rect x="135" y="165" width="150" height="130" fill="#b9d8e8"/><rect x="515" y="165" width="150" height="130" fill="#b9d8e8"/><polygon points="45,380 610,300 760,380 190,450" fill="#b9b8b2"/><path d="M170 366l90 65M300 348l95 64M445 328l95 63M590 310l95 62" stroke="#999894" stroke-width="5" opacity=".75"/><circle cx="105" cy="385" r="28" fill="#557e46"/></svg>`,
  gravel: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" role="img" aria-label="Gravel driveway project"><rect width="800" height="460" fill="#dceef6"/><rect y="260" width="800" height="200" fill="#80a768"/><rect x="70" y="130" width="270" height="170" rx="8" fill="#f2efe7"/><polygon points="0,460 275,245 525,245 800,460" fill="#b6b0a3"/><g fill="#8d897f"><circle cx="250" cy="330" r="7"/><circle cx="300" cy="375" r="9"/><circle cx="355" cy="340" r="6"/><circle cx="430" cy="390" r="8"/><circle cx="520" cy="345" r="7"/><circle cx="585" cy="405" r="9"/><circle cx="645" cy="360" r="6"/></g><rect x="115" y="170" width="80" height="80" fill="#b9d8e8"/></svg>`,
  fence: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" role="img" aria-label="Wood fence project"><rect width="800" height="460" fill="#dceef6"/><rect y="285" width="800" height="175" fill="#8bb46f"/><g fill="#c69b6d" stroke="#9f744a" stroke-width="3">${Array.from({length:10},(_,i)=>`<path d="M${30+i*78} 180l32-28 32 28v220h-64z"/>`).join('')}</g><rect y="350" width="800" height="32" fill="#a4764a"/><rect y="265" width="800" height="32" fill="#a4764a"/></svg>`,
  paint: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" role="img" aria-label="Interior painting project"><rect width="800" height="460" fill="#f6f2e8"/><rect x="0" y="0" width="515" height="360" fill="#d8eadf"/><rect x="515" y="0" width="285" height="360" fill="#f7f4ec"/><rect y="360" width="800" height="100" fill="#c5a780"/><rect x="100" y="90" width="180" height="150" rx="4" fill="#fff" stroke="#cad8d0" stroke-width="12"/><rect x="575" y="95" width="105" height="190" rx="12" fill="#fff"/><rect x="565" y="280" width="125" height="22" rx="8" fill="#1f6b4d"/><rect x="622" y="290" width="10" height="85" fill="#6f7672"/><rect x="590" y="370" width="76" height="55" rx="8" fill="#1f6b4d"/></svg>`
};

for (const [name, svg] of Object.entries(svgs)) {
  await writeFile(path.join(ASSETS, `${name}.svg`), svg);
}

async function patchFile(rel, transform) {
  const p = path.join(OUT, rel);
  const src = await readFile(p, 'utf8');
  await writeFile(p, transform(src));
}

const brokenBase = /https:\/\/6aa9a979661088941767b157--silver-pegasus-333e25\.netlify\.app\/assets\/images\/(hero|concrete|gravel|fence|paint)\.webp/g;
const replaceImages = html => html.replace(brokenBase, (_, name) => `/assets/${name}.svg`);

for (const rel of ['index.html', 'calculators/index.html']) {
  await patchFile(rel, replaceImages);
}

await patchFile('quote-check.html', html => {
  html = replaceImages(html);
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
  return html;
});

console.log('Post-build polish complete');
