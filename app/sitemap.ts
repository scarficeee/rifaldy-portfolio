import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { origin } from "@/lib/metadata";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...projects.map((p) => `/work/${p.slug}/`)].flatMap((path) =>
    ["", "/id"].map((prefix) => ({
      url: origin + prefix + path,
      alternates: {
        languages: { en: origin + path, id: origin + "/id" + path },
      },
    })),
  );
}
