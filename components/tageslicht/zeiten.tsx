import { SectionHeading } from "@/components/site/section-heading";
import { pageId } from "@/components/site/page-ids";
import { ui } from "@/content/start";
import { buerozeiten, parseSpan, praxiszeiten, theoriezeiten } from "@/content/zeiten";
import styles from "./tageslicht.module.css";

/** Homepage-only section: its heading id is scoped to the start page. */
const TITLE_ID = pageId("start", "zeiten-title");

/**
 * Times (#zeiten) – daylight section, DESIGN.md 4.6. The ONE main place
 * for the full office hours on the homepage (elsewhere: a link here; the
 * footer and the sign-up result keep them too).
 *
 * The three cards carry the exact wording (definition lists) at every
 * width. The former desktop week overview repeated the same times and was
 * removed: the cards are the clearer choice – exact old-site wording,
 * readable by screen readers. The phone is in the contact section right
 * below (and the footer), so it is not repeated here.
 */
export function Zeiten() {
  return (
    <section id="zeiten" className={`${styles.day} ${styles.dayTimes}`} aria-labelledby={TITLE_ID}>
      <div className={styles.inner}>
        <SectionHeading id={TITLE_ID} title={ui.zeitenTitle} tone="day" />

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
