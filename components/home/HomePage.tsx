import { AnalyticsConsentBanner } from "@/components/AnalyticsConsentBanner";
import { LandingPageViewTracker } from "@/components/LandingPageViewTracker";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackEventLink } from "@/components/TrackEventLink";
import { AppPreview } from "@/components/home/AppPreview";
import { DemoSection } from "@/components/home/DemoSection";
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
    <div className="max-w-2xl space-y-3">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] text-fg sm:text-[34px]">{title}</h2>
      <p className="whitespace-pre-line text-[15px] leading-7 text-fg-2">{text}</p>
      {extra ? <p className="text-[15px] font-medium text-accent-text">{extra}</p> : null}
    </div>
  );
}

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">{children}</div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 flex-none text-accent" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomePage({ content }: { content: HomePageContent }) {
  const altLocaleHref = localePath(content.locale === "en" ? "sk" : "en");
  const demoHref = `https://app.bpmngen.com/demo?lang=${content.locale}`;

  return (
    <>
      <LandingPageViewTracker />
      <AnalyticsConsentBanner locale={content.locale} />
      <SiteHeader locale={content.locale} nav={content.nav} altLocaleHref={altLocaleHref} />

      <main>
        {/* hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(129,131,255,0.13),transparent_70%)]"
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-20">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-3 py-1 text-[12px] font-medium text-fg-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {content.hero.badge}
              </span>
              <h1 className="mt-6 text-[36px] font-semibold leading-[1.08] tracking-[-0.035em] text-fg sm:text-5xl lg:text-[56px]">
                {content.hero.title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-fg-2 sm:text-[17px]">{content.hero.subtitle}</p>
              <p className="mt-3 text-[15px] font-medium text-accent-text">{content.hero.supportingLine}</p>

              <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
                <TrackEventLink
                  href={demoHref}
                  appendSessionIdToSignup
                  events={[
                    { eventName: "demo_opened" },
                    { eventName: "link_click", path: ctaPath(content.locale, "hero_try_app") },
                  ]}
                  className="btn btn-primary btn-lg"
                >
                  {content.hero.primaryCta}
                  <span aria-hidden="true">→</span>
                </TrackEventLink>
                <TrackEventLink
                  href="#pricing"
                  eventNames={["link_click"]}
                  path={ctaPath(content.locale, "hero_see_pricing")}
                  className="btn btn-lg"
                >
                  {content.hero.secondaryCta}
                </TrackEventLink>
              </div>
            </div>

            <div className="mx-auto mt-14 max-w-5xl">
              <AppPreview flow={content.flow} />
            </div>

            <ul className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-3">
              {content.hero.proofPoints.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14px] leading-6 text-fg-2">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <DemoSection
          locale={content.locale}
          content={content.demo}
          trackingPath={ctaPath(content.locale, "embedded_demo")}
          fullscreenTrackingPath={ctaPath(content.locale, "demo_fullscreen")}
        />

        <Section id="features">
          <SectionIntro
            eyebrow={content.positioning.eyebrow}
            title={content.positioning.title}
            text={content.positioning.text}
          />
          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {content.positioning.cards.map((card) => (
              <article key={card.title} className="rounded-xl border border-line bg-card p-6">
                <p className="text-[12px] font-medium text-fg-3">{card.eyebrow}</p>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.02em] text-fg">{card.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-fg-2">{card.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section>
          <SectionIntro
            eyebrow={content.howItWorks.eyebrow}
            title={content.howItWorks.title}
            text={content.howItWorks.text}
          />
          <ol className="mt-10 grid gap-3 lg:grid-cols-3">
            {content.flow.steps.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-line bg-card p-6">
                <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-accent/12 font-mono text-[13px] font-medium text-accent-text">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.02em] text-fg">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-fg-2">{step.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="pricing">
          <SectionIntro
            eyebrow={content.pricing.eyebrow}
            title={content.pricing.title}
            text={content.pricing.text}
            extra={content.pricing.extra}
          />
          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {content.pricing.cards.map((card) => (
              <article
                key={card.name}
                className={`flex flex-col rounded-xl border p-6 ${
                  card.featured ? "border-accent/45 bg-[linear-gradient(180deg,rgba(129,131,255,0.09),rgba(20,20,23,1)_60%)]" : "border-line bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-fg">{card.name}</h3>
                    <p className="mt-1 text-[13px] text-fg-3">{card.seats}</p>
                  </div>
                  {card.featured ? (
                    <span className="rounded-md bg-accent/15 px-2 py-0.5 text-[12px] font-medium text-accent-text">
                      {content.pricing.featuredLabel}
                    </span>
                  ) : null}
                </div>

                <div className="mt-7">
                  <p className="text-[12px] font-medium text-fg-3">{content.pricing.openTestingLabel}</p>
                  <p className="mt-1 text-[26px] font-semibold tracking-[-0.03em] text-fg">{content.pricing.freeDuringTesting}</p>
                  <p className="mt-0.5 font-mono text-[13px] text-fg-3 line-through">{card.price}</p>
                </div>
                <p className="mt-5 flex-1 text-[14px] leading-6 text-fg-2">{card.highlight}</p>

                <TrackEventLink
                  href="https://app.bpmngen.com/register"
                  appendSessionIdToSignup
                  events={[
                    { eventName: "paid_clicked" },
                    { eventName: "signup_started", path: ctaPath(content.locale, `pricing_signup&plan=${card.name.toLowerCase()}`) },
                    { eventName: "link_click", path: ctaPath(content.locale, `pricing_signup&plan=${card.name.toLowerCase()}`) },
                  ]}
                  className={`btn mt-7 w-full ${card.featured ? "btn-primary" : ""}`}
                >
                  {content.pricing.cta}
                </TrackEventLink>
                <p className="mt-3 text-center text-[12.5px] text-fg-3">{content.pricing.note}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="faq">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <SectionIntro eyebrow={content.faq.eyebrow} title={content.faq.title} text={content.faq.text} />
            <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
              {content.faq.items.map((item) => (
                <details key={item.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[14.5px] font-medium text-fg transition hover:bg-raised [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4 flex-none text-fg-3 transition-transform group-open:rotate-45"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className="whitespace-pre-line px-5 pb-5 text-[14px] leading-6 text-fg-2">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* closing call to action */}
        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <h2 className="mx-auto max-w-2xl text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] text-fg sm:text-[34px]">
              {content.hero.supportingLine}
            </h2>
            <p className="mt-3 text-[15px] text-fg-2">{content.pricing.extra}</p>
            <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
              <TrackEventLink
                href={demoHref}
                appendSessionIdToSignup
                events={[
                  { eventName: "demo_opened" },
                  { eventName: "link_click", path: ctaPath(content.locale, "footer_try_app") },
                ]}
                className="btn btn-primary btn-lg"
              >
                {content.hero.primaryCta}
                <span aria-hidden="true">→</span>
              </TrackEventLink>
              <TrackEventLink
                href="https://app.bpmngen.com/register"
                appendSessionIdToSignup
                events={[
                  { eventName: "signup_started", path: ctaPath(content.locale, "footer_signup") },
                  { eventName: "link_click", path: ctaPath(content.locale, "footer_signup") },
                ]}
                className="btn btn-lg"
              >
                {content.pricing.cta}
              </TrackEventLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={content.locale} nav={content.nav} footer={content.footer} altLocaleHref={altLocaleHref} />
    </>
  );
}
