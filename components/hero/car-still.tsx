import {
  ARCH,
  BODY,
  BODY_OUTLINE,
  CABIN,
  DOOR_SIGN,
  LOGO_SIZE,
  LOGO_SRC,
  RED_BAND,
  WHITE_STRIPE,
  CABIN_OUTLINE,
  LIGHTS,
  ROOF_RAIL,
  WHEEL,
  toSvgPath,
} from "./car-profile";

/**
 * Still image of the hero car, drawn from the same side profile as the
 * 3D model. Server-rendered SVG: shown first, and kept as the fallback
 * when a device can't (or shouldn't) run the 3D scene.
 */

const body = toSvgPath(BODY_OUTLINE);
const cabin = toSvgPath(CABIN_OUTLINE);
const rail = toSvgPath(ROOF_RAIL, false);

const points = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y]) => `${x},${y}`).join(" ");

/** Original logo file + red/white graphic, printed on the door (same data as the 3D decals). */
function Livery({ withLogo }: { withLogo: boolean }) {
  return (
    <g>
      <polygon points={points(RED_BAND)} fill="#E63A3C" />
      <polygon points={points(WHITE_STRIPE)} fill="#ffffff" />
      {/* The y-up flip would turn the image upside down – flip it back locally. */}
      {withLogo && (
        <g
          transform={`translate(${DOOR_SIGN.x - LOGO_SIZE.w / 2} ${DOOR_SIGN.y + LOGO_SIZE.h / 2}) scale(1 -1)`}
        >
          <image
            href={LOGO_SRC}
            width={LOGO_SIZE.w}
            height={LOGO_SIZE.h}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      )}
    </g>
  );
}

function archPath(cx: number) {
  const p = (a: number) =>
    `${(cx + ARCH.r * Math.cos(a)).toFixed(3)} ${(WHEEL.y + ARCH.r * Math.sin(a)).toFixed(3)}`;
  // Arch spans > 180° (large-arc = 1); decreasing angle runs over the top (sweep = 0).
  return `M${p(ARCH.end)}A${ARCH.r} ${ARCH.r} 0 1 0 ${p(ARCH.start)}`;
}

function Wheel({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} ${WHEEL.y})`}>
      <circle r={WHEEL.r} fill="#121417" />
      <circle r={WHEEL.rimR + 0.02} fill="#16191d" stroke="#aab3bd" strokeWidth={0.02} />
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={i}
          x={-0.018}
          y={0.02}
          width={0.036}
          height={WHEEL.rimR * 0.84}
          fill="#8d96a1"
          transform={`rotate(${i * 36})`}
        />
      ))}
      <circle r={0.05} fill="#aab3bd" />
    </g>
  );
}

function Car() {
  return (
    <g>
      {/* Glasshouse first, the body overlaps its base */}
      <path
        d={cabin}
        fill="url(#kd-glass)"
        stroke="url(#kd-glass)"
        strokeWidth={CABIN.bevel * 2}
        strokeLinejoin="round"
      />
      <path
        d={rail}
        fill="none"
        stroke="#0b0e12"
        strokeWidth={0.028}
        strokeLinecap="round"
      />
      {/* The stroke grows the outline by the 3D bevel size */}
      <path
        d={body}
        fill="url(#kd-paint)"
        stroke="url(#kd-paint)"
        strokeWidth={BODY.bevel * 2}
        strokeLinejoin="round"
      />
      <path
        d={archPath(WHEEL.x)}
        fill="none"
        stroke="#0b0f14"
        strokeWidth={0.09}
      />
      <path
        d={archPath(-WHEEL.x)}
        fill="none"
        stroke="#0b0f14"
        strokeWidth={0.09}
      />
      <rect x={-0.81} y={0.285} width={1.62} height={0.11} fill="#0b0f14" />
      <Livery withLogo />
      <Wheel x={WHEEL.x} />
      <Wheel x={-WHEEL.x} />
      {/* Mirror */}
      <rect
        x={0.58}
        y={1.18}
        width={0.16}
        height={0.08}
        rx={0.03}
        fill="#06090d"
      />
      {/* Head- and taillight, seen edge-on */}
      <ellipse
        cx={LIGHTS.head.x + 0.02}
        cy={LIGHTS.head.y}
        rx={0.05}
        ry={0.03}
        fill="#eef5ff"
      />
      <ellipse
        cx={LIGHTS.tail.x - 0.02}
        cy={LIGHTS.tail.y}
        rx={0.04}
        ry={0.025}
        fill="#ff3236"
      />
    </g>
  );
}

export function CarStill() {
  return (
    <svg
      className="kd-car-still"
      // y is flipped below: SVG y -1.9…0.2 shows the roof down to the shadow.
      viewBox="-2.6 -1.9 5.2 2.1"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Stilisiertes Auto bei Nacht"
    >
      <defs>
        <linearGradient id="kd-paint" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#0a1d40" />
          <stop offset="0.55" stopColor="#163a78" />
          <stop offset="0.85" stopColor="#3a64ad" />
          <stop offset="1" stopColor="#122f63" />
        </linearGradient>
        <linearGradient id="kd-glass" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1a2a40" />
          <stop offset="1" stopColor="#04070c" />
        </linearGradient>
      </defs>

      {/* y-up coordinates, same as the 3D model */}
      <g transform="scale(1 -1)">
        {/* Contact shadow */}
        <ellipse
          cx="0"
          cy="0.01"
          rx="2.2"
          ry="0.1"
          fill="#000"
          opacity="0.6"
        />
        <Car />
      </g>
    </svg>
  );
}
