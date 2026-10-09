import type { Localized } from "./types";

export type Market = {
  id: "sa" | "ae" | "kw" | "qa" | "bh" | "om" | "eg" | "tr";
  name: Localized;
  /** Where the pin sits (a point inside the country), in degrees. */
  lon: number;
  lat: number;
  /** Where the map label sits relative to its pin, so close neighbours don't overlap. */
  label: "above" | "below" | "start" | "end";
};

// The markets the company aims to serve: the six Gulf countries (content brief, Oct 2026) plus Egypt
// and Türkiye, added at the client's request on 2026-10-09.
// The studio works wherever the client's market is; these are the ones shown on the map today.
// Deliberately no cities, offices or per-country figures: none are confirmed.
export const markets: Market[] = [
  { id: "sa", name: { ar: "السعودية", en: "Saudi Arabia" }, lon: 46.7, lat: 24.7, label: "start" },
  { id: "ae", name: { ar: "الإمارات", en: "UAE" }, lon: 54.6, lat: 24.2, label: "below" },
  { id: "kw", name: { ar: "الكويت", en: "Kuwait" }, lon: 47.75, lat: 29.35, label: "above" },
  { id: "qa", name: { ar: "قطر", en: "Qatar" }, lon: 51.2, lat: 25.3, label: "below" },
  { id: "bh", name: { ar: "البحرين", en: "Bahrain" }, lon: 50.55, lat: 26.1, label: "above" },
  { id: "om", name: { ar: "عُمان", en: "Oman" }, lon: 57.3, lat: 21.6, label: "end" },
  { id: "eg", name: { ar: "مصر", en: "Egypt" }, lon: 31.24, lat: 30.04, label: "below" },
  { id: "tr", name: { ar: "تركيا", en: "Türkiye" }, lon: 28.98, lat: 41.01, label: "below" },
];

/** Confirmed by the client: experience belongs to the team, not the company's age. */
export const teamExperienceYears = 12;
