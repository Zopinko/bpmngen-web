import { ContactForm, type ContactFormCopy } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { homeContentEn } from "@/content/home/en";
import { homeContentSk } from "@/content/home/sk";
import { localizedPaths, type Locale } from "@/lib/site";

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    asideTitle: string;
    asideItems: string[];
    demoTitle: string;
    demoText: string;
    demoCta: string;
    form: ContactFormCopy;
  }
> = {
  en: {
    eyebrow: "Contact",
    title: "Write to us",
    intro: "Questions, feedback from testing, a process you would like to try with us, or a request about your data. We read every message and reply by email.",
    asideTitle: "Good reasons to write",
    asideItems: [
      "You want to try BPMN.GEN with your team",
      "Something in the app does not work as you expected",
      "You want your account or data exported or deleted",
    ],
    demoTitle: "Just want to see it?",
    demoText: "The demo needs no account.",
    demoCta: "Open the demo",
    form: {
      name: "Name",
      email: "Email",
      company: "Company",
      optional: "optional",
      message: "Message",
      messagePlaceholder: "How can we help?",
      submit: "Send message",
      sending: "Sending...",
      privacyNote: "We use your details only to reply to you and delete the message after 12 months. More in the",
      privacyLink: "privacy policy",
      successTitle: "Message sent",
      successText: "Thank you. We will reply to the email address you gave us.",
      sendAnother: "Send another message",
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        company: "The company name is too long.",
        message: "Please write at least a short message (10 characters or more).",
        form: "The message could not be sent. Please try again.",
        rateLimited: "Too many messages in a short time. Please try again in a few minutes.",
        network: "The message could not be sent. Check your connection and try again.",
      },
    },
  },
  sk: {
    eyebrow: "Kontakt",
    title: "Napíšte nám",
    intro: "Otázky, spätná väzba z testovania, proces, ktorý by ste s nami chceli vyskúšať, alebo žiadosť o vaše údaje. Čítame každú správu a odpovedáme e-mailom.",
    asideTitle: "Kedy nám napísať",
    asideItems: [
      "Chcete BPMN.GEN vyskúšať so svojím tímom",
      "Niečo v aplikácii nefunguje tak, ako ste čakali",
      "Chcete export alebo vymazanie svojho účtu či údajov",
    ],
    demoTitle: "Chcete si to len pozrieť?",
    demoText: "Demo nepotrebuje účet.",
    demoCta: "Otvoriť demo",
    form: {
      name: "Meno",
      email: "E-mail",
      company: "Firma",
      optional: "nepovinné",
      message: "Správa",
      messagePlaceholder: "S čím vám môžeme pomôcť?",
      submit: "Odoslať správu",
      sending: "Odosielam...",
      privacyNote: "Údaje použijeme len na odpoveď a správu po 12 mesiacoch vymažeme. Viac v",
      privacyLink: "zásadách ochrany osobných údajov",
      successTitle: "Správa odoslaná",
      successText: "Ďakujeme. Odpovieme na e-mail, ktorý ste uviedli.",
      sendAnother: "Poslať ďalšiu správu",
      errors: {
        name: "Zadajte, prosím, svoje meno.",
        email: "Zadajte, prosím, platnú e-mailovú adresu.",
        company: "Názov firmy je príliš dlhý.",
        message: "Napíšte, prosím, aspoň krátku správu (aspoň 10 znakov).",
        form: "Správu sa nepodarilo odoslať. Skúste to, prosím, znova.",
        rateLimited: "Príliš veľa správ za krátky čas. Skúste to o pár minút.",
        network: "Správu sa nepodarilo odoslať. Skontrolujte pripojenie a skúste to znova.",
      },
    },
  },
};

export function ContactPage({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const home = locale === "sk" ? homeContentSk : homeContentEn;
  const contactPaths = localizedPaths("/contact");
  const altLocaleHref = contactPaths[locale === "sk" ? "en" : "sk"];
  const privacyHref = localizedPaths("/privacy")[locale];

  return (
    <>
      <SiteHeader locale={locale} nav={home.nav} altLocaleHref={altLocaleHref} />
      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="mt-3 text-[32px] font-semibold leading-[1.12] tracking-[-0.03em] text-fg sm:text-[40px]">{copy.title}</h1>
            <p className="mt-4 text-[15.5px] leading-7 text-fg-2">{copy.intro}</p>

            <p className="mt-10 text-[13px] font-medium text-fg-3">{copy.asideTitle}</p>
            <ul className="mt-3 space-y-2.5">
              {copy.asideItems.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14px] leading-6 text-fg-2">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-xl border border-line bg-card p-5">
              <p className="text-[14px] font-semibold text-fg">{copy.demoTitle}</p>
              <p className="mt-1 text-[13.5px] text-fg-2">{copy.demoText}</p>
              <a href={`https://app.bpmngen.com/demo?lang=${locale}`} className="btn btn-sm mt-4">
                {copy.demoCta}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-line-strong bg-panel p-6 shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:p-8">
            <ContactForm locale={locale} copy={copy.form} privacyHref={privacyHref} />
          </div>
        </div>
      </main>
      <SiteFooter locale={locale} nav={home.nav} footer={home.footer} altLocaleHref={altLocaleHref} />
    </>
  );
}
