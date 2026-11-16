import { notFound } from "next/navigation";
import { renderOgImage } from "@/lib/og-image";

// Share image per language, rendered once at build time: /og-image/en and /og-image/sk.
export const dynamic = "force-static";

const TEXT = {
  en: {
    title: "Document how work actually happens - without learning BPMN.",
    tagline: "Describe the process. Get a valid BPMN map.",
    steps: ["Submit request", "Review request", "Notify requester"],
  },
  sk: {
    title: "Zdokumentujte, ako práca naozaj prebieha - bez učenia sa BPMN.",
    tagline: "Opíšte proces. Získajte platnú BPMN mapu.",
    steps: ["Podať žiadosť", "Posúdiť žiadosť", "Oznámiť výsledok"],
  },
} as const;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "sk" }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "sk") notFound();
  const text = TEXT[locale];
  return renderOgImage({ title: text.title, tagline: text.tagline, steps: [...text.steps] });
}
