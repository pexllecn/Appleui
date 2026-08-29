import { areaPath, scaleX, scaleY, smoothPath, VB, type Point } from "./geometry"
import { cx } from "@/utils/cx"

/** A trend line with no axes, sized to sit inside a metric card. */
export function Sparkline({
  values,
  color = "var(--color-chart-1)",
  filled = true,
  height = 40,
  className,
}: {
  values: number[]
  color?: string
  filled?: boolean
  height?: number
  className?: string
}) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const points: Point[] = values.map((v, i) => ({
    x: scaleX(i, values.length),
    y: scaleY(v, min, max, 12, 8),
  }))
  const gradientId = `spark-${color.replace(/[^a-z0-9]/gi, "")}`

  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="none"
      className={cx("w-full", className)}
      style={{ height }}
      aria-hidden
    >
      {filled ? (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.28} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={areaPath(points, VB.h)} fill={`url(#${gradientId})`} />
        </>
      ) : null}
      <path
        d={smoothPath(points)}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
