import { telefon } from "./kontakt";

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
  /** Hero's primary action – a real phone call, not a sign-up form. */
  callNow: "Jetzt anrufen",
  /** NEW hero headline (not from the old site) – needs the owner's approval (OWNER-QUESTIONS). */
  heroHeadline: "Dein Kickstart in Bremen",
  /** Decorative background lettering behind the hero car (the school's name, as in the logo). */
  heroWord: "KICKDOWN",
  /** Pause/play control for the turning hero car (new UI words, OWNER-QUESTIONS). */
  spinPause: "Drehung anhalten",
  spinPlay: "Drehung fortsetzen",

  /** Header navigation (DESIGN.md 3.3) and phone bottom bar. */
  nav: {
    label: "Hauptnavigation",
    menu: "Menü",
    links: [
      { label: "Unterricht", href: "/unterricht" },
      { label: "Preise", href: "/preise" },
      { label: "Fahrzeuge", href: "/fahrzeuge" },
      { label: "Team", href: "/team" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    /** Highlighted nav action: calling, not a sign-up simulation. */
    contact: { label: "Anrufen", href: telefon.href },
  },
  bottomBar: {
    label: "Schnellzugriff",
    call: "Anrufen",
    times: { label: "Zeiten", href: "/#zeiten" },
    /** Third bar slot: the contact page (the call action already sits first). */
    contact: { label: "Kontakt", href: "/kontakt" },
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

  /** Required note at the top of Impressum and Datenschutzerklärung. */
  legalNote:
    "Demo-Hinweis: Dieser Rechtstext stammt von der bisherigen Website und muss vor der Veröffentlichung geprüft und angepasst werden.",
  /** Cookie preview page. */
  cookieNote:
    "Demo: Diese Demo setzt keine Cookies und speichert nichts. Unten siehst du nur als Vorschau, wie der Cookie-Hinweis der bisherigen Website aussah – die Schaltflächen sind ohne Funktion.",
  cookieNoSave: "Demo: Auswahl wird nicht gespeichert.",
  cookieBannerLabel: "Vorschau: Cookie-Hinweis der bisherigen Website",
  cookieDialogLabel: "Vorschau: Dialog „Cookie Einstellungen“ der bisherigen Website",
  /** Alt texts – only what the old site says about these photos. */
  theoryPhotoAlt: "Foto zum Theorieunterricht (Ausschnitt eines Kalenders)",
  praxisPhotoAlt: "Foto zum praktischen Unterricht",
  ausbildungPhotoAlt: "Schaufenster der Fahrschule Kickdown",
} as const;
