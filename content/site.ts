// Single source of truth for company-wide config. Everything marked PLACEHOLDER is waiting on the client.

// NEXT_PUBLIC_SITE_URL wins; on Vercel we fall back to the production domain Vercel assigns.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")).replace(/\/$/, "");

export const site = {
  name: "SMAT Studio",
  url: siteUrl,

  /** PLACEHOLDER: international format, digits only (used for wa.me links). */
  whatsapp: "966500000000",
  /** PLACEHOLDER */
  email: "hello@smatstudio.example",
  /** PLACEHOLDER */
  phone: "+966 50 000 0000",

  /** PLACEHOLDER: real handles pending. Empty href hides nothing, it just links to "#". */
  socials: [
    { id: "instagram", label: "Instagram", href: "#" },
    { id: "linkedin", label: "LinkedIn", href: "#" },
    { id: "x", label: "X", href: "#" },
    { id: "tiktok", label: "TikTok", href: "#" },
  ],

  /**
   * Hero showreel. Keep each file < 3 MB. Leave the video sources null to show the poster only.
   * The poster is the LCP image, so keep it a small, well-compressed JPEG/AVIF.
   */
  showreel: {
    poster: "/media/hero-poster.jpg",
    webm: null as string | null,
    mp4: null as string | null,
  },

  realEstateReel: {
    poster: "/media/real-estate-poster.jpg",
    webm: null as string | null,
    mp4: null as string | null,
  },
} as const;

export const whatsappHref = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
