// Sectors SMAT serves. Names and one-liners live in messages under "sectors.items.<id>".
// PLACEHOLDER list: confirm the real sectors with the client. `href` is optional (a dedicated page).
export type Sector = { id: "realEstate" | "food" | "retail" | "health" | "education" | "corporate"; href?: string };

export const sectors: Sector[] = [
  { id: "realEstate", href: "/real-estate" },
  { id: "food" },
  { id: "retail" },
  { id: "health" },
  { id: "education" },
  { id: "corporate" },
];
