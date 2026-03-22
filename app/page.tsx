import { LandingPageViewTracker } from "@/components/LandingPageViewTracker";
import { TrackEventLink } from "@/components/TrackEventLink";

const lanes = [
  {
    title: "Start with the person who does the job",
    text: "Not a BPMN specialist. Not a blank diagram. Start with the person who actually does the work.",
  },
  {
    title: "The system builds a valid BPMN process for you",
    text: "BPMN.GEN converts real work into a structured process map without requiring BPMN knowledge.",
  },
  {
    title: "The company keeps and reuses it",
    text: "Instead of one diagram, you get a process your team can reuse, update, and build on.",
  },
];

const proofPoints = [
  "A key employee leaves - your process stays",
  "New hires learn faster - less shadowing, less chaos",
  "Work stays consistent - no more everyone does it differently",
];

const featureColumns = [
  {
    eyebrow: "Core insight",
    title: "The problem is not drawing diagrams",
    text: "Processes live in people, not in your system.",
  },
  {
    eyebrow: "Access",
    title: "Anyone can describe a process",
    text: "No BPMN training. No consulting mindset. Just describe the work as it happens.",
  },
  {
    eyebrow: "Organizational value",
    title: "Processes do not disappear anymore",
    text: "Instead of lost knowledge and outdated PDFs, your company builds reusable process maps.",
  },
];

const pricingCards = [
  {
    name: "Starter",
    seats: "Single user",
    price: "29 EUR/mo",
    highlight: "Best for one person capturing and documenting how work actually happens.",
  },
  {
    name: "Team",
    seats: "Up to 5 users",
    price: "99 EUR/mo",
    highlight: "Best for teams turning tacit knowledge into shared reusable process maps.",
    featured: true,
  },
  {
    name: "Business",
    seats: "Up to 20 users",
    price: "259 EUR/mo",
    highlight: "Best for organizations building a durable process layer across teams.",
  },
];

const faqs = [
  {
    q: "Is BPMN.GEN a BPMN editor?",
    a: "No. You do not draw diagrams. You describe how work happens, and the system builds the process for you.",
  },
  {
    q: "Is this just another AI generator?",
    a: "No. BPMN.GEN uses a structured engine to build valid process maps. It is not random output. It is controlled, consistent, and usable.",
  },
  {
    q: "Who is this for?",
    a: "Teams where work depends on specific people, onboarding takes too long, and processes are inconsistent or unclear.",
  },
];

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
      <p className="max-w-2xl text-sm leading-7 text-stone-300/78 sm:text-base whitespace-pre-line">{text}</p>
      {extra ? <p className="max-w-2xl text-sm font-medium text-amber-100/80 sm:text-base">{extra}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <LandingPageViewTracker />

      <section className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.12),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(217,119,6,0.10),_transparent_24%),linear-gradient(135deg,#09090b_0%,#111827_42%,#1c1917_100%)] px-6 py-8 shadow-[0_24px_90px_rgba(0,0,0,0.42)] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-[48%] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0)),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_48px)] lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute left-[8%] top-[12%] h-24 w-24 rounded-full bg-amber-400/14 blur-3xl sm:h-32 sm:w-32"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[12%] right-[12%] h-32 w-32 rounded-full bg-orange-300/10 blur-3xl sm:h-40 sm:w-40"
        />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100 shadow-sm backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Process thinking for normal teams
            </div>

            <div className="space-y-5">
              <h1 className="max-w-5xl text-4xl font-semibold tracking-[-0.06em] text-stone-50 sm:text-5xl lg:text-6xl">
                Document how work actually happens without learning BPMN.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-stone-300 sm:text-lg">
                Not a BPMN editor. Not an AI diagram generator. A system that helps your team capture real processes and turn them into clear, usable maps.
              </p>
              <p className="max-w-2xl text-sm font-medium tracking-[0.01em] text-amber-100/80 sm:text-base">
                Stop relying on people to remember how things work.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackEventLink
                href="https://app.bpmngen.com/demo"
                events={[
                  { eventName: "demo_opened" },
                  { eventName: "link_click", path: "/?cta=hero_try_app" },
                ]}
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(180deg,#fbbf24_0%,#d97706_100%)] px-6 py-3 text-sm font-semibold text-stone-950 shadow-[0_14px_30px_rgba(217,119,6,0.24)] transition hover:brightness-110"
              >
                Turn your first process into a map
              </TrackEventLink>
              <TrackEventLink
                href="#pricing"
                eventNames={["link_click"]}
                path="/?cta=hero_see_pricing"
                className="inline-flex items-center justify-center rounded-full border border-amber-200/18 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-stone-100 transition hover:border-amber-200/38 hover:bg-white/[0.08]"
              >
                See pricing
              </TrackEventLink>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {proofPoints.map((item) => (
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200/62">Workflow preview</p>
                  <p className="mt-1 text-sm text-stone-400">Real work -&gt; structured process -&gt; reusable knowledge</p>
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
                      <p className="text-xs uppercase tracking-[0.18em] text-amber-200/55">Input</p>
                      <p className="text-sm leading-6 text-stone-200/86">
                        The person doing the work describes what they actually do.
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-400/12 px-2.5 py-1 text-[11px] font-semibold text-amber-100">
                      Real work
                    </span>
                  </div>
                </div>

                <div className="grid gap-3">
                  {lanes.map((lane, index) => (
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
                      <p className="text-xs uppercase tracking-[0.18em] text-amber-200/62">Output</p>
                      <p className="mt-1 text-sm font-semibold text-stone-50">A clear, BPMN-based process your team can actually use</p>
                    </div>
                    <div className="rounded-full bg-amber-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-950">
                      Ready
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
          eyebrow="Positioning"
          title="Most process tools start with diagrams. Yours should not."
          text={"Most tools assume your processes are already written down.\n\nThey are not.\n\nBPMN.GEN starts where the knowledge actually is, in people, and turns it into something your company can use."}
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {featureColumns.map((column) => (
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
          eyebrow="How It Works"
          title="From how we do it to a process your team can use"
          text={"Most tools skip this step.\nBPMN.GEN is built for the moment when the process only exists in peoples heads."}
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {lanes.map((lane, index) => (
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
          eyebrow="Pricing"
          title="Start simple. Scale with your team."
          text="Free during testing. Try it on a real process and see the difference."
          extra="Try it on your own process in under 5 minutes."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {pricingCards.map((card) => (
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
                    Popular
                  </span>
                ) : null}
              </div>

              <p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-amber-200/70">Open testing</p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-stone-50">Free during testing</p>
              <p className="mt-2 text-sm text-stone-500 line-through">{card.price}</p>
              <p className="mt-6 text-sm leading-7 text-stone-300/78">{card.highlight}</p>

              <TrackEventLink
                href="https://app.bpmngen.com/signup"
                appendSessionIdToSignup
                events={[
                  { eventName: "paid_clicked" },
                  { eventName: "signup_started", path: `/?cta=pricing_signup&plan=${card.name.toLowerCase()}` },
                  { eventName: "link_click", path: `/?cta=pricing_signup&plan=${card.name.toLowerCase()}` },
                ]}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  card.featured
                    ? "bg-[linear-gradient(180deg,#fbbf24_0%,#d97706_100%)] text-stone-950 hover:brightness-110"
                    : "border border-white/10 bg-white/[0.05] text-stone-50 hover:border-amber-200/30 hover:bg-white/[0.08]"
                }`}
              >
                Start free
              </TrackEventLink>
              <p className="mt-3 text-center text-sm text-stone-400">No setup. No BPMN knowledge needed.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
        <SectionIntro
          eyebrow="FAQ"
          title="What the product is, and what it is not."
          text="The distinction matters. BPMN.GEN is not another diagram editor. It helps teams capture how work actually happens and turn it into a usable process."
        />

        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <details key={item.q} className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-stone-50">
                {item.q}
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-300/78">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}



