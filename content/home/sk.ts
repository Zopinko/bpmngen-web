import { type HomePageContent } from "@/content/home/types";

export const homeContentSk: HomePageContent = {
  locale: "sk",
  metadata: {
    title: "BPMN.GEN - Zdokumentujte, ako práca naozaj prebieha",
    description:
      "Zachyťte, ako práca naozaj prebieha, a premeňte ju na prehľadné, použiteľné procesné mapy bez potreby učiť sa BPMN.",
  },
  nav: {
    product: "Produkt",
    pricing: "Ceny",
    faq: "FAQ",
    contact: "Kontakt",
    primaryCta: "Skúsiť aplikáciu",
    signIn: "Prihlásiť sa",
    localeLabel: "SK",
  },
  hero: {
    badge: "Procesné myslenie pre bežné tímy",
    title: "Zdokumentujte, ako práca naozaj prebieha bez toho, aby ste sa učili BPMN.",
    subtitle:
      "Nie BPMN editor. Nie AI generátor diagramov. Systém, ktorý pomáha tímom zachytiť reálne procesy a premeniť ich na prehľadné, použiteľné mapy.",
    supportingLine: "Prestaňte sa spoliehať na to, že si ľudia pamätajú, ako veci fungujú.",
    primaryCta: "Vytvoriť prvý proces",
    secondaryCta: "Zobraziť ceny",
    proofPoints: [
      "Kľúčový človek odíde - proces zostáva",
      "Noví ľudia sa zaučia rýchlejšie - menej vysvetľovania, menej chaosu",
      "Práca je konzistentná - každý ju nerobí inak",
    ],
  },
  flow: {
    eyebrow: "Ukážka workflow",
    subtitle: "Reálna práca -> štruktúrovaný proces -> zdieľané know-how",
    inputLabel: "Vstup",
    inputText: "Človek, ktorý robí prácu, opíše, čo reálne robí.",
    inputBadge: "Reálna práca",
    steps: [
      {
        title: "Začnite človekom, ktorý robí prácu",
        text: "Nie BPMN špecialista. Nie prázdny diagram. Začnite človekom, ktorý tú prácu skutočne robí.",
      },
      {
        title: "Systém z toho vytvorí proces",
        text: "BPMN.GEN premení reálnu prácu na štruktúrovaný proces bez potreby poznať BPMN.",
      },
      {
        title: "Firma si ho uloží a používa ďalej",
        text: "Namiesto jedného diagramu získate proces, ktorý môžete zdieľať, upravovať a rozvíjať.",
      },
    ],
    outputLabel: "Výstup",
    outputText: "Prehľadná BPMN procesná mapa, ktorú tím vie reálne používať",
    outputBadge: "Hotovo",
    diagram: {
      laneA: "Žiadateľ",
      laneB: "Schvaľovateľ",
      submit: "Podať žiadosť",
      review: "Posúdiť žiadosť",
      approved: "Schválené?",
      notify: "Oznámiť výsledok",
      yes: "áno",
      no: "nie",
    },
  },
  positioning: {
    eyebrow: "Prečo BPMN.GEN",
    title: "Väčšina nástrojov začína diagramom. Vy by ste nemali.",
    text:
      "Väčšina nástrojov predpokladá, že procesy už máte spísané.\n\nBPMN.GEN začína tam, kde procesy naozaj existujú, v ľuďoch, a premieňa ich na niečo, čo firma vie používať.",
    cards: [
      {
        eyebrow: "Hlavná myšlienka",
        title: "Problém nie je kreslenie diagramov",
        text: "Procesy sú v hlavách ľudí, nie vo vašom systéme.",
      },
      {
        eyebrow: "Dostupnosť",
        title: "Proces vie opísať ktokoľvek",
        text: "Bez BPMN školení. Bez konzultantov. Stačí opísať, ako práca prebieha.",
      },
      {
        eyebrow: "Hodnota pre firmu",
        title: "Procesy už nezmiznú",
        text: "Namiesto strateného know-how a starých PDF si firma buduje použiteľné procesy.",
      },
    ],
  },
  features: {
    eyebrow: "Produkt",
    title: "Čo v aplikácii dostanete",
    text: "Všetko stojí na jednej myšlienke: prácu opíše človek, ktorý ju robí, a firma si ju ponechá.",
    items: [
      {
        icon: "guide",
        title: "Opíšete to vetami",
        text: "Kroky napíšete tak, ako by ste ich vysvetľovali. „Ak ...“ vytvorí rozhodnutie, „Súčasne ...“ paralelnú časť. Celým postupom vás prevedie sprievodca.",
      },
      {
        icon: "map",
        title: "Platná BPMN mapa",
        text: "Engine z toho postaví mapu s rolami, rozhodnutiami a koncami. Upraviť ju môžete aj priamo na plátne.",
      },
      {
        icon: "story",
        title: "Príbeh procesu",
        text: "Ten istý proces vypísaný ako čitateľný text, pre ľudí, ktorí diagram nikdy neotvoria.",
      },
      {
        icon: "export",
        title: "Export a import BPMN",
        text: "Stiahnete si štandardný súbor BPMN 2.0 (.bpmn), alebo nahráte existujúci a pokračujete v ňom.",
      },
      {
        icon: "team",
        title: "Priestor pre tím",
        text: "Organizácia s členmi, pozvánkami, zdieľanými procesmi a prehľadom posledných zmien.",
      },
      {
        icon: "coverage",
        title: "Zastupiteľnosť",
        text: "Vidíte, kto robí ktorý krok, kto ho vie zastúpiť a ktoré kroky stoja na jedinom človeku.",
      },
    ],
  },
  demo: {
    eyebrow: "Živé demo",
    title: "Vyskúšajte si to priamo tu - bez registrácie",
    text: "Opíšte krátky proces a sledujte, ako z neho vznikne BPMN mapa. Demo je obmedzené na 2 roly a nič z toho, čo napíšete, sa neukladá.",
    frameTitle: "Interaktívne demo BPMN.GEN",
    openFullscreen: "Otvoriť demo na celú obrazovku",
    mobileNote: "Editor máp funguje najlepšie na väčšej obrazovke. Demo si otvorte v novej karte.",
    mobileCta: "Otvoriť demo",
  },
  howItWorks: {
    eyebrow: "Ako to funguje",
    title: "Od takto to robíme k procesu, ktorý tím vie používať",
    text:
      "Väčšina nástrojov tento krok preskakuje.\nBPMN.GEN je navrhnutý pre moment, keď proces existuje len v hlavách ľudí.",
  },
  pricing: {
    eyebrow: "Ceny",
    title: "Začnite jednoducho. Rozvíjajte sa s tímom.",
    text: "Počas testovania zadarmo. Skúste to na reálnom procese a uvidíte rozdiel.",
    extra: "Vyskúšate na vlastnom procese za menej ako 5 minút.",
    featuredLabel: "Odporúčané",
    openTestingLabel: "Otvorené testovanie",
    freeDuringTesting: "Počas testovania zadarmo",
    cta: "Začať zadarmo",
    note: "Bez nastavovania. Bez potreby poznať BPMN.",
    cards: [
      {
        name: "Starter",
        seats: "Jednotlivec",
        price: "29 EUR/mes.",
        highlight: "Najlepšie pre jedného človeka, ktorý chce zachytiť a zdokumentovať, ako práca reálne prebieha.",
      },
      {
        name: "Team",
        seats: "Do 5 používateľov",
        price: "99 EUR/mes.",
        highlight: "Najlepšie pre tímy, ktoré chcú premeniť tacitné know-how na zdieľané a použiteľné procesy.",
        featured: true,
      },
      {
        name: "Business",
        seats: "Do 20 používateľov",
        price: "259 EUR/mes.",
        highlight: "Najlepšie pre firmy, ktoré chcú budovať trvalú procesnú vrstvu naprieč tímami.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Čo produkt je, a čo nie je.",
    text:
      "Tento rozdiel je dôležitý. BPMN.GEN nie je ďalší diagramový editor. Pomáha tímom zachytiť, ako práca naozaj prebieha, a premeniť to na použiteľný proces.",
    items: [
      {
        q: "Je BPMN.GEN BPMN editor?",
        a: "Nie. Nekreslíte diagramy.\nOpíšete, ako práca prebieha, a systém z toho vytvorí proces.",
      },
      {
        q: "Je to len ďalší AI generátor?",
        a: "Nie. BPMN.GEN používa štruktúrovaný engine na tvorbu validných procesov.\nVýstup nie je náhodný, ale konzistentný a použiteľný.",
      },
      {
        q: "Dostanem BPMN diagram?",
        a: "Áno. BPMN.GEN vytvorí validnú BPMN mapu procesu.\nVy sa však nemusíte učiť BPMN, aby ste ju získali.",
      },
      {
        q: "Pre koho je to určené?",
        a: "Pre tímy, kde:\n- práca závisí od konkrétnych ľudí\n- onboarding trvá príliš dlho\n- procesy sú nejednotné alebo nejasné",
      },
      {
        q: "Viem mapu preniesť do iných BPMN nástrojov?",
        a: "Áno. Stiahnete si štandardný súbor BPMN 2.0 (.bpmn), ktorý otvoria aj iné BPMN nástroje. Existujúci .bpmn súbor môžete aj nahrať a pokračovať v BPMN.GEN.",
      },
      {
        q: "Posiela sa to, čo napíšem, do AI služby?",
        a: "Nie. Mapy stavia náš vlastný engine založený na pravidlách, takže popisy vašich procesov sa neposielajú do externých AI služieb.",
      },
    ],
  },
  footer: {
    rights: "(c) {year} BPMN.GEN. Všetky práva vyhradené.",
    privacy: "Súkromie",
  },
};

