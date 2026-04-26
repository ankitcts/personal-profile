'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * A single z-stacked translucent panel in the holographic shell.
 * Hover lifts it slightly forward in z; the scan-line accent on the
 * left edge keeps the chrome feel consistent across panels.
 */
export default function Panel({
  title,
  index,
  children,
  className,
}: {
  title: string;
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32, rotateX: -6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      whileHover={{ scale: 1.005, z: 10 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={cn(
        'group relative overflow-hidden rounded-lg border border-holo-accent/30 bg-holo-panel/70 p-6 backdrop-blur-md',
        'shadow-[0_0_30px_-8px_rgba(34,211,238,0.25)]',
        className,
      )}
    >
      {/* Left edge accent + index */}
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-holo-accent to-transparent opacity-70" />
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-holo-glow">
          <span className="text-holo-accent/60">{String(index).padStart(2, '0')}</span>{' '}
          // {title}
        </h2>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400/70">
            online
          </span>
        </div>
      </div>
      <div className="relative">{children}</div>
      {/* Sweep on hover */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(34,211,238,0.18), transparent 60%)',
        }}
      />
    </motion.section>
  );
}
