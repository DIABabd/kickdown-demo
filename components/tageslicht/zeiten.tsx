import { SectionHeading } from "@/components/site/section-heading";
import { telefon } from "@/content/kontakt";
import { ui } from "@/content/start";
import { buerozeiten, parseSpan, praxiszeiten, theoriezeiten } from "@/content/zeiten";
import styles from "./tageslicht.module.css";

/**
 * Times (#zeiten) – daylight section, DESIGN.md 4.6. The ONE main place
 * for the full office hours on the homepage (elsewhere: a link here; the
 * footer and the sign-up result keep them too).
 *
 * The three cards carry the exact wording (definition lists) at every
 * width. The former desktop week overview repeated the same times and was
 * removed: the cards are the clearer choice – exact old-site wording,
 * readable by screen readers, the phone button next to the office hours.
 */
export function Zeiten() {
  return (
    <section id="zeiten" className={`${styles.day} ${styles.dayTimes}`} aria-labelledby="zeiten-title">
      <div className={styles.inner}>
        <SectionHeading id="zeiten-title" eyebrow={ui.eyebrows.zeiten} title={ui.zeitenTitle} tone="day" />

        <div className={styles.blocks}>
          <div className={styles.block}>
            <h3 className={styles.h3}>{buerozeiten.title}</h3>
            <dl className={styles.slots}>
              {buerozeiten.slots.map((s) => (
                <div key={s.day} className={styles.slot}>
                  <dt>{s.day}</dt>
                  <dd>
                    <Plate text={s.time} />
                  </dd>
                </div>
              ))}
            </dl>
            <a href={telefon.href} className={styles.phone}>
              <PhoneIcon />
              {telefon.text}
            </a>
          </div>

          <div className={styles.block}>
            <h3 className={styles.h3}>{theoriezeiten.title}</h3>
            <dl className={styles.slots}>
              <div className={styles.slot}>
                <dt>{theoriezeiten.tage}</dt>
                {theoriezeiten.slots.map((t) => (
                  <dd key={t}>
                    <Plate text={t} />
                  </dd>
                ))}
              </div>
            </dl>
          </div>

          <div className={styles.block}>
            <h3 className={styles.h3}>{praxiszeiten.title}</h3>
            <p className={styles.plain}>{praxiszeiten.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A time in a plate-like frame. "17:00 Uhr bis 18:30 Uhr und" keeps its
 * trailing "und" as text next to the frame – the wording stays complete.
 */
function Plate({ text }: { text: string }) {
  const { label } = parseSpan(text);
  const rest = text.slice(label.length);
  return (
    <>
      <span className={styles.plate}>{label}</span>
      {rest}
    </>
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
