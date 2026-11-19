import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { MOODS, sceneState } from "@/lib/srsti/scene-state";
import { getBuoyancyState } from "@/lib/srsti/water-physics";

const GLASS_PROFILE: [number, number][] = [
  [0, 0],
  [0.5, 0],
  [0.56, 0.04],
  [0.58, 0.14],
  [0.58, 1.12],
  [0.56, 1.27],
  [0.46, 1.42],
  [0.28, 1.56],
  [0.18, 1.66],
  [0.165, 1.86],
  [0.2, 1.9],
  [0.2, 1.97],
  [0.16, 2.0],
];

function makeLabelTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 600;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;

  const draw = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#EFE6D4";
    ctx.fillRect(0, 0, 1024, 600);
    // paper fibre
    for (let i = 0; i < 1400; i++) {
      ctx.fillStyle = `rgba(120,95,60,${((i * 37) % 10) / 260})`;
      ctx.fillRect((i * 733) % 1024, (i * 389) % 600, 2, 1);
    }
    ctx.strokeStyle = "#B3802C";
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, 952, 528);
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, 924, 500);
    ctx.fillStyle = "#1A1816";
    ctx.textAlign = "center";
    ctx.font = '500 168px "EB Garamond", Garamond, Georgia, serif';
    ctx.fillText("S R S T I", 512, 300);
    ctx.fillStyle = "#8A6220";
    ctx.fillRect(452, 340, 120, 2);
    ctx.font = '600 30px "EB Garamond", Garamond, Georgia, serif';
    ctx.fillStyle = "#1A1816";
    ctx.fillText("W O O D  ·  P R E S S E D", 512, 410);
    ctx.font = 'italic 400 40px "EB Garamond", Garamond, Georgia, serif';
    ctx.fillStyle = "#6B645B";
    ctx.fillText("Liquid Heritage — Batch 2611", 512, 480);
    tex.needsUpdate = true;
  };

  draw();
  document.fonts?.ready.then(draw).catch(() => undefined);
  return tex;
}

export function Bottle() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  const { glassGeo, oilGeo, labelTex } = useMemo(() => {
    const glassPts = GLASS_PROFILE.map(([r, y]) => new THREE.Vector2(r, y));
    const oilPts = GLASS_PROFILE.filter(([, y]) => y <= 1.3)
      .map(([r, y]) => new THREE.Vector2(Math.max(r - 0.035, 0), Math.max(y, 0.04)))
      .concat([new THREE.Vector2(0.52, 1.3), new THREE.Vector2(0, 1.3)]);
    return {
      glassGeo: new THREE.LatheGeometry(glassPts, 96),
      oilGeo: new THREE.LatheGeometry(oilPts, 96),
      labelTex: makeLabelTexture(),
    };
  }, []);

  useEffect(
    () => () => {
      glassGeo.dispose();
      oilGeo.dispose();
      labelTex.dispose();
    },
    [glassGeo, oilGeo, labelTex],
  );

  useFrame((state, delta) => {
    const g = group.current;
    const i = inner.current;
    if (!g || !i) return;
    const dt = Math.min(delta, 0.05);
    const rm = sceneState.reducedMotion;
    const t = state.clock.elapsedTime * (rm ? 0.15 : 1);
    const vp = sceneState.viewports;
    const wide = state.size.width / state.size.height > 1.05;

    // hero parallax: bottle rises and recedes as the hero scrolls away
    const baseX = wide ? 1.45 : 0;
    const baseY = wide ? -0.78 : -0.3;
    const s = wide ? 0.66 : 0.48;

    // Sample physical water surface buoyancy at bottle's exact world position
    const mood = MOODS[sceneState.mood];
    const worldZ = -12 + (g.position.z || 0);
    const agitation = rm ? 0 : Math.min(sceneState.velocity / 35, 1.2);
    const calm = sceneState.progress > 0.86 ? 1 : 0;

    const buoyancy = getBuoyancyState(
      baseX,
      worldZ,
      t * (mood?.speed ?? 1),
      -1,
      mood?.amplitude ?? 1,
      agitation,
      calm,
    );

    // Realistic hydrostatic vertical bobbing
    const targetY = baseY + buoyancy.elevation * 0.85 + vp * 3.6;
    g.position.x = THREE.MathUtils.damp(g.position.x, baseX, 4, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetY, 5, dt);
    g.position.z = -vp * 1.5;
    g.scale.setScalar(s);
    g.visible = vp < 1.1;

    // Slow turn plus natural pitching and rolling with the water surface wave slope
    const p = sceneState.pointer;
    const wavePitch = buoyancy.pitch * 0.65 + p.y * 0.08;
    const waveRoll = buoyancy.roll * 0.65 - p.x * 0.08;

    i.rotation.y = THREE.MathUtils.damp(
      i.rotation.y,
      Math.sin(t * 0.35) * 0.45 + p.x * 0.35,
      3,
      dt,
    );
    i.rotation.z = THREE.MathUtils.damp(i.rotation.z, waveRoll, 4, dt);
    i.rotation.x = THREE.MathUtils.damp(i.rotation.x, wavePitch, 4, dt);
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        {/* oil */}
        <mesh geometry={oilGeo}>
          <meshStandardMaterial
            color="#C98A1E"
            emissive="#7A3E05"
            emissiveIntensity={0.55}
            roughness={0.18}
            metalness={0}
          />
        </mesh>
        {/* glass */}
        <mesh geometry={glassGeo}>
          <meshPhysicalMaterial
            color="#FFF7E6"
            transmission={1}
            thickness={0.35}
            roughness={0.03}
            ior={1.47}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1.4}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
        {/* label */}
        <mesh position={[0, 0.66, 0]}>
          <cylinderGeometry args={[0.588, 0.588, 0.66, 64, 1, true, -0.95, 1.9]} />
          <meshStandardMaterial map={labelTex} roughness={0.85} side={THREE.FrontSide} />
        </mesh>
        {/* brass collar */}
        <mesh position={[0, 1.93, 0]}>
          <cylinderGeometry args={[0.205, 0.205, 0.08, 48]} />
          <meshStandardMaterial color="#C8963E" metalness={1} roughness={0.28} />
        </mesh>
        {/* cork */}
        <mesh position={[0, 2.1, 0]}>
          <cylinderGeometry args={[0.175, 0.155, 0.28, 40]} />
          <meshStandardMaterial color="#9B7148" roughness={0.95} />
        </mesh>
        <mesh position={[0, 2.245, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.03, 40]} />
          <meshStandardMaterial color="#C8963E" metalness={1} roughness={0.32} />
        </mesh>
      </group>
    </group>
  );
}
