import { SectionHeading } from "@/components/site/section-heading";
import { preise, type PriceRow } from "@/content/preise";
import styles from "./tageslicht.module.css";

type List = { label: string; rows: readonly PriceRow[] };

/**
 * "Preisliste für Klasse B" (#preise) – daylight section, DESIGN.md 4.6.
 * Both lists are real tables. Desktop: side by side. Phones: a two-option
 * toggle (native radio buttons + CSS, works without JavaScript; without
 * :has() support both lists simply stay visible).
 *
 * `labelledBy`: on the /preise page the page heading (<h1>) names the list,
 * so the section skips its own heading and points to that one instead.
 */
export function Preise({ labelledBy }: { labelledBy?: string } = {}) {
  const { mitAktion: mit, ohneAktion: ohne } = preise;
  const label = labelledBy ?? "preise-title";

  return (
    <section id="preise" className={styles.day} aria-labelledby={label}>
      <div className={styles.inner}>
        {!labelledBy && <SectionHeading id="preise-title" title={preise.title} tone="day" />}

        <div className={styles.lists}>
          <div className={styles.toggle} role="radiogroup" aria-labelledby={label}>
            <input type="radio" id="preisliste-mit" name="preisliste" value="mit" defaultChecked />
            <label htmlFor="preisliste-mit">{mit.label}</label>
            <input type="radio" id="preisliste-ohne" name="preisliste" value="ohne" />
            <label htmlFor="preisliste-ohne">{ohne.label}</label>
          </div>

          <div className={styles.panels}>
            <PricePanel id="mit" list={mit} other={ohne} after={mit.ersparnis} />
            <PricePanel id="ohne" list={ohne} other={mit} />
          </div>
        </div>

        <div className={styles.footnotes}>
          <p>{preise.fussnoteCam}</p>
          <p>{preise.fussnoteGebuehren}</p>
        </div>
      </div>
    </section>
  );
}

function PricePanel({ id, list, other, after }: { id: string; list: List; other: List; after?: string }) {
  // Rows whose label isn't in the other list (Grundbetrag, Lehrmaterial) are
  // marked visually – a text comparison, no prices are calculated.
  const otherLabels = new Set(other.rows.map((r) => r.label));

  return (
    <div className={styles.panel} data-list={id}>
      <table className={styles.table}>
        <caption className={styles.caption}>{list.label}</caption>
        <tbody>
          {list.rows.map((r) => (
            <tr key={r.label} data-differs={otherLabels.has(r.label) ? undefined : ""}>
              <th scope="row">{r.label}</th>
              <td>{r.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {after && <p className={styles.ersparnis}>{after}</p>}
    </div>
  );
}
