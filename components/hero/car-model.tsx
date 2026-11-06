"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  ARCH,
  BODY,
  BODY_OUTLINE,
  BODY_SIDE_Z,
  CABIN,
  CABIN_OUTLINE,
  LIGHTS,
  ROOF_RAIL,
  WHEEL,
  type Pt,
} from "./car-profile";
import { DoorDecals, Plates } from "./car-livery";

/* Colours from DESIGN.md (2.1). */
export const KD_BLAU = "#009CDC";
/** Deep metallic lapis – the fleet blue, one step darker for a premium finish. */
const PAINT = "#163a78";

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

/** Half length of the car (m), used for the plan-view taper. */
const HALF_LEN = 2.25;
const smooth01 = (v: number) => {
  const t = Math.min(1, Math.max(0, v));
  return t * t * (3 - 2 * t);
};

/**
 * Sculpts an extruded side profile so it stops looking like a box:
 * - plan-view taper: nose and tail get narrower (rounded corners from above)
 * - tumblehome: the upper body leans inward above the shoulder
 * Only z is scaled, so the side profile (and everything placed on it) stays.
 */
function sculpt(geo: THREE.BufferGeometry, opts: { nose: number; tail: number; shoulderY: number; lean: number; leanSpan: number }) {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const t = Math.abs(x) / HALF_LEN;
    const end = x > 0 ? opts.nose : opts.tail;
    const plan = 1 - end * Math.pow(smooth01((t - 0.55) / 0.45), 1.6);
    const lean = 1 - opts.lean * smooth01((y - opts.shoulderY) / opts.leanSpan);
    pos.setZ(i, pos.getZ(i) * plan * lean);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
}

function extrude(outline: readonly Pt[], depth: number, bevel: number) {
  const shape = new THREE.Shape(outline.map(([x, y]) => new THREE.Vector2(x, y)));
  const raw = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 10,
    curveSegments: 1,
    steps: 6, // extra rings along the width so the taper bends smoothly
  });
  raw.translate(0, 0, -depth / 2);
  // Merge shared vertices so the bevel shades smoothly (sculpted look).
  raw.deleteAttribute("normal");
  raw.deleteAttribute("uv");
  const merged = mergeVertices(raw, 1e-4);
  raw.dispose();
  return merged;
}

/** Tyre with a rounded cross-section (sidewall + tread), axis along z. */
function tyreGeometry() {
  const r = WHEEL.r;
  const inner = WHEEL.rimR + 0.035;
  const half = WHEEL.width / 2;
  const round = 0.05;
  // Cross-section (x = radius, y = position across the tread): sidewall out,
  // rounded shoulder, flat tread, rounded shoulder, sidewall back in.
  const pts: THREE.Vector2[] = [new THREE.Vector2(inner, -half + 0.015)];
  for (let i = 0; i <= 8; i++) {
    const a = -Math.PI / 2 + (i / 8) * (Math.PI / 2); // -90° → 0°
    pts.push(new THREE.Vector2(r - round + Math.cos(a) * round, -half + round + Math.sin(a) * round));
  }
  for (let i = 0; i <= 8; i++) {
    const a = (i / 8) * (Math.PI / 2); // 0° → 90°
    pts.push(new THREE.Vector2(r - round + Math.cos(a) * round, half - round + Math.sin(a) * round));
  }
  pts.push(new THREE.Vector2(inner, half - 0.015));
  const g = new THREE.LatheGeometry(pts, 64);
  g.rotateX(Math.PI / 2);
  return g;
}

/* ------------------------------------------------------------------ */
/* Wheel: rounded tyre, ten-spoke graphite rim, brake disc             */
/* ------------------------------------------------------------------ */

type WheelMats = { tyre: THREE.Material; rim: THREE.Material; disc: THREE.Material; hub: THREE.Material };

function Wheel({ x, side, mats, geos }: { x: number; side: 1 | -1; mats: WheelMats; geos: ReturnType<typeof wheelGeometries> }) {
  const z = side * (BODY_SIDE_Z - WHEEL.width / 2 - 0.02);
  const face = side * (WHEEL.width / 2 - 0.012);
  return (
    <group position={[x, WHEEL.y, z]}>
      {/* the spokes turn with the car's travel (see CarModel) */}
      <group name="wheelSpin">
      <mesh geometry={geos.tyre} material={mats.tyre} />
      <mesh geometry={geos.disc} material={mats.disc} position={[0, 0, side * -0.02]} />
      <group position={[0, 0, face]}>
        <mesh geometry={geos.barrel} material={mats.hub} />
        <mesh geometry={geos.lip} material={mats.rim} position={[0, 0, side * 0.012]} />
        {Array.from({ length: 10 }, (_, i) => (
          <mesh
            key={i}
            geometry={geos.spoke}
            material={mats.rim}
            rotation={[0, 0, (i * Math.PI * 2) / 10]}
            position={[0, 0, side * 0.012]}
          />
        ))}
        <mesh geometry={geos.cap} material={mats.rim} position={[0, 0, side * 0.018]} />
      </group>
      </group>
    </group>
  );
}

function wheelGeometries() {
  const barrel = new THREE.CylinderGeometry(WHEEL.rimR + 0.03, WHEEL.rimR + 0.03, 0.05, 48, 1, true);
  barrel.rotateX(Math.PI / 2);
  const lip = new THREE.TorusGeometry(WHEEL.rimR + 0.02, 0.014, 8, 64);
  const spoke = new THREE.BoxGeometry(0.036, WHEEL.rimR * 0.84, 0.022);
  spoke.translate(0, WHEEL.rimR * 0.5, 0);
  const cap = new THREE.CylinderGeometry(0.045, 0.05, 0.02, 24);
  cap.rotateX(Math.PI / 2);
  const disc = new THREE.CylinderGeometry(WHEEL.rimR - 0.03, WHEEL.rimR - 0.03, 0.02, 40);
  disc.rotateX(Math.PI / 2);
  return { tyre: tyreGeometry(), barrel, lip, spoke, cap, disc };
}

/* ------------------------------------------------------------------ */
/* The car                                                             */
/* ------------------------------------------------------------------ */

export function CarModel({
  headTarget,
  travelRef,
}: {
  /** Object the headlight spots aim at (lives inside the car group). */
  headTarget: RefObject<THREE.Object3D | null>;
  /** Distance rolled (m): the wheels turn by travel / radius. */
  travelRef?: RefObject<number>;
}) {
  const root = useRef<THREE.Group>(null);
  const spinners = useRef<THREE.Object3D[] | null>(null);
  useFrame(() => {
    if (!travelRef || !root.current) return;
    if (!spinners.current) {
      const found: THREE.Object3D[] = [];
      root.current.traverse((o) => {
        if (o.name === "wheelSpin") found.push(o);
      });
      spinners.current = found;
    }
    const a = -travelRef.current / WHEEL.r;
    for (const w of spinners.current) w.rotation.z = a;
  });
  const geo = useMemo(() => {
    const body = extrude(BODY_OUTLINE, BODY.depth, BODY.bevel);
    sculpt(body, { nose: 0.2, tail: 0.14, shoulderY: 0.98, lean: 0.07, leanSpan: 0.22 });
    const cabin = extrude(CABIN_OUTLINE, CABIN.depth, CABIN.bevel);
    sculpt(cabin, { nose: 0.3, tail: 0.18, shoulderY: 1.12, lean: 0.14, leanSpan: 0.45 });

    const archTrim = new THREE.TorusGeometry(ARCH.r - 0.01, 0.03, 8, 48, ARCH.end - ARCH.start);
    archTrim.rotateZ(ARCH.start);

    const rail = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(ROOF_RAIL.map(([x, y]) => new THREE.Vector3(x, y - 0.03, 0))),
      24,
      0.014,
      8,
    );

    return {
      body,
      cabin,
      archTrim,
      rail,
      rocker: new THREE.BoxGeometry(1.5, 0.07, 0.03),
      mirror: new THREE.SphereGeometry(0.08, 24, 16),
      headHousing: new THREE.BoxGeometry(0.03, 0.07, 0.3),
      headLed: new THREE.BoxGeometry(0.012, 0.014, 0.26),
      intake: new THREE.BoxGeometry(0.03, 0.12, 0.96),
      tailLens: new THREE.BoxGeometry(0.02, 0.05, 1.24),
      tailLed: new THREE.BoxGeometry(0.012, 0.012, 1.2),
      wheel: wheelGeometries(),
    };
  }, []);

  const mats = useMemo(
    () => ({
      // Deep metallic paint under a hard clear coat.
      paint: new THREE.MeshPhysicalMaterial({
        color: PAINT,
        metalness: 0.8,
        roughness: 0.34,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.15,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#05080d",
        metalness: 0.4,
        roughness: 0.03,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        envMapIntensity: 1.3,
      }),
      satin: new THREE.MeshStandardMaterial({ color: "#0b0e12", roughness: 0.45, metalness: 0.3 }),
      gloss: new THREE.MeshPhysicalMaterial({ color: "#07090c", roughness: 0.12, metalness: 0.4, clearcoat: 1 }),
      wheel: {
        tyre: new THREE.MeshStandardMaterial({ color: "#121417", roughness: 0.92, metalness: 0, side: THREE.DoubleSide }),
        rim: new THREE.MeshStandardMaterial({ color: "#aab3bd", roughness: 0.32, metalness: 0.85, envMapIntensity: 1.4 }),
        hub: new THREE.MeshStandardMaterial({ color: "#16191d", roughness: 0.5, metalness: 0.6, side: THREE.DoubleSide }),
        disc: new THREE.MeshStandardMaterial({ color: "#3a3f45", roughness: 0.4, metalness: 0.9 }),
      } satisfies WheelMats,
      led: new THREE.MeshBasicMaterial({ color: "#eef5ff", toneMapped: false }),
      tailLens: new THREE.MeshPhysicalMaterial({ color: "#3a0507", roughness: 0.08, metalness: 0.2, clearcoat: 1 }),
      tailLed: new THREE.MeshBasicMaterial({ color: "#ff3236", toneMapped: false }),
    }),
    [],
  );

  const sides = [1, -1] as const;

  return (
    <group ref={root}>
      {/* Sculpted body and glasshouse */}
      <mesh geometry={geo.body} material={mats.paint}>
        {/* Kickdown logo + red/white graphic, printed onto the door paint */}
        <DoorDecals />
      </mesh>
      <mesh geometry={geo.cabin} material={mats.glass} />

      {sides.map((s) => (
        <group key={s}>
          {/* Satin-black roof rails (no glow) */}
          <mesh geometry={geo.rail} material={mats.satin} position={[0, 0, s * 0.56]} />

          {/* Slim dark cladding around the arches and along the sill */}
          <mesh geometry={geo.archTrim} material={mats.satin} position={[WHEEL.x, WHEEL.y, s * (BODY_SIDE_Z - 0.01)]} />
          <mesh geometry={geo.archTrim} material={mats.satin} position={[-WHEEL.x, WHEEL.y, s * (BODY_SIDE_Z - 0.01)]} />
          <mesh geometry={geo.rocker} material={mats.satin} position={[0, 0.34, s * (BODY_SIDE_Z - 0.005)]} />

          {/* Mirrors: gloss-black teardrops */}
          <mesh
            geometry={geo.mirror}
            material={mats.gloss}
            position={[0.68, 1.2, s * (BODY_SIDE_Z - 0.02)]}
            scale={[1.1, 0.55, 0.75]}
          />

          {/* Headlights: dark housing with a slim LED strip */}
          <mesh geometry={geo.headHousing} material={mats.gloss} position={[LIGHTS.head.x - 0.012, LIGHTS.head.y, s * 0.46]} />
          <mesh geometry={geo.headLed} material={mats.led} position={[LIGHTS.head.x + 0.006, LIGHTS.head.y + 0.012, s * 0.46]} />

          {/* Wheels */}
          <Wheel x={WHEEL.x} side={s} mats={mats.wheel} geos={geo.wheel} />
          <Wheel x={-WHEEL.x} side={s} mats={mats.wheel} geos={geo.wheel} />
        </group>
      ))}

      {/* Front: plain dark intake – no badge, no brand */}
      <mesh geometry={geo.intake} material={mats.gloss} position={[2.222, 0.5, 0]} />

      {/* Rear: dark red lens with a thin light line */}
      <mesh geometry={geo.tailLens} material={mats.tailLens} position={[LIGHTS.tail.x + 0.004, LIGHTS.tail.y, 0]} />
      <mesh geometry={geo.tailLed} material={mats.tailLed} position={[LIGHTS.tail.x - 0.008, LIGHTS.tail.y, 0]} />

      {/* Blank number plates, no registration */}
      <Plates />

      {/* Lights that actually illuminate the floor */}
      <object3D ref={headTarget} position={[7, 0, 0]} />
    </group>
  );
}
