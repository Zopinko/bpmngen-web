import type { Metadata } from "next";
import {
  getAnalyticsSummaryStats,
  listAnalyticsPathCountsForEvent,
  listTrafficSourceCounts,
} from "@/lib/analytics-db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function sourceLabel(source: string): string {
  const labels: Record<string, string> = {
    direct: "Direct",
    google: "Google",
    linkedin: "LinkedIn",
    reddit: "Reddit",
    other: "Other",
  };
  return labels[source] ?? source;
}

export default async function AnalyticsAdminPage() {
  const linkClickCounts = listAnalyticsPathCountsForEvent("link_click");
  const sourceCounts = listTrafficSourceCounts(8);
  const summary = getAnalyticsSummaryStats();

  const demoConversion = summary.landingVisits > 0 ? (summary.demoOpens / summary.landingVisits) * 100 : 0;
  const signupCompletionRate = summary.signupStarted > 0 ? (summary.signupCompleted / summary.signupStarted) * 100 : 0;

  const primaryKpis = [
    { label: "Today visitors", value: summary.todayVisitors.toString() },
    { label: "New visitors", value: summary.newVisitors.toString() },
    { label: "Returning visitors", value: summary.returningVisitors.toString() },
    { label: "CTA clicks", value: summary.ctaClicks.toString() },
  ];

  const secondaryKpis = [
    { label: "Unique sessions", value: summary.uniqueSessions.toString() },
    { label: "Unique visitors", value: summary.uniqueVisitors.toString() },
  ];

  const funnelRows = [
    { label: "Landing visits", value: summary.landingVisits.toString() },
    { label: "Demo opens", value: summary.demoOpens.toString() },
    { label: "Signup started", value: summary.signupStarted.toString() },
    { label: "Signup completed", value: summary.signupCompleted.toString() },
    { label: "Demo conversion", value: `${demoConversion.toFixed(1)}%` },
    { label: "Signup completion", value: `${signupCompletionRate.toFixed(1)}%` },
  ];

  return (
    <section className="space-y-5">
      <header className="rounded-xl border border-zinc-200 bg-white px-5 py-4">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900">Web analytics overview</h1>
        <p className="mt-0.5 text-sm text-zinc-600">Simple marketing funnel snapshot: traffic, top sources, and key conversions.</p>
      </header>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {primaryKpis.map((card) => (
            <article key={card.label} className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">{card.label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">{card.value}</p>
            </article>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-3">
          {secondaryKpis.map((metric) => (
            <div
              key={metric.label}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs"
            >
              <span className="text-zinc-500">{metric.label}</span>
              <span className="font-semibold text-zinc-900">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-600">Funnel / performance</h2>
        <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {funnelRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2">
              <span className="text-xs text-zinc-600">{row.label}</span>
              <span className="text-sm font-semibold text-zinc-900">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Acquisition sources</h2>
          </div>
          <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-700">
              <tr>
                <th className="px-3 py-2 font-medium">Source</th>
                <th className="px-3 py-2 font-medium">Visitors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              {sourceCounts.length === 0 ? (
                <tr>
                  <td className="px-3 py-2 text-zinc-500" colSpan={2}>
                    No source data yet.
                  </td>
                </tr>
              ) : (
                sourceCounts.map((row) => (
                  <tr key={row.source}>
                    <td className="px-3 py-2 font-medium">{sourceLabel(row.source)}</td>
                    <td className="whitespace-nowrap px-3 py-2">{row.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Top clicked targets</h2>
          </div>
          <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-700">
              <tr>
                <th className="px-3 py-2 font-medium">Path</th>
                <th className="px-3 py-2 font-medium">Clicks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              {linkClickCounts.length === 0 ? (
                <tr>
                  <td className="px-3 py-2 text-zinc-500" colSpan={2}>
                    No link clicks yet.
                  </td>
                </tr>
              ) : (
                linkClickCounts.slice(0, 10).map((row) => (
                  <tr key={row.path}>
                    <td className="max-w-[420px] break-all px-3 py-2">{row.path}</td>
                    <td className="whitespace-nowrap px-3 py-2">{row.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
