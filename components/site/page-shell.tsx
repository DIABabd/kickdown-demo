import type { ReactNode } from "react";
import { Footer } from "@/components/footer/footer";
import { pageTitleId, type PageKey } from "./page-ids";
import { Seam } from "./seam";
import { SiteHeader } from "./site-header";
import styles from "./page.module.css";

/**
 * Frame for every subpage: site header, a night page header (just the
 * <h1>, no eyebrow label), the page content, the footer. `content` says
 * whether the content starts / ends in a day or night section, so the
 * night ↔ day seams sit in the right places. `page` scopes every id on the
 * page (see page-ids.ts); the <h1> gets `pageTitleId(page)`, so sections can
 * point their aria-labelledby there.
 */
export function PageShell({
  page,
  title,
  intro,
  starts,
  ends,
  children,
}: {
  page: PageKey;
  title: string;
  intro?: ReactNode;
  starts: "day" | "night";
  ends: "day" | "night";
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader page={page} />
      <main>
        <section className={styles.pageHeader} aria-labelledby={pageTitleId(page)}>
          <div className={styles.inner}>
            <h1 id={pageTitleId(page)} className={styles.h1}>
              {title}
            </h1>
            {intro}
          </div>
        </section>
        {starts === "day" && <Seam />}
        {children}
        {ends === "day" && <Seam />}
      </main>
      <Footer page={page} />
    </>
  );
}
