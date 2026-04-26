'use client';

import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { SKILLS, PROJECTS, ROLES } from '@/lib/profile';

export interface NodeData {
  id: string;
  label: string;
  kind: 'skill' | 'project' | 'role';
  color: string;
  size: number;
  position: [number, number, number];
  detail: string;
  url?: string;
}

export interface Edge {
  a: string;
  b: string;
}

/**
 * Build the constellation: place skills in an inner sphere, projects
 * in an outer ring, roles as a vertical timeline column. Connections
 * link a project to the skills it uses.
 */
function buildGraph(): { nodes: NodeData[]; edges: Edge[] } {
  const nodes: NodeData[] = [];

  // Skills — inner sphere
  SKILLS.forEach((s, i) => {
    const phi = Math.acos(-1 + (2 * i) / SKILLS.length);
    const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
    const r = 3.5;
    nodes.push({
      id: `skill-${s.name}`,
      label: s.name,
      kind: 'skill',
      color: s.color,
      size: 0.18 + s.level * 0.12,
      position: [
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ],
      detail: s.items.join(' · '),
    });
  });

  // Projects — outer ring
  PROJECTS.forEach((p, i) => {
    const angle = (i / PROJECTS.length) * Math.PI * 2;
    const r = 7;
    nodes.push({
      id: `project-${p.name}`,
      label: p.name,
      kind: 'project',
      color: '#a855f7',
      size: 0.22,
      position: [r * Math.cos(angle), r * Math.sin(angle) * 0.4, r * Math.sin(angle)],
      detail: p.blurb,
      url: p.url,
    });
  });

  // Roles — vertical column off to one side
  ROLES.forEach((r, i) => {
    nodes.push({
      id: `role-${i}`,
      label: r.title.split(' — ')[0],
      kind: 'role',
      color: '#22d3ee',
      size: 0.2,
      position: [-9, 4 - i * 1.5, 0],
      detail: `${r.company}${r.client ? ' · ' + r.client : ''} · ${r.start}–${r.end}`,
    });
  });

  // Edges — link each project to skills mentioned in its stack
  const edges: Edge[] = [];
  PROJECTS.forEach((p) => {
    const projectId = `project-${p.name}`;
    p.stack.forEach((tech) => {
      const lower = tech.toLowerCase();
      SKILLS.forEach((s) => {
        s.items.forEach((item) => {
          const itemLower = item.toLowerCase();
          if (itemLower.includes(lower.split(' ')[0]) || lower.includes(itemLower.split(' ')[0])) {
            edges.push({ a: projectId, b: `skill-${s.name}` });
          }
        });
      });
    });
  });
  // Dedupe
  const seen = new Set<string>();
  const dedup = edges.filter((e) => {
    const k = [e.a, e.b].sort().join('|');
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  return { nodes, edges: dedup };
}

export default function Constellation({
  onSelect,
}: {
  onSelect: (n: NodeData | null) => void;
}) {
  const { nodes, edges } = useMemo(buildGraph, []);
  const [hoverId, setHoverId] = useState<string | null>(null);

  return (
    <Canvas
      className="!fixed !inset-0"
      camera={{ position: [0, 2, 16], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#04030d']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#22d3ee" />

      {/* Star field backdrop */}
      <BackgroundStars />

      {/* Edges */}
      {edges.map((e, i) => {
        const a = nodes.find((n) => n.id === e.a)!;
        const b = nodes.find((n) => n.id === e.b)!;
        const lit = hoverId === e.a || hoverId === e.b;
        return (
          <Line
            key={i}
            points={[a.position, b.position]}
            color={lit ? '#fde047' : '#7c3aed'}
            opacity={lit ? 0.9 : 0.18}
            transparent
            lineWidth={lit ? 1.5 : 0.5}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((n) => (
        <Node
          key={n.id}
          node={n}
          highlighted={hoverId === n.id}
          onHoverChange={(h) => setHoverId(h ? n.id : null)}
          onClick={() => onSelect(n)}
        />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={28}
        autoRotate
        autoRotateSpeed={0.25}
        enableDamping
      />
    </Canvas>
  );
}

function BackgroundStars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(2400 * 3);
    for (let i = 0; i < 2400; i++) {
      const r = 60;
      arr[i * 3] = (Math.random() - 0.5) * r * 2;
      arr[i * 3 + 1] = (Math.random() - 0.5) * r * 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * r * 2;
    }
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#cbd5e1" sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

function Node({
  node,
  highlighted,
  onHoverChange,
  onClick,
}: {
  node: NodeData;
  highlighted: boolean;
  onHoverChange: (h: boolean) => void;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const baseScale = highlighted ? 1.6 : 1;
    const pulse = 1 + Math.sin(t * 2 + node.position[0]) * 0.05;
    ref.current.scale.setScalar(baseScale * pulse);
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHoverChange(true);
    document.body.style.cursor = 'pointer';
  };
  const handleOut = () => {
    onHoverChange(false);
    document.body.style.cursor = 'auto';
  };
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <group position={node.position}>
      <mesh
        ref={ref}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[node.size, 24, 24]} />
        <meshBasicMaterial color={node.color} />
      </mesh>
      {/* Glow halo */}
      <mesh>
        <sphereGeometry args={[node.size * 1.8, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={highlighted ? 0.35 : 0.12} />
      </mesh>
      {(highlighted || node.kind === 'role') && (
        <Html
          center
          distanceFactor={12}
          position={[0, node.size * 2.5, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="whitespace-nowrap rounded-full border bg-black/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur"
            style={{ borderColor: node.color + '80', color: node.color }}
          >
            {node.label}
          </div>
        </Html>
      )}
    </group>
  );
}
