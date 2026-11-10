"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

/**
 * Gentle scroll-out of the hero's typography (GSAP ScrollTrigger, scrubbed,
 * no pinning – the page always scrolls normally):
 * - the "KICKDOWN" lettering drifts up a little and dims,
 * - the text fades as it leaves.
 *
 * The 3D car is NOT animated by scrolling: it stays in place in the hero
 * and keeps turning by itself (car-scene.tsx).
 *
 * Only with `prefers-reduced-motion: no-preference` (gsap.matchMedia also
 * undoes everything when the setting changes). Renders nothing.
 */
export function HeroMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = anchor.current?.closest<HTMLElement>("[data-hero]");
    if (!hero) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const word = hero.querySelector("[data-hero-word]");
      const text = hero.querySelector("[data-hero-text]");
      if (!word || !text) return;

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.35 },
        })
        .to(word, { yPercent: -35, opacity: 0.3, duration: 1 }, 0)
        .to(text, { opacity: 0, duration: 0.5, ease: "power1.in" }, 0);
    });

    return () => mm.revert();
  }, []);

  return <span ref={anchor} hidden />;
}
