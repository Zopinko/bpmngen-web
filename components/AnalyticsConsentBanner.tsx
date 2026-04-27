"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { AnalyticsConsentControls } from "@/components/AnalyticsConsentControls";
import { getAnalyticsConsentState, subscribeAnalyticsConsent } from "@/lib/analytics-consent";

type AnalyticsConsentBannerProps = {
  locale: "en" | "sk";
};

function subscribeNoop(): () => void {
  return () => undefined;
}

const COPY = {
  en: {
    message:
      "We use privacy-light analytics to understand which pages and calls-to-action work. Data stays in our own system and analytics stay off until you allow them.",
    privacy: "Privacy",
    settings: "Privacy settings",
    close: "Close",
    panelText: "You can change or withdraw analytics consent here at any time.",
  },
  sk: {
    message:
      "Pouzivame jednoduchu analytiku na zistenie, ktore stranky a vyzvy funguju. Data ostavaju v nasom systeme a analytika je vypnuta, kym ju nepovolite.",
    privacy: "Sukromie",
    settings: "Nastavenie sukromia",
    close: "Zavriet",
    panelText: "Tu mozete kedykolvek zmenit alebo odvolat svoj suhlas s analytikou.",
  },
} as const;

function getPrivacyHref(locale: "en" | "sk"): string {
  return locale === "sk" ? "/sk/privacy" : "/privacy";
}

export function AnalyticsConsentBanner({ locale }: AnalyticsConsentBannerProps) {
  const isMounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const consentState = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsentState,
    () => "unknown",
  );

  const resolvedConsentState = isMounted ? consentState : "unknown";
  const copy = COPY[locale];

  return (
    <>
      {resolvedConsentState === "unknown" ? (
        <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,9,11,0.96),rgba(24,24,27,0.96))] p-4 text-stone-100 shadow-[0_24px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between sm:p-5">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/72">
                {copy.settings}
              </p>
              <p className="text-sm leading-6 text-stone-300">{copy.message}</p>
            </div>

            <div className="flex flex-col gap-2 sm:min-w-[18rem]">
              <AnalyticsConsentControls locale={locale} />
              <Link href={getPrivacyHref(locale)} className="text-center text-xs text-stone-400 transition hover:text-stone-200">
                {copy.privacy}
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6">
        <button
          type="button"
          onClick={() => {
            setSettingsOpen((current) => !current);
          }}
          className="inline-flex items-center rounded-full border border-zinc-200 bg-white/95 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-[0_12px_32px_rgba(0,0,0,0.14)] backdrop-blur transition hover:bg-white"
        >
          {copy.settings}
        </button>
      </div>

      {settingsOpen ? (
        <div className="fixed bottom-20 left-4 z-50 w-[min(28rem,calc(100vw-2rem))] sm:bottom-24 sm:left-6">
          <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-4 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-zinc-950">{copy.settings}</p>
                <p className="mt-1 text-xs leading-5 text-zinc-600">{copy.panelText}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                }}
                className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                {copy.close}
              </button>
            </div>

            <AnalyticsConsentControls locale={locale} tone="light" />
            <div className="mt-3">
              <Link href={getPrivacyHref(locale)} className="text-xs text-zinc-600 transition hover:text-zinc-900">
                {copy.privacy}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
