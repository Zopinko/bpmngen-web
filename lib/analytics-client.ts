"use client";

import { type AnalyticsEventName } from "@/lib/analytics-events";

const SESSION_STORAGE_KEY = "bpmngen_session_id";

function getStoredSessionId(): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const stored = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return stored || undefined;
  } catch {
    return undefined;
  }
}

function getOrCreateSessionId(): string | undefined {
  const stored = getStoredSessionId();
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

    window.localStorage.setItem(SESSION_STORAGE_KEY, generated);
    return generated;
  } catch {
    return undefined;
  }
}

export function buildSignupUrlWithSid(signupUrl: string): string {
  const sessionId = getStoredSessionId();
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
