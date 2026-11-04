"use client";

import { useEffect } from "react";

/** Parses computed colours: "rgb(…)", "rgba(…)" and "color(srgb …)". */
function parseColor(value: string): { r: number; g: number; b: number; a: number } | null {
  const rgb = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/);
  if (rgb) return { r: +rgb[1] / 255, g: +rgb[2] / 255, b: +rgb[3] / 255, a: rgb[4] === undefined ? 1 : +rgb[4] };
  const srgb = value.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?/);
  if (srgb) return { r: +srgb[1], g: +srgb[2], b: +srgb[3], a: srgb[4] === undefined ? 1 : +srgb[4] };
  return null;
}

const luminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

/**
 * Looks at what is directly under the sticky header and marks it
 * `data-theme="day"` over light (daylight) sections, `night` otherwise.
 * Works from the actual background colour, so new day/night sections
 * need no extra markup.
 */
export function HeaderTheme() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;

    const themeBelow = (): "day" | "night" => {
      const y = header.getBoundingClientRect().bottom + 2;
      const x = window.innerWidth / 2;
      for (const el of document.elementsFromPoint(x, y)) {
        if (header.contains(el)) continue;
        for (let n: Element | null = el; n; n = n.parentElement) {
          const c = parseColor(getComputedStyle(n).backgroundColor);
          if (c && c.a > 0.5) return luminance(c) > 0.4 ? "day" : "night";
        }
        break;
      }
      return "night";
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const theme = themeBelow();
      if (header.dataset.theme !== theme) header.dataset.theme = theme;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
