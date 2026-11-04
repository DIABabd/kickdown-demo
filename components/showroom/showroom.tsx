import Image from "next/image";
import { SectionHeading } from "@/components/site/section-heading";
import { fahrzeuge, getriebeOf, type Getriebe, type Vehicle } from "@/content/fahrzeuge";
import { ui } from "@/content/start";
import { BayRow } from "./bay-row";
import styles from "./showroom.module.css";

/**
 * "Der Showroom" – all 7 vehicles (#fahrzeuge), night style, DESIGN.md 4.5.
 *
 * Vehicles whose text is COMPLETELY identical (name, "mit … ausgestattet"
 * line and every spec line) share one card with all their original photos
 * – today the three automatic VW T-Roc (05, 06, 07). The manual VW T-Roc
 * (03) has different text and keeps its own card. No text is changed.
 *
 * Every vehicle's full text is always visible; nothing waits for an
 * animation. Photos are the original 370 × 400 files, served unchanged
 * (`unoptimized`) and shown at most 248 × 268 CSS px (DESIGN.md 2.5).
 *
 * The Automatik/Schaltung filter is only rendered when every vehicle's
 * transmission is stated clearly in its own text (see getriebeOf). Native
 * radio buttons + CSS (:has): works without JavaScript; without :has()
 * support all vehicles simply stay visible.
 */

type Group = { vehicle: Vehicle; photos: string[]; getriebe: Getriebe | null };

const textKey = (v: Vehicle) => JSON.stringify([v.name, v.ausstattung, v.details]);

function groupIdentical(list: readonly Vehicle[]): Group[] {
  const groups: Group[] = [];
  const byKey = new Map<string, Group>();
  for (const v of list) {
    const key = textKey(v);
    const existing = byKey.get(key);
    if (existing) existing.photos.push(v.photo);
    else {
      const g = { vehicle: v, photos: [v.photo], getriebe: getriebeOf(v) };
      byKey.set(key, g);
      groups.push(g);
    }
  }
  return groups;
}

export function Showroom() {
  const groups = groupIdentical(fahrzeuge.list);
  const showFilter = groups.every((g) => g.getriebe !== null);

  return (
    <section id="fahrzeuge" className={styles.showroom} aria-labelledby="fahrzeuge-title">
      <div className={styles.inner}>
        <SectionHeading id="fahrzeuge-title" eyebrow={ui.eyebrows.showroom} title={fahrzeuge.title} tone="night" />

        <div className={styles.room}>
          {showFilter && (
            <div className={styles.filter} role="radiogroup" aria-labelledby="fahrzeuge-title">
              <FilterOption value="alle" label={ui.filterAlle} defaultChecked />
              <FilterOption value="automatik" label={ui.filterAutomatik} />
              <FilterOption value="schaltung" label={ui.filterSchaltung} />
            </div>
          )}

          <BayRow className={styles.bays}>
            {groups.map((g, i) => (
              <Bay key={g.photos[0]} group={g} index={i} />
            ))}
          </BayRow>
        </div>
      </div>
    </section>
  );
}

function FilterOption({ value, label, defaultChecked }: { value: string; label: string; defaultChecked?: boolean }) {
  const id = `fahrzeug-filter-${value}`;
  return (
    <>
      <input type="radio" name="fahrzeug-filter" id={id} value={value} defaultChecked={defaultChecked} />
      <label htmlFor={id}>{label}</label>
    </>
  );
}

/** "Leistung: 110 kW / 150 PS" → ["Leistung:", "110 kW / 150 PS"] – same words, just two cells. */
function splitDetail(line: string): [string, string] {
  const at = line.indexOf(": ");
  return at < 0 ? [line, ""] : [line.slice(0, at + 1), line.slice(at + 2)];
}

function Bay({ group, index }: { group: Group; index: number }) {
  const { vehicle: v, photos, getriebe } = group;
  const headingId = `fahrzeug-${index + 1}`;
  const many = photos.length > 1;

  return (
    <li className={styles.bay} data-getriebe={getriebe ?? undefined} data-photos={photos.length}>
      {/* Focusable so keyboard users get the same spotlight as on hover. */}
      <article className={styles.card} tabIndex={0} aria-labelledby={headingId}>
        <div className={many ? `${styles.stage} ${styles.stageMany}` : styles.stage}>
          {photos.map((src, n) => (
            <div key={src} className={styles.spot}>
              <div className={styles.frame}>
                <Image
                  src={src}
                  // Alt text uses only what the site itself says about the car.
                  alt={`${v.name}, ${v.ausstattung}${many ? ` (${ui.photoOf(n + 1, photos.length)})` : ""}`}
                  width={fahrzeuge.photoPx.w}
                  height={fahrzeuge.photoPx.h}
                  sizes="248px"
                  unoptimized
                  className={styles.photo}
                />
              </div>
              {/* Floor reflection: the same file, flipped with CSS – decorative. */}
              <div className={styles.reflection} aria-hidden="true">
                <Image
                  src={src}
                  alt=""
                  width={fahrzeuge.photoPx.w}
                  height={fahrzeuge.photoPx.h}
                  sizes="248px"
                  unoptimized
                  className={styles.photo}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.info}>
          <h3 id={headingId} className={styles.name}>
            {v.name}
          </h3>
          <p className={styles.ausstattung}>{v.ausstattung}</p>
          <p className={styles.detailsTitle}>{fahrzeuge.detailsTitle}</p>
          <dl className={styles.specs}>
            {v.details.map((line) => {
              const [label, value] = splitDetail(line);
              return (
                <div key={line} className={styles.spec}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              );
            })}
          </dl>
          <p className={styles.fazit}>{fahrzeuge.fazit}</p>
        </div>
      </article>
    </li>
  );
}
