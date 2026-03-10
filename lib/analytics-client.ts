"use client";

import { type AnalyticsEventName } from "@/lib/analytics-events";

const SESSION_STORAGE_KEY = "bpmngen_session_id";

function getOrCreateSessionId(): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const stored = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      return stored;
    }

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

export async function trackEvent(eventName: AnalyticsEventName, path?: string): Promise<void> {
  try {
    const resolvedPath =
      path ?? (typeof window !== "undefined" ? window.location.pathname : "/");
    const sessionId = getOrCreateSessionId();

    await fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name: eventName,
        path: resolvedPath,
        session_id: sessionId,
      }),
      keepalive: true,
    });
  } catch {
    // tracking must never break user flow
  }
}
