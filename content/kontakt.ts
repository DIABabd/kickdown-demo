/**
 * Contact facts and footer texts – word for word from CONTENT.md
 * (Startseite + "Gemeinsame Elemente → Fußzeile"). Only VISIBLE content:
 * the hidden e-mail address and the hidden second phone number are not
 * used anywhere (DESIGN.md 1.1, owner questions 18 and 19).
 */

export const telefon = {
  /** Visible link text, as in the footer. */
  text: "Telefon: 01 76 - 70 386 440",
  href: "tel:+4917670386440",
} as const;

export const adresse = {
  strasse: "Friedrich-Ebert-Straße 11/15",
  ort: "28199 Bremen",
  /** The old site's map link – an outbound link only, nothing is embedded. */
  karte: "https://goo.gl/maps/rshBXagK5StX8Lgs8",
} as const;

export const instagram = {
  href: "https://www.instagram.com/fahrschulekickdown/",
} as const;

/** Startseite S7 / S8, word for word (the e-mail address stays hidden). */
export const fragen = {
  title: "Du hast Fragen zu Führerschein und Fahrschule?",
  text: "Wir stehen dir gern als Ansprechpartner zur Verfügung und beraten dich vom ersten Antrag bis zur praktischen Prüfung zu allen Themen rund um den Führerschein. Schreib uns einfach eine E-Mail, ruf uns während unserer Bürozeiten an – oder komm direkt in der Fahrschule vorbei und sprich uns einfach an. Wir freuen uns auf dich!",
} as const;

/**
 * Kontakt page (/kontakt) – K0–K4, word for word. The intro names only
 * Montag and Samstag; the office hours shown below it follow the footer
 * (incl. Freitag) – owner question 1. The hidden second phone number
 * (K5) and the Google Maps iframe (K6) are not used.
 */
export const kontaktSeite = {
  metaTitle: "Fahrschule Kickdown | Kontakt", // K0
  title: "Kontakt", // K0
  /** K1 – two lines, as on the old page. */
  intro: [
    "Du hast Fragen zu unseren Leistungen, Preisen und Inhalten oder du wünschst eine Beratung? Dann kontaktiere uns gerne zu unseren Bürozeiten am Montag:16:30 Uhr bis 19:30 Uhr",
    "und Samstag: 14:00 Uhr bis 17:30 Uhr.",
  ],
  name: "Fahrschule KICKDOWN", // K2
  adresse: "Friedrich-Ebert-Straße 11/15, 28199 Bremen", // K3
  telefonLabel: "Telefon:", // K4
  telefonNummer: "01 76 - 70 386 440", // K4
} as const;

export const footer = {
  infos: {
    title: "Infos",
    links: [
      { label: "Team", href: "/team" },
      { label: "Unterricht", href: "/unterricht" },
      { label: "Fahrzeuge", href: "/fahrzeuge" },
      { label: "Preise", href: "/preise" },
      // G1: "Ausbildungsfahrschule" moves from the old main menu to the footer.
      { label: "Ausbildungsfahrschule", href: "/ausbildungsfahrschule" },
    ],
  },
  legal: [
    { label: "Kontakt", href: "/kontakt" },
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutzerklärung", href: "/datenschutz" },
    // Preview of the old cookie dialog – the demo sets no cookies.
    { label: "Cookie-Einstellungen", href: "/cookie-einstellungen" },
  ],
  /** Kept: DESIGN.md G9 lists it for the footer, word for word (owner question 16). */
  credit: { text: "© 2026/2027 | Programmiert durch KS Design.", href: "https://www.ks-media.de" },
} as const;

/** New UI words (DESIGN.md 5.13 / alt texts / link hints). */
export const kontaktUi = {
  route: "Route planen",
  instagram: "Instagram",
  newTab: "(öffnet in neuem Tab)",
  /** Name of the footer's legal-links navigation, for screen readers. */
  legalNav: "Rechtliches",
} as const;
