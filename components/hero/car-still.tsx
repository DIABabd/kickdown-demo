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
  SHOULDER_LINE,
  WHEEL,
  WINDOW_LINE,
  toSvgPath,
} from "./car-profile";

/**
 * Still image of the hero car, drawn from the same side profile as the
 * 3D model. Server-rendered SVG: shown first, and kept as the fallback
 * when a device can't (or shouldn't) run the 3D scene.
 */

const body = toSvgPath(BODY_OUTLINE);
const cabin = toSvgPath(CABIN_OUTLINE);
const windowLine = toSvgPath(WINDOW_LINE);
const shoulder = toSvgPath(SHOULDER_LINE, false);
const rail = toSvgPath(ROOF_RAIL, false);

const points = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y]) => `${x},${y}`).join(" ");

/** Door sign + original logo file + red/white graphic (same data as the 3D decals). */
function Livery({ withLogo }: { withLogo: boolean }) {
  return (
    <g>
      <polygon points={points(RED_BAND)} fill="#E63A3C" />
      <polygon points={points(WHITE_STRIPE)} fill="#ffffff" />
      <rect
        x={DOOR_SIGN.x - DOOR_SIGN.w / 2}
        y={DOOR_SIGN.y - DOOR_SIGN.h / 2}
        width={DOOR_SIGN.w}
        height={DOOR_SIGN.h}
        rx={DOOR_SIGN.r}
        fill="#ffffff"
      />
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
      <circle r={WHEEL.r} fill="#07090c" />
      <circle r={WHEEL.rimR} fill="#0a0c0f" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={-0.025}
          y={0}
          width={0.05}
          height={WHEEL.rimR * 0.92}
          fill="#3a4654"
          transform={`rotate(${i * 72})`}
        />
      ))}
      <circle
        r={WHEEL.rimR + 0.004}
        fill="none"
        stroke="#4cc8ff"
        strokeWidth={0.012}
        filter="url(#kd-glow)"
      />
    </g>
  );
}

/** `reflection`: the road copy – no logo, so it never shows up flipped. */
function Car({ reflection = false }: { reflection?: boolean }) {
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
        stroke="#7fdcff"
        strokeWidth={0.02}
        strokeLinecap="round"
        filter="url(#kd-glow)"
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
      <Livery withLogo={!reflection} />
      <Wheel x={WHEEL.x} />
      <Wheel x={-WHEEL.x} />
      {/* Kickdown-blue light outlines */}
      <g
        fill="none"
        stroke="#7fdcff"
        strokeWidth={0.018}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#kd-glow)"
      >
        <path d={windowLine} />
        <path d={shoulder} />
      </g>
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
        fill="#f2f8ff"
        filter="url(#kd-glow-strong)"
      />
      <ellipse
        cx={LIGHTS.tail.x - 0.02}
        cy={LIGHTS.tail.y}
        rx={0.04}
        ry={0.025}
        fill="#ff2b2e"
        filter="url(#kd-glow-strong)"
      />
    </g>
  );
}

export function CarStill() {
  return (
    <svg
      className="kd-car-still"
      // y is flipped below: SVG y -1.85…1.15 shows road reflection to roof.
      viewBox="-3.1 -1.85 6.2 2.85"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Stilisiertes Auto auf einer Drehscheibe bei Nacht"
    >
      <defs>
        <linearGradient id="kd-paint" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#3d78d8" />
          <stop offset="0.35" stopColor="#1D4FA6" />
          <stop offset="1" stopColor="#0c2350" />
        </linearGradient>
        <linearGradient id="kd-glass" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1a2a40" />
          <stop offset="1" stopColor="#04070c" />
        </linearGradient>
        <radialGradient id="kd-pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#1D4FA6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#1D4FA6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="kd-beam" cx="0" cy="0.5" r="1">
          <stop offset="0" stopColor="#dbeeff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#dbeeff" stopOpacity="0" />
        </radialGradient>
        {/* Mask space = the mirrored car's own coordinates (y = height above road) */}
        <linearGradient id="kd-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask
          id="kd-reflect-mask"
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
          x="-3.1"
          y="0"
          width="6.2"
          height="1.9"
        >
          <rect x="-3.1" y="0" width="6.2" height="1.9" fill="url(#kd-fade)" />
        </mask>
        <filter id="kd-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.025" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="kd-glow-strong"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
        >
          <feGaussianBlur stdDeviation="0.05" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* y-up coordinates, same as the 3D model */}
      <g transform="scale(1 -1)">
        {/* Lapis glow behind the car */}
        <ellipse cx="0" cy="1.0" rx="3.2" ry="1.6" fill="url(#kd-pool)" />
        {/* Turntable rim */}
        <ellipse
          cx="0"
          cy="0"
          rx="2.75"
          ry="0.52"
          fill="none"
          stroke="#5fd0ff"
          strokeWidth="0.014"
          filter="url(#kd-glow)"
        />
        {/* Headlight beam on the road */}
        <ellipse cx="3.0" cy="-0.05" rx="1.1" ry="0.22" fill="url(#kd-beam)" />
        {/* Contact shadow */}
        <ellipse
          cx="0"
          cy="0.01"
          rx="2.3"
          ry="0.12"
          fill="#000"
          opacity="0.7"
        />
        {/* Wet-road reflection: the car mirrored at the ground, fading out */}
        <g transform="scale(1 -1)" mask="url(#kd-reflect-mask)">
          <Car reflection />
        </g>
        <Car />
      </g>
    </svg>
  );
}
