/** Shared geometry for the SVG charts. Everything is drawn in a 0–100 × 0–100
 * viewBox and stretched by CSS, so charts stay crisp at any size. */

export interface Point {
  x: number
  y: number
}

export const VB = { w: 100, h: 100 }

/** Map a value onto a y coordinate, inverted because SVG grows downward. */
export function scaleY(value: number, min: number, max: number, padTop = 6, padBottom = 0) {
  const span = max - min || 1
  const usable = VB.h - padTop - padBottom
  return VB.h - padBottom - ((value - min) / span) * usable
}

export function scaleX(index: number, count: number, inset = 0) {
  if (count <= 1) return VB.w / 2
  return inset + (index / (count - 1)) * (VB.w - inset * 2)
}

/** Catmull-Rom through the points, converted to cubic Béziers. Apple's charts
 * curve; a polyline reads as a spreadsheet. */
export function smoothPath(points: Point[], tension = 0.5): string {
  if (points.length === 0) return ""
  if (points.length < 3) {
    return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
  }

  let d = `M${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2

    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension * 2
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension * 2
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension * 2
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension * 2

    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`
  }
  return d
}

export function linePath(points: Point[]): string {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
}

/** Close a line down to the baseline so it can be filled. */
export function areaPath(points: Point[], baselineY: number, smooth = true): string {
  if (points.length === 0) return ""
  const top = smooth ? smoothPath(points) : linePath(points)
  const first = points[0]
  const last = points[points.length - 1]
  return `${top} L${last.x},${baselineY} L${first.x},${baselineY} Z`
}

/** An SVG arc for one donut segment. */
export function arcPath(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  startAngle: number,
  endAngle: number,
): string {
  const polar = (r: number, a: number) => {
    const rad = ((a - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }
  // A full circle can't be drawn as a single arc; back off a hair.
  const sweep = Math.min(endAngle - startAngle, 359.99)
  const end = startAngle + sweep
  const large = sweep > 180 ? 1 : 0

  const o1 = polar(outer, startAngle)
  const o2 = polar(outer, end)
  const i1 = polar(inner, end)
  const i2 = polar(inner, startAngle)

  return [
    `M${o1.x},${o1.y}`,
    `A${outer},${outer} 0 ${large} 1 ${o2.x},${o2.y}`,
    `L${i1.x},${i1.y}`,
    `A${inner},${inner} 0 ${large} 0 ${i2.x},${i2.y}`,
    "Z",
  ].join(" ")
}

/** "Nice" round numbers for the y axis. Ticks stop at or below `max` rather
 * than overshooting it, so the top gridline sits just under the peak instead of
 * padding the chart with empty headroom. */
export function niceTicks(min: number, max: number, count = 4): number[] {
  if (max <= min) return [min]
  const raw = (max - min) / count
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const norm = raw / mag
  // Nearest nice multiple, not the next one up — 2.007 should round to 2, not 2.5.
  const candidates = [1, 2, 2.5, 5, 10]
  const nice = candidates.reduce((best, c) =>
    Math.abs(c - norm) < Math.abs(best - norm) ? c : best
  )
  const step = nice * mag

  const ticks: number[] = []
  for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-9; v += step) {
    ticks.push(Number(v.toFixed(10)))
  }
  return ticks.length ? ticks : [min, max]
}

/** Evenly divided axis: 0 … max in `count` steps, so the top gridline sits on
 * the data's own peak. This is what the reference dashboards do — their axes
 * read 0 / 8.5K / 17K / 25.5K rather than rounding up to 30K. */
export function equalTicks(max: number, count = 3): number[] {
  if (max <= 0) return [0]
  return Array.from({ length: count + 1 }, (_, i) => (max / count) * i)
}

export const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
  "var(--color-chart-7)",
  "var(--color-chart-8)",
]
