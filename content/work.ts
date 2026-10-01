import type { Localized } from "./types";

export type WorkCategory = "real-estate" | "branding" | "campaigns" | "video";

export const workCategories: WorkCategory[] = ["real-estate", "branding", "campaigns", "video"];

export type WorkItem = {
  slug: string;
  title: Localized;
  client: Localized;
  category: WorkCategory;
  poster: string;
  /** Short muted loop shown on hover (desktop only). null = poster only. */
  preview: string | null;
};

// PLACEHOLDER projects. Replace with the real 10–15 case studies (+ results) when delivered.
export const work: WorkItem[] = [
  {
    slug: "waterfront-residences",
    title: { ar: "إطلاق مشروع سكني على الواجهة البحرية", en: "Waterfront residences launch" },
    client: { ar: "مطوّر عقاري (اسم مؤقت)", en: "Real estate developer (placeholder)" },
    category: "real-estate",
    poster: "/media/work-1.jpg",
    preview: null,
  },
  {
    slug: "tower-flythrough",
    title: { ar: "جولة Gaussian Splatting لبرج مكاتب", en: "Office tower Gaussian Splatting fly-through" },
    client: { ar: "مطوّر عقاري (اسم مؤقت)", en: "Real estate developer (placeholder)" },
    category: "video",
    poster: "/media/work-2.jpg",
    preview: null,
  },
  {
    slug: "cafe-identity",
    title: { ar: "هوية بصرية لسلسلة مقاهٍ", en: "Visual identity for a café chain" },
    client: { ar: "علامة تجارية (اسم مؤقت)", en: "Brand (placeholder)" },
    category: "branding",
    poster: "/media/work-3.jpg",
    preview: null,
  },
  {
    slug: "villas-campaign",
    title: { ar: "حملة بيع مجمّع فلل", en: "Villa compound sales campaign" },
    client: { ar: "مطوّر عقاري (اسم مؤقت)", en: "Real estate developer (placeholder)" },
    category: "campaigns",
    poster: "/media/work-4.jpg",
    preview: null,
  },
  {
    slug: "retail-rebrand",
    title: { ar: "إعادة إطلاق علامة تجزئة", en: "Retail brand relaunch" },
    client: { ar: "علامة تجارية (اسم مؤقت)", en: "Brand (placeholder)" },
    category: "branding",
    poster: "/media/work-5.jpg",
    preview: null,
  },
  {
    slug: "masterplan-film",
    title: { ar: "فيلم مخطط رئيسي ثلاثي الأبعاد", en: "3D masterplan film" },
    client: { ar: "مطوّر عقاري (اسم مؤقت)", en: "Real estate developer (placeholder)" },
    category: "real-estate",
    poster: "/media/work-6.jpg",
    preview: null,
  },
];
