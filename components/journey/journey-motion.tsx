"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";
import { MARKERS, ROAD_VIEWBOX } from "./road-path";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Height in the viewport (0 = top) where the car "arrives" at a station. */
const REACH = 0.72;

/** Path length at the point closest to (x, y) – sampled, runs once per setup. */
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

type Stop = { scroll: number; f: number };

/**
 * Drives the small car along the winding road with the page scroll (GSAP
 * ScrollTrigger). No pinning and no scroll hijacking: the road column is
 * CSS-sticky and the page scrolls normally. Scrolling down drives the car
 * forward, scrolling up drives it back.
 *
 * - Motion allowed: the car glides to its spot with a short ease
 *   (0.45 s, no overshoot); the stations fade in as the car reaches them.
 * - Reduced motion (e.g. Windows "Animation effects" off): the car stays
 *   visible and is placed directly from the scroll position on every
 *   scroll event – no smoothing, nothing moves by itself; all stations are
 *   simply visible.
 * - Without JavaScript: the car waits at the start of the road, all
 *   stations are visible.
 */
export function JourneyMotion({ className, children }: { className?: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const reduced = Boolean(ctx.conditions?.reduced);
          const path = el.querySelector<SVGPathElement>("[data-road-path]");
          const driven = el.querySelector<SVGPathElement>("[data-road-driven]");
          const road = el.querySelector<HTMLElement>("[data-road]");
          const car = el.querySelector<HTMLElement>("[data-journey-car]");
          const list = el.querySelector<HTMLElement>("[data-stations]");
          const stations = Array.from(el.querySelectorAll<HTMLElement>("[data-station]"));
          const markers = Array.from(el.querySelectorAll<HTMLElement>("[data-marker]"));
          if (!path || !road || !car || !list || stations.length !== MARKERS.length) return;

          el.dataset.motion = reduced ? "direct" : "on";
          const total = path.getTotalLength();
          const markerF = MARKERS.map((m) => lengthAt(path, m.x, m.y) / total);

          let stops: Stop[] = [];
          const docTop = (node: HTMLElement) => node.getBoundingClientRect().top + window.scrollY;

          const measure = () => {
            const vh = window.innerHeight;
            const listTop = docTop(list);
            const pts: Stop[] = [
              { scroll: listTop - vh, f: 0 },
              ...stations.map((s, i) => ({ scroll: docTop(s) - vh * REACH, f: markerF[i] })),
              { scroll: listTop + list.offsetHeight - vh * 0.85, f: 1 },
            ];
            for (let i = 1; i < pts.length; i++) {
              if (pts[i].scroll <= pts[i - 1].scroll) pts[i].scroll = pts[i - 1].scroll + 1;
            }
            stops = pts;
          };

          /** Scroll position → position along the road (0–1), piecewise linear. */
          const roadFraction = (scroll: number) => {
            if (!stops.length || scroll <= stops[0].scroll) return 0;
            for (let i = 1; i < stops.length; i++) {
              const a = stops[i - 1];
              const b = stops[i];
              if (scroll <= b.scroll) return a.f + ((scroll - a.scroll) / (b.scroll - a.scroll)) * (b.f - a.f);
            }
            return 1;
          };

          // Car placement in CSS pixels of the road box (the SVG is stretched).
          const proxy = { f: 0 };
          const render = () => {
            const w = road.clientWidth / ROAD_VIEWBOX.w;
            const h = road.clientHeight / ROAD_VIEWBOX.h;
            if (!w || !h) return; // page hidden (cached) – placed again when shown
            const l = proxy.f * total;
            const p = path.getPointAtLength(l);
            const a = path.getPointAtLength(Math.max(0, l - 2));
            const b = path.getPointAtLength(Math.min(total, l + 2));
            const deg = (Math.atan2((b.y - a.y) * h, (b.x - a.x) * w) * 180) / Math.PI + 90;
            car.style.transform = `translate(${p.x * w}px, ${p.y * h}px) translate(-50%, -50%) rotate(${deg}deg)`;
            // the road already driven: a thin Kickdown-blue line up to the car
            driven?.style.setProperty("stroke-dashoffset", String(1 - proxy.f));
          };
          const driveTo = gsap.quickTo(proxy, "f", { duration: 0.45, ease: "power3.out", onUpdate: render });

          let current = -1;
          const update = (instant = false) => {
            const scroll = window.scrollY;
            const f = roadFraction(scroll);
            if (reduced || instant) {
              // 1:1 with the scroll position – no smoothing, nothing moves by itself
              gsap.killTweensOf(proxy);
              proxy.f = f;
              render();
            } else {
              driveTo(f);
            }

            // Stations count as reached when the car gets there (forward and back).
            let now = -1;
            stations.forEach((station, i) => {
              const reached = scroll >= stops[i + 1].scroll;
              if (reached) now = i;
              // with motion allowed a station, once shown, stays shown
              if (reached) station.dataset.reached = "";
              markers[i]?.toggleAttribute("data-reached", reached);
            });
            if (now !== current) {
              markers.forEach((m, i) => m.toggleAttribute("data-current", i === now));
              current = now;
            }
          };

          car.style.left = "0";
          car.style.top = "0";
          measure();
          update(true);

          const st = ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onUpdate: () => update(),
            onRefresh: () => {
              measure();
              update(true);
            },
          });
          // The page can change height after load (images, the 3D hero) or be
          // restored from Next's hidden cache: measure again, without animating.
          let frame = 0;
          const ro = new ResizeObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
              measure();
              update(true);
            });
          });
          ro.observe(document.body);
          ro.observe(road);

          return () => {
            st.kill();
            ro.disconnect();
            cancelAnimationFrame(frame);
            gsap.killTweensOf(proxy);
            delete el.dataset.motion;
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
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
