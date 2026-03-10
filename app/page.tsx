import { LandingPageViewTracker } from "@/components/LandingPageViewTracker";
import { TrackEventLink } from "@/components/TrackEventLink";

const steps = [
  {
    title: "Describe",
    text: "Write your process story in plain language with actors, actions, and key decision points.",
  },
  {
    title: "Generate",
    text: "BPMN.GEN turns the story into a structured BPMN draft using a guided workflow.",
  },
  {
    title: "Validate",
    text: "Run correctness checks before sharing so your diagram is usable, not just pretty.",
  },
];

const features = [
  "Guided workflow (step-by-step)",
  "Deterministic engine (not a random AI generator)",
  "Validator for BPMN correctness",
  "Mentor suggestions (proposals with confidence/risk)",
  "Roles & lanes support",
  "Export-ready diagram output",
];

const pricingTiers = [
  {
    name: "Starter",
    price: "29 \u20AC/mo",
    subtitle: "Single user",
    items: ["1 user seat", "Guided generation", "BPMN validation", "Export-ready output"],
  },
  {
    name: "Team",
    price: "99 \u20AC/mo",
    subtitle: "Up to 5 users",
    items: ["Up to 5 seats", "Roles & lanes support", "Mentor suggestions", "Shared team usage"],
    featured: true,
  },
  {
    name: "Business",
    price: "259 \u20AC/mo",
    subtitle: "Up to 20 users",
    items: ["Up to 20 seats", "Advanced validation", "Priority support", "Scale-ready collaboration"],
  },
];

const faqs = [
  {
    q: "Is this an AI generator?",
    a: "No. BPMN.GEN uses a guided, deterministic workflow with structured suggestions instead of random diagram generation.",
  },
  {
    q: "Do I need BPMN knowledge?",
    a: "No. The product is designed for people who know the process but do not want to learn BPMN notation first.",
  },
  {
    q: "Can I export diagrams?",
    a: "Yes. BPMN.GEN produces export-ready diagram output for downstream use.",
  },
  {
    q: "How does validation work?",
    a: "The validator checks BPMN correctness rules and highlights issues before you finalize the map.",
  },
];

const heroSignals = ["Deterministic engine", "BPMN validator", "Guided workflow"];

const heroSectionSpacingClass = "py-10 sm:py-12 lg:py-14";
const panelSectionSpacingClass = "py-6 sm:py-8";

function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div className="mb-10 space-y-3 sm:mb-12">
      <p
        className={`text-xs font-medium uppercase tracking-[0.14em] ${
          isDark ? "text-white/60" : "text-zinc-500"
        }`}
      >
        {eyebrow}
      </p>
      <div className="space-y-2">
        <h2
          className={`text-2xl font-semibold tracking-tight sm:text-3xl ${
            isDark ? "text-white" : "text-zinc-900"
          }`}
        >
          {title}
        </h2>
        <p
          className={`max-w-2xl text-sm leading-6 sm:text-base ${
            isDark ? "text-white/80" : "text-zinc-700"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-0">
      <LandingPageViewTracker />
      <section className={heroSectionSpacingClass}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/70 via-white/55 to-white/45 p-6 ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent"
          />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-x-12">
            <div className="min-w-0 space-y-7">
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium tracking-[0.08em] text-zinc-800">
                Guided BPMN generation
              </span>

              <div className="space-y-4">
                <h1 className="max-w-3xl break-words text-3xl leading-tight font-semibold tracking-[-0.03em] text-zinc-900 sm:text-4xl lg:text-5xl">
                  <span className="block">Describe your process.</span>
                  <span className="block text-balance">
                    Get a structured and validated BPMN map.
                  </span>
                </h1>
                <div
                  aria-hidden="true"
                  className="h-px w-20 bg-gradient-to-r from-zinc-900/20 via-zinc-900/45 to-zinc-900/10"
                />
                <p className="max-w-2xl break-words text-base leading-7 text-zinc-700 sm:text-lg lg:leading-8">
                  Turn process stories into valid BPMN maps {"\u2014"} without learning BPMN.
                </p>
              </div>

              <div className="mb-8 space-y-3 sm:mb-10">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <TrackEventLink
                    href="https://app.bpmngen.com"
                    events={[
                      { eventName: "landing_try_demo_click" },
                      { eventName: "demo_opened" },
                      { eventName: "link_click", path: "/?cta=hero_try_app" },
                    ]}
                    className="inline-flex items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-[0_6px_16px_rgba(24,24,27,0.12)] transition hover:bg-zinc-800"
                  >
                    Try the App
                  </TrackEventLink>
                  <TrackEventLink
                    href="#pricing"
                    eventNames={["link_click"]}
                    path="/?cta=hero_see_pricing"
                    className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white/80 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
                  >
                    See pricing
                  </TrackEventLink>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-600">No BPMN knowledge required.</p>
                  <TrackEventLink
                    href="https://app.bpmngen.com/signup"
                    events={[
                      { eventName: "demo_create_account_click" },
                      { eventName: "link_click", path: "/?cta=hero_create_account" },
                    ]}
                    className="inline-flex text-xs font-medium text-zinc-700 underline decoration-zinc-400 underline-offset-4 transition hover:text-zinc-900"
                  >
                    Create account
                  </TrackEventLink>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                {heroSignals.map((signal) => (
                  <div key={signal} className="inline-flex items-center gap-2 text-sm text-zinc-700">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-zinc-400 shadow-[0_0_0_3px_rgba(161,161,170,0.14)]"
                    />
                    <span>{signal}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-zinc-200/70 bg-white/55 px-4 py-2 backdrop-blur-sm">
                <p className="text-sm leading-6 text-zinc-700">
                  <span className="font-medium text-zinc-900">
                    Built for teams in operations, finance, delivery, and consulting.
                  </span>
                </p>
              </div>
            </div>

            <div className="lg:w-[420px] lg:justify-self-end">
              <div className="rounded-2xl border border-zinc-200/80 bg-white/75 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm">
                <div className="rounded-xl border border-zinc-200/80 bg-white/80 p-4">
                  <div className="mb-4 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-zinc-300" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-full bg-zinc-300" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-full bg-zinc-300" aria-hidden="true" />
                    <span className="ml-2 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500">
                      Preview
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg border border-zinc-200 bg-zinc-50/80 p-3">
                      <div className="mb-2 h-2.5 w-28 rounded bg-zinc-200/80" />
                      <div className="h-2 w-full rounded bg-zinc-200/70" />
                      <div className="mt-2 h-2 w-5/6 rounded bg-zinc-200/60" />
                    </div>

                    <div className="flex items-center gap-3 px-1">
                      <div className="h-px flex-1 bg-zinc-200" />
                      <div className="text-[11px] uppercase tracking-[0.12em] text-zinc-400">
                        Generate
                      </div>
                      <div className="h-px flex-1 bg-zinc-200" />
                    </div>

                    <div className="space-y-2">
                      {[0, 1, 2].map((line) => (
                        <div key={line} className="flex items-center gap-3 rounded-lg bg-zinc-50/70 px-3 py-2">
                          <span className="h-5 w-5 rounded-md border border-zinc-200 bg-white" />
                          <div className="h-2 w-full rounded bg-zinc-200/80" />
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg border border-dashed border-zinc-200 bg-white/60 p-3">
                      <div className="mb-2 h-2.5 w-24 rounded bg-zinc-200/80" />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 rounded-md border border-zinc-200 bg-zinc-50/80" />
                        <div className="h-8 rounded-md border border-zinc-200 bg-zinc-50/80" />
                        <div className="h-8 rounded-md border border-zinc-200 bg-zinc-50/80" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={panelSectionSpacingClass}>
        <div className="rounded-3xl border border-white/10 bg-black/55 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Workflow"
            title="How it works"
            description="A simple flow for turning process descriptions into BPMN diagrams you can trust."
            tone="dark"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/60">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className={`scroll-mt-24 ${panelSectionSpacingClass}`}>
        <div className="rounded-3xl border border-white/10 bg-black/55 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Product"
            title="Built for serious process work"
            description="Minimal interface, structured outputs, and tools that keep BPMN quality high."
            tone="dark"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex min-h-28 items-start rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7"
              >
                <p className="text-sm leading-relaxed text-white/80">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className={`scroll-mt-24 ${panelSectionSpacingClass}`}>
        <div className="rounded-3xl border border-white/10 bg-black/55 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Plans"
            title="Pricing"
            description="Simple monthly plans for individuals, teams, and growing organizations."
            tone="dark"
          />

          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:mb-8 sm:p-5">
            <p className="text-sm font-medium text-white">Open testing — free access for everyone.</p>
            <p className="mt-1 text-sm leading-relaxed text-white/80">
              You can use BPMN.GEN freely during this phase. If we introduce paid plans later,
              you&apos;ll be notified in advance.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <article
                key={tier.name}
                className={`relative rounded-2xl border p-6 backdrop-blur-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7 ${
                  tier.featured
                    ? "border-white/25 bg-white/10 hover:border-white/35"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {tier.featured ? (
                  <span className="absolute right-4 top-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/80">
                    Most popular
                  </span>
                ) : null}

                <div className="space-y-2 pr-24">
                  <h3 className="text-lg font-semibold tracking-tight text-white">{tier.name}</h3>
                  <p className="text-xl font-medium tracking-tight text-white/50 line-through">
                    {tier.price}
                  </p>
                  <p className="text-base font-semibold tracking-tight text-white">
                    Free during testing
                  </p>
                  <p className="text-sm text-white/80">{tier.subtitle}</p>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-white/80">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <TrackEventLink
                  href="https://app.bpmngen.com"
                  events={[
                    { eventName: "demo_opened" },
                    {
                      eventName: "link_click",
                      path: `/?cta=pricing_start_free&plan=${tier.name.toLowerCase()}`,
                    },
                  ]}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                    tier.featured
                      ? "border-white bg-white text-zinc-900 hover:bg-white/90"
                      : "border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-white/30"
                  }`}
                >
                  Start free
                </TrackEventLink>
                <p className="mt-2 text-center text-sm text-white/60">No credit card required.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className={`scroll-mt-24 ${panelSectionSpacingClass}`}>
        <div className="rounded-3xl border border-white/10 bg-black/55 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Support"
            title="FAQ"
            description="Short answers to common questions about how BPMN.GEN works."
            tone="dark"
          />

          <div className="space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-200 ease-out open:border-white/20 hover:border-white/20 hover:bg-white/10 motion-reduce:transition-none sm:p-7"
              >
                <summary className="cursor-pointer list-none pr-6 text-sm font-medium text-white transition hover:text-white/90">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={panelSectionSpacingClass}>
        <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                Final CTA
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                Try BPMN.GEN and turn process stories into valid BPMN faster.
              </h2>
            </div>
            <TrackEventLink
              href="https://app.bpmngen.com"
              events={[
                { eventName: "demo_opened" },
                { eventName: "link_click", path: "/?cta=final_try_app" },
              ]}
              className="inline-flex items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Try the App
            </TrackEventLink>
          </div>
        </div>
      </section>
    </div>
  );
}
