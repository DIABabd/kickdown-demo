"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { heroScroll } from "./hero-scroll";

/**
 * Scroll-out choreography of the hero (GSAP ScrollTrigger, scrubbed – no
 * pinning, so the page always scrolls normally and never feels stuck):
 *
 * - the 3D car turns its nose toward the viewer, grows and drives forward
 *   (progress is handed to the scene via `heroScroll`),
 * - the car layer lags behind the scroll a little, so it seems to drive on
 *   into the next section, then fades out,
 * - the "KICKDOWN" lettering drifts up and dims, the text lifts away.
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
      const stage = hero.querySelector<HTMLElement>("[data-hero-stage]");
      if (!word || !text || !stage) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            heroScroll.progress = st.progress;
            heroScroll.invalidate();
            // Once it leaves, the car layer must not catch clicks over the next section.
            stage.toggleAttribute("data-leaving", st.progress > 0.2);
            // The drag hint and pause button step aside as soon as scrolling starts.
            stage.toggleAttribute("data-scrolled", st.progress > 0.03);
          },
        },
      });
      tl.to(word, { yPercent: -45, opacity: 0.25, duration: 1 }, 0)
        .to(text, { y: -70, opacity: 0, duration: 0.4, ease: "power1.in" }, 0)
        .to(stage, { y: () => window.innerHeight * 0.55, duration: 1 }, 0)
        .to(stage, { opacity: 0, duration: 0.3, ease: "power1.in" }, 0.7);

      return () => {
        heroScroll.progress = 0;
        heroScroll.invalidate();
        stage.removeAttribute("data-leaving");
        stage.removeAttribute("data-scrolled");
      };
    });

    return () => mm.revert();
  }, []);

  return <span ref={anchor} hidden />;
}
