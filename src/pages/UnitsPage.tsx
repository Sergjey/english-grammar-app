import { Link } from 'react-router-dom'
import manifest from '@/content/manifest.json'
import { UnitHeading } from '@/components/units/UnitHeading'
import { useProgressStore } from '@/stores/progressStore'

const TOTAL_PER_CATEGORY = 50
const CATEGORIES_COUNT = 14

export function UnitsPage() {
  const getUnitProgress = useProgressStore((s) => s.getUnitProgress)

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold">Units</h1>
      <p className="text-muted">10 pilot units — grammar topic under each unit name</p>
      <ul className="space-y-3">
        {manifest.units.map((unit) => {
          const pct = getUnitProgress(
            unit.id,
            TOTAL_PER_CATEGORY * CATEGORIES_COUNT,
          )
          return (
            <li key={unit.id}>
              <Link
                to={`/unit/${unit.id}`}
                className="flex touch-target items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-stone-200 transition hover:ring-teal"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal/10 font-display text-lg font-semibold text-teal">
                  {unit.number}
                </span>
                <span className="min-w-0 flex-1">
                  <UnitHeading title={unit.title} topic={unit.topic} size="sm" />
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-stone-100">
                    <span
                      className="block h-full rounded-full bg-teal transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                </span>
                <span className="text-sm font-medium text-muted">{pct}%</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
