import styles from "./anmeldung.module.css";

/**
 * Speedometer progress (DESIGN.md 4.7), after the logo's gauge: a half
 * circle in 4 segments; the needle moves one segment per step, step 4 is
 * the red zone. Decorative – the step is also written as text.
 */
const C = { x: 100, y: 100, r: 78 } as const;
const GAP = 3; // degrees between segments

function arc(fromDeg: number, toDeg: number) {
  const p = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(C.x + C.r * Math.cos(a)).toFixed(2)} ${(C.y - C.r * Math.sin(a)).toFixed(2)}`;
  };
  // From the left (180°) clockwise over the top towards 0°.
  return `M${p(fromDeg)} A${C.r} ${C.r} 0 0 1 ${p(toDeg)}`;
}

export function Gauge({ step }: { step: number }) {
  const segments = [0, 1, 2, 3].map((i) => {
    const from = 180 - i * 45 - (i === 0 ? 0 : GAP / 2);
    const to = 180 - (i + 1) * 45 + (i === 3 ? 0 : GAP / 2);
    const state = i + 1 < step ? "done" : i + 1 === step ? "current" : "todo";
    return { d: arc(from, to), state, red: i === 3 };
  });
  // Needle drawn pointing left; rotate clockwise to the current segment's middle.
  const angle = 180 - (180 - (step - 0.5) * 45);

  return (
    <svg className={styles.gauge} viewBox="0 0 200 112" aria-hidden="true" focusable="false">
      {segments.map((s, i) => (
        <path key={i} d={s.d} className={styles.segment} data-state={s.state} data-red={s.red || undefined} />
      ))}
      {/* Tick marks */}
      {Array.from({ length: 17 }, (_, i) => {
        const a = ((180 - i * (180 / 16)) * Math.PI) / 180;
        const r1 = C.r - 14;
        const r2 = C.r - (i % 4 === 0 ? 24 : 19);
        return (
          <line
            key={i}
            className={styles.tick}
            x1={C.x + r1 * Math.cos(a)}
            y1={C.y - r1 * Math.sin(a)}
            x2={C.x + r2 * Math.cos(a)}
            y2={C.y - r2 * Math.sin(a)}
          />
        );
      })}
      <g className={styles.needle} style={{ transform: `rotate(${angle}deg)` }} data-red={step === 4 || undefined}>
        <path d="M100 96.5 L34 100 L100 103.5 Z" />
      </g>
      <circle cx={C.x} cy={C.y} r="8" className={styles.hub} />
    </svg>
  );
}
