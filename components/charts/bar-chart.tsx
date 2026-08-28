"use client"

import { useState } from "react"
import { equalTicks } from "./geometry"
import { cx } from "@/utils/cx"

/** Bars drawn in the DOM rather than SVG: it keeps the corner radii identical
 * to the rest of the UI and makes each bar independently focusable.
 *
 * `showTrack` draws the recessed capacity bar behind each value — the shape the
 * monthly-target card uses. */
export function BarChart({
  labels,
  values,
  color = "var(--color-chart-1)",
  showTrack = false,
  selectedIndex,
  onSelect,
  max: maxProp,
  formatValue = (n: number) => n.toLocaleString(),
  height = 240,
  showAxis = true,
  showValueAxis,
  className,
}: {
  labels: string[]
  values: number[]
  color?: string
  showTrack?: boolean
  /** Ceiling for the bars. With `showTrack` this is the capacity the track
   * represents, so every track is full height and the fill shows usage. */
  max?: number
  selectedIndex?: number
  onSelect?: (index: number) => void
  formatValue?: (n: number) => string
  height?: number
  /** Category labels under the bars. */
  showAxis?: boolean
  /** Value axis down the left. Defaults to whatever `showAxis` is. */
  showValueAxis?: boolean
  className?: string
}) {
  const [hover, setHover] = useState<number | null>(null)
  const top = maxProp || Math.max(...values, 0) * 1.04 || 1
  const ticks = equalTicks(top, 3)
  const withValueAxis = showValueAxis ?? showAxis

  return (
    <div className={cx("flex w-full gap-3", className)}>
      {withValueAxis ? (
        <div
          className="text-fg-tertiary flex shrink-0 flex-col justify-between text-caption2 tabular"
          style={{ height }}
        >
          {[...ticks].reverse().map((t) => (
            <span key={t}>{formatValue(t)}</span>
          ))}
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="flex items-end gap-1.5" style={{ height }}>
          {values.map((value, i) => {
            const pct = (value / top) * 100
            const active = selectedIndex === i || hover === i
            return (
              <button
                key={labels[i] + i}
                type="button"
                onClick={() => onSelect?.(i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                aria-label={`${labels[i]}: ${formatValue(value)}`}
                aria-pressed={selectedIndex === i}
                className={cx(
                  "group relative flex h-full flex-1 items-end rounded-lg",
                  onSelect ? "cursor-pointer" : "cursor-default",
                  "focus-visible:ring-ring/45 outline-none focus-visible:ring-[3px]",
                )}
              >
                {showTrack ? (
                  <span
                    aria-hidden
                    className={cx(
                      "absolute inset-0 rounded-lg transition-colors duration-fast",
                      selectedIndex === i ? "bg-fill-secondary" : "bg-chart-track",
                    )}
                  />
                ) : null}
                <span
                  className={cx(
                    "relative w-full rounded-lg transition-[height,opacity] duration-slow ease-out-quint",
                    !active && (hover !== null || selectedIndex !== undefined) && "opacity-70",
                  )}
                  style={{
                    height: `${Math.max(pct, 1.5)}%`,
                    background: color,
                    filter: selectedIndex === i ? "brightness(0.82)" : undefined,
                  }}
                />
                {hover === i ? (
                  <span
                    className={cx(
                      "material-thick border-border pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5",
                      "-translate-x-1/2 rounded-lg border px-2 py-1 text-caption1 font-semibold whitespace-nowrap shadow-popover tabular",
                    )}
                  >
                    {formatValue(value)}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>

        {showAxis ? (
          <div className="text-fg-tertiary mt-2 flex gap-1.5 text-caption2">
            {labels.map((label, i) => (
              <span
                key={label + i}
                className={cx(
                  "flex-1 text-center",
                  (selectedIndex === i || hover === i) && "text-fg font-medium",
                )}
              >
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
