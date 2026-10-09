import type { Locale } from "@/i18n/routing";
import type { Localized } from "./types";

export type PillarId = "think" | "create" | "grow";

export type Service = {
  id: string;
  pillar: PillarId;
  title: Localized;
  /** One line, used in the home page method tabs. */
  summary: Localized;
  /** A short paragraph, used on the Services page. */
  detail: Localized;
  /** What the service covers, used on the Services page. Final scope is set per project. */
  includes: Record<Locale, string[]>;
};

export const pillars: PillarId[] = ["think", "create", "grow"];

// Copy follows the client's content brief (Oct 2026), tightened. Do not add numbers, client names or
// promises here: only what the company has approved.
export const services: Service[] = [
  // ── Think ──
  {
    id: "strategy",
    pillar: "think",
    title: { ar: "الاستراتيجية التسويقية", en: "Marketing strategy" },
    summary: {
      ar: "أين تقف علامتك، إلى أين تريد الوصول، وما الطريق بينهما.",
      en: "Where your brand stands, where it wants to go, and the road between.",
    },
    detail: {
      ar: "نبدأ من أهداف العمل لا من القنوات. نحدّد موقع علامتك وجمهورها، ثم نرسم اتجاهًا للرسائل والأولويات ومؤشرات الأداء، فتعرف ماذا سنفعل ولماذا.",
      en: "We start from business goals, not channels. We define your brand's position and audience, then set a direction for messages, priorities and performance indicators, so you know what we will do and why.",
    },
    includes: {
      ar: ["تحليل الوضع الحالي", "الجمهور والتموضع", "خطة القنوات", "أولويات التنفيذ والقياس"],
      en: ["Current-state analysis", "Audience and positioning", "Channel plan", "Execution and measurement priorities"],
    },
  },
  {
    id: "research",
    pillar: "think",
    title: { ar: "أبحاث السوق والمنافسين", en: "Market and competitor research" },
    summary: {
      ar: "ما يحتاجه جمهورك، ما يقدّمه السوق، وأين فرصتك بينهما.",
      en: "What your audience needs, what the market offers, and where your opening is.",
    },
    detail: {
      ar: "نقرأ كيف يتحدّث منافسوك، وما يسأل عنه عملاؤك قبل أن يقرّروا. ثم نحوّل القراءة إلى فرص عملية، حتى لا تكرّر ما يملأ السوق.",
      en: "We read how your competitors speak and what your customers ask before they decide. Then we turn that reading into practical openings, so you don't repeat what already fills the market.",
    },
    includes: {
      ar: ["تحليل المنافسين", "دراسة الجمهور", "مراجعة الرسائل والعروض", "فرص التميّز"],
      en: ["Competitor analysis", "Audience study", "Message and offer review", "Opportunities to stand apart"],
    },
  },
  {
    id: "planning",
    pillar: "think",
    title: { ar: "تخطيط الحملات", en: "Campaign planning" },
    summary: {
      ar: "فكرة، رسالة، قناة، وتوقيت. ولكل حملة هدف يُقاس.",
      en: "An idea, a message, a channel and a moment. And a measurable goal for every campaign.",
    },
    detail: {
      ar: "نرسم مسار الحملة من هدفها إلى الخطوة المطلوبة من العميل: الفكرة والجمهور والمحتوى والقنوات والميزانية، مع طريقة متّفق عليها لمتابعة الأداء.",
      en: "We map the campaign from its goal to the step we want the customer to take: idea, audience, content, channels and budget, with an agreed way to follow performance.",
    },
    includes: {
      ar: ["الفكرة الرئيسية", "رحلة العميل", "خطة المحتوى والقنوات", "الميزانية ومؤشرات الأداء"],
      en: ["Core idea", "Customer journey", "Content and channel plan", "Budget and performance indicators"],
    },
  },

  // ── Create ──
  {
    id: "identity",
    pillar: "create",
    title: { ar: "الهوية البصرية", en: "Visual identity" },
    summary: {
      ar: "ملامح ثابتة ترافق علامتك في كل ظهور.",
      en: "Consistent features that go with your brand everywhere it appears.",
    },
    detail: {
      ar: "نحوّل شخصية العلامة إلى نظام بصري يعمل في كل مكان: شعار وألوان وخطوط وعناصر مساندة، ودليل يشرح كيف تُستخدم معًا.",
      en: "We turn the brand's character into a visual system that works everywhere: logo, colours, type and supporting elements, with a guide that explains how they are used together.",
    },
    includes: {
      ar: ["تصميم الشعار أو تطويره", "النظام البصري", "التطبيقات الأساسية", "دليل الهوية"],
      en: ["Logo design or refinement", "Visual system", "Core applications", "Identity guide"],
    },
  },
  {
    id: "design",
    pillar: "create",
    title: { ar: "التصميم الجرافيكي", en: "Graphic design" },
    summary: {
      ar: "لكل رسالة شكلها، ولكل منصة مقاسها.",
      en: "A form for every message, a format for every platform.",
    },
    detail: {
      ar: "نبدأ بالرسالة ومكان ظهورها، ثم نختار التكوين الذي يخدمها. محتوى المنصات والإعلانات والمواد التعريفية والمطبوعات، بطابع واحد لا يتبدّل.",
      en: "We start with the message and where it will appear, then choose the composition that serves it. Social content, ads, company materials and print, in one consistent character.",
    },
    includes: {
      ar: ["تصاميم التواصل الاجتماعي", "المواد الإعلانية", "الملفات التعريفية", "المطبوعات"],
      en: ["Social media designs", "Advertising materials", "Company profiles", "Print"],
    },
  },
  {
    id: "video",
    pillar: "create",
    title: { ar: "الفيديو والموشن جرافيك", en: "Video and motion graphics" },
    summary: {
      ar: "رسالتك قصةً تُشاهَد حتى آخرها.",
      en: "Your message as a story people watch to the end.",
    },
    detail: {
      ar: "نبحث عن الزاوية التي تجعل الفكرة جديرة بالمشاهدة، ونبني عليها النص والمشاهد والإيقاع. تصوير ومونتاج وموشن، بما يناسب المنصة وجمهورها.",
      en: "We look for the angle that makes the idea worth watching, and build the script, scenes and rhythm on it. Shooting, editing and motion, suited to the platform and its audience.",
    },
    includes: {
      ar: ["الفكرة والسيناريو", "التخطيط البصري", "التصوير بحسب نطاق المشروع", "المونتاج والموشن ونسخ المنصات"],
      en: ["Idea and script", "Visual planning", "Shooting, as the project scope requires", "Editing, motion and platform versions"],
    },
  },
  {
    id: "real-estate-video",
    pillar: "create",
    title: { ar: "الإنتاج البصري العقاري وثلاثي الأبعاد", en: "Real estate visuals and 3D" },
    summary: {
      ar: "أفلام ومشاهد وجولات تجعل المكان يُرى قبل زيارته.",
      en: "Films, scenes and tours that let people see the place before they visit.",
    },
    detail: {
      ar: "نساعد جمهورك على رؤية المشروع وفهم مساحاته. أفلام ومشاهد ثلاثية الأبعاد وجولات تفاعلية تناسب مرحلة المشروع، بالتنسيق مع فريقه الميداني.",
      en: "We help your audience see the project and understand its spaces. Films, 3D scenes and interactive tours suited to the project's stage, in coordination with its on-site team.",
    },
    includes: {
      ar: ["الأفلام العقارية", "التصوير الجوي", "التصوّر المعماري ثلاثي الأبعاد", "الجولات التفاعلية و Gaussian Splatting"],
      en: ["Real estate films", "Aerial filming", "3D architectural visualization", "Interactive tours and Gaussian Splatting"],
    },
  },
  {
    id: "content",
    pillar: "create",
    title: { ar: "كتابة المحتوى", en: "Content writing" },
    summary: {
      ar: "ما يستحق أن تقوله علامتك، بصوت يخصّها.",
      en: "What your brand should say, in a voice of its own.",
    },
    detail: {
      ar: "نحدّد ما تقوله علامتك وكيف تقوله. من العنوان القصير إلى صفحة الموقع والسيناريو، بمفردات يشعر العميل أنها تشبهه.",
      en: "We define what your brand says and how it says it. From a short headline to a web page and a script, in words the customer feels are close to them.",
    },
    includes: {
      ar: ["نبرة العلامة", "محتوى المواقع والمنصات", "النصوص الإعلانية", "سيناريوهات الفيديو", "العربية والإنجليزية"],
      en: ["Brand tone", "Website and platform content", "Ad copy", "Video scripts", "Arabic and English"],
    },
  },
  {
    id: "web",
    pillar: "create",
    title: { ar: "المواقع والتطبيقات", en: "Websites and apps" },
    summary: {
      ar: "تجربة رقمية تجعل التعامل مع مشروعك أسهل.",
      en: "A digital experience that makes dealing with your project easier.",
    },
    detail: {
      ar: "نحوّل احتياج مشروعك إلى تجربة يفهمها المستخدم ويتنقّل فيها ويُتمّ خطوته بلا تعثّر. تصميم وتطوير معًا، والجوال والأداء في المقدمة.",
      en: "We turn what your project needs into an experience users understand, move through and complete without friction. Design and development together, with mobile and performance first.",
    },
    includes: {
      ar: ["تجربة المستخدم والواجهات", "مواقع الشركات والمتاجر وصفحات الهبوط", "التطبيقات والتكاملات بحسب النطاق"],
      en: ["User experience and interfaces", "Company sites, stores and landing pages", "Apps and integrations, as scope requires"],
    },
  },

  // ── Grow ──
  {
    id: "ads",
    pillar: "grow",
    title: { ar: "الحملات الإعلانية الرقمية", en: "Digital advertising campaigns" },
    summary: {
      ar: "نختبر الجمهور والرسالة، ونوجّه الميزانية إلى ما ينجح.",
      en: "We test the audience and the message, and move budget to what works.",
    },
    detail: {
      ar: "نبني الحملة على هدف محدّد، ونختبر الأفكار والمواد الإعلانية، ونراقب الإنفاق والنتائج. وننسّق مع فريقك لنعرف جودة الاستفسارات، لا عددها فقط.",
      en: "We build the campaign on a defined goal, test ideas and creatives, and watch spend and results. And we coordinate with your team to learn the quality of the leads, not only their number.",
    },
    includes: {
      ar: ["حملات Google وMeta وTikTok وSnapchat", "إعداد التتبّع", "اختبار المواد الإعلانية", "إعادة الاستهداف وتحسين الأداء"],
      en: ["Google, Meta, TikTok and Snapchat campaigns", "Tracking setup", "Creative testing", "Retargeting and optimisation"],
    },
  },
  {
    id: "social",
    pillar: "grow",
    title: { ar: "إدارة منصات التواصل", en: "Social media management" },
    summary: {
      ar: "حضور يومي يحافظ على صوت علامتك.",
      en: "A daily presence that keeps your brand's voice.",
    },
    detail: {
      ar: "خطة تعكس أهداف العلامة ومواسمها وجمهورها، ودورة محتوى ندير كل مراحلها: الفكرة، النشر، ثم المتابعة.",
      en: "A plan that reflects the brand's goals, seasons and audience, and a content cycle we manage at every stage: idea, publishing, then follow-up.",
    },
    includes: {
      ar: ["التخطيط والتحرير", "تنسيق التصميم والفيديو", "الجدولة والنشر", "متابعة التفاعل والتقارير"],
      en: ["Planning and editing", "Design and video coordination", "Scheduling and publishing", "Engagement follow-up and reports"],
    },
  },
  {
    id: "seo",
    pillar: "grow",
    title: { ar: "تحسين محركات البحث", en: "Search engine optimisation" },
    summary: {
      ar: "موقعك أقرب إلى ما يبحث عنه عملاؤك.",
      en: "Your site, closer to what your customers search for.",
    },
    detail: {
      ar: "نبحث عمّا يكتبه عملاؤك للوصول إلى خدمة مثل خدمتك، ثم نطوّر المحتوى والصفحات والجوانب التقنية التي تؤثّر في الظهور.",
      en: "We find what your customers type to reach a service like yours, then develop the content, pages and technical aspects that affect visibility.",
    },
    includes: {
      ar: ["بحث الكلمات", "مراجعة الصفحات والمحتوى", "التحسين التقني", "متابعة الظهور والزيارات"],
      en: ["Keyword research", "Page and content review", "Technical optimisation", "Visibility and traffic follow-up"],
    },
  },
  {
    id: "analytics",
    pillar: "grow",
    title: { ar: "التحليلات والتقارير", en: "Analytics and reporting" },
    summary: {
      ar: "ما تحقّق، ما يحتاج تحسينًا، وما الخطوة التالية.",
      en: "What was achieved, what needs work, and what comes next.",
    },
    detail: {
      ar: "نجمع البيانات التي تساعد على القرار: من أين يأتي الجمهور، أين يتوقّف، وما الذي يتحوّل إلى طلب. قراءة مفهومة مع توصيات قابلة للتنفيذ.",
      en: "We gather the data that helps a decision: where the audience comes from, where it stops, and what turns into a request. A plain reading with recommendations you can act on.",
    },
    includes: {
      ar: ["تحديد مؤشرات الأداء", "مراجعة أدوات القياس", "تقارير دورية", "توصيات وخطوات تطوير"],
      en: ["Defining performance indicators", "Measurement tool review", "Regular reports", "Recommendations and next steps"],
    },
  },
];

export const servicesByPillar = (pillar: PillarId) => services.filter((s) => s.pillar === pillar);
