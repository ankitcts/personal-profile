'use client';

import { motion } from 'motion/react';
import { ExternalLink, Mail, MapPin, Github, Linkedin } from 'lucide-react';
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
import Panel from '@/components/dashboard/Panel';
import Heatmap from '@/components/dashboard/Heatmap';
import Ticker from '@/components/dashboard/Ticker';
import Crosslinks from '@/components/shared/Crosslinks';

export default function DashboardPage() {
  return (
    <main className="terminal-grid relative min-h-screen bg-terminal-bg">
      {/* Header bar */}
      <header className="sticky top-0 z-30 border-b border-yellow-400/30 bg-terminal-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-2 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-yellow-300">PROFILE-TERM v1.0</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">{IDENTITY.name.toUpperCase()}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">{IDENTITY.city.toUpperCase()}</span>
          </div>
          <div className="hidden items-center gap-4 text-slate-400 sm:flex">
            <a href={`mailto:${IDENTITY.email}`} className="hover:text-yellow-300">
              <Mail className="h-3.5 w-3.5" />
            </a>
            <a href={`https://${IDENTITY.github}`} target="_blank" rel="noreferrer" className="hover:text-yellow-300">
              <Github className="h-3.5 w-3.5" />
            </a>
            <a href={`https://${IDENTITY.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-yellow-300">
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        <Ticker />
      </header>

      {/* Main grid with 3D tilt container */}
      <div
        className="mx-auto max-w-[1600px] px-4 py-6"
        style={{ perspective: 1800 }}
      >
        <motion.div
          initial={{ rotateX: 8, rotateY: -2 }}
          animate={{ rotateX: 4, rotateY: -1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="grid grid-cols-1 gap-3 lg:grid-cols-12"
        >
          {/* KPI strip */}
          <div className="grid grid-cols-2 gap-2 lg:col-span-12 lg:grid-cols-4">
            <Kpi label="Years experience" value={`${STATS.yearsExperience}+`} delta="+1.0" />
            <Kpi label="Years at Goldman Sachs" value={`${STATS.yearsAtGS}+`} delta="+0.8" />
            <Kpi label="Releases shipped" value={`${STATS.releasesShipped}+`} delta="+5" />
            <Kpi label="Products shipped" value={`${STATS.productsShipped}+`} delta="+2" />
          </div>

          {/* Identity panel */}
          <Panel title="profile.identity" index="P1" className="lg:col-span-7">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              {IDENTITY.name}
            </h1>
            <p className="mt-2 text-sm text-slate-400">{IDENTITY.title}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {IDENTITY.city}
              </span>
              <a className="hover:text-yellow-300" href={`mailto:${IDENTITY.email}`}>
                {IDENTITY.email}
              </a>
              <span>{IDENTITY.phone}</span>
            </p>
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300">
              {IDENTITY.summary.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Panel>

          {/* Activity heatmap */}
          <Panel title="career.activity-heatmap" index="P2" className="lg:col-span-5">
            <p className="mb-3 text-xs text-slate-500">
              20-year shipping cadence — hover any column for the year.
            </p>
            <Heatmap />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <Mini label="Languages" value="3" />
              <Mini label="Skill domains" value={`${SKILLS.length}`} />
              <Mini label="Independent projects" value={`${PROJECTS.length}`} />
            </div>
          </Panel>

          {/* Skills */}
          <Panel title="skill.matrix" index="P3" className="lg:col-span-5">
            <div className="space-y-3">
              {SKILLS.map((s) => (
                <div key={s.name}>
                  <div className="mb-1 flex items-center justify-between font-mono text-[11px]">
                    <span style={{ color: s.color }}>{s.name}</span>
                    <span className="text-slate-500">{Math.round(s.level * 100)}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full"
                      style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Experience timeline */}
          <Panel title="experience.timeline" index="P4" className="lg:col-span-7">
            <ol className="relative space-y-4 border-l border-yellow-400/20 pl-5">
              {ROLES.map((r, i) => (
                <li key={i}>
                  <span className="absolute -left-[7px] mt-1 inline-block h-3 w-3 rounded-full border-2 border-yellow-400 bg-terminal-panel" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-sm font-semibold text-white">{r.title}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-yellow-300">
                      {fmtRange(r.start, r.end)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {r.company}
                    {r.client && ` · ${r.client}`} · {r.location}
                  </p>
                  <ul className="mt-1.5 space-y-1 text-[12px] text-slate-300">
                    {r.bullets.slice(0, 3).map((b, j) => (
                      <li key={j} className="leading-snug">
                        <span className="text-yellow-400/60">·</span> {b}
                      </li>
                    ))}
                    {r.bullets.length > 3 && (
                      <li className="text-xs italic text-slate-500">
                        + {r.bullets.length - 3} more
                      </li>
                    )}
                  </ul>
                </li>
              ))}
            </ol>
          </Panel>

          {/* Projects */}
          <Panel title="independent.projects" index="P5" className="lg:col-span-12">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PROJECTS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative rounded border border-yellow-400/15 bg-black/40 p-3 transition hover:border-yellow-400/50"
                >
                  <div className="mb-1.5 flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white">{p.name}</h4>
                    <ExternalLink className="h-3 w-3 shrink-0 text-slate-500 group-hover:text-yellow-300" />
                  </div>
                  <p className="line-clamp-3 text-[11px] text-slate-400">{p.blurb}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded bg-yellow-400/10 px-1.5 py-0.5 font-mono text-[9px] text-yellow-300"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="font-mono text-[9px] text-slate-500">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </Panel>

          {/* Education + Certifications side-by-side */}
          <Panel title="education" index="P6" className="lg:col-span-6">
            <ul className="space-y-2 text-sm">
              {EDUCATION.map((e, i) => (
                <li key={i}>
                  <div className="text-slate-200">{e.degree}</div>
                  <div className="text-xs text-slate-500">{e.school}</div>
                  <div className="font-mono text-[10px] text-yellow-300">{e.years}</div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="certifications" index="P7" className="lg:col-span-6">
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
          </Panel>
        </motion.div>

        <footer className="mt-8 pb-4 font-mono text-[10px] text-slate-600">
          PROFILE-TERM v1.0 · all data sourced from src/lib/profile.ts
        </footer>
      </div>

      <Crosslinks />
    </main>
  );
}

function Kpi({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded border border-yellow-400/20 bg-terminal-panel/90 p-3">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          {label}
        </span>
        <span className="font-mono text-[10px] text-emerald-400">{delta}</span>
      </div>
      <div className="mt-0.5 font-mono text-2xl font-bold text-yellow-300">
        {value}
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-yellow-400/15 bg-black/40 p-2">
      <div className="font-mono text-lg font-bold text-yellow-300">{value}</div>
      <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
    </div>
  );
}
