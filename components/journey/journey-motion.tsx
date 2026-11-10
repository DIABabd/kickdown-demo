"use client";

import gsap from "gsap";
import { useEffect, useRef, type ReactNode } from "react";
import { debugInfo } from "@/components/site/debug-info";
import { MARKERS, ROAD_VIEWBOX } from "./road-path";

const REDUCED = "(prefers-reduced-motion: reduce)";
/** Height in the viewport (0 = top) where the car "arrives" at a station. */
const REACH = 0.72;

/** Path length at the point closest to (x, y) – sampled, runs once. */
function lengthAt(path: SVGPathElement, x: number, y: number) {
  const total = path.getTotalLength();
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i <= 800; i++) {
    const l = (total * i) / 800;
    const p = path.getPointAtLength(l);
    const d = (p.x - x) ** 2 + (p.y - y) ** 2;
    if (d < bestD) {
      bestD = d;
      best = l;
    }
  }
  return best;
}

/**
 * Drives the small car along the winding road with the page scroll –
 * forward when scrolling down, backward when scrolling up. No pinning, no
 * scroll hijacking: the road column is CSS-sticky and the page scrolls
 * normally.
 *
 * Robust on phones: the car's place is computed from the stations' LIVE
 * positions on screen on every update (never from positions measured
 * earlier), so images, web fonts, the 3D hero loading, the mobile address
 * bar growing/shrinking or a page restored from the back/forward cache can't
 * leave it stuck. Plain browser listeners (passive scroll on the window,
 * resize, visualViewport, orientationchange, load, fonts, pageshow and a
 * ResizeObserver) – no ScrollTrigger refresh to depend on.
 *
 * - Motion allowed: the car glides to its spot (0.45 s, no overshoot);
 *   stations fade in as the car reaches them.
 * - Reduced motion (e.g. Windows "Animation effects" off, iOS "Reduce
 *   Motion"): the car is placed directly from the scroll position (1:1, no
 *   smoothing, nothing moves by itself); all stations are visible.
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

    const motionQuery = window.matchMedia(REDUCED);
    let total = 0;
    let markerF: number[] = [];
    const measurePath = () => {
      total = path.getTotalLength();
      markerF = MARKERS.map((m) => lengthAt(path, m.x, m.y) / total);
    };
    measurePath();

    /**
     * Where the car belongs (0–1), from the elements' current positions.
     * Each anchor is "passed" when its distance below the viewport line
     * reaches 0; between two anchors the car moves linearly.
     */
    const target = () => {
      const vh = window.innerHeight;
      const listBox = list.getBoundingClientRect();
      const anchors = [
        { d: listBox.top - vh, f: 0 },
        ...stations.map((s, i) => ({ d: s.getBoundingClientRect().top - vh * REACH, f: markerF[i] })),
        { d: listBox.bottom - vh * 0.85, f: 1 },
      ];
      // anchors must be in order; keep a minimal spacing
      for (let i = 1; i < anchors.length; i++) {
        if (anchors[i].d <= anchors[i - 1].d) anchors[i].d = anchors[i - 1].d + 1;
      }
      if (anchors[0].d >= 0) return { f: 0, anchors };
      for (let i = 1; i < anchors.length; i++) {
        const a = anchors[i - 1];
        const b = anchors[i];
        if (b.d >= 0) return { f: a.f + (-a.d / (b.d - a.d)) * (b.f - a.f), anchors };
      }
      return { f: 1, anchors };
    };

    // Car placement in CSS pixels of the road box (the SVG is stretched).
    const proxy = { f: 0 };
    const render = () => {
      const w = road.clientWidth / ROAD_VIEWBOX.w;
      const h = road.clientHeight / ROAD_VIEWBOX.h;
      if (!w || !h || !total) return; // page hidden (cached) – placed again when shown
      const l = proxy.f * total;
      const p = path.getPointAtLength(l);
      const a = path.getPointAtLength(Math.max(0, l - 2));
      const b = path.getPointAtLength(Math.min(total, l + 2));
      const deg = (Math.atan2((b.y - a.y) * h, (b.x - a.x) * w) * 180) / Math.PI + 90;
      car.style.transform = `translate(${p.x * w}px, ${p.y * h}px) translate(-50%, -50%) rotate(${deg}deg)`;
      // the road already driven: a thin Kickdown-blue line up to the car
      driven?.style.setProperty("stroke-dashoffset", String(1 - proxy.f));
      el.dataset.progress = proxy.f.toFixed(3);
      debugInfo.journeyProgress = proxy.f;
    };
    const glideTo = gsap.quickTo(proxy, "f", { duration: 0.45, ease: "power3.out", onUpdate: render });

    let current = -1;
    let frame = 0;
    const update = (instant = false) => {
      frame = 0;
      const reduced = motionQuery.matches;
      el.dataset.motion = reduced ? "direct" : "on";
      debugInfo.journeyMode = reduced ? "direct" : "on";
      debugInfo.journeyUpdates++;
      const { f, anchors } = target();
      if (reduced || instant) {
        // 1:1 with the scroll position – no smoothing, nothing moves by itself
        gsap.killTweensOf(proxy);
        proxy.f = f;
        render();
      } else {
        glideTo(f);
      }

      // Stations count as reached when the car gets there (forward and back).
      let now = -1;
      stations.forEach((station, i) => {
        const reached = anchors[i + 1].d < 0;
        if (reached) {
          now = i;
          station.dataset.reached = ""; // once shown, a station stays shown
        }
        markers[i]?.toggleAttribute("data-reached", reached);
      });
      if (now !== current) {
        markers.forEach((m, i) => m.toggleAttribute("data-current", i === now));
        current = now;
      }
    };
    const schedule = () => {
      if (motionQuery.matches) {
        // Reduced motion: placed right in the scroll event – exactly 1:1, never late.
        cancelAnimationFrame(frame);
        update();
      } else if (!frame) {
        frame = requestAnimationFrame(() => update());
      }
    };
    const jump = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      update(true);
    };
    const relayout = () => {
      measurePath();
      jump();
    };

    car.style.left = "0";
    car.style.top = "0";
    jump();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", relayout);
    window.addEventListener("orientationchange", relayout);
    window.addEventListener("load", relayout);
    window.addEventListener("pageshow", relayout);
    window.visualViewport?.addEventListener("resize", schedule);
    motionQuery.addEventListener("change", jump);
    document.fonts?.ready.then(relayout).catch(() => {});
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(relayout);
    });
    ro.observe(document.body);
    ro.observe(road);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", relayout);
      window.removeEventListener("orientationchange", relayout);
      window.removeEventListener("load", relayout);
      window.removeEventListener("pageshow", relayout);
      window.visualViewport?.removeEventListener("resize", schedule);
      motionQuery.removeEventListener("change", jump);
      ro.disconnect();
      cancelAnimationFrame(frame);
      gsap.killTweensOf(proxy);
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
