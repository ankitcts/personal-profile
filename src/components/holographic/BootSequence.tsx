'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LINES = [
  '> Initialising hologram bus…',
  '> Linking neural index…',
  '> Loading ./profile.ts (resume source of truth)',
  '> Compiling 6 skill domains, 6 roles, 8 projects…',
  '> Verifying credentials [Goldman Sachs · Sapient · AOL · TCS · Cognizant]',
  '> Mounting holographic shell',
  '> READY',
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= LINES.length) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 280);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-holo-bg/95 backdrop-blur"
      >
        <div className="w-[min(640px,90vw)] rounded-lg border border-holo-accent/30 bg-holo-panel/80 p-6 font-mono text-sm text-holo-glow shadow-[0_0_60px_-10px_rgba(34,211,238,0.4)]">
          <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-holo-accent/70">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-holo-accent" />
            holographic shell · v1.0.0
          </div>
          {LINES.slice(0, step).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="leading-relaxed"
            >
              {line}
            </motion.div>
          ))}
          {step < LINES.length && (
            <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-holo-glow align-middle" />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
