// WCAG contrast check for the three palettes. Run: node scripts/contrast.mjs
const L = (hex) => {
  const c = hex.replace("#", "").match(/../g).map((h) => parseInt(h, 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [L(a), L(b)].sort((p, q) => q - p); return ((x + 0.05) / (y + 0.05)).toFixed(2); };
const themes = {
  electric: { bg: "#07080D", surface: "#11131C", text: "#EEF1F7", muted: "#8E94A6", accent: "#3D5AFE", accent2: "#FF6A3D", onAccent: "#FFFFFF", accentInk: "#8196FF" },
};
for (const [n, t] of Object.entries(themes)) {
  console.log(n,
    "| text/bg", ratio(t.text, t.bg), "| muted/bg", ratio(t.muted, t.bg), "| muted/surface", ratio(t.muted, t.surface),
    "| onAccent/accent", ratio(t.onAccent, t.accent), "| darkOnAccent", ratio(t.bg, t.accent),
    "| accentInk/bg", ratio(t.accentInk, t.bg), "| accentInk/surface", ratio(t.accentInk, t.surface), "| accent2/bg", ratio(t.accent2, t.bg));
}
