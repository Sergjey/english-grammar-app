import { useState } from 'react'
import type { DrillCategory, Exercise } from '@/lib/types'
import { SPEAKING_CATEGORIES } from '@/lib/types'
import { answersMatch } from '@/lib/normalizeAnswer'
import { useSpeech } from '@/hooks/useSpeech'
import { Button } from '@/components/ui/Button'

interface DrillRendererProps {
  categoryId: DrillCategory
  exercise: Exercise
  onSelfComplete?: () => void
  feedback: 'idle' | 'correct' | 'wrong'
  setFeedback: (f: 'idle' | 'correct' | 'wrong') => void
}

export function DrillRenderer({
  categoryId,
  exercise,
  onSelfComplete,
  feedback,
  setFeedback,
}: DrillRendererProps) {
  const { speak, stop, speaking, supported } = useSpeech()
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState('')
  const [retellPhase, setRetellPhase] = useState<'read' | 'retell'>('read')
  const [chunkIndex, setChunkIndex] = useState(0)
  const [timerLeft, setTimerLeft] = useState<number | null>(null)

  const isSpeaking = SPEAKING_CATEGORIES.includes(categoryId)
  const textToSpeak = exercise.audioText ?? String(exercise.answer)

  const checkWritten = () => {
    const ok = answersMatch(input || selected, exercise.answer)
    setFeedback(ok ? 'correct' : 'wrong')
    return ok
  }

  if (
    (categoryId === 'grammar' || categoryId === 'comprehensibleInput') &&
    exercise.options
  ) {
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium leading-relaxed">{exercise.prompt}</p>
        <p className="rounded-xl bg-white p-4 text-xl ring-1 ring-stone-200">
          {exercise.prompt.includes('___') ? exercise.prompt : `${exercise.prompt}`}
        </p>
        <div className="grid gap-2">
          {exercise.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelected(opt)}
              className={`touch-target rounded-xl px-4 py-3 text-left text-base ring-1 transition ${
                selected === opt
                  ? 'bg-teal/15 ring-teal'
                  : 'bg-white ring-stone-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {feedback !== 'idle' && (
          <p className={feedback === 'correct' ? 'text-correct' : 'text-wrong'}>
            {feedback === 'correct' ? 'Correct!' : `Expected: ${Array.isArray(exercise.answer) ? exercise.answer[0] : exercise.answer}`}
          </p>
        )}
        <Button onClick={checkWritten} fullWidth>
          Check
        </Button>
      </div>
    )
  }

  if (isSpeaking) {
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium">{exercise.prompt}</p>
        {(exercise.audioText || exercise.passage) && (
          <p className="rounded-xl bg-white p-4 text-lg leading-relaxed ring-1 ring-stone-200">
            {categoryId === 'retelling' && retellPhase === 'retell'
              ? '(Text hidden — retell from memory)'
              : exercise.passage ?? exercise.audioText}
          </p>
        )}
        {categoryId === 'retelling' && retellPhase === 'read' && (
          <Button onClick={() => setRetellPhase('retell')} fullWidth variant="secondary">
            Hide & retell
          </Button>
        )}
        {supported && (
          <Button
            onClick={() => (speaking ? stop() : speak(textToSpeak))}
            fullWidth
            variant="secondary"
          >
            {speaking ? 'Stop' : 'Play model'}
          </Button>
        )}
        {categoryId === 'timedSpeaking' && (
          <Button
            onClick={() => {
              const sec = exercise.timeLimitSec ?? 8
              setTimerLeft(sec)
              const id = setInterval(() => {
                setTimerLeft((t) => {
                  if (t === null || t <= 1) {
                    clearInterval(id)
                    return 0
                  }
                  return t - 1
                })
              }, 1000)
            }}
            fullWidth
            variant="secondary"
          >
            {timerLeft !== null ? `${timerLeft}s left` : 'Start timer'}
          </Button>
        )}
        {categoryId === 'chunking' && exercise.chunks && (
          <div className="flex flex-wrap gap-2">
            {exercise.chunks.map((chunk, i) => (
              <button
                key={chunk}
                type="button"
                onClick={() => setChunkIndex(i)}
                className={`touch-target rounded-lg px-3 py-2 text-base ${
                  chunkIndex === i ? 'bg-teal text-white' : 'bg-white ring-1 ring-stone-200'
                }`}
              >
                {chunk}
              </button>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(['Got it', 'Partially', 'Need replay'] as const).map((label) => (
            <Button
              key={label}
              variant={label === 'Got it' ? 'primary' : 'secondary'}
              onClick={() => {
                setFeedback('correct')
                onSelfComplete?.()
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium leading-relaxed">{exercise.prompt}</p>
      {exercise.pattern && (
        <p className="rounded-xl bg-teal/5 p-4 font-mono text-lg text-teal-dark ring-1 ring-teal/20">
          {exercise.pattern}
        </p>
      )}
      {exercise.transformFrom && (
        <p className="text-base text-muted">From: {exercise.transformFrom}</p>
      )}
      {exercise.passage && categoryId === 'comprehensibleInput' && (
        <p className="rounded-xl bg-white p-4 leading-relaxed ring-1 ring-stone-200">
          {exercise.passage}
        </p>
      )}
      {exercise.wordBank && (
        <div className="flex flex-wrap gap-2">
          {exercise.wordBank.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setInput((prev) => (prev ? `${prev} ${w}` : w))}
              className="touch-target rounded-lg bg-white px-3 py-2 text-base ring-1 ring-stone-200"
            >
              {w}
            </button>
          ))}
        </div>
      )}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your answer..."
        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-base outline-none focus:ring-2 focus:ring-teal"
      />
      {exercise.hint && feedback === 'wrong' && (
        <p className="text-sm text-amber">Hint: {exercise.hint}</p>
      )}
      {feedback !== 'idle' && (
        <p className={feedback === 'correct' ? 'text-correct font-medium' : 'text-wrong'}>
          {feedback === 'correct'
            ? 'Correct!'
            : `Expected: ${Array.isArray(exercise.answer) ? exercise.answer.join(' / ') : exercise.answer}`}
          {exercise.explanation && (
            <span className="mt-1 block text-sm text-muted">{exercise.explanation}</span>
          )}
        </p>
      )}
      <Button onClick={checkWritten} fullWidth>
        Check
      </Button>
    </div>
  )
}
