import { IDENTITY, STATS, VARIATIONS } from '@/lib/profile';
import VariationLink from '@/components/shared/VariationLink';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated grid backdrop */}
      <div className="holo-grid absolute inset-0 -z-10 opacity-40" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(34,211,238,0.08), transparent 60%)',
        }}
      />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12 sm:px-10">
        {/* Header */}
        <header className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400/80">
            // profile · 4 variations
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-6xl">
            {IDENTITY.name}
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg max-w-3xl">
            {IDENTITY.title}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {IDENTITY.city} · <a className="hover:text-cyan-300" href={`mailto:${IDENTITY.email}`}>{IDENTITY.email}</a> · <a className="hover:text-cyan-300" href={`https://${IDENTITY.github}`} target="_blank" rel="noreferrer">{IDENTITY.github}</a> · <a className="hover:text-cyan-300" href={`https://${IDENTITY.linkedin}`} target="_blank" rel="noreferrer">{IDENTITY.linkedin}</a>
          </p>

          {/* Stats strip */}
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Years experience" value={`${STATS.yearsExperience}+`} />
            <Stat label="Years at Goldman" value={`${STATS.yearsAtGS}+`} />
            <Stat label="Releases shipped" value={`${STATS.releasesShipped}+`} />
            <Stat label="Products shipped" value={`${STATS.productsShipped}+`} />
          </dl>
        </header>

        {/* Pick a variation */}
        <section className="flex-1">
          <h2 className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
            // pick a variation
          </h2>
          <p className="mb-6 text-sm text-slate-400">
            Same content, four engineering experiments. Each is a complete
            self-contained world rendering from the same typed resume data.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {VARIATIONS.map((v, i) => (
              <VariationLink key={v.slug} {...v} index={i} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/5 pt-6 font-mono text-[11px] text-slate-500">
          <p>
            All four variations source from a single typed resume layer
            (<code className="text-cyan-400">src/lib/profile.ts</code>). Stack:
            Next.js 16 · React 19 · TypeScript · Tailwind · @react-three/fiber.
            Source: <a className="hover:text-cyan-300" href="https://github.com/ankitcts/personal-profile" target="_blank" rel="noreferrer">github.com/ankitcts/personal-profile</a>.
          </p>
        </footer>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-2xl font-bold text-cyan-300">
        {value}
      </dd>
    </div>
  );
}
