import { cx } from "@/utils/cx"

export function Separator({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical"
  className?: string
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cx(
        "bg-separator shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  )
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className={cx(
        "bg-fill-quaternary text-fg-secondary inline-flex h-5 min-w-5 items-center justify-center",
        "rounded-[5px] px-1.5 font-sans text-caption2 font-medium",
      )}
    >
      {children}
    </kbd>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cx("bg-fill-quaternary animate-pulse rounded-md", className)}
    />
  )
}

/** A horizontal meter. Used for quota bars and bar lists. */
export function ProgressBar({
  value,
  max = 100,
  tone = "accent",
  className,
  label,
}: {
  value: number
  max?: number
  tone?: "accent" | "success" | "warning" | "danger"
  className?: string
  label?: string
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const fills = {
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  }
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cx("bg-chart-track h-1.5 w-full overflow-hidden rounded-full", className)}
    >
      <div
        className={cx("h-full rounded-full transition-[width] duration-slow ease-out-quint", fills[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
