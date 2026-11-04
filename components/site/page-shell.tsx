import type { ReactNode } from "react";
import { Footer } from "@/components/footer/footer";
import { ui } from "@/content/start";
import { Seam } from "./seam";
import { SiteHeader } from "./site-header";
import styles from "./page.module.css";

/** id of every subpage's <h1> – sections can point their aria-labelledby here. */
export const PAGE_TITLE_ID = "page-title";

/**
 * Frame for every subpage: site header, a night page header (same heading
 * pattern as the homepage: small label + heading, here the <h1>), the page
 * content, the footer. `content` says whether the content starts / ends in
 * a day or night section, so the night ↔ day seams sit in the right places.
 */
export function PageShell({
  title,
  intro,
  starts,
  ends,
  children,
}: {
  title: string;
  intro?: ReactNode;
  starts: "day" | "night";
  ends: "day" | "night";
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className={styles.pageHeader} aria-labelledby={PAGE_TITLE_ID}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>{ui.pageEyebrow}</p>
            <h1 id={PAGE_TITLE_ID} className={styles.h1}>
              {title}
            </h1>
            {intro}
          </div>
        </section>
        {starts === "day" && <Seam />}
        {children}
        {ends === "day" && <Seam />}
      </main>
      <Footer />
    </>
  );
}
