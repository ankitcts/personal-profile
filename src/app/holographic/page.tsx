'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import {
  IDENTITY,
  SKILLS,
  ROLES,
  PROJECTS,
  CERTIFICATIONS,
  EDUCATION,
  STATS,
} from '@/lib/profile';
import { fmtRange } from '@/lib/utils';
import BootSequence from '@/components/holographic/BootSequence';
import Panel from '@/components/holographic/Panel';
import Crosslinks from '@/components/shared/Crosslinks';

const Scene = dynamic(() => import('@/components/holographic/Scene'), {
  ssr: false,
});

export default function HolographicPage() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="holo-scan relative min-h-screen overflow-x-hidden">
      <Scene />
      <div className="holo-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />

      {!booted && <BootSequence onDone={() => setBooted(true)} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto max-w-5xl px-6 py-16"
        style={{ perspective: 2000 }}
      >
        {/* Header / identity */}
        <header className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-holo-accent/80">
            // identity.dat
          </p>
          <h1 className="mt-3 text-5xl font-bold leading-[1.05] text-holo-glow text-glow sm:text-7xl">
            {IDENTITY.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{IDENTITY.title}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-slate-500">
            <span>{IDENTITY.city}</span>
            <a className="hover:text-holo-accent" href={`mailto:${IDENTITY.email}`}>
              {IDENTITY.email}
            </a>
            <a className="hover:text-holo-accent" href={`https://${IDENTITY.github}`} target="_blank" rel="noreferrer">
              {IDENTITY.github}
            </a>
            <a className="hover:text-holo-accent" href={`https://${IDENTITY.linkedin}`} target="_blank" rel="noreferrer">
              {IDENTITY.linkedin}
            </a>
          </div>
        </header>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { v: `${STATS.yearsExperience}+`, l: 'years experience' },
            { v: `${STATS.yearsAtGS}+`, l: 'years @ Goldman' },
            { v: `${STATS.releasesShipped}+`, l: 'releases shipped' },
            { v: `${STATS.productsShipped}+`, l: 'products shipped' },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded border border-holo-accent/30 bg-holo-panel/50 p-3 text-center backdrop-blur"
            >
              <div className="font-mono text-2xl font-bold text-holo-glow text-glow">
                {s.v}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-holo-accent/70">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Stacked panels */}
        <div className="space-y-6">
          <Panel title="profile.summary" index={1}>
            <ul className="space-y-3 text-sm text-slate-300">
              {IDENTITY.summary.map((p, i) => (
                <li key={i} className="leading-relaxed">
                  <span className="font-mono text-holo-accent">▸</span> {p}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="skill.matrix" index={2}>
            <div className="grid gap-4 sm:grid-cols-2">
              {SKILLS.map((s) => (
                <div key={s.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider" style={{ color: s.color }}>
                      {s.name}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      {Math.round(s.level * 100)}%
                    </span>
                  </div>
                  <div className="mb-2 h-1 overflow-hidden rounded bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full"
                      style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-300"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="experience.log" index={3}>
            <ol className="relative space-y-6 border-l border-holo-accent/30 pl-6">
              {ROLES.map((r, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[28px] top-1 inline-block h-2 w-2 rounded-full bg-holo-accent shadow-[0_0_10px_2px_rgba(34,211,238,0.6)]" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-base font-semibold text-slate-100">
                      {r.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-holo-accent/80">
                      {fmtRange(r.start, r.end)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-400">
                    {r.company}
                    {r.client && (
                      <span className="text-slate-500"> · {r.client}</span>
                    )}
                    <span className="text-slate-600"> · {r.location}</span>
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[13px] text-slate-300">
                    {r.bullets.map((b, j) => (
                      <li key={j} className="leading-relaxed">
                        <span className="text-holo-accent/60">·</span> {b}
                      </li>
                    ))}
                  </ul>
                  {r.platforms && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {r.platforms.map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-holo-accent/30 px-2 py-0.5 font-mono text-[10px] text-holo-accent"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title="independent.projects" index={4}>
            <div className="grid gap-3 sm:grid-cols-2">
              {PROJECTS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded border border-white/10 bg-white/[0.02] p-3 transition hover:border-holo-accent/50 hover:bg-white/[0.04]"
                >
                  <div className="font-mono text-xs text-holo-glow">{p.name}</div>
                  <p className="mt-1 text-[12px] text-slate-400">{p.blurb}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded bg-holo-accent/10 px-1.5 py-0.5 font-mono text-[9px] text-holo-accent"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </Panel>

          <Panel title="education.cert" index={5}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-wider text-holo-accent">
                  Education
                </h3>
                <ul className="space-y-3 text-sm">
                  {EDUCATION.map((e, i) => (
                    <li key={i}>
                      <div className="text-slate-200">{e.degree}</div>
                      <div className="text-xs text-slate-500">{e.school}</div>
                      <div className="font-mono text-[10px] text-holo-accent/80">{e.years}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-wider text-holo-accent">
                  Certifications
                </h3>
                <ul className="space-y-2 text-sm">
                  {CERTIFICATIONS.map((c, i) => (
                    <li key={i}>
                      <div className="text-slate-200">{c.title}</div>
                      <div className="font-mono text-[10px] text-slate-500">
                        {c.issuer} · {c.year}
                        {c.credential && ` · ${c.credential}`}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>
        </div>
      </motion.div>

      <Crosslinks />
    </main>
  );
}
