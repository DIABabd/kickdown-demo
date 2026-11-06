import styles from "./site.module.css";

/**
 * Transition between sections: a fine hairline that catches one soft light
 * sweep when it scrolls into view (motion allowed only). Replaces the old
 * road-line strips – the sections around it fade between dark tones.
 */
export function Seam() {
  return <div className={styles.seam} data-sweep aria-hidden="true" />;
}
