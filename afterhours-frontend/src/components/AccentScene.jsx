import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import useMediaQuery from '../hooks/useMediaQuery.js';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';

function GeometricArtifact({ variant = 'about' }) {
  const group = useRef();
  const spin = useRef();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = state.pointer.x * 0.25;
      group.current.rotation.x = -state.pointer.y * 0.15;
    }
    if (spin.current) spin.current.rotation.y += delta * 0.25;
  });

  const isRegister = variant === 'register';

  return (
    <group ref={group}>
      <Float speed={0.9} floatIntensity={0.2} rotationIntensity={0.12}>
        <group ref={spin}>
          {/* Black Chrome Octahedral Core */}
          <mesh castShadow>
            <octahedronGeometry args={[1.0, 0]} />
            <meshStandardMaterial
              color="#0d0d0c"
              metalness={0.95}
              roughness={0.18}
            />
          </mesh>

          {/* Luminous Signal Orange Orbital Ring */}
          <mesh rotation={[1.1, 0.3, 0]}>
            <torusGeometry args={[1.45, 0.035, 12, 64]} />
            <meshStandardMaterial
              color="#FF5A1F"
              emissive="#FF5A1F"
              emissiveIntensity={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Outer Technical Wireframe */}
          <mesh scale={1.22} rotation={[0.4, 0.4, 0]}>
            <octahedronGeometry args={[1.0, 1]} />
            <meshBasicMaterial
              color={isRegister ? '#FF5A1F' : '#F2EFE6'}
              wireframe
              transparent
              opacity={0.14}
            />
          </mesh>
        </group>
      </Float>

      {/* Titanium Satellite Component */}
      <mesh position={[-1.25, 0.55, 0.2]} rotation={[0.4, 0.8, 0]}>
        <dodecahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#A8A499" metalness={0.88} roughness={0.28} />
      </mesh>

      <mesh position={[1.2, -0.6, 0.3]} rotation={[0.2, 0.5, 0.8]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#1f1f1d" metalness={0.92} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function AccentScene({ variant = 'about' }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reduce = usePrefersReducedMotion();

  if (reduce) {
    return (
      <div className="accent-scene accent-scene--static">
        <div className="accent-scene__crystal" />
      </div>
    );
  }

  return (
    <div className={`accent-scene accent-scene--${variant}`} aria-hidden="true">
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{ alpha: true, antialias: !isMobile }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 3]} intensity={1.8} color="#F2EFE6" />
        <pointLight position={[-2, -1, 1]} intensity={5} color="#FF5A1F" distance={8} />
        <Suspense fallback={null}>
          <GeometricArtifact variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
