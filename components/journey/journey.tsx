import type { CSSProperties } from "react";
import { strecke, type Station } from "@/content/strecke";
import { JourneyCar } from "./journey-car";
import { JourneyMotion } from "./journey-motion";
import { MARKERS, ROAD_D, ROAD_VIEWBOX } from "./road-path";
import styles from "./journey.module.css";

/**
 * "Deine Strecke zum Führerschein" – scroll journey after the hero
 * (DESIGN.md 4.3). All content is server-rendered and readable without
 * JavaScript; the road and car are decoration on top.
 */
export function Journey() {
  return (
    <section className={styles.journey} aria-labelledby="strecke-title">
      <div className={styles.head}>
        <h2 id="strecke-title" className={styles.title}>
          {strecke.title}
        </h2>
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

      {/* Night fades into daylight – the prices section will start in --tag. */}
      <div className={styles.dawn} aria-hidden="true" />
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
      <path d={ROAD_D} className={styles.glow} />
      <path d={ROAD_D} className={styles.edge} />
      <path d={ROAD_D} className={styles.asphalt} data-road-path />
      <path d={ROAD_D} className={styles.lane} />
    </svg>
  );
}

function StationItem({ station, index }: { station: Station; index: number }) {
  const headingId = `station-${station.id}`;
  return (
    <li className={styles.station} data-station data-id={station.id} aria-labelledby={headingId}>
      <div className={styles.stationBody}>
        <h3 id={headingId} className={styles.stationTitle}>
          <span className={styles.stationNum} aria-hidden="true">
            {index + 1}
          </span>
          {station.name}
        </h3>

        {station.text.map((t) => (
          <p key={t} className={styles.text}>
            {t}
          </p>
        ))}

        {station.times && (
          <div className={styles.times}>
            <h4 className={styles.timesTitle}>{station.times.title}</h4>
            {station.times.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}

        {station.prices?.map((table, ti) => (
          <table key={ti} className={styles.prices}>
            {table.caption && <caption>{table.caption}</caption>}
            <tbody>
              {table.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}

        {station.notes?.map((n) => (
          <p key={n} className={styles.note}>
            {n}
          </p>
        ))}

        {station.link && (
          <a href={station.link.href} className={styles.link}>
            {station.link.label}
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </li>
  );
}
