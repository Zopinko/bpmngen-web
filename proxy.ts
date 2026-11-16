import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { safeEqual } from "@/lib/security";

const FAILED_LOGIN_WINDOW_MS = 15 * 60_000;
const MAX_FAILED_LOGINS = 10;

type FailedLoginRecord = { count: number; expiresAt: number };
type AdminAuthGlobal = typeof globalThis & {
  __adminFailedLogins?: Map<string, FailedLoginRecord>;
};

function getFailedLoginStore(): Map<string, FailedLoginRecord> {
  const globalForAuth = globalThis as AdminAuthGlobal;
  if (!globalForAuth.__adminFailedLogins) {
    globalForAuth.__adminFailedLogins = new Map();
  }
  return globalForAuth.__adminFailedLogins;
}

function isLockedOut(ip: string, now: number): boolean {
  const store = getFailedLoginStore();
  for (const [key, entry] of store.entries()) {
    if (entry.expiresAt <= now) store.delete(key);
  }
  return (store.get(ip)?.count ?? 0) >= MAX_FAILED_LOGINS;
}

function recordFailedLogin(ip: string, now: number): void {
  const store = getFailedLoginStore();
  const existing = store.get(ip);
  if (!existing || existing.expiresAt <= now) {
    store.set(ip, { count: 1, expiresAt: now + FAILED_LOGIN_WINDOW_MS });
  } else {
    existing.count += 1;
  }
}

function tooManyAttemptsResponse() {
  return new NextResponse("Too many failed attempts. Try again later.", {
    status: 429,
    headers: { "Retry-After": String(FAILED_LOGIN_WINDOW_MS / 1000), "Cache-Control": "no-store" },
  });
}

function unauthorizedResponse() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Analytics Admin"',
      "Cache-Control": "no-store",
    },
  });
}

export function proxy(request: NextRequest) {
  const ip = getClientIp(request);
  const now = Date.now();
  if (isLockedOut(ip, now)) {
    return tooManyAttemptsResponse();
  }

  const username = process.env.ANALYTICS_ADMIN_USER;
  const password = process.env.ANALYTICS_ADMIN_PASSWORD;

  if (!username || !password) {
    return unauthorizedResponse();
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const encoded = authHeader.slice("Basic ".length).trim();
  if (!encoded) {
    return unauthorizedResponse();
  }

  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return unauthorizedResponse();
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex < 0) {
    return unauthorizedResponse();
  }

  const providedUser = decoded.slice(0, separatorIndex);
  const providedPassword = decoded.slice(separatorIndex + 1);

  if (!safeEqual(providedUser, username) || !safeEqual(providedPassword, password)) {
    recordFailedLogin(ip, now);
    return unauthorizedResponse();
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
