import { telefon } from "@/content/kontakt";
import { ui } from "@/content/start";
import { buerozeiten, parseSpan, praxiszeiten, theoriezeiten } from "@/content/zeiten";
import styles from "./tageslicht.module.css";

/**
 * Times (#zeiten) – daylight section, DESIGN.md 4.6.
 * The three blocks carry the exact wording (definition lists). On desktop
 * a week overview adds bars on a 14–21 h axis for scanning; it repeats
 * the same texts, so it is hidden from screen readers.
 */
export function Zeiten() {
  return (
    <section id="zeiten" className={`${styles.day} ${styles.dayTimes}`} aria-labelledby="zeiten-title">
      <div className={styles.inner}>
        <h2 id="zeiten-title" className={styles.h2}>
          {ui.zeiten}
        </h2>

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

        <WeekOverview />
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

/* ---------- Week overview (desktop, decorative duplicate) ---------- */

const WEEK = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"] as const;
const AXIS = { from: 14, to: 21 } as const;

type Bar = { kind: "buero" | "theorie"; from: number; to: number; label: string };

function weekBars(): Record<(typeof WEEK)[number], Bar[]> {
  const days = Object.fromEntries(WEEK.map((d) => [d, [] as Bar[]])) as Record<(typeof WEEK)[number], Bar[]>;
  for (const s of buerozeiten.slots) {
    const day = s.day.replace(/:$/, "") as (typeof WEEK)[number];
    days[day].push({ kind: "buero", ...parseSpan(s.time) });
  }
  for (const day of theoriezeiten.tageListe) {
    for (const t of theoriezeiten.slots) days[day].push({ kind: "theorie", ...parseSpan(t) });
  }
  for (const bars of Object.values(days)) {
    for (const b of bars) {
      if (b.from < AXIS.from || b.to > AXIS.to) throw new Error(`Time ${b.label} outside the week axis`);
    }
  }
  return days;
}

function WeekOverview() {
  const days = weekBars();
  const pos = (h: number) => `${((h - AXIS.from) / (AXIS.to - AXIS.from)) * 100}%`;
  const hours = Array.from({ length: AXIS.to - AXIS.from + 1 }, (_, i) => AXIS.from + i);

  return (
    <div className={styles.week} aria-hidden="true">
      <div className={styles.legend}>
        <span className={styles.legendBuero}>{buerozeiten.title}</span>
        <span className={styles.legendTheorie}>{theoriezeiten.title}</span>
        <span className={styles.legendPraxis}>
          {praxiszeiten.title}: {praxiszeiten.text}
        </span>
      </div>
      <div className={styles.weekRows}>
        {WEEK.map((day) => (
          <div key={day} className={styles.weekRow}>
            <span className={styles.weekDay}>{day}</span>
            <div className={styles.track}>
              {hours.map((h) => (
                <span key={h} className={styles.tick} style={{ left: pos(h) }} />
              ))}
              {days[day].map((b) => (
                <span
                  key={b.label}
                  className={b.kind === "buero" ? styles.barBuero : styles.barTheorie}
                  style={{ left: pos(b.from), width: `calc(${pos(b.to)} - ${pos(b.from)})` }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
