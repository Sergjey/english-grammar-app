interface UnitHeadingProps {
  title: string
  topic: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
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
}: UnitHeadingProps) {
  return (
    <div className={className}>
      <p className={titleSize[size]}>{title}</p>
      <p className={`${topicSize[size]} font-medium text-teal`}>{topic}</p>
    </div>
  )
}
