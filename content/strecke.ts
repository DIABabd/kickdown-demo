/**
 * "Deine Strecke zum Führerschein" – the scroll journey (DESIGN.md 4.3).
 *
 * Each station: its real text (word for word from CONTENT.md; "…" marks a
 * cut) and ONE link. Prices and times are not repeated here any more – they
 * live in the price list (#preise) and the times section (#zeiten).
 * Source ids refer to the content checklist in DESIGN.md section 5.
 * Section title, station names and link labels are UI words (DESIGN.md 5.13).
 *
 * Restored Nov 2026 (git c88deac^). Changes since: "Anmelden" no longer
 * opens a sign-up form (removed) – it leads to /kontakt, where the visitor
 * can call the school; "Unsere Fahrzeuge" goes to the /fahrzeuge page (the
 * showroom is no longer on the homepage).
 */

export type Station = {
  id: string;
  name: string;
  /** Real text, word for word. Empty = gap for the owner (none at the moment). */
  text: string[];
  link: { href: string; label: string };
};

export const strecke = {
  title: "Deine Strecke zum Führerschein",
  stations: [
    {
      id: "anmeldung",
      name: "Anmeldung",
      // S8 (Startseite), first sentence, complete.
      text: [
        "Wir stehen dir gern als Ansprechpartner zur Verfügung und beraten dich vom ersten Antrag bis zur praktischen Prüfung zu allen Themen rund um den Führerschein.",
      ],
      link: { href: "/kontakt", label: "Anmelden" },
    },
    {
      id: "theorie",
      name: "Theorie",
      // U4 (Theoretischer Unterricht), complete. ("An 3 Wochentagen …" is in Willkommen.)
      text: [
        "Unser Theorieunterricht findet in Form von Kursen statt. Das hat für dich den Vorteil, dass du innerhalb von kürzester Zeit den theoretischen Teil deiner Ausbildung abschließen kannst.",
      ],
      link: { href: "#zeiten", label: "Theoriezeiten" },
    },
    {
      id: "fahrstunden",
      name: "Fahrstunden",
      // U10 (Praktischer Unterricht), complete – the S6 sentence is now in Willkommen.
      text: [
        "Wir bereiten dich zu fairen Preisen mit modernsten Lehrmethoden gezielt auf deinen Weg zur Fahrprüfung vor. Unser flexibles Ausbildungskonzept orientiert sich dabei ganz an deine Bedürfnisse.",
      ],
      link: { href: "/fahrzeuge", label: "Unsere Fahrzeuge" },
    },
    {
      id: "pruefung",
      name: "Prüfung",
      // S6 (Startseite), end of the sentence – the only old-site text about the exam.
      text: ["… und bereiten dich auf die praktische Prüfung vor."],
      link: { href: "#preise", label: "Preise ansehen" },
    },
  ] satisfies Station[],
} as const;
