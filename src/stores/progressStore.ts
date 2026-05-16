import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DrillCategory } from '@/lib/types'

export function progressKey(unitId: string, categoryId: DrillCategory): string {
  return `${unitId}:${categoryId}`
}

interface ProgressState {
  completedIds: Record<string, string[]>
  visibleBatches: Record<string, number>
  markComplete: (key: string, exerciseId: string) => void
  setVisibleBatch: (key: string, batch: number) => void
  getUnitProgress: (unitId: string, totalPerCategory: number) => number
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedIds: {},
      visibleBatches: {},

      markComplete: (key, exerciseId) =>
        set((state) => {
          const existing = state.completedIds[key] ?? []
          if (existing.includes(exerciseId)) return state
          return {
            completedIds: {
              ...state.completedIds,
              [key]: [...existing, exerciseId],
            },
          }
        }),

      setVisibleBatch: (key, batch) =>
        set((state) => ({
          visibleBatches: {
            ...state.visibleBatches,
            [key]: Math.max(state.visibleBatches[key] ?? 1, batch),
          },
        })),

      getUnitProgress: (unitId, totalExercisesInUnit) => {
        const state = get()
        const prefix = `${unitId}:`
        let done = 0
        for (const [key, ids] of Object.entries(state.completedIds)) {
          if (key.startsWith(prefix)) done += ids.length
        }
        if (totalExercisesInUnit === 0) return 0
        return Math.min(100, Math.round((done / totalExercisesInUnit) * 100))
      },
    }),
    { name: 'murphy-drills-progress' },
  ),
)
