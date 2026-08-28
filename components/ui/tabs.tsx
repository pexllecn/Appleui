"use client"

import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  type TabsProps,
} from "react-aria-components"
import { cx, focusRing } from "@/utils/cx"

/** Underlined tabs, the shape Apple uses for in-page navigation on the web. */
export function Tabs({ className, ...props }: TabsProps) {
  return <AriaTabs {...props} className={cx("flex flex-col", className as string)} />
}

export function TabList<T extends object>({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AriaTabList<T>>) {
  return (
    <AriaTabList
      {...props}
      className={cx(
        "border-border no-scrollbar flex gap-6 overflow-x-auto border-b",
        className as string,
      )}
    />
  )
}

export function Tab({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AriaTab>) {
  return (
    <AriaTab
      {...props}
      className={cx(
        "relative -mb-px cursor-default border-b-2 border-transparent px-0.5 pb-2.5",
        "text-subheadline font-medium whitespace-nowrap",
        "text-fg-secondary hover:text-fg",
        "selected:border-accent selected:text-fg",
        "transition-colors duration-fast ease-standard",
        focusRing,
        className as string,
      )}
    />
  )
}

export function TabPanel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AriaTabPanel>) {
  return <AriaTabPanel {...props} className={cx("pt-5 outline-none", className as string)} />
}
