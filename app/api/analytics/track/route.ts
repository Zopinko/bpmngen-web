import { NextResponse } from "next/server";
import { insertAnalyticsEvent } from "@/lib/analytics-db";
import { isAllowedAnalyticsEvent } from "@/lib/analytics-events";

export const runtime = "nodejs";

type TrackPayload = {
  event_name?: unknown;
  path?: unknown;
  session_id?: unknown;
  referrer?: unknown;
  user_agent?: unknown;
};

export async function POST(request: Request) {
  let payload: TrackPayload;
  try {
    payload = (await request.json()) as TrackPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (typeof payload.event_name !== "string" || !isAllowedAnalyticsEvent(payload.event_name)) {
    return NextResponse.json({ error: "Invalid event_name." }, { status: 400 });
  }

  if (typeof payload.path !== "string" || payload.path.length < 1 || payload.path.length > 2048) {
    return NextResponse.json({ error: "Invalid path." }, { status: 400 });
  }
  if (
    payload.session_id !== undefined &&
    (typeof payload.session_id !== "string" ||
      payload.session_id.length < 1 ||
      payload.session_id.length > 128)
  ) {
    return NextResponse.json({ error: "Invalid session_id." }, { status: 400 });
  }

  const headerReferrer = request.headers.get("referer");
  const headerUserAgent = request.headers.get("user-agent");
  const sessionId = typeof payload.session_id === "string" ? payload.session_id : undefined;

  const referrer =
    typeof payload.referrer === "string" && payload.referrer.length > 0
      ? payload.referrer
      : headerReferrer;
  const userAgent =
    typeof payload.user_agent === "string" && payload.user_agent.length > 0
      ? payload.user_agent
      : headerUserAgent;

  insertAnalyticsEvent({
    eventName: payload.event_name,
    pathValue: payload.path,
    sessionId,
    referrer,
    userAgent,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
