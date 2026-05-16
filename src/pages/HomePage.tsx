import { Link } from 'react-router-dom'
import manifest from '@/content/manifest.json'
import { Button } from '@/components/ui/Button'

export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          English grammar drills
        </h1>
        <p className="text-base leading-relaxed text-muted md:text-lg">
          Pattern, substitution, transformation, speaking, shadowing, and more —
          organised by unit. Practice in batches of 10 and load up to 50 per
          category.
        </p>
        <Link to="/units" className="inline-block">
          <Button>Browse units</Button>
        </Link>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          Quick start
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
          {manifest.units.map((unit) => (
            <Link
              key={unit.id}
              to={`/unit/${unit.id}`}
              className="touch-target shrink-0 snap-start rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-stone-200 transition hover:ring-teal"
            >
              <span className="text-muted">{unit.number} ·</span> {unit.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-4 ring-1 ring-stone-200">
        <h2 className="font-display text-lg font-semibold">Drill types</h2>
        <p className="mt-2 text-sm text-muted">
          14 categories including pattern drills, chunking, timed speaking,
          retelling, comprehensible input, and automaticity practice.
        </p>
      </section>
    </div>
  )
}
