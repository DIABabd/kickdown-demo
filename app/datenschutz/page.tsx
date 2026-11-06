import type { Metadata } from "next";
import { LegalBody } from "@/components/site/legal-body";
import { pageTitleId } from "@/components/site/page-ids";
import { PageShell } from "@/components/site/page-shell";
import styles from "@/components/site/page.module.css";
import { datenschutz } from "@/content/datenschutz";
import { ui } from "@/content/start";

export const metadata: Metadata = { title: "Fahrschule Kickdown | Datenschutzerklärung" };

/** /datenschutz – old-site text word for word, with the required demo note. No animation. */
export default function DatenschutzPage() {
  return (
    <PageShell
      page="datenschutz" title={datenschutz.title} starts="day" ends="day">
      <section className={styles.day} aria-labelledby={pageTitleId("datenschutz")}>
        <div className={styles.inner}>
          <p className={styles.note} role="note">
            {ui.legalNote}
          </p>
          <LegalBody blocks={datenschutz.blocks} />
        </div>
      </section>
    </PageShell>
  );
}
