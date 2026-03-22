import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bpmngen.com"),
  title: "BPMN.GEN - Process stories to valid BPMN maps",
  description: "Turn process stories into valid BPMN maps - without learning BPMN.",
  openGraph: {
    title: "BPMN.GEN - Process stories to valid BPMN maps",
    description: "Turn process stories into valid BPMN maps - without learning BPMN.",
    url: "/",
    siteName: "BPMN.GEN",
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "BPMN.GEN preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BPMN.GEN - Process stories to valid BPMN maps",
    description: "Turn process stories into valid BPMN maps - without learning BPMN.",
    images: ["/og.svg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 text-zinc-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
