"use client"

import {
  Button as AriaButton,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuTrigger as AriaMenuTrigger,
  Popover,
  type MenuItemProps,
  type MenuProps,
} from "react-aria-components"
import { cx } from "@/utils/cx"

export const MenuTrigger = AriaMenuTrigger
export const MenuButton = AriaButton

export function Menu<T extends object>({ className, ...props }: MenuProps<T>) {
  return (
    <Popover
      offset={6}
      className={cx(
        "material-thick border-border min-w-44 rounded-xl border p-1 shadow-popover",
        "entering:animate-scale-in",
      )}
    >
      <AriaMenu {...props} className={cx("outline-none", className as string)} />
    </Popover>
  )
}

export function MenuItem({ className, ...props }: MenuItemProps) {
  return (
    <AriaMenuItem
      {...props}
      className={cx(
        "flex cursor-default items-center gap-2.5 rounded-[7px] px-2.5 py-1.5",
        "text-subheadline text-fg outline-none",
        "focus:bg-accent focus:text-accent-fg",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className as string,
      )}
    />
  )
}
