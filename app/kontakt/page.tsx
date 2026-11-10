import type { Metadata } from "next";
import Image from "next/image";
import { pageTitleId } from "@/components/site/page-ids";
import { PageShell } from "@/components/site/page-shell";
import styles from "@/components/site/page.module.css";
import { adresse, kontaktSeite as k, kontaktUi, telefon } from "@/content/kontakt";
import { start, ui } from "@/content/start";

export const metadata: Metadata = { title: k.metaTitle }; // K0

/**
 * /kontakt – the old contact text word for word (K1: names only Montag and
 * Samstag), name + address (one map link) and phone (one call link, K2–K4),
 * and the shop-window photo (DESIGN.md 3.2). The full office hours (incl.
 * Freitag) are in the footer on every page; the separate hours card and the
 * address sign were removed as duplicates (Nov 2026). No Google Maps
 * iframe, no hidden second phone number.
 */
export default function KontaktPage() {
  const photo = start.willkommen.photo;
  return (
    <PageShell
      page="kontakt"
      title={k.title}
      starts="day"
      ends="day"
      intro={
        <p className={styles.intro}>
          {k.intro[0]}
          <br />
          {k.intro[1]}
        </p>
      }
    >
      <section className={styles.day} aria-labelledby={pageTitleId("kontakt")}>
        <div className={styles.inner}>
          <div className={styles.split}>
            <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
              <div className={styles.card}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
                  <li>
                    <a href={adresse.karte} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {k.name}
                      <br />
                      {k.adresse}
                      <span className="sr-only"> {kontaktUi.newTab}</span>
                    </a>
                  </li>
                  <li style={{ marginTop: 8 }}>
                    <a href={telefon.href} className={styles.link}>
                      {k.telefonLabel} {k.telefonNummer}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <figure className={styles.figure}>
              <Image
                src={photo.src}
                alt={ui.photoAlt}
                width={photo.w}
                height={photo.h}
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
