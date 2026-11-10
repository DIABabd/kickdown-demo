"use client";

import { useEffect, useState } from "react";
import { debugInfo } from "./debug-info";

/**
 * TEMPORARY debug panel – only with `?debug=1` in the address.
 * Shows what the phone actually does: WebGL, 3D renderer, why 3D is off,
 * reduced motion and the journey car's progress. Reads values in memory
 * only (debug-info.ts); nothing is stored or sent. Remove before go-live.
 *
 * If the panel does NOT appear with ?debug=1, JavaScript is not running on
 * that device at all – which also explains an empty car area and a still
 * journey car.
 */
export function DebugPanel() {
  const [lines, setLines] = useState<[string, string][]>([]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("debug") !== "1") return;
    let lastFrames = debugInfo.heroFrames;
    let lastT = performance.now();
    const tick = () => {
      const now = performance.now();
      const fps = ((debugInfo.heroFrames - lastFrames) * 1000) / Math.max(1, now - lastT);
      lastFrames = debugInfo.heroFrames;
      lastT = now;
      const nav = navigator as Navigator & { deviceMemory?: number };
      const vv = window.visualViewport;
      const renderer =
        debugInfo.heroPhase !== "3d"
          ? "not running"
          : debugInfo.contextLost
            ? "context lost (waiting for restore)"
            : fps > 0.5
              ? `active – ${Math.round(fps)} fps`
              : debugInfo.heroFrames > 0
                ? "idle (nothing to redraw / off screen)"
                : "starting…";
      setLines([
        ["JavaScript", "running"],
        ["WebGL2", debugInfo.webgl2 === null ? "checking…" : debugInfo.webgl2 ? "yes" : "NO"],
        ["3D renderer", renderer],
        ["Hero car", debugInfo.heroPhase === "off" ? "not shown (car area empty)" : debugInfo.heroPhase === "3d" ? "3D car" : "loading…"],
        ["3D off reason", debugInfo.heroOffReason ?? "none"],
        ["Frames drawn / DPR", `${debugInfo.heroFrames} / ${debugInfo.heroDpr || "–"}`],
        ["Reduced motion", window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "yes" : "no"],
        ["Journey", `${debugInfo.journeyMode} – ${Math.round(debugInfo.journeyProgress * 100)} % (${debugInfo.journeyUpdates} updates)`],
        ["Scroll / viewport", `${Math.round(window.scrollY)} px / ${window.innerWidth}×${window.innerHeight}${vv ? ` (visual ${Math.round(vv.height)})` : ""}`],
        ["Device", `dpr ${window.devicePixelRatio}, ${nav.hardwareConcurrency ?? "?"} cores, ${nav.deviceMemory ?? "?"} GB, touch ${navigator.maxTouchPoints}`],
      ]);
    };
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 500);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  if (!lines.length) return null;
  return (
    <aside
      data-debug-panel
      aria-label="Debug"
      style={{
        position: "fixed",
        zIndex: 100,
        left: 8,
        top: 80,
        maxWidth: "min(360px, calc(100vw - 16px))",
        padding: "8px 10px",
        borderRadius: 8,
        background: "rgb(0 0 0 / 0.86)",
        border: "1px solid rgb(255 255 255 / 0.25)",
        color: "#e6f0ff",
        font: "11px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        pointerEvents: "none",
      }}
    >
      <strong style={{ color: "#5fd0ff" }}>debug=1</strong>
      {lines.map(([k, v]) => (
        <div key={k}>
          <span style={{ color: "#8f9aa6" }}>{k}: </span>
          {v}
        </div>
      ))}
    </aside>
  );
}
