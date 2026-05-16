import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-teal text-white hover:bg-teal-dark active:scale-[0.98] disabled:opacity-50',
  secondary:
    'bg-white text-ink ring-1 ring-stone-200 hover:bg-stone-50 disabled:opacity-50',
  ghost: 'bg-transparent text-teal hover:bg-teal/10',
}

export function Button({
  variant = 'primary',
  fullWidth,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`touch-target rounded-xl px-5 py-3 text-base font-semibold transition ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
