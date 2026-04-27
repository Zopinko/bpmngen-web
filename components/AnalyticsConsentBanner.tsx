"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  getAnalyticsConsentState,
  setAnalyticsConsentState,
  subscribeAnalyticsConsent,
} from "@/lib/analytics-consent";

type AnalyticsConsentBannerProps = {
  locale: "en" | "sk";
};

const COPY = {
  en: {
    message:
      "We use privacy-light analytics to understand which pages and calls-to-action work. Data stays in our own system and analytics stay off until you allow them.",
    accept: "Allow analytics",
    reject: "Reject",
    privacy: "Privacy",
  },
  sk: {
    message:
      "Používame jednoduchú analytiku na zistenie, ktoré stránky a výzvy fungujú. Dáta ostávajú v našom systéme a analytika je vypnutá, kým ju nepovolíte.",
    accept: "Povoliť analytiku",
    reject: "Odmietnuť",
    privacy: "Súkromie",
  },
} as const;

function getPrivacyHref(locale: "en" | "sk"): string {
  return locale === "sk" ? "/sk/privacy" : "/privacy";
}

export function AnalyticsConsentBanner({ locale }: AnalyticsConsentBannerProps) {
  const consentState = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsentState,
    () => "unknown",
  );

  if (consentState !== "unknown") {
    return null;
  }

  const copy = COPY[locale];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,9,11,0.96),rgba(24,24,27,0.96))] p-4 text-stone-100 shadow-[0_24px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between sm:p-5">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/72">
            {locale === "sk" ? "Nastavenie súkromia" : "Privacy settings"}
          </p>
          <p className="text-sm leading-6 text-stone-300">{copy.message}</p>
        </div>

        <div className="flex flex-col gap-2 sm:min-w-[15rem]">
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
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-stone-100 transition hover:bg-white/[0.08]"
          >
            {copy.reject}
          </button>
          <Link href={getPrivacyHref(locale)} className="text-center text-xs text-stone-400 transition hover:text-stone-200">
            {copy.privacy}
          </Link>
        </div>
      </div>
    </div>
  );
}
