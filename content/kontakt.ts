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

/** Where links go while the other pages don't exist (DESIGN.md 3.1). */
export const PLACEHOLDER = "/platzhalter";

export const footer = {
  infos: {
    title: "Infos",
    links: [
      { label: "Team", href: "/#team" },
      { label: "Unterricht", href: PLACEHOLDER },
      { label: "Fahrzeuge", href: "/#fahrzeuge" },
      { label: "Preise", href: "/#preise" },
    ],
  },
  legal: [
    { label: "Kontakt", href: "/#kontakt" },
    { label: "Impressum", href: PLACEHOLDER },
    { label: "Datenschutzerklärung", href: PLACEHOLDER },
    // DESIGN.md plans a cookie-dialog preview here; not built yet.
    { label: "Cookie-Einstellungen", href: PLACEHOLDER },
  ],
  /** Kept: DESIGN.md G9 lists it for the footer, word for word (owner question 16). */
  credit: { text: "© 2026/2027 | Programmiert durch KS Design.", href: "https://www.ks-media.de" },
} as const;

/** New UI words (DESIGN.md 5.13 / alt texts / link hints). */
export const kontaktUi = {
  route: "Route planen",
  instagram: "Instagram",
  newTab: "(öffnet in neuem Tab)",
  placeholder: "Diese Seite wird nach Freigabe der Startseite gebaut.",
  backHome: "Zur Startseite",
  /** Name of the footer's legal-links navigation, for screen readers. */
  legalNav: "Rechtliches",
} as const;
