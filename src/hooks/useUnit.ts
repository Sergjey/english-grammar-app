import { useEffect, useState } from 'react'
import { loadUnitAsync } from '@/content/loadUnit'
import type { UnitContent } from '@/lib/types'

export function useUnit(unitId: string | undefined) {
  const [unit, setUnit] = useState<UnitContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!unitId) {
      setUnit(null)
      setError(false)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(false)
    loadUnitAsync(unitId)
      .then((data) => {
        if (cancelled) return
        setUnit(data)
        if (!data) setError(true)
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [unitId])

  return { unit, loading, error }
}
