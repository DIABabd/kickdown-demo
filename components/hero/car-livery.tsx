"use client";

import { Decal } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Fragment, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import {
  BODY_SIDE_Z,
  DOOR_SIGN,
  LOGO_SIZE,
  LOGO_SRC,
  PLATE,
  RED_BAND,
  STRIPE_BOX,
  WHITE_STRIPE,
  type Pt,
} from "./car-profile";

/**
 * Kickdown livery for the hero car: door sign with the original logo,
 * red/white side graphic, blank plates.
 *
 * The door items are projected decals (drei <Decal>, i.e. DecalGeometry),
 * so they follow the actual body surface. They must be rendered as
 * children of the body mesh.
 */

const TACHO_RED = "#E63A3C"; // --tacho-rot
const SIDES = [1, -1] as const;

/* ------------------------------------------------------------------ */
/* Canvas textures (drawn locally, nothing downloaded)                 */
/* ------------------------------------------------------------------ */

function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Rounded rectangle path, drawn by hand (CanvasRenderingContext2D.roundRect needs iOS 16+). */
function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  g.beginPath();
  g.moveTo(x + rr, y);
  g.arcTo(x + w, y, x + w, y + h, rr);
  g.arcTo(x + w, y + h, x, y + h, rr);
  g.arcTo(x, y + h, x, y, rr);
  g.arcTo(x, y, x + w, y, rr);
  g.closePath();
}

/**
 * Red band + white pinstripe for one side. The decal for the left side
 * looks at the car from the other direction, so the drawing is flipped
 * there to keep the "leaning forward" shapes pointing to the front.
 */
function stripeTexture(frontOnRight: boolean) {
  const PX = 600; // pixels per metre
  const w = Math.round((STRIPE_BOX.x1 - STRIPE_BOX.x0) * PX);
  const h = Math.round((STRIPE_BOX.y1 - STRIPE_BOX.y0) * PX);
  const toCanvas = ([x, y]: Pt): [number, number] => {
    const u = (x - STRIPE_BOX.x0) / (STRIPE_BOX.x1 - STRIPE_BOX.x0);
    return [(frontOnRight ? u : 1 - u) * w, (1 - (y - STRIPE_BOX.y0) / (STRIPE_BOX.y1 - STRIPE_BOX.y0)) * h];
  };
  const poly = (g: CanvasRenderingContext2D, pts: Pt[], color: string) => {
    g.beginPath();
    pts.forEach((p, i) => {
      const [cx, cy] = toCanvas(p);
      if (i === 0) g.moveTo(cx, cy);
      else g.lineTo(cx, cy);
    });
    g.closePath();
    g.fillStyle = color;
    g.fill();
  };
  return canvasTexture(w, h, (g) => {
    poly(g, RED_BAND, TACHO_RED);
    poly(g, WHITE_STRIPE, "#ffffff");
  });
}

function plateTexture() {
  const PX = 1000;
  const w = Math.round(PLATE.w * PX);
  const h = Math.round(PLATE.h * PX);
  return canvasTexture(w, h, (g) => {
    roundRect(g, 3, 3, w - 6, h - 6, 10);
    g.fillStyle = "#f4f6f8";
    g.fill();
    g.lineWidth = 6;
    g.strokeStyle = "#121a22";
    g.stroke();
  });
}

/* ------------------------------------------------------------------ */
/* Original logo file → texture, kept sharp                            */
/* ------------------------------------------------------------------ */

function useLogoTexture() {
  const gl = useThree((s) => s.gl);
  const invalidate = useThree((s) => s.invalidate);
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let alive = true;
    let loaded: THREE.Texture | null = null;
    new THREE.TextureLoader().load(LOGO_SRC, (t) => {
      // The file is used as-is: no resampling, no recolouring.
      t.colorSpace = THREE.SRGBColorSpace;
      t.generateMipmaps = true;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.anisotropy = gl.capabilities.getMaxAnisotropy();
      loaded = t;
      if (alive) {
        setTex(t);
        invalidate();
      } else t.dispose();
    });
    return () => {
      alive = false;
      loaded?.dispose();
    };
  }, [gl, invalidate]);

  return tex;
}

/* ------------------------------------------------------------------ */
/* Door decals – children of the body mesh                             */
/* ------------------------------------------------------------------ */

/**
 * Decal projector per side. DecalGeometry maps the texture's u axis to the
 * projector's local x axis. Right side (+z): projector x = car forward,
 * which is "right" for someone looking at that side. Left side (−z): the
 * projector is turned 180°, so its x points to the car's rear – again
 * "right" for the viewer. The logo therefore reads correctly on both
 * sides and is never mirrored.
 */
const sideRotation = (s: 1 | -1): [number, number, number] => [0, s === 1 ? 0 : Math.PI, 0];

/** Projection depth: only reaches the near body side, never the far one. */
const DEPTH = 0.4;

/**
 * The decals lie exactly on the body. drei only sets a slope-based polygon
 * offset, which is ~0 when the door faces the camera → z-fighting streaks.
 * A constant offset (units) per layer keeps band < sign < logo stable.
 */
const layer = (n: number) => ({
  polygonOffset: true,
  polygonOffsetFactor: -2 * n,
  polygonOffsetUnits: -4 * n,
});

/**
 * Printed-on look: the decals use the same glossy, clear-coated finish as
 * the paint and no glow of their own, so they read as part of the door.
 * The logo file's colours are used unchanged (no recolouring).
 */
const print = (map: THREE.Texture) => ({ map, roughness: 0.3, metalness: 0.15 });

export function DoorDecals() {
  const logo = useLogoTexture();
  const tex = useMemo(
    () => ({
      stripeRight: stripeTexture(true),
      stripeLeft: stripeTexture(false),
    }),
    [],
  );

  const stripeCentre = {
    x: (STRIPE_BOX.x0 + STRIPE_BOX.x1) / 2,
    y: (STRIPE_BOX.y0 + STRIPE_BOX.y1) / 2,
    w: STRIPE_BOX.x1 - STRIPE_BOX.x0,
    h: STRIPE_BOX.y1 - STRIPE_BOX.y0,
  };

  return (
    <>
      {SIDES.map((s) => (
        // Fragment, not <group>: a Decal's direct parent must be the body mesh.
        <Fragment key={s}>
          <Decal
            position={[stripeCentre.x, stripeCentre.y, s * BODY_SIDE_Z]}
            rotation={sideRotation(s)}
            scale={[stripeCentre.w, stripeCentre.h, DEPTH]}
            depthTest
            polygonOffsetFactor={layer(1).polygonOffsetFactor}
          >
            <meshStandardMaterial
              {...print(s === 1 ? tex.stripeRight : tex.stripeLeft)}
              {...layer(1)}
              transparent
              depthWrite={false}
            />
          </Decal>

          {logo && (
            <Decal
              position={[DOOR_SIGN.x, DOOR_SIGN.y, s * BODY_SIDE_Z]}
              rotation={sideRotation(s)}
              scale={[LOGO_SIZE.w, LOGO_SIZE.h, DEPTH]}
              depthTest
              polygonOffsetFactor={layer(3).polygonOffsetFactor}
            >
              <meshStandardMaterial
                {...print(logo)}
                {...layer(3)}
                transparent
                alphaTest={0.02}
                depthWrite={false}
              />
            </Decal>
          )}
        </Fragment>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Blank number plates (front and rear)                                */
/* ------------------------------------------------------------------ */

export function Plates() {
  const plate = useMemo(() => {
    const map = plateTexture();
    return {
      map,
      geo: new THREE.PlaneGeometry(PLATE.w, PLATE.h),
      mat: new THREE.MeshStandardMaterial({ map, color: "#c9d0d8", roughness: 0.55, metalness: 0 }),
    };
  }, []);

  return (
    <>
      {/* Front: on the dark intake, facing forward (+x) */}
      <mesh geometry={plate.geo} material={plate.mat} position={[2.262, 0.47, 0]} rotation={[0, Math.PI / 2, 0]} />
      {/* Rear: below the taillight, facing back (−x) */}
      <mesh geometry={plate.geo} material={plate.mat} position={[-2.192, 0.6, 0]} rotation={[0, -Math.PI / 2, 0]} />
    </>
  );
}
