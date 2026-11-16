import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { ICONS, SITE_NAME, SITE_URL } from "@/lib/site";
import "../globals.css";

// One root layout per language, so <html lang> is right for every page.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "BPMN.GEN - Z popisu práce platná BPMN mapa",
  description: "Opíšte, ako práca prebieha, a získajte platnú BPMN mapu - bez učenia sa BPMN.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "sk_SK",
  },
  twitter: { card: "summary_large_image" },
  icons: ICONS,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk" className={fontVariables}>
      <body className="min-h-screen bg-app text-fg antialiased">{children}</body>
    </html>
  );
}
