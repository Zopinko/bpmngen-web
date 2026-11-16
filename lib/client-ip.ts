/**
 * Resolves the visitor's IP for rate limiting.
 *
 * In production the site runs on Render behind Cloudflare. Verified on 2026-11-16:
 * - X-Forwarded-For arrives as "<client-supplied entries>, <visitor>, <Cloudflare edge>",
 *   so neither its first nor its last entry can be trusted.
 * - CF-Connecting-IP and True-Client-IP carry the visitor's IP and are set by Cloudflare:
 *   a client-supplied True-Client-IP is overwritten and a client-supplied
 *   CF-Connecting-IP makes Cloudflare reject the request.
 */
const TRUSTED_IP_HEADERS = ["cf-connecting-ip", "true-client-ip"];

export function getClientIp(request: Request): string {
  const configuredHeader = process.env.CLIENT_IP_HEADER?.trim().toLowerCase();
  const headers = configuredHeader ? [configuredHeader] : TRUSTED_IP_HEADERS;

  for (const name of headers) {
    const value = request.headers.get(name)?.trim();
    if (value) {
      return value;
    }
  }

  // Local development (no proxy in front): there is nothing trustworthy to read.
  return "unknown";
}
