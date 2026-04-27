import {
  type AnalyticsEventRow,
  type AnalyticsRangeKey,
  listAnalyticsEventsForRange,
} from "@/lib/analytics-db";

export const ANALYTICS_RANGE_OPTIONS: Array<{ key: AnalyticsRangeKey; label: string }> = [
  { key: "today", label: "Today" },
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "all", label: "All time" },
];

export type AnalyticsTrendPoint = {
  date: string;
  sessions: number;
  landingVisits: number;
  demoOpens: number;
  signupStarted: number;
  ctaClicks: number;
};

export type AnalyticsBreakdownRow = {
  label: string;
  total: number;
  sessions: number;
  share: number;
  detail?: string;
};

export type AnalyticsFlowRow = {
  sessionId: string;
  startedAt: string;
  source: string;
  locale: string;
  steps: string;
  events: number;
};

export type AnalyticsDashboardSummary = {
  rangeLabel: string;
  trackedSessions: number;
  engagedSessions: number;
  newSessions: number;
  returningSessions: number;
  landingVisits: number;
  demoOpens: number;
  ctaClicks: number;
  signupStarted: number;
  signupCompleted: number;
  demoConversionRate: number;
  signupStartRate: number;
  signupCompletionRate: number;
  returningShare: number;
};

export type AnalyticsDashboardData = {
  summary: AnalyticsDashboardSummary;
  trends: AnalyticsTrendPoint[];
  sourceBuckets: AnalyticsBreakdownRow[];
  referrerHosts: AnalyticsBreakdownRow[];
  ctaBreakdown: AnalyticsBreakdownRow[];
  localeBreakdown: AnalyticsBreakdownRow[];
  planBreakdown: AnalyticsBreakdownRow[];
  eventBreakdown: AnalyticsBreakdownRow[];
  recentFlows: AnalyticsFlowRow[];
  hasSignupCompletionTracking: boolean;
};

type ParsedEventPath = {
  pathname: string;
  locale: "en" | "sk";
  cta: string | null;
  plan: string | null;
};

function isSessionId(value: string | null): value is string {
  return Boolean(value && value.trim());
}

function parseEventPath(pathValue: string): ParsedEventPath {
  try {
    const parsed = new URL(pathValue, "https://bpmngen.com");
    const pathname = parsed.pathname || "/";
    return {
      pathname,
      locale: pathname.startsWith("/sk") ? "sk" : "en",
      cta: parsed.searchParams.get("cta"),
      plan: parsed.searchParams.get("plan"),
    };
  } catch {
    return {
      pathname: "/",
      locale: "en",
      cta: null,
      plan: null,
    };
  }
}

function normalizeReferrerHost(referrer: string | null): string {
  const raw = referrer?.trim();
  if (!raw) {
    return "direct";
  }

  try {
    const parsed = new URL(raw);
    return parsed.hostname.replace(/^www\./i, "").toLowerCase() || "direct";
  } catch {
    return "other";
  }
}

function sourceBucketFromHost(host: string): string {
  if (host === "direct") return "direct";
  if (host.includes("google.")) return "google";
  if (host.includes("linkedin.")) return "linkedin";
  if (host.includes("reddit.")) return "reddit";
  return "other";
}

function formatSourceBucket(source: string): string {
  const labels: Record<string, string> = {
    direct: "Direct",
    google: "Google",
    linkedin: "LinkedIn",
    reddit: "Reddit",
    other: "Other",
  };
  return labels[source] ?? source;
}

function formatLocale(locale: string): string {
  return locale === "sk" ? "Slovak (/sk)" : "English (/)";
}

function formatPlan(plan: string): string {
  const normalized = plan.trim().toLowerCase();
  if (!normalized) return "Unknown";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function formatPercent(value: number, total: number): number {
  if (total <= 0) {
    return 0;
  }
  return (value / total) * 100;
}

function formatCtaLabel(cta: string | null, plan: string | null, pathname: string): string {
  if (!cta) {
    return pathname;
  }

  const known: Record<string, string> = {
    header_try_app: "Header: Try the App",
    hero_try_app: "Hero: Try the App",
    hero_see_pricing: "Hero: See pricing",
    footer_product: "Footer: Product",
    footer_pricing: "Footer: Pricing",
    footer_faq: "Footer: FAQ",
    header_product: "Header: Product",
    header_pricing: "Header: Pricing",
    header_faq: "Header: FAQ",
    header_mobile_product: "Header mobile: Product",
    header_mobile_pricing: "Header mobile: Pricing",
    header_mobile_faq: "Header mobile: FAQ",
  };

  if (cta === "pricing_signup") {
    return `Pricing: ${formatPlan(plan ?? "unknown")} plan`;
  }

  return known[cta] ?? cta.replace(/_/g, " ");
}

function incrementMap(map: Map<string, number>, key: string, increment = 1): void {
  map.set(key, (map.get(key) ?? 0) + increment);
}

function buildBreakdownRows(
  totals: Map<string, number>,
  sessionsByKey: Map<string, Set<string>>,
  grandTotal: number,
  detailResolver?: (key: string) => string | undefined,
): AnalyticsBreakdownRow[] {
  return [...totals.entries()]
    .map(([label, total]) => ({
      label,
      total,
      sessions: sessionsByKey.get(label)?.size ?? 0,
      share: formatPercent(total, grandTotal),
      detail: detailResolver?.(label),
    }))
    .sort((a, b) => b.total - a.total || a.label.localeCompare(b.label));
}

function sessionSet(map: Map<string, Set<string>>, key: string): Set<string> {
  const existing = map.get(key);
  if (existing) {
    return existing;
  }
  const created = new Set<string>();
  map.set(key, created);
  return created;
}

function buildDateBuckets(range: AnalyticsRangeKey, filteredEvents: AnalyticsEventRow[]): string[] {
  const seen = new Set(filteredEvents.map((event) => event.created_at.slice(0, 10)));
  if (range === "all") {
    return [...seen].sort();
  }

  const length = range === "today" ? 1 : range === "7d" ? 7 : 30;
  const days: string[] = [];
  const current = new Date();
  current.setUTCHours(0, 0, 0, 0);
  for (let index = length - 1; index >= 0; index -= 1) {
    const date = new Date(current);
    date.setUTCDate(current.getUTCDate() - index);
    days.push(date.toISOString().slice(0, 10));
  }
  return days;
}

function formatFlowStep(event: AnalyticsEventRow): string {
  const parsed = parseEventPath(event.path);
  switch (event.event_name) {
    case "link_click":
      return `click:${formatCtaLabel(parsed.cta, parsed.plan, parsed.pathname)}`;
    case "signup_started":
      return `signup:${formatPlan(parsed.plan ?? "unknown")}`;
    case "demo_opened":
      return "demo";
    case "landing_page_view":
      return parsed.locale === "sk" ? "landing:sk" : "landing:en";
    default:
      return event.event_name;
  }
}

export function resolveAnalyticsRange(input: string | string[] | undefined): AnalyticsRangeKey {
  const value = Array.isArray(input) ? input[0] : input;
  return ANALYTICS_RANGE_OPTIONS.some((option) => option.key === value)
    ? (value as AnalyticsRangeKey)
    : "7d";
}

export function getAnalyticsDashboardData(range: AnalyticsRangeKey): AnalyticsDashboardData {
  const allEvents = listAnalyticsEventsForRange("all");
  const filteredEvents = listAnalyticsEventsForRange(range);
  const rangeLabel = ANALYTICS_RANGE_OPTIONS.find((option) => option.key === range)?.label ?? range;

  const firstSeenBySession = new Map<string, string>();
  const firstReferrerHostBySession = new Map<string, string>();
  const localeBySession = new Map<string, string>();

  for (const event of allEvents) {
    if (!isSessionId(event.session_id)) {
      continue;
    }

    if (!firstSeenBySession.has(event.session_id)) {
      firstSeenBySession.set(event.session_id, event.created_at);
    }

    const referrerHost = normalizeReferrerHost(event.referrer);
    if (!firstReferrerHostBySession.has(event.session_id) && referrerHost !== "direct") {
      firstReferrerHostBySession.set(event.session_id, referrerHost);
    }

    if (!localeBySession.has(event.session_id)) {
      localeBySession.set(event.session_id, parseEventPath(event.path).locale);
    }
  }

  const filteredSessions = new Set<string>();
  const engagedSessions = new Set<string>();
  const sourceBucketTotals = new Map<string, number>();
  const sourceBucketSessions = new Map<string, Set<string>>();
  const referrerHostTotals = new Map<string, number>();
  const referrerHostSessions = new Map<string, Set<string>>();
  const ctaTotals = new Map<string, number>();
  const ctaSessions = new Map<string, Set<string>>();
  const localeTotals = new Map<string, number>();
  const localeSessions = new Map<string, Set<string>>();
  const planTotals = new Map<string, number>();
  const planSessions = new Map<string, Set<string>>();
  const eventTotals = new Map<string, number>();
  const eventSessions = new Map<string, Set<string>>();
  const flowEventsBySession = new Map<string, AnalyticsEventRow[]>();

  let landingVisits = 0;
  let demoOpens = 0;
  let ctaClicks = 0;
  let signupStarted = 0;
  let signupCompleted = 0;

  const trendPoints = new Map<string, AnalyticsTrendPoint>();
  for (const date of buildDateBuckets(range, filteredEvents)) {
    trendPoints.set(date, {
      date,
      sessions: 0,
      landingVisits: 0,
      demoOpens: 0,
      signupStarted: 0,
      ctaClicks: 0,
    });
  }

  const seenSessionsPerDay = new Map<string, Set<string>>();

  for (const event of filteredEvents) {
    const parsed = parseEventPath(event.path);
    const day = event.created_at.slice(0, 10);
    const trend = trendPoints.get(day);
    const sessionId = isSessionId(event.session_id) ? event.session_id : null;

    incrementMap(eventTotals, event.event_name);
    if (sessionId) {
      filteredSessions.add(sessionId);
      sessionSet(eventSessions, event.event_name).add(sessionId);
      const flowEvents = flowEventsBySession.get(sessionId) ?? [];
      flowEvents.push(event);
      flowEventsBySession.set(sessionId, flowEvents);

      const sessionsForDay = seenSessionsPerDay.get(day) ?? new Set<string>();
      const isFirstSessionHitForDay = !sessionsForDay.has(sessionId);
      sessionsForDay.add(sessionId);
      seenSessionsPerDay.set(day, sessionsForDay);
      if (trend && isFirstSessionHitForDay) {
        trend.sessions += 1;
      }
    }

    if (event.event_name !== "landing_page_view") {
      if (sessionId) {
        engagedSessions.add(sessionId);
      }
    }

    if (event.event_name === "landing_page_view") {
      landingVisits += 1;
      if (trend) {
        trend.landingVisits += 1;
      }
      incrementMap(localeTotals, formatLocale(parsed.locale));
      if (sessionId) {
        sessionSet(localeSessions, formatLocale(parsed.locale)).add(sessionId);
      }
    }

    if (event.event_name === "demo_opened") {
      demoOpens += 1;
      if (trend) {
        trend.demoOpens += 1;
      }
    }

    if (event.event_name === "link_click") {
      ctaClicks += 1;
      if (trend) {
        trend.ctaClicks += 1;
      }
      const ctaLabel = formatCtaLabel(parsed.cta, parsed.plan, parsed.pathname);
      incrementMap(ctaTotals, ctaLabel);
      if (sessionId) {
        sessionSet(ctaSessions, ctaLabel).add(sessionId);
      }
    }

    if (event.event_name === "signup_started") {
      signupStarted += 1;
      if (trend) {
        trend.signupStarted += 1;
      }
      const planLabel = formatPlan(parsed.plan ?? "unknown");
      incrementMap(planTotals, planLabel);
      if (sessionId) {
        sessionSet(planSessions, planLabel).add(sessionId);
      }
    }

    if (event.event_name === "signup_completed") {
      signupCompleted += 1;
    }
  }

  for (const sessionId of filteredSessions) {
    const host = firstReferrerHostBySession.get(sessionId) ?? "direct";
    const bucketLabel = formatSourceBucket(sourceBucketFromHost(host));
    incrementMap(sourceBucketTotals, bucketLabel);
    sessionSet(sourceBucketSessions, bucketLabel).add(sessionId);

    incrementMap(referrerHostTotals, host);
    sessionSet(referrerHostSessions, host).add(sessionId);

    const localeLabel = formatLocale(localeBySession.get(sessionId) ?? "en");
    sessionSet(localeSessions, localeLabel).add(sessionId);
  }

  const rangeStart = filteredEvents[0]?.created_at;
  let newSessions = 0;
  let returningSessions = 0;
  for (const sessionId of filteredSessions) {
    const firstSeen = firstSeenBySession.get(sessionId);
    if (!firstSeen || !rangeStart || firstSeen >= rangeStart) {
      newSessions += 1;
    } else {
      returningSessions += 1;
    }
  }

  const ctaBreakdown = buildBreakdownRows(ctaTotals, ctaSessions, ctaClicks);
  const localeBreakdown = buildBreakdownRows(localeTotals, localeSessions, Math.max(landingVisits, filteredSessions.size));
  const planBreakdown = buildBreakdownRows(planTotals, planSessions, signupStarted);
  const sourceBuckets = buildBreakdownRows(sourceBucketTotals, sourceBucketSessions, filteredSessions.size);
  const referrerHosts = buildBreakdownRows(referrerHostTotals, referrerHostSessions, filteredSessions.size);
  const eventBreakdown = buildBreakdownRows(eventTotals, eventSessions, filteredEvents.length);

  const recentFlows: AnalyticsFlowRow[] = [...flowEventsBySession.entries()]
    .map(([sessionId, events]) => {
      const ordered = [...events].sort((a, b) => a.created_at.localeCompare(b.created_at) || a.id - b.id);
      return {
        sessionId,
        startedAt: ordered[0]?.created_at ?? "",
        source: formatSourceBucket(sourceBucketFromHost(firstReferrerHostBySession.get(sessionId) ?? "direct")),
        locale: formatLocale(localeBySession.get(sessionId) ?? "en"),
        steps: ordered.map((event) => formatFlowStep(event)).join(" -> "),
        events: ordered.length,
      };
    })
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
    .slice(0, 12);

  return {
    summary: {
      rangeLabel,
      trackedSessions: filteredSessions.size,
      engagedSessions: engagedSessions.size,
      newSessions,
      returningSessions,
      landingVisits,
      demoOpens,
      ctaClicks,
      signupStarted,
      signupCompleted,
      demoConversionRate: formatPercent(demoOpens, landingVisits),
      signupStartRate: formatPercent(signupStarted, landingVisits),
      signupCompletionRate: formatPercent(signupCompleted, signupStarted),
      returningShare: formatPercent(returningSessions, filteredSessions.size),
    },
    trends: [...trendPoints.values()].sort((a, b) => a.date.localeCompare(b.date)),
    sourceBuckets,
    referrerHosts,
    ctaBreakdown,
    localeBreakdown,
    planBreakdown,
    eventBreakdown,
    recentFlows,
    hasSignupCompletionTracking: allEvents.some((event) => event.event_name === "signup_completed"),
  };
}
