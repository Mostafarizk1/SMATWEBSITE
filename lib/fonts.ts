import { Alexandria, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";

// Headings: variable, Arabic + Latin. Preloaded because the hero h1 uses it.
export const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-alexandria",
});

// Body fonts are not preloaded: the layout imports both, but each locale only uses one.
// Preloading both would waste bandwidth on the locale that doesn't need it.
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-plex-arabic",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-inter",
});
