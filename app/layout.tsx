import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Same typefaces as the app. next/font self-hosts them, so the CSP (font-src 'self') holds.
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-app text-fg antialiased">{children}</body>
    </html>
  );
}

