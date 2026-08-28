"use client"

import type { ReactNode } from "react"
import { cx } from "@/utils/cx"

export interface BarListItem {
  name: string
  value: number
  icon?: ReactNode
  href?: string
}

/** A ranked list where the row itself is the bar. Reads as a table, scans as a
 * chart — the shape the channel breakdown uses. */
export function BarList({
  items,
  formatValue = (n: number) => `${n}%`,
  color = "var(--color-accent-subtle)",
  className,
}: {
  items: BarListItem[]
  formatValue?: (n: number) => string
  color?: string
  className?: string
}) {
  const max = Math.max(...items.map((i) => i.value), 0) || 1

  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-3">
          <div className="relative h-9 min-w-0 flex-1">
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 rounded-md transition-[width] duration-slow ease-out-quint"
              style={{ width: `${(item.value / max) * 100}%`, background: color }}
            />
            <div className="text-subheadline text-fg relative flex h-full items-center gap-2 px-2.5">
              {item.icon ? <span className="text-fg-secondary shrink-0">{item.icon}</span> : null}
              <span className="truncate">{item.name}</span>
            </div>
          </div>
          <span className="text-subheadline text-fg-secondary w-12 shrink-0 text-right tabular">
            {formatValue(item.value)}
          </span>
        </div>
      ))}
    </div>
  )
}
