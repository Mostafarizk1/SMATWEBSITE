import type { Localized } from "./types";

export type Market = {
  id: "sa" | "ae" | "om" | "jo";
  code: string;
  name: Localized;
  cities: Localized;
  /** Approximate coordinates of the main city, used by the minimal network map. */
  lon: number;
  lat: number;
};

export const markets: Market[] = [
  {
    id: "sa",
    code: "KSA",
    name: { ar: "السعودية", en: "Saudi Arabia" },
    cities: { ar: "الرياض · جدة · الدمام", en: "Riyadh · Jeddah · Dammam" },
    lon: 46.7,
    lat: 24.7,
  },
  {
    id: "ae",
    code: "UAE",
    name: { ar: "الإمارات", en: "UAE" },
    cities: { ar: "دبي · أبوظبي", en: "Dubai · Abu Dhabi" },
    lon: 55.3,
    lat: 25.2,
  },
  {
    id: "om",
    code: "OMN",
    name: { ar: "عُمان", en: "Oman" },
    cities: { ar: "مسقط", en: "Muscat" },
    lon: 58.4,
    lat: 23.6,
  },
  {
    id: "jo",
    code: "JOR",
    name: { ar: "الأردن", en: "Jordan" },
    cities: { ar: "عمّان", en: "Amman" },
    lon: 35.9,
    lat: 31.95,
  },
];
