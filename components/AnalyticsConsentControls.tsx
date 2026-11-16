"use client";

import { useSyncExternalStore } from "react";
import {
  getAnalyticsConsentState,
  setAnalyticsConsentState,
  subscribeAnalyticsConsent,
} from "@/lib/analytics-consent";

type AnalyticsConsentControlsProps = {
  locale: "en" | "sk";
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
    title: "Súhlas s analytikou",
    unknown: "Zatiaľ nerozhodnuté",
    granted: "Povolené",
    denied: "Odmietnuté",
    description:
      "Vlastnú analytiku môžete kedykoľvek povoliť alebo odmietnuť. Pri odmietnutí sa odstráni aj uložený identifikátor relácie v prehliadači.",
    accept: "Povoliť analytiku",
    reject: "Odmietnuť analytiku",
  },
} as const;

export function AnalyticsConsentControls({
  locale,
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

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[13.5px] font-semibold text-fg">{copy.title}</p>
        <span className="rounded-md border border-line-strong bg-raised px-2 py-0.5 text-[12px] font-medium text-fg-2">
          {consentLabel}
        </span>
      </div>
      <p className="text-[13.5px] leading-6 text-fg-2">{copy.description}</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => {
            setAnalyticsConsentState("granted");
          }}
          className="btn btn-primary"
        >
          {copy.accept}
        </button>
        <button
          type="button"
          onClick={() => {
            setAnalyticsConsentState("denied");
          }}
          className="btn"
        >
          {copy.reject}
        </button>
      </div>
    </div>
  );
}
