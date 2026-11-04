import styles from "./site.module.css";

/**
 * The one heading pattern for every homepage section: a small label
 * (eyebrow) above the section heading. `tone` follows the section's
 * night or day style so the label keeps its contrast.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  tone,
}: {
  id: string;
  eyebrow: string;
  title: string;
  tone: "night" | "day";
}) {
  return (
    <div className={styles.heading} data-tone={tone}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.h2}>
        {title}
      </h2>
    </div>
  );
}
