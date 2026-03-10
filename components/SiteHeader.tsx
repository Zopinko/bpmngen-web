import Link from "next/link";
import { TrackEventLink } from "@/components/TrackEventLink";

const navLinks = [
  { href: "#features", label: "Product" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold tracking-[-0.02em] text-white">
            BPMN.GEN
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/75 md:flex">
            {navLinks.map((link) => (
              <TrackEventLink
                key={link.href}
                href={link.href}
                eventNames={["link_click"]}
                path={`/?cta=header_${link.label.toLowerCase()}`}
                className="rounded-md px-2 py-1 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </TrackEventLink>
            ))}
          </nav>

          <TrackEventLink
            href="https://app.bpmngen.com/demo"
            events={[
              { eventName: "demo_opened" },
              { eventName: "link_click", path: "/?cta=header_try_app" },
            ]}
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          >
            Try the App
          </TrackEventLink>
        </div>

        <nav className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-sm text-white/75 md:hidden">
          {navLinks.map((link) => (
            <TrackEventLink
              key={link.href}
              href={link.href}
              eventNames={["link_click"]}
              path={`/?cta=header_mobile_${link.label.toLowerCase()}`}
              className="rounded-md px-2 py-1 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </TrackEventLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
