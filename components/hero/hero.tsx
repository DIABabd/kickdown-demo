import type { ReactNode } from "react";
import { pageTitleId } from "@/components/site/page-ids";
import { SiteHeader } from "@/components/site/site-header";
import { telefon } from "@/content/kontakt";
import { start, ui } from "@/content/start";
import { HeroMotion } from "./hero-motion";
import { HeroStage } from "./hero-stage";
import styles from "./hero.module.css";

/**
 * Full-screen homepage hero (DESIGN.md 4.1, dark cinematic version).
 *
 * Layers, back to front:
 *  1. atmosphere (CSS gradients)
 *  2. "KICKDOWN" – huge, quiet background lettering (decorative, aria-hidden)
 *  3. the 3D car on a transparent canvas covering the whole hero, so the
 *     car stands in front of the lettering
 *  4. the text: small line, headline, old-site line, call button + number
 *
 * Wording: "Deine Fahrschule Kickdown in Bremen" and "Dein Weg zum
 * Führerschein Klasse B" are from the old site (CONTENT.md); the headline
 * "Dein Kickstart in Bremen" is new and needs the owner's approval.
 */
export function Hero({ children }: { children?: ReactNode }) {
  return (
    <>
      <SiteHeader page="start" />
      <main>
        <section className={styles.hero} aria-labelledby={pageTitleId("start")} data-hero>
          <div className={styles.atmosphere} aria-hidden="true" />
          <p className={styles.word} aria-hidden="true" data-hero-word>
            {ui.heroWord}
          </p>

          <HeroStage />

          <div className={styles.content} data-hero-text>
            <p className={styles.eyebrow}>{start.heroTitle}</p>
            <h1 id={pageTitleId("start")} className={styles.title}>
              {ui.heroHeadline}
            </h1>
            <p className={styles.sub}>{start.heroSubline.join(" ")}</p>
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
            </div>
          </div>

          <HeroMotion />
        </section>
        {children}
      </main>
    </>
  );
}
