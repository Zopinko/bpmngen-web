"use client";

import { useEffect, useRef } from "react";
import { TrackEventLink } from "@/components/TrackEventLink";
import { trackEvent } from "@/lib/analytics-client";
import { type HomePageContent } from "@/content/home/types";

const DEMO_URL = "https://app.bpmngen.com/demo";

type DemoSectionProps = {
  locale: HomePageContent["locale"];
  content: HomePageContent["demo"];
  trackingPath: string;
  fullscreenTrackingPath: string;
};

export function DemoSection({ locale, content, trackingPath, fullscreenTrackingPath }: DemoSectionProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const demoUrl = `${DEMO_URL}?lang=${locale}`;

  // The iframe is cross-origin, so clicks inside it are invisible to us. When the visitor
  // starts using the demo, focus moves into the iframe and our window blurs; that is the
  // signal we count as "demo opened" (once per page view).
  useEffect(() => {
    let tracked = false;
    const handleBlur = () => {
      if (tracked) return;
      window.setTimeout(() => {
        if (document.activeElement === frameRef.current) {
          tracked = true;
          void trackEvent("demo_opened", trackingPath);
        }
      }, 0);
    };
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [trackingPath]);

  return (
    <section
      id="demo"
      className="rounded-[2rem] border border-amber-100/8 bg-[linear-gradient(180deg,#0c0a09_0%,#111827_100%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-12"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/72">{content.eyebrow}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-4xl">{content.title}</h2>
          <p className="max-w-2xl text-sm leading-7 text-stone-300/78 sm:text-base">{content.text}</p>
        </div>
        <TrackEventLink
          href={demoUrl}
          target="_blank"
          rel="noopener"
          events={[
            { eventName: "demo_opened" },
            { eventName: "link_click", path: fullscreenTrackingPath },
          ]}
          className="hidden shrink-0 items-center rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm font-medium text-stone-100 transition hover:bg-white/[0.08] lg:inline-flex"
        >
          {content.openFullscreen} ↗
        </TrackEventLink>
      </div>

      {/* Desktop: the real app demo, embedded. */}
      <div className="mt-8 hidden overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40 shadow-[0_30px_70px_rgba(0,0,0,0.44)] lg:block">
        <iframe
          ref={frameRef}
          src={demoUrl}
          title={content.frameTitle}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
          className="block h-[760px] w-full"
        />
      </div>

      {/* Mobile and tablet: the canvas needs room, so open it in a new tab instead. */}
      <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5 lg:hidden">
        <p className="text-sm leading-6 text-stone-300/80">{content.mobileNote}</p>
        <TrackEventLink
          href={demoUrl}
          target="_blank"
          rel="noopener"
          events={[
            { eventName: "demo_opened" },
            { eventName: "link_click", path: fullscreenTrackingPath },
          ]}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(180deg,#fbbf24_0%,#d97706_100%)] px-6 py-3 text-sm font-semibold text-stone-950 transition hover:brightness-110"
        >
          {content.mobileCta}
        </TrackEventLink>
      </div>
    </section>
  );
}
