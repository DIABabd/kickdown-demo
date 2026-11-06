"use client";

import { useEffect, useRef } from "react";
import styles from "./site.module.css";

const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * The small top-down car from the former scroll journey, now a slim page
 * progress indicator at the bottom of the sticky header (every page): it
 * drives forward as the page is scrolled down and backs up when scrolled up.
 *
 * - Motion allowed: the car glides to its spot with a short exponential
 *   ease (no overshoot, no bounce) and only moves while you scroll.
 * - Reduced motion: the car's position is set directly from the scroll
 *   position on every scroll event – no smoothing, no automatic movement.
 * - Without JavaScript the car simply stays visible at the start.
 *
 * Decorative (aria-hidden): the browser's own scroll position already
 * tells assistive technology where you are.
 */
export function ScrollProgress() {
  const track = useRef<HTMLDivElement>(null);
  const car = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = track.current;
    const c = car.current;
    if (!t || !c) return;
    const motion = window.matchMedia(REDUCED);
    let x = 0; // current position (px)
    let frame = 0;
    let last = 0;

    const targetX = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      return p * Math.max(0, t.clientWidth - c.offsetWidth);
    };
    const place = (px: number) => {
      x = px;
      c.style.transform = `translate3d(${px}px, 0, 0)`;
    };
    const glide = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const goal = targetX();
      const next = x + (goal - x) * (1 - Math.exp(-dt * 14));
      if (Math.abs(goal - next) < 0.3) {
        place(goal);
        frame = 0;
        last = 0;
        return;
      }
      place(next);
      frame = requestAnimationFrame(glide);
    };
    const update = () => {
      if (motion.matches) {
        // Reduced motion: position follows the scroll position 1:1.
        cancelAnimationFrame(frame);
        frame = 0;
        place(targetX());
      } else if (!frame) {
        frame = requestAnimationFrame(glide);
      }
    };
    const jump = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      place(targetX());
    };

    jump(); // start at the right spot (e.g. after reload mid-page) without moving
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", jump);
    motion.addEventListener("change", jump);
    // The page can grow after the last scroll (images, the 3D hero loading):
    // keep the car in step with the page height, without animating.
    const grow = new ResizeObserver(jump);
    grow.observe(document.body);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", jump);
      motion.removeEventListener("change", jump);
      grow.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.progress} aria-hidden="true">
      <div ref={track} className={styles.progressTrack}>
        <div ref={car} className={styles.progressCar} data-progress-car>
          <ProgressCar />
        </div>
      </div>
    </div>
  );
}

/**
 * The journey car (same drawing, git: components/journey/journey-car.tsx),
 * turned 90° so it drives to the right. Lapis body, dark glass roof,
 * Kickdown-blue outline, white headlamps with a short beam, red taillight.
 */
function ProgressCar() {
  return (
    <svg viewBox="-82 0 116 40" focusable="false">
      <defs>
        <radialGradient id="pc-beam" cx="0.5" cy="1" r="0.9">
          <stop offset="0" stopColor="#dbeeff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#dbeeff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pc-paint" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#173f86" />
          <stop offset="0.5" stopColor="#2a63c4" />
          <stop offset="1" stopColor="#173f86" />
        </linearGradient>
      </defs>
      <g transform="rotate(90)">
        <path d="M8 2 L-4 -34 H44 L32 2 Z" fill="url(#pc-beam)" />
        <rect x="-1" y="24" width="5" height="4" rx="1.5" fill="#06090d" />
        <rect x="36" y="24" width="5" height="4" rx="1.5" fill="#06090d" />
        <rect x="2" y="1" width="36" height="78" rx="11" fill="url(#pc-paint)" stroke="#009CDC" strokeWidth="1.2" />
        <rect x="7" y="22" width="26" height="44" rx="7" fill="#04070c" />
        <rect x="7" y="22" width="26" height="44" rx="7" fill="none" stroke="#7fdcff" strokeWidth="1.1" />
        <path d="M10.5 30 V58 M29.5 30 V58" stroke="#7fdcff" strokeWidth="0.9" strokeLinecap="round" />
        <rect x="5" y="2.2" width="8" height="2.4" rx="1" fill="#f2f8ff" />
        <rect x="27" y="2.2" width="8" height="2.4" rx="1" fill="#f2f8ff" />
        <rect x="13" y="3" width="14" height="0.9" fill="#7fdcff" />
        <rect x="6" y="75.6" width="28" height="2" rx="1" fill="#ff2b2e" />
      </g>
    </svg>
  );
}
