'use client';

import { useMemo } from 'react';
import { ROLES } from '@/lib/profile';

/**
 * 20-year activity heatmap. Each column is a year (2006 → present);
 * intensity = number of overlapping roles + a base "always-shipping" signal.
 * Inspired by GitHub's contribution graph.
 */
export default function Heatmap() {
  const cells = useMemo(() => {
    const startYear = 2006;
    const now = new Date();
    const endYear = now.getFullYear();
    const years: { year: number; intensity: number }[] = [];
    for (let y = startYear; y <= endYear; y++) {
      let count = 0;
      ROLES.forEach((r) => {
        const rs = Number(r.start.slice(0, 4));
        const re = r.end === 'Present' ? endYear : Number(r.end.slice(0, 4));
        if (y >= rs && y <= re) count++;
      });
      // Independent project boost from 2024
      if (y >= 2024) count += 2;
      years.push({ year: y, intensity: Math.min(count / 3, 1) });
    }
    return years;
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-px">
        {cells.map((c) => (
          <div
            key={c.year}
            className="group relative h-10 w-3 rounded-sm transition-all hover:scale-y-110"
            style={{
              background: `rgb(${34 + c.intensity * 100}, ${197 + c.intensity * 50}, ${94 + c.intensity * 100})`,
              opacity: 0.4 + c.intensity * 0.6,
              boxShadow: c.intensity > 0.6 ? `0 0 6px rgba(34,197,94,0.5)` : 'none',
            }}
          >
            <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-1.5 py-0.5 font-mono text-[9px] text-emerald-300 opacity-0 transition-opacity group-hover:opacity-100">
              {c.year}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-mono text-[9px] text-slate-500">
        <span>2006</span>
        <span>present</span>
      </div>
    </div>
  );
}
