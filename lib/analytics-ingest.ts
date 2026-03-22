import { type AnalyticsEventName, isAllowedAnalyticsEvent } from "@/lib/analytics-events";

const MAX_PATH_LENGTH = 2048;
const MAX_SESSION_ID_LENGTH = 128;
const MAX_REFERRER_LENGTH = 2048;
const MAX_USER_AGENT_LENGTH = 512;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 120;

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

export function isTrustedAnalyticsRequest(request: Request): boolean {
  const requestUrl = parseUrl(request.url);
  if (!requestUrl) {
    return false;
  }

  const originHeader = parseUrl(request.headers.get("origin"));
  if (originHeader) {
    return originHeader.origin === requestUrl.origin;
  }

  const refererHeader = parseUrl(request.headers.get("referer"));
  if (refererHeader) {
    return refererHeader.origin === requestUrl.origin;
  }

  return true;
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

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

export function consumeAnalyticsRateLimit(request: Request): boolean {
  const now = Date.now();
  const store = getRateLimitStore();
  cleanupExpiredEntries(store, now);

  const key = getClientIp(request);
  const existing = store.get(key);

  if (!existing || existing.expiresAt <= now) {
    store.set(key, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  store.set(key, {
    ...existing,
    count: existing.count + 1,
  });
  return true;
}
