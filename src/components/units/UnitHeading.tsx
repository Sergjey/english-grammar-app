interface UnitHeadingProps {
  title: string
  topic: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Use h1 for the topic on page-level headings (e.g. unit hub). */
  topicAs?: 'p' | 'h1'
  truncate?: boolean
}

const titleSize = {
  sm: 'text-base font-semibold',
  md: 'text-xl font-bold font-display',
  lg: 'text-2xl font-bold font-display',
}

const topicSize = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

/** title = Unit N, topic = grammar name (e.g. am / is / are) */
export function UnitHeading({
  title,
  topic,
  size = 'md',
  className = '',
  topicAs = 'p',
  truncate = false,
}: UnitHeadingProps) {
  const clip = truncate ? 'truncate' : ''
  const TopicTag = topicAs === 'h1' ? 'h1' : 'p'

  return (
    <div className={`min-w-0 ${className}`}>
      <p className={`${titleSize[size]} ${clip}`}>{title}</p>
      <TopicTag className={`${topicSize[size]} font-medium text-teal ${clip}`}>
        {topic}
      </TopicTag>
    </div>
  )
}
