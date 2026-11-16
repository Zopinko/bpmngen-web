import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import { ICONS } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | BPMN.GEN",
  description: "This page does not exist.",
  icons: ICONS,
};

// Rendered for any URL that matches no route. It cannot know the visitor's language, so it
// speaks both.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-screen bg-app text-fg antialiased">
        <main className="canvas-dots flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-md rounded-xl border border-line-strong bg-panel p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
            <Link href="/" className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.02em] text-fg">
              <span className="brand-mark" aria-hidden="true" />
              BPMN.Gen
            </Link>
            <p className="mt-8 font-mono text-[13px] text-fg-3">404</p>
            <h1 className="mt-2 text-[22px] font-semibold tracking-[-0.02em]">This page does not exist.</h1>
            <p lang="sk" className="mt-1 text-[15px] text-fg-2">
              Táto stránka neexistuje.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
              <Link href="/" className="btn btn-primary">
                Home
              </Link>
              <a href="/sk" lang="sk" className="btn">
                Hlavná stránka
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
