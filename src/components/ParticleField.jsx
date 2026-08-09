import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { useTheme } from "../theme/ThemeContext.jsx";

/**
 * Fondo de partículas.
 *
 * Vive en su propio archivo para poder importarse de forma diferida: three.js
 * y react-three-fiber necesitan WebGL, que no existe cuando el HTML se genera
 * en Node durante el build. Al cargarse solo en el navegador, el prerenderizado
 * no lo toca y de paso el bundle inicial no arrastra la librería 3D.
 */
function ParticleObject() {
  const ref = useRef({});
  // Múltiplo de 3: cada punto son tres coordenadas. Con 5000 quedaba una
  // coordenada suelta sin rellenar y three.js calculaba un radio NaN, que era
  // el error que salía en la consola de todos los visitantes.
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
