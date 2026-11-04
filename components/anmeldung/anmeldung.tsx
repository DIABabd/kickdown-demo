import { anmeldung } from "@/content/anmeldung";
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
      <div className={styles.dawn} aria-hidden="true" />
      <div className={styles.inner}>
        <h2 id="anmeldung-title" className={styles.h2}>
          {anmeldung.title}
        </h2>
        <SignupForm />
      </div>
    </section>
  );
}
