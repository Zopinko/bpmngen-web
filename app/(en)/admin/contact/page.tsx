import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_RETENTION_DAYS, listContactMessages } from "@/lib/contact";

// Protected by Basic Auth in proxy.ts (matcher /admin/:path*).
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Contact messages | BPMN.GEN admin",
  robots: { index: false, follow: false },
};

function formatDate(value: string): string {
  // SQLite stores UTC as "YYYY-MM-DD HH:MM:SS".
  const date = new Date(`${value.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("sk-SK", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Bratislava",
  }).format(date);
}

export default function ContactMessagesPage() {
  const messages = listContactMessages();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-16">
        <header className="rounded-3xl border border-zinc-200 bg-white px-6 py-5 shadow-sm">
          <p className="text-xs font-medium text-zinc-500">
            <Link href="/admin/analytics" className="underline-offset-2 hover:text-zinc-900 hover:underline">
              Analytics
            </Link>{" "}
            · Contact messages
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">Contact messages</h1>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            {messages.length} message{messages.length === 1 ? "" : "s"} from the contact form. Messages are deleted
            automatically after {CONTACT_RETENTION_DAYS} days.
          </p>
        </header>

        {messages.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center text-sm text-zinc-500">
            No messages yet.
          </p>
        ) : (
          <ul className="mt-6 space-y-3">
            {messages.map((message) => (
              <li key={message.id} className="rounded-2xl border border-zinc-200 bg-white p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-sm font-semibold text-zinc-950">
                    {message.name}
                    {message.company ? <span className="font-normal text-zinc-500"> · {message.company}</span> : null}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {formatDate(message.createdAt)} · {message.locale.toUpperCase()}
                  </p>
                </div>
                <a
                  href={`mailto:${encodeURIComponent(message.email)}`}
                  className="mt-0.5 inline-block text-sm text-indigo-700 hover:underline"
                >
                  {message.email}
                </a>
                <p className="mt-3 whitespace-pre-line break-words text-sm leading-6 text-zinc-700">{message.message}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
