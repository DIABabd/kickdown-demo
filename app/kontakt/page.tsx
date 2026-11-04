import type { Metadata } from "next";
import Image from "next/image";
import kontaktStyles from "@/components/kontakt/kontakt.module.css";
import { PageShell } from "@/components/site/page-shell";
import styles from "@/components/site/page.module.css";
import { BueroCard } from "@/components/site/time-cards";
import { adresse, kontaktSeite as k, kontaktUi, telefon } from "@/content/kontakt";
import { start, ui } from "@/content/start";

export const metadata: Metadata = { title: k.metaTitle }; // K0

/**
 * /kontakt – the old contact text word for word (K1: names only Montag and
 * Samstag), name, address and phone (K2–K4), the office hours as in the
 * footer (owner question 1), the shop-window photo and a static map card
 * with "Route planen" (DESIGN.md 3.2). No Google Maps iframe, no hidden
 * second phone number.
 */
export default function KontaktPage() {
  const photo = start.willkommen.photo;
  return (
    <PageShell
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
      <section className={styles.day} aria-labelledby="page-title">
        <div className={styles.inner}>
          <div className={styles.split}>
            <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
              <div className={styles.card}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
                  <li>
                    <a href={adresse.karte} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {k.name}
                      <span className="sr-only"> {kontaktUi.newTab}</span>
                    </a>
                  </li>
                  <li>
                    <a href={adresse.karte} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {k.adresse}
                      <span className="sr-only"> {kontaktUi.newTab}</span>
                    </a>
                  </li>
                  <li style={{ marginTop: 8 }}>
                    <a href={telefon.href} className={styles.link}>
                      {k.telefonLabel}
                    </a>{" "}
                    <a href={telefon.href} className={styles.link}>
                      {k.telefonNummer}
                    </a>
                  </li>
                </ul>
              </div>

              <BueroCard />

              {/* Static map card – an outbound link only, nothing is loaded from Google. */}
              <div className={kontaktStyles.roadSign}>
                <address className={kontaktStyles.address}>
                  <span>
                    {adresse.strasse}
                    <br />
                    {adresse.ort}
                  </span>
                </address>
                <div className={kontaktStyles.links}>
                  <a href={adresse.karte} target="_blank" rel="noopener noreferrer" className={kontaktStyles.route}>
                    {kontaktUi.route}
                    <span aria-hidden="true"> ↗</span>
                    <span className="sr-only"> {kontaktUi.newTab}</span>
                  </a>
                </div>
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
