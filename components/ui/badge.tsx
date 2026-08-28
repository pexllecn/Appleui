import { cx } from "@/utils/cx"

type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info"

const tones: Record<Tone, string> = {
  neutral: "bg-fill-tertiary text-fg-secondary",
  accent: "bg-accent-subtle text-accent",
  success: "bg-success-subtle text-success-fg",
  warning: "bg-warning-subtle text-warning-fg",
  danger: "bg-danger-subtle text-danger-fg",
  info: "bg-info-subtle text-info-fg",
}

export function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
}: {
  tone?: Tone
  dot?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5",
        "text-caption1 font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {dot ? <span className="size-1.5 rounded-full bg-current" aria-hidden /> : null}
      {children}
    </span>
  )
}
