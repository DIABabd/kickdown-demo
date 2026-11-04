import type { Metadata } from "next";
import Image from "next/image";
import { Seam } from "@/components/site/seam";
import { PageShell } from "@/components/site/page-shell";
import { BueroCard, PraxisCard, TheorieCard } from "@/components/site/time-cards";
import styles from "@/components/site/page.module.css";
import { ui } from "@/content/start";
import { unterricht as u } from "@/content/unterricht";

export const metadata: Metadata = {
  title: u.metaTitle, // U1
  description: u.metaDescription, // U2
};

/**
 * /unterricht – "Theoretischer Unterricht" + "Praktischer Unterricht" (both
 * old pages) on one page. "Unterrichtsform" keeps its two links, now jump
 * links to #theorie / #praxis (everything stays visible – no tabs that hide
 * text). The Bürozeiten, shown on both old pages, appear once at the end.
 */
export default function UnterrichtPage() {
  return (
    <PageShell title={u.title} starts="day" ends="day">
      <section id="theorie" className={styles.day} aria-labelledby="theorie-title">
        <div className={styles.inner}>
          <nav aria-labelledby="unterrichtsform-title" style={{ marginBottom: 40 }}>
            <h2 id="unterrichtsform-title" className={styles.h3}>
              {u.unterrichtsform.title}
            </h2>
            <ul className={styles.jump}>
              {u.unterrichtsform.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.split}>
            <div className={styles.text}>
              <h2 id="theorie-title" className={styles.h2}>
                {u.theorie.title}
              </h2>
              <p>{u.theorie.text}</p>
              <TheorieCard />
            </div>
            <figure className={styles.figure}>
              {/* Cropped copy (DESIGN.md B17): supplier name, address, phone numbers,
                  e-mail and website removed. The original file is never served. */}
              <Image
                src={u.theorie.photo.src}
                alt={ui.theoryPhotoAlt}
                width={u.theorie.photo.w}
                height={u.theorie.photo.h}
                sizes="(min-width: 640px) 580px, 100vw"
                unoptimized
                className={styles.photo}
              />
            </figure>
          </div>
        </div>
      </section>

      <Seam />

      <section id="praxis" className={styles.night} aria-labelledby="praxis-title">
        <div className={styles.inner}>
          <div className={styles.split}>
            <div className={styles.text}>
              <h2 id="praxis-title" className={styles.h2}>
                {u.praxis.title}
              </h2>
              <p>
                <strong>{u.praxis.frage}</strong>
              </p>
              <p>{u.praxis.text}</p>
              <PraxisCard />
            </div>
            <figure className={styles.figure}>
              <Image
                src={u.praxis.photo.src}
                alt={ui.praxisPhotoAlt}
                width={u.praxis.photo.w}
                height={u.praxis.photo.h}
                sizes="(min-width: 640px) 580px, 100vw"
                unoptimized
                className={styles.photo}
              />
            </figure>
          </div>
        </div>
      </section>

      <Seam />

      <section id="buerozeiten" className={styles.day} aria-label="Bürozeiten">
        <div className={styles.inner}>
          <div style={{ maxWidth: 520 }}>
            <BueroCard headingLevel={2} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
