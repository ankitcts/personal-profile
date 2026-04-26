'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';
import { VARIATIONS } from '@/lib/profile';
import { cn } from '@/lib/utils';

/**
 * Floating cross-links pinned bottom-right of every variation page.
 * Lets the visitor jump between the four experiences without going
 * back to the hub. Active variation is dimmed.
 */
export default function Crosslinks() {
  const pathname = usePathname() ?? '/';
  const here = pathname.replace(/^\//, '');

  return (
    <nav
      aria-label="Switch variation"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 py-1.5 text-[11px] backdrop-blur"
    >
      <Link
        href="/"
        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
        aria-label="Home"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      <span className="mx-0.5 h-4 w-px bg-white/10" aria-hidden />
      {VARIATIONS.map((v) => {
        const active = here === v.slug;
        return (
          <Link
            key={v.slug}
            href={`/${v.slug}`}
            className={cn(
              'inline-flex items-center rounded-full px-2.5 py-1 font-mono uppercase tracking-wider transition',
              active
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:bg-white/10 hover:text-white',
            )}
            style={{ color: active ? v.accent : undefined }}
            aria-current={active ? 'page' : undefined}
          >
            {v.slug.slice(0, 4)}
          </Link>
        );
      })}
    </nav>
  );
}
