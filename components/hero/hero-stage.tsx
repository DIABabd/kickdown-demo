"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from "react";
import styles from "./hero.module.css";

// Three.js + R3F are only downloaded when the 3D scene is actually used.
const CarScene = dynamic(() => import("./car-scene"), { ssr: false });

/** Temporary diagnostics label – compiled out of production builds. */
const SHOW_STATUS = process.env.NODE_ENV === "development";

const REDUCED = "(prefers-reduced-motion: reduce)";

type Phase = "waiting" | "3d" | "still";

type Status = {
  webgl: "checking" | "yes" | "no";
  /** WebGL works, but the browser flags it as slow (software renderer, blocklisted driver). */
  caveat: boolean;
  reason: string;
  error: string;
};

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

function probeWebGL2(): Pick<Status, "webgl" | "caveat"> & { error: string } {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    if (!gl) return { webgl: "no", caveat: false, error: "" };
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    const fast = document
      .createElement("canvas")
      .getContext("webgl2", { failIfMajorPerformanceCaveat: true });
    fast?.getExtension("WEBGL_lose_context")?.loseContext();
    return { webgl: "yes", caveat: !fast, error: "" };
  } catch (e) {
    return { webgl: "no", caveat: false, error: e instanceof Error ? e.message : String(e) };
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
    if (SHOW_STATUS) console.error("[hero 3D]", error, info.componentStack);
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
  const [status, setStatus] = useState<Status>({
    webgl: "checking",
    caveat: false,
    reason: "waiting for page idle",
    error: "",
  });

  const fallBack = (reason: string, error = "") => {
    setReady(false);
    setPhase("still");
    setStatus((s) => ({ ...s, reason, error: error || s.error }));
  };

  useEffect(() => {
    const flag = new URLSearchParams(window.location.search).get("hero3d");
    const force = flag === "1";
    const motion = window.matchMedia(REDUCED);
    const onMotionChange = () => setReducedMotion(motion.matches);
    motion.addEventListener("change", onMotionChange);

    const start = () => {
      setReducedMotion(motion.matches);
      const gl = probeWebGL2();
      setStatus((s) => ({ ...s, webgl: gl.webgl, caveat: gl.caveat, error: gl.error }));

      if (flag === "0") return fallBack("URL flag ?hero3d=0");
      if (gl.webgl === "no") return fallBack("WebGL2 not available");
      const reason = hardReason(force);
      if (reason) return fallBack(reason);

      setForced(force);
      setStatus((s) => ({ ...s, reason: "loading 3D…" }));
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
    <div className={styles.stage} data-ready={ready || undefined}>
      <div className={styles.still}>{still}</div>
      {phase === "3d" && (
        <div className={styles.live}>
          <SceneBoundary onError={(message) => fallBack("3D error", message)}>
            <CarScene
              forced={forced}
              reducedMotion={reducedMotion}
              onReady={() => {
                setReady(true);
                setStatus((s) => ({ ...s, reason: "none" }));
              }}
              onFallback={(reason) => fallBack(reason)}
            />
          </SceneBoundary>
        </div>
      )}

      {SHOW_STATUS && (
        <dl className={styles.devStatus} aria-hidden="true">
          <dt>WebGL available</dt>
          <dd>
            {status.webgl}
            {status.caveat ? " (browser flags it as slow)" : ""}
          </dd>
          <dt>Renderer active</dt>
          <dd>{ready ? "yes" : "no"}</dd>
          <dt>Fallback reason</dt>
          <dd>{ready ? "none" : status.reason}</dd>
          <dt>3D error</dt>
          <dd>{status.error || "none"}</dd>
          {reducedMotion && (
            <>
              <dt>Reduced motion</dt>
              <dd>on – 3D shown without automatic motion</dd>
            </>
          )}
        </dl>
      )}
    </div>
  );
}
