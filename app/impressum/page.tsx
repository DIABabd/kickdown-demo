import type { Metadata } from "next";
import { LegalBody } from "@/components/site/legal-body";
import { PageShell } from "@/components/site/page-shell";
import styles from "@/components/site/page.module.css";
import { impressum } from "@/content/impressum";
import { ui } from "@/content/start";

export const metadata: Metadata = { title: "Fahrschule Kickdown | Impressum" };

/** /impressum – old-site text word for word, with the required demo note. No animation. */
export default function ImpressumPage() {
  return (
    <PageShell title={impressum.title} starts="day" ends="day">
      <section className={styles.day} aria-labelledby="page-title">
        <div className={styles.inner}>
          <p className={styles.note} role="note">
            {ui.legalNote}
          </p>
          <LegalBody blocks={impressum.blocks} />
        </div>
      </section>
    </PageShell>
  );
}
