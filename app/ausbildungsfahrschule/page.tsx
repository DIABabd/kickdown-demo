import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/site/page-shell";
import styles from "@/components/site/page.module.css";
import { ausbildung as a } from "@/content/ausbildung";
import { adresse, kontaktUi, telefon } from "@/content/kontakt";
import { ui } from "@/content/start";

export const metadata: Metadata = { title: a.metaTitle }; // A1

/**
 * /ausbildungsfahrschule – heading, the one sentence, the shop-window photo
 * (complete, copyright notice untouched – owner question 13), phone and
 * address (DESIGN.md 3.2).
 */
export default function AusbildungPage() {
  return (
    <PageShell title={a.title} starts="day" ends="day">
      <section className={styles.day} aria-labelledby="page-title">
        <div className={styles.inner}>
          <div className={styles.split}>
            <div className={styles.text}>
              <p style={{ fontSize: 20 }}>{a.text}</p>
              <div className={styles.card} style={{ marginTop: 24 }}>
                <p style={{ margin: "0 0 12px" }}>
                  <a href={adresse.karte} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {adresse.strasse}
                    <br />
                    {adresse.ort}
                    <span className="sr-only"> {kontaktUi.newTab}</span>
                  </a>
                </p>
                <a href={telefon.href} className={styles.button}>
                  {telefon.text}
                </a>
              </div>
            </div>
            <figure className={styles.figure}>
              <Image
                src={a.photo.src}
                alt={ui.ausbildungPhotoAlt}
                width={a.photo.w}
                height={a.photo.h}
                sizes="(min-width: 640px) 580px, 100vw"
                unoptimized
                className={styles.photo}
              />
              <figcaption className={styles.approval}>{ui.photoApproval}</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
