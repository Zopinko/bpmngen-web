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
    contact: string;
    primaryCta: string;
    signIn: string;
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
    diagram: {
      laneA: string;
      laneB: string;
      submit: string;
      review: string;
      approved: string;
      notify: string;
      yes: string;
      no: string;
    };
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
  features: {
    eyebrow: string;
    title: string;
    text: string;
    items: Array<{
      icon: "guide" | "map" | "story" | "export" | "team" | "coverage";
      title: string;
      text: string;
    }>;
  };
  demo: {
    eyebrow: string;
    title: string;
    text: string;
    frameTitle: string;
    openFullscreen: string;
    mobileNote: string;
    mobileCta: string;
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
    privacy: string;
  };
};
