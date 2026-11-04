import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer/footer";
import { Seam } from "@/components/site/seam";
import { SiteHeader } from "@/components/site/site-header";
import { kontaktUi } from "@/content/kontakt";
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
      <SiteHeader />
      <main className={styles.main}>
        <div className={styles.inner}>
          <h1 className={styles.h1}>{kontaktUi.placeholder}</h1>
          <Link href="/" className={styles.back}>
            <span aria-hidden="true">← </span>
            {kontaktUi.backHome}
          </Link>
        </div>
      </main>
      <Seam />
      <Footer />
    </>
  );
}
