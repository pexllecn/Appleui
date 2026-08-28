"use client"

import { useId, useState } from "react"
import { equalTicks, linePath, scaleX, scaleY, smoothPath, VB, type Point } from "./geometry"
import { cx } from "@/utils/cx"

export interface Series {
  name: string
  color: string
  values: number[]
}

/** Area chart with a gradient fill and a scrubbing crosshair.
 * Stacks its series when `stacked`, which is how the Visitors card reads. */
export function AreaChart({
  series,
  labels,
  stacked = false,
  formatValue = (n: number) => n.toLocaleString(),
  height = 220,
  showAxis = true,
  className,
}: {
  series: Series[]
  labels: string[]
  stacked?: boolean
  formatValue?: (n: number) => string
  height?: number
  showAxis?: boolean
  className?: string
}) {
  const gradientId = useId()
  const [hover, setHover] = useState<number | null>(null)

  // When stacked, each series sits on the running total beneath it.
  const cumulative: number[][] = []
  let running = new Array(labels.length).fill(0)
  for (const s of series) {
    running = stacked ? running.map((v, i) => v + (s.values[i] ?? 0)) : s.values
    cumulative.push([...running])
  }

  const max = Math.max(...cumulative.flat(), 0)
  const top = max * 1.04 || 1
  const ticks = equalTicks(max, 3)

  const toPoints = (values: number[]): Point[] =>
    values.map((v, i) => ({ x: scaleX(i, values.length), y: scaleY(v, 0, top, 4, 0) }))

  /** A stacked band is filled between its own line and the one below it, not
   * down to the axis — otherwise the translucent fills pile up and muddy. */
  const bandPath = (index: number) => {
    const upper = toPoints(cumulative[index])
    const lower =
      index === 0
        ? upper.map((p) => ({ x: p.x, y: VB.h }))
        : toPoints(cumulative[index - 1])
    return `${smoothPath(upper)} L${lower[lower.length - 1].x},${lower[lower.length - 1].y} ${linePath(
      [...lower].reverse(),
    ).slice(1)} Z`
  }

  return (
    <div className={cx("flex w-full gap-3", className)}>
      {showAxis ? (
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
        <div className="relative" style={{ height }} onMouseLeave={() => setHover(null)}>
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
            role="img"
            aria-label={series.map((s) => s.name).join(", ")}
          >
            <defs>
              {series.map((s, i) => (
                <linearGradient key={s.name} id={`${gradientId}-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={stacked ? 0.34 : 0.3} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={stacked ? 0.2 : 0} />
                </linearGradient>
              ))}
            </defs>

            {ticks.map((t) => (
              <line
                key={t}
                x1={0}
                x2={VB.w}
                y1={scaleY(t, 0, top, 4, 0)}
                y2={scaleY(t, 0, top, 4, 0)}
                stroke="var(--color-chart-grid)"
                strokeWidth={0.4}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Painted back to front so a stack reads as layers, not overlaps. */}
            {[...cumulative].reverse().map((values, ri) => {
              const i = cumulative.length - 1 - ri
              const points = toPoints(values)
              return (
                <g key={series[i].name}>
                  <path
                    d={stacked ? bandPath(i) : `${smoothPath(points)} L${points[points.length - 1].x},${VB.h} L${points[0].x},${VB.h} Z`}
                    fill={`url(#${gradientId}-${i})`}
                  />
                  <path
                    d={smoothPath(points)}
                    fill="none"
                    stroke={series[i].color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              )
            })}

            {hover !== null ? (
              <line
                x1={scaleX(hover, labels.length)}
                x2={scaleX(hover, labels.length)}
                y1={0}
                y2={VB.h}
                stroke="var(--color-chart-axis)"
                strokeWidth={1}
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
            ) : null}

            {hover !== null
              ? cumulative.map((values, i) => (
                  <circle
                    key={series[i].name}
                    cx={scaleX(hover, labels.length)}
                    cy={scaleY(values[hover], 0, top, 4, 0)}
                    r={3}
                    fill={series[i].color}
                    stroke="var(--color-surface)"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                  />
                ))
              : null}
          </svg>

          {/* Invisible hit targets: one column per data point. */}
          <div className="absolute inset-0 flex">
            {labels.map((label, i) => (
              <button
                key={label + i}
                type="button"
                aria-label={`${label}: ${series.map((s) => formatValue(s.values[i] ?? 0)).join(", ")}`}
                className="h-full flex-1 cursor-default"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
              />
            ))}
          </div>

          {hover !== null ? (
            <div
              className={cx(
                "material-thick pointer-events-none absolute top-2 z-10 min-w-32 -translate-x-1/2",
                "border-border rounded-xl border p-2.5 shadow-popover",
              )}
              style={{ left: `${(hover / Math.max(1, labels.length - 1)) * 100}%` }}
            >
              <p className="text-style-caption2 text-fg-secondary mb-1.5">{labels[hover]}</p>
              {series.map((s) => (
                <div key={s.name} className="flex items-center gap-2 text-caption1 whitespace-nowrap">
                  <span className="size-2 shrink-0 rounded-full" style={{ background: s.color }} />
                  <span className="text-fg-secondary">{s.name}</span>
                  <span className="text-fg ml-auto font-semibold tabular">
                    {formatValue(s.values[hover] ?? 0)}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {showAxis ? (
          <div className="text-fg-tertiary mt-2 flex justify-between text-caption2">
            {labels.map((label, i) => (
              <span key={label + i} className={cx(hover === i && "text-fg font-medium")}>
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
