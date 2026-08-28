"use client"

import { useState } from "react"
import { equalTicks, scaleX, scaleY, smoothPath, VB } from "./geometry"
import { cx } from "@/utils/cx"

/** Bars against a left axis with a line against a right axis — spend vs. ROAS. */
export function ComboChart({
  labels,
  bars,
  line,
  barColor = "var(--color-chart-1)",
  lineColor = "var(--color-chart-2)",
  formatBar = (n: number) => n.toLocaleString(),
  formatLine = (n: number) => `${n}x`,
  height = 240,
  className,
}: {
  labels: string[]
  bars: { name: string; values: number[] }
  line: { name: string; values: number[] }
  barColor?: string
  lineColor?: string
  formatBar?: (n: number) => string
  formatLine?: (n: number) => string
  height?: number
  className?: string
}) {
  const [hover, setHover] = useState<number | null>(null)

  const barTop = Math.max(...bars.values) || 1
  const barTicks = equalTicks(barTop, 3)
  // Extra headroom on the right axis keeps the line clear of the bar tops, then
  // rounded up so the top label reads 6.0x rather than 5.9x.
  const lineRaw = Math.max(...line.values) * 1.45 || 1
  const lineStep = Math.pow(10, Math.floor(Math.log10(lineRaw))) / 2
  const lineTop = Math.ceil(lineRaw / lineStep) * lineStep
  const lineTicks = equalTicks(lineTop, 3)

  const points = line.values.map((v, i) => ({
    x: scaleX(i, line.values.length),
    y: scaleY(v, 0, lineTop, 6, 0),
  }))

  return (
    <div className={cx("w-full", className)}>
      <div className="flex gap-3">
        <div
          className="text-fg-tertiary flex shrink-0 flex-col justify-between text-caption2 tabular"
          style={{ height }}
        >
          {[...barTicks].reverse().map((t) => (
            <span key={t}>{formatBar(t)}</span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1" style={{ height }}>
          <div className="absolute inset-0 flex items-end gap-1.5">
            {bars.values.map((value, i) => (
              <button
                key={labels[i] + i}
                type="button"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                aria-label={`${labels[i]}: ${formatBar(value)}, ${formatLine(line.values[i])}`}
                className="focus-visible:ring-ring/45 flex h-full flex-1 cursor-default items-end justify-center rounded-lg outline-none focus-visible:ring-[3px]"
              >
                <span
                  className="w-[72%] rounded-lg transition-opacity duration-fast"
                  style={{
                    height: `${Math.max((value / barTop) * 100, 1.5)}%`,
                    background: barColor,
                    opacity: hover === null || hover === i ? 1 : 0.7,
                  }}
                />
              </button>
            ))}
          </div>

          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            preserveAspectRatio="none"
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <path
              d={smoothPath(points)}
              fill="none"
              stroke={lineColor}
              strokeWidth={2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={hover === i ? 3.5 : 2.5}
                fill={lineColor}
                stroke="var(--color-surface)"
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {hover !== null ? (
            <div
              className="material-thick border-border pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-xl border p-2.5 shadow-popover"
              style={{ left: `${(hover / Math.max(1, labels.length - 1)) * 100}%` }}
            >
              <p className="text-style-caption2 text-fg-secondary mb-1.5">{labels[hover]}</p>
              <div className="flex items-center gap-2 text-caption1 whitespace-nowrap">
                <span className="size-2 rounded-full" style={{ background: barColor }} />
                <span className="text-fg-secondary">{bars.name}</span>
                <span className="text-fg ml-auto font-semibold tabular">
                  {formatBar(bars.values[hover])}
                </span>
              </div>
              <div className="flex items-center gap-2 text-caption1 whitespace-nowrap">
                <span className="size-2 rounded-full" style={{ background: lineColor }} />
                <span className="text-fg-secondary">{line.name}</span>
                <span className="text-fg ml-auto font-semibold tabular">
                  {formatLine(line.values[hover])}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <div
          className="text-fg-tertiary flex shrink-0 flex-col justify-between text-caption2 tabular"
          style={{ height }}
        >
          {[...lineTicks].reverse().map((t) => (
            <span key={t}>{formatLine(t)}</span>
          ))}
        </div>
      </div>

      <div className="text-fg-tertiary mt-2 flex gap-1.5 pr-9 pl-11 text-caption2">
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
  )
}
