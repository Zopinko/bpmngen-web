import { NextResponse } from "next/server";
import {
  consumeAnalyticsRateLimit,
  getAnalyticsCorsHeaders,
  isTrustedAnalyticsRequest,
  validateTrackPayload,
} from "@/lib/analytics-ingest";
import { insertAnalyticsEvent } from "@/lib/analytics-db";

export const runtime = "nodejs";

export function OPTIONS(request: Request) {
  const corsHeaders = getAnalyticsCorsHeaders(request);
  return new NextResponse(null, { status: Object.keys(corsHeaders).length > 0 ? 204 : 403, headers: corsHeaders });
}

export async function POST(request: Request) {
  const response = await handleTrack(request);
  for (const [name, value] of Object.entries(getAnalyticsCorsHeaders(request))) {
    response.headers.set(name, value);
  }
  return response;
}

async function handleTrack(request: Request): Promise<NextResponse> {
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

  // Events from the app are only legitimate with a session id from this site (consent).
  if (Object.keys(getAnalyticsCorsHeaders(request)).length > 0 && !validated.sessionId) {
    return NextResponse.json({ error: "Missing session id." }, { status: 400 });
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
