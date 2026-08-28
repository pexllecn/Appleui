"use client"

import { useState } from "react"
import { cx } from "@/utils/cx"

/** Contribution grid. Intensity is bucketed into five levels so the scale stays
 * legible rather than a continuous wash. */
export function Heatmap({
  weeks,
  rows = 7,
  labels,
  color = "var(--color-chart-3)",
  className,
}: {
  weeks: number[][]
  rows?: number
  labels?: string[]
  color?: string
  className?: string
}) {
  const [hover, setHover] = useState<{ w: number; d: number } | null>(null)
  const max = Math.max(...weeks.flat(), 1)
  const level = (v: number) => (v <= 0 ? 0 : Math.min(4, Math.ceil((v / max) * 4)))
  const opacity = [0, 0.22, 0.45, 0.72, 1]

  return (
    <div className={cx("w-full", className)}>
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex gap-[3px]">
          {weeks.map((week, w) => (
            <div key={w} className="flex flex-1 flex-col gap-[3px]">
              {Array.from({ length: rows }, (_, d) => {
                const value = week[d] ?? 0
                const l = level(value)
                return (
                  <button
                    key={d}
                    type="button"
                    onMouseEnter={() => setHover({ w, d })}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover({ w, d })}
                    onBlur={() => setHover(null)}
                    aria-label={`${value} contributions`}
                    className={cx(
                      "focus-visible:ring-ring/45 aspect-square w-full cursor-default rounded-[3px] outline-none",
                      "transition-transform duration-fast focus-visible:ring-2",
                      hover?.w === w && hover?.d === d && "scale-125",
                    )}
                    style={{
                      background: l === 0 ? "var(--color-fill-tertiary)" : color,
                      opacity: l === 0 ? 1 : opacity[l],
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {labels ? (
        <div className="text-fg-tertiary mt-2 flex justify-between text-caption2">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
