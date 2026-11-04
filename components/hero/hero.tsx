import Image from "next/image";
import Link from "next/link";
import { logoAlt, start, ui } from "@/content/start";
import { CarStill } from "./car-still";
import { HeroStage } from "./hero-stage";
import styles from "./hero.module.css";

export function Hero() {
  const [subTop, subBottom] = start.heroSubline;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            <Image src="/old-site/logo/logo.png" alt={logoAlt} width={200} height={50} priority />
          </Link>
          <span className={styles.demoPill}>
            {ui.privateDemo}
            <span className="sr-only"> – {ui.privateDemoHint}</span>
          </span>
        </div>
      </header>

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
      </main>
    </>
  );
}
