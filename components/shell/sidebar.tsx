"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  RiArrowDownSLine,
  RiExpandUpDownLine,
  RiLayoutRightLine,
  RiSearchLine,
} from "@remixicon/react"
import { account, primaryNav, secondaryNav, type NavItem } from "@/data/navigation"
import { Kbd } from "@/components/ui/misc"
import { ThemeToggle } from "./theme-toggle"
import { cx } from "@/utils/cx"

function NavRow({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cx(
        "group flex h-11 items-center gap-3 rounded-xl px-3.5",
        "text-subheadline font-medium",
        "transition-colors duration-fast ease-standard",
        "focus-visible:ring-ring/45 outline-none focus-visible:ring-[3px]",
        active
          ? "bg-accent text-accent-fg shadow-sm"
          : "text-fg hover:bg-fill-quaternary",
      )}
    >
      <Icon className={cx("size-5 shrink-0", active ? "text-accent-fg" : "text-fg-secondary")} />
      <span className="truncate">{item.label}</span>
      {item.badge ? (
        <span
          className={cx(
            "ml-auto text-caption1 tabular",
            active ? "text-accent-fg/80" : "text-fg-tertiary",
          )}
        >
          {item.badge}
        </span>
      ) : null}
    </Link>
  )
}

export function Sidebar({ onCollapse }: { onCollapse?: () => void }) {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <aside
      className={cx(
        "bg-bg-subtle border-border-subtle flex w-[288px] shrink-0 flex-col rounded-2xl border",
        "dark:bg-surface",
      )}
    >
      {/* Account switcher */}
      <div className="flex items-center gap-2.5 px-3.5 pt-3.5 pb-2">
        <span className="bg-fill-tertiary text-fg grid size-8 shrink-0 place-items-center rounded-lg text-caption1 font-semibold">
          M
        </span>
        <button
          type="button"
          className="focus-visible:ring-ring/45 flex min-w-0 flex-1 items-center gap-1 rounded-md text-left outline-none focus-visible:ring-[3px]"
        >
          <span className="text-style-subheadline text-fg truncate font-semibold">
            {account.name}
          </span>
          <RiExpandUpDownLine className="text-fg-tertiary size-3.5 shrink-0" />
        </button>
        <button
          type="button"
          onClick={onCollapse}
          aria-label="Collapse sidebar"
          className="text-fg-tertiary hover:text-fg focus-visible:ring-ring/45 grid size-7 shrink-0 place-items-center rounded-md outline-none focus-visible:ring-[3px]"
        >
          <RiLayoutRightLine className="size-5" />
        </button>
      </div>

      {/* Quick search */}
      <div className="px-3.5 pb-2">
        <button
          type="button"
          className={cx(
            "bg-fill-quaternary hover:bg-fill-tertiary flex h-10 w-full items-center gap-2.5 rounded-xl px-3",
            "text-subheadline transition-colors duration-fast",
            "focus-visible:ring-ring/45 outline-none focus-visible:ring-[3px]",
          )}
        >
          <RiSearchLine className="text-fg-secondary size-4.5 shrink-0" />
          <span className="text-fg-secondary">Quick Search</span>
          <Kbd>⌘L</Kbd>
        </button>
      </div>

      <nav aria-label="Primary" className="flex flex-col gap-0.5 px-3.5 py-1.5">
        {primaryNav.map((item) => (
          <NavRow key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </nav>

      <div className="flex-1" />

      <div className="px-3.5 pb-1.5">
        <ThemeToggle />
      </div>

      <nav aria-label="Secondary" className="flex flex-col gap-0.5 px-3.5 pb-2">
        {secondaryNav.map((item) => (
          <NavRow key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </nav>

      {/* Workspace card */}
      <div className="px-3.5 pb-3.5">
        <button
          type="button"
          className={cx(
            "bg-surface border-border flex w-full items-center gap-2.5 rounded-xl border p-2.5 text-left shadow-xs",
            "hover:bg-fill-quaternary transition-colors duration-fast",
            "focus-visible:ring-ring/45 outline-none focus-visible:ring-[3px]",
          )}
        >
          <span className="bg-accent text-accent-fg grid size-9 shrink-0 place-items-center rounded-[10px] text-callout font-bold">
            B
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-style-subheadline text-fg block truncate font-semibold">
              {account.team}
            </span>
            <span className="text-style-caption1 text-fg-secondary block truncate">
              {account.email}
            </span>
          </span>
          <RiArrowDownSLine className="text-fg-tertiary size-4 shrink-0" />
        </button>
      </div>
    </aside>
  )
}
