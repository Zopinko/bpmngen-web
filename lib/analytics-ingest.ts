import { type AnalyticsEventName, isAllowedAnalyticsEvent } from "@/lib/analytics-events";
import { getClientIp } from "@/lib/client-ip";

const MAX_PATH_LENGTH = 2048;
const MAX_SESSION_ID_LENGTH = 128;
const MAX_REFERRER_LENGTH = 2048;
const MAX_USER_AGENT_LENGTH = 512;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 120;
const RATE_LIMIT_MAX_GLOBAL_REQUESTS = 2_000;
const GLOBAL_RATE_LIMIT_KEY = "__global__";

type TrackPayload = {
  event_name?: unknown;
  path?: unknown;
  session_id?: unknown;
  referrer?: unknown;
  user_agent?: unknown;
};

type ValidTrackPayload = {
  eventName: AnalyticsEventName;
  path: string;
  sessionId?: string;
  referrer?: string;
  userAgent?: string;
};

type RateLimitRecord = {
  count: number;
  expiresAt: number;
};

type AnalyticsRateLimitGlobal = typeof globalThis & {
  __analyticsRateLimitStore?: Map<string, RateLimitRecord>;
};

function normalizeOptionalString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) {
    return undefined;
  }

  return normalized;
}

export function validateTrackPayload(payload: TrackPayload): ValidTrackPayload | null {
  if (typeof payload.event_name !== "string" || !isAllowedAnalyticsEvent(payload.event_name)) {
    return null;
  }

  if (typeof payload.path !== "string") {
    return null;
  }

  const normalizedPath = payload.path.trim();
  if (!normalizedPath || normalizedPath.length > MAX_PATH_LENGTH) {
    return null;
  }

  const sessionId = normalizeOptionalString(payload.session_id, MAX_SESSION_ID_LENGTH);
  if (payload.session_id !== undefined && !sessionId) {
    return null;
  }

  return {
    eventName: payload.event_name,
    path: normalizedPath,
    sessionId,
    referrer: normalizeOptionalString(payload.referrer, MAX_REFERRER_LENGTH),
    userAgent: normalizeOptionalString(payload.user_agent, MAX_USER_AGENT_LENGTH),
  };
}

function parseUrl(value: string | null): URL | null {
  if (!value) {
    return null;
  }

  try {
    return new URL(value);
  } catch {
    return null;
  }
}

const DEFAULT_ALLOWED_ORIGINS = ["https://bpmngen.com", "https://www.bpmngen.com"];
const DEV_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"];

// The app sends demo milestones and signup_completed straight to this API (cross-origin).
// It only does so when the visitor carries a session id from this site, i.e. after consent.
const APP_ORIGINS = ["https://app.bpmngen.com"];
const DEV_APP_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"];

function getAllowedOrigins(): Set<string> {
  const configured = (process.env.ANALYTICS_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => parseUrl(value.trim())?.origin)
    .filter((value): value is string => Boolean(value));

  const origins = new Set(configured.length > 0 ? configured : DEFAULT_ALLOWED_ORIGINS);
  for (const origin of getAppOrigins()) {
    origins.add(origin);
  }
  if (process.env.NODE_ENV !== "production") {
    for (const origin of DEV_ALLOWED_ORIGINS) {
      origins.add(origin);
    }
  }
  return origins;
}

function getAppOrigins(): string[] {
  return process.env.NODE_ENV !== "production" ? [...APP_ORIGINS, ...DEV_APP_ORIGINS] : APP_ORIGINS;
}

/** CORS headers for the app's cross-origin requests; empty for anything else. */
export function getAnalyticsCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  if (!origin || !getAppOrigins().includes(origin)) {
    return {};
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

/**
 * Accepts only requests whose Origin (or, failing that, Referer) is one of our own
 * site origins. Requests without either header are rejected. This keeps other
 * websites from posting events through visitors' browsers; it cannot stop a
 * scripted client that forges headers, which is what the rate limits are for.
 */
export function isTrustedAnalyticsRequest(request: Request): boolean {
  const allowedOrigins = getAllowedOrigins();

  const originHeader = request.headers.get("origin");
  if (originHeader) {
    const origin = parseUrl(originHeader);
    return origin !== null && allowedOrigins.has(origin.origin);
  }

  const referer = parseUrl(request.headers.get("referer"));
  return referer !== null && allowedOrigins.has(referer.origin);
}

function getRateLimitStore(): Map<string, RateLimitRecord> {
  const globalForRateLimit = globalThis as AnalyticsRateLimitGlobal;
  if (!globalForRateLimit.__analyticsRateLimitStore) {
    globalForRateLimit.__analyticsRateLimitStore = new Map<string, RateLimitRecord>();
  }
  return globalForRateLimit.__analyticsRateLimitStore;
}

function cleanupExpiredEntries(store: Map<string, RateLimitRecord>, now: number): void {
  for (const [key, entry] of store.entries()) {
    if (entry.expiresAt <= now) {
      store.delete(key);
    }
  }
}

function consumeFromStore(
  store: Map<string, RateLimitRecord>,
  key: string,
  limit: number,
  now: number,
): boolean {
  const existing = store.get(key);
  if (!existing || existing.expiresAt <= now) {
    store.set(key, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (existing.count >= limit) {
    return false;
  }
  existing.count += 1;
  return true;
}

export function consumeAnalyticsRateLimit(request: Request): boolean {
  const now = Date.now();
  const store = getRateLimitStore();
  cleanupExpiredEntries(store, now);

  // Global ceiling first, so rotating IP addresses cannot flood the database.
  if (!consumeFromStore(store, GLOBAL_RATE_LIMIT_KEY, RATE_LIMIT_MAX_GLOBAL_REQUESTS, now)) {
    return false;
  }
  return consumeFromStore(store, `ip:${getClientIp(request)}`, RATE_LIMIT_MAX_REQUESTS, now);
}
