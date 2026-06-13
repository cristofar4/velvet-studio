"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  RoundedBox,
  ContactShadows,
  AdaptiveDpr,
} from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

/* A sculptural fan of polished blades — the Crown & Blade signature object.
   Outer group follows the pointer; inner group turns slowly on its own. */
function BladeFan({ calm }: { calm: boolean }) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (tilt.current) {
      const tx = state.pointer.y * 0.25;
      const ty = state.pointer.x * 0.5;
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, tx, 0.05);
      tilt.current.rotation.y = THREE.MathUtils.lerp(tilt.current.rotation.y, ty, 0.05);
    }
    if (spin.current && !calm) {
      spin.current.rotation.z += delta * 0.08;
    }
  });

  const blades = [-0.34, -0.12, 0.12, 0.34];

  return (
    <group ref={tilt}>
      <group ref={spin} rotation={[0.18, 0, 0]}>
        {blades.map((angle, i) => (
          <group key={i} rotation={[0, 0, angle]}>
            <RoundedBox
              args={[0.34, 3.1, 0.05]}
              radius={0.02}
              smoothness={5}
              position={[Math.sin(angle) * 0.18, 0, i * 0.06 - 0.09]}
            >
              <meshStandardMaterial
                color="#d7d9e0"
                metalness={1}
                roughness={0.17}
                envMapIntensity={1.6}
              />
            </RoundedBox>
          </group>
        ))}
        {/* razor edge of crimson down the lead blade */}
        <RoundedBox args={[0.04, 3.0, 0.06]} radius={0.015} smoothness={4} position={[0.16, 0, 0.16]}>
          <meshStandardMaterial
            color="#c8102e"
            emissive="#c8102e"
            emissiveIntensity={1.6}
            metalness={0.4}
            roughness={0.3}
          />
        </RoundedBox>
        {/* pivot pin */}
        <mesh position={[0, -1.5, 0.1]}>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 32]} />
          <meshStandardMaterial color="#eceef3" metalness={1} roughness={0.12} envMapIntensity={1.8} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ calm }: { calm: boolean }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight position={[6, 8, 6]} angle={0.3} penumbra={1} intensity={1.1} color="#fff4e8" />
      <pointLight position={[-6, -2, 4]} intensity={0.6} color="#c8102e" />

      <BladeFan calm={calm} />

      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.5}
        scale={9}
        blur={2.6}
        far={4}
        color="#000000"
      />

      {/* a small studio of light cards baked once for chrome reflections */}
      <Environment frames={1} resolution={256}>
        <Lightformer intensity={3} position={[0, 3, 2]} scale={[6, 2, 1]} color="#ffffff" />
        <Lightformer intensity={1.4} position={[-4, 1, 1]} scale={[3, 4, 1]} color="#cfd3dd" />
        <Lightformer intensity={2} position={[4, -1, 2]} scale={[3, 3, 1]} color="#ffffff" />
        <Lightformer intensity={1.6} position={[0, -3, -2]} scale={[6, 3, 1]} color="#7a0c14" />
      </Environment>

      <AdaptiveDpr pixelated />
    </>
  );
}

export default function BladeScene() {
  const calm = useReducedMotion() ?? false;
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Scene calm={calm} />
    </Canvas>
  );
}
