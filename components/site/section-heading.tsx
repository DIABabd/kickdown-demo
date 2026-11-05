import styles from "./site.module.css";

/**
 * The one heading pattern for every homepage section: just the heading,
 * no eyebrow label above it. `tone` follows the section's night or day
 * style so the heading keeps its contrast.
 */
export function SectionHeading({
  id,
  title,
  tone,
}: {
  id: string;
  title: string;
  tone: "night" | "day";
}) {
  return (
    <div className={styles.heading} data-tone={tone}>
      <h2 id={id} className={styles.h2}>
        {title}
      </h2>
    </div>
  );
}
