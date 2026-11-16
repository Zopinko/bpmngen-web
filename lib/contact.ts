import { formatUtcSqliteDate, getDb } from "@/lib/analytics-db";
import { getClientIp } from "@/lib/client-ip";
import { CONTACT_RETENTION_DAYS } from "@/lib/retention";

export { CONTACT_RETENTION_DAYS };

export const CONTACT_LIMITS = { name: 100, email: 200, company: 150, messageMin: 10, messageMax: 4000 } as const;

const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX_PER_IP = 5;
const RATE_MAX_GLOBAL = 60;

export type ContactInput = {
  locale: "en" | "sk";
  name: string;
  email: string;
  company?: string;
  message: string;
};

export type ContactMessageRow = ContactInput & { id: number; createdAt: string };

type ContactGlobal = typeof globalThis & {
  __contactTableReady?: boolean;
  __contactCleanupDay?: string;
  __contactRateLimit?: Map<string, { count: number; expiresAt: number }>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Control characters except tab and line breaks.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(CONTROL_CHARS, "").trim();
  return cleaned.length <= max ? cleaned : null;
}

export type ContactField = "name" | "email" | "company" | "message" | "form";

export type ContactValidation = { ok: true; value: ContactInput } | { ok: false; field: ContactField };

export function validateContactPayload(payload: Record<string, unknown>): ContactValidation {
  const name = cleanText(payload.name, CONTACT_LIMITS.name);
  if (!name) return { ok: false, field: "name" };

  const email = cleanText(payload.email, CONTACT_LIMITS.email);
  if (!email || !EMAIL_PATTERN.test(email)) return { ok: false, field: "email" };

  const company =
    payload.company === undefined || payload.company === "" ? "" : cleanText(payload.company, CONTACT_LIMITS.company);
  if (company === null) return { ok: false, field: "company" };

  const message = cleanText(payload.message, CONTACT_LIMITS.messageMax);
  if (!message || message.length < CONTACT_LIMITS.messageMin) return { ok: false, field: "message" };

  const locale = payload.locale === "sk" ? "sk" : "en";
  return { ok: true, value: { locale, name, email, company: company || undefined, message } };
}

/** 5 messages per IP and 60 in total per 10 minutes: enough for people, not for a spam run. */
export function consumeContactRateLimit(request: Request): boolean {
  const globalForContact = globalThis as ContactGlobal;
  const store = (globalForContact.__contactRateLimit ??= new Map());
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.expiresAt <= now) store.delete(key);
  }
  const take = (key: string, limit: number) => {
    const entry = store.get(key);
    if (!entry) {
      store.set(key, { count: 1, expiresAt: now + RATE_WINDOW_MS });
      return true;
    }
    if (entry.count >= limit) return false;
    entry.count += 1;
    return true;
  };
  return take("__global__", RATE_MAX_GLOBAL) && take(`ip:${getClientIp(request)}`, RATE_MAX_PER_IP);
}

/** Contact messages live in the same SQLite file as analytics (the persistent disk on Render). */
function contactDb() {
  const db = getDb();
  const globalForContact = globalThis as ContactGlobal;
  if (!globalForContact.__contactTableReady) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        locale TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
    `);
    globalForContact.__contactTableReady = true;
  }

  const today = new Date().toISOString().slice(0, 10);
  if (globalForContact.__contactCleanupDay !== today) {
    const cutoff = new Date();
    cutoff.setUTCDate(cutoff.getUTCDate() - CONTACT_RETENTION_DAYS);
    db.prepare("DELETE FROM contact_messages WHERE created_at < ?").run(formatUtcSqliteDate(cutoff));
    globalForContact.__contactCleanupDay = today;
  }
  return db;
}

export function insertContactMessage(input: ContactInput): void {
  contactDb()
    .prepare("INSERT INTO contact_messages (locale, name, email, company, message) VALUES (?, ?, ?, ?, ?)")
    .run(input.locale, input.name, input.email, input.company ?? null, input.message);
}

export function listContactMessages(limit = 200): ContactMessageRow[] {
  const rows = contactDb()
    .prepare(
      "SELECT id, locale, name, email, company, message, created_at FROM contact_messages ORDER BY created_at DESC, id DESC LIMIT ?",
    )
    .all(limit) as Array<Record<string, unknown>>;
  return rows.map((row) => ({
    id: Number(row.id),
    locale: row.locale === "sk" ? "sk" : "en",
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    company: row.company ? String(row.company) : undefined,
    message: String(row.message ?? ""),
    createdAt: String(row.created_at ?? ""),
  }));
}
