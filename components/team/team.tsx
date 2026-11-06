import Image from "next/image";
import { pageId } from "@/components/site/page-ids";
import type { ReactNode } from "react";
import { BayRow } from "@/components/showroom/bay-row";
import { SectionHeading } from "@/components/site/section-heading";
import { team, type Member } from "@/content/team";
import styles from "./team.module.css";

/**
 * Car side window, in objectBoundingBox units (0–1), so it scales with the
 * frame. The slanted front edge (A-pillar) is at the top RIGHT: in every
 * team photo that corner is background, so no face is cut. The same path
 * draws the window seal on top of the glass.
 */
const WINDOW_PATH =
  "M0.05 0 H0.79 Q0.83 0 0.855 0.035 L0.98 0.215 Q1 0.245 1 0.285 V0.96 Q1 1 0.96 1 H0.04 Q0 1 0 0.96 V0.05 Q0 0 0.05 0 Z";
const CLIP_ID = "kd-team-window";

/**
 * "Unser Team" (#team) – DESIGN.md 4.4: each photo inside the same car
 * window on the same door panel. Photos are the original 370 × 400 files,
 * served unchanged (`unoptimized`) at max 248 × 268 CSS px. No filters,
 * no tint over faces; the only overlay is a light streak that crosses the
 * glass on hover / keyboard focus (removed with reduced motion).
 */
/**
 * `labelledBy`: on /team the page heading (<h1>) replaces the section
 * heading; `children` are shown below the doors (the page adds its link to
 * /ausbildungsfahrschule there).
 */
export function Team({ labelledBy, children }: { labelledBy?: string; children?: ReactNode } = {}) {
  return (
    <section id="team" className={styles.team} aria-labelledby={labelledBy ?? pageId("team", "section-title")}>
      {/* Shared clip shape for all windows */}
      <svg className={styles.defs} aria-hidden="true" focusable="false">
        <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
          <path d={WINDOW_PATH} />
        </clipPath>
      </svg>

      <div className={styles.inner}>
        {!labelledBy && <SectionHeading id={pageId("team", "section-title")} title={team.title} tone="night" />}

        <BayRow className={styles.doors}>
          {team.members.map((m, i) => (
            <Door key={m.name} member={m} index={i} />
          ))}
        </BayRow>
        {children}
      </div>
    </section>
  );
}

function Door({ member: m, index }: { member: Member; index: number }) {
  const nameId = `team-${index + 1}`;
  return (
    <li className={styles.door}>
      {/* Focusable so keyboard users get the same glass reflection as on hover. */}
      <article className={styles.card} tabIndex={0} aria-labelledby={nameId}>
        <div className={styles.window}>
          <div className={m.photo ? styles.glass : `${styles.glass} ${styles.empty}`} style={{ clipPath: `url(#${CLIP_ID})` }}>
            {m.photo && (
              <Image
                src={m.photo}
                // Known facts only: name and role from the old site.
                alt={`${m.name}, ${m.role}`}
                width={team.photoPx.w}
                height={team.photoPx.h}
                sizes="248px"
                unoptimized
                className={styles.photo}
              />
            )}
            <span className={styles.streak} aria-hidden="true" />
          </div>
          <svg className={styles.seal} viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d={WINDOW_PATH} />
          </svg>
        </div>

        <div className={styles.panel}>
          <h3 id={nameId} className={styles.name}>
            {m.name}
          </h3>
          <p className={styles.role}>{m.role}</p>
          <span className={styles.handle} aria-hidden="true" />
        </div>
      </article>
    </li>
  );
}
