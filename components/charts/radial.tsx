"use client"

import { useState } from "react"
import { cx } from "@/utils/cx"

/** Path along an arc's centreline, so it can be stroked with round caps —
 * the reason these read as Apple's rings rather than pie slices. */
function arcStroke(cx: number, cy: number, r: number, start: number, end: number) {
  const polar = (a: number) => {
    const rad = ((a - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }
  const sweep = Math.min(end - start, 359.99)
  const p1 = polar(start)
  const p2 = polar(start + sweep)
  return `M${p1.x},${p1.y} A${r},${r} 0 ${sweep > 180 ? 1 : 0} 1 ${p2.x},${p2.y}`
}

export interface Segment {
  name: string
  value: number
  color: string
}

/** Half-donut gauge. Segments are laid across a 180° sweep with a gap between
 * each, and the centre carries the headline share. */
export function GaugeChart({
  segments,
  centerValue,
  centerLabel,
  size = 240,
  thickness = 13,
  gap = 5,
  className,
}: {
  segments: Segment[]
  centerValue: string
  centerLabel?: string
  size?: number
  thickness?: number
  gap?: number
  className?: string
}) {
  const [hover, setHover] = useState<number | null>(null)
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
  const r = 50 - thickness / 2 - 2
  const sweep = 180
  const usable = sweep - gap * (segments.length - 1)

  let angle = 270 // start at the 9 o'clock position and travel over the top
  const arcs = segments.map((segment) => {
    const span = (segment.value / total) * usable
    const path = arcStroke(50, 50, r, angle, angle + span)
    angle += span + gap
    return { ...segment, path }
  })

  return (
    <div className={cx("relative", className)} style={{ width: size, height: size / 2 + 18 }}>
      <svg viewBox="0 0 100 62" className="h-full w-full overflow-visible" role="img"
        aria-label={segments.map((s) => `${s.name} ${s.value}`).join(", ")}>
        {arcs.map((arc, i) => (
          <path
            key={arc.name}
            d={arc.path}
            fill="none"
            stroke={arc.color}
            strokeWidth={thickness}
            strokeLinecap="round"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="transition-opacity duration-fast"
            opacity={hover === null || hover === i ? 1 : 0.4}
          />
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-1 text-center">
        <p className="text-style-title1 text-fg tabular">
          {hover === null
            ? centerValue
            : `${Math.round((segments[hover].value / total) * 100)}%`}
        </p>
        {centerLabel ? (
          <p className="text-style-footnote text-fg-secondary">
            {hover === null ? centerLabel : segments[hover].name}
          </p>
        ) : null}
      </div>
    </div>
  )
}

/** Full donut with gapped, round-capped segments. */
export function DonutChart({
  segments,
  centerValue,
  centerLabel,
  size = 168,
  thickness = 11,
  gap = 6,
  className,
}: {
  segments: Segment[]
  centerValue?: string
  centerLabel?: string
  size?: number
  thickness?: number
  gap?: number
  className?: string
}) {
  const [hover, setHover] = useState<number | null>(null)
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
  const r = 50 - thickness / 2 - 2
  const usable = 360 - gap * segments.length

  let angle = 0
  const arcs = segments.map((segment) => {
    const span = (segment.value / total) * usable
    const path = arcStroke(50, 50, r, angle, angle + span)
    angle += span + gap
    return { ...segment, path }
  })

  return (
    <div className={cx("relative shrink-0", className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full" role="img"
        aria-label={segments.map((s) => `${s.name} ${s.value}`).join(", ")}>
        {arcs.map((arc, i) => (
          <path
            key={arc.name}
            d={arc.path}
            fill="none"
            stroke={arc.color}
            strokeWidth={thickness}
            strokeLinecap="round"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="transition-opacity duration-fast"
            opacity={hover === null || hover === i ? 1 : 0.35}
          />
        ))}
      </svg>
      {centerValue ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-style-title1 text-fg tabular">{centerValue}</span>
          {centerLabel ? (
            <span className="text-style-caption1 text-fg-secondary">{centerLabel}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export interface Ring {
  name: string
  value: number
  goal: number
  color: string
}

/** Concentric activity rings. Each ring keeps a dim track behind it and can
 * pass 100%, wrapping past its own start like the Fitness app. */
export function ActivityRings({
  rings,
  size = 200,
  thickness = 11,
  gapBetween = 3.5,
  className,
}: {
  rings: Ring[]
  size?: number
  thickness?: number
  gapBetween?: number
  className?: string
}) {
  return (
    <div className={cx("shrink-0", className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full" role="img"
        aria-label={rings.map((r) => `${r.name} ${Math.round((r.value / r.goal) * 100)}%`).join(", ")}>
        {rings.map((ring, i) => {
          const r = 50 - thickness / 2 - 1 - i * (thickness + gapBetween)
          const pct = Math.min(ring.value / ring.goal, 1)
          const circumference = 2 * Math.PI * r
          return (
            <g key={ring.name}>
              <circle
                cx={50}
                cy={50}
                r={r}
                fill="none"
                stroke={ring.color}
                strokeWidth={thickness}
                opacity={0.18}
              />
              <circle
                cx={50}
                cy={50}
                r={r}
                fill="none"
                stroke={ring.color}
                strokeWidth={thickness}
                strokeLinecap="round"
                strokeDasharray={`${circumference * pct} ${circumference}`}
                transform={`rotate(-90 50 50)`}
                className="transition-[stroke-dasharray] duration-slow ease-out-quint"
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/** Single-value ring, used for the small per-day summaries. */
export function ProgressRing({
  rings,
  size = 26,
  thickness = 9,
  gapBetween = 3.5,
  className,
}: {
  rings: { value: number; goal: number; color: string }[]
  size?: number
  thickness?: number
  gapBetween?: number
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cx("shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {rings.map((ring, i) => {
        const r = 50 - thickness / 2 - 1 - i * (thickness + gapBetween)
        const circumference = 2 * Math.PI * r
        const pct = Math.min(ring.value / ring.goal, 1)
        return (
          <g key={i}>
            <circle cx={50} cy={50} r={r} fill="none" stroke={ring.color} strokeWidth={thickness} opacity={0.2} />
            <circle
              cx={50}
              cy={50}
              r={r}
              fill="none"
              stroke={ring.color}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${circumference * pct} ${circumference}`}
              transform="rotate(-90 50 50)"
            />
          </g>
        )
      })}
    </svg>
  )
}
