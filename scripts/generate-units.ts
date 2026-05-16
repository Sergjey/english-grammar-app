import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { DRILL_CATEGORIES } from '../src/lib/types'
import type { DrillCategory, Exercise, UnitContent } from '../src/lib/types'

const CAT_PREFIX: Record<DrillCategory, string> = {
  pattern: 'pat',
  substitution: 'sub',
  transformation: 'tra',
  sentence: 'sen',
  grammar: 'gra',
  speaking: 'spk',
  shadowing: 'sha',
  echoing: 'ech',
  chunking: 'chu',
  timedSpeaking: 'tim',
  retelling: 'ret',
  automaticity: 'aut',
  comprehensibleInput: 'cin',
  sentencePatterns: 'stp',
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../src/content/units')

interface UnitConfig {
  id: string
  number: number
  title: string
  topic: string
  summary: string
  subjects: string[]
  verbs: string[]
  objects: string[]
  places: string[]
  modelBe: { subj: string; form: string }[]
  modelPresent: { subj: string; verb: string }[]
  modelPast: { subj: string; verb: string }[]
  modelCan: string[]
}

const UNITS: UnitConfig[] = [
  {
    id: 'unit-01',
    number: 1,
    title: 'Unit 1',
    topic: 'am / is / are',
    summary:
      'Use am, is, and are to describe states and identity. I am, he/she/it is, you/we/they are.',
    subjects: ['I', 'You', 'He', 'She', 'We', 'They', 'Tom', 'Anna'],
    verbs: ['am', 'is', 'are'],
    objects: ['happy', 'tired', 'at home', 'ready', 'students', 'from Canada'],
    places: ['at work', 'in the kitchen', 'at school'],
    modelBe: [
      { subj: 'I', form: 'am' },
      { subj: 'She', form: 'is' },
      { subj: 'They', form: 'are' },
    ],
    modelPresent: [],
    modelPast: [],
    modelCan: [],
  },
  {
    id: 'unit-02',
    number: 2,
    title: 'Unit 2',
    topic: 'am / is / are (questions)',
    summary:
      'Form yes/no questions and short answers with am, is, and are.',
    subjects: ['I', 'You', 'He', 'She', 'We', 'They'],
    verbs: ['Am', 'Is', 'Are'],
    objects: ['ready', 'late', 'okay', 'at the office'],
    places: ['here', 'there'],
    modelBe: [
      { subj: 'Is she', form: 'Yes, she is' },
      { subj: 'Are they', form: 'No, they are not' },
    ],
    modelPresent: [],
    modelPast: [],
    modelCan: [],
  },
  {
    id: 'unit-03',
    number: 3,
    title: 'Unit 3',
    topic: 'Present continuous',
    summary:
      'Use am/is/are + verb-ing for actions happening now or around now.',
    subjects: ['I', 'He', 'She', 'We', 'They'],
    verbs: ['working', 'studying', 'waiting', 'cooking', 'running'],
    objects: ['English', 'dinner', 'for the bus'],
    places: ['at the moment', 'right now'],
    modelBe: [],
    modelPresent: [
      { subj: 'I', verb: 'am studying' },
      { subj: 'She', verb: 'is cooking' },
    ],
    modelPast: [],
    modelCan: [],
  },
  {
    id: 'unit-04',
    number: 4,
    title: 'Unit 4',
    topic: 'Present simple',
    summary:
      'Use present simple for habits and facts. Add -s for he, she, it.',
    subjects: ['I', 'You', 'He', 'She', 'We', 'They'],
    verbs: ['work', 'works', 'live', 'lives', 'play', 'plays', 'study', 'studies'],
    objects: ['in London', 'tennis', 'every day'],
    places: ['near the park'],
    modelBe: [],
    modelPresent: [
      { subj: 'She', verb: 'works in London' },
      { subj: 'They', verb: 'play tennis' },
    ],
    modelPast: [],
    modelCan: [],
  },
  {
    id: 'unit-05',
    number: 5,
    title: 'Unit 5',
    topic: 'Present simple vs continuous',
    summary:
      'Choose simple for habits/facts and continuous for actions in progress.',
    subjects: ['I', 'He', 'She', 'They'],
    verbs: ['work', 'am working', 'reads', 'is reading'],
    objects: ['now', 'usually', 'every morning'],
    places: ['today', 'normally'],
    modelBe: [],
    modelPresent: [
      { subj: 'She usually', verb: 'works at home' },
      { subj: 'She', verb: 'is working now' },
    ],
    modelPast: [],
    modelCan: [],
  },
  {
    id: 'unit-06',
    number: 6,
    title: 'Unit 6',
    topic: 'have / has got',
    summary: 'Use have got / has got to describe possession and features.',
    subjects: ['I', 'You', 'He', 'She', 'We', 'They'],
    verbs: ['have got', 'has got'],
    objects: ['a car', 'blue eyes', 'two brothers', 'a new phone'],
    places: [],
    modelBe: [],
    modelPresent: [
      { subj: 'I', verb: 'have got a dog' },
      { subj: 'She', verb: 'has got a bike' },
    ],
    modelPast: [],
    modelCan: [],
  },
  {
    id: 'unit-07',
    number: 7,
    title: 'Unit 7',
    topic: 'was / were',
    summary: 'Use was/were for the past of be in statements and questions.',
    subjects: ['I', 'He', 'She', 'We', 'They', 'You'],
    verbs: ['was', 'were'],
    objects: ['at school', 'happy', 'late', 'friends'],
    places: ['yesterday', 'last night'],
    modelBe: [
      { subj: 'I', form: 'was' },
      { subj: 'They', form: 'were' },
    ],
    modelPresent: [],
    modelPast: [
      { subj: 'I', verb: 'was tired' },
      { subj: 'They', verb: 'were at home' },
    ],
    modelCan: [],
  },
  {
    id: 'unit-08',
    number: 8,
    title: 'Unit 8',
    topic: 'Past simple (regular)',
    summary: 'Form past simple with -ed for regular verbs.',
    subjects: ['I', 'He', 'She', 'We', 'They'],
    verbs: ['worked', 'played', 'watched', 'cleaned', 'visited'],
    objects: ['yesterday', 'last week'],
    places: ['in Paris'],
    modelBe: [],
    modelPresent: [],
    modelPast: [
      { subj: 'She', verb: 'worked late' },
      { subj: 'We', verb: 'visited Paris' },
    ],
    modelCan: [],
  },
  {
    id: 'unit-09',
    number: 9,
    title: 'Unit 9',
    topic: 'Past simple (irregular)',
    summary: 'Use common irregular past forms: went, saw, had, made, etc.',
    subjects: ['I', 'He', 'She', 'We', 'They'],
    verbs: ['went', 'saw', 'had', 'made', 'took', 'came'],
    objects: ['to the cinema', 'a film', 'lunch'],
    places: ['last Sunday'],
    modelBe: [],
    modelPresent: [],
    modelPast: [
      { subj: 'I', verb: 'went home' },
      { subj: 'She', verb: 'saw a film' },
    ],
    modelCan: [],
  },
  {
    id: 'unit-10',
    number: 10,
    title: 'Unit 10',
    topic: 'can / could',
    summary: 'Use can/could for ability and permission in the present and past.',
    subjects: ['I', 'He', 'She', 'We', 'They'],
    verbs: ['can swim', 'can drive', 'could read', 'could run'],
    objects: ['fast', 'when I was five'],
    places: [],
    modelBe: [],
    modelPresent: [],
    modelPast: [],
    modelCan: ['I can swim', 'She can drive', 'He could read at five'],
  },
]

function pick<T>(arr: T[], index: number): T {
  return arr[index % arr.length]!
}

function beForm(subj: string): string {
  const s = subj.toLowerCase()
  if (s === 'i') return 'am'
  if (['he', 'she', 'it', 'tom', 'anna'].includes(s)) return 'is'
  return 'are'
}

function genExercise(
  unit: UnitConfig,
  cat: DrillCategory,
  batch: number,
  idx: number,
): Exercise {
  const n = (batch - 1) * 10 + idx + 1
  const id = `${unit.id.replace('unit-', 'u')}-${CAT_PREFIX[cat]}-b${batch}-${String(idx + 1).padStart(2, '0')}`
  const subj = pick(unit.subjects, n)
  const obj = pick(unit.objects, n + 1)
  const place = pick(unit.places.length ? unit.places : ['here'], n)

  switch (cat) {
    case 'pattern': {
      const form = beForm(subj)
      const sentence =
        unit.modelPresent.length > 0
          ? `${subj} ${pick(unit.modelPresent, n).verb.split(' ').slice(1).join(' ') || pick(unit.verbs, n)}`
          : `${subj} ${form} ${obj}`
      return {
        id,
        prompt: `Complete the pattern for ${unit.topic}.`,
        pattern: `${subj} ___ ${obj}`,
        wordBank: unit.verbs.length ? unit.verbs : ['am', 'is', 'are'],
        answer: sentence.replace('___', form).includes('___')
          ? `${subj} ${form} ${obj}`
          : sentence,
        hint: `Use the correct form for "${subj}".`,
        explanation: unit.summary,
      }
    }
    case 'substitution': {
      const cue = pick(unit.subjects, n + 2)
      const form = beForm(cue)
      return {
        id,
        prompt: `Substitute the subject. Model: ${subj} ${form} ${obj}.`,
        pattern: `{Subject} + form + ${obj}`,
        substitutions: [cue],
        answer: `${cue} ${form} ${obj}`,
        explanation: `Change the subject to ${cue}.`,
      }
    }
    case 'transformation': {
      const from = `${subj} ${beForm(subj)} ${obj}`
      return {
        id,
        prompt: 'Make a yes/no question.',
        transformFrom: from,
        targetForm: 'question',
        answer: `${beForm(subj) === 'am' ? 'Am' : beForm(subj) === 'is' ? 'Is' : 'Are'} ${subj.toLowerCase()} ${obj}?`,
        hint: 'Invert the subject and verb.',
      }
    }
    case 'sentence': {
      const form = beForm(subj)
      return {
        id,
        prompt: 'Build the correct sentence.',
        wordBank: [subj, form, ...obj.split(' '), place].filter(Boolean),
        answer: `${subj} ${form} ${obj}`.trim(),
      }
    }
    case 'grammar': {
      const correct = beForm(subj)
      const wrong = correct === 'am' ? 'is' : correct === 'is' ? 'are' : 'am'
      const opts = [correct, wrong, 'be', 'was'].slice(0, 4)
      return {
        id,
        prompt: `${subj} ___ ${obj}.`,
        options: [...new Set(opts)],
        answer: correct,
      }
    }
    case 'speaking':
      return {
        id,
        prompt: 'Read aloud clearly.',
        audioText: `${subj} ${beForm(subj)} ${obj}.`,
        answer: `${subj} ${beForm(subj)} ${obj}.`,
      }
    case 'shadowing':
      return {
        id,
        prompt: 'Listen and shadow (repeat with the model).',
        audioText: `${subj} ${beForm(subj)} ${obj}.`,
        answer: `${subj} ${beForm(subj)} ${obj}.`,
      }
    case 'echoing':
      return {
        id,
        prompt: 'Echo after a short pause.',
        audioText: `${subj} ${beForm(subj)} ${obj}.`,
        answer: `${subj} ${beForm(subj)} ${obj}.`,
      }
    case 'chunking': {
      const text = `${subj} / ${beForm(subj)} / ${obj}`
      return {
        id,
        prompt: 'Speak in three chunks.',
        chunks: text.split(' / '),
        answer: text.replace(/\s*\/\s*/g, ' '),
      }
    }
    case 'timedSpeaking':
      return {
        id,
        prompt: 'Say the sentence within the time limit.',
        audioText: `${subj} ${beForm(subj)} ${obj}.`,
        timeLimitSec: 8,
        answer: `${subj} ${beForm(subj)} ${obj}.`,
      }
    case 'retelling':
      return {
        id,
        prompt: 'Read, then retell in your own words.',
        passage: `${subj} ${beForm(subj)} ${obj} ${place}. It is about ${unit.topic}.`,
        answer: `${subj} ${beForm(subj)} ${obj}`,
      }
    case 'automaticity':
      return {
        id,
        prompt: 'Repeat quickly three times.',
        audioText: `${subj} ${beForm(subj)} ${obj}.`,
        answer: `${subj} ${beForm(subj)} ${obj}.`,
      }
    case 'comprehensibleInput':
      return {
        id,
        prompt: 'Read and answer.',
        passage: `${subj} ${beForm(subj)} ${obj}. This practices ${unit.topic}.`,
        options: [unit.topic, 'past perfect', 'future will'],
        answer: unit.topic,
      }
    case 'sentencePatterns':
      return {
        id,
        prompt: `Use the pattern: ${unit.topic}.`,
        pattern: `Subject + ${unit.verbs[0] ?? 'verb'} + complement`,
        answer: `${subj} ${beForm(subj)} ${obj}`,
        explanation: unit.summary,
      }
    default:
      return {
        id,
        prompt: 'Practice item.',
        answer: `${subj} ${obj}`,
      }
  }
}

function buildUnit(config: UnitConfig): UnitContent {
  const categories = DRILL_CATEGORIES.map((categoryId) => ({
    categoryId,
    batches: ([1, 2, 3, 4, 5] as const).map((batchIndex) => ({
      batchIndex,
      items: Array.from({ length: 10 }, (_, i) =>
        genExercise(config, categoryId, batchIndex, i),
      ),
    })),
  }))

  return {
    id: config.id,
    number: config.number,
    title: config.title,
    topic: config.topic,
    summary: config.summary,
    categories,
  }
}

mkdirSync(outDir, { recursive: true })

for (const unitConfig of UNITS) {
  const unit = buildUnit(unitConfig)
  const path = join(outDir, `${unitConfig.id}.json`)
  writeFileSync(path, JSON.stringify(unit, null, 2))
  console.log(`Wrote ${path}`)
}

console.log(`Generated ${UNITS.length} units × 14 categories × 50 exercises.`)
