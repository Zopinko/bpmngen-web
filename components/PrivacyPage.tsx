import { AnalyticsConsentControls } from "@/components/AnalyticsConsentControls";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { homeContentEn } from "@/content/home/en";
import { homeContentSk } from "@/content/home/sk";
import { ANALYTICS_RETENTION_DAYS } from "@/lib/analytics-db";

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
      {
        title: "How long we keep analytics data",
        body: `Analytics events are automatically deleted after ${ANALYTICS_RETENTION_DAYS} days.`,
      },
    ],
    controlsTitle: "Privacy controls",
    back: "Back to homepage",
  },
  sk: {
    eyebrow: "Súkromie",
    title: "Ako BPMN.GEN používa analytiku na tomto webe",
    intro:
      "Tento web používa iba vlastnú (first-party) analytiku, a to až po vašom výslovnom súhlase v lište o súhlase.",
    sections: [
      {
        title: "Čo ukladáme",
        body:
          "Ak povolíte analytiku, v localStorage prehliadača vytvoríme náhodný identifikátor relácie. Používame ho na základné pochopenie opakovaných návštev a pohybu po bpmngen.com.",
      },
      {
        title: "Čo zbierame",
        body:
          "Zaznamenávame zobrazenia stránok, kliky na výzvy (CTA), navštívenú cestu, referrer, user-agent prehliadača a vytvorený identifikátor relácie. Na tomto webe nenačítavame Google Analytics, Meta Pixel ani iné reklamné trackery tretích strán.",
      },
      {
        title: "Kedy analytika beží",
        body:
          "Analytika je vypnutá, kým nekliknete na Povoliť analytiku. Ak analytiku odmietnete, žiadne analytické udalosti sa neposielajú a lokálny identifikátor relácie sa odstráni.",
      },
      {
        title: "Ako dlho dáta držíme",
        body: `Analytické udalosti sa automaticky mažú po ${ANALYTICS_RETENTION_DAYS} dňoch.`,
      },
    ],
    controlsTitle: "Ovládanie súkromia",
    back: "Späť na hlavnú stránku",
  },
} as const;

function homeHref(locale: "en" | "sk"): string {
  return locale === "sk" ? "/sk" : "/";
}

export function PrivacyPage({ locale }: PrivacyPageProps) {
  const copy = COPY[locale];
  const home = locale === "sk" ? homeContentSk : homeContentEn;
  const altLocaleHref = locale === "sk" ? "/privacy" : "/sk/privacy";

  return (
    <>
      <SiteHeader locale={locale} nav={home.nav} altLocaleHref={altLocaleHref} />
      <main className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="mt-3 text-[32px] font-semibold leading-[1.12] tracking-[-0.03em] text-fg sm:text-[40px]">{copy.title}</h1>
        <p className="mt-4 text-[16px] leading-7 text-fg-2">{copy.intro}</p>

        <article className="mt-10 rounded-xl border border-line-strong bg-panel p-6">
          <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-fg">{copy.controlsTitle}</h2>
          <div className="mt-4">
            <AnalyticsConsentControls locale={locale} />
          </div>
        </article>

        <div className="mt-3 divide-y divide-line rounded-xl border border-line bg-card">
          {copy.sections.map((section) => (
            <section key={section.title} className="p-6">
              <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-fg">{section.title}</h2>
              <p className="mt-2 text-[14.5px] leading-7 text-fg-2">{section.body}</p>
            </section>
          ))}
        </div>

        <a href={homeHref(locale)} className="btn mt-10">
          <span aria-hidden="true">←</span>
          {copy.back}
        </a>
      </main>
      <SiteFooter locale={locale} nav={home.nav} footer={home.footer} altLocaleHref={altLocaleHref} />
    </>
  );
}
