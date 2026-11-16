import type { MetadataRoute } from "next";
import { SITE_URL, localizedPaths } from "@/lib/site";

const PAGES = [
  { enPath: "/", priority: 1 },
  { enPath: "/contact", priority: 0.5 },
  { enPath: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ enPath, priority }) => {
    const paths = localizedPaths(enPath);
    const languages = { en: `${SITE_URL}${paths.en}`, sk: `${SITE_URL}${paths.sk}` };
    return (["en", "sk"] as const).map((locale) => ({
      url: `${SITE_URL}${paths[locale]}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
