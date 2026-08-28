"use client"

import {
  Button as AriaButton,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
  type SelectProps as AriaSelectProps,
} from "react-aria-components"
import { RiArrowDownSLine, RiCheckLine } from "@remixicon/react"
import { cx, focusRing } from "@/utils/cx"
import { Label } from "./field"

export interface SelectOption {
  id: string
  label: string
}

export function Select({
  label,
  options,
  className,
  ...props
}: Omit<AriaSelectProps<SelectOption>, "children"> & {
  label?: string
  options: SelectOption[]
  className?: string
}) {
  return (
    <AriaSelect {...props} className={cx("flex flex-col gap-1.5", className)}>
      {label ? <Label>{label}</Label> : null}
      <AriaButton
        className={cx(
          "flex h-8.5 items-center justify-between gap-2 rounded-md px-3",
          "bg-surface border border-border shadow-xs",
          "text-subheadline text-fg",
          "transition-colors duration-fast ease-standard hover:bg-fill-quaternary",
          focusRing,
        )}
      >
        <SelectValue className="truncate" />
        <RiArrowDownSLine aria-hidden className="text-fg-tertiary size-4 shrink-0" />
      </AriaButton>
      <Popover
        offset={6}
        className={cx(
          "material-thick min-w-(--trigger-width) rounded-xl border border-border p-1 shadow-popover",
          "entering:animate-scale-in",
        )}
      >
        <ListBox items={options} className="outline-none">
          {(item) => (
            <ListBoxItem
              id={item.id}
              textValue={item.label}
              className={cx(
                "flex cursor-default items-center justify-between gap-2 rounded-[7px] px-2.5 py-1.5",
                "text-subheadline text-fg outline-none",
                "focus:bg-accent focus:text-accent-fg",
              )}
            >
              {({ isSelected }) => (
                <>
                  <span className="truncate">{item.label}</span>
                  {isSelected ? <RiCheckLine aria-hidden className="size-4 shrink-0" /> : null}
                </>
              )}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}
