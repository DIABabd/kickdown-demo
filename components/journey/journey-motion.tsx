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
 * Drives the small car along the road with the page scroll (GSAP
 * ScrollTrigger). No pinning and no scroll hijacking: the road column is
 * CSS-sticky and the page scrolls normally. Scrolling back moves the car
 * back. Stations are revealed as the car reaches them.
 *
 * Everything is set up inside gsap.matchMedia for "no-preference" only:
 * with reduced motion nothing runs and the stations stay a plain,
 * fully visible list. Without JavaScript the list is fully visible too.
 */
export function JourneyMotion({ className, children }: { className?: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const path = el.querySelector<SVGPathElement>("[data-road-path]");
        const road = el.querySelector<HTMLElement>("[data-road]");
        const car = el.querySelector<HTMLElement>("[data-journey-car]");
        const list = el.querySelector<HTMLElement>("[data-stations]");
        const stations = Array.from(el.querySelectorAll<HTMLElement>("[data-station]"));
        const markers = Array.from(el.querySelectorAll<HTMLElement>("[data-marker]"));
        if (!path || !road || !car || !list || stations.length !== MARKERS.length) return;

        el.dataset.motion = "on";
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
          if (scroll <= stops[0].scroll) return 0;
          for (let i = 1; i < stops.length; i++) {
            const a = stops[i - 1];
            const b = stops[i];
            if (scroll <= b.scroll) return a.f + ((scroll - a.scroll) / (b.scroll - a.scroll)) * (b.f - a.f);
          }
          return 1;
        };

        // Car placement in CSS pixels of the road box (the SVG is stretched).
        const proxy = { f: 0 };
        car.style.left = "0";
        car.style.top = "0";
        const render = () => {
          const w = road.clientWidth / ROAD_VIEWBOX.w;
          const h = road.clientHeight / ROAD_VIEWBOX.h;
          const l = proxy.f * total;
          const p = path.getPointAtLength(l);
          const a = path.getPointAtLength(Math.max(0, l - 2));
          const b = path.getPointAtLength(Math.min(total, l + 2));
          const deg = (Math.atan2((b.y - a.y) * h, (b.x - a.x) * w) * 180) / Math.PI + 90;
          car.style.transform = `translate(${p.x * w}px, ${p.y * h}px) translate(-50%, -50%) rotate(${deg}deg)`;
        };
        const driveTo = gsap.quickTo(proxy, "f", { duration: 0.45, ease: "power3.out", onUpdate: render });

        let current = -1;
        const update = (instant = false) => {
          const scroll = window.scrollY;
          const f = roadFraction(scroll);
          if (instant) {
            proxy.f = f;
            driveTo(f, f);
            render();
          } else driveTo(f);

          // Stations appear when the car reaches them – and stay visible.
          let now = -1;
          stations.forEach((station, i) => {
            if (scroll >= stops[i + 1].scroll) {
              now = i;
              station.dataset.reached = "";
              markers[i]?.setAttribute("data-reached", "");
            }
          });
          if (now !== current) {
            markers.forEach((m, i) => m.toggleAttribute("data-current", i === now));
            current = now;
          }
        };

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

        return () => {
          st.kill();
          gsap.killTweensOf(proxy);
          delete el.dataset.motion;
          car.style.removeProperty("left");
          car.style.removeProperty("top");
          car.style.removeProperty("transform");
          stations.forEach((s) => delete s.dataset.reached);
          markers.forEach((m) => {
            m.removeAttribute("data-reached");
            m.removeAttribute("data-current");
          });
        };
      });

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
