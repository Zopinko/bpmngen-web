type PrivacyPageProps = {
  locale: "en" | "sk";
};

const COPY = {
  en: {
    eyebrow: "Privacy",
    title: "How BPMN.GEN handles analytics on this website",
    intro:
      "This website uses first-party analytics only after you explicitly allow them in the consent banner.",
    sections: [
      {
        title: "What we store",
        body:
          "If you allow analytics, we create a random session identifier in your browser localStorage. We use it to understand repeat visits and basic navigation flows on bpmngen.com.",
      },
      {
        title: "What we collect",
        body:
          "We record page views, CTA clicks, requested page path, referrer, browser user-agent, and the generated session identifier. We do not load Google Analytics, Meta Pixel, or other third-party ad trackers on this site.",
      },
      {
        title: "When analytics run",
        body:
          "Analytics stay disabled until you click Allow analytics. If you reject analytics, no analytics events are sent and the local session identifier is removed.",
      },
    ],
    back: "Back to homepage",
  },
  sk: {
    eyebrow: "Súkromie",
    title: "Ako BPMN.GEN používa analytiku na tomto webe",
    intro:
      "Tento web používa iba first-party analytiku a to až po vašom výslovnom súhlase v consent lište.",
    sections: [
      {
        title: "Čo ukladáme",
        body:
          "Ak povolíte analytiku, v localStorage prehliadača vytvoríme náhodný identifikátor relácie. Používame ho na základné pochopenie opakovaných návštev a pohybu po bpmngen.com.",
      },
      {
        title: "Čo zbierame",
        body:
          "Zaznamenávame zobrazenia stránok, kliky na CTA, navštívenú cestu, referrer, user-agent prehliadača a vytvorený identifikátor relácie. Na tomto webe nenačítavame Google Analytics, Meta Pixel ani iné reklamné trackery tretích strán.",
      },
      {
        title: "Kedy analytika beží",
        body:
          "Analytika je vypnutá, kým nekliknete na Povoliť analytiku. Ak analytiku odmietnete, žiadne analytické eventy sa neposielajú a lokálny identifikátor relácie sa odstráni.",
      },
    ],
    back: "Späť na homepage",
  },
} as const;

function homeHref(locale: "en" | "sk"): string {
  return locale === "sk" ? "/sk" : "/";
}

export function PrivacyPage({ locale }: PrivacyPageProps) {
  const copy = COPY[locale];

  return (
    <div className="space-y-8 py-6 sm:space-y-10 sm:py-8">
      <section className="rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,#09090b_0%,#111827_42%,#1c1917_100%)] px-6 py-8 shadow-[0_24px_90px_rgba(0,0,0,0.42)] sm:px-8 sm:py-10 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/72">{copy.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-stone-50 sm:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-stone-300 sm:text-lg">{copy.intro}</p>
      </section>

      <section className="grid gap-4">
        {copy.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,#111827_0%,#0f172a_100%)] px-6 py-6 sm:px-8"
          >
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-stone-50">{section.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-300/80 sm:text-base">{section.body}</p>
          </article>
        ))}
      </section>

      <div className="pb-4">
        <a
          href={homeHref(locale)}
          className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-stone-100 transition hover:bg-white/[0.08]"
        >
          {copy.back}
        </a>
      </div>
    </div>
  );
}
