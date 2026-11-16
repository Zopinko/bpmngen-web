import { NextResponse } from "next/server";
import { isSameSiteRequest } from "@/lib/analytics-ingest";
import { consumeContactRateLimit, insertContactMessage, validateContactPayload } from "@/lib/contact";

export const runtime = "nodejs";

const MAX_BODY_CHARS = 16_384;

export async function POST(request: Request) {
  // Only our own contact page may post here. No CORS headers, so other sites can't read replies.
  if (!isSameSiteRequest(request)) {
    return NextResponse.json({ error: "untrusted_origin" }, { status: 403 });
  }
  if (!consumeContactRateLimit(request)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    payload = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid", field: "form" }, { status: 400 });
  }

  // Honeypot: the "website" field is hidden from people, so only bots fill it. Pretend success.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const result = validateContactPayload(payload);
  if (!result.ok) {
    return NextResponse.json({ error: "invalid", field: result.field }, { status: 400 });
  }

  insertContactMessage(result.value);
  return NextResponse.json({ ok: true }, { status: 201 });
}
