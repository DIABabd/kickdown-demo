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
} as const;

/** Alt text of the logo on the old site. */
export const logoAlt = "Logo Fahrschule Kickdown";

/**
 * New UI words for the demo – not old-site content.
 * Listed in DESIGN.md 5.13 for the owner to approve.
 */
export const ui = {
  privateDemo: "Private Demo",
  privateDemoHint: "keine echte Website der Fahrschule",
  signUp: "Jetzt anmelden",
  /** Heading of the times section (UI word from DESIGN.md 5.13). */
  zeiten: "Zeiten",
  /** Showroom eyebrow and filter (UI words from DESIGN.md 5.13). */
  showroom: "Der Showroom",
  filterAlle: "Alle",
  filterAutomatik: "Automatik",
  filterSchaltung: "Schaltung",
  /** Team eyebrow (UI words from DESIGN.md 5.13). */
  teamEyebrow: "Wer neben dir sitzt",
} as const;
