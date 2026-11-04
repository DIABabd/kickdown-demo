import type { Metadata } from "next";
import { InlineText } from "@/components/site/legal-body";
import { PageShell } from "@/components/site/page-shell";
import styles from "@/components/site/page.module.css";
import { cookies } from "@/content/cookies";
import { ui } from "@/content/start";

export const metadata: Metadata = { title: `Fahrschule Kickdown | ${cookies.metaTitle}` }; // G11/G12

/**
 * /cookie-einstellungen – labelled, inert preview of the old site's cookie
 * banner and "Cookie Einstellungen" dialog (CONTENT.md: Cookie-Banner und
 * Cookie-Einstellungen). The demo sets no cookies and uses no browser
 * storage: every button below is disabled, and nothing here is wired to a
 * real consent mechanism. Linked from the footer ("Cookie-Einstellungen").
 */
export default function CookieEinstellungenPage() {
  return (
    <PageShell title={cookies.metaTitle} starts="day" ends="day">
      <section className={styles.day} aria-labelledby="page-title">
        <div className={styles.inner}>
          <p className={styles.note} role="note">
            {ui.cookieNote}
          </p>

          <section className={styles.preview} aria-labelledby="cookie-banner-label">
            <p id="cookie-banner-label" className={styles.previewLabel}>
              {ui.cookieBannerLabel}
            </p>
            <p>
              <InlineText parts={cookies.banner.text} />
            </p>
            <div className={styles.previewButtons}>
              <button type="button" disabled title={ui.cookieNoSave}>
                {cookies.banner.acceptClose}
              </button>
              <button type="button" disabled title={ui.cookieNoSave}>
                {cookies.banner.settingsLink}
              </button>
            </div>
          </section>

          <details className={styles.details}>
            <summary>{ui.cookieDialogLabel}</summary>
            <div className={`${styles.preview} ${styles.prose}`} style={{ marginTop: 16 }}>
              <h2>{cookies.dialog.title}</h2>
              {cookies.dialog.groups.map((group) => (
                <div key={group.title}>
                  <h3>{group.title}</h3>
                  {group.text.map((paragraph, i) => (
                    <p key={i}>
                      <InlineText parts={paragraph} />
                    </p>
                  ))}
                </div>
              ))}
              <p>
                <InlineText parts={cookies.dialog.more} />
              </p>
              <div className={styles.previewButtons}>
                {cookies.dialog.buttons.map((label) => (
                  <button key={label} type="button" disabled title={ui.cookieNoSave}>
                    {label}
                  </button>
                ))}
              </div>
              <p className={styles.previewLabel}>{ui.cookieNoSave}</p>
            </div>
          </details>
        </div>
      </section>
    </PageShell>
  );
}
