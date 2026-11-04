import styles from "./site.module.css";

/**
 * The crisp night ↔ day transition: a short strip of asphalt with a
 * dashed road line, used wherever the page switches between night and
 * daylight sections (replaces the earlier soft gradient bands).
 */
export function Seam() {
  return <div className={styles.seam} aria-hidden="true" />;
}
