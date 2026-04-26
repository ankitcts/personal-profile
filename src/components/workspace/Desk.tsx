'use client';

import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls, RoundedBox, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export type WorkspaceObject = 'resume' | 'photo' | 'keyboard' | 'monitor' | 'mug' | null;

const ACCENT = '#fbbf24'; // warm desk light

export default function Desk({ onSelect }: { onSelect: (o: WorkspaceObject) => void }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 4, 7.5], fov: 50 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#0a0604']} />

      {/* Lighting — single warm key light over the desk */}
      <ambientLight intensity={0.25} />
      <directionalLight
        castShadow
        position={[3, 8, 4]}
        intensity={1.4}
        color={ACCENT}
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 3, 3]} intensity={0.3} color="#60a5fa" />

      {/* Desk surface */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#3a2412" roughness={0.85} />
      </mesh>

      {/* Subtle wood grain stripes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.001, -3.5 + i * 0.9]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[12, 0.04]} />
          <meshBasicMaterial color="#5a3520" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Monitor */}
      <Pickable object="monitor" onSelect={onSelect} position={[0, 1.5, -2]}>
        <group>
          <mesh castShadow>
            <boxGeometry args={[3.5, 2.2, 0.15]} />
            <meshStandardMaterial color="#1f2937" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <planeGeometry args={[3.3, 2]} />
            <meshBasicMaterial color="#0a0a0f" />
          </mesh>
          <Text
            position={[0, 0, 0.09]}
            fontSize={0.22}
            color={ACCENT}
            anchorX="center"
            anchorY="middle"
          >
            {'> ankit@desk:~$'}
          </Text>
          {/* Stand */}
          <mesh position={[0, -1.5, 0.2]} castShadow>
            <boxGeometry args={[0.4, 0.8, 0.4]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
          <mesh position={[0, -2, 0.4]} castShadow>
            <boxGeometry args={[1.4, 0.1, 0.8]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
        </group>
      </Pickable>

      {/* Resume — paper stack */}
      <Pickable object="resume" onSelect={onSelect} position={[-2.6, 0.05, 1.2]}>
        <group rotation={[0, -0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 0.04, 2.3]} />
            <meshStandardMaterial color="#f5f5f4" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.6, 2.1]} />
            <meshBasicMaterial color="#e7e5e4" />
          </mesh>
          {[0.6, 0.3, 0, -0.3, -0.6].map((y) => (
            <mesh
              key={y}
              position={[0, 0.026, y]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[1.3, 0.05]} />
              <meshBasicMaterial color="#78716c" />
            </mesh>
          ))}
        </group>
      </Pickable>

      {/* Framed photo */}
      <Pickable object="photo" onSelect={onSelect} position={[2.8, 0.6, -0.5]}>
        <group rotation={[0, -0.4, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 1.2, 0.08]} />
            <meshStandardMaterial color="#92400e" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[1.2, 1]} />
            <meshBasicMaterial color={ACCENT} />
          </mesh>
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.18}
            color="#3a2412"
            anchorX="center"
            anchorY="middle"
            maxWidth={1}
          >
            {'AK'}
          </Text>
          {/* Stand */}
          <mesh position={[0, -0.7, -0.3]} rotation={[Math.PI / 6, 0, 0]} castShadow>
            <boxGeometry args={[0.05, 0.6, 0.05]} />
            <meshStandardMaterial color="#92400e" />
          </mesh>
        </group>
      </Pickable>

      {/* Keyboard */}
      <Pickable object="keyboard" onSelect={onSelect} position={[0, 0.05, 1.5]}>
        <group>
          <mesh castShadow>
            <boxGeometry args={[3, 0.08, 1]} />
            <meshStandardMaterial color="#27272a" roughness={0.6} />
          </mesh>
          {/* Keys grid */}
          {Array.from({ length: 5 }).flatMap((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <mesh
                key={`k-${row}-${col}`}
                position={[-1.35 + col * 0.21, 0.08, -0.4 + row * 0.18]}
                castShadow
              >
                <boxGeometry args={[0.18, 0.04, 0.15]} />
                <meshStandardMaterial color="#52525b" />
              </mesh>
            )),
          )}
        </group>
      </Pickable>

      {/* Coffee mug */}
      <Pickable object="mug" onSelect={onSelect} position={[3.2, 0.4, 1.6]}>
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[0.35, 0.3, 0.7, 32]} />
            <meshStandardMaterial color="#0c4a6e" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.05, 32]} />
            <meshStandardMaterial color="#3a2412" roughness={0.9} />
          </mesh>
          {/* Handle */}
          <mesh position={[0.45, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.15, 0.04, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#0c4a6e" />
          </mesh>
          {/* Steam (animated) */}
          <SteamWisps />
        </group>
      </Pickable>

      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={12}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.3}
        enableDamping
      />
    </Canvas>
  );
}

function SteamWisps() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.children.forEach((m, i) => {
      const t = clock.getElapsedTime() + i * 0.6;
      m.position.y = 0.4 + ((t * 0.4) % 1) * 1.2;
      const mat = (m as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.3 - ((t * 0.4) % 1) * 0.3);
    });
  });
  return (
    <group ref={ref} position={[0, 0.4, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[i * 0.1 - 0.1, 0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#cbd5e1" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Pickable({
  object,
  onSelect,
  position,
  children,
}: {
  object: NonNullable<WorkspaceObject>;
  onSelect: (o: WorkspaceObject) => void;
  position: [number, number, number];
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    if (hovered) {
      ref.current.position.y = position[1] + Math.sin(t * 4) * 0.02 + 0.08;
    } else {
      ref.current.position.y = position[1];
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(object);
  };

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={handleClick}
    >
      {children}
      {hovered && (
        <Html center distanceFactor={10} position={[0, 1.5, 0]}>
          <div className="rounded-full border border-amber-400/60 bg-black/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-300 backdrop-blur whitespace-nowrap">
            click to open · {object}
          </div>
        </Html>
      )}
    </group>
  );
}

// Re-export RoundedBox so we don't lint-warn on the import (kept as a spare)
export { RoundedBox };
