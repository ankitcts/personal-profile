'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import {
  IDENTITY,
  ROLES,
  PROJECTS,
  SKILLS,
  CERTIFICATIONS,
  EDUCATION,
} from '@/lib/profile';
import { fmtRange } from '@/lib/utils';
import type { WorkspaceObject } from './Desk';

const TITLES: Record<NonNullable<WorkspaceObject>, string> = {
  resume: '📄 Full Resume',
  photo: '👋 About Ankit',
  keyboard: '⌨ Tech Stack',
  monitor: '🖥 Experience',
  mug: '☕ Independent Projects',
};

export default function PanelOverlay({
  active,
  onClose,
}: {
  active: WorkspaceObject;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4 backdrop-blur"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, rotateX: 8 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.9, y: 20, rotateX: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative max-h-[85vh] w-[min(820px,95vw)] overflow-hidden rounded-xl border border-amber-400/40 bg-gradient-to-b from-amber-50/95 to-amber-100/95 text-stone-900 shadow-[0_30px_80px_-20px_rgba(251,191,36,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="sticky top-0 flex items-center justify-between border-b border-amber-700/20 bg-amber-100/95 px-6 py-3 backdrop-blur">
              <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-amber-900">
                {TITLES[active]}
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-amber-700/10"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </header>
            <div className="scrollbar-thin max-h-[calc(85vh-3.5rem)] overflow-y-auto px-6 py-5">
              {active === 'photo' && <AboutPanel />}
              {active === 'monitor' && <ExperiencePanel />}
              {active === 'keyboard' && <StackPanel />}
              {active === 'mug' && <ProjectsPanel />}
              {active === 'resume' && <ResumePanel />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AboutPanel() {
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <h3 className="text-2xl font-bold">{IDENTITY.name}</h3>
      <p className="text-stone-700">{IDENTITY.title}</p>
      <p className="text-xs text-stone-600">
        {IDENTITY.city} · {IDENTITY.email} · {IDENTITY.phone}
      </p>
      {IDENTITY.summary.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function ExperiencePanel() {
  return (
    <div className="space-y-5 text-sm">
      {ROLES.map((r, i) => (
        <article key={i} className="border-l-2 border-amber-700/30 pl-4">
          <h3 className="font-semibold">{r.title}</h3>
          <p className="text-xs text-stone-600">
            {r.company}
            {r.client && ` · ${r.client}`} · {r.location}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-amber-800">
            {fmtRange(r.start, r.end)}
          </p>
          <ul className="mt-2 space-y-1.5 text-[13px] text-stone-700">
            {r.bullets.map((b, j) => (
              <li key={j}>· {b}</li>
            ))}
          </ul>
          {r.platforms && (
            <div className="mt-2 flex flex-wrap gap-1">
              {r.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-amber-700/10 px-2 py-0.5 text-[10px] text-amber-900"
                >
                  {p}
                </span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function StackPanel() {
  return (
    <div className="space-y-4 text-sm">
      {SKILLS.map((s) => (
        <div key={s.name}>
          <h4 className="mb-1 font-mono text-xs uppercase tracking-wider" style={{ color: s.color }}>
            {s.name}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {s.items.map((it) => (
              <span
                key={it}
                className="rounded border bg-white px-2 py-0.5 font-mono text-[11px]"
                style={{ borderColor: s.color + '60', color: '#1c1917' }}
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div className="space-y-3 text-sm">
      {PROJECTS.map((p) => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg border border-amber-700/20 bg-white/70 p-3 transition hover:bg-white"
        >
          <h4 className="font-semibold">{p.name}</h4>
          <p className="mt-0.5 text-[13px] text-stone-700">{p.blurb}</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded bg-amber-700/10 px-1.5 py-0.5 font-mono text-[10px] text-amber-900"
              >
                {s}
              </span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}

function ResumePanel() {
  return (
    <div className="space-y-6 text-sm">
      <AboutPanel />
      <hr className="border-amber-700/20" />
      <div>
        <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wider text-amber-900">
          Experience
        </h3>
        <ExperiencePanel />
      </div>
      <hr className="border-amber-700/20" />
      <div>
        <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wider text-amber-900">
          Tech stack
        </h3>
        <StackPanel />
      </div>
      <hr className="border-amber-700/20" />
      <div>
        <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wider text-amber-900">
          Independent projects
        </h3>
        <ProjectsPanel />
      </div>
      <hr className="border-amber-700/20" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wider text-amber-900">
            Education
          </h3>
          <ul className="space-y-2">
            {EDUCATION.map((e, i) => (
              <li key={i}>
                <div className="text-stone-900">{e.degree}</div>
                <div className="text-xs text-stone-600">{e.school}</div>
                <div className="font-mono text-[10px] text-amber-800">{e.years}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wider text-amber-900">
            Certifications
          </h3>
          <ul className="space-y-2">
            {CERTIFICATIONS.map((c, i) => (
              <li key={i}>
                <div className="text-stone-900">{c.title}</div>
                <div className="font-mono text-[10px] text-stone-600">
                  {c.issuer} · {c.year}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
