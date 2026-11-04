/**
 * Times – word for word from CONTENT.md (footer and Unterricht pages).
 * One source for the journey, the times section and, later, the footer.
 *
 * Bürozeiten follow the footer (incl. Freitag), as decided in DESIGN.md 1.1.
 * The Kontakt page sentence (Montag + Samstag only) is a separate text for
 * the Kontakt page and an open owner question.
 */

export type Slot = { day: string; time: string };

export const buerozeiten = {
  title: "Bürozeiten",
  slots: [
    { day: "Montag:", time: "16:30 Uhr bis 19:30 Uhr" },
    { day: "Freitag:", time: "16:00 Uhr bis 19:00 Uhr" },
    { day: "Samstag:", time: "14:00 Uhr bis 17:30 Uhr" },
  ] satisfies Slot[],
} as const;

export const theoriezeiten = {
  title: "Theoriezeiten",
  tage: "Dienstag, Mittwoch und Donnerstag:",
  /** The three weekdays named in `tage` (for the week overview). */
  tageListe: ["Dienstag", "Mittwoch", "Donnerstag"],
  slots: ["17:00 Uhr bis 18:30 Uhr und", "19:00 Uhr bis 20:30 Uhr"],
} as const;

export const praxiszeiten = {
  title: "Praxiszeiten",
  text: "nach Vereinbarung",
} as const;

/** "16:30 Uhr bis 19:30 Uhr" → hours as numbers, read from the text itself. */
export function parseSpan(text: string): { from: number; to: number; label: string } {
  const m = text.match(/(\d{2}):(\d{2}) Uhr bis (\d{2}):(\d{2}) Uhr/);
  if (!m) throw new Error(`Unexpected time text: "${text}"`);
  return {
    from: +m[1] + +m[2] / 60,
    to: +m[3] + +m[4] / 60,
    // Exact substring of the original (drops only a trailing " und").
    label: m[0],
  };
}
