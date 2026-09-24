import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { useTheme } from "../theme/ThemeContext.jsx";

/**
 * Particle background.
 *
 * Lives in its own file so it can be lazily imported: three.js and
 * react-three-fiber need WebGL, which doesn't exist when the HTML gets
 * generated in Node during the build. By loading only in the browser,
 * prerendering never touches it, and as a bonus the initial bundle doesn't
 * carry the 3D library.
 */
function ParticleObject() {
  const ref = useRef({});
  // Multiple of 3: each point is three coordinates. At 5000 there was one
  // leftover coordinate unfilled and three.js computed a NaN radius, which
  // was the error that showed up in every visitor's console.
  const [sphere] = useState(() => random.inSphere(new Float32Array(4998), { radius: 1.5 }));
  const { theme } = useTheme();

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    ref.current.scale.set(1, 1, 1);
    ref.current.material.color.set(theme === "dark" ? "#ffffff" : "#1e3a8a");
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export default function ParticleField() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <ParticleObject />
    </Canvas>
  );
}
