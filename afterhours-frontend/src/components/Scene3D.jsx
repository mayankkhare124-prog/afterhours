import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import SceneFallback from './SceneFallback.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';

// Materials configuration: High-end black chrome, titanium, and signal orange luminescent
const blackChrome = {
  color: '#121210',
  metalness: 0.95,
  roughness: 0.18,
  clearcoat: 0.6,
  clearcoatRoughness: 0.15,
};

const titanium = {
  color: '#242420',
  metalness: 0.88,
  roughness: 0.32,
};

const warmIvoryMetal = {
  color: '#F0ECE1',
  metalness: 0.82,
  roughness: 0.28,
};

/**
 * The Central Artifact: A black-chrome architectural monolith with interlocking geometric chamfers,
 * fine technical wireframes, and intersecting mechanical structural elements.
 */
function CentralMonolith({ lowPower, isHovered }) {
  const monolithRef = useRef();
  const wireframeRef = useRef();

  useFrame((state, delta) => {
    if (!monolithRef.current) return;
    // Base continuous slow rotation
    monolithRef.current.rotation.y += delta * 0.15;
    monolithRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group ref={monolithRef}>
      {/* Primary Sculptural Monolith Body */}
      <mesh castShadow receiveShadow>
        <octahedronGeometry args={[1.35, 0]} />
        <meshPhysicalMaterial {...blackChrome} />
      </mesh>

      {/* Intersecting Titanium Geometric Prisms */}
      <mesh rotation={[0.4, 0.6, 0.2]} scale={[0.82, 1.25, 0.82]} castShadow>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial {...titanium} />
      </mesh>

      {/* Internal Monolithic Pillar core */}
      <mesh scale={[0.45, 1.85, 0.45]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0f0f0e" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Fine technical wireframe casing */}
      {!lowPower && (
        <mesh ref={wireframeRef} scale={1.42}>
          <octahedronGeometry args={[1.05, 1]} />
          <meshBasicMaterial
            color="#FF5A1F"
            wireframe
            transparent
            opacity={isHovered ? 0.22 : 0.12}
          />
        </mesh>
      )}

      {/* Secondary micro-facets */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, Math.PI / 4]} scale={0.92}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#141412" metalness={0.94} roughness={0.25} />
      </mesh>

      {/* Internal luminous ember */}
      <pointLight position={[0, 0, 0]} color="#FF5A1F" intensity={3.5} distance={3.5} />
    </group>
  );
}

/**
 * Signal Orange Luminous Orbital Ring:
 * Smooth, 3D torus intersecting the monolith with responsive tilt & subtle emission.
 */
function SignalOrangeOrbitalRing({ isHovered }) {
  const ringRef = useRef();
  const glowRingRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      // Rotation with subtle breathing pulsation
      ringRef.current.rotation.z += delta * 0.22;
      const wobble = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
      ringRef.current.rotation.x = 1.15 + wobble + (isHovered ? 0.15 : 0);
    }
    if (glowRingRef.current) {
      glowRingRef.current.rotation.z -= delta * 0.14;
    }
  });

  return (
    <group>
      {/* Primary Solid Signal-Orange Luminous Ring */}
      <mesh ref={ringRef} rotation={[1.15, 0.25, -0.4]}>
        <torusGeometry args={[2.05, 0.045, 16, 120]} />
        <meshStandardMaterial
          color="#FF5A1F"
          emissive="#FF5A1F"
          emissiveIntensity={isHovered ? 1.4 : 0.9}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Secondary Concentric Thin Accent Trace */}
      <mesh ref={glowRingRef} rotation={[-0.85, 0.45, 0.2]}>
        <torusGeometry args={[2.35, 0.012, 12, 100]} />
        <meshBasicMaterial color="#FF7A45" transparent opacity={isHovered ? 0.65 : 0.4} />
      </mesh>
    </group>
  );
}

/**
 * Secondary Orbiting Metallic Satellites & Micro-Components:
 * High-precision titanium shards moving gently along varied inclinations.
 */
function OrbitingComponents({ lowPower }) {
  const sat1 = useRef();
  const sat2 = useRef();
  const sat3 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sat1.current) {
      const a = t * 0.35;
      sat1.current.position.set(Math.cos(a) * 2.5, Math.sin(a * 1.2) * 0.4, Math.sin(a) * 2.5);
      sat1.current.rotation.x += 0.01;
      sat1.current.rotation.y += 0.015;
    }
    if (sat2.current) {
      const b = -t * 0.28 + 2.0;
      sat2.current.position.set(Math.cos(b) * 2.85, Math.sin(b * 0.9) * -0.5, Math.sin(b) * 2.85);
      sat2.current.rotation.y += 0.012;
      sat2.current.rotation.z += 0.008;
    }
    if (sat3.current) {
      const c = t * 0.42 + 4.2;
      sat3.current.position.set(Math.sin(c) * 2.2, Math.cos(c * 1.5) * 0.6, Math.cos(c) * 2.2);
      sat3.current.rotation.x += 0.02;
    }
  });

  return (
    <group>
      {/* Component 1: Faceted Titanium Dodecahedron */}
      <mesh ref={sat1} castShadow>
        <dodecahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial {...warmIvoryMetal} />
      </mesh>

      {/* Component 2: Black Chrome Prism */}
      <mesh ref={sat2} castShadow>
        <octahedronGeometry args={[0.18, 0]} />
        <meshPhysicalMaterial {...blackChrome} />
      </mesh>

      {/* Component 3: Small Signal Orange Anchor Marker */}
      {!lowPower && (
        <mesh ref={sat3}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial
            color="#FF5A1F"
            emissive="#FF5A1F"
            emissiveIntensity={0.8}
            roughness={0.3}
          />
        </mesh>
      )}
    </group>
  );
}

/**
 * Architectural Floor Grid: Subtle dark graphite ground lines giving grounded scale.
 */
function ArchitecturalGrid() {
  const lines = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pts = [];
    const size = 10;
    const div = 16;
    const step = size / div;
    for (let i = 0; i <= div; i += 1) {
      const p = -size / 2 + i * step;
      pts.push(-size / 2, 0, p, size / 2, 0, p);
      pts.push(p, 0, -size / 2, p, 0, size / 2);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, []);

  return (
    <group position={[0, -2.1, 0]}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#F2EFE6" transparent opacity={0.05} />
      </lineSegments>
    </group>
  );
}

/**
 * Smooth Interactive Parallax Camera Controller:
 * Interpolates smoothly to mouse pointer on desktop without snapping or hijacking scroll.
 */
function InteractiveCameraRig({ reduce, isHovered }) {
  const { camera } = useThree();

  useFrame((state) => {
    if (reduce) return;
    const t = state.clock.elapsedTime;
    const targetX = state.pointer.x * (isHovered ? 0.75 : 0.45);
    const targetY = 0.2 + state.pointer.y * (isHovered ? 0.5 : 0.25);
    const targetZ = isHovered ? 5.6 : 6.0 + Math.sin(t * 0.2) * 0.08;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * Sparse Micro-Dust Particles: Restrained warm ambient particles reflecting light.
 */
function SparseDustParticles({ count = 28 }) {
  const points = useMemo(() => {
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      pts[i * 3] = (Math.random() - 0.5) * 8;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pts;
  }, [count]);

  const pRef = useRef();
  useFrame((_, delta) => {
    if (pRef.current) pRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#F2EFE6"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * Main Interactive 3D Canvas Scene
 */
export default function Scene3D({ onInteractionChange }) {
  const [webgl, setWebgl] = useState(true);
  const [visible, setVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const wrapRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reduce = usePrefersReducedMotion();
  const lowPower = isMobile;

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const hasGl = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebgl(hasGl);
    } catch {
      setWebgl(false);
    }
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '120px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!webgl || reduce) {
    return (
      <div className="scene3d scene3d--fallback" ref={wrapRef} aria-label="Monolith core static representation">
        <SceneFallback rich />
      </div>
    );
  }

  return (
    <div
      className="scene3d scene3d--monolith"
      ref={wrapRef}
      onPointerEnter={() => {
        setIsHovered(true);
        onInteractionChange?.(true);
      }}
      onPointerLeave={() => {
        setIsHovered(false);
        onInteractionChange?.(false);
      }}
      aria-label="Interactive 3D AFTERHOURS Core Monolith"
    >
      {visible && (
        <Canvas
          dpr={lowPower ? [1, 1.25] : [1, 1.75]}
          camera={{ position: [0, 0.2, 6.0], fov: 38 }}
          gl={{
            antialias: !lowPower,
            alpha: true,
            powerPreference: lowPower ? 'low-power' : 'high-performance',
          }}
          frameloop="always"
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.1;
          }}
        >
          <Suspense fallback={null}>
            <InteractiveCameraRig reduce={reduce} isHovered={isHovered} />

            {/* Studio Lighting Setup: Deep shadows, crisp highlights, controlled signal orange rim */}
            <ambientLight intensity={0.55} color="#DCD8CD" />
            <directionalLight
              position={[5, 7, 4]}
              intensity={2.6}
              color="#F2EFE6"
              castShadow={!lowPower}
            />
            {/* Soft Warm Key Fill from opposite flank */}
            <directionalLight
              position={[-4, 3, 2]}
              intensity={1.2}
              color="#A8A499"
            />
            {/* Luminous Signal Orange Rim Light defining silhouette */}
            <pointLight
              position={[-3.2, -0.6, -1.8]}
              intensity={9}
              color="#FF5A1F"
              distance={12}
            />
            {/* Downward Crisp Architectural Spot */}
            <spotLight
              position={[0, 6, 2.5]}
              intensity={7}
              angle={0.55}
              penumbra={0.8}
              color="#F2EFE6"
            />

            {/* Float Group for the Monolith and Orbit */}
            <Float
              speed={1.0}
              rotationIntensity={0.08}
              floatIntensity={reduce ? 0 : 0.22}
            >
              <CentralMonolith lowPower={lowPower} isHovered={isHovered} />
              <SignalOrangeOrbitalRing isHovered={isHovered} />
              <OrbitingComponents lowPower={lowPower} />
            </Float>

            <ArchitecturalGrid />
            {!lowPower && <SparseDustParticles count={32} />}

            {!lowPower && (
              <ContactShadows
                position={[0, -2.05, 0]}
                opacity={0.65}
                scale={9}
                blur={2.4}
                far={3.5}
                color="#000000"
              />
            )}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
