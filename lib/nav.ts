export const navItems = [
  { key: "services", href: "/services" },
  { key: "work", href: "/work" },
  { key: "realEstate", href: "/real-estate" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export type NavLabels = { key: string; href: string; label: string }[];
