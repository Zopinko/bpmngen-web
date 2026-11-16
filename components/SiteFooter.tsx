import { type HomePageContent } from "@/content/home/types";

type SiteFooterProps = {
  locale: HomePageContent["locale"];
  nav: HomePageContent["nav"];
  footer: HomePageContent["footer"];
  altLocaleHref: string;
};

export function SiteFooter({ locale, nav, footer, altLocaleHref }: SiteFooterProps) {
  const home = locale === "sk" ? "/sk" : "/";
  const privacyHref = locale === "sk" ? "/sk/privacy" : "/privacy";
  const altLocale = locale === "en" ? "sk" : "en";
  const links = [
    { href: `${home}#features`, label: nav.product },
    { href: `${home}#pricing`, label: nav.pricing },
    { href: `${home}#faq`, label: nav.faq },
    { href: privacyHref, label: footer.privacy },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-20 pt-8 text-[13px] text-fg-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="brand-mark" aria-hidden="true" />
          <span>{footer.rights.replace("{year}", new Date().getFullYear().toString())}</span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Footer">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-fg">
              {link.label}
            </a>
          ))}
          <a href={altLocaleHref} hrefLang={altLocale} className="font-mono uppercase transition hover:text-fg">
            {altLocale}
          </a>
        </nav>
      </div>
    </footer>
  );
}
