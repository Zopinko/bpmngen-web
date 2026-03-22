import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { type AnalyticsEventName } from "@/lib/analytics-events";

function resolveAnalyticsDbPath(): string {
  const configuredPath = process.env.ANALYTICS_DB_PATH?.trim();
  if (configuredPath) {
    return path.isAbsolute(configuredPath)
      ? configuredPath
      : path.resolve(process.cwd(), configuredPath);
  }

  if (process.env.NODE_ENV !== "production") {
    return path.join(process.cwd(), "data", "analytics.sqlite");
  }

  throw new Error(
    "ANALYTICS_DB_PATH is required in production. Set it to a persistent disk path (for example /var/data/analytics.db).",
  );
}

const dbPath = resolveAnalyticsDbPath();
const dataDir = path.dirname(dbPath);

type DatabaseSyncLike = {
  exec(sql: string): void;
  prepare(sql: string): {
    run: (...params: unknown[]) => unknown;
    all: (...params: unknown[]) => unknown[];
  };
};

type AnalyticsDatabaseGlobal = typeof globalThis & {
  __analyticsDb?: DatabaseSyncLike;
};

function getDb(): DatabaseSyncLike {
  const globalForDb = globalThis as AnalyticsDatabaseGlobal;
  if (!globalForDb.__analyticsDb) {
    mkdirSync(dataDir, { recursive: true });
    console.info(`[analytics] using db path: ${dbPath}`);
    globalForDb.__analyticsDb = new DatabaseSync(dbPath);
    globalForDb.__analyticsDb.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;
      PRAGMA busy_timeout = 5000;

      CREATE TABLE IF NOT EXISTS analytics_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name TEXT NOT NULL,
        path TEXT NOT NULL,
        session_id TEXT,
        referrer TEXT,
        user_agent TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
      CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
      CREATE INDEX IF NOT EXISTS idx_analytics_events_event_path ON analytics_events(event_name, path);
    `);

    const columns = globalForDb.__analyticsDb
      .prepare("PRAGMA table_info(analytics_events)")
      .all() as Array<{ name?: unknown }>;
    const hasSessionId = columns.some((column) => column.name === "session_id");
    if (!hasSessionId) {
      globalForDb.__analyticsDb.exec("ALTER TABLE analytics_events ADD COLUMN session_id TEXT");
    }
  }
  return globalForDb.__analyticsDb;
}

export type AnalyticsEventRow = {
  id: number;
  event_name: string;
  path: string;
  session_id: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

export type AnalyticsPathCountRow = {
  path: string;
  total: number;
};

export type AnalyticsSummaryStats = {
  landingVisits: number;
  demoOpens: number;
  ctaClicks: number;
  paidClicked: number;
  signupStarted: number;
  signupCompleted: number;
  uniqueSessions: number;
  uniqueVisitors: number;
  todayVisitors: number;
  newVisitors: number;
  returningVisitors: number;
};

export type AnalyticsSessionFlowRow = {
  session_id: string;
  flow: string;
  started_at: string;
};

export type AnalyticsSourceCountRow = {
  source: string;
  total: number;
};

export function insertAnalyticsEvent(params: {
  eventName: AnalyticsEventName;
  pathValue: string;
  sessionId?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
}): void {
  const db = getDb();
  db.prepare(
    `
      INSERT INTO analytics_events (event_name, path, session_id, referrer, user_agent)
      VALUES (?, ?, ?, ?, ?)
    `,
  ).run(
    params.eventName,
    params.pathValue,
    params.sessionId ?? null,
    params.referrer ?? null,
    params.userAgent ?? null,
  );
}

export function listAnalyticsEvents(limit = 500): AnalyticsEventRow[] {
  const db = getDb();
  return db
    .prepare(
      `
        SELECT id, event_name, path, session_id, referrer, user_agent, created_at
        FROM analytics_events
        ORDER BY id DESC
        LIMIT ?
      `,
    )
    .all(limit) as AnalyticsEventRow[];
}

export function listAnalyticsPathCountsForEvent(
  eventName: AnalyticsEventName,
  limit = 200,
): AnalyticsPathCountRow[] {
  const db = getDb();
  return db
    .prepare(
      `
        SELECT path, COUNT(*) AS total
        FROM analytics_events
        WHERE event_name = ?
        GROUP BY path
        ORDER BY total DESC, path ASC
        LIMIT ?
      `,
    )
    .all(eventName, limit) as AnalyticsPathCountRow[];
}

export function getAnalyticsSummaryStats(): AnalyticsSummaryStats {
  const db = getDb();
  const row = db
    .prepare(
      `
        WITH session_first_seen AS (
          SELECT
            session_id,
            MIN(created_at) AS first_seen_at
          FROM analytics_events
          WHERE session_id IS NOT NULL
            AND session_id <> ''
          GROUP BY session_id
        ),
        today_sessions AS (
          SELECT DISTINCT session_id
          FROM analytics_events
          WHERE session_id IS NOT NULL
            AND session_id <> ''
            AND date(created_at) = date('now')
        )
        SELECT
          COALESCE(SUM(CASE WHEN event_name = 'landing_page_view' THEN 1 ELSE 0 END), 0) AS landingVisits,
          COALESCE(SUM(CASE WHEN event_name = 'demo_opened' THEN 1 ELSE 0 END), 0) AS demoOpens,
          COALESCE(SUM(CASE WHEN event_name = 'link_click' THEN 1 ELSE 0 END), 0) AS ctaClicks,
          COALESCE(SUM(CASE WHEN event_name = 'paid_clicked' THEN 1 ELSE 0 END), 0) AS paidClicked,
          COALESCE(SUM(CASE WHEN event_name = 'signup_started' THEN 1 ELSE 0 END), 0) AS signupStarted,
          COALESCE(SUM(CASE WHEN event_name = 'signup_completed' THEN 1 ELSE 0 END), 0) AS signupCompleted,
          COALESCE(COUNT(DISTINCT session_id), 0) AS uniqueSessions,
          COALESCE(COUNT(DISTINCT session_id), 0) AS uniqueVisitors,
          COALESCE((SELECT COUNT(*) FROM today_sessions), 0) AS todayVisitors,
          COALESCE((SELECT COUNT(*) FROM session_first_seen WHERE date(first_seen_at) = date('now')), 0) AS newVisitors,
          COALESCE(
            (
              SELECT COUNT(*)
              FROM today_sessions ts
              JOIN session_first_seen sf ON sf.session_id = ts.session_id
              WHERE date(sf.first_seen_at) < date('now')
            ),
            0
          ) AS returningVisitors
        FROM analytics_events
      `,
    )
    .all()[0] as
    | {
        landingVisits?: unknown;
        demoOpens?: unknown;
        ctaClicks?: unknown;
        paidClicked?: unknown;
        signupStarted?: unknown;
        signupCompleted?: unknown;
        uniqueSessions?: unknown;
        uniqueVisitors?: unknown;
        todayVisitors?: unknown;
        newVisitors?: unknown;
        returningVisitors?: unknown;
      }
    | undefined;

  return {
    landingVisits: Number(row?.landingVisits ?? 0),
    demoOpens: Number(row?.demoOpens ?? 0),
    ctaClicks: Number(row?.ctaClicks ?? 0),
    paidClicked: Number(row?.paidClicked ?? 0),
    signupStarted: Number(row?.signupStarted ?? 0),
    signupCompleted: Number(row?.signupCompleted ?? 0),
    uniqueSessions: Number(row?.uniqueSessions ?? 0),
    uniqueVisitors: Number(row?.uniqueVisitors ?? 0),
    todayVisitors: Number(row?.todayVisitors ?? 0),
    newVisitors: Number(row?.newVisitors ?? 0),
    returningVisitors: Number(row?.returningVisitors ?? 0),
  };
}

function normalizeReferrerHost(referrer: string): string {
  const raw = referrer.trim();
  if (!raw) return "direct";
  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.replace(/^www\./i, "").toLowerCase();
    return host || "direct";
  } catch {
    return "other";
  }
}

function mapSourceBucket(referrer: string): string {
  const host = normalizeReferrerHost(referrer);
  if (host === "direct") return "direct";
  if (host.includes("google.")) return "google";
  if (host.includes("linkedin.")) return "linkedin";
  if (host.includes("reddit.")) return "reddit";
  return "other";
}

export function listTrafficSourceCounts(limit = 10): AnalyticsSourceCountRow[] {
  const db = getDb();
  const rows = db
    .prepare(
      `
        SELECT
          sessions.session_id AS session_id,
          COALESCE(
            (
              SELECT referrer
              FROM analytics_events inner_events
              WHERE inner_events.session_id = sessions.session_id
                AND inner_events.referrer IS NOT NULL
                AND TRIM(inner_events.referrer) <> ''
              ORDER BY inner_events.id ASC
              LIMIT 1
            ),
            ''
          ) AS referrer
        FROM analytics_events AS sessions
        WHERE sessions.session_id IS NOT NULL
          AND sessions.session_id <> ''
        GROUP BY sessions.session_id
      `,
    )
    .all() as Array<{ session_id?: unknown; referrer?: unknown }>;

  const totals = new Map<string, number>();
  for (const row of rows) {
    const source = mapSourceBucket(String(row.referrer ?? ""));
    totals.set(source, (totals.get(source) ?? 0) + 1);
  }

  return [...totals.entries()]
    .map(([source, total]) => ({ source, total }))
    .sort((a, b) => b.total - a.total || a.source.localeCompare(b.source))
    .slice(0, limit);
}

export function listRecentSessionFlows(limit = 20): AnalyticsSessionFlowRow[] {
  const db = getDb();
  return db
    .prepare(
      `
        SELECT
          sessions.session_id AS session_id,
          (
            SELECT GROUP_CONCAT(ordered.event_name, ' -> ')
            FROM (
              SELECT event_name
              FROM analytics_events
              WHERE session_id = sessions.session_id
              ORDER BY created_at ASC, id ASC
            ) AS ordered
          ) AS flow,
          MIN(sessions.created_at) AS started_at
        FROM analytics_events AS sessions
        WHERE sessions.session_id IS NOT NULL AND sessions.session_id <> ''
        GROUP BY sessions.session_id
        ORDER BY started_at DESC
        LIMIT ?
      `,
    )
    .all(limit) as AnalyticsSessionFlowRow[];
}

