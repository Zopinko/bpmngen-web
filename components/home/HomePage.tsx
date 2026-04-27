import { AnalyticsConsentBanner } from "@/components/AnalyticsConsentBanner";
import { LandingPageViewTracker } from "@/components/LandingPageViewTracker";
import { TrackEventLink } from "@/components/TrackEventLink";
import { type HomePageContent } from "@/content/home/types";

function localePath(locale: "en" | "sk", path = "/") {
  if (locale === "sk") {
    return path === "/" ? "/sk" : `/sk${path}`;
  }
  return path;
}

function ctaPath(locale: "en" | "sk", cta: string) {
  const base = localePath(locale);
  return `${base}?cta=${cta}`;
}

function SectionIntro({
  eyebrow,
  title,
  text,
  extra,
}: {
  eyebrow: string;
  title: string;
  text: string;
  extra?: string;
}) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/72">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-4xl">{title}</h2>
      <p className="max-w-2xl whitespace-pre-line text-sm leading-7 text-stone-300/78 sm:text-base">{text}</p>
      {extra ? <p className="max-w-2xl text-sm font-medium text-amber-100/80 sm:text-base">{extra}</p> : null}
    </div>
  );
}

export function HomePage({ content }: { content: HomePageContent }) {
  const altLocale = content.locale === "en" ? "sk" : "en";
  const altLocaleHref = localePath(altLocale);

  return (
    <div className="space-y-8 sm:space-y-10">
      <LandingPageViewTracker />
      <AnalyticsConsentBanner locale={content.locale} />

      <section className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.12),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(217,119,6,0.10),_transparent_24%),linear-gradient(135deg,#09090b_0%,#111827_42%,#1c1917_100%)] px-6 py-8 shadow-[0_24px_90px_rgba(0,0,0,0.42)] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div
          aria-hidden="true"
          className="absolute left-[8%] top-[12%] h-24 w-24 rounded-full bg-amber-400/14 blur-3xl sm:h-32 sm:w-32"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[12%] right-[12%] h-32 w-32 rounded-full bg-orange-300/10 blur-3xl sm:h-40 sm:w-40"
        />

        <div className="relative mb-8 flex items-center justify-between gap-4 border-b border-white/8 pb-4">
          <a href={localePath(content.locale)} className="text-sm font-semibold tracking-[-0.02em] text-stone-50">
            BPMN.GEN
          </a>

          <div className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <a href="#features" className="transition hover:text-stone-50">{content.nav.product}</a>
            <a href="#pricing" className="transition hover:text-stone-50">{content.nav.pricing}</a>
            <a href="#faq" className="transition hover:text-stone-50">{content.nav.faq}</a>
            <a
              href={altLocaleHref}
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100 transition hover:bg-white/[0.08]"
            >
              {altLocale.toUpperCase()}
            </a>
          </div>

          <TrackEventLink
            href="https://app.bpmngen.com/demo"
            events={[
              { eventName: "demo_opened" },
              { eventName: "link_click", path: ctaPath(content.locale, "header_try_app") },
            ]}
            className="inline-flex items-center rounded-full border border-white/16 bg-white/[0.05] px-4 py-2 text-sm font-medium text-stone-50 transition hover:bg-white/[0.08]"
          >
            {content.nav.primaryCta}
          </TrackEventLink>
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100 shadow-sm backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              {content.hero.badge}
            </div>

            <div className="space-y-5">
              <h1 className="max-w-5xl text-4xl font-semibold tracking-[-0.06em] text-stone-50 sm:text-5xl lg:text-6xl">
                {content.hero.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-stone-300 sm:text-lg">{content.hero.subtitle}</p>
              <p className="max-w-2xl text-sm font-medium tracking-[0.01em] text-amber-100/80 sm:text-base">
                {content.hero.supportingLine}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackEventLink
                href="https://app.bpmngen.com/demo"
                events={[
                  { eventName: "demo_opened" },
                  { eventName: "link_click", path: ctaPath(content.locale, "hero_try_app") },
                ]}
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(180deg,#fbbf24_0%,#d97706_100%)] px-6 py-3 text-sm font-semibold text-stone-950 shadow-[0_14px_30px_rgba(217,119,6,0.24)] transition hover:brightness-110"
              >
                {content.hero.primaryCta}
              </TrackEventLink>
              <TrackEventLink
                href="#pricing"
                eventNames={["link_click"]}
                path={ctaPath(content.locale, "hero_see_pricing")}
                className="inline-flex items-center justify-center rounded-full border border-amber-200/18 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-stone-100 transition hover:border-amber-200/38 hover:bg-white/[0.08]"
              >
                {content.hero.secondaryCta}
              </TrackEventLink>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {content.hero.proofPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/8 bg-black/18 px-4 py-4 text-sm leading-6 text-stone-200 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] backdrop-blur-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-amber-100/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.98),rgba(28,25,23,0.94))] p-4 text-white shadow-[0_30px_70px_rgba(0,0,0,0.44)] sm:p-5">
              <div className="flex items-center justify-between border-b border-white/8 pb-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200/62">{content.flow.eyebrow}</p>
                  <p className="mt-1 text-sm text-stone-400">{content.flow.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-amber-200/55">{content.flow.inputLabel}</p>
                      <p className="text-sm leading-6 text-stone-200/86">{content.flow.inputText}</p>
                    </div>
                    <span className="rounded-full bg-amber-400/12 px-2.5 py-1 text-[11px] font-semibold text-amber-100">
                      {content.flow.inputBadge}
                    </span>
                  </div>
                </div>

                <div className="grid gap-3">
                  {content.flow.steps.map((lane, index) => (
                    <div
                      key={lane.title}
                      className="rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(245,158,11,0.12),rgba(255,255,255,0.02))] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.07] text-xs font-semibold text-amber-100">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-stone-50">{lane.title}</p>
                          <p className="mt-1 text-xs leading-5 text-stone-300/72">{lane.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-amber-200/12 bg-amber-400/[0.08] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-amber-200/62">{content.flow.outputLabel}</p>
                      <p className="mt-1 text-sm font-semibold text-stone-50">{content.flow.outputText}</p>
                    </div>
                    <div className="rounded-full bg-amber-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-950">
                      {content.flow.outputBadge}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,#111827_0%,#0f172a_100%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
        <SectionIntro
          eyebrow={content.positioning.eyebrow}
          title={content.positioning.title}
          text={content.positioning.text}
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {content.positioning.cards.map((column) => (
            <article
              key={column.title}
              className="rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/70">{column.eyebrow}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-stone-50">{column.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-300/78">{column.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-100/8 bg-[linear-gradient(180deg,#0c0a09_0%,#111827_100%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
        <SectionIntro
          eyebrow={content.howItWorks.eyebrow}
          title={content.howItWorks.title}
          text={content.howItWorks.text}
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {content.flow.steps.map((lane, index) => (
            <article
              key={lane.title}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(251,191,36,0.95),rgba(217,119,6,0.28))]"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/68">Step {index + 1}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-stone-50">{lane.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-300/76">{lane.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,#111827_0%,#0c0a09_100%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
        <SectionIntro
          eyebrow={content.pricing.eyebrow}
          title={content.pricing.title}
          text={content.pricing.text}
          extra={content.pricing.extra}
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {content.pricing.cards.map((card) => (
            <article
              key={card.name}
              className={`rounded-[1.75rem] border p-6 ${
                card.featured
                  ? "border-amber-300/40 bg-[linear-gradient(180deg,rgba(251,191,36,0.12)_0%,rgba(120,53,15,0.18)_100%)] shadow-[0_20px_44px_rgba(217,119,6,0.18)]"
                  : "border-white/8 bg-white/[0.03]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-stone-50">{card.name}</h3>
                  <p className="mt-2 text-sm text-stone-400">{card.seats}</p>
                </div>
                {card.featured ? (
                  <span className="rounded-full bg-amber-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-950">
                    {content.pricing.featuredLabel}
                  </span>
                ) : null}
              </div>

              <p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-amber-200/70">{content.pricing.openTestingLabel}</p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-stone-50">{content.pricing.freeDuringTesting}</p>
              <p className="mt-2 text-sm text-stone-500 line-through">{card.price}</p>
              <p className="mt-6 text-sm leading-7 text-stone-300/78">{card.highlight}</p>

              <TrackEventLink
                href="https://app.bpmngen.com/signup"
                appendSessionIdToSignup
                events={[
                  { eventName: "paid_clicked" },
                  { eventName: "signup_started", path: ctaPath(content.locale, `pricing_signup&plan=${card.name.toLowerCase()}`) },
                  { eventName: "link_click", path: ctaPath(content.locale, `pricing_signup&plan=${card.name.toLowerCase()}`) },
                ]}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  card.featured
                    ? "bg-[linear-gradient(180deg,#fbbf24_0%,#d97706_100%)] text-stone-950 hover:brightness-110"
                    : "border border-white/10 bg-white/[0.05] text-stone-50 hover:border-amber-200/30 hover:bg-white/[0.08]"
                }`}
              >
                {content.pricing.cta}
              </TrackEventLink>
              <p className="mt-3 text-center text-sm text-stone-400">{content.pricing.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
        <SectionIntro eyebrow={content.faq.eyebrow} title={content.faq.title} text={content.faq.text} />

        <div className="mt-8 space-y-3">
          {content.faq.items.map((item) => (
            <details key={item.q} className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-stone-50">
                {item.q}
              </summary>
              <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-7 text-stone-300/78">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,#111827_0%,#0f172a_100%)] px-6 py-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>{content.footer.rights.replace("{year}", new Date().getFullYear().toString())}</p>
          <div className="flex items-center gap-3">
            <a href="#features" className="transition hover:text-stone-50">{content.nav.product}</a>
            <a href="#pricing" className="transition hover:text-stone-50">{content.nav.pricing}</a>
            <a href="#faq" className="transition hover:text-stone-50">{content.nav.faq}</a>
            <a href={localePath(content.locale, "/privacy")} className="transition hover:text-stone-50">{content.footer.privacy}</a>
            <a href={altLocaleHref} className="transition hover:text-stone-50">{altLocale.toUpperCase()}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

