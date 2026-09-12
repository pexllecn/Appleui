"use client"

import { useState } from "react"
import { niceTicks } from "./geometry"
import { cx } from "@/utils/cx"

export interface BarSeries {
  name: string
  color: string
  values: number[]
}

/** Two series, side by side, one pair per label — the period-over-period bar
 * chart every analytics dashboard opens with. Laid out in CSS rather than SVG
 * so the bars keep their corner radius at any width: an SVG rect scaled
 * non-uniformly would smear its rounding into an ellipse. */
export function GroupedBarChart({
  series,
  labels,
  formatValue = (n: number) => n.toLocaleString(),
  height = 200,
  ticks: tickCount = 2,
  className,
}: {
  series: BarSeries[]
  labels: string[]
  formatValue?: (n: number) => string
  height?: number
  ticks?: number
  className?: string
}) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...series.flatMap((s) => s.values), 0)
  // Round numbers on the axis, and enough headroom that the tallest bar clears
  // the top gridline rather than growing out of it.
  const ticks = niceTicks(0, max, tickCount)
  const top = Math.max(max * 1.12, ticks[ticks.length - 1] * 1.02) || 1

  return (
    <div className={cx("flex w-full gap-3", className)}>
      <div
        className="text-fg-tertiary flex shrink-0 flex-col justify-between text-caption2 tabular"
        style={{ height }}
      >
        {[...ticks].reverse().map((t) => (
          <span key={t}>{formatValue(t)}</span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <div className="relative" style={{ height }} onMouseLeave={() => setHover(null)}>
          {/* Gridlines sit behind the bars at the same values as the axis. */}
          <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
            {[...ticks].reverse().map((t) => (
              <span key={t} className="bg-chart-grid h-px w-full" />
            ))}
          </div>

          <div className="absolute inset-0 flex items-end">
            {labels.map((label, i) => (
              <button
                key={label + i}
                type="button"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                aria-label={`${label}: ${series
                  .map((s) => `${s.name} ${formatValue(s.values[i] ?? 0)}`)
                  .join(", ")}`}
                className={cx(
                  "flex h-full flex-1 cursor-default items-end justify-center gap-1.5 rounded-md",
                  "focus-visible:ring-ring/45 outline-none focus-visible:ring-[3px]",
                  hover !== null && hover !== i && "opacity-60",
                  "transition-opacity duration-fast",
                )}
              >
                {series.map((s) => (
                  <span
                    key={s.name}
                    className="w-2.5 rounded-t-[3px] transition-[height] duration-normal ease-out-quint"
                    style={{
                      height: `${((s.values[i] ?? 0) / top) * 100}%`,
                      background: s.color,
                    }}
                  />
                ))}
              </button>
            ))}
          </div>
        </div>

        <div className="text-fg-tertiary mt-2 flex text-caption2">
          {labels.map((label, i) => (
            <span
              key={label + i}
              className={cx("flex-1 text-center", hover === i && "text-fg font-medium")}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
