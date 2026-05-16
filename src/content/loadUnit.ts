import type { UnitContent } from '@/lib/types'

const unitLoaders = import.meta.glob<{ default: UnitContent }>(
  './units/unit-*.json',
)

const cache = new Map<string, UnitContent>()

export async function loadUnitAsync(unitId: string): Promise<UnitContent | null> {
  const cached = cache.get(unitId)
  if (cached) return cached

  const path = `./units/${unitId}.json`
  const loader = unitLoaders[path]
  if (!loader) return null

  const mod = await loader()
  const unit = mod.default
  cache.set(unitId, unit)
  return unit
}

/** Sync access only after unit was loaded (e.g. from cache). */
export function getCachedUnit(unitId: string): UnitContent | null {
  return cache.get(unitId) ?? null
}
