"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";
/** Blocks that rise in softly the first time they scroll into view. */
const REVEAL = "main h2, main h3, main p, main figure, main table, main dl, main ul, main ol, main article, main [data-reveal-block]";

/**
 * Site-wide, quiet scroll motion (every page):
 * - reveal: blocks below the fold fade and rise in once (nested blocks move
 *   with their parent, never on their own; the hero and the road journey
 *   have their own motion and are left alone),
 * - sweep: section transitions (`[data-sweep]`) catch one light sweep.
 *
 * Only elements *below* the viewport at load are hidden first, so nothing
 * visible ever blinks out. Without JavaScript, or with reduced motion,
 * everything is simply shown (globals.css also forces that in CSS).
 * Runs again after every client navigation – also for pages that Next
 * restores from its hidden cache.
 */
export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED).matches;
    const io = new IntersectionObserver(
      (entries) => {
        let i = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          el.dataset.in = "";
          if (el.dataset.reveal === "pending") {
            // a little stagger for blocks that arrive together
            el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
            el.dataset.reveal = "in";
            i++;
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );

    for (const el of document.querySelectorAll<HTMLElement>("[data-sweep]:not([data-in])")) {
      if (el.checkVisibility()) io.observe(el);
    }

    if (!reduced) {
      // Pending blocks of a page restored from the cache.
      for (const el of document.querySelectorAll<HTMLElement>('[data-reveal="pending"]')) {
        if (el.checkVisibility()) io.observe(el);
      }
      const found = [...document.querySelectorAll<HTMLElement>(REVEAL)].filter(
        (el) => !el.dataset.reveal && !el.closest("[data-hero], [data-journey]") && el.checkVisibility(),
      );
      const set = new Set(found);
      const outer = found.filter((el) => {
        for (let p = el.parentElement; p; p = p.parentElement) if (set.has(p)) return false;
        return true;
      });
      const fold = window.innerHeight * 0.94;
      for (const el of outer) {
        if (el.getBoundingClientRect().top > fold) {
          el.dataset.reveal = "pending";
          io.observe(el);
        } else {
          el.dataset.reveal = "done";
        }
      }
    }

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
