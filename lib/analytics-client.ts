"use client";

import { type AnalyticsEventName } from "@/lib/analytics-events";
import {
  getAnalyticsSessionId,
  hasAnalyticsConsent,
  setAnalyticsSessionId,
} from "@/lib/analytics-consent";

function getOrCreateSessionId(): string | undefined {
  if (!hasAnalyticsConsent()) {
    return undefined;
  }

  const stored = getAnalyticsSessionId();
  if (stored) {
    return stored;
  }

  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const generated =
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setAnalyticsSessionId(generated);
    return generated;
  } catch {
    return undefined;
  }
}

export function buildSignupUrlWithSid(signupUrl: string, createIfMissing = false): string {
  if (!hasAnalyticsConsent()) {
    return signupUrl;
  }

  const sessionId = createIfMissing ? getOrCreateSessionId() : getAnalyticsSessionId();
  if (!sessionId) {
    return signupUrl;
  }

  try {
    const url = new URL(signupUrl, window.location.origin);
    if (!url.searchParams.has("sid")) {
      url.searchParams.set("sid", sessionId);
    }
    return url.toString();
  } catch {
    return signupUrl;
  }
}

function buildTrackPayload(eventName: AnalyticsEventName, path?: string): string {
  const resolvedPath =
    path ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const sessionId = getOrCreateSessionId();

  return JSON.stringify({
    event_name: eventName,
    path: resolvedPath,
    session_id: sessionId,
  });
}

export async function trackEvent(eventName: AnalyticsEventName, path?: string): Promise<void> {
  if (!hasAnalyticsConsent()) {
    return;
  }

  try {
    const payload = buildTrackPayload(eventName, path);

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const sent = navigator.sendBeacon(
        "/api/analytics/track",
        new Blob([payload], { type: "application/json" }),
      );
      if (sent) {
        return;
      }
    }

    await fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
      keepalive: true,
    });
  } catch {
    // tracking must never break user flow
  }
}
