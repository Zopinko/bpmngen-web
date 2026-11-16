import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// TEMPORARY: shows the caller only their own forwarding headers so we can see which one
// the hosting proxy sets reliably. Remove after the client IP logic is fixed.
export function GET(request: Request) {
  const pick = (name: string) => request.headers.get(name);
  return NextResponse.json(
    {
      "x-forwarded-for": pick("x-forwarded-for"),
      "cf-connecting-ip": pick("cf-connecting-ip"),
      "true-client-ip": pick("true-client-ip"),
      "x-real-ip": pick("x-real-ip"),
      "x-envoy-external-address": pick("x-envoy-external-address"),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
