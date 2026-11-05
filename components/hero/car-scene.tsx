"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshReflectorMaterial } from "@react-three/drei";
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
import { CarModel, KD_BLAU } from "./car-model";
import { INTRO_ANGLE, LIGHTS, REST_ANGLE } from "./car-profile";
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
  /** Angle we ease toward in "target" mode (keys, idle return). */
  target: number;
  /** Intro clock (s). */
  t: number;
  /** Headlight level 0 → 1. */
  lights: number;
  /** Body roll spring – the car leans a little when it turns. */
  roll: number;
  rollVel: number;
  prevAngle: number;
  /**
   * Reduced motion: the 3D car is still shown and can be turned by the
   * visitor, but nothing moves by itself (no intro, no coasting, no
   * automatic return, no body lean).
   */
  calm: boolean;
};

function createControl(calm: boolean): Control {
  return {
    mode: calm ? "free" : "intro",
    angle: calm ? REST_ANGLE : INTRO_ANGLE,
    vel: 0,
    target: REST_ANGLE,
    t: calm ? INTRO.lightsEnd : 0,
    lights: calm ? 1 : 0,
    roll: 0,
    rollVel: 0,
    prevAngle: calm ? REST_ANGLE : INTRO_ANGLE,
    calm,
  };
}

/** Put a running intro straight into its end pose (reduced motion turned on). */
function settle(c: Control) {
  if (c.mode === "intro" || c.mode === "target") {
    c.angle = c.mode === "target" ? c.target : REST_ANGLE;
    c.mode = "free";
  }
  c.t = INTRO.lightsEnd;
  c.lights = 1;
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

const INTRO = {
  lightsEnd: 0.6,
  turnStart: 0.15,
  turnDur: 1.2,
} as const;

const KEY_STEP = Math.PI / 12; // 15°
const DRAG_SPEED = 0.0085; // rad per CSS px
/** Steady idle turn (rad/s), same direction as the intro turn. The car
 * never just sits still – a drag only interrupts it, never stops it. */
const AUTO_SPIN_VEL = -0.15;

/**
 * Frame-rate probe. Warm-up frames are skipped (first shader compiles on
 * Windows/ANGLE can take seconds even on a good GPU), then 1 s is measured.
 * Below STEP_DOWN_FPS the pixel ratio drops to 1 and we measure again; only
 * below FALLBACK_FPS at pixel ratio 1 do we give up and show the still.
 */
const PROBE = {
  warmupFrames: 20,
  windowMs: 1000,
  stepDownFps: 40,
  fallbackFps: 24,
  /** Even the warm-up takes this long → the device really can't render it. */
  maxWarmupMs: 10000,
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

function asphaltTexture(size = 256) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const img = g.createImageData(size, size);
  // Deterministic grain, so every visit looks the same.
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 190 + rnd() * 65;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(36, 36);
  return tex;
}

/* ------------------------------------------------------------------ */
/* Camera framing – keeps the car and turntable in view at any aspect  */
/* ------------------------------------------------------------------ */

function Framing() {
  const size = useThree((s) => s.size);
  const get = useThree((s) => s.get);

  useEffect(() => {
    const { camera, invalidate } = get();
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const aspect = size.width / Math.max(1, size.height);
    const vHalf = THREE.MathUtils.degToRad(camera.fov / 2);
    const hHalf = Math.atan(Math.tan(vHalf) * aspect);
    // Half-widths (m) that must stay visible: car + most of the ring.
    const dist = clamp(Math.max(3.1 / Math.tan(hHalf), 1.7 / Math.tan(vHalf)), 8, 22);
    const elev = THREE.MathUtils.degToRad(11);
    camera.position.set(0, 0.62 + dist * Math.sin(elev), dist * Math.cos(elev));
    camera.lookAt(0, 0.62, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [size, get]);

  return null;
}

/* ------------------------------------------------------------------ */
/* Turntable stage                                                     */
/* ------------------------------------------------------------------ */

function Turntable({ spin }: { spin: RefObject<THREE.Group | null> }) {
  const tex = useMemo(
    () => ({
      ring: radialTexture([
        [0, "rgba(0,156,220,0)"],
        [0.8, "rgba(0,156,220,0)"],
        [0.9, "rgba(0,156,220,0.45)"],
        [0.94, "rgba(0,156,220,0.12)"],
        [1, "rgba(0,156,220,0)"],
      ]),
      backGlow: radialTexture([
        [0, "rgba(29,79,166,0.55)"],
        [0.5, "rgba(29,79,166,0.18)"],
        [1, "rgba(29,79,166,0)"],
      ]),
    }),
    [],
  );

  const ticks = useMemo(() => {
    const count = 72;
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.InstancedMesh(
      geo,
      new THREE.MeshBasicMaterial({ color: KD_BLAU, transparent: true, opacity: 0.55, toneMapped: false }),
      count,
    );
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * TAU;
      const long = i % 6 === 0;
      const len = long ? 0.18 : 0.07;
      const r = 2.62 - len / 2;
      q.setFromAxisAngle(up, -a);
      m.compose(
        new THREE.Vector3(Math.cos(a) * r, 0.004, Math.sin(a) * r),
        q,
        new THREE.Vector3(len, 0.004, long ? 0.016 : 0.01),
      );
      mesh.setMatrixAt(i, m);
    }
    return mesh;
  }, []);

  return (
    <group>
      {/* Glowing rim of the turntable */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <torusGeometry args={[2.75, 0.012, 6, 160]} />
        <meshBasicMaterial color="#5fd0ff" toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <planeGeometry args={[6.4, 6.4]} />
        <meshBasicMaterial
          map={tex.ring}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      {/* Tacho-like tick marks turn with the car */}
      <group ref={spin}>
        <primitive object={ticks} />
      </group>
      {/* Soft lapis glow behind the car */}
      <mesh position={[0, 1.4, -5]}>
        <planeGeometry args={[14, 7]} />
        <meshBasicMaterial
          map={tex.backGlow}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function WetFloor({ resolution }: { resolution: number }) {
  const rough = useMemo(() => asphaltTexture(), []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[60, 60]} />
      <MeshReflectorMaterial
        resolution={resolution}
        blur={[400, 120]}
        mixBlur={1}
        mixStrength={9}
        mixContrast={1}
        roughness={0.85}
        roughnessMap={rough}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.3}
        color="#111b26"
        metalness={0.4}
        mirror={0.6}
      />
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
  onSlow,
  onSettledAngle,
}: {
  ctrlRef: RefObject<Control>;
  forced: boolean;
  inViewRef: RefObject<boolean>;
  onReady: () => void;
  onSlow: (fps: number) => void;
  onSettledAngle: (deg: number) => void;
}) {
  const car = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const ticks = useRef<THREE.Group>(null);
  const headTarget = useRef<THREE.Object3D>(null);
  const headL = useRef<THREE.SpotLight>(null);
  const headR = useRef<THREE.SpotLight>(null);
  const tail = useRef<THREE.PointLight>(null);

  const shadow = useMemo(
    () =>
      radialTexture([
        [0, "rgba(0,0,0,0.85)"],
        [0.45, "rgba(0,0,0,0.55)"],
        [1, "rgba(0,0,0,0)"],
      ]),
    [],
  );

  // Spot lights need their target object wired once it exists.
  useEffect(() => {
    if (headTarget.current) {
      if (headL.current) headL.current.target = headTarget.current;
      if (headR.current) headR.current.target = headTarget.current;
    }
  }, []);

  const probe = useRef({ frames: 0, first: 0, start: 0, steppedDown: false, done: forced, readySent: false });

  useFrame((state, rawDt) => {
    const c = ctrlRef.current;
    const dt = Math.min(rawDt, 1 / 20);
    let busy = false;

    /* --- intro: headlights fade on, then the car turns into the 3/4 view --- */
    if (c.mode === "intro" || c.t < INTRO.lightsEnd) {
      c.t += dt;
      c.lights = easeOutCubic(clamp(c.t / INTRO.lightsEnd, 0, 1));
      busy = c.lights < 1;
    }
    if (c.mode === "intro") {
      const k = clamp((c.t - INTRO.turnStart) / INTRO.turnDur, 0, 1);
      c.angle = INTRO_ANGLE + (REST_ANGLE - INTRO_ANGLE) * easeOutCubic(k);
      if (k >= 1) {
        c.mode = "free";
        c.vel = 0;
      }
      busy = true;
    } else if (c.mode === "free") {
      if (c.calm) {
        // Reduced motion: hold still until dragged again – no auto-spin.
        c.vel = 0;
      } else {
        // Ease whatever a drag left behind (or 0, right after the intro)
        // toward the steady idle spin, so the car always keeps turning.
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

    /* --- body roll spring: lean into the turn, then settle --- */
    const angVel = dt > 0 ? (c.angle - c.prevAngle) / dt : 0;
    c.prevAngle = c.angle;
    if (c.calm) {
      c.roll = 0;
      c.rollVel = 0;
    } else {
      const rollTarget = clamp(angVel * 0.016, -0.03, 0.03);
      c.rollVel += ((rollTarget - c.roll) * 90 - c.rollVel * 9) * dt;
      c.roll += c.rollVel * dt;
      if (Math.abs(c.roll - rollTarget) > 1e-4 || Math.abs(c.rollVel) > 1e-4) busy = true;
    }

    /* --- apply --- */
    if (car.current) car.current.rotation.y = c.angle;
    if (ticks.current) ticks.current.rotation.y = c.angle;
    if (body.current) body.current.rotation.x = c.roll;
    const l = c.lights;
    if (headL.current) headL.current.intensity = 26 * l;
    if (headR.current) headR.current.intensity = 26 * l;
    if (tail.current) tail.current.intensity = 1.6 * l;

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
        if (now - p.first > PROBE.maxWarmupMs) {
          p.done = true;
          onSlow(((p.frames - 1) * 1000) / (now - p.first));
        }
      } else if (p.frames === PROBE.warmupFrames) {
        p.start = now;
      } else if (now - p.start >= PROBE.windowMs) {
        const fps = ((p.frames - PROBE.warmupFrames) * 1000) / (now - p.start);
        if (fps >= PROBE.stepDownFps) {
          p.done = true;
        } else if (!p.steppedDown && state.viewport.dpr > 1) {
          // Try a lighter setting before giving up.
          p.steppedDown = true;
          state.setDpr(1);
          p.frames = 0;
          p.first = 0;
        } else {
          p.done = true;
          if (fps < PROBE.fallbackFps) onSlow(fps);
        }
      }
      busy = true;
    }

    if (busy && inViewRef.current) state.invalidate();
  });

  return (
    <>
      <Turntable spin={ticks} />
      <group ref={car} rotation={[0, INTRO_ANGLE, 0]}>
        {/* Blob shadow turns with the car */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]}>
          <planeGeometry args={[5.6, 2.9]} />
          <meshBasicMaterial map={shadow} transparent depthWrite={false} />
        </mesh>
        {/* Suspension pivot sits at axle height */}
        <group position={[0, 0.4, 0]}>
          <group ref={body}>
            <group position={[0, -0.4, 0]}>
              <CarModel headTarget={headTarget} />
            </group>
          </group>
        </group>
        {[0.6, -0.6].map((z, i) => (
          <spotLight
            key={z}
            ref={i === 0 ? headL : headR}
            position={[LIGHTS.head.x + 0.1, LIGHTS.head.y, z]}
            angle={0.55}
            penumbra={0.9}
            distance={14}
            decay={1.6}
            intensity={0}
            color="#dbeeff"
          />
        ))}
        <pointLight
          ref={tail}
          position={[LIGHTS.tail.x - 0.25, LIGHTS.tail.y, 0]}
          distance={3}
          decay={2}
          intensity={0}
          color="#ff2b2e"
        />
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
  onReady,
  onFallback,
}: {
  /** Skip the frame probe (`?hero3d=1`). */
  forced: boolean;
  /** prefers-reduced-motion: show the 3D car, but nothing moves by itself. */
  reducedMotion: boolean;
  onReady: () => void;
  /** The scene can't run well here: show the still, with a reason. */
  onFallback: (reason: string) => void;
}) {
  const ctrl = useRef<Control>(createControl(reducedMotion));
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useRef(true);
  const invalidateRef = useRef<() => void>(() => {});
  const drag = useRef<{ id: number; x: number; t: number } | null>(null);

  const [used, setUsed] = useState(false);
  const [deg, setDeg] = useState(Math.round(THREE.MathUtils.radToDeg(-REST_ANGLE)));
  const [coarse] = useState(() => window.matchMedia("(pointer: coarse)").matches);
  const [dpr] = useState<[number, number]>(() => (coarse ? [1, 1.5] : [1, 2]));
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
        camera={{ fov: 28, near: 0.5, far: 60, position: [0, 3, 12] }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        onCreated={(state) => {
          invalidateRef.current = state.invalidate;
          state.gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            onFallback("WebGL context lost");
          });
        }}
        aria-hidden="true"
      >
        <color attach="background" args={["#0C1824"]} />
        <fog attach="fog" args={["#0C1824", 12, 30]} />
        <Framing />

        <hemisphereLight args={["#3a5f99", "#05080c", 0.9]} />
        <directionalLight position={[4, 6, 5]} intensity={0.5} color="#cfe3ff" />
        <pointLight position={[-4.5, 2.6, -3.5]} intensity={34} distance={14} color={KD_BLAU} />
        <pointLight position={[4.5, 2.2, -4]} intensity={18} distance={12} color="#1D4FA6" />

        {/* Local light studio for paint reflections – nothing is downloaded */}
        <Environment resolution={128} frames={1} environmentIntensity={1.6}>
          <Lightformer form="rect" intensity={2.2} color="#bcd8ff" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} />
          <Lightformer form="rect" intensity={4} color="#e8f3ff" position={[0, 2.2, 6]} scale={[12, 0.35, 1]} />
          <Lightformer form="rect" intensity={2} color="#cfe3ff" position={[6, 2, 4]} rotation-y={-Math.PI / 4} scale={[6, 0.4, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#e8f3ff" position={[0, 1.2, 6]} scale={[12, 0.15, 1]} />
          <Lightformer form="rect" intensity={2.5} color={KD_BLAU} position={[-6, 1.5, -2]} rotation-y={Math.PI / 2} scale={[8, 1.2, 1]} />
          <Lightformer form="rect" intensity={1.5} color="#1D4FA6" position={[6, 1.5, -2]} rotation-y={-Math.PI / 2} scale={[8, 1.2, 1]} />
        </Environment>

        <WetFloor resolution={coarse ? 512 : 1024} />
        <Rig
          ctrlRef={ctrl}
          forced={forced}
          inViewRef={inView}
          onReady={onReady}
          onSlow={(fps) => onFallback(`too slow (${Math.round(fps)} fps)`)}
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
