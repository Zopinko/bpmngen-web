"use client";

export const ANALYTICS_CONSENT_STORAGE_KEY = "bpmngen_analytics_consent";
export const ANALYTICS_SESSION_STORAGE_KEY = "bpmngen_session_id";
const ANALYTICS_CONSENT_EVENT = "bpmngen:analytics-consent-change";

export type AnalyticsConsentState = "granted" | "denied" | "unknown";

function readStorageValue(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorageValue(key: string, value: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage access should never break the app
  }
}

function removeStorageValue(key: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    // storage access should never break the app
  }
}

export function getAnalyticsConsentState(): AnalyticsConsentState {
  const stored = readStorageValue(ANALYTICS_CONSENT_STORAGE_KEY);
  if (stored === "granted" || stored === "denied") {
    return stored;
  }
  return "unknown";
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsentState() === "granted";
}

export function setAnalyticsConsentState(consent: Exclude<AnalyticsConsentState, "unknown">): void {
  writeStorageValue(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  if (consent === "denied") {
    removeAnalyticsSessionId();
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
  }
}

export function getAnalyticsSessionId(): string | undefined {
  const stored = readStorageValue(ANALYTICS_SESSION_STORAGE_KEY);
  return stored || undefined;
}

export function setAnalyticsSessionId(sessionId: string): void {
  writeStorageValue(ANALYTICS_SESSION_STORAGE_KEY, sessionId);
}

export function removeAnalyticsSessionId(): void {
  removeStorageValue(ANALYTICS_SESSION_STORAGE_KEY);
}

export function subscribeAnalyticsConsent(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === ANALYTICS_CONSENT_STORAGE_KEY) {
      onStoreChange();
    }
  };

  const handleCustomEvent = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(ANALYTICS_CONSENT_EVENT, handleCustomEvent);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleCustomEvent);
  };
}
