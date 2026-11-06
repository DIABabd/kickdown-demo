import type { ReactNode } from "react";
import { pageTitleId } from "@/components/site/page-ids";
import { SiteHeader } from "@/components/site/site-header";
import { telefon } from "@/content/kontakt";
import { start, ui } from "@/content/start";
import { CarStill } from "./car-still";
import { HeroStage } from "./hero-stage";
import styles from "./hero.module.css";

/**
 * Homepage hero: a small line, one calm headline and the call button on the
 * left; the turning 3D car on the right – both on the header's 1200 px grid.
 * Wording from CONTENT.md: "Deine Fahrschule Kickdown in Bremen" as the small
 * line, "Dein Weg zum Führerschein Klasse B" as the headline.
 */
export function Hero({ children }: { children?: ReactNode }) {
  return (
    <>
      <SiteHeader page="start" />
      <main>
        <section className={styles.hero} aria-labelledby={pageTitleId("start")}>
          <div className={styles.inner}>
            <div className={styles.text}>
              <p className={styles.eyebrow}>{start.heroTitle}</p>
              <h1 id={pageTitleId("start")} className={styles.title}>
                {start.heroSubline.join(" ")}
              </h1>
            </div>
            <HeroStage still={<CarStill />} />
            <div className={styles.cta}>
              <a href={telefon.href} className={styles.button}>
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
                  <path
                    d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"
                    fill="currentColor"
                  />
                </svg>
                {ui.callNow}
              </a>
              <a href={telefon.href} className={styles.phone}>
                {telefon.text}
              </a>
            </div>
          </div>
        </section>
        {children}
      </main>
    </>
  );
}
