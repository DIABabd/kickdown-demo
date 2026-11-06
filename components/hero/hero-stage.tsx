"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from "react";
import { ui } from "@/content/start";
import styles from "./hero.module.css";

// Three.js + R3F are only downloaded when the 3D scene is actually used.
const CarScene = dynamic(() => import("./car-scene"), { ssr: false });

const REDUCED = "(prefers-reduced-motion: reduce)";

type Phase = "waiting" | "3d" | "still";

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

/**
 * WebGL2 support. A "major performance caveat" (software renderer) is not
 * treated as a failure here – the frame-rate probe decides that.
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

/**
 * Reasons that genuinely call for the still image before trying 3D.
 * Reduced motion is NOT one of them: the 3D car is shown without
 * automatic motion instead. Slow devices are caught by the frame probe.
 */
function hardReason(force: boolean): string | null {
  if (force) return null;
  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData) return "Data Saver is on";
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4)
    return `low device memory (${nav.deviceMemory} GB)`;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4)
    return `few CPU cores (${nav.hardwareConcurrency})`;
  return null;
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
 * Three.js car once the page is idle. The still stays only when 3D is
 * truly not possible: no WebGL2, Data Saver, a very weak device, a frame
 * rate that stays too low, or a 3D error.
 *
 * Testing: `?hero3d=0` always shows the still, `?hero3d=1` skips the
 * device hints and the frame-rate probe.
 */
export function HeroStage({ still }: { still: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [forced, setForced] = useState(false);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  /** Why the still is shown – exposed as data-fallback for debugging. */
  const [reason, setReason] = useState<string | null>(null);

  const fallBack = (why: string) => {
    setReady(false);
    setPhase("still");
    setReason(why);
  };

  useEffect(() => {
    const flag = new URLSearchParams(window.location.search).get("hero3d");
    const force = flag === "1";
    const motion = window.matchMedia(REDUCED);
    const onMotionChange = () => setReducedMotion(motion.matches);
    motion.addEventListener("change", onMotionChange);

    const start = () => {
      setReducedMotion(motion.matches);
      if (flag === "0") return fallBack("URL flag ?hero3d=0");
      if (!hasWebGL2()) return fallBack("WebGL2 not available");
      const hard = hardReason(force);
      if (hard) return fallBack(hard);

      setForced(force);
      setPhase("3d");
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
      data-ready={ready || undefined}
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
              onFallback={(reason) => fallBack(reason)}
            />
          </SceneBoundary>
        </div>
      )}
      {/* Pause/play for the automatic turn (WCAG 2.2.2). Not shown with reduced
          motion – nothing turns by itself then; dragging works either way. */}
      {phase === "3d" && ready && !reducedMotion && (
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
