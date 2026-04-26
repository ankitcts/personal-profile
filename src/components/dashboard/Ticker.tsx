'use client';

import { useEffect, useState } from 'react';
import { SKILLS, PROJECTS } from '@/lib/profile';

/**
 * Bloomberg-style scrolling ticker. Cycles tech tags with simulated
 * "deltas" (purely cosmetic — no real market data, this is a portfolio).
 */
const TAGS = [
  ...SKILLS.flatMap((s) => s.items),
  ...PROJECTS.flatMap((p) => p.stack),
].slice(0, 50);

export default function Ticker() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2400);
    return () => clearInterval(id);
  }, []);
  // Pseudo-random deltas keyed by tick so they "move" without re-rendering refs
  const items = TAGS.map((t, i) => {
    const seed = (i + tick) % TAGS.length;
    const delta = Math.sin(seed) * 5;
    return {
      tag: t,
      delta: delta > 0 ? `+${delta.toFixed(2)}%` : `${delta.toFixed(2)}%`,
      up: delta >= 0,
    };
  });
  return (
    <div className="relative overflow-hidden border-y border-yellow-400/20 bg-black/60 py-2 font-mono text-[11px]">
      <div className="ticker-track flex gap-8 whitespace-nowrap">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="inline-flex items-center gap-1.5">
            <span className="text-yellow-300">{it.tag}</span>
            <span className={it.up ? 'text-emerald-400' : 'text-red-400'}>
              {it.delta}
            </span>
          </span>
        ))}
      </div>
      <style jsx>{`
        .ticker-track {
          animation: ticker 60s linear infinite;
        }
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
