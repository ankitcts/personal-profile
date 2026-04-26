'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { IDENTITY } from '@/lib/profile';
import PanelOverlay from '@/components/workspace/PanelOverlay';
import type { WorkspaceObject } from '@/components/workspace/Desk';
import Crosslinks from '@/components/shared/Crosslinks';

const Desk = dynamic(
  () => import('@/components/workspace/Desk').then((m) => m.default),
  { ssr: false },
);

export default function WorkspacePage() {
  const [active, setActive] = useState<WorkspaceObject>(null);

  return (
    <main className="relative h-screen overflow-hidden desk-wood">
      {/* 3D scene fills the viewport */}
      <div className="absolute inset-0">
        <Desk onSelect={setActive} />
      </div>

      {/* Floating identity card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute left-6 top-6 z-30 max-w-sm rounded-lg border border-amber-400/30 bg-black/60 p-4 backdrop-blur"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-300/80">
          // workspace.exe
        </p>
        <h1 className="mt-1 text-2xl font-bold text-amber-100">
          {IDENTITY.name}
        </h1>
        <p className="mt-1 text-xs text-amber-100/60">{IDENTITY.title}</p>
        <p className="mt-3 text-[11px] text-amber-100/40">
          Click any object on the desk to open its panel · drag to orbit
        </p>
      </motion.div>

      {/* Hint chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute left-1/2 top-6 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-amber-400/30 bg-black/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-amber-200/80 backdrop-blur"
      >
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
        scene loaded · 5 interactive objects
      </motion.div>

      <PanelOverlay active={active} onClose={() => setActive(null)} />

      <Crosslinks />
    </main>
  );
}
