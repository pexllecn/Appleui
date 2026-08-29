import type { ReactNode } from "react"
import { cx } from "@/utils/cx"

/** Apple's grouped-background hierarchy, inverted for a light UI: a recessed
 * grey container holds raised white content. `recessed` is the outer shell of
 * every dashboard module; `raised` is what sits inside it. */
type Tone = "recessed" | "raised" | "plain"

const tones: Record<Tone, string> = {
  recessed: "bg-bg-subtle border border-transparent dark:bg-surface dark:border-border",
  raised: "bg-surface border border-border shadow-xs dark:shadow-none",
  plain: "bg-transparent",
}

export function Card({
  tone = "recessed",
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { tone?: Tone }) {
  return (
    <div {...props} className={cx("rounded-2xl", tones[tone], className)}>
      {children}
    </div>
  )
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cx("flex items-start justify-between gap-4 px-5 pt-4.5 pb-3", className)}>
      <div className="min-w-0">
        <div className="text-style-headline text-fg truncate">{title}</div>
        {description ? (
          <p className="text-style-footnote text-fg-secondary mt-0.5">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("px-5 pb-5", className)}>{children}</div>
}

export function CardFooter({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx("border-border-subtle border-t px-5 py-3.5", className)}>{children}</div>
  )
}

/** Title + big number + delta, the header every metric card in the templates
 * opens with. */
export function CardMetric({
  label,
  value,
  delta,
  action,
  className,
}: {
  label: ReactNode
  value: ReactNode
  delta?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cx("flex items-start justify-between gap-4 px-5 pt-4.5", className)}>
      <div className="min-w-0">
        <p className="text-style-subheadline text-fg-secondary">{label}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-style-title1 text-fg tabular">{value}</span>
          {delta}
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
