import type { Localized } from "./types";

export type PillarId = "think" | "create" | "grow";

export type Service = {
  id: string;
  pillar: PillarId;
  title: Localized;
  summary: Localized;
};

export const pillars: PillarId[] = ["think", "create", "grow"];

export const services: Service[] = [
  // Think
  {
    id: "strategy",
    pillar: "think",
    title: { ar: "الاستراتيجية التسويقية", en: "Marketing strategy" },
    summary: {
      ar: "خطة واضحة تربط أهدافك التجارية بالقنوات والرسائل الصحيحة.",
      en: "A clear plan that links your business goals to the right channels and messages.",
    },
  },
  {
    id: "research",
    pillar: "think",
    title: { ar: "أبحاث السوق والمنافسين", en: "Market & competitor research" },
    summary: {
      ar: "نفهم جمهورك وسوقك قبل أن نصرف ريالاً واحداً.",
      en: "We understand your audience and market before a single riyal is spent.",
    },
  },
  {
    id: "planning",
    pillar: "think",
    title: { ar: "تخطيط الحملات", en: "Campaign planning" },
    summary: {
      ar: "جدول زمني، ميزانية، ورسائل مبنية على مراحل رحلة العميل.",
      en: "Timelines, budgets and messaging mapped to every stage of the buyer journey.",
    },
  },
  // Create
  {
    id: "identity",
    pillar: "create",
    title: { ar: "الهوية البصرية", en: "Visual identity & branding" },
    summary: {
      ar: "شعار ونظام بصري متكامل يعكس قيمة علامتك.",
      en: "Logos and complete visual systems that reflect your brand's value.",
    },
  },
  {
    id: "design",
    pillar: "create",
    title: { ar: "التصميم الجرافيكي", en: "Graphic design" },
    summary: {
      ar: "تصاميم للسوشيال والمطبوعات والإعلانات بمعايير عالية.",
      en: "Social, print and ad creative built to a high standard.",
    },
  },
  {
    id: "video",
    pillar: "create",
    title: { ar: "المونتاج والموشن جرافيك", en: "Video editing & motion graphics" },
    summary: {
      ar: "فيديوهات قصيرة وطويلة تشد الانتباه من أول ثانية.",
      en: "Short and long-form video that holds attention from the first second.",
    },
  },
  {
    id: "real-estate-video",
    pillar: "create",
    title: { ar: "فيديو عقاري وتصوير ثلاثي الأبعاد", en: "Real estate film & 3D" },
    summary: {
      ar: "أفلام مشاريع، تصوّر ثلاثي الأبعاد، وجولات Gaussian Splatting.",
      en: "Project films, 3D visualization and Gaussian Splatting fly-throughs.",
    },
  },
  {
    id: "content",
    pillar: "create",
    title: { ar: "كتابة المحتوى", en: "Content writing" },
    summary: {
      ar: "نصوص عربية وإنجليزية تبيع، بصوت علامتك.",
      en: "Arabic and English copy that sells, in your brand's voice.",
    },
  },
  {
    id: "web",
    pillar: "create",
    title: { ar: "المواقع والتطبيقات", en: "Websites & apps" },
    summary: {
      ar: "مواقع سريعة ومصممة لتحويل الزوار إلى عملاء.",
      en: "Fast websites designed to turn visitors into leads.",
    },
  },
  // Grow
  {
    id: "ads",
    pillar: "grow",
    title: { ar: "الإعلانات الممولة", en: "Paid advertising" },
    summary: {
      ar: "حملات على ميتا وسناب وتيك توك وجوجل تُدار بالأرقام.",
      en: "Meta, Snapchat, TikTok and Google campaigns managed by the numbers.",
    },
  },
  {
    id: "social",
    pillar: "grow",
    title: { ar: "إدارة السوشيال ميديا", en: "Social media management" },
    summary: {
      ar: "حضور ثابت ومجتمع متفاعل حول علامتك.",
      en: "A consistent presence and an engaged community around your brand.",
    },
  },
  {
    id: "seo",
    pillar: "grow",
    title: { ar: "تحسين محركات البحث", en: "SEO" },
    summary: {
      ar: "ظهور أعلى في نتائج البحث بالعربي والإنجليزي.",
      en: "Higher rankings in Arabic and English search.",
    },
  },
  {
    id: "analytics",
    pillar: "grow",
    title: { ar: "التحليلات والتقارير", en: "Analytics & reporting" },
    summary: {
      ar: "تقارير واضحة تقيس ما يهم: العملاء المحتملون والمبيعات.",
      en: "Clear reports that measure what matters: leads and sales.",
    },
  },
];

export const servicesByPillar = (pillar: PillarId) => services.filter((s) => s.pillar === pillar);
