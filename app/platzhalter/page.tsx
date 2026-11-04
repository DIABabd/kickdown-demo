import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer/footer";
import headerStyles from "@/components/hero/hero.module.css";
import { kontaktUi } from "@/content/kontakt";
import { logoAlt, ui } from "@/content/start";
import styles from "./platzhalter.module.css";

// Shared placeholder for pages that are built after the homepage is approved
// (DESIGN.md 3.1). noindex comes from the root layout, robots.ts and the
// X-Robots-Tag header like on every page.
export const metadata: Metadata = {
  title: "Fahrschule Kickdown",
};

export default function Platzhalter() {
  return (
    <>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerInner}>
          <Link href="/" className={headerStyles.logo}>
            <Image src="/old-site/logo/logo.png" alt={logoAlt} width={200} height={50} priority />
          </Link>
          <span className={headerStyles.demoPill}>
            {ui.privateDemo}
            <span className="sr-only"> – {ui.privateDemoHint}</span>
          </span>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.inner}>
          <h1 className={styles.h1}>{kontaktUi.placeholder}</h1>
          <Link href="/" className={styles.back}>
            <span aria-hidden="true">← </span>
            {kontaktUi.backHome}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
