import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { unitContentSchema, manifestSchema } from '../src/content/schema'

const __dirname = dirname(fileURLToPath(import.meta.url))
const contentDir = join(__dirname, '../src/content')
const unitsDir = join(contentDir, 'units')

const manifest = manifestSchema.parse(
  JSON.parse(readFileSync(join(contentDir, 'manifest.json'), 'utf-8')),
)

const unitFiles = readdirSync(unitsDir).filter((f) => f.endsWith('.json'))
const ids = new Set<string>()
let errors = 0

for (const file of unitFiles) {
  const data = JSON.parse(readFileSync(join(unitsDir, file), 'utf-8'))
  const result = unitContentSchema.safeParse(data)
  if (!result.success) {
    console.error(`FAIL ${file}:`, result.error.message)
    errors++
    continue
  }
  const unit = result.data
  for (const pack of unit.categories) {
    for (const batch of pack.batches) {
      for (const ex of batch.items) {
        if (ids.has(ex.id)) {
          console.error(`Duplicate id: ${ex.id}`)
          errors++
        }
        ids.add(ex.id)
      }
    }
  }
  console.log(`OK ${file} — ${unit.categories.length} categories`)
}

const manifestIds = new Set(manifest.units.map((u) => u.id))
for (const file of unitFiles) {
  const id = file.replace('.json', '')
  if (!manifestIds.has(id)) {
    console.error(`Unit file ${id} not in manifest`)
    errors++
  }
}

if (errors > 0) {
  console.error(`Validation failed with ${errors} error(s).`)
  process.exit(1)
}

console.log(`All ${unitFiles.length} units valid. ${ids.size} unique exercises.`)
