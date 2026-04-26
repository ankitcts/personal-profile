'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import { IDENTITY, SKILLS, PROJECTS, ROLES } from '@/lib/profile';
import type { NodeData } from '@/components/constellation/Constellation';
import Crosslinks from '@/components/shared/Crosslinks';

const Constellation = dynamic(
  () => import('@/components/constellation/Constellation'),
  { ssr: false },
);

export default function ConstellationPage() {
  const [selected, setSelected] = useState<NodeData | null>(null);

  return (
    <main className="relative h-screen overflow-hidden bg-[#04030d]">
      <Constellation onSelect={setSelected} />

      {/* Identity card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-6 top-6 z-30 max-w-sm rounded-lg border border-purple-400/30 bg-black/60 p-4 backdrop-blur"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-300">
          // constellation.map
        </p>
        <h1 className="mt-1 text-2xl font-bold text-purple-100">
          {IDENTITY.name}
        </h1>
        <p className="mt-1 text-xs text-purple-100/60">{IDENTITY.title}</p>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute right-6 top-6 z-30 flex flex-col gap-1.5 rounded-lg border border-purple-400/30 bg-black/60 p-3 font-mono text-[10px] uppercase tracking-wider backdrop-blur"
      >
        <p className="text-purple-300/80">// legend</p>
        <Legend color="#22d3ee" label={`${ROLES.length} roles · timeline`} />
        <Legend color="#a855f7" label={`${PROJECTS.length} projects · outer ring`} />
        <Legend color="#facc15" label={`${SKILLS.length} skills · inner sphere`} />
        <p className="mt-1 text-purple-300/50">drag to orbit · hover stars</p>
      </motion.div>

      {/* Selected detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="absolute bottom-6 right-6 z-30 w-[min(420px,90vw)] rounded-xl border bg-black/80 p-5 backdrop-blur"
            style={{ borderColor: selected.color + '60', boxShadow: `0 0 40px -10px ${selected.color}` }}
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: selected.color }}
                >
                  // {selected.kind}
                </p>
                <h3 className="text-lg font-bold text-white">{selected.label}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-slate-300">{selected.detail}</p>
            {selected.url && (
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition hover:bg-white/10"
                style={{ color: selected.color, border: `1px solid ${selected.color}40` }}
              >
                Open project <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Crosslinks />
    </main>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-300">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      <span>{label}</span>
    </div>
  );
}
