import { Link, useParams } from 'react-router-dom'
import manifest from '@/content/manifest.json'
import { UnitHeading } from '@/components/units/UnitHeading'
import { useUnit } from '@/hooks/useUnit'
import { CATEGORY_META } from '@/lib/categories'
import { progressKey, useProgressStore } from '@/stores/progressStore'

export function UnitHubPage() {
  const { unitId } = useParams<{ unitId: string }>()
  const meta = manifest.units.find((u) => u.id === unitId)
  const { unit, loading, error } = useUnit(unitId)
  const completedIds = useProgressStore((s) => s.completedIds)

  if (loading) {
    return <p className="text-muted">Loading unit…</p>
  }

  if (!meta || !unit || error) {
    return <p className="text-muted">Unit not found.</p>
  }

  return (
    <div className="space-y-6">
      <div>
        <UnitHeading title={meta.title} topic={meta.topic} size="lg" />
        <p className="mt-3 text-base leading-relaxed text-muted">{unit.summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {CATEGORY_META.map((cat) => {
          const key = progressKey(unit.id, cat.id)
          const done = (completedIds[key] ?? []).length
          return (
            <Link
              key={cat.id}
              to={`/practice/${unit.id}/${cat.id}`}
              className="flex min-h-[100px] flex-col justify-between rounded-2xl bg-white p-3 ring-1 ring-stone-200 transition hover:ring-teal"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="mt-2 text-sm font-semibold leading-tight">
                {cat.shortLabel}
              </span>
              <span className="text-xs text-muted">{done}/50</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
