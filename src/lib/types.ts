export const DRILL_CATEGORIES = [
  'pattern',
  'substitution',
  'transformation',
  'sentence',
  'grammar',
  'speaking',
  'shadowing',
  'echoing',
  'chunking',
  'timedSpeaking',
  'retelling',
  'automaticity',
  'comprehensibleInput',
  'sentencePatterns',
] as const

export type DrillCategory = (typeof DRILL_CATEGORIES)[number]

export interface Exercise {
  id: string
  prompt: string
  pattern?: string
  substitutions?: string[]
  transformFrom?: string
  targetForm?: string
  chunks?: string[]
  audioText?: string
  timeLimitSec?: number
  passage?: string
  options?: string[]
  wordBank?: string[]
  answer: string | string[]
  hint?: string
  explanation?: string
}

export interface ExerciseBatch {
  batchIndex: 1 | 2 | 3 | 4 | 5
  items: Exercise[]
}

export interface CategoryPack {
  categoryId: DrillCategory
  batches: ExerciseBatch[]
}

export interface UnitContent {
  id: string
  number: number
  title: string
  topic: string
  summary: string
  categories: CategoryPack[]
}

export interface UnitManifestEntry {
  id: string
  number: number
  title: string
  topic: string
}

export interface Manifest {
  units: UnitManifestEntry[]
}

export const SPEAKING_CATEGORIES: DrillCategory[] = [
  'speaking',
  'shadowing',
  'echoing',
  'timedSpeaking',
  'retelling',
  'automaticity',
]
