/**
 * "Preisliste für Klasse B" – word for word from CONTENT.md ("Seite: Preise"),
 * including the original capitalisation. One source for the journey and,
 * later, the prices section. ¹ ² stand for the <sup>1</sup> <sup>2</sup> marks.
 */

export type PriceRow = { label: string; price: string };

export const preise = {
  title: "Preisliste für Klasse B",
  mitAktion: {
    label: "MIT SCHÜLER/STUDENTEN AKTION",
    rows: [
      { label: "Grundbetrag inkl. Lehrmaterial", price: "300 €" },
      { label: "Übungsfahrt (45 Min.)", price: "65 €" },
      { label: "Sonderfahrt (45 Min.)", price: "75 €" },
      { label: "Vorstellung zur prakt. Prüfung*", price: "170 €" },
      { label: "Vorstellung zur theor. Prüfung*", price: "30 €" },
    ],
    ersparnis: "(ERSPARNIS VON 260 €)",
  },
  ohneAktion: {
    label: "OHNE AKTION",
    rows: [
      { label: "Grundbetrag", price: "500 €" },
      { label: "Lehrmaterial", price: "90 € ¹ / 60 € ²" },
      { label: "Übungsfahrt (45 Min.)", price: "65 €" },
      { label: "Sonderfahrt (45 Min.)", price: "75 €" },
      { label: "Vorstellung zur prakt. Prüfung*", price: "170 €" },
      { label: "Vorstellung zur theor. Prüfung*", price: "30 €" },
    ],
  },
  fussnoteCam: "¹ Mit Drivers Cam, ² Ohne Drivers Cam",
  fussnoteGebuehren:
    "*Die amtlichen Gebühren für die Fahrerlaubnisprüfungen sind hier nicht enthalten, und werden von der Prüfstelle extern berechnet.",
} as const satisfies Record<string, unknown>;

/** Look up a row by its exact label in one of the two lists. */
export function row(list: { rows: readonly PriceRow[] }, label: string): PriceRow {
  const found = list.rows.find((r) => r.label === label);
  if (!found) throw new Error(`Preis "${label}" not in CONTENT.md list`);
  return found;
}
