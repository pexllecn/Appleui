"use client"

import type { ReactNode } from "react"
import { RiArrowLeftSLine } from "@remixicon/react"
import type { RemixiconComponentType } from "@remixicon/react"
import { cx, focusRing } from "@/utils/cx"

/** Two ways the reference screens mark the current settings row, and they are
 * not interchangeable:
 *
 * `pill`  a raised white chip with a hairline and shadow-xs — used when the nav
 *         column sits on the same grey as the window's ground, so the selected
 *         row has to lift off it.
 * `fill`  a flat grey wash — used when the nav column is already white, where a
 *         raised chip would have nothing to lift from.
 */
export type SelectionStyle = "pill" | "fill"

export function SettingsNavColumn({
  width = 272,
  className,
  children,
}: {
  width?: number
  className?: string
  children: ReactNode
}) {
  return (
    <nav
      aria-label="Settings"
      style={{ width }}
      className={cx("no-scrollbar flex shrink-0 flex-col overflow-y-auto max-lg:hidden", className)}
    >
      {children}
    </nav>
  )
}

/** The back affordance both settings windows open with: a chevron and a word,
 * in a raised chip that matches the selected-row chip exactly. */
export function BackChip({ label = "Settings" }: { label?: string }) {
  return (
    <button
      type="button"
      className={cx(
        "bg-surface border-border-subtle text-fg inline-flex h-9 items-center gap-1.5 rounded-xl border pr-4 pl-2.5",
        "text-subheadline font-medium shadow-xs",
        "hover:bg-fill-quaternary transition-colors duration-fast",
        focusRing,
      )}
    >
      <RiArrowLeftSLine className="text-fg-secondary size-4.5" />
      {label}
    </button>
  )
}

/** A group label. Two flavours in the references: an icon + word that heads a
 * section (Workspace), and a bare uppercase-ish caption (Personal settings). */
export function NavGroupLabel({
  icon: Icon,
  children,
  className,
}: {
  icon?: RemixiconComponentType
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cx(
        "text-fg-secondary flex h-8 items-center gap-2.5 px-3",
        Icon ? "text-subheadline font-medium" : "text-caption1",
        className,
      )}
    >
      {Icon ? <Icon aria-hidden className="size-4.5" /> : null}
      {children}
    </div>
  )
}

export function NavRow({
  icon: Icon,
  label,
  active = false,
  indent = false,
  selection = "pill",
  trailing,
}: {
  icon?: RemixiconComponentType
  label: string
  active?: boolean
  indent?: boolean
  selection?: SelectionStyle
  trailing?: ReactNode
}) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cx(
        "group flex h-9 w-full items-center gap-2.5 rounded-xl px-3 text-left",
        "text-subheadline transition-colors duration-fast ease-standard",
        indent && "ml-3 w-[calc(100%-0.75rem)]",
        active
          ? selection === "pill"
            ? "bg-surface border-border-subtle text-fg border font-medium shadow-xs"
            : "bg-fill-quaternary text-fg font-medium"
          : "text-fg-secondary hover:bg-fill-quaternary hover:text-fg",
        focusRing,
      )}
    >
      {Icon ? (
        <Icon
          aria-hidden
          className={cx("size-4.5 shrink-0", active ? "text-fg" : "text-fg-tertiary")}
        />
      ) : null}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {trailing}
    </button>
  )
}
