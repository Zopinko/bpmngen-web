import { TrackEventLink } from "@/components/TrackEventLink";
import { type HomePageContent } from "@/content/home/types";

const APP_ORIGIN = "https://app.bpmngen.com";

type SiteHeaderProps = {
  locale: HomePageContent["locale"];
  nav: HomePageContent["nav"];
  /** Same page in the other language. */
  altLocaleHref: string;
};

function homeHref(locale: HomePageContent["locale"]) {
  return locale === "sk" ? "/sk" : "/";
}

function ctaPath(locale: HomePageContent["locale"], cta: string) {
  return `${homeHref(locale)}?cta=${cta}`;
}

/** Top bar modelled on the app's nav: 56px, hairline bottom border, brand mark, quiet links. */
export function SiteHeader({ locale, nav, altLocaleHref }: SiteHeaderProps) {
  const home = homeHref(locale);
  const altLocale = locale === "en" ? "sk" : "en";
  const sectionLinks = [
    { id: "features", label: nav.product },
    { id: "pricing", label: nav.pricing },
    { id: "faq", label: nav.faq },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-app/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href={home} className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.02em] text-fg">
          <span className="brand-mark" aria-hidden="true" />
          BPMN.Gen
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {sectionLinks.map((link) => (
            <TrackEventLink
              key={link.id}
              href={`${home}#${link.id}`}
              eventNames={["link_click"]}
              path={ctaPath(locale, `header_${link.id}`)}
              className="btn btn-ghost btn-sm"
            >
              {link.label}
            </TrackEventLink>
          ))}
          <a href={locale === "sk" ? "/sk/contact" : "/contact"} className="btn btn-ghost btn-sm">
            {nav.contact}
          </a>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={altLocaleHref}
            hrefLang={altLocale}
            className="btn btn-ghost btn-sm font-mono text-[12px] uppercase"
            aria-label={altLocale === "sk" ? "Slovensky" : "English"}
          >
            {altLocale}
          </a>
          <a href={`${APP_ORIGIN}/login`} className="btn btn-ghost btn-sm hidden sm:inline-flex">
            {nav.signIn}
          </a>
          <TrackEventLink
            href={`${APP_ORIGIN}/demo?lang=${locale}`}
            appendSessionIdToSignup
            events={[
              { eventName: "demo_opened" },
              { eventName: "link_click", path: ctaPath(locale, "header_try_app") },
            ]}
            className="btn btn-primary btn-sm"
          >
            {nav.primaryCta}
          </TrackEventLink>
        </div>
      </div>
    </header>
  );
}
