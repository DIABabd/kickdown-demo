"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { debugInfo } from "@/components/site/debug-info";
import { MARKERS, ROAD_VIEWBOX } from "./road-path";

const REDUCED = "(prefers-reduced-motion: reduce)";
/** Height in the viewport (0 = top) where the car "arrives" at a station. */
const REACH = 0.72;
/** Road samples in the lookup table (path geometry is read once, at start). */
const SAMPLES = 480;
/** Glide speed (1/s): ~0.45 s to settle, frame-rate independent, no overshoot. */
const GLIDE = 9;
/** Height-only resizes smaller than this are the mobile address bar – ignored. */
const ADDRESS_BAR = 160;

type Sample = { x: number; y: number; deg: number };
type Layout = {
  /** Scroll positions (px) where the car reaches each anchor, and its road position there. */
  stops: { scroll: number; f: number }[];
  /** Road box in CSS px (the SVG is stretched to it). */
  sx: number;
  sy: number;
};

/**
 * Drives the small car along the winding road with the page scroll –
 * forward when scrolling down, backward when scrolling up. No pinning, no
 * scroll hijacking: the road column is CSS-sticky and the page scrolls
 * normally.
 *
 * Smooth on phones:
 * - The road is sampled ONCE into a lookup table (no SVG path maths while
 *   scrolling).
 * - Station positions are measured only when the layout can have changed:
 *   start, load, web fonts, back/forward cache, real resizes (width or
 *   orientation), and a ResizeObserver on the content. Height-only resizes
 *   from the mobile address bar are ignored, so the car never jumps.
 * - While scrolling: the passive scroll listener only requests ONE
 *   animation frame; that frame reads window.scrollY (no layout read),
 *   computes the car's place from the cached values and writes a single
 *   GPU-friendly transform (translate3d + rotate). The DOM is only touched
 *   when something actually changes (stations reached, mode).
 *
 * - Motion allowed: the car glides to its spot (~0.45 s, no overshoot);
 *   stations fade in as the car reaches them.
 * - Reduced motion: the car is placed exactly where the scroll position
 *   says, every frame – no smoothing, nothing moves by itself; all
 *   stations are visible.
 * - Without JavaScript: the car waits at the start; all stations visible.
 */
export function JourneyMotion({ className, children }: { className?: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const path = el.querySelector<SVGPathElement>("[data-road-path]");
    const driven = el.querySelector<SVGPathElement>("[data-road-driven]");
    const road = el.querySelector<HTMLElement>("[data-road]");
    const car = el.querySelector<HTMLElement>("[data-journey-car]");
    const list = el.querySelector<HTMLElement>("[data-stations]");
    const stations = Array.from(el.querySelectorAll<HTMLElement>("[data-station]"));
    const markers = Array.from(el.querySelectorAll<HTMLElement>("[data-marker]"));
    if (!path || !road || !car || !list || stations.length !== MARKERS.length) return;

    /* ---- road lookup table (viewBox units), once ---- */
    const total = path.getTotalLength();
    const pts: Sample[] = [];
    for (let i = 0; i < SAMPLES; i++) {
      const p = path.getPointAtLength((total * i) / (SAMPLES - 1));
      pts.push({ x: p.x, y: p.y, deg: 0 });
    }
    // each station marker sits on the road: its road position = nearest sample
    const markerF = MARKERS.map((m) => {
      let best = 0;
      let bestD = Infinity;
      pts.forEach((p, i) => {
        const d = (p.x - m.x) ** 2 + (p.y - m.y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best / (SAMPLES - 1);
    });

    /* ---- layout cache: measured only when the layout can have changed ---- */
    let layout: Layout | null = null;
    let measuredW = 0;
    let measuredH = 0;
    const measure = () => {
      const sx = road.clientWidth / ROAD_VIEWBOX.w;
      const sy = road.clientHeight / ROAD_VIEWBOX.h;
      if (!sx || !sy) {
        layout = null; // hidden (cached page) – measured again when shown
        return;
      }
      const vh = window.innerHeight;
      const y0 = window.scrollY;
      const top = (node: HTMLElement) => node.getBoundingClientRect().top + y0;
      const listTop = top(list);
      const stops = [
        { scroll: listTop - vh, f: 0 },
        ...stations.map((s, i) => ({ scroll: top(s) - vh * REACH, f: markerF[i] })),
        { scroll: listTop + list.offsetHeight - vh * 0.85, f: 1 },
      ];
      for (let i = 1; i < stops.length; i++) {
        if (stops[i].scroll <= stops[i - 1].scroll) stops[i].scroll = stops[i - 1].scroll + 1;
      }
      // headings in CSS px, so the car turns correctly on the stretched road
      for (let i = 0; i < SAMPLES; i++) {
        const a = pts[Math.max(0, i - 2)];
        const b = pts[Math.min(SAMPLES - 1, i + 2)];
        pts[i].deg = (Math.atan2((b.y - a.y) * sy, (b.x - a.x) * sx) * 180) / Math.PI + 90;
      }
      layout = { stops, sx, sy };
      measuredW = window.innerWidth;
      measuredH = vh;
    };

    /** Scroll position → place on the road (0–1), from the cached stops. */
    const goalFor = (scroll: number) => {
      const stops = layout!.stops;
      if (scroll <= stops[0].scroll) return 0;
      for (let i = 1; i < stops.length; i++) {
        const a = stops[i - 1];
        const b = stops[i];
        if (scroll <= b.scroll) return a.f + ((scroll - a.scroll) / (b.scroll - a.scroll)) * (b.f - a.f);
      }
      return 1;
    };

    /* ---- drawing: one transform (+ the thin driven line), no layout reads ---- */
    let drawnF = -1;
    const draw = (f: number) => {
      if (!layout || Math.abs(f - drawnF) < 0.00005) return;
      drawnF = f;
      const t = f * (SAMPLES - 1);
      const i = Math.min(SAMPLES - 2, Math.floor(t));
      const k = t - i;
      const a = pts[i];
      const b = pts[i + 1];
      const x = (a.x + (b.x - a.x) * k) * layout.sx;
      const y = (a.y + (b.y - a.y) * k) * layout.sy;
      const deg = a.deg + (b.deg - a.deg) * k;
      car.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${deg.toFixed(2)}deg)`;
      driven?.style.setProperty("stroke-dashoffset", (1 - f).toFixed(4));
      debugInfo.journeyProgress = f;
    };

    /* ---- stations: DOM writes only when the reached count changes ---- */
    let reachedCount = -1;
    const markStations = (scroll: number) => {
      const stops = layout!.stops;
      let n = 0;
      while (n < stations.length && scroll >= stops[n + 1].scroll) n++;
      if (n === reachedCount) return;
      reachedCount = n;
      stations.forEach((s, i) => {
        if (i < n && !("reached" in s.dataset)) s.dataset.reached = ""; // once shown, stays shown
      });
      markers.forEach((m, i) => {
        m.toggleAttribute("data-reached", i < n);
        m.toggleAttribute("data-current", i === n - 1);
      });
    };

    /* ---- one animation frame per change ---- */
    const motionQuery = window.matchMedia(REDUCED);
    let reduced = motionQuery.matches;
    const setMode = () => {
      reduced = motionQuery.matches;
      el.dataset.motion = reduced ? "direct" : "on";
      debugInfo.journeyMode = reduced ? "direct" : "on";
    };
    setMode();

    let f = 0;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = 0;
      if (!layout) return;
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
      last = now;
      const scroll = window.scrollY;
      const goal = goalFor(scroll);
      // reduced motion: exactly where the scroll position says; otherwise glide
      f = reduced ? goal : f + (goal - f) * (1 - Math.exp(-GLIDE * dt));
      if (Math.abs(goal - f) < 0.0004) f = goal;
      draw(f);
      markStations(scroll);
      debugInfo.journeyUpdates++;
      if (f !== goal) raf = requestAnimationFrame(tick);
      else {
        last = 0;
        el.dataset.progress = f.toFixed(3); // settled (tests / debug)
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    /** After a layout change: re-measure and place the car without gliding. */
    const relayout = () => {
      measure();
      if (!layout) return;
      f = goalFor(window.scrollY);
      drawnF = -1;
      draw(f);
      markStations(window.scrollY);
      debugInfo.journeyUpdates++;
      el.dataset.progress = f.toFixed(3);
    };
    let relayoutFrame = 0;
    const scheduleRelayout = () => {
      cancelAnimationFrame(relayoutFrame);
      relayoutFrame = requestAnimationFrame(relayout);
    };
    const onResize = () => {
      // the mobile address bar only changes the height a little: keep the cache
      const widthChanged = window.innerWidth !== measuredW;
      const bigHeightChange = Math.abs(window.innerHeight - measuredH) > ADDRESS_BAR;
      if (widthChanged || bigHeightChange) scheduleRelayout();
    };
    const onMode = () => {
      setMode();
      kick();
    };

    car.style.left = "0";
    car.style.top = "0";
    relayout();

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", scheduleRelayout);
    window.addEventListener("load", scheduleRelayout);
    window.addEventListener("pageshow", scheduleRelayout);
    motionQuery.addEventListener("change", onMode);
    document.fonts?.ready.then(scheduleRelayout).catch(() => {});
    // content above or inside the journey changed size (images, the 3D hero,
    // a cached page shown again) – the only other time we measure
    const ro = new ResizeObserver(scheduleRelayout);
    ro.observe(list);
    ro.observe(road);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", scheduleRelayout);
      window.removeEventListener("load", scheduleRelayout);
      window.removeEventListener("pageshow", scheduleRelayout);
      motionQuery.removeEventListener("change", onMode);
      ro.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(relayoutFrame);
      delete el.dataset.motion;
      delete el.dataset.progress;
      car.style.removeProperty("left");
      car.style.removeProperty("top");
      car.style.removeProperty("transform");
      driven?.style.removeProperty("stroke-dashoffset");
      stations.forEach((s) => delete s.dataset.reached);
      markers.forEach((m) => {
        m.removeAttribute("data-reached");
        m.removeAttribute("data-current");
      });
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
