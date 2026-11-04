import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { start, ui } from "@/content/start";
import { CarStill } from "./car-still";
import { HeroStage } from "./hero-stage";
import styles from "./hero.module.css";

/** `children`: the homepage sections that follow the hero, inside the same <main>. */
export function Hero({ children }: { children?: ReactNode }) {
  const [subTop, subBottom] = start.heroSubline;

  return (
    <>
      <SiteHeader />

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <h1 id="hero-title" className={styles.title}>
            {start.heroTitle}
          </h1>

          <HeroStage still={<CarStill />} />

          <p className={styles.sub}>
            <span className={styles.subTop}>{subTop}</span>{" "}
            <span className={styles.subBottom}>{subBottom}</span>
          </p>

          <div className={styles.cta}>
            <a href="#anmeldung" className={styles.button}>
              {ui.signUp}
            </a>
          </div>
        </section>
        {children}
      </main>
    </>
  );
}
