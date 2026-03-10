import { listAnalyticsEvents, listAnalyticsPathCountsForEvent } from "@/lib/analytics-db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type AnalyticsAdminPageProps = {
  searchParams?: Promise<{ key?: string }>;
};

export default async function AnalyticsAdminPage({ searchParams }: AnalyticsAdminPageProps) {
  const params = (await searchParams) ?? {};
  const requiredKey = process.env.ANALYTICS_ADMIN_KEY;
  const providedKey = params.key;
  const isAllowed = !requiredKey || providedKey === requiredKey;

  if (!isAllowed) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Unauthorized. Provide the correct <code>key</code> query parameter.
      </div>
    );
  }

  const events = listAnalyticsEvents();
  const linkClickCounts = listAnalyticsPathCountsForEvent("link_click");

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Analytics events</h1>
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
