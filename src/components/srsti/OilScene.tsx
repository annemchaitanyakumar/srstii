import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";

import { Bottle } from "./Bottle";

function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  useFrame(() => {
    frames.current += 1;
    if (frames.current === 3) onReady();
  });
  return null;
}

export default function OilScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [maxDpr, setMaxDpr] = useState(1.5);
  const [dpr, setDpr] = useState(1.25);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
    const cap = Math.min(window.devicePixelRatio || 1, mobile || lowPower ? 1.25 : 1.75);
    setMaxDpr(cap);
    setDpr(cap);
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={dpr}
        camera={{ fov: 35, near: 0.1, far: 120, position: [0, 1.1, 5.5] }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        aria-hidden
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(maxDpr)}
          flipflops={3}
          onFallback={() => setDpr(0.85)}
        />
        <ambientLight intensity={0.7} color="#FAF4EB" />
        <directionalLight position={[-3.5, 6, 4]} intensity={2.6} color="#FFF5DF" />
        <directionalLight position={[4, 2.5, -3]} intensity={1.4} color="#FFDCA8" />
        <Suspense fallback={null}>
          <Environment resolution={128}>
            <Lightformer
              intensity={2.6}
              position={[0, 6, 0]}
              rotation-x={Math.PI / 2}
              scale={[12, 12, 1]}
            />
            <Lightformer
              intensity={1.8}
              color="#FFE1A8"
              position={[-6, 1.5, -1]}
              rotation-y={Math.PI / 2}
              scale={[22, 1.6, 1]}
            />
            <Lightformer
              intensity={1.4}
              color="#FFF8E8"
              position={[6, 2, 2]}
              rotation-y={-Math.PI / 2}
              scale={[22, 1.2, 1]}
            />
            <Lightformer intensity={0.9} color="#D4A348" position={[0, -2, 4]} scale={[12, 2.2, 1]} />
          </Environment>
          <Bottle />
        </Suspense>
        <ReadySignal onReady={() => wrapper.current?.setAttribute("data-scene-ready", "true")} />
      </Canvas>
    </div>
  );
}
