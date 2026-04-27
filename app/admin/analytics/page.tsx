import type { Metadata } from "next";
import Link from "next/link";
import {
  ANALYTICS_RANGE_OPTIONS,
  getAnalyticsDashboardData,
  resolveAnalyticsRange,
  type AnalyticsBreakdownRow,
  type AnalyticsFlowRow,
  type AnalyticsTrendPoint,
} from "@/lib/analytics-dashboard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function formatDateLabel(value: string): string {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year.slice(2)}`;
}

function KpiCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">{value}</p>
      {detail ? <p className="mt-1 text-xs text-zinc-600">{detail}</p> : null}
    </article>
  );
}

function BreakdownTable({
  title,
  subtitle,
  rows,
  valueLabel,
}: {
  title: string;
  subtitle: string;
  rows: AnalyticsBreakdownRow[];
  valueLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3">
        <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
        <p className="mt-0.5 text-xs text-zinc-600">{subtitle}</p>
      </div>
      <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-700">
          <tr>
            <th className="px-4 py-2 font-medium">Segment</th>
            <th className="px-4 py-2 font-medium">{valueLabel}</th>
            <th className="px-4 py-2 font-medium">Sessions</th>
            <th className="px-4 py-2 font-medium">Share</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-zinc-800">
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-3 text-zinc-500" colSpan={4}>
                No data yet.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={`${title}-${row.label}`}>
                <td className="px-4 py-3">
                  <div className="font-medium text-zinc-900">{row.label}</div>
                  {row.detail ? <div className="text-xs text-zinc-500">{row.detail}</div> : null}
                </td>
                <td className="whitespace-nowrap px-4 py-3">{formatNumber(row.total)}</td>
                <td className="whitespace-nowrap px-4 py-3">{formatNumber(row.sessions)}</td>
                <td className="whitespace-nowrap px-4 py-3">{formatPercent(row.share)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function TrendBars({ points }: { points: AnalyticsTrendPoint[] }) {
  const maxSessions = Math.max(...points.map((point) => point.sessions), 1);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-zinc-900">Traffic trend</h2>
        <p className="mt-0.5 text-xs text-zinc-600">Tracked sessions, landing visits, demo opens, and signup starts by day.</p>
      </div>
      <div className="space-y-3">
        {points.length === 0 ? (
          <p className="text-sm text-zinc-500">No traffic recorded in this range.</p>
        ) : (
          points.map((point) => (
            <div key={point.date} className="grid gap-2 md:grid-cols-[88px_minmax(0,1fr)_auto] md:items-center">
              <div className="text-xs font-medium text-zinc-600">{formatDateLabel(point.date)}</div>
              <div className="h-3 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#18181b,#f59e0b)]"
                  style={{ width: `${Math.max((point.sessions / maxSessions) * 100, point.sessions > 0 ? 6 : 0)}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-600">
                <span>S {formatNumber(point.sessions)}</span>
                <span>L {formatNumber(point.landingVisits)}</span>
                <span>D {formatNumber(point.demoOpens)}</span>
                <span>SU {formatNumber(point.signupStarted)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function FlowTable({ rows }: { rows: AnalyticsFlowRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3">
        <h2 className="text-sm font-semibold text-zinc-900">Recent session flows</h2>
        <p className="mt-0.5 text-xs text-zinc-600">Latest tracked sessions with source, locale, and ordered event sequence.</p>
      </div>
      <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-700">
          <tr>
            <th className="px-4 py-2 font-medium">Started</th>
            <th className="px-4 py-2 font-medium">Session</th>
            <th className="px-4 py-2 font-medium">Source</th>
            <th className="px-4 py-2 font-medium">Locale</th>
            <th className="px-4 py-2 font-medium">Events</th>
            <th className="px-4 py-2 font-medium">Flow</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-zinc-800">
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-3 text-zinc-500" colSpan={6}>
                No session data yet.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.sessionId}>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-600">{row.startedAt}</td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">{row.sessionId.slice(0, 8)}</td>
                <td className="whitespace-nowrap px-4 py-3">{row.source}</td>
                <td className="whitespace-nowrap px-4 py-3">{row.locale}</td>
                <td className="whitespace-nowrap px-4 py-3">{formatNumber(row.events)}</td>
                <td className="max-w-[560px] px-4 py-3 text-xs text-zinc-700">{row.steps}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default async function AnalyticsAdminPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const range = resolveAnalyticsRange(resolvedSearchParams.range);
  const data = getAnalyticsDashboardData(range);
  const summary = data.summary;

  const primaryKpis = [
    {
      label: "Tracked sessions",
      value: formatNumber(summary.trackedSessions),
      detail: `${summary.rangeLabel} window`,
    },
    {
      label: "Landing visits",
      value: formatNumber(summary.landingVisits),
      detail: `${formatPercent(summary.demoConversionRate)} reached demo`,
    },
    {
      label: "Signup started",
      value: formatNumber(summary.signupStarted),
      detail: `${formatPercent(summary.signupStartRate)} of landing visits`,
    },
    {
      label: "CTA clicks",
      value: formatNumber(summary.ctaClicks),
      detail: `${formatNumber(summary.engagedSessions)} engaged sessions`,
    },
  ];

  const secondaryKpis = [
    {
      label: "New sessions",
      value: formatNumber(summary.newSessions),
      detail: `${formatPercent(summary.trackedSessions > 0 ? (summary.newSessions / summary.trackedSessions) * 100 : 0)} of tracked sessions`,
    },
    {
      label: "Returning sessions",
      value: formatNumber(summary.returningSessions),
      detail: `${formatPercent(summary.returningShare)} of tracked sessions`,
    },
    {
      label: "Demo opens",
      value: formatNumber(summary.demoOpens),
      detail: `${formatPercent(summary.demoConversionRate)} of landing visits`,
    },
    {
      label: "Signup completed",
      value: formatNumber(summary.signupCompleted),
      detail: data.hasSignupCompletionTracking
        ? `${formatPercent(summary.signupCompletionRate)} of signups`
        : "Not tracked end-to-end yet",
    },
  ];

  const funnelRows = [
    { label: "Landing visits", value: formatNumber(summary.landingVisits), note: "Tracked page loads after consent" },
    { label: "Demo opens", value: formatNumber(summary.demoOpens), note: formatPercent(summary.demoConversionRate) },
    { label: "Signup started", value: formatNumber(summary.signupStarted), note: formatPercent(summary.signupStartRate) },
    {
      label: "Signup completed",
      value: formatNumber(summary.signupCompleted),
      note: data.hasSignupCompletionTracking ? formatPercent(summary.signupCompletionRate) : "Missing app-side completion event",
    },
  ];

  return (
    <section className="space-y-6 pt-10 sm:pt-12 lg:pt-16">
      <header className="rounded-3xl border border-zinc-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Web analytics overview</h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-zinc-600">
              Decision-oriented dashboard for traffic, acquisition, CTA performance, pricing interest, and tracked
              session flows.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ANALYTICS_RANGE_OPTIONS.map((option) => {
              const isActive = option.key === range;
              return (
                <Link
                  key={option.key}
                  href={`/admin/analytics?range=${option.key}`}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-zinc-950 text-white"
                      : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <div className="grid gap-3 lg:grid-cols-4">
        {primaryKpis.map((card) => (
          <KpiCard key={card.label} label={card.label} value={card.value} detail={card.detail} />
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        {secondaryKpis.map((card) => (
          <KpiCard key={card.label} label={card.label} value={card.value} detail={card.detail} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <TrendBars points={data.trends} />

        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-zinc-900">Funnel snapshot</h2>
          <div className="space-y-2">
            {funnelRows.map((row) => (
              <div key={row.label} className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-zinc-800">{row.label}</span>
                  <span className="text-base font-semibold text-zinc-950">{row.value}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-600">{row.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <BreakdownTable
          title="Acquisition sources"
          subtitle="Bucketed source view based on first referrer seen for each tracked session."
          rows={data.sourceBuckets}
          valueLabel="Sessions"
        />
        <BreakdownTable
          title="Top referrer hosts"
          subtitle="More detailed host-level referral view than the source bucket table."
          rows={data.referrerHosts.slice(0, 10)}
          valueLabel="Sessions"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <BreakdownTable
          title="CTA performance"
          subtitle="Normalized CTA labels instead of raw path strings."
          rows={data.ctaBreakdown.slice(0, 12)}
          valueLabel="Clicks"
        />
        <BreakdownTable
          title="Pricing plan interest"
          subtitle="Signup starts segmented by pricing plan chosen from the landing page."
          rows={data.planBreakdown}
          valueLabel="Signups"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <BreakdownTable
          title="Locale split"
          subtitle="Landing traffic segmented by English and Slovak versions."
          rows={data.localeBreakdown}
          valueLabel="Visits"
        />
        <BreakdownTable
          title="Event mix"
          subtitle="Quick sanity check for what event types dominate the selected range."
          rows={data.eventBreakdown}
          valueLabel="Events"
        />
      </div>

      <FlowTable rows={data.recentFlows} />
    </section>
  );
}
