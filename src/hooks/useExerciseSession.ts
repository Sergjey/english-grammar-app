import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CategoryPack, DrillCategory, Exercise } from '@/lib/types'
import { progressKey, useProgressStore } from '@/stores/progressStore'

export function useExerciseSession(
  unitId: string,
  categoryId: DrillCategory,
  pack: CategoryPack,
) {
  const key = progressKey(unitId, categoryId)
  const visibleBatch = useProgressStore((s) => s.visibleBatches[key] ?? 1)
  const setVisibleBatch = useProgressStore((s) => s.setVisibleBatch)
  const markComplete = useProgressStore((s) => s.markComplete)
  const exercises = useMemo(() => {
    const batches = pack.batches.filter((b) => b.batchIndex <= visibleBatch)
    return batches.flatMap((b) => b.items)
  }, [pack, visibleBatch])

  const [index, setIndex] = useState(0)
  const current = exercises[index] as Exercise | undefined

  useEffect(() => {
    setIndex(0)
  }, [unitId, categoryId])

  const loadMore = useCallback(() => {
    if (visibleBatch < 5) setVisibleBatch(key, visibleBatch + 1)
  }, [key, setVisibleBatch, visibleBatch])

  const goNext = useCallback(() => {
    if (current) markComplete(key, current.id)
    setIndex((i) => {
      if (exercises.length === 0) return 0
      return Math.min(i + 1, exercises.length - 1)
    })
  }, [current, exercises.length, key, markComplete])

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0))
  }, [])

  const atEnd = index >= exercises.length - 1
  const canLoadMore = visibleBatch < 5
  const totalLoaded = exercises.length
  const totalAvailable = 50

  return {
    current,
    index,
    exercises,
    visibleBatch,
    loadMore,
    goNext,
    goPrev,
    atEnd,
    canLoadMore,
    totalLoaded,
    totalAvailable,
    markCurrentComplete: () => current && markComplete(key, current.id),
  }
}
