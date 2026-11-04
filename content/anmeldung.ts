import { telefon } from "./kontakt";
import { buerozeiten } from "./zeiten";

/**
 * Sign-up SIMULATION (#anmeldung). Nothing is sent or stored.
 *
 * All words here are new UI / form texts (DESIGN.md 5.13: "Anmelden",
 * step names, "Anmeldung simulieren", "Ändern", form labels and error
 * texts, demo notices). The only facts used are real: the transmission
 * choice (from the vehicle texts), the Bürozeiten and the phone number.
 */
export const anmeldung = {
  title: "Anmeldung",
  /** Required wording, shown at every step and on the result screen. */
  demoNotice: "Demo: Es werden keine Daten gesendet oder gespeichert.",
  progress: (step: number, name: string) => `Schritt ${step} von 4: ${name}`,
  steps: ["Wunsch", "Zeiten", "Über dich", "Prüfen"] as const,

  getriebe: {
    question: "Möchtest du mit Automatik oder Schaltung fahren lernen?",
    summaryLabel: "Getriebe",
    options: [
      { value: "automatik", label: "Automatik" },
      { value: "schaltung", label: "Schaltung" },
    ],
    error: "Bitte wähle Automatik oder Schaltung.",
  },

  kontaktzeit: {
    question: "Wann bist du am besten erreichbar?",
    hint: `Zur Auswahl stehen unsere ${buerozeiten.title}.`,
    summaryLabel: "Kontaktzeit",
    // Real office hours only (content/zeiten.ts), "Montag: 16:30 Uhr bis 19:30 Uhr".
    options: buerozeiten.slots.map((s) => ({ value: s.day, label: `${s.day} ${s.time}` })),
    error: "Bitte wähle eine Kontaktzeit.",
  },

  kontakt: {
    question: "Deine Kontaktdaten",
    name: { label: "Name", errorEmpty: "Bitte gib deinen Namen ein." },
    phone: {
      label: "Telefonnummer",
      hint: "Nur Ziffern, Leerzeichen und + - / ( )",
      errorEmpty: "Bitte gib deine Telefonnummer ein.",
      errorInvalid: "Bitte gib eine gültige Telefonnummer ein.",
    },
  },

  review: {
    question: "Bitte prüfe deine Angaben.",
    change: "Ändern",
    submit: "Anmeldung simulieren",
  },

  nav: { back: "Zurück", next: "Weiter" },

  result: {
    title: "Simulation beendet – es wurde keine Anmeldung gesendet.",
    text: "Es wurde nichts gesendet oder gespeichert. Für eine echte Anmeldung ruf uns während der Bürozeiten an.",
    restart: "Simulation neu starten",
  },

  buerozeiten,
  telefon,
} as const;

/** Simple phone check: allowed characters only, 6–15 digits. */
export function phoneProblem(value: string): "empty" | "invalid" | null {
  const v = value.trim();
  if (!v) return "empty";
  if (!/^\+?[\d\s/()-]+$/.test(v)) return "invalid";
  const digits = v.replace(/\D/g, "").length;
  return digits >= 6 && digits <= 15 ? null : "invalid";
}
