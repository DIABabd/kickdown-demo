/**
 * The winding road, seen from above. Plain data shared by the
 * server-rendered SVG and the scroll script.
 *
 * ViewBox units: 0–100 across, 0–1000 down (the SVG is stretched to the
 * road column, strokes don't scale). Each station marker sits exactly on
 * a segment end point, where the road runs straight down, so the curve
 * joins are smooth and the markers need no JavaScript to be placed.
 */

export const ROAD_VIEWBOX = { w: 100, h: 1000 } as const;

/** Station markers (on the path), in station order. */
export const MARKERS = [
  { x: 70, y: 120 },
  { x: 26, y: 360 },
  { x: 74, y: 630 },
  { x: 50, y: 880 },
] as const;

export const ROAD_D = [
  "M50 0",
  "C50 50 70 70 70 120",
  "C70 210 26 250 26 360",
  "C26 470 74 520 74 630",
  "C74 740 50 780 50 880",
  "L50 1000",
].join(" ");
