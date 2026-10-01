import type { Metadata } from "next";
import type { Locale, Project } from "@/content/types";
import { text, localPath } from "@/content/copy";
export const origin = "https://rifaldy-rizqya-portfolio.rifaldy.chatgpt.site";
export function metadata(locale: Locale, project?: Project): Metadata {
  const t = text(locale),
    path = project ? `/work/${project.slug}/` : "/",
    url = origin + localPath(locale, path);
  const title = project ? `${project.company} — Rifaldy Rizqya` : t.metaTitle;
  const description = project ? project.summary[locale] : t.metaDescription;
  return {
    title,
    description,
    metadataBase: new URL(origin),
    alternates: {
      canonical: url,
      languages: {
        en: origin + path,
        id: origin + "/id" + path,
        "x-default": origin + path,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Rifaldy Rizqya",
      locale: locale === "en" ? "en_US" : "id_ID",
      alternateLocale: locale === "en" ? "id_ID" : "en_US",
      type: "website",
      images: [
        {
          url: "/social-cover.jpg",
          width: 1200,
          height: 630,
          alt: "Growth, by design. — Rifaldy Rizqya",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/social-cover.jpg"],
    },
    icons: { icon: "/favicon.svg" },
  };
}
