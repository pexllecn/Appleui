import type { ReactNode } from "react"
import { cx } from "@/utils/cx"

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cx("flex flex-col items-center px-6 py-20 text-center", className)}>
      <span className="bg-fill-quaternary text-fg-tertiary grid size-14 place-items-center rounded-2xl [&_svg]:size-6">
        {icon}
      </span>
      <h2 className="text-style-title3 text-fg mt-4">{title}</h2>
      <p className="text-style-subheadline text-fg-secondary mt-1.5 max-w-sm">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
