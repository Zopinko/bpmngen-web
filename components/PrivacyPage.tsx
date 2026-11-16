import { AnalyticsConsentControls } from "@/components/AnalyticsConsentControls";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { homeContentEn } from "@/content/home/en";
import { homeContentSk } from "@/content/home/sk";
import { ANALYTICS_RETENTION_DAYS, CONTACT_RETENTION_DAYS } from "@/lib/retention";
import { localizedPaths, type Locale } from "@/lib/site";

/**
 * Who runs BPMN.GEN (the data controller). While this is null the page says the service is in
 * test operation and points to the contact form; fill in the operator's name and address
 * (and company ID, if any) to name them explicitly.
 */
const OPERATOR: { name: string; address: string } | null = null;

type Section = { id: string; title: string; paragraphs?: string[]; items?: string[] };

type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  toc: string;
  controlsTitle: string;
  controlsText: string;
  operatorTitle: string;
  operatorKnown: (name: string, address: string) => string;
  operatorUnknown: string;
  contactCta: string;
  sections: Section[];
  back: string;
};

const contactDays = Math.round(CONTACT_RETENTION_DAYS / 30.4);

const COPY: Record<Locale, Copy> = {
  en: {
    eyebrow: "Privacy",
    title: "Privacy policy",
    intro:
      "What personal data BPMN.GEN processes on this website (bpmngen.com) and in the app (app.bpmngen.com), why, where it is kept and for how long.",
    updated: "Last updated: 16 November 2026",
    toc: "On this page",
    controlsTitle: "Analytics on this website",
    controlsText: "Analytics stay off until you allow them. You can change your choice here at any time.",
    operatorTitle: "Who is responsible",
    operatorKnown: (name, address) => `The controller of your personal data is ${name}, ${address}.`,
    operatorUnknown:
      "BPMN.GEN is currently in test operation. For anything about your personal data, including the requests below, use the contact form.",
    contactCta: "Contact form",
    sections: [
      {
        id: "website",
        title: "Website analytics",
        paragraphs: [
          "Only if you allow analytics, we create a random session identifier in your browser (localStorage) and record page views, clicks on calls to action, the visited path, the referrer, the browser user agent and that identifier. The same applies to the demo embedded on this page: it receives the identifier only after you allow analytics.",
          `We do not use Google Analytics, Meta Pixel or other third-party trackers. The legal basis is your consent, which you can withdraw at any time; rejecting also deletes the identifier from your browser. Analytics events are deleted automatically after ${ANALYTICS_RETENTION_DAYS} days.`,
        ],
      },
      {
        id: "contact",
        title: "Contact form",
        paragraphs: [
          "When you write to us we store your name, email address, optional company and your message, only so that we can reply and follow up on your request.",
          `The legal basis is our legitimate interest in answering you, or steps you ask for before a possible contract. Messages are deleted automatically after ${CONTACT_RETENTION_DAYS} days (about ${contactDays} months).`,
        ],
      },
      {
        id: "app",
        title: "The app",
        paragraphs: [
          "To run your account and the service we process the data below. The legal basis is the contract (the terms of using the service); for security records it is our legitimate interest in protecting the service.",
        ],
        items: [
          "Account: email address, preferred language, account creation and last login time. Your password is stored only as a salted hash (Argon2 or PBKDF2), never in readable form.",
          "Sign-in sessions: when the session was created and last used, IP address and browser user agent, to keep your account secure.",
          "Your content: processes, maps, notes, organizations and their members and invitations, and a log of recent changes in the organization.",
          "People in your processes: if you use the coverage overview, the names, numbers and positions of employees that you enter. Your organization decides what to enter; we process it only to provide the service.",
          "Emails: to send account emails (address verification, password reset, invitations) we pass your email address to our email delivery provider.",
        ],
      },
      {
        id: "ai",
        title: "No external AI processing",
        paragraphs: [
          "Process maps are built by our own rule-based engine. Your process descriptions are not sent to external AI services and are not used to train AI models.",
        ],
      },
      {
        id: "providers",
        title: "Where the data is kept",
        paragraphs: [
          "The website and the app run on Render (cloud hosting), where the data is stored on persistent disks. Traffic to bpmngen.com passes through Cloudflare (network and security). Account emails go through an email delivery provider. These providers process the data only on our behalf. Where a provider is outside the EU, the transfer relies on the European Commission's standard contractual clauses.",
        ],
      },
      {
        id: "retention",
        title: "How long we keep it",
        items: [
          `Website analytics: ${ANALYTICS_RETENTION_DAYS} days.`,
          `Contact messages: ${CONTACT_RETENTION_DAYS} days.`,
          "Account and content: as long as you have an account. You can ask us to delete your account and data through the contact form.",
        ],
      },
      {
        id: "rights",
        title: "Your rights",
        paragraphs: [
          "You have the right to access your data, to have it corrected or deleted, to restrict its processing, to data portability, to object to processing based on legitimate interest, and to withdraw consent at any time. Write to us through the contact form.",
          "You also have the right to lodge a complaint with a supervisory authority; in Slovakia this is the Office for Personal Data Protection of the Slovak Republic (dataprotection.gov.sk).",
        ],
      },
    ],
    back: "Back to homepage",
  },
  sk: {
    eyebrow: "Súkromie",
    title: "Ochrana osobných údajov",
    intro:
      "Aké osobné údaje BPMN.GEN spracúva na tomto webe (bpmngen.com) a v aplikácii (app.bpmngen.com), prečo, kde sú uložené a ako dlho.",
    updated: "Posledná aktualizácia: 16. novembra 2026",
    toc: "Na tejto stránke",
    controlsTitle: "Analytika na tomto webe",
    controlsText: "Analytika je vypnutá, kým ju nepovolíte. Svoju voľbu tu môžete kedykoľvek zmeniť.",
    operatorTitle: "Kto zodpovedá za údaje",
    operatorKnown: (name, address) => `Prevádzkovateľom vašich osobných údajov je ${name}, ${address}.`,
    operatorUnknown:
      "BPMN.GEN je momentálne v testovacej prevádzke. Vo všetkom, čo sa týka vašich osobných údajov, vrátane žiadostí nižšie, nás kontaktujte cez kontaktný formulár.",
    contactCta: "Kontaktný formulár",
    sections: [
      {
        id: "website",
        title: "Analytika na webe",
        paragraphs: [
          "Iba ak analytiku povolíte, vytvoríme vo vašom prehliadači (localStorage) náhodný identifikátor relácie a zaznamenávame zobrazenia stránok, kliky na výzvy, navštívenú cestu, referrer, user-agent prehliadača a tento identifikátor. To isté platí pre demo vložené na tejto stránke: identifikátor dostane až po povolení analytiky.",
          `Nepoužívame Google Analytics, Meta Pixel ani iné trackery tretích strán. Právnym základom je váš súhlas, ktorý môžete kedykoľvek odvolať; odmietnutím sa identifikátor z prehliadača aj vymaže. Analytické udalosti sa automaticky mažú po ${ANALYTICS_RETENTION_DAYS} dňoch.`,
        ],
      },
      {
        id: "contact",
        title: "Kontaktný formulár",
        paragraphs: [
          "Keď nám napíšete, uložíme vaše meno, e-mail, prípadne firmu a vašu správu, a to len preto, aby sme vám mohli odpovedať a vybaviť vašu požiadavku.",
          `Právnym základom je náš oprávnený záujem odpovedať vám, prípadne kroky pred uzavretím zmluvy na vašu žiadosť. Správy sa automaticky mažú po ${CONTACT_RETENTION_DAYS} dňoch (približne ${contactDays} mesiacov).`,
        ],
      },
      {
        id: "app",
        title: "Aplikácia",
        paragraphs: [
          "Na vedenie vášho účtu a poskytovanie služby spracúvame údaje nižšie. Právnym základom je zmluva (podmienky používania služby); pri bezpečnostných záznamoch náš oprávnený záujem chrániť službu.",
        ],
        items: [
          "Účet: e-mailová adresa, preferovaný jazyk, čas vytvorenia účtu a posledného prihlásenia. Heslo ukladáme iba ako solený hash (Argon2 alebo PBKDF2), nikdy v čitateľnej podobe.",
          "Prihlásenia: kedy relácia vznikla a kedy bola naposledy použitá, IP adresa a user-agent prehliadača, kvôli bezpečnosti vášho účtu.",
          "Váš obsah: procesy, mapy, poznámky, organizácie, ich členovia a pozvánky a prehľad posledných zmien v organizácii.",
          "Ľudia vo vašich procesoch: ak používate prehľad zastupiteľnosti, mená, čísla a pozície zamestnancov, ktoré zadáte. O tom, čo zadáte, rozhoduje vaša organizácia; my ich spracúvame len na poskytovanie služby.",
          "E-maily: na odosielanie e-mailov k účtu (overenie adresy, obnova hesla, pozvánky) odovzdávame vašu e-mailovú adresu poskytovateľovi doručovania e-mailov.",
        ],
      },
      {
        id: "ai",
        title: "Žiadne externé AI spracovanie",
        paragraphs: [
          "Procesné mapy stavia náš vlastný engine založený na pravidlách. Popisy vašich procesov sa neposielajú do externých AI služieb a nepoužívajú sa na trénovanie AI modelov.",
        ],
      },
      {
        id: "providers",
        title: "Kde sú údaje uložené",
        paragraphs: [
          "Web aj aplikácia bežia na platforme Render (cloudový hosting), kde sú údaje uložené na trvalých diskoch. Prevádzka na bpmngen.com prechádza cez Cloudflare (sieť a bezpečnosť). E-maily k účtu odchádzajú cez poskytovateľa doručovania e-mailov. Títo poskytovatelia spracúvajú údaje len v našom mene. Ak je poskytovateľ mimo EÚ, prenos sa opiera o štandardné zmluvné doložky Európskej komisie.",
        ],
      },
      {
        id: "retention",
        title: "Ako dlho údaje uchovávame",
        items: [
          `Analytika na webe: ${ANALYTICS_RETENTION_DAYS} dní.`,
          `Správy z kontaktného formulára: ${CONTACT_RETENTION_DAYS} dní.`,
          "Účet a obsah: kým máte účet. O vymazanie účtu a údajov nás môžete požiadať cez kontaktný formulár.",
        ],
      },
      {
        id: "rights",
        title: "Vaše práva",
        paragraphs: [
          "Máte právo na prístup k svojim údajom, ich opravu alebo vymazanie, obmedzenie spracúvania, prenosnosť, právo namietať proti spracúvaniu na základe oprávneného záujmu a právo kedykoľvek odvolať súhlas. Napíšte nám cez kontaktný formulár.",
          "Máte tiež právo podať sťažnosť dozornému orgánu, na Slovensku je to Úrad na ochranu osobných údajov Slovenskej republiky (dataprotection.gov.sk).",
        ],
      },
    ],
    back: "Späť na hlavnú stránku",
  },
};

export function PrivacyPage({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const home = locale === "sk" ? homeContentSk : homeContentEn;
  const altLocaleHref = localizedPaths("/privacy")[locale === "sk" ? "en" : "sk"];
  const contactHref = localizedPaths("/contact")[locale];

  return (
    <>
      <SiteHeader locale={locale} nav={home.nav} altLocaleHref={altLocaleHref} />
      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-3 text-[32px] font-semibold leading-[1.12] tracking-[-0.03em] text-fg sm:text-[40px]">{copy.title}</h1>
          <p className="mt-4 text-[16px] leading-7 text-fg-2">{copy.intro}</p>
          <p className="mt-3 font-mono text-[12px] text-fg-3">{copy.updated}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label={copy.toc} className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[12px] font-medium text-fg-3">{copy.toc}</p>
              <ul className="mt-3 space-y-1 border-l border-line">
                {[{ id: "operator", title: copy.operatorTitle }, ...copy.sections, { id: "controls", title: copy.controlsTitle }].map(
                  (section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="-ml-px block border-l border-transparent py-1 pl-3 text-[13px] text-fg-2 transition hover:border-accent hover:text-fg"
                      >
                        {section.title}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </nav>

          <div className="max-w-3xl space-y-3">
            <section id="operator" className="rounded-xl border border-line-strong bg-panel p-6">
              <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-fg">{copy.operatorTitle}</h2>
              <p className="mt-2 text-[14.5px] leading-7 text-fg-2">
                {OPERATOR ? copy.operatorKnown(OPERATOR.name, OPERATOR.address) : copy.operatorUnknown}
              </p>
              <a href={contactHref} className="btn btn-sm mt-4">
                {copy.contactCta}
                <span aria-hidden="true">→</span>
              </a>
            </section>

            <div className="divide-y divide-line rounded-xl border border-line bg-card">
              {copy.sections.map((section) => (
                <section key={section.id} id={section.id} className="p-6">
                  <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-fg">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-2 text-[14.5px] leading-7 text-fg-2">
                      {paragraph}
                    </p>
                  ))}
                  {section.items ? (
                    <ul className="mt-3 space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[14.5px] leading-7 text-fg-2">
                          <span className="mt-3 h-1 w-1 flex-none rounded-full bg-fg-3" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <section id="controls" className="rounded-xl border border-line-strong bg-panel p-6">
              <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-fg">{copy.controlsTitle}</h2>
              <p className="mt-2 text-[14.5px] leading-7 text-fg-2">{copy.controlsText}</p>
              <div className="mt-4">
                <AnalyticsConsentControls locale={locale} />
              </div>
            </section>

            <a href={locale === "sk" ? "/sk" : "/"} className="btn mt-7">
              <span aria-hidden="true">←</span>
              {copy.back}
            </a>
          </div>
        </div>
      </main>
      <SiteFooter locale={locale} nav={home.nav} footer={home.footer} altLocaleHref={altLocaleHref} />
    </>
  );
}
