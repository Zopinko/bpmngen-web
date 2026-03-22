import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { safeEqual } from "@/lib/security";

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
    return unauthorizedResponse();
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
