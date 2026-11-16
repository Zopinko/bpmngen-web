"use client";

import { useEffect, useRef } from "react";
import { TrackEventLink } from "@/components/TrackEventLink";
import { getSharableAnalyticsSessionId, trackEvent } from "@/lib/analytics-client";
import { subscribeAnalyticsConsent } from "@/lib/analytics-consent";
import { type HomePageContent } from "@/content/home/types";

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN || "https://app.bpmngen.com";
const DEMO_URL = `${APP_ORIGIN}/demo`;

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

  // The embedded demo asks for our analytics session id ("ready") and then sends its
  // milestones (started / completed / signup clicked) straight to our analytics API with it.
  // It only gets an id when the visitor allowed analytics, and null again if they revoke it.
  useEffect(() => {
    const sendSession = () => {
      frameRef.current?.contentWindow?.postMessage(
        { source: "bpmngen-web", type: "session", sid: getSharableAnalyticsSessionId() ?? null },
        APP_ORIGIN,
      );
    };
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== APP_ORIGIN || event.source !== frameRef.current?.contentWindow) return;
      const data = event.data as { source?: unknown; type?: unknown } | null;
      if (data?.source === "bpmngen-demo" && data.type === "ready") {
        sendSession();
      }
    };
    window.addEventListener("message", handleMessage);
    const unsubscribe = subscribeAnalyticsConsent(sendSession);
    return () => {
      window.removeEventListener("message", handleMessage);
      unsubscribe();
    };
  }, []);

  return (
    <section id="demo" className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] text-fg sm:text-[34px]">{content.title}</h2>
            <p className="text-[15px] leading-7 text-fg-2">{content.text}</p>
          </div>
          <TrackEventLink
            href={demoUrl}
            appendSessionIdToSignup
            target="_blank"
            rel="noopener"
            events={[
              { eventName: "demo_opened" },
              { eventName: "link_click", path: fullscreenTrackingPath },
            ]}
            className="btn hidden shrink-0 lg:inline-flex"
          >
            {content.openFullscreen}
            <span aria-hidden="true">↗</span>
          </TrackEventLink>
        </div>

        {/* Desktop: the real app demo, embedded. */}
        <div className="mt-10 hidden overflow-hidden rounded-xl border border-line-strong bg-panel shadow-[0_24px_60px_rgba(0,0,0,0.55)] lg:block">
          <div className="flex h-9 items-center gap-2 border-b border-line px-3.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-hover" />
            <span className="h-2.5 w-2.5 rounded-full bg-hover" />
            <span className="h-2.5 w-2.5 rounded-full bg-hover" />
            <span className="ml-3 rounded-md bg-input px-2.5 py-0.5 font-mono text-[11.5px] text-fg-3">app.bpmngen.com/demo</span>
          </div>
          <iframe
            ref={frameRef}
            src={demoUrl}
            title={content.frameTitle}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-top-navigation-by-user-activation"
            className="block h-[760px] w-full bg-app"
          />
        </div>

        {/* Mobile and tablet: the canvas needs room, so open it in a new tab instead. */}
        <div className="mt-8 rounded-xl border border-line bg-card p-5 lg:hidden">
          <p className="text-[14px] leading-6 text-fg-2">{content.mobileNote}</p>
          <TrackEventLink
            href={demoUrl}
            appendSessionIdToSignup
            target="_blank"
            rel="noopener"
            events={[
              { eventName: "demo_opened" },
              { eventName: "link_click", path: fullscreenTrackingPath },
            ]}
            className="btn btn-primary btn-lg mt-4 w-full"
          >
            {content.mobileCta}
          </TrackEventLink>
        </div>
      </div>
    </section>
  );
}
