"use client";

import { useSyncExternalStore } from "react";
import {
  getAnalyticsConsentState,
  setAnalyticsConsentState,
  subscribeAnalyticsConsent,
} from "@/lib/analytics-consent";

type AnalyticsConsentControlsProps = {
  locale: "en" | "sk";
  tone?: "dark" | "light";
};

function subscribeNoop(): () => void {
  return () => undefined;
}

const COPY = {
  en: {
    title: "Analytics consent",
    unknown: "Not decided yet",
    granted: "Allowed",
    denied: "Rejected",
    description:
      "You can allow or reject first-party analytics at any time. Rejecting also removes the stored browser session identifier.",
    accept: "Allow analytics",
    reject: "Reject analytics",
  },
  sk: {
    title: "Suhlas s analytikou",
    unknown: "Zatial nerozhodnute",
    granted: "Povolene",
    denied: "Odmietnute",
    description:
      "First-party analytiku mozete kedykolvek povolit alebo odmietnut. Pri odmietnuti sa odstrani aj ulozeny identifikator relacie v prehliadaci.",
    accept: "Povolit analytiku",
    reject: "Odmietnut analytiku",
  },
} as const;

export function AnalyticsConsentControls({
  locale,
  tone = "dark",
}: AnalyticsConsentControlsProps) {
  const isMounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const consentState = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsentState,
    () => "unknown",
  );
  const copy = COPY[locale];
  const resolvedConsentState = isMounted ? consentState : "unknown";
  const consentLabel =
    resolvedConsentState === "granted"
      ? copy.granted
      : resolvedConsentState === "denied"
        ? copy.denied
        : copy.unknown;

  const isLight = tone === "light";
  const badgeClasses = isLight
    ? "bg-zinc-100 text-zinc-700 border border-zinc-200"
    : "bg-white/[0.06] text-stone-200 border border-white/10";
  const secondaryButtonClasses = isLight
    ? "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-100"
    : "border border-white/12 bg-white/[0.05] text-stone-100 hover:bg-white/[0.08]";
  const descriptionClasses = isLight ? "text-zinc-600" : "text-stone-300";
  const titleClasses = isLight ? "text-zinc-950" : "text-stone-50";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className={`text-sm font-semibold ${titleClasses}`}>{copy.title}</p>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeClasses}`}>
          {consentLabel}
        </span>
      </div>
      <p className={`text-sm leading-6 ${descriptionClasses}`}>{copy.description}</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => {
            setAnalyticsConsentState("granted");
          }}
          className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(180deg,#fbbf24_0%,#d97706_100%)] px-4 py-2.5 text-sm font-semibold text-stone-950 transition hover:brightness-110"
        >
          {copy.accept}
        </button>
        <button
          type="button"
          onClick={() => {
            setAnalyticsConsentState("denied");
          }}
          className={`inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition ${secondaryButtonClasses}`}
        >
          {copy.reject}
        </button>
      </div>
    </div>
  );
}
