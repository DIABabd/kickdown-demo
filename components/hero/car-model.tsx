"use client";

import { useMemo, type RefObject } from "react";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  ARCH,
  BODY,
  BODY_OUTLINE,
  BODY_SIDE_Z,
  CABIN,
  CABIN_OUTLINE,
  CABIN_SIDE_Z,
  LIGHTS,
  ROOF_RAIL,
  SHOULDER_LINE,
  WHEEL,
  WINDOW_LINE,
  type Pt,
} from "./car-profile";

/* Colours from DESIGN.md (2.1). */
export const KD_BLAU = "#009CDC";
const LAPIS = "#1D4FA6";
const TAIL_RED = "#ff2b2e";

/* ------------------------------------------------------------------ */
/* Geometry helpers                                                    */
/* ------------------------------------------------------------------ */

function extrude(outline: readonly Pt[], depth: number, bevel: number) {
  const shape = new THREE.Shape(outline.map(([x, y]) => new THREE.Vector2(x, y)));
  const raw = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 5,
    curveSegments: 1,
  });
  raw.translate(0, 0, -depth / 2);
  // Merge shared vertices so the bevel shades smoothly (sculpted look).
  raw.deleteAttribute("normal");
  raw.deleteAttribute("uv");
  const smooth = mergeVertices(raw, 1e-4);
  smooth.computeVertexNormals();
  raw.dispose();
  return smooth;
}

function tube(pts: readonly Pt[], z: number, radius: number, closed = false) {
  const curve = new THREE.CatmullRomCurve3(
    pts.map(([x, y]) => new THREE.Vector3(x, y, z)),
    closed,
    "centripetal",
  );
  return new THREE.TubeGeometry(curve, pts.length * 3, radius, 8, closed);
}

/* ------------------------------------------------------------------ */
/* Light line: bright core + two soft additive halos (fake bloom)      */
/* ------------------------------------------------------------------ */

type LineMats = {
  core: THREE.Material;
  halo: THREE.Material;
  haze: THREE.Material;
};

function LightLine({
  pts,
  z,
  closed,
  mats,
}: {
  pts: readonly Pt[];
  z: number;
  closed?: boolean;
  mats: LineMats;
}) {
  const geos = useMemo(
    () => [
      tube(pts, z, 0.009, closed),
      tube(pts, z, 0.018, closed),
      tube(pts, z, 0.04, closed),
    ],
    [pts, z, closed],
  );
  return (
    <group>
      <mesh geometry={geos[0]} material={mats.core} />
      <mesh geometry={geos[1]} material={mats.halo} />
      <mesh geometry={geos[2]} material={mats.haze} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Wheel                                                               */
/* ------------------------------------------------------------------ */

function Wheel({
  x,
  side,
  mats,
}: {
  x: number;
  side: 1 | -1;
  mats: {
    tyre: THREE.Material;
    rim: THREE.Material;
    ring: THREE.Material;
  };
}) {
  const geos = useMemo(() => {
    const tyre = new THREE.CylinderGeometry(WHEEL.r, WHEEL.r, WHEEL.width, 48, 1);
    tyre.rotateX(Math.PI / 2);
    const rim = new THREE.CylinderGeometry(WHEEL.rimR, WHEEL.rimR * 0.92, 0.03, 40, 1);
    rim.rotateX(Math.PI / 2);
    const spoke = new THREE.BoxGeometry(0.05, WHEEL.rimR * 0.95, 0.025);
    spoke.translate(0, WHEEL.rimR * 0.45, 0);
    const ring = new THREE.TorusGeometry(WHEEL.rimR + 0.004, 0.006, 6, 64);
    return { tyre, rim, spoke, ring };
  }, []);

  const z = side * (BODY_SIDE_Z - WHEEL.width / 2 - 0.01);
  const face = side * (WHEEL.width / 2 + 0.006);

  return (
    <group position={[x, WHEEL.y, z]}>
      <mesh geometry={geos.tyre} material={mats.tyre} />
      <group position={[0, 0, face]}>
        <mesh geometry={geos.rim} material={mats.tyre} />
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            geometry={geos.spoke}
            material={mats.rim}
            rotation={[0, 0, (i * Math.PI * 2) / 5]}
            position={[0, 0, side * 0.016]}
          />
        ))}
        <mesh geometry={geos.ring} material={mats.ring} position={[0, 0, side * 0.018]} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* The car                                                             */
/* ------------------------------------------------------------------ */

export function CarModel({
  headTarget,
}: {
  /** Object the headlight spots aim at (lives inside the car group). */
  headTarget: RefObject<THREE.Object3D | null>;
}) {
  const geo = useMemo(() => {
    const body = extrude(BODY_OUTLINE, BODY.depth, BODY.bevel);
    const cabin = extrude(CABIN_OUTLINE, CABIN.depth, CABIN.bevel);

    const archTrim = new THREE.TorusGeometry(ARCH.r, 0.045, 8, 40, ARCH.end - ARCH.start);
    archTrim.rotateZ(ARCH.start);

    return {
      body,
      cabin,
      archTrim,
      rocker: new THREE.BoxGeometry(1.62, 0.11, 0.04),
      mirror: new THREE.BoxGeometry(0.16, 0.08, 0.12),
      headLamp: new THREE.BoxGeometry(0.03, 0.045, 0.36),
      headBar: new THREE.BoxGeometry(0.02, 0.01, 0.82),
      grille: new THREE.BoxGeometry(0.04, 0.14, 1.06),
      tailBar: new THREE.BoxGeometry(0.03, 0.04, 1.46),
      plate: new THREE.BoxGeometry(0.02, 0.11, 0.46),
    };
  }, []);

  const mats = useMemo(() => {
    const additive = (color: string, opacity: number) =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      });

    return {
      paint: new THREE.MeshPhysicalMaterial({
        color: LAPIS,
        metalness: 0.35,
        roughness: 0.3,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#04070c",
        metalness: 0.6,
        roughness: 0.06,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
      }),
      trim: new THREE.MeshStandardMaterial({ color: "#0b0f14", roughness: 0.7, metalness: 0.1 }),
      gloss: new THREE.MeshStandardMaterial({ color: "#06090d", roughness: 0.18, metalness: 0.5 }),
      tyre: new THREE.MeshStandardMaterial({ color: "#0a0c0f", roughness: 0.85 }),
      rim: new THREE.MeshStandardMaterial({ color: "#6b7a8c", roughness: 0.35, metalness: 0.7 }),
      plate: new THREE.MeshStandardMaterial({ color: "#2a3440", roughness: 0.6 }),
      blue: {
        core: new THREE.MeshBasicMaterial({ color: "#7fdcff", toneMapped: false }),
        halo: additive(KD_BLAU, 0.28),
        haze: additive(KD_BLAU, 0.07),
      } satisfies LineMats,
      ring: new THREE.MeshBasicMaterial({ color: "#4cc8ff", toneMapped: false }),
      head: new THREE.MeshBasicMaterial({ color: "#f2f8ff", toneMapped: false }),
      tail: new THREE.MeshBasicMaterial({ color: TAIL_RED, toneMapped: false }),
    };
  }, []);

  const wheelMats = { tyre: mats.tyre, rim: mats.rim, ring: mats.ring };
  const sides = [1, -1] as const;

  return (
    <group>
      {/* Sculpted body and glasshouse */}
      <mesh geometry={geo.body} material={mats.paint} />
      <mesh geometry={geo.cabin} material={mats.glass} />

      {sides.map((s) => (
        <group key={s}>
          {/* Kickdown-blue light outlines */}
          <LightLine pts={WINDOW_LINE} z={s * (CABIN_SIDE_Z + 0.004)} closed mats={mats.blue} />
          <LightLine pts={SHOULDER_LINE} z={s * (BODY_SIDE_Z + 0.004)} mats={mats.blue} />
          <LightLine pts={ROOF_RAIL} z={s * 0.6} mats={mats.blue} />

          {/* Dark SUV cladding around the arches and along the sill */}
          <mesh geometry={geo.archTrim} material={mats.trim} position={[WHEEL.x, WHEEL.y, s * BODY_SIDE_Z]} />
          <mesh geometry={geo.archTrim} material={mats.trim} position={[-WHEEL.x, WHEEL.y, s * BODY_SIDE_Z]} />
          <mesh geometry={geo.rocker} material={mats.trim} position={[0, 0.34, s * BODY_SIDE_Z]} />

          {/* Mirrors */}
          <mesh geometry={geo.mirror} material={mats.gloss} position={[0.66, 1.22, s * (BODY_SIDE_Z + 0.02)]} />

          {/* Headlamps (front corners) */}
          <mesh geometry={geo.headLamp} material={mats.head} position={[LIGHTS.head.x, LIGHTS.head.y, s * 0.6]} />

          {/* Wheels */}
          <Wheel x={WHEEL.x} side={s} mats={wheelMats} />
          <Wheel x={-WHEEL.x} side={s} mats={wheelMats} />
        </group>
      ))}

      {/* Front: thin blue light bar between the headlamps, plain dark intake (no badge) */}
      <mesh geometry={geo.headBar} material={mats.blue.core} position={[LIGHTS.head.x + 0.006, LIGHTS.head.y - 0.01, 0]} />
      <mesh geometry={geo.grille} material={mats.gloss} position={[2.225, 0.5, 0]} />

      {/* Rear: full-width taillight and a blank plate */}
      <mesh geometry={geo.tailBar} material={mats.tail} position={[LIGHTS.tail.x, LIGHTS.tail.y, 0]} />
      <mesh geometry={geo.plate} material={mats.plate} position={[-2.185, 0.6, 0]} />

      {/* Lights that actually illuminate the road */}
      <object3D ref={headTarget} position={[7, 0, 0]} />
    </group>
  );
}
