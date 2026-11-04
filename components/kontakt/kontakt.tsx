import { adresse, fragen, instagram, kontaktUi, telefon } from "@/content/kontakt";
import { buerozeiten } from "@/content/zeiten";
import styles from "./kontakt.module.css";

/**
 * Contact block (#kontakt) – DESIGN.md section 9 ("Du hast Fragen …").
 * Night section with two "signs": a blue road sign for the address
 * (map link opens Google Maps in a new tab – nothing is embedded or
 * loaded from Google) and a white number-plate card for phone + hours.
 */
export function Kontakt() {
  return (
    <section id="kontakt" className={styles.kontakt} aria-labelledby="kontakt-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="kontakt-title" className={styles.h2}>
            {fragen.title}
          </h2>
          <p className={styles.text}>{fragen.text}</p>
        </div>

        <div className={styles.signs}>
          {/* Daylight card: phone + office hours */}
          <div className={styles.plate}>
            <a href={telefon.href} className={styles.phone}>
              <PhoneIcon />
              <PhoneText />
            </a>
            <h3 className={styles.h3}>{buerozeiten.title}</h3>
            <dl className={styles.hours}>
              {buerozeiten.slots.map((s) => (
                <div key={s.day}>
                  <dt>{s.day}</dt>
                  <dd>{s.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Night road sign: address, route, Instagram */}
          <div className={styles.roadSign}>
            <address className={styles.address}>
              <PinIcon />
              <span>
                {adresse.strasse}
                <br />
                {adresse.ort}
              </span>
            </address>
            <div className={styles.links}>
              <a href={adresse.karte} target="_blank" rel="noopener noreferrer" className={styles.route}>
                {kontaktUi.route}
                <span aria-hidden="true"> ↗</span>
                <span className="sr-only"> {kontaktUi.newTab}</span>
              </a>
              <a href={instagram.href} target="_blank" rel="noopener noreferrer" className={styles.insta}>
                <CameraIcon />
                {kontaktUi.instagram}
                <span className="sr-only"> {kontaktUi.newTab}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * "Telefon: 01 76 - 70 386 440" – same words, but the number itself never
 * breaks across lines; if space is short the line breaks after "Telefon:".
 */
function PhoneText() {
  const at = telefon.text.indexOf(": ");
  return (
    <span>
      {telefon.text.slice(0, at + 1)}{" "}
      <span className={styles.nowrap}>{telefon.text.slice(at + 2)}</span>
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"
        fill="currentColor"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor" />
    </svg>
  );
}

/** Generic camera glyph (no brand logo). */
export function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}
