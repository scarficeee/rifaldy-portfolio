import type { Localized } from "./types";
export const toolGroups = [
  {
    id: "paid",
    label: {
      en: "Paid media",
      id: "Iklan berbayar",
    },
  },
  {
    id: "analytics",
    label: {
      en: "Analytics & tracking",
      id: "Analisis & pelacakan",
    },
  },
  {
    id: "search",
    label: {
      en: "SEO & search",
      id: "SEO & pencarian",
    },
  },
  {
    id: "social",
    label: {
      en: "Social / distribution",
      id: "Sosial / distribusi",
    },
  },
  {
    id: "email",
    label: {
      en: "Email / campaign",
      id: "Email / campaign",
    },
  },
  {
    id: "web",
    label: {
      en: "Web development",
      id: "Pengembangan web",
    },
  },
  {
    id: "cms",
    label: {
      en: "CMS / infrastructure",
      id: "CMS / infrastruktur",
    },
  },
  {
    id: "creative",
    label: {
      en: "Content / creative",
      id: "Konten / kreatif",
    },
  },
  {
    id: "workflow",
    label: {
      en: "AI / workflow",
      id: "AI / alur kerja",
    },
  },
];
export const stack: {
  name: string;
  icon: string;
  group: string;
  primary: boolean;
  note: Localized;
}[] = [
  {
    name: "Meta Ads Manager",
    icon: "meta",
    group: "paid",
    primary: true,
    note: {
      en: "Paid social, campaign testing and lead generation.",
      id: "Iklan sosial, pengujian campaign, dan akuisisi calon pelanggan.",
    },
  },
  {
    name: "Google Ads",
    icon: "googleads",
    group: "paid",
    primary: true,
    note: {
      en: "Search campaigns, lead acquisition and optimization.",
      id: "Campaign pencarian, akuisisi calon pelanggan, dan optimasi.",
    },
  },
  {
    name: "TikTok Ads",
    icon: "tiktok",
    group: "paid",
    primary: false,
    note: {
      en: "Paid distribution and creative testing.",
      id: "Distribusi berbayar dan pengujian materi kreatif.",
    },
  },
  {
    name: "Google Analytics 4",
    icon: "googleanalytics",
    group: "analytics",
    primary: true,
    note: {
      en: "Traffic, acquisition and performance measurement.",
      id: "Analisis traffic, akuisisi, dan pengukuran performa.",
    },
  },
  {
    name: "Google Tag Manager",
    icon: "googletagmanager",
    group: "analytics",
    primary: true,
    note: {
      en: "Organize tags, events and conversion tracking.",
      id: "Mengatur tag, peristiwa, dan pelacakan konversi.",
    },
  },
  {
    name: "Google Search Console",
    icon: "googlesearchconsole",
    group: "analytics",
    primary: true,
    note: {
      en: "Search visibility, queries and organic performance.",
      id: "Visibilitas pencarian, kueri, dan performa organik.",
    },
  },
  {
    name: "Google PageSpeed Insights",
    icon: "pagespeedinsights",
    group: "analytics",
    primary: false,
    note: {
      en: "Review loading speed and page experience.",
      id: "Meninjau kecepatan dan pengalaman halaman.",
    },
  },
  {
    name: "Ahrefs",
    icon: "ahrefs",
    group: "search",
    primary: true,
    note: {
      en: "Keyword research and search opportunities.",
      id: "Riset kata kunci dan peluang pencarian.",
    },
  },
  {
    name: "SEMrush",
    icon: "semrush",
    group: "search",
    primary: true,
    note: {
      en: "Search research and competitive context.",
      id: "Riset pencarian dan konteks persaingan.",
    },
  },
  {
    name: "Moz",
    icon: "moz",
    group: "search",
    primary: false,
    note: {
      en: "Search research and site review.",
      id: "Riset pencarian dan peninjauan situs.",
    },
  },
  {
    name: "Yoast SEO",
    icon: "yoast",
    group: "search",
    primary: false,
    note: {
      en: "On-page SEO and publishing checks.",
      id: "SEO halaman dan pengecekan sebelum publikasi.",
    },
  },
  {
    name: "Hootsuite",
    icon: "hootsuite",
    group: "social",
    primary: false,
    note: {
      en: "Content scheduling and social distribution.",
      id: "Penjadwalan konten dan distribusi media sosial.",
    },
  },
  {
    name: "Sprout Social",
    icon: "sproutsocial",
    group: "social",
    primary: false,
    note: {
      en: "Social publishing and performance review.",
      id: "Publikasi sosial dan peninjauan performa.",
    },
  },
  {
    name: "Mailchimp",
    icon: "mailchimp",
    group: "email",
    primary: false,
    note: {
      en: "Email campaigns and audience communication.",
      id: "Campaign email dan komunikasi audiens.",
    },
  },
  {
    name: "HTML",
    icon: "html5",
    group: "web",
    primary: true,
    note: {
      en: "Clear, accessible page structure.",
      id: "Struktur halaman yang jelas dan mudah diakses.",
    },
  },
  {
    name: "CSS",
    icon: "css",
    group: "web",
    primary: true,
    note: {
      en: "Responsive layouts and visual details.",
      id: "Tata letak responsif dan detail visual.",
    },
  },
  {
    name: "JavaScript",
    icon: "javascript",
    group: "web",
    primary: true,
    note: {
      en: "Useful interactions and page behavior.",
      id: "Interaksi dan perilaku halaman yang berguna.",
    },
  },
  {
    name: "Python",
    icon: "python",
    group: "web",
    primary: false,
    note: {
      en: "Prepare and analyze data.",
      id: "Menyiapkan dan menganalisis data.",
    },
  },
  {
    name: "Visual Studio Code",
    icon: "visualstudiocode",
    group: "web",
    primary: false,
    note: {
      en: "Build, edit and review website code.",
      id: "Membangun, menyunting, dan meninjau kode website.",
    },
  },
  {
    name: "GitHub",
    icon: "github",
    group: "web",
    primary: false,
    note: {
      en: "Version control and code collaboration.",
      id: "Kontrol versi dan kolaborasi kode.",
    },
  },
  {
    name: "WordPress",
    icon: "wordpress",
    group: "cms",
    primary: false,
    note: {
      en: "Manage site content and publishing.",
      id: "Mengelola konten situs dan publikasi.",
    },
  },
  {
    name: "Cloudflare",
    icon: "cloudflare",
    group: "cms",
    primary: false,
    note: {
      en: "Website delivery and infrastructure.",
      id: "Distribusi website dan infrastruktur.",
    },
  },
  {
    name: "Canva",
    icon: "canva",
    group: "creative",
    primary: true,
    note: {
      en: "Campaign visuals and everyday content.",
      id: "Visual campaign dan konten sehari-hari.",
    },
  },
  {
    name: "CapCut",
    icon: "capcut",
    group: "creative",
    primary: false,
    note: {
      en: "Practical video and creative editing.",
      id: "Editing video dan materi kreatif sesuai kebutuhan.",
    },
  },
  {
    name: "ChatGPT",
    icon: "openai",
    group: "workflow",
    primary: false,
    note: {
      en: "Support research, drafting and daily workflows.",
      id: "Membantu riset, penyusunan draf, dan pekerjaan sehari-hari.",
    },
  },
];
