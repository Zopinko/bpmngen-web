export function getClientIp(request: Request): string {
  // A dedicated header set by the hosting proxy (e.g. "cf-connecting-ip") is the most
  // reliable source when configured.
  const configuredHeader = process.env.CLIENT_IP_HEADER?.trim().toLowerCase();
  if (configuredHeader) {
    const value = request.headers.get(configuredHeader)?.trim();
    if (value) {
      return value;
    }
  }

  // Otherwise use the right-most X-Forwarded-For entry: it is the one appended by our
  // own proxy, while entries further left can be supplied by the client.
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const entries = forwardedFor.split(",").map((entry) => entry.trim()).filter(Boolean);
    const last = entries[entries.length - 1];
    if (last) {
      return last;
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "unknown";
}
