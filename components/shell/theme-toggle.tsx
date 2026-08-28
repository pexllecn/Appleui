"use client"

import { useEffect, useState } from "react"
import { RiMoonLine, RiSunLine } from "@remixicon/react"
import { cx } from "@/utils/cx"

type Appearance = "light" | "dark"

export function applyAppearance(appearance: Appearance) {
  document.documentElement.classList.toggle("dark", appearance === "dark")
  try {
    localStorage.setItem("appleui-appearance", appearance)
  } catch {
    // Private browsing, or storage blocked. The toggle still works this session.
  }
}

/** Two icon buttons on a recessed track, with a white thumb behind the active
 * one — Apple's appearance switch. */
export function ThemeToggle({ className }: { className?: string }) {
  const [appearance, setAppearance] = useState<Appearance>("light")

  useEffect(() => {
    setAppearance(document.documentElement.classList.contains("dark") ? "dark" : "light")
  }, [])

  const select = (next: Appearance) => {
    setAppearance(next)
    applyAppearance(next)
  }

  return (
    <div
      role="radiogroup"
      aria-label="Appearance"
      className={cx("bg-fill-quaternary relative inline-flex rounded-full p-1", className)}
    >
      <span
        aria-hidden
        className={cx(
          "bg-surface absolute top-1 bottom-1 left-1 w-9 rounded-full shadow-sm",
          "transition-transform duration-normal ease-out-quint",
          appearance === "dark" && "translate-x-9",
        )}
      />
      {(
        [
          { value: "light" as const, Icon: RiSunLine, label: "Light" },
          { value: "dark" as const, Icon: RiMoonLine, label: "Dark" },
        ]
      ).map(({ value, Icon, label }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={appearance === value}
          aria-label={label}
          onClick={() => select(value)}
          className={cx(
            "focus-visible:ring-ring/45 relative grid size-9 place-items-center rounded-full outline-none focus-visible:ring-[3px]",
            "transition-colors duration-fast",
            appearance === value ? "text-fg" : "text-fg-tertiary hover:text-fg-secondary",
          )}
        >
          <Icon className="size-4.5" />
        </button>
      ))}
    </div>
  )
}

/** Runs before paint so the first frame is already in the right appearance. */
export const appearanceScript = `
(function(){
  try {
    var stored = localStorage.getItem('appleui-appearance');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`
