import { SectionHeading } from "@/components/site/section-heading";
import { anmeldung } from "@/content/anmeldung";
import { ui } from "@/content/start";
import { SignupForm } from "./signup-form";
import styles from "./anmeldung.module.css";

/**
 * "Anmeldung" (#anmeldung) – 4-step SIMULATED sign-up, daylight style
 * (DESIGN.md 4.7). The hero's "Jetzt anmelden" and the journey's
 * "Anmelden" already link to #anmeldung.
 */
export function Anmeldung() {
  return (
    <section id="anmeldung" className={styles.section} aria-labelledby="anmeldung-title">
      <div className={styles.inner}>
        <SectionHeading id="anmeldung-title" eyebrow={ui.eyebrows.anmeldung} title={anmeldung.title} tone="day" />
        <SignupForm />
      </div>
    </section>
  );
}
