"use client"

import { useId, useState } from "react"
import { cx } from "@/utils/cx"

export interface FunnelStage {
  name: string
  value: number
  color: string
}

/** A flowing funnel. Each stage holds its own thickness across most of its band
 * and then necks into the next, so the whole thing reads as one narrowing
 * stream rather than four separate bars.
 *
 * Drawn in a square viewBox at a fixed aspect so the halo blur stays circular;
 * the wrapper stretches it. */
export function FunnelChart({
  stages,
  height = 190,
  className,
}: {
  stages: FunnelStage[]
  height?: number
  className?: string
}) {
  const filterId = useId()
  const [hover, setHover] = useState<number | null>(null)
  const peak = stages[0]?.value || 1

  const W = 100
  const band = W / stages.length
  // Half-thicknesses as a share of the frame, with a floor so the last stage
  // stays a visible ribbon instead of collapsing to a point.
  const MAX_HALF = 44
  const MIN_HALF = 4.5
  const halfFor = (value: number) =>
    Math.max(MIN_HALF, Math.sqrt(value / peak) * MAX_HALF)

  const halves = stages.map((s) => halfFor(s.value))

  const shapes = stages.map((stage, i) => {
    const x0 = i * band
    const x1 = x0 + band
    const h0 = halves[i]
    // The final stage runs out flat rather than tapering to nothing.
    const h1 = halves[i + 1] ?? h0
    const holdTo = x0 + band * 0.30 // short straight run, then a long neck
    const c = band * 0.34

    const d = [
      `M${x0},${50 - h0}`,
      `L${holdTo},${50 - h0}`,
      `C${holdTo + c},${50 - h0} ${x1 - c},${50 - h1} ${x1},${50 - h1}`,
      `L${x1},${50 + h1}`,
      `C${x1 - c},${50 + h1} ${holdTo + c},${50 + h0} ${holdTo},${50 + h0}`,
      `L${x0},${50 + h0}`,
      "Z",
    ].join(" ")

    return { ...stage, d, pct: Math.round((stage.value / peak) * 100) }
  })

  return (
    <div className={cx("relative w-full", className)} style={{ height }}>
      <svg
        viewBox={`0 0 ${W} 100`}
        preserveAspectRatio="none"
        className="h-full w-full"
        role="img"
        aria-label={stages.map((s) => `${s.name} ${s.value}`).join(", ")}
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        {/* Soft halo underneath, then the solid band. */}
        <g filter={`url(#${filterId})`} opacity={0.4}>
          {shapes.map((shape) => (
            <path key={`halo-${shape.name}`} d={shape.d} fill={shape.color} />
          ))}
        </g>
        {shapes.map((shape, i) => (
          <path
            key={shape.name}
            d={shape.d}
            fill={shape.color}
            opacity={hover === null || hover === i ? 1 : 0.45}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="transition-opacity duration-fast"
          />
        ))}
      </svg>

      {/* Labels live in normal flow so the non-uniform viewBox can't stretch the
       * type. Each sits over the straight part of its band. */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        {shapes.map((shape) => (
          <div key={`label-${shape.name}`} className="flex-1">
            <span className="bg-surface text-fg mx-auto block w-fit rounded-full px-2 py-0.5 text-caption1 font-semibold shadow-sm tabular">
              {shape.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
