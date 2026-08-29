"use client"

import { useState, type ReactNode } from "react"
import { RiLayoutRightLine } from "@remixicon/react"
import { Sidebar } from "./sidebar"
import { cx } from "@/utils/cx"

/** The window: a floating sidebar panel beside a scrolling content pane, both
 * inset from the page edge. */
export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="bg-bg flex h-dvh gap-4 p-4 max-lg:p-3">
      {collapsed ? (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Expand sidebar"
          className={cx(
            "bg-surface border-border text-fg-secondary hover:text-fg fixed top-6 left-6 z-30 grid size-9 place-items-center",
            "rounded-xl border shadow-sm transition-colors duration-fast",
            "focus-visible:ring-ring/45 outline-none focus-visible:ring-[3px]",
          )}
        >
          <RiLayoutRightLine className="size-5" />
        </button>
      ) : (
        <div className="max-lg:hidden">
          <Sidebar onCollapse={() => setCollapsed(true)} />
        </div>
      )}

      <main
        className={cx(
          "min-w-0 flex-1 overflow-y-auto overscroll-contain",
          collapsed && "pl-14",
        )}
      >
        <div className="mx-auto max-w-[1400px] px-1 pb-10">{children}</div>
      </main>
    </div>
  )
}
