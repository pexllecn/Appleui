"use client"

import { useId } from "react"
import { cx, focusRing } from "@/utils/cx"

/** Apple's segmented control: a sliding, tinted thumb inside a recessed track. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = "md",
  className,
  "aria-label": ariaLabel,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  size?: "sm" | "md"
  className?: string
  "aria-label"?: string
}) {
  const id = useId()
  const index = Math.max(0, options.findIndex((o) => o.value === value))
  const width = 100 / options.length

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cx(
        "relative isolate inline-grid rounded-lg bg-fill-quaternary p-0.5",
        size === "sm" ? "h-7" : "h-8.5",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {/* The thumb slides rather than fades — the movement is the affordance. */}
      <span
        aria-hidden
        className={cx(
          "absolute inset-y-0.5 -z-10 rounded-[7px] bg-surface shadow-sm",
          "transition-[left] duration-normal ease-out-quint",
        )}
        style={{ left: `calc(${index * width}% + 2px)`, width: `calc(${width}% - 4px)` }}
      />
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            id={`${id}-${option.value}`}
            role="radio"
            type="button"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cx(
              "relative rounded-[7px] px-3 font-medium whitespace-nowrap",
              size === "sm" ? "text-caption1" : "text-subheadline",
              "transition-colors duration-fast ease-standard",
              selected ? "text-fg" : "text-fg-secondary hover:text-fg",
              focusRing,
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
