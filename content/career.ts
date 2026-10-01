import type { Localized } from "./types";
export const career: {
  name: string;
  role: Localized;
  tags: Localized;
  note: Localized;
  period: Localized;
  start: string;
  overlap?: Localized;
  slug?: string;
}[] = [
  {
    name: "Aksara Wisata",
    role: {
      en: "Tour Planner & Digital Marketing Support",
      id: "Perencana Tur & Dukungan Digital Marketing",
    },
    tags: {
      en: "Tour planning · Marketing",
      id: "Perencanaan tur · Pemasaran",
    },
    note: {
      en: "Planning travel experiences and supporting their promotion.",
      id: "Merencanakan pengalaman perjalanan dan membantu promosinya.",
    },
    period: {
      en: "Mar 2022 – Jun 2023",
      id: "Mar 2022 – Jun 2023",
    },
    start: "2022-03",
  },
  {
    name: "Japantrips",
    role: {
      en: "Reservations Officer",
      id: "Petugas Reservasi",
    },
    tags: {
      en: "Reservations · Customer journey",
      id: "Reservasi · Perjalanan pelanggan",
    },
    note: {
      en: "Understanding what customers need before they book.",
      id: "Memahami kebutuhan pelanggan sebelum mereka memesan.",
    },
    period: {
      en: "Jun 2023 – Jan 2024",
      id: "Jun 2023 – Jan 2024",
    },
    start: "2023-06",
    overlap: {
      en: "Parallel responsibilities · Jul–Dec 2023",
      id: "Tanggung jawab paralel · Jul–Des 2023",
    },
  },
  {
    name: "Japantrips",
    role: {
      en: "Digital Marketing Intern",
      id: "Magang Digital Marketing",
    },
    tags: {
      en: "Content · Campaigns",
      id: "Konten · Campaign",
    },
    note: {
      en: "Travel product promotion, SEO / SEM, content and website support.",
      id: "Promosi produk perjalanan, SEO / SEM, konten, dan dukungan website.",
    },
    period: {
      en: "Jul 2023 – Dec 2023",
      id: "Jul 2023 – Des 2023",
    },
    start: "2023-07",
    overlap: {
      en: "Parallel responsibilities · Jul–Dec 2023",
      id: "Tanggung jawab paralel · Jul–Des 2023",
    },
  },
  {
    name: "Adventure Travel Group",
    role: {
      en: "Tour Operations Coordinator",
      id: "Koordinator Operasional Tur",
    },
    tags: {
      en: "Operations · Coordination",
      id: "Operasional · Koordinasi",
    },
    note: {
      en: "Connecting the travel plan with its day-to-day delivery.",
      id: "Menghubungkan rencana perjalanan dengan pelaksanaan sehari-hari.",
    },
    period: {
      en: "Dec 2023 – Jan 2024",
      id: "Des 2023 – Jan 2024",
    },
    start: "2023-12",
  },
  {
    name: "Vertex Pharmaceuticals",
    role: {
      en: "Copywriter & Data Analyst",
      id: "Penulis Teks & Analis Data",
    },
    tags: {
      en: "Copy · Data",
      id: "Penulisan teks · Data",
    },
    note: {
      en: "Working with words and data to communicate more clearly.",
      id: "Mengolah teks dan data agar informasi lebih mudah dipahami.",
    },
    period: {
      en: "Jan 2024 – Mar 2024",
      id: "Jan 2024 – Mar 2024",
    },
    start: "2024-01",
  },
  {
    name: "PT Japanect Consulting Indonesia",
    role: {
      en: "Digital Marketing Specialist & Tour Operations",
      id: "Spesialis Digital Marketing & Operasional Tur",
    },
    tags: {
      en: "Paid media · Search · Operations",
      id: "Iklan · Pencarian · Operasional",
    },
    note: {
      en: "Connecting acquisition with leads, bookings and tour operations.",
      id: "Menghubungkan akuisisi dengan calon pelanggan, pemesanan, dan operasional tur.",
    },
    period: {
      en: "Jan 2024 – Aug 2024",
      id: "Jan 2024 – Agu 2024",
    },
    slug: "japanect",
    start: "2024-01",
  },
  {
    name: "Kurnia Group",
    role: {
      en: "Digital Marketing & Web Specialist",
      id: "Spesialis Digital Marketing & Web",
    },
    tags: {
      en: "Meta Ads · Web · KOL",
      id: "Meta Ads · Web · KOL",
    },
    note: {
      en: "Building awareness and leads through campaign execution.",
      id: "Membangun awareness dan calon pelanggan melalui pelaksanaan campaign.",
    },
    period: {
      en: "Oct 2024 – Dec 2024",
      id: "Okt 2024 – Des 2024",
    },
    slug: "kurnia-group",
    start: "2024-10",
  },
  {
    name: "PT Jaya Utama Perkasa",
    role: {
      en: "Head of Digital Marketing & Website Development",
      id: "Kepala Digital Marketing & Pengembangan Website",
    },
    tags: {
      en: "Web · SEO / SEM · Marketing",
      id: "Web · SEO / SEM · Pemasaran",
    },
    note: {
      en: "Bringing website development and digital marketing into one role.",
      id: "Menyatukan pengembangan website dan digital marketing dalam satu peran.",
    },
    period: {
      en: "Jan 2025 – present",
      id: "Jan 2025 – sekarang",
    },
    slug: "jaya-utama-perkasa",
    start: "2025-01",
  },
  {
    name: "Ladela",
    role: {
      en: "Brand & Marketing Lead",
      id: "Penanggung Jawab Brand & Pemasaran",
    },
    tags: {
      en: "Brand · Content · E-commerce",
      id: "Brand · Konten · E-commerce",
    },
    note: {
      en: "Shaping brand and content across the customer journey.",
      id: "Mengarahkan brand dan konten sepanjang perjalanan pelanggan.",
    },
    period: {
      en: "Mar 2026 – present",
      id: "Mar 2026 – sekarang",
    },
    slug: "ladela",
    start: "2026-03",
  },
  {
    name: "Casadela Canggu",
    role: {
      en: "Digital Marketing & Brand Lead",
      id: "Penanggung Jawab Digital Marketing & Brand",
    },
    tags: {
      en: "Hospitality · Brand · Content",
      id: "Hospitality · Brand · Konten",
    },
    note: {
      en: "Connecting brand communication with the guest experience.",
      id: "Menghubungkan komunikasi brand dengan pengalaman tamu.",
    },
    period: {
      en: "Apr 2026 – present",
      id: "Apr 2026 – sekarang",
    },
    slug: "casadela",
    start: "2026-04",
  },
];
