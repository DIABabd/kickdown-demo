/**
 * Live values for the temporary debug panel (`?debug=1`, debug-panel.tsx).
 * Written by the hero and the journey, read by the panel twice a second.
 * Plain module state – nothing is stored or sent anywhere.
 */
export const debugInfo = {
  webgl2: null as boolean | null,
  heroPhase: "waiting" as "waiting" | "3d" | "still",
  heroFallback: null as string | null,
  /** Frames the 3D renderer has drawn (grows while it is active). */
  heroFrames: 0,
  heroDpr: 0,
  contextLost: false,
  journeyMode: "none" as "none" | "on" | "direct",
  journeyProgress: 0,
  journeyUpdates: 0,
};
