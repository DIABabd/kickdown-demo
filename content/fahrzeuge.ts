/**
 * "Unsere Fahrzeuge" – all 7 vehicles, word for word from CONTENT.md
 * ("Seite: Fahrzeuge"), in the old order. Nothing is corrected: e.g. the
 * Audi A4 keeps "Automatik Getriebe" (others: "Automatikgetriebe").
 * Open points (Golf VI model, A4 plate, fleet still current, spelling)
 * are in OWNER-QUESTIONS.md, questions 8–10 and 28.
 */

export type Vehicle = {
  name: string;
  /** "mit … ausgestattet" line. */
  ausstattung: string;
  /** Spec lines exactly as written, e.g. "Leistung: 110 kW / 150 PS". */
  details: readonly string[];
  photo: string;
};

export const fahrzeuge = {
  title: "Unsere Fahrzeuge",
  detailsTitle: "Technische Details:",
  fazit: "Perfekt für Fahrschüler/ Fahranfänger geeignet.",
  /** Native size of every vehicle photo. */
  photoPx: { w: 370, h: 400 },
  list: [
    {
      name: "VW T-Roc",
      ausstattung: "mit Automatikschaltung ausgestattet",
      details: ["Leistung: 110 kW / 150 PS", "Getriebe: Automatikgetriebe", "Antrieb: Vorderradantrieb"],
      photo: "/old-site/fahrzeuge/05.jpg",
    },
    {
      name: "VW T-Roc",
      ausstattung: "mit Automatikschaltung ausgestattet",
      details: ["Leistung: 110 kW / 150 PS", "Getriebe: Automatikgetriebe", "Antrieb: Vorderradantrieb"],
      photo: "/old-site/fahrzeuge/06.jpg",
    },
    {
      name: "VW T-Roc",
      ausstattung: "mit Automatikschaltung ausgestattet",
      details: ["Leistung: 110 kW / 150 PS", "Getriebe: Automatikgetriebe", "Antrieb: Vorderradantrieb"],
      photo: "/old-site/fahrzeuge/07.jpg",
    },
    {
      name: "VW Golf VI",
      ausstattung: "mit manueller Schaltung ausgestattet",
      details: ["Leistung: 59 kW / 80 PS", "Getriebe: Manuelles Getriebe", "Antrieb: Vorderradantrieb"],
      photo: "/old-site/fahrzeuge/01.jpg",
    },
    {
      name: "Audi Q2",
      ausstattung: "mit Automatikschaltung ausgestattet",
      details: ["Leistung: 110 kW / 150 PS", "Getriebe: Automatikgetriebe", "Antrieb: Vorderradantrieb"],
      photo: "/old-site/fahrzeuge/02.jpg",
    },
    {
      name: "VW T-Roc",
      ausstattung: "mit manueller Schaltung ausgestattet",
      details: ["Leistung: 110 kW / 150 PS", "Getriebe: Manuelles Getriebe", "Antrieb: Vorderradantrieb"],
      photo: "/old-site/fahrzeuge/03.jpg",
    },
    {
      name: "Audi A4",
      ausstattung: "mit Automatikschaltung ausgestattet",
      details: ["Leistung: 140 kW / 190 PS", "Getriebe: Automatik Getriebe", "Antrieb: Vorderradantrieb"],
      photo: "/old-site/fahrzeuge/04.jpg",
    },
  ] satisfies Vehicle[],
} as const;

export type Getriebe = "automatik" | "schaltung";

/**
 * Transmission, read only from the vehicle's own text. Returns null when
 * the "Getriebe:" line and the "mit … ausgestattet" line don't both say
 * the same thing clearly – then the filter must not be shown.
 */
export function getriebeOf(v: Vehicle): Getriebe | null {
  const line = v.details.find((d) => d.startsWith("Getriebe:")) ?? "";
  const fromLine = /Automatik/.test(line) ? "automatik" : /Manuelles/.test(line) ? "schaltung" : null;
  const fromAusstattung = /Automatikschaltung/.test(v.ausstattung)
    ? "automatik"
    : /manueller Schaltung/.test(v.ausstattung)
      ? "schaltung"
      : null;
  return fromLine && fromLine === fromAusstattung ? fromLine : null;
}
