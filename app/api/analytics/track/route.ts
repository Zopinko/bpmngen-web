import { NextResponse } from "next/server";
import {
  consumeAnalyticsRateLimit,
  isTrustedAnalyticsRequest,
  validateTrackPayload,
} from "@/lib/analytics-ingest";
import { insertAnalyticsEvent } from "@/lib/analytics-db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isTrustedAnalyticsRequest(request)) {
    return NextResponse.json({ error: "Untrusted origin." }, { status: 403 });
  }

  if (!consumeAnalyticsRateLimit(request)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const validated = validateTrackPayload((payload ?? {}) as Record<string, unknown>);
  if (!validated) {
    return NextResponse.json({ error: "Invalid analytics payload." }, { status: 400 });
  }

  const headerReferrer = request.headers.get("referer");
  const headerUserAgent = request.headers.get("user-agent");

  insertAnalyticsEvent({
    eventName: validated.eventName,
    pathValue: validated.path,
    sessionId: validated.sessionId,
    referrer: validated.referrer ?? headerReferrer ?? undefined,
    userAgent: validated.userAgent ?? headerUserAgent ?? undefined,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
