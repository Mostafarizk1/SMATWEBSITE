// Generates the V1 placeholder imagery (abstract, brand-neutral) into public/media.
// Run: node scripts/generate-placeholders.mjs  — replace the outputs with real media later.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const out = new URL("../public/media/", import.meta.url);
mkdirSync(out, { recursive: true });

// Deterministic PRNG so re-runs produce identical files.
const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

const save = (name, w, h, body, quality = 72) =>
  sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`))
    .jpeg({ quality, progressive: true, mozjpeg: true })
    .toFile(new URL(name, out).pathname.replace(/^\/([A-Za-z]:)/, "$1"))
    .then((i) => console.log(name, `${Math.round(i.size / 1024)} KB`));

function skyline(w, h, r, { base = h, count = 18, minH = 0.25, maxH = 0.75, tone = "#12121a", lit = "#f4e7c5", litRate = 0.18 } = {}) {
  let s = "";
  let x = -20;
  while (x < w) {
    const bw = 60 + r() * 140;
    const bh = h * (minH + r() * (maxH - minH));
    const top = base - bh;
    s += `<rect x="${x}" y="${top}" width="${bw}" height="${bh + 2}" fill="${tone}"/>`;
    for (let wy = top + 18; wy < base - 12; wy += 22) {
      for (let wx = x + 12; wx < x + bw - 14; wx += 18) {
        if (r() < litRate) s += `<rect x="${wx}" y="${wy}" width="8" height="10" fill="${lit}" opacity="${0.25 + r() * 0.6}"/>`;
      }
    }
    x += bw + 6 + r() * 20;
    if (--count < -40) break;
  }
  return s;
}

const grad = (id, stops, x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</linearGradient>`;

// ── Hero poster: night skyline ─────────────────────────────────────
{
  const w = 1920, h = 1080, r = rng(7);
  await save(
    "hero-poster.jpg",
    w,
    h,
    `<defs>${grad("sky", [[0, "#07070c"], [0.6, "#15122a"], [1, "#2a1d3a"]])}
      <radialGradient id="glow" cx="0.72" cy="0.55" r="0.5"><stop offset="0" stop-color="#7b61ff" stop-opacity="0.45"/><stop offset="1" stop-color="#7b61ff" stop-opacity="0"/></radialGradient></defs>
     <rect width="${w}" height="${h}" fill="url(#sky)"/><rect width="${w}" height="${h}" fill="url(#glow)"/>
     ${skyline(w, h, r, { base: h, minH: 0.2, maxH: 0.5, tone: "#1a1826", litRate: 0.08 })}
     ${skyline(w, h, r, { base: h, minH: 0.3, maxH: 0.78, tone: "#0d0d14", litRate: 0.16 })}
     <rect x="0" y="${h - 120}" width="${w}" height="120" fill="#07070b"/>`,
    68,
  );
}

// ── Real estate: blueprint-style tower ─────────────────────────────
{
  const w = 1600, h = 1000, r = rng(11);
  let lines = "";
  for (let x = 0; x < w; x += 40) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#23233a" stroke-width="1"/>`;
  for (let y = 0; y < h; y += 40) lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#23233a" stroke-width="1"/>`;
  let floors = "";
  const tx = 620, tw = 360, top = 120;
  for (let y = top; y < h - 80; y += 28) {
    floors += `<rect x="${tx}" y="${y}" width="${tw}" height="24" fill="#15151f" stroke="#3a3a55" stroke-width="1"/>`;
    for (let wx = tx + 10; wx < tx + tw - 20; wx += 26) if (r() < 0.35) floors += `<rect x="${wx}" y="${y + 6}" width="16" height="12" fill="#d4ff3a" opacity="${0.15 + r() * 0.5}"/>`;
  }
  await save(
    "real-estate-poster.jpg",
    w,
    h,
    `<defs>${grad("bg", [[0, "#0b0b12"], [1, "#171428"]])}
      <radialGradient id="g" cx="0.5" cy="0.35" r="0.55"><stop offset="0" stop-color="#d4ff3a" stop-opacity="0.12"/><stop offset="1" stop-color="#d4ff3a" stop-opacity="0"/></radialGradient></defs>
     <rect width="${w}" height="${h}" fill="url(#bg)"/>${lines}<rect width="${w}" height="${h}" fill="url(#g)"/>
     <path d="M${tx - 40} ${top + 10} L${tx + tw / 2} ${top - 70} L${tx + tw + 40} ${top + 10}" fill="none" stroke="#d4ff3a" stroke-width="2" opacity="0.7"/>
     ${floors}
     <line x1="${tx - 120}" y1="${h - 80}" x2="${tx + tw + 120}" y2="${h - 80}" stroke="#d4ff3a" stroke-width="2" opacity="0.6"/>
     ${skyline(w, h, r, { base: h - 80, minH: 0.08, maxH: 0.22, tone: "#12121c", litRate: 0.1 })}`,
    70,
  );
}

// ── Work posters ───────────────────────────────────────────────────
const W = 1200, H = 900;

// 1. Waterfront
{
  const r = rng(21);
  await save("work-1.jpg", W, H, `<defs>${grad("a", [[0, "#1b2a4a"], [0.55, "#e6a86b"], [0.62, "#0c1a2e"], [1, "#06101d"]])}</defs>
    <rect width="${W}" height="${H}" fill="url(#a)"/><circle cx="820" cy="470" r="70" fill="#ffd9a0" opacity="0.8"/>
    ${skyline(W, H, r, { base: 560, minH: 0.12, maxH: 0.42, tone: "#0d1626", lit: "#ffd9a0", litRate: 0.2 })}
    ${Array.from({ length: 40 }, (_, i) => `<rect x="${r() * W}" y="${580 + i * 8}" width="${40 + r() * 160}" height="2" fill="#ffd9a0" opacity="${0.1 + r() * 0.3}"/>`).join("")}`);
}
// 2. Gaussian splat point cloud
{
  const r = rng(33);
  let pts = "";
  for (let i = 0; i < 2600; i++) {
    const t = r();
    const x = 420 + r() * 360 + (r() - 0.5) * 40;
    const y = 120 + t * 680;
    const c = r() < 0.12 ? "#d4ff3a" : r() < 0.5 ? "#8fa3ff" : "#e8e6f0";
    pts += `<circle cx="${x}" cy="${y}" r="${0.8 + r() * 2.4}" fill="${c}" opacity="${0.2 + r() * 0.7}"/>`;
  }
  await save("work-2.jpg", W, H, `<rect width="${W}" height="${H}" fill="#07080f"/>${pts}`);
}
// 3. Café identity board
await save("work-3.jpg", W, H, `<rect width="${W}" height="${H}" fill="#e9dcc6"/>
  <rect x="80" y="80" width="480" height="740" rx="24" fill="#3b2a1e"/><circle cx="320" cy="360" r="120" fill="#e9dcc6"/><circle cx="320" cy="360" r="60" fill="#c8793a"/>
  <rect x="620" y="80" width="500" height="350" rx="24" fill="#c8793a"/><rect x="620" y="470" width="240" height="350" rx="24" fill="#6d8a5a"/>
  <rect x="880" y="470" width="240" height="350" rx="120" fill="#3b2a1e"/><rect x="170" y="560" width="300" height="18" rx="9" fill="#e9dcc6"/><rect x="210" y="600" width="220" height="12" rx="6" fill="#e9dcc6" opacity="0.6"/>`);
// 4. Villas campaign
{
  let villas = "";
  for (let i = 0; i < 6; i++) {
    const x = 40 + i * 190;
    villas += `<rect x="${x}" y="560" width="170" height="140" fill="#f1efe9"/><rect x="${x + 20}" y="600" width="50" height="60" fill="#2c3e50" opacity="0.8"/><rect x="${x + 100}" y="600" width="50" height="100" fill="#8b6b4a"/><rect x="${x - 10}" y="545" width="190" height="18" fill="#d9d4c7"/>`;
  }
  await save("work-4.jpg", W, H, `<defs>${grad("s", [[0, "#8ec5e8"], [1, "#f6e3c3"]])}</defs><rect width="${W}" height="${H}" fill="url(#s)"/>
    ${villas}<rect x="0" y="700" width="${W}" height="200" fill="#6f8f4e"/>
    <rect x="860" y="120" width="230" height="420" rx="32" fill="#0a0a0f"/><rect x="872" y="140" width="206" height="380" rx="22" fill="#d4ff3a"/><rect x="900" y="420" width="150" height="40" rx="20" fill="#0a0a0f"/>`);
}
// 5. Retail relaunch
await save("work-5.jpg", W, H, `<rect width="${W}" height="${H}" fill="#ff6a3d"/>
  <circle cx="380" cy="450" r="300" fill="#0a0a0f"/><rect x="560" y="150" width="480" height="600" rx="40" fill="#f4f2ed"/>
  <path d="M640 650 L800 260 L960 650 Z" fill="#3d5afe"/><circle cx="380" cy="450" r="110" fill="#ff6a3d"/>`);
// 6. Masterplan
{
  const r = rng(55);
  let plots = "";
  for (let y = 60; y < H - 60; y += 70) for (let x = 60; x < W - 60; x += 90) {
    const green = r() < 0.18;
    plots += `<rect x="${x}" y="${y}" width="78" height="58" rx="6" fill="${green ? "#2f5a3a" : "#1c1c28"}" stroke="#34344a"/>`;
  }
  await save("work-6.jpg", W, H, `<rect width="${W}" height="${H}" fill="#0e0e16"/>${plots}
    <path d="M0 470 C 300 380, 600 560, ${W} 430" stroke="#d4ff3a" stroke-width="22" fill="none" opacity="0.9"/>
    <circle cx="600" cy="470" r="90" fill="none" stroke="#7b61ff" stroke-width="10"/>`);
}

// ── OpenGraph ──────────────────────────────────────────────────────
await save("og.jpg", 1200, 630, `<rect width="1200" height="630" fill="#0a0a0f"/>
  <radialGradient id="o" cx="0.85" cy="0.1" r="0.7"><stop offset="0" stop-color="#7b61ff" stop-opacity="0.4"/><stop offset="1" stop-color="#7b61ff" stop-opacity="0"/></radialGradient>
  <rect width="1200" height="630" fill="url(#o)"/>
  <text x="80" y="330" font-family="Arial, Helvetica, sans-serif" font-size="120" font-weight="700" fill="#f4f2ed">SMAT <tspan font-weight="300" fill="#9a98a3">Studio</tspan></text>
  <circle cx="815" cy="318" r="18" fill="#d4ff3a"/>
  <text x="84" y="430" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="#9a98a3">Think. Create. Grow.</text>`, 80);
