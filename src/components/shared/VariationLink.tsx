'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VariationLink({
  slug,
  name,
  blurb,
  accent,
  index,
}: {
  slug: string;
  name: string;
  blurb: string;
  accent: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.6, ease: 'easeOut' }}
    >
      <Link
        href={`/${slug}`}
        className={cn(
          'group relative block overflow-hidden rounded-2xl border bg-white/[0.02] p-6 backdrop-blur transition-all',
          'hover:scale-[1.02] hover:bg-white/[0.04] hover:shadow-2xl',
        )}
        style={{ borderColor: accent + '40' }}
      >
        {/* Animated gradient border */}
        <div
          className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accent}30 0%, transparent 70%)`,
          }}
        />
        {/* Variation index badge */}
        <span
          className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: accent }}
        >
          0{index + 1}
        </span>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className="text-2xl font-semibold leading-tight"
              style={{ color: accent }}
            >
              {name}
            </h3>
            <p className="mt-2 text-sm text-slate-400">{blurb}</p>
          </div>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 translate-x-0 translate-y-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            style={{ color: accent }}
          />
        </div>
        {/* Subtle scan line */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-50"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />
      </Link>
    </motion.div>
  );
}
