export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export const usdCents = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

/** 24_800 -> "24.8K", 1_940_000 -> "1.94M" */
export function compact(n: number, digits = 1) {
  const abs = Math.abs(n)
  if (abs >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(digits)}B`
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(digits === 1 && abs < 10_000_000 ? 2 : digits)}M`
  if (abs >= 1_000) return `${(n / 1_000).toFixed(digits)}K`
  return String(n)
}

/** Trims a trailing .0 so axis labels read $10K rather than $10.0K. */
export const compactUsd = (n: number) =>
  n === 0 ? "$0" : `$${compact(n).replace(/\.0(?=[KMB]$)/, "")}`

export const compactNum = (n: number) =>
  n === 0 ? "0" : compact(n).replace(/\.0(?=[KMB]$)/, "")

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
