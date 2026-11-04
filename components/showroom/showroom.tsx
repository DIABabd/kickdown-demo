import Image from "next/image";
import { fahrzeuge, getriebeOf, type Getriebe, type Vehicle } from "@/content/fahrzeuge";
import { ui } from "@/content/start";
import { BayRow } from "./bay-row";
import styles from "./showroom.module.css";

/**
 * "Der Showroom" – all 7 vehicles (#fahrzeuge), night style, DESIGN.md 4.5.
 *
 * Every vehicle's full text is always visible; nothing waits for an
 * animation. Photos are the original 370 × 400 files, served unchanged
 * (`unoptimized`: no re-encoding, no resizing) and shown at most
 * 248 × 268 CSS px, so they are never upscaled beyond DESIGN.md 2.5.
 *
 * The Automatik/Schaltung filter is only rendered when every vehicle's
 * transmission is stated clearly in its own text (see getriebeOf).
 * It uses native radio buttons + CSS (:has), so it works without
 * JavaScript; without :has() support all vehicles simply stay visible.
 */
export function Showroom() {
  const list = fahrzeuge.list.map((v) => ({ v, getriebe: getriebeOf(v) }));
  const showFilter = list.every((x) => x.getriebe !== null);

  return (
    <section id="fahrzeuge" className={styles.showroom} aria-labelledby="fahrzeuge-title">
      <div className={styles.dusk} aria-hidden="true" />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{ui.showroom}</p>
        <h2 id="fahrzeuge-title" className={styles.h2}>
          {fahrzeuge.title}
        </h2>

        <div className={styles.room}>
          {showFilter && (
            <div className={styles.filter} role="radiogroup" aria-labelledby="fahrzeuge-title">
              <FilterOption value="alle" label={ui.filterAlle} defaultChecked />
              <FilterOption value="automatik" label={ui.filterAutomatik} />
              <FilterOption value="schaltung" label={ui.filterSchaltung} />
            </div>
          )}

          <BayRow className={styles.bays}>
            {list.map(({ v, getriebe }, i) => (
              <Bay key={v.photo} vehicle={v} getriebe={getriebe} index={i} />
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

function Bay({ vehicle: v, getriebe, index }: { vehicle: Vehicle; getriebe: Getriebe | null; index: number }) {
  const headingId = `fahrzeug-${index + 1}`;
  // Alt text uses only what the site itself says about the car.
  const alt = `${v.name}, ${v.ausstattung}`;

  return (
    <li className={styles.bay} data-getriebe={getriebe ?? undefined}>
      {/* Focusable so keyboard users get the same spotlight as on hover. */}
      <article className={styles.card} tabIndex={0} aria-labelledby={headingId}>
        <div className={styles.stage}>
          <div className={styles.frame}>
            <Image
              src={v.photo}
              alt={alt}
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
              src={v.photo}
              alt=""
              width={fahrzeuge.photoPx.w}
              height={fahrzeuge.photoPx.h}
              sizes="248px"
              unoptimized
              className={styles.photo}
            />
          </div>
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
