"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from "react";
import { debugInfo } from "@/components/site/debug-info";
import { ui } from "@/content/start";
import styles from "./hero.module.css";

// Three.js + R3F are only downloaded when the 3D scene is actually used.
const CarScene = dynamic(() => import("./car-scene"), { ssr: false });

const REDUCED = "(prefers-reduced-motion: reduce)";

type Phase = "waiting" | "3d" | "still";

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

/** Catches errors from loading or running the 3D scene → still image. */
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
 * Shows the server-rendered still first, then swaps in the interactive
 * Three.js car. The 3D car runs on every device with WebGL2 – phones
 * included. There are NO device, screen-size, memory, CPU, touch, Data
 * Saver or frame-rate checks any more. The still is shown only when:
 * - WebGL2 is not available, or
 * - the 3D scene crashes (error boundary), or
 * - briefly, while the browser has taken the WebGL context away (it comes
 *   back on its own when the context is restored).
 * Slow devices get a lower pixel ratio instead (car-scene.tsx).
 *
 * Testing: `?hero3d=0` always shows the still. `?debug=1` shows the
 * debug panel (components/site/debug-panel.tsx).
 */
export function HeroStage({ still }: { still: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [forced, setForced] = useState(false);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  /** Why the still is shown – exposed as data-fallback for debugging. */
  const [reason, setReason] = useState<string | null>(null);
  /** The browser took the WebGL context away (e.g. memory pressure) – the still shows until it's back. */
  const [lost, setLost] = useState(false);

  const fallBack = (why: string) => {
    setReady(false);
    setPhase("still");
    setReason(why);
    debugInfo.heroFallback = why;
    debugInfo.heroPhase = "still";
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
      if (flag === "0") return fallBack("URL flag ?hero3d=0");
      if (!debugInfo.webgl2) return fallBack("WebGL2 not available");
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
      data-fallback={reason ?? undefined}
    >
      <div className={styles.still}>{still}</div>
      {phase === "3d" && (
        <div className={styles.live}>
          <SceneBoundary onError={(message) => fallBack(`3D error: ${message}`)}>
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
