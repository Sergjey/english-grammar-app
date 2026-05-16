import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useUnit } from '@/hooks/useUnit'
import { getCategoryMeta } from '@/lib/categories'
import type { DrillCategory, CategoryPack } from '@/lib/types'
import { DRILL_CATEGORIES } from '@/lib/types'
import { useExerciseSession } from '@/hooks/useExerciseSession'
import { DrillRenderer } from '@/components/drills/DrillRenderer'
import { Button } from '@/components/ui/Button'

function PracticeContent({
  unitId,
  cat,
  pack,
  unitTitle,
}: {
  unitId: string
  cat: DrillCategory
  pack: CategoryPack
  unitTitle: string
}) {
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const session = useExerciseSession(unitId, cat, pack)
  const meta = getCategoryMeta(cat)
  const {
    current,
    index,
    visibleBatch,
    loadMore,
    goNext,
    goPrev,
    atEnd,
    canLoadMore,
    totalLoaded,
    totalAvailable,
    markCurrentComplete,
  } = session

  const handleNext = () => {
    if (feedback === 'correct') markCurrentComplete()
    setFeedback('idle')
    goNext()
  }

  return (
    <div className="flex flex-col gap-4 pb-28">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm text-teal">{unitTitle}</p>
          <h1 className="font-display text-xl font-bold">{meta.label}</h1>
        </div>
        <span className="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-sm font-medium">
          {index + 1} / {totalLoaded}
        </span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full bg-teal transition-all"
          style={{ width: `${((index + 1) / totalLoaded) * 100}%` }}
        />
      </div>

      {current ? (
        <div className="rounded-2xl bg-white p-4 ring-1 ring-stone-200 md:p-6">
          <DrillRenderer
            key={current.id}
            categoryId={cat}
            exercise={current}
            feedback={feedback}
            setFeedback={setFeedback}
            onSelfComplete={markCurrentComplete}
          />
        </div>
      ) : (
        <p className="text-muted">No exercises loaded.</p>
      )}

      <div className="safe-bottom fixed bottom-0 left-0 right-0 border-t border-stone-200 bg-cream/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-col gap-2">
          {atEnd && canLoadMore && (
            <Button variant="secondary" fullWidth onClick={loadMore}>
              Load 10 more ({visibleBatch}/5 · {totalLoaded}/{totalAvailable})
            </Button>
          )}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              disabled={index === 0}
              onClick={() => {
                setFeedback('idle')
                goPrev()
              }}
            >
              Previous
            </Button>
            <Button className="flex-1" onClick={handleNext} disabled={!current}>
              {atEnd && !canLoadMore ? 'Done' : 'Next'}
            </Button>
          </div>
          <Link
            to={`/unit/${unitId}`}
            className="text-center text-sm text-muted underline"
          >
            Back to unit
          </Link>
        </div>
      </div>
    </div>
  )
}

export function PracticePage() {
  const { unitId, categoryId } = useParams<{
    unitId: string
    categoryId: string
  }>()
  const cat = categoryId as DrillCategory
  const { unit, loading, error } = useUnit(unitId)
  const validCat = DRILL_CATEGORIES.includes(cat)
  const pack = unit?.categories.find((c) => c.categoryId === cat)

  if (loading) return <p className="text-muted">Loading practice…</p>
  if (!unitId || !validCat || !unit || !pack || error) {
    return <p className="text-muted">Practice session not found.</p>
  }

  return (
    <PracticeContent
      unitId={unitId}
      cat={cat}
      pack={pack}
      unitTitle={unit.title}
    />
  )
}
