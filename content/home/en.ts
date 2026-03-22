import { type HomePageContent } from "@/content/home/types";

export const homeContentEn: HomePageContent = {
  locale: "en",
  metadata: {
    title: "BPMN.GEN - Document how work actually happens",
    description:
      "Capture how work actually happens and turn it into clear, usable process maps without learning BPMN.",
  },
  nav: {
    product: "Product",
    pricing: "Pricing",
    faq: "FAQ",
    primaryCta: "Try the App",
    localeLabel: "EN",
  },
  hero: {
    badge: "Process thinking for normal teams",
    title: "Document how work actually happens without learning BPMN.",
    subtitle:
      "Not a BPMN editor. Not an AI diagram generator. A system that helps your team capture real processes and turn them into clear, usable maps.",
    supportingLine: "Stop relying on people to remember how things work.",
    primaryCta: "Turn your first process into a map",
    secondaryCta: "See pricing",
    proofPoints: [
      "A key employee leaves - your process stays",
      "New hires learn faster - less shadowing, less chaos",
      "Work stays consistent - no more everyone does it differently",
    ],
  },
  flow: {
    eyebrow: "Workflow preview",
    subtitle: "Real work -> structured process -> reusable knowledge",
    inputLabel: "Input",
    inputText: "The person doing the work describes what they actually do.",
    inputBadge: "Real work",
    steps: [
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
    ],
    outputLabel: "Output",
    outputText: "A clear, BPMN-based process your team can actually use",
    outputBadge: "Ready",
  },
  positioning: {
    eyebrow: "Positioning",
    title: "Most process tools start with diagrams. Yours should not.",
    text:
      "Most tools assume your processes are already written down.\n\nThey are not.\n\nBPMN.GEN starts where the knowledge actually is, in people, and turns it into something your company can use.",
    cards: [
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
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "From how we do it to a process your team can use",
    text:
      "Most tools skip this step.\nBPMN.GEN is built for the moment when the process only exists in peoples heads.",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Start simple. Scale with your team.",
    text: "Free during testing. Try it on a real process and see the difference.",
    extra: "Try it on your own process in under 5 minutes.",
    featuredLabel: "Popular",
    openTestingLabel: "Open testing",
    freeDuringTesting: "Free during testing",
    cta: "Start free",
    note: "No setup. No BPMN knowledge needed.",
    cards: [
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
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "What the product is, and what it is not.",
    text:
      "The distinction matters. BPMN.GEN is not another diagram editor. It helps teams capture how work actually happens and turn it into a usable process.",
    items: [
      {
        q: "Is BPMN.GEN a BPMN editor?",
        a: "No. You do not draw diagrams. You describe how work happens, and the system builds the process for you.",
      },
      {
        q: "Is this just another AI generator?",
        a: "No. BPMN.GEN uses a structured engine to build valid process maps. It is not random output. It is controlled, consistent, and usable.",
      },
      {
        q: "Do I get a BPMN diagram?",
        a: "Yes. BPMN.GEN creates a valid BPMN process map. You just do not have to learn the notation to get it.",
      },
      {
        q: "Who is this for?",
        a: "Teams where work depends on specific people, onboarding takes too long, and processes are inconsistent or unclear.",
      },
    ],
  },
  footer: {
    rights: "(c) {year} BPMN.GEN. All rights reserved.",
  },
};
