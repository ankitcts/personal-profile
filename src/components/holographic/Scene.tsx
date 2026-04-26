'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

/**
 * The R3F backdrop for /holographic — a slowly-rotating wireframe
 * dodecahedron + drifting starfield. Pointer-events disabled so all
 * the actual content sits on a 2D layer in front of it.
 */
export default function Scene() {
  return (
    <Canvas
      className="!fixed !inset-0 -z-10"
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#04060e']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

      <Stars
        radius={80}
        depth={50}
        count={2400}
        factor={3.5}
        saturation={0}
        fade
        speed={0.4}
      />

      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5}>
        <WireOrb />
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        enableDamping
      />
    </Canvas>
  );
}

function WireOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += dt * 0.15;
      meshRef.current.rotation.x += dt * 0.08;
    }
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[3, 1]} />
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} />
    </mesh>
  );
}
