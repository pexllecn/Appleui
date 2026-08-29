import { cx } from "@/utils/cx"

/** The +8.4% / −3.1% pill. Sign drives the tone, so callers pass a raw number. */
export function Delta({
  value,
  tone,
  className,
}: {
  value: number
  tone?: "success" | "danger" | "accent" | "purple"
  className?: string
}) {
  const resolved = tone ?? (value >= 0 ? "success" : "danger")
  const tones = {
    success: "bg-success-subtle text-success-fg",
    danger: "bg-danger-subtle text-danger-fg",
    accent: "bg-accent-subtle text-accent",
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-200",
  }
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-caption1 font-semibold tabular",
        tones[resolved],
        className,
      )}
    >
      {value >= 0 ? "+" : "−"}
      {Math.abs(value)}%
    </span>
  )
}
