import { telefon } from "@/content/kontakt";
import { buerozeiten, parseSpan, praxiszeiten, theoriezeiten } from "@/content/zeiten";
import styles from "./page.module.css";

/** A time in a plate frame; a trailing " und" stays as plain text (wording complete). */
function Plate({ text }: { text: string }) {
  const { label } = parseSpan(text);
  return (
    <>
      <span className={styles.plate}>{label}</span>
      {text.slice(label.length)}
    </>
  );
}

/** "Bürozeiten" exactly as in the footer / Unterricht pages, with the phone link. */
export function BueroCard({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className={styles.card}>
      <H className={styles.h3}>{buerozeiten.title}</H>
      <dl>
        {buerozeiten.slots.map((s) => (
          <div key={s.day} className={styles.slot}>
            <dt>{s.day}</dt>
            <dd>
              <Plate text={s.time} />
            </dd>
          </div>
        ))}
      </dl>
      <p style={{ margin: "16px 0 0" }}>
        <a href={telefon.href} className={styles.button}>
          {telefon.text}
        </a>
      </p>
    </div>
  );
}

/** "Theoriezeiten" exactly as on the old theory page. */
export function TheorieCard() {
  return (
    <div className={styles.card}>
      <h3 className={styles.h3}>{theoriezeiten.title}</h3>
      <dl>
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
  );
}

/** "Praxiszeiten" / "nach Vereinbarung" exactly as on the old practice page. */
export function PraxisCard() {
  return (
    <div className={styles.card}>
      <h3 className={styles.h3}>{praxiszeiten.title}</h3>
      <p style={{ margin: 0 }}>{praxiszeiten.text}</p>
    </div>
  );
}
