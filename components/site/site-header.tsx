import Image from "next/image";
import Link from "next/link";
import { HeaderTheme } from "@/components/hero/header-theme";
import { telefon } from "@/content/kontakt";
import { logoAlt, ui } from "@/content/start";
import { NavMenu } from "./nav-menu";
import styles from "./site.module.css";

/**
 * Sticky site header (DESIGN.md 2.6 / 3.3): logo, "Private Demo" label,
 * navigation (Preise · Fahrzeuge · Team · Kontakt · Anmelden) and, on
 * phones, a fixed bottom bar (Anrufen · Zeiten · Anmelden). The bar has
 * its own reserved space at the bottom of the page, so it never covers
 * content (see .bottomBar / body padding in site.module.css).
 */
export function SiteHeader() {
  return (
    <>
      <header className={styles.header} data-site-header>
        <HeaderTheme />
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            {/* Original logo file, served unchanged (no re-encoding). */}
            <Image src="/old-site/logo/logo.png" alt={logoAlt} width={200} height={50} priority unoptimized />
          </Link>
          <span className={styles.demoPill}>
            {ui.privateDemo}
            <span className="sr-only"> – {ui.privateDemoHint}</span>
          </span>
          <NavMenu />
        </div>
      </header>

      <nav className={styles.bottomBar} aria-label={ui.bottomBar.label}>
        <a href={telefon.href} className={styles.barItem}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <path
              d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"
              fill="currentColor"
            />
          </svg>
          {ui.bottomBar.call}
          {/* the visible number, for screen readers */}
          <span className="sr-only">: {telefon.text}</span>
        </a>
        <Link href={ui.bottomBar.times.href} className={styles.barItem}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {ui.bottomBar.times.label}
        </Link>
        <Link href={ui.bottomBar.contact.href} className={`${styles.barItem} ${styles.barPrimary}`}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <path d="M5 12h12M12 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {ui.bottomBar.contact.label}
        </Link>
      </nav>
    </>
  );
}
