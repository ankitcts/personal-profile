'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * A single dashboard panel with slight 3D-perspective tilt that
 * intensifies on hover (parallax illusion). Yellow Bloomberg-style chrome.
 */
export default function Panel({
  title,
  index,
  className,
  children,
}: {
  title: string;
  index: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      whileHover={{ rotateX: -2, rotateY: 2, scale: 1.005 }}
      transition={{ duration: 0.4 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={cn(
        'relative rounded border border-yellow-400/25 bg-terminal-panel/90 p-4 shadow-[0_8px_30px_-10px_rgba(253,224,71,0.15)] backdrop-blur',
        className,
      )}
    >
      <header className="mb-3 flex items-center justify-between border-b border-yellow-400/15 pb-2 font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="text-yellow-300">{title}</span>
        <span className="text-slate-600">{index}</span>
      </header>
      {children}
    </motion.div>
  );
}
