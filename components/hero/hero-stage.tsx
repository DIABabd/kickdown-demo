"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from "react";
import { debugInfo } from "@/components/site/debug-info";
import { ui } from "@/content/start";
import styles from "./hero.module.css";

// Three.js + R3F are only downloaded when the 3D scene is actually used.
const CarScene = dynamic(() => import("./car-scene"), { ssr: false });

const REDUCED = "(prefers-reduced-motion: reduce)";

/** "off": no WebGL2 or the scene crashed – the car area simply stays empty. */
type Phase = "waiting" | "3d" | "off";

/**
 * WebGL2 support (three.js needs WebGL2). A "major performance caveat"
 * (software renderer) is not treated as a failure – the scene then simply
 * renders at pixel ratio 1.
 */
function hasWebGL2() {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

/** Catches errors from loading or running the 3D scene → empty car area. */
class SceneBoundary extends Component<
  { onError: (message: string) => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError(error.message || String(error));
    if (process.env.NODE_ENV === "development") console.error("[hero 3D]", error, info.componentStack);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * The hero's car area: the interactive Three.js car, nothing else. There is
 * no 2D picture of the car at all – not while loading, not as a fallback.
 *
 * - While the 3D scene loads, the car area is empty: the hero shows only its
 *   background and the "KICKDOWN" lettering. Once the first frames are
 *   drawn, the car fades in (opacity only – no layout shift).
 * - The 3D car runs on every device with WebGL2, phones included (no
 *   device, memory, CPU, touch or frame-rate checks; slow devices get a
 *   lower pixel ratio instead, car-scene.tsx).
 * - No WebGL2, or the scene crashes: the car area stays empty; the text,
 *   call button and layout are unaffected.
 * - The browser takes the WebGL context away (memory pressure): the car
 *   fades out and comes back by itself when the context is restored.
 *
 * `?debug=1` shows the debug panel (components/site/debug-panel.tsx).
 */
export function HeroStage() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [forced, setForced] = useState(false);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  /** Why there is no 3D car (no WebGL2 / crash) – exposed as data-off for debugging. */
  const [reason, setReason] = useState<string | null>(null);
  /** The browser took the WebGL context away (e.g. memory pressure) – the car is hidden until it's back. */
  const [lost, setLost] = useState(false);

  const turnOff = (why: string) => {
    setReady(false);
    setPhase("off");
    setReason(why);
    debugInfo.heroOffReason = why;
    debugInfo.heroPhase = "off";
  };

  useEffect(() => {
    const flag = new URLSearchParams(window.location.search).get("hero3d");
    const force = flag === "1";
    const motion = window.matchMedia(REDUCED);
    const onMotionChange = () => setReducedMotion(motion.matches);
    motion.addEventListener("change", onMotionChange);

    const start = () => {
      setReducedMotion(motion.matches);
      debugInfo.webgl2 = hasWebGL2();
      if (!debugInfo.webgl2) return turnOff("WebGL2 not available");
      setForced(force);
      setPhase("3d");
      debugInfo.heroPhase = "3d";
    };

    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(start, 800);
    }

    return () => {
      motion.removeEventListener("change", onMotionChange);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={styles.stage}
      data-hero-stage
      data-ready={(ready && !lost) || undefined}
      data-off={reason ?? undefined}
    >
      {phase === "3d" && (
        <div className={styles.live}>
          <SceneBoundary onError={(message) => turnOff(`3D error: ${message}`)}>
            <CarScene
              forced={forced}
              reducedMotion={reducedMotion}
              paused={paused}
              onReady={() => setReady(true)}
              onContextLost={(isLost) => setLost(isLost)}
            />
          </SceneBoundary>
        </div>
      )}
      {/* Pause/play for the automatic turn (WCAG 2.2.2). Not shown with reduced
          motion – nothing turns by itself then; dragging works either way. */}
      {phase === "3d" && ready && !lost && !reducedMotion && (
        <button
          type="button"
          className={styles.spinToggle}
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={ui.spinPause}
          title={paused ? ui.spinPlay : ui.spinPause}
        >
          {paused ? (
            <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" focusable="false">
              <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" focusable="false">
              <rect x="6.5" y="5.5" width="3.6" height="13" rx="1" fill="currentColor" />
              <rect x="13.9" y="5.5" width="3.6" height="13" rx="1" fill="currentColor" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
