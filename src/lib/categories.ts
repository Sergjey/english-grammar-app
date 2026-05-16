import type { DrillCategory } from './types'

export interface CategoryMeta {
  id: DrillCategory
  label: string
  shortLabel: string
  description: string
  icon: string
}

export const CATEGORY_META: CategoryMeta[] = [
  {
    id: 'pattern',
    label: 'Pattern Drills',
    shortLabel: 'Pattern',
    description: 'Repeat frames with slot filling',
    icon: '▦',
  },
  {
    id: 'substitution',
    label: 'Substitution',
    shortLabel: 'Substitute',
    description: 'Swap cue words in a model',
    icon: '⇄',
  },
  {
    id: 'transformation',
    label: 'Transformation',
    shortLabel: 'Transform',
    description: 'Rewrite in a new form',
    icon: '↻',
  },
  {
    id: 'sentence',
    label: 'Sentence Drills',
    shortLabel: 'Sentence',
    description: 'Build complete sentences',
    icon: '✎',
  },
  {
    id: 'grammar',
    label: 'Grammar Drills',
    shortLabel: 'Grammar',
    description: 'Choose the correct form',
    icon: '✓',
  },
  {
    id: 'speaking',
    label: 'Speaking',
    shortLabel: 'Speaking',
    description: 'Read aloud and self-check',
    icon: '🎤',
  },
  {
    id: 'shadowing',
    label: 'Shadowing',
    shortLabel: 'Shadow',
    description: 'Listen and repeat in sync',
    icon: '〰',
  },
  {
    id: 'echoing',
    label: 'Echoing',
    shortLabel: 'Echo',
    description: 'Repeat after a short delay',
    icon: '◉',
  },
  {
    id: 'chunking',
    label: 'Chunking',
    shortLabel: 'Chunks',
    description: 'Group words into phrases',
    icon: '▭',
  },
  {
    id: 'timedSpeaking',
    label: 'Timed Speaking',
    shortLabel: 'Timed',
    description: 'Speak within the time limit',
    icon: '⏱',
  },
  {
    id: 'retelling',
    label: 'Retelling',
    shortLabel: 'Retell',
    description: 'Read, hide, then retell',
    icon: '📖',
  },
  {
    id: 'automaticity',
    label: 'Automaticity',
    shortLabel: 'Auto',
    description: 'Rapid-fire repetition',
    icon: '⚡',
  },
  {
    id: 'comprehensibleInput',
    label: 'Comprehensible Input',
    shortLabel: 'Input',
    description: 'Short text + comprehension',
    icon: '📄',
  },
  {
    id: 'sentencePatterns',
    label: 'Sentence Patterns',
    shortLabel: 'Patterns',
    description: 'Label and use structures',
    icon: '◇',
  },
]

export function getCategoryMeta(id: DrillCategory): CategoryMeta {
  const meta = CATEGORY_META.find((c) => c.id === id)
  if (!meta) throw new Error(`Unknown category: ${id}`)
  return meta
}
