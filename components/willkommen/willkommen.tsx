import Image from "next/image";
import { SectionHeading } from "@/components/site/section-heading";
import { start, ui } from "@/content/start";
import styles from "./willkommen.module.css";

/**
 * Willkommen (#willkommen) – DESIGN.md 4.2, daylight section after the
 * hero. Old welcome text word for word (S4–S6) and the original
 * shop-window photo (B8).
 *
 * The photo is shown complete and unchanged: original file (`unoptimized`),
 * at most 580 CSS px wide (DESIGN.md 2.5), no rounded corners, no mask, no
 * overlay – the copyright notice in its bottom-right corner stays fully
 * visible. MUST BE APPROVED BEFORE GOING LIVE (owner question 13).
 */
export function Willkommen() {
  const w = start.willkommen;
  return (
    <section id="willkommen" className={styles.willkommen} aria-labelledby="willkommen-title">
      <div className={styles.inner}>
        <div className={styles.text}>
          <SectionHeading id="willkommen-title" eyebrow={ui.eyebrows.willkommen} title={w.title} tone="day" />
          {w.text.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>

        <figure className={styles.figure}>
          <Image
            src={w.photo.src}
            alt={ui.photoAlt}
            width={w.photo.w}
            height={w.photo.h}
            sizes="(min-width: 640px) 580px, 100vw"
            unoptimized
            className={styles.photo}
          />
          <figcaption className={styles.approval}>{ui.photoApproval}</figcaption>
        </figure>
      </div>
    </section>
  );
}
