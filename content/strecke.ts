import { preise, row, type PriceRow } from "./preise";
import { praxiszeiten, theoriezeiten } from "./zeiten";

/**
 * "Deine Strecke zum Führerschein" – the scroll journey (DESIGN.md 4.3).
 *
 * Every sentence below is copied word for word from CONTENT.md; "…" marks
 * where a sentence was cut (nothing is reworded). Source ids refer to the
 * content checklist in DESIGN.md section 5. Section title and station
 * names are new UI words (DESIGN.md 5.13).
 */

export type Station = {
  id: string;
  name: string;
  /** Real text, word for word. Empty = gap for the owner (none at the moment). */
  text: string[];
  /** Price tables, each with its original list label (or none). */
  prices?: { caption?: string; rows: PriceRow[] }[];
  /** Footnotes that belong to the prices shown. */
  notes?: string[];
  /** Times block (heading + lines), word for word. */
  times?: { title: string; lines: readonly string[] };
  link?: { href: string; label: string };
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
      // P1/P2 and P8/P9/P10: both base prices, each with its list label.
      // Lehrmaterial is shown with "OHNE AKTION" so the two amounts are comparable.
      prices: [
        {
          caption: preise.mitAktion.label,
          rows: [row(preise.mitAktion, "Grundbetrag inkl. Lehrmaterial")],
        },
        {
          caption: preise.ohneAktion.label,
          rows: [row(preise.ohneAktion, "Grundbetrag"), row(preise.ohneAktion, "Lehrmaterial")],
        },
      ],
      notes: [preise.fussnoteCam],
      link: { href: "#anmeldung", label: "Anmelden" },
    },
    {
      id: "theorie",
      name: "Theorie",
      // U4 (Theoretischer Unterricht), complete; S6, last sentence.
      text: [
        "Unser Theorieunterricht findet in Form von Kursen statt. Das hat für dich den Vorteil, dass du innerhalb von kürzester Zeit den theoretischen Teil deiner Ausbildung abschließen kannst.",
        "An 3 Wochentagen bieten wir 4 Themen an.",
      ],
      // Z4/Z5
      times: { title: theoriezeiten.title, lines: [theoriezeiten.tage, ...theoriezeiten.slots] },
    },
    {
      id: "fahrstunden",
      name: "Fahrstunden",
      // S6 (Startseite), sentence cut before "und bereiten dich …".
      text: [
        "Ob Automatik oder Schaltung, Stadt, Landstraße oder Autobahn: Unsere Fahrlehrer begleiten dich individuell auf dem Weg zur Fahrerlaubnis …",
      ],
      // P3/P4 – same amounts in both lists.
      prices: [
        {
          rows: [row(preise.mitAktion, "Übungsfahrt (45 Min.)"), row(preise.mitAktion, "Sonderfahrt (45 Min.)")],
        },
      ],
      // Z6
      times: { title: praxiszeiten.title, lines: [praxiszeiten.text] },
    },
    {
      id: "pruefung",
      name: "Prüfung",
      // S6 (Startseite), the rest of the same sentence.
      text: ["… und bereiten dich auf die praktische Prüfung vor."],
      // P5/P6 – same amounts in both lists – and footnote P16.
      prices: [
        {
          rows: [
            row(preise.mitAktion, "Vorstellung zur theor. Prüfung*"),
            row(preise.mitAktion, "Vorstellung zur prakt. Prüfung*"),
          ],
        },
      ],
      notes: [preise.fussnoteGebuehren],
      link: { href: "#preise", label: "Preise ansehen" },
    },
  ] satisfies Station[],
} as const;
