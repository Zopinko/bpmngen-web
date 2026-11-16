import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { ICONS, SITE_NAME, SITE_URL } from "@/lib/site";
import "../globals.css";

// One root layout per language, so <html lang> is right for every page.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "BPMN.GEN - Process stories to valid BPMN maps",
  description: "Turn process stories into valid BPMN maps - without learning BPMN.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  icons: ICONS,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-screen bg-app text-fg antialiased">{children}</body>
    </html>
  );
}
