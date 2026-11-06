/**
 * Tiny shared store between the hero's GSAP ScrollTrigger (DOM side,
 * hero-motion.tsx) and the 3D scene (car-scene.tsx).
 *
 * - `progress`: 0 while the hero fills the screen → 1 when it has scrolled
 *   out. Stays 0 with reduced motion (no ScrollTrigger is created).
 * - `invalidate`: set by the scene; asks R3F for a new frame (the canvas
 *   renders on demand only).
 */
export const heroScroll = {
  progress: 0,
  invalidate: () => {},
};
