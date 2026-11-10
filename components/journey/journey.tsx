import Link from "next/link";
import type { CSSProperties } from "react";
import { pageId } from "@/components/site/page-ids";
import { SectionHeading } from "@/components/site/section-heading";
import { strecke, type Station } from "@/content/strecke";
import { JourneyCar } from "./journey-car";
import { JourneyMotion } from "./journey-motion";
import { MARKERS, ROAD_D, ROAD_VIEWBOX } from "./road-path";
import styles from "./journey.module.css";

/** Homepage-only section: its ids are scoped to the start page. */
const TITLE_ID = pageId("start", "strecke-title");

/**
 * "Deine Strecke zum Führerschein" – the winding road after the hero
 * (DESIGN.md 4.3, restored Nov 2026). Four stations, each with its real
 * text and ONE link – no prices or times repeated here.
 *
 * All content is server-rendered and readable without JavaScript; the road
 * and the small car are decoration (aria-hidden). The car follows the page
 * scroll forward and backward – also with reduced motion (then 1:1, no
 * smoothing), see journey-motion.tsx.
 */
export function Journey() {
  return (
    <section id="strecke" className={styles.journey} aria-labelledby={TITLE_ID} data-journey>
      <div className={styles.head}>
        <SectionHeading id={TITLE_ID} title={strecke.title} tone="night" />
      </div>

      <JourneyMotion className={styles.layout}>
        <div className={styles.roadCol} aria-hidden="true">
          <div className={styles.road} data-road>
            <Road />
            {MARKERS.map((m, i) => (
              <span
                key={i}
                className={styles.marker}
                data-marker
                style={{ left: `${m.x}%`, top: `${(m.y / ROAD_VIEWBOX.h) * 100}%` } as CSSProperties}
              >
                {i + 1}
              </span>
            ))}
            <div className={styles.car} data-journey-car>
              <JourneyCar />
            </div>
          </div>
        </div>

        <ol className={styles.stations} data-stations>
          {strecke.stations.map((station, i) => (
            <StationItem key={station.id} station={station} index={i} />
          ))}
        </ol>
      </JourneyMotion>
    </section>
  );
}

function Road() {
  return (
    <svg
      className={styles.roadSvg}
      viewBox={`0 0 ${ROAD_VIEWBOX.w} ${ROAD_VIEWBOX.h}`}
      preserveAspectRatio="none"
      focusable="false"
    >
      <path d={ROAD_D} className={styles.edge} />
      <path d={ROAD_D} className={styles.asphalt} data-road-path />
      <path d={ROAD_D} className={styles.driven} pathLength={1} data-road-driven />
      <path d={ROAD_D} className={styles.lane} />
    </svg>
  );
}

function StationItem({ station, index }: { station: Station; index: number }) {
  const headingId = pageId("start", `station-${station.id}`);
  return (
    <li className={styles.station} data-station data-id={station.id} aria-labelledby={headingId}>
      <div className={styles.stationBody}>
        <h3 id={headingId} className={styles.stationTitle}>
          <span className={styles.stationNum} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          {station.name}
        </h3>

        {station.text.map((t) => (
          <p key={t} className={styles.text}>
            {t}
          </p>
        ))}

        <Link href={station.link.href} className={styles.link}>
          {station.link.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </li>
  );
}
