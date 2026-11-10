"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
} from "react";
import * as THREE from "three";
import { debugInfo } from "@/components/site/debug-info";
import { CarModel, KD_BLAU } from "./car-model";
import { INTRO_ANGLE, REST_ANGLE } from "./car-profile";
import styles from "./hero.module.css";

/* ------------------------------------------------------------------ */
/* Shared, mutable control state (lives in a ref, read in useFrame)    */
/* ------------------------------------------------------------------ */

type Mode = "intro" | "drag" | "free" | "target";

type Control = {
  mode: Mode;
  angle: number;
  /** Spin velocity (rad/s) used for inertia after a drag. */
  vel: number;
  /** Angle we ease toward in "target" mode (keys, Home). */
  target: number;
  /** Intro clock (s). */
  t: number;
  /** Intro: the car drives in along x (m, 0 = in place). */
  x: number;
  /** Distance the car has rolled (m) – turns the wheels. */
  travel: number;
  /** Environment rotation (rad): the reflections sweep across the paint in the intro. */
  env: number;
  /** Body roll spring – the car leans a little when it turns. */
  roll: number;
  rollVel: number;
  prevAngle: number;
  /**
   * Reduced motion: the 3D car is shown and can be turned by the visitor,
   * but nothing moves by itself (no intro, no spin, no float, no coasting,
   * no body lean). Scrolling never moves the car – it stays in place.
   */
  calm: boolean;
  /** Pause/play button: stops the idle spin and float (drag still works). */
  paused: boolean;
  /** Clock for the idle float (s). */
  clock: number;
  /** Current float offset (m). */
  float: number;
};

const INTRO = {
  /** Drive-in distance (m) and duration (s). */
  driveFrom: -11,
  driveDur: 1.7,
  /** Turn into the three-quarter view. */
  turnStart: 1.2,
  turnDur: 1.3,
  /** Light sweep across the paint (environment rotation). */
  sweepFrom: -2.4,
  sweepStart: 0.15,
  sweepDur: 2.4,
  end: 2.6,
} as const;

function createControl(calm: boolean): Control {
  return {
    mode: calm ? "free" : "intro",
    angle: calm ? REST_ANGLE : INTRO_ANGLE,
    vel: 0,
    target: REST_ANGLE,
    t: calm ? INTRO.end : 0,
    x: calm ? 0 : INTRO.driveFrom,
    travel: 0,
    env: calm ? 0 : INTRO.sweepFrom,
    roll: 0,
    rollVel: 0,
    prevAngle: calm ? REST_ANGLE : INTRO_ANGLE,
    calm,
    paused: false,
    clock: 0,
    float: 0,
  };
}

/** Put a running intro straight into its end pose (reduced motion turned on). */
function settle(c: Control) {
  if (c.mode === "intro" || c.mode === "target") {
    c.angle = c.mode === "target" ? c.target : REST_ANGLE;
    c.mode = "free";
  }
  c.t = INTRO.end;
  c.x = 0;
  c.env = 0;
  c.vel = 0;
  c.roll = 0;
  c.rollVel = 0;
  c.prevAngle = c.angle;
}

const TAU = Math.PI * 2;
/** Nearest copy of `rest` (rest + n·2π) to `angle`, so the car never spins back a full turn. */
const nearest = (angle: number, rest: number) => rest + Math.round((angle - rest) / TAU) * TAU;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const KEY_STEP = Math.PI / 12; // 15°
const DRAG_SPEED = 0.0085; // rad per CSS px
/** Steady idle turn (rad/s). A drag only interrupts it, never stops it. */
const AUTO_SPIN_VEL = -0.15;

/**
 * Frame-rate probe – it only ever makes rendering lighter, it never
 * replaces the 3D car with the still. Warm-up frames are skipped (first
 * shader compiles can take a while), then 1 s is measured; below
 * STEP_DOWN_FPS the pixel ratio drops to 1.
 */
const PROBE = {
  warmupFrames: 20,
  windowMs: 1000,
  stepDownFps: 40,
} as const;

/* ------------------------------------------------------------------ */
/* Canvas-generated textures (no downloads)                            */
/* ------------------------------------------------------------------ */

function radialTexture(stops: [number, string][], size = 256) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [o, col] of stops) grad.addColorStop(o, col);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Rounded rectangle path (CanvasRenderingContext2D.roundRect needs iOS 16+). */
function roundedRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  g.moveTo(x + rr, y);
  g.arcTo(x + w, y, x + w, y + h, rr);
  g.arcTo(x + w, y + h, x, y + h, rr);
  g.arcTo(x, y + h, x, y, rr);
  g.arcTo(x, y, x + w, y, rr);
  g.closePath();
}

/**
 * Soft, car-shaped ground shadow (drawn once, no downloads): a wide ambient
 * shade plus darker contact patches under the four tyres. Turns with the car.
 */
function shadowTexture() {
  const W = 512;
  const H = 256;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  // Blur via shadowBlur of an off-canvas shape – works in every browser.
  const blob = (x: number, y: number, w: number, h: number, r: number, alpha: number, blur: number) => {
    g.save();
    g.shadowColor = `rgba(0,0,0,${alpha})`;
    g.shadowBlur = blur;
    g.shadowOffsetX = W * 2;
    g.fillStyle = "#000";
    g.beginPath();
    roundedRect(g, x - W * 2, y, w, h, r);
    g.fill();
    g.restore();
  };
  blob(56, 70, 400, 116, 58, 0.6, 46); // body footprint
  blob(110, 92, 292, 72, 36, 0.55, 20); // core under the floor pan
  for (const x of [118, 362]) for (const y of [66, 164]) blob(x - 18, y - 13, 36, 26, 12, 0.9, 10); // tyres
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ------------------------------------------------------------------ */
/* Camera framing – a big car, placed per layout                       */
/* ------------------------------------------------------------------ */

/** Side-view length incl. a little air, and height (m). */
const CAR_W = 4.9;
const CAR_H = 1.75;

/**
 * The canvas covers the whole hero. Desktop (≥ 1024 px): the car fills about
 * half the width, centred right of the middle, so the text column on the
 * left stays clear. Phones/tablets: the car spans almost the full width in
 * the upper part, the text sits below it. A view offset moves the car on
 * screen without moving the camera (perspective stays the same).
 */
function Framing() {
  const size = useThree((s) => s.size);
  const get = useThree((s) => s.get);

  useEffect(() => {
    const { camera, invalidate } = get();
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const wide = size.width >= 1024;
    const layout = wide
      ? { fill: size.width >= 1600 ? 0.47 : 0.5, vfill: 0.54, cx: 0.68, cy: 0.46 }
      : { fill: 0.92, vfill: 0.3, cx: 0.5, cy: size.width >= 640 ? 0.37 : 0.34 };
    const aspect = size.width / Math.max(1, size.height);
    const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const tanH = tanV * aspect;
    const dist = clamp(Math.max(CAR_W / (2 * layout.fill * tanH), CAR_H / (2 * layout.vfill * tanV)), 6, 26);
    const elev = THREE.MathUtils.degToRad(9);
    camera.position.set(0, 0.72 + dist * Math.sin(elev), dist * Math.cos(elev));
    camera.lookAt(0, 0.72, 0);
    camera.setViewOffset(
      size.width,
      size.height,
      (0.5 - layout.cx) * size.width,
      (0.5 - layout.cy) * size.height,
      size.width,
      size.height,
    );
    camera.updateProjectionMatrix();
    invalidate();
  }, [size, get]);

  return null;
}

/* ------------------------------------------------------------------ */
/* Floor: only a soft light pool – the canvas itself is transparent    */
/* ------------------------------------------------------------------ */

function LightPool() {
  const pool = useMemo(
    () =>
      radialTexture([
        [0, "rgba(120,150,195,0.22)"],
        [0.4, "rgba(70,100,150,0.09)"],
        [1, "rgba(30,50,90,0)"],
      ]),
    [],
  );
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} scale={[1, 0.62, 1]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial map={pool} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Animated car rig                                                    */
/* ------------------------------------------------------------------ */

function Rig({
  ctrlRef,
  forced,
  inViewRef,
  onReady,
  onSettledAngle,
}: {
  ctrlRef: RefObject<Control>;
  forced: boolean;
  inViewRef: RefObject<boolean>;
  onReady: () => void;
  onSettledAngle: (deg: number) => void;
}) {
  const car = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const headTarget = useRef<THREE.Object3D>(null);
  const travel = useRef(0);
  const shadow = useMemo(() => shadowTexture(), []);
  const probe = useRef({ frames: 0, first: 0, start: 0, steppedDown: false, done: forced, readySent: false });

  useFrame((state, rawDt) => {
    const c = ctrlRef.current;
    const dt = Math.min(rawDt, 1 / 20);
    let busy = false;
    const xBefore = c.x;

    /* --- intro: drive in from the left, light sweeps over the paint, turn into 3/4 --- */
    if (c.mode === "intro") {
      c.t += dt;
      const drive = clamp(c.t / INTRO.driveDur, 0, 1);
      c.x = INTRO.driveFrom * (1 - easeOutCubic(drive));
      const turn = clamp((c.t - INTRO.turnStart) / INTRO.turnDur, 0, 1);
      c.angle = INTRO_ANGLE + (REST_ANGLE - INTRO_ANGLE) * easeInOut(turn);
      const sweep = clamp((c.t - INTRO.sweepStart) / INTRO.sweepDur, 0, 1);
      c.env = INTRO.sweepFrom * (1 - easeOutCubic(sweep));
      if (c.t >= INTRO.end) {
        c.mode = "free";
        c.vel = 0;
        c.x = 0;
        c.env = 0;
      }
      busy = true;
    } else if (c.mode === "free") {
      if (c.calm) {
        c.vel = 0; // reduced motion: hold still until dragged again
      } else if (c.paused) {
        // Paused: come to a gentle stop and stay (dragging still works).
        c.vel *= Math.exp(-6 * dt);
        if (Math.abs(c.vel) > 0.002) {
          c.angle += c.vel * dt;
          busy = true;
        } else c.vel = 0;
      } else {
        // Ease whatever a drag left behind toward the steady idle spin.
        c.vel += (AUTO_SPIN_VEL - c.vel) * (1 - Math.exp(-2.2 * dt));
        c.angle += c.vel * dt;
        busy = true;
      }
    } else if (c.mode === "target") {
      const diff = c.target - c.angle;
      if (!c.calm && Math.abs(diff) > 0.0005) {
        c.angle += diff * (1 - Math.exp(-4.5 * dt));
        busy = true;
      } else {
        c.angle = c.target;
        c.mode = "free";
        onSettledAngle(c.angle);
      }
    } else if (c.mode === "drag") {
      busy = true;
    }

    // the wheels turn while the car drives in (intro only)
    travel.current += c.x - xBefore;
    const shown = c.angle;

    /* --- body roll spring: lean into the turn, then settle --- */
    const angVel = dt > 0 ? (shown - c.prevAngle) / dt : 0;
    c.prevAngle = shown;
    if (c.calm) {
      c.roll = 0;
      c.rollVel = 0;
    } else {
      const rollTarget = clamp(angVel * 0.016, -0.03, 0.03);
      c.rollVel += ((rollTarget - c.roll) * 90 - c.rollVel * 9) * dt;
      c.roll += c.rollVel * dt;
      if (Math.abs(c.roll - rollTarget) > 1e-4 || Math.abs(c.rollVel) > 1e-4) busy = true;
    }

    /* --- idle float: a very slight, slow rise and fall --- */
    const floating = !c.calm && !c.paused && c.mode !== "intro";
    if (floating) c.clock += dt;
    const floatTarget = floating ? Math.sin(c.clock * 0.9) * 0.012 : 0;
    c.float += (floatTarget - c.float) * (1 - Math.exp(-6 * dt));
    if (floating || Math.abs(c.float) > 1e-4) busy = true;

    /* --- apply --- */
    if (car.current) {
      car.current.rotation.y = shown;
      car.current.position.set(c.x, 0, 0);
    }
    if (body.current) {
      body.current.rotation.x = c.roll;
      body.current.position.y = c.float;
    }
    state.scene.environmentRotation.y = c.env;

    /* --- readiness + 1-second frame-rate probe --- */
    const p = probe.current;
    p.frames++;
    if (p.frames === 2 && !p.readySent) {
      p.readySent = true;
      onReady();
    }
    if (!p.done) {
      const now = performance.now();
      if (document.visibilityState === "hidden") {
        // Background tabs are throttled – measure again when visible.
        p.frames = 0;
        p.first = 0;
      } else if (p.first === 0) {
        p.first = now;
        p.frames = 1;
      } else if (p.frames < PROBE.warmupFrames) {
        // still warming up
      } else if (p.frames === PROBE.warmupFrames) {
        p.start = now;
      } else if (now - p.start >= PROBE.windowMs) {
        const fps = ((p.frames - PROBE.warmupFrames) * 1000) / (now - p.start);
        if (fps >= PROBE.stepDownFps) {
          p.done = true;
        } else {
          // Slow device: render fewer pixels – the car stays 3D.
          if (state.viewport.dpr > 1) state.setDpr(1);
          p.done = true;
        }
      }
      busy = true;
    }

    debugInfo.heroFrames++;
    debugInfo.heroDpr = state.viewport.dpr;
    if (busy && inViewRef.current) state.invalidate();
  });

  return (
    <>
      <LightPool />
      <group ref={car} rotation={[0, INTRO_ANGLE, 0]}>
        {/* Soft car-shaped ground shadow – turns and drives with the car */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]}>
          <planeGeometry args={[5.4, 2.7]} />
          <meshBasicMaterial map={shadow} transparent depthWrite={false} />
        </mesh>
        {/* Suspension pivot sits at axle height */}
        <group position={[0, 0.4, 0]}>
          <group ref={body}>
            <group position={[0, -0.4, 0]}>
              <CarModel headTarget={headTarget} travelRef={travel} />
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

export default function CarScene({
  forced,
  reducedMotion,
  paused,
  onReady,
  onContextLost,
}: {
  /** Skip the frame probe (`?hero3d=1`). */
  forced: boolean;
  /** prefers-reduced-motion: show the 3D car, but nothing moves by itself. */
  reducedMotion: boolean;
  /** Pause/play control (outside the canvas): stops the idle spin and float. */
  paused: boolean;
  onReady: () => void;
  /** The browser took the WebGL context away (true) or gave it back (false). */
  onContextLost: (lost: boolean) => void;
}) {
  const ctrl = useRef<Control>(createControl(reducedMotion));
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useRef(true);
  const invalidateRef = useRef<() => void>(() => {});
  const drag = useRef<{ id: number; x: number; t: number } | null>(null);

  const [used, setUsed] = useState(false);
  const [deg, setDeg] = useState(Math.round(THREE.MathUtils.radToDeg(-REST_ANGLE)));
  const [coarse] = useState(() => window.matchMedia("(pointer: coarse)").matches);
  // The canvas fills the hero: keep the pixel count reasonable.
  const [dpr] = useState<[number, number]>(() => (coarse ? [1, 1.5] : [1, 1.6]));
  const [frameloop, setFrameloop] = useState<"demand" | "never">("demand");

  // Pause rendering while the hero is off screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      setFrameloop(entry.isIntersecting ? "demand" : "never");
      if (entry.isIntersecting) invalidateRef.current();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    ctrl.current.paused = paused;
    invalidateRef.current();
  }, [paused]);

  // Reduced motion can be switched while the page is open.
  useEffect(() => {
    const c = ctrl.current;
    c.calm = reducedMotion;
    if (reducedMotion) settle(c);
    invalidateRef.current();
  }, [reducedMotion]);

  const reportAngle = (rad: number) => {
    const d = Math.round(THREE.MathUtils.radToDeg(-rad)) % 360;
    setDeg(d < 0 ? d + 360 : d);
  };

  const firstUse = () => {
    if (!used) setUsed(true);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, t: performance.now() };
    // Touch: don't capture yet – the browser may still decide this is a
    // vertical scroll (touch-action: pan-y) and send pointercancel.
    if (e.pointerType === "mouse") e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (dx === 0) return;
    const now = performance.now();
    const c = ctrl.current;
    if (c.mode !== "drag") {
      if (c.mode === "intro") settle(c); // a drag during the intro takes over at once
      c.mode = "drag";
      if (e.pointerType !== "mouse") e.currentTarget.setPointerCapture(e.pointerId);
      firstUse();
    }
    const dAngle = dx * DRAG_SPEED;
    c.angle += dAngle;
    const dt = Math.max(1, now - d.t) / 1000;
    c.vel = c.vel * 0.6 + (dAngle / dt) * 0.4;
    d.x = e.clientX;
    d.t = now;
    invalidateRef.current();
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    const c = ctrl.current;
    if (c.mode === "drag") {
      // No inertia if the pointer rested before release.
      if (performance.now() - d.t > 80) c.vel = 0;
      c.vel = clamp(c.vel, -9, 9);
      c.mode = "free";
      reportAngle(c.angle);
      invalidateRef.current();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const c = ctrl.current;
    let target: number | null = null;
    if (e.key === "ArrowLeft") target = (c.mode === "target" ? c.target : c.angle) - KEY_STEP;
    else if (e.key === "ArrowRight") target = (c.mode === "target" ? c.target : c.angle) + KEY_STEP;
    else if (e.key === "Home") target = nearest(c.angle, REST_ANGLE);
    if (target === null) return;
    e.preventDefault();
    if (c.mode === "intro") settle(c);
    c.vel = 0;
    c.target = target;
    c.mode = "target";
    reportAngle(target);
    firstUse();
    invalidateRef.current();
  };

  return (
    <div
      ref={wrap}
      className={styles.interactive}
      tabIndex={0}
      role="slider"
      aria-label="Auto drehen"
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={359}
      aria-valuenow={deg}
      aria-valuetext={`${deg}°`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={endDrag}
      onKeyDown={onKeyDown}
    >
      <Canvas
        className={styles.canvas}
        frameloop={frameloop}
        dpr={dpr}
        camera={{ fov: 28, near: 0.5, far: 80, position: [0, 3, 12] }}
        // Transparent: the huge "KICKDOWN" lettering behind it shows through.
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        onCreated={(state) => {
          invalidateRef.current = state.invalidate;
          state.gl.setClearColor(0x000000, 0);
          // preventDefault lets the browser restore the context; three.js then
          // rebuilds its GPU resources and the car comes back by itself.
          state.gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            debugInfo.contextLost = true;
            onContextLost(true);
          });
          state.gl.domElement.addEventListener("webglcontextrestored", () => {
            debugInfo.contextLost = false;
            onContextLost(false);
            state.invalidate();
          });
        }}
        aria-hidden="true"
      >
        <Framing />

        <hemisphereLight args={["#9fb4d4", "#05080c", 0.45]} />
        <directionalLight position={[3, 7, 4]} intensity={0.9} color="#ffffff" />
        <directionalLight position={[-5, 3, -4]} intensity={0.6} color="#9fc6ff" />

        {/* Local studio for clear-coat reflections – softboxes, nothing is downloaded.
            Rotating it in the intro sweeps the light across the paint. */}
        <Environment resolution={coarse ? 128 : 256} frames={1} environmentIntensity={1}>
          <Lightformer form="rect" intensity={2.4} color="#ffffff" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
          <Lightformer form="rect" intensity={3.4} color="#f4f7ff" position={[0, 2.4, 7]} scale={[14, 0.5, 1]} />
          <Lightformer form="rect" intensity={1.4} color="#f4f7ff" position={[0, 1.1, 7]} scale={[14, 0.18, 1]} />
          <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[7, 2, 2]} rotation-y={-Math.PI / 2.4} scale={[6, 1.2, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#cfe0ff" position={[-7, 2, -2]} rotation-y={Math.PI / 2} scale={[8, 1.2, 1]} />
          <Lightformer form="ring" intensity={0.8} color={KD_BLAU} position={[0, 3, -8]} scale={4} />
        </Environment>

        <Rig
          ctrlRef={ctrl}
          forced={forced}
          inViewRef={inView}
          onReady={onReady}
          onSettledAngle={reportAngle}
        />
      </Canvas>

      <p className={styles.hint} data-hidden={used || undefined} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {coarse ? "Wischen zum Drehen" : "Ziehen zum Drehen"}
      </p>
    </div>
  );
}
