"use client"

import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react"
import { Button } from "./button"
import { cx } from "@/utils/cx"

/** Collapses long ranges to 1 … n-1 n with the current page always shown. */
function pageList(current: number, total: number): (number | "gap")[] {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set<number>([1, total, current, current - 1, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)

  const out: (number | "gap")[] = []
  let previous = 0
  for (const page of sorted) {
    if (previous && page - previous > 1) out.push("gap")
    out.push(page)
    previous = page
  }
  return out
}

export function Pagination({
  page,
  totalPages,
  onChange,
  className,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
  className?: string
}) {
  return (
    <div className={cx("flex items-center justify-between gap-3", className)}>
      <Button onPress={() => onChange(page - 1)} isDisabled={page <= 1}>
        <RiArrowLeftLine />
        Previous
      </Button>

      <div className="flex items-center gap-1 max-sm:hidden">
        {pageList(page, totalPages).map((entry, i) =>
          entry === "gap" ? (
            <span key={`gap-${i}`} className="text-fg-tertiary px-1.5 text-subheadline">
              …
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              onClick={() => onChange(entry)}
              aria-current={entry === page ? "page" : undefined}
              className={cx(
                "focus-visible:ring-ring/45 size-8 rounded-lg text-subheadline font-medium tabular outline-none focus-visible:ring-[3px]",
                "transition-colors duration-fast",
                entry === page
                  ? "bg-fill-tertiary text-fg"
                  : "text-fg-secondary hover:bg-fill-quaternary",
              )}
            >
              {entry}
            </button>
          ),
        )}
      </div>

      <Button onPress={() => onChange(page + 1)} isDisabled={page >= totalPages}>
        Next
        <RiArrowRightLine />
      </Button>
    </div>
  )
}
