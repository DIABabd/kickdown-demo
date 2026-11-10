/**
 * Side profile of the stylised hero car – an original compact-SUV shape.
 *
 * Plain data, no Three.js import: the 3D model (car-model.tsx) extrudes
 * these outlines.
 *
 * Units are metres. x points forward (front of the car at +x),
 * y points up (ground at y = 0). The car is centred on x = 0.
 */

export type Pt = readonly [number, number];

/* ------------------------------------------------------------------ */
/* Tiny path builder that samples curves into points                   */
/* ------------------------------------------------------------------ */

class Path {
  readonly pts: Pt[] = [];

  constructor(x: number, y: number) {
    this.pts.push([x, y]);
  }

  private get last(): Pt {
    return this.pts[this.pts.length - 1];
  }

  line(x: number, y: number) {
    this.pts.push([x, y]);
    return this;
  }

  /** Quadratic Bézier from the current point via (cx, cy) to (x, y). */
  quad(cx: number, cy: number, x: number, y: number, steps = 12) {
    const [x0, y0] = this.last;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const a = (1 - t) * (1 - t);
      const b = 2 * t * (1 - t);
      const c = t * t;
      this.pts.push([a * x0 + b * cx + c * x, a * y0 + b * cy + c * y]);
    }
    return this;
  }

  /** Circular arc around (cx, cy), from angle a0 to a1 (radians). */
  arc(cx: number, cy: number, r: number, a0: number, a1: number, steps = 24) {
    for (let i = 0; i <= steps; i++) {
      const a = a0 + ((a1 - a0) * i) / steps;
      this.pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return this;
  }
}

/* ------------------------------------------------------------------ */
/* Dimensions                                                          */
/* ------------------------------------------------------------------ */

export const WHEEL = {
  /** Wheel centres at ±x. */
  x: 1.32,
  y: 0.37,
  /** Tyre radius. */
  r: 0.37,
  /** Rim radius. */
  rimR: 0.25,
  /** Tyre width. */
  width: 0.26,
} as const;

/** Raw radius of the wheel-arch cut-out (before the bevel). */
export const ARCH_R = 0.52;
/** Bottom edge of the body side (before the bevel). */
const BODY_BOTTOM = 0.3;

/** Lower body: extrude depth + bevel → total width 1.80 m. */
export const BODY = { depth: 1.64, bevel: 0.08 } as const;
/** Glasshouse: narrower than the body (tumblehome) → 1.52 m. */
export const CABIN = { depth: 1.4, bevel: 0.06 } as const;

/** Half width of the flat body side, where side details sit. */
export const BODY_SIDE_Z = BODY.depth / 2 + BODY.bevel;
export const CABIN_SIDE_Z = CABIN.depth / 2 + CABIN.bevel;

/* ------------------------------------------------------------------ */
/* Outlines                                                            */
/* ------------------------------------------------------------------ */

/** Angle where the arch meets the bottom edge (slightly below centre). */
const ARCH_END = Math.asin((BODY_BOTTOM - WHEEL.y) / ARCH_R);

function archX(side: -1 | 1, end: "rear" | "front") {
  const dx = ARCH_R * Math.cos(ARCH_END);
  return side * WHEEL.x + (end === "rear" ? -dx : dx);
}

/** Lower body (bumpers, hood, beltline, doors) – counter-clockwise. */
export const BODY_OUTLINE: Pt[] = new Path(-2.02, 0.32)
  .line(archX(-1, "rear"), BODY_BOTTOM)
  .arc(-WHEEL.x, WHEEL.y, ARCH_R, Math.PI - ARCH_END, ARCH_END)
  .line(archX(1, "rear"), BODY_BOTTOM)
  .arc(WHEEL.x, WHEEL.y, ARCH_R, Math.PI - ARCH_END, ARCH_END)
  .line(2.0, 0.32)
  // front bumper and nose
  .quad(2.16, 0.34, 2.17, 0.55, 8)
  .line(2.15, 0.78)
  .quad(2.12, 0.93, 2.0, 0.98, 8)
  // hood rising into the windscreen base
  .quad(1.5, 1.08, 0.92, 1.1, 14)
  // beltline, rising slightly toward the rear (wedge stance)
  .line(-1.7, 1.15)
  // tailgate top and rear face
  .quad(-2.02, 1.16, -2.08, 1.0, 8)
  .quad(-2.12, 0.66, -2.08, 0.45, 8)
  .pts;

/** Glasshouse (windows + roof). Its base is hidden inside the body. */
export const CABIN_OUTLINE: Pt[] = new Path(-1.84, 1.06)
  .line(1.02, 1.02)
  // windscreen
  .quad(0.62, 1.3, 0.06, 1.52, 14)
  // roof
  .quad(-0.62, 1.6, -1.38, 1.55, 16)
  // rear window / D-pillar
  .quad(-1.74, 1.52, -1.9, 1.2, 12)
  .pts;

/** Window line light – a closed loop on the glasshouse side. */
export const WINDOW_LINE: Pt[] = new Path(-1.74, 1.28)
  .line(0.56, 1.22)
  .quad(0.34, 1.4, 0.0, 1.47, 10)
  .quad(-0.62, 1.54, -1.34, 1.49, 14)
  .quad(-1.66, 1.46, -1.74, 1.28, 10)
  .pts;

/** Shoulder light – runs from headlight to taillight along the side. */
export const SHOULDER_LINE: Pt[] = new Path(1.98, 0.88)
  .quad(1.4, 0.97, 0.6, 0.99, 10)
  .quad(-0.6, 1.02, -1.4, 1.04, 10)
  .quad(-1.8, 1.04, -1.96, 1.02, 6)
  .pts;

/** Roof rail, following the roof curve just above it. */
export const ROOF_RAIL: Pt[] = new Path(0.0, 1.6)
  .quad(-0.62, 1.69, -1.3, 1.64, 12)
  .pts;

/** Front and rear light positions (x, y) on the car's nose and tail. */
export const LIGHTS = {
  head: { x: 2.205, y: 0.84 },
  tail: { x: -2.155, y: 0.95 },
} as const;

/* ------------------------------------------------------------------ */
/* Kickdown livery (side view, same coordinates as the outlines)       */
/* ------------------------------------------------------------------ */

/** The original logo file, used unchanged. */
export const LOGO_SRC = "/old-site/logo/logo.png";
/** Native pixel size of the logo file. */
export const LOGO_PX = { w: 200, h: 50 } as const;

/**
 * White door sign the logo sits on (centre x/y, size, corner radius).
 * The logo has dark-blue lettering on a transparent background, which
 * would disappear on blue paint; a white sign keeps it readable without
 * touching the file – like the magnetic signs on driving-school cars.
 */
export const DOOR_SIGN = { x: -0.08, y: 0.78, w: 0.74, h: 0.23, r: 0.035 } as const;

/**
 * Logo size on the door, exactly the file's 4 : 1 ratio (never stretched).
 * 0.60 m keeps it at or below the file's 200 px on screen at the hero's
 * largest size and a pixel ratio of 2, so it is never magnified.
 */
export const LOGO_SIZE = { w: 0.6, h: 0.6 * (LOGO_PX.h / LOGO_PX.w) } as const;

/** Area on each side that the red/white graphic is drawn into. */
export const STRIPE_BOX = { x0: -0.8, x1: 0.8, y0: 0.4, y1: 0.62 } as const;

/**
 * Red band low on the doors, leaning forward like it's moving (front = +x).
 * Inspired by the red elements of the real fleet, not a copy of the wrap.
 */
export const RED_BAND: Pt[] = [
  [-0.7, 0.44],
  [0.66, 0.44],
  [0.73, 0.53],
  [-0.62, 0.53],
];

/** Thin white pinstripe above the band, same lean. */
export const WHITE_STRIPE: Pt[] = [
  [-0.6, 0.566],
  [0.7, 0.566],
  [0.714, 0.584],
  [-0.586, 0.584],
];

/** Number plates: plain white, no registration (520 × 110 mm). */
export const PLATE = { w: 0.52, h: 0.11 } as const;

/** Arch geometry, shared with the arch trim. */
export const ARCH = { r: ARCH_R, start: ARCH_END, end: Math.PI - ARCH_END } as const;

/** Car rest pose: the three-quarter front view (radians, around y). */
export const REST_ANGLE = -0.62;

/** Pose at the very start of the intro: pure side view. */
export const INTRO_ANGLE = 0;
