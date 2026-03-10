import type { Metadata } from "next";
import {
  getAnalyticsSummaryStats,
  listAnalyticsEvents,
  listAnalyticsPathCountsForEvent,
  listRecentSessionFlows,
} from "@/lib/analytics-db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AnalyticsAdminPage() {
  const events = listAnalyticsEvents();
  const linkClickCounts = listAnalyticsPathCountsForEvent("link_click");
  const recentSessionFlows = listRecentSessionFlows(20);
  const summary = getAnalyticsSummaryStats();
  const demoConversion =
    summary.landingVisits > 0 ? (summary.demoOpens / summary.landingVisits) * 100 : 0;
  const summaryCards = [
    { label: "Landing visits", value: summary.landingVisits.toString() },
    { label: "Demo opens", value: summary.demoOpens.toString() },
    { label: "CTA clicks", value: summary.ctaClicks.toString() },
    { label: "Paid clicked", value: summary.paidClicked.toString() },
    { label: "Signup started", value: summary.signupStarted.toString() },
    { label: "Signup completed", value: summary.signupCompleted.toString() },
    { label: "Unique sessions", value: summary.uniqueSessions.toString() },
    { label: "Demo conversion", value: `${demoConversion.toFixed(1)}%` },
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Analytics events</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-8">
        {summaryCards.map((card) => (
          <article key={card.label} className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
            <p className="text-xs font-medium text-zinc-500">{card.label}</p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-zinc-900">{card.value}</p>
          </article>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3">
          <h2 className="text-sm font-medium text-zinc-700">Recent User Flows</h2>
        </div>
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-700">
            <tr>
              <th className="px-4 py-3 font-medium">session</th>
              <th className="px-4 py-3 font-medium">flow</th>
              <th className="px-4 py-3 font-medium">started_at</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-zinc-800">
            {recentSessionFlows.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-zinc-500" colSpan={3}>
                  No session flows yet.
                </td>
              </tr>
            ) : (
              recentSessionFlows.map((sessionFlow) => (
                <tr key={sessionFlow.session_id}>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">
                    {sessionFlow.session_id.length > 8
                      ? `${sessionFlow.session_id.slice(0, 8)}...`
                      : sessionFlow.session_id}
                  </td>
                  <td className="px-4 py-3">{sessionFlow.flow}</td>
                  <td className="whitespace-nowrap px-4 py-3">{sessionFlow.started_at}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-700">
            <tr>
              <th className="px-4 py-3 font-medium">link target (path)</th>
              <th className="px-4 py-3 font-medium">clicks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-zinc-800">
            {linkClickCounts.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-zinc-500" colSpan={2}>
                  No link clicks yet.
                </td>
              </tr>
            ) : (
              linkClickCounts.map((row) => (
                <tr key={row.path}>
                  <td className="px-4 py-3">{row.path}</td>
                  <td className="whitespace-nowrap px-4 py-3">{row.total}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-700">
            <tr>
              <th className="px-4 py-3 font-medium">created_at</th>
              <th className="px-4 py-3 font-medium">event_name</th>
              <th className="px-4 py-3 font-medium">path</th>
              <th className="px-4 py-3 font-medium">session_id</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-zinc-800">
            {events.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-zinc-500" colSpan={4}>
                  No events yet.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td className="whitespace-nowrap px-4 py-3">{event.created_at}</td>
                  <td className="whitespace-nowrap px-4 py-3">{event.event_name}</td>
                  <td className="px-4 py-3">{event.path}</td>
                  <td className="px-4 py-3 font-mono text-xs">{event.session_id ?? "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
