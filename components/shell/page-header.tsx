import type { ReactNode } from "react"
import { RiArrowRightSLine, RiNotification3Line } from "@remixicon/react"
import { cx } from "@/utils/cx"

export interface Crumb {
  label: string
  icon?: ReactNode
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 ? <RiArrowRightSLine aria-hidden className="text-fg-quaternary size-4" /> : null}
            <span
              className={cx(
                "flex items-center gap-1.5 text-caption1",
                i === items.length - 1 ? "text-fg font-medium" : "text-fg-secondary",
              )}
            >
              {item.icon}
              {item.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** A round icon chip, the small avatar-ish marker the breadcrumb uses. */
export function CrumbChip({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "neutral" }) {
  return (
    <span
      className={cx(
        "grid size-4.5 place-items-center rounded-full text-[9px] font-bold",
        tone === "accent" ? "bg-accent text-accent-fg" : "bg-fill text-fg-secondary",
      )}
    >
      {children}
    </span>
  )
}

export function NotificationBell({ count }: { count: number }) {
  return (
    <button
      type="button"
      aria-label={`Notifications, ${count} unread`}
      className={cx(
        "border-border bg-surface text-fg relative grid size-9 shrink-0 place-items-center rounded-xl border shadow-xs",
        "hover:bg-fill-quaternary transition-colors duration-fast",
        "focus-visible:ring-ring/45 outline-none focus-visible:ring-[3px]",
      )}
    >
      <RiNotification3Line className="size-4.5" />
      {count > 0 ? (
        <span className="bg-danger border-surface absolute -top-1.5 -right-1.5 grid size-4.5 place-items-center rounded-full border-2 text-[10px] font-bold text-white tabular">
          {count}
        </span>
      ) : null}
    </button>
  )
}

export function PageHeader({
  breadcrumbs,
  title,
  actions,
  className,
}: {
  breadcrumbs: Crumb[]
  title: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <header className={cx("mb-5", className)}>
      <Breadcrumbs items={breadcrumbs} />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-style-title1 text-fg">{title}</h1>
        {actions ? <div className="flex items-center gap-2.5">{actions}</div> : null}
      </div>
    </header>
  )
}
