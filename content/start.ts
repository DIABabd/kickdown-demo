/**
 * Start page texts – copied word for word from CONTENT.md
 * ("Seite: Startseite (Willkommen)"). Do not reword.
 */
export const start = {
  /** <title> of the old start page (S1). */
  title: "Fahrschule Bremen | Fahrschule Kickdown Mahmoud Shehada",
  /** Hero headline (S2). */
  heroTitle: "Deine Fahrschule Kickdown in Bremen",
  /** Hero subline, two lines as on the old site (S3). */
  heroSubline: ["Dein Weg zum", "Führerschein Klasse B"],
  /** Willkommen heading and both paragraphs (S4–S6). */
  willkommen: {
    title: "Willkommen in der Fahrschule Kickdown",
    text: [
      "Nicht nur im Privatleben, auch im Beruf eröffnet dir die Fahrerlaubnis zahlreiche Möglichkeiten. Damit du so schnell wie möglich auf die Überholspur wechseln kannst, bekommst du in unserer Fahrschule den Kickstart.",
      "Wir zeigen dir, worauf es im Straßenverkehr ankommt – mit leicht verständlicher Theorie und intensiver Praxis. Ob Automatik oder Schaltung, Stadt, Landstraße oder Autobahn: Unsere Fahrlehrer begleiten dich individuell auf dem Weg zur Fahrerlaubnis und bereiten dich auf die praktische Prüfung vor. Und wenn du schon bald durchstarten willst, haben wir auch einen passendes Theorie-Angebot für dich: An 3 Wochentagen bieten wir 4 Themen an.",
    ],
    /** Shop-window photo (B8), 870 × 470 px. Owner question 13. */
    photo: { src: "/old-site/start/01.jpg", w: 870, h: 470 },
  },
} as const;

/** Alt text of the logo on the old site. */
export const logoAlt = "Logo Fahrschule Kickdown";

/**
 * New UI words for the demo – not old-site content.
 * Listed in DESIGN.md 5.13 and OWNER-QUESTIONS.md (34, 35) for approval.
 */
export const ui = {
  privateDemo: "Private Demo",
  privateDemoHint: "keine echte Website der Fahrschule",
  signUp: "Jetzt anmelden",

  /** Header navigation (DESIGN.md 3.3) and phone bottom bar. */
  nav: {
    label: "Hauptnavigation",
    menu: "Menü",
    links: [
      { label: "Preise", href: "/#preise" },
      { label: "Fahrzeuge", href: "/#fahrzeuge" },
      { label: "Team", href: "/#team" },
      { label: "Kontakt", href: "/#kontakt" },
    ],
    signUp: { label: "Anmelden", href: "/#anmeldung" },
  },
  bottomBar: {
    label: "Schnellzugriff",
    call: "Anrufen",
    times: { label: "Zeiten", href: "/#zeiten" },
    signUp: { label: "Anmelden", href: "/#anmeldung" },
  },

  /** One heading pattern for every section: small label + heading. */
  eyebrows: {
    willkommen: "Willkommen",
    strecke: "Anmeldung · Theorie · Fahrstunden · Prüfung",
    preise: "Preise",
    zeiten: "Zeiten",
    team: "Wer neben dir sitzt",
    showroom: "Der Showroom",
    kontakt: "Kontakt",
    anmeldung: "Simulation",
  },
  /** Heading of the times section (the three old-site headings, joined). */
  zeitenTitle: "Bürozeiten, Theoriezeiten und Praxiszeiten",

  /** Demo note under the shop-window photo (owner question 13). */
  photoApproval: "Demo-Hinweis: Dieses Foto muss vor der Veröffentlichung freigegeben werden.",
  photoAlt: "Schaufenster der Fahrschule Kickdown",
  /** "Foto 1 von 3" for the combined VW T-Roc card. */
  photoOf: (n: number, total: number) => `Foto ${n} von ${total}`,

  filterAlle: "Alle",
  filterAutomatik: "Automatik",
  filterSchaltung: "Schaltung",
} as const;
