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
      "Používame jednoduchú analytiku, aby sme vedeli, ktoré stránky a výzvy fungujú. Dáta ostávajú v našom systéme a analytika je vypnutá, kým ju nepovolíte.",
    privacy: "Súkromie",
    settings: "Nastavenie súkromia",
    close: "Zavrieť",
    panelText: "Tu môžete kedykoľvek zmeniť alebo odvolať svoj súhlas s analytikou.",
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
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-xl border border-line-strong bg-panel/95 p-4 text-fg shadow-[0_12px_32px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between sm:p-5">
            <div className="max-w-3xl space-y-2">
              <p className="eyebrow">{copy.settings}</p>
              <p className="text-[13.5px] leading-6 text-fg-2">{copy.message}</p>
            </div>

            <div className="flex flex-col gap-2 sm:min-w-[18rem]">
              <AnalyticsConsentControls locale={locale} />
              <Link href={getPrivacyHref(locale)} className="text-center text-[12px] text-fg-3 transition hover:text-fg">
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
          className="btn btn-sm shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        >
          {copy.settings}
        </button>
      </div>

      {settingsOpen ? (
        <div className="fixed bottom-20 left-4 z-50 w-[min(28rem,calc(100vw-2rem))] sm:bottom-24 sm:left-6">
          <div className="rounded-xl border border-line-strong bg-panel p-4 shadow-[0_12px_32px_rgba(0,0,0,0.55)]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[13.5px] font-semibold text-fg">{copy.settings}</p>
                <p className="mt-1 text-[12.5px] leading-5 text-fg-3">{copy.panelText}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                }}
                className="btn btn-sm"
              >
                {copy.close}
              </button>
            </div>

            <AnalyticsConsentControls locale={locale} />
            <div className="mt-3">
              <Link href={getPrivacyHref(locale)} className="text-[12px] text-fg-3 transition hover:text-fg">
                {copy.privacy}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
