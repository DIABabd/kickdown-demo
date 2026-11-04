import Image from "next/image";
import Link from "next/link";
import { CameraIcon } from "@/components/kontakt/kontakt";
import { adresse, footer, instagram, kontaktUi, telefon } from "@/content/kontakt";
import { logoAlt, ui } from "@/content/start";
import { buerozeiten, theoriezeiten } from "@/content/zeiten";
import styles from "./footer.module.css";

/**
 * Site footer (DESIGN.md 3.3) – all texts word for word from the old
 * footer. Links to pages that don't exist yet go to the shared
 * placeholder (DESIGN.md 3.1). Outbound links (map, Instagram, KS Design)
 * are plain links: nothing is loaded from those sites.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <Link href="/" className={styles.logo}>
              <Image src="/old-site/logo/f-logo.png" alt={logoAlt} width={200} height={50} />
            </Link>
            <span className={styles.demoPill}>
              {ui.privateDemo}
              <span className="sr-only"> – {ui.privateDemoHint}</span>
            </span>
          </div>
          <a href={adresse.karte} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
            {adresse.strasse}
            <br />
            {adresse.ort}
            <span className="sr-only"> {kontaktUi.newTab}</span>
          </a>
          <a href={telefon.href} className={styles.textLink}>
            {telefon.text}
          </a>
        </div>

        <nav className={styles.col} aria-labelledby="footer-infos">
          <h2 id="footer-infos" className={styles.h2}>
            {footer.infos.title}
          </h2>
          <ul className={styles.list}>
            {footer.infos.links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={styles.textLink}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.h2}>{buerozeiten.title}</h2>
          <dl className={styles.times}>
            {buerozeiten.slots.map((s) => (
              <div key={s.day}>
                <dt>{s.day}</dt>
                <dd>{s.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.col}>
          <h2 className={styles.h2}>{theoriezeiten.title}</h2>
          <dl className={styles.times}>
            <div>
              <dt>{theoriezeiten.tage}</dt>
              {theoriezeiten.slots.map((t) => (
                <dd key={t}>{t}</dd>
              ))}
            </div>
          </dl>
          <a href={instagram.href} target="_blank" rel="noopener noreferrer" className={styles.insta}>
            <CameraIcon />
            {kontaktUi.instagram}
            <span className="sr-only"> {kontaktUi.newTab}</span>
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <nav aria-label={kontaktUi.legalNav}>
            <ul className={styles.legal}>
              {footer.legal.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.textLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a href={footer.credit.href} target="_blank" rel="noopener noreferrer" className={styles.credit}>
            {footer.credit.text}
            <span className="sr-only"> {kontaktUi.newTab}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
