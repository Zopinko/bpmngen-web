import { Inter, JetBrains_Mono } from "next/font/google";

// Same typefaces as the app. next/font self-hosts them, so the CSP (font-src 'self') holds.
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const fontVariables = `${inter.variable} ${jetbrainsMono.variable}`;
