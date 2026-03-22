export type HomePageContent = {
  locale: "en" | "sk";
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    product: string;
    pricing: string;
    faq: string;
    primaryCta: string;
    localeLabel: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    supportingLine: string;
    primaryCta: string;
    secondaryCta: string;
    proofPoints: string[];
  };
  flow: {
    eyebrow: string;
    subtitle: string;
    inputLabel: string;
    inputText: string;
    inputBadge: string;
    steps: Array<{
      title: string;
      text: string;
    }>;
    outputLabel: string;
    outputText: string;
    outputBadge: string;
  };
  positioning: {
    eyebrow: string;
    title: string;
    text: string;
    cards: Array<{
      eyebrow: string;
      title: string;
      text: string;
    }>;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    text: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    text: string;
    extra: string;
    featuredLabel: string;
    openTestingLabel: string;
    freeDuringTesting: string;
    cta: string;
    note: string;
    cards: Array<{
      name: string;
      seats: string;
      price: string;
      highlight: string;
      featured?: boolean;
    }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    text: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
  footer: {
    rights: string;
  };
};
