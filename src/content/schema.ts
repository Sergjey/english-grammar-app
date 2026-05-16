import { z } from 'zod'
import { DRILL_CATEGORIES } from '../lib/types'

const drillCategorySchema = z.enum(DRILL_CATEGORIES)

const exerciseSchema = z.object({
  id: z.string().min(1),
  prompt: z.string().min(1),
  pattern: z.string().optional(),
  substitutions: z.array(z.string()).optional(),
  transformFrom: z.string().optional(),
  targetForm: z.string().optional(),
  chunks: z.array(z.string()).optional(),
  audioText: z.string().optional(),
  timeLimitSec: z.number().optional(),
  passage: z.string().optional(),
  options: z.array(z.string()).optional(),
  wordBank: z.array(z.string()).optional(),
  answer: z.union([z.string(), z.array(z.string())]),
  hint: z.string().optional(),
  explanation: z.string().optional(),
})

const exerciseBatchSchema = z.object({
  batchIndex: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  items: z.array(exerciseSchema).length(10),
})

const categoryPackSchema = z.object({
  categoryId: drillCategorySchema,
  batches: z.array(exerciseBatchSchema).length(5),
})

export const unitContentSchema = z.object({
  id: z.string(),
  number: z.number().int().positive(),
  title: z.string(),
  topic: z.string(),
  summary: z.string(),
  categories: z.array(categoryPackSchema).length(14),
})

export const manifestSchema = z.object({
  units: z.array(
    z.object({
      id: z.string(),
      number: z.number(),
      title: z.string(),
      topic: z.string(),
    }),
  ),
})
