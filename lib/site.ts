import type { Metadata } from "next";

export const SITE_URL = "https://bpmngen.com";
export const SITE_NAME = "BPMN.GEN";

export type Locale = "en" | "sk";

/** English and Slovak URL of the same page, e.g. "/privacy" -> { en: "/privacy", sk: "/sk/privacy" }. */
export function localizedPaths(enPath: string): Record<Locale, string> {
  return { en: enPath, sk: enPath === "/" ? "/sk" : `/sk${enPath}` };
}

/** Canonical URL plus hreflang alternates, so search engines pair the EN and SK versions. */
export function localizedAlternates(enPath: string, locale: Locale): Metadata["alternates"] {
  const paths = localizedPaths(enPath);
  return {
    canonical: paths[locale],
    languages: { en: paths.en, sk: paths.sk, "x-default": paths.en },
  };
}

export const ICONS: Metadata["icons"] = {
  icon: [
    { url: "/icon.png", type: "image/png" },
    { url: "/icon.svg", type: "image/svg+xml" },
  ],
  shortcut: [{ url: "/favicon.ico" }],
  apple: [{ url: "/icon.png" }],
};

/** Per-page metadata: title, description, canonical + hreflang, and Open Graph text. */
export function pageMetadata({
  locale,
  enPath,
  title,
  description,
}: {
  locale: Locale;
  enPath: string;
  title: string;
  description: string;
}): Metadata {
  const url = localizedPaths(enPath)[locale];
  const ogImage = `/og-image/${locale}`;
  return {
    title,
    description,
    alternates: localizedAlternates(enPath, locale),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "sk" ? "sk_SK" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
