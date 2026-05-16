import { useEffect, useState } from 'react'
import { loadUnitAsync } from '@/content/loadUnit'
import type { UnitContent } from '@/lib/types'

export function useUnit(unitId: string | undefined) {
  const [unit, setUnit] = useState<UnitContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!unitId) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(false)
    loadUnitAsync(unitId)
      .then((data) => {
        setUnit(data)
        if (!data) setError(true)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [unitId])

  return { unit, loading, error }
}
