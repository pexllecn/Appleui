import type { ReactNode } from "react"
import { cx } from "@/utils/cx"
import type { Appearance } from "./frame"

const appearances = { light: "appearance-light", dark: "appearance-dark", auto: "" } as const

/** iPhone status bar: 9:41, always, and the three glyphs drawn as SVG so they
 * stay hairline-crisp at any scale and pick up `currentColor` in both
 * appearances. */
function StatusBar() {
  return (
    <div className="text-fg flex h-[54px] shrink-0 items-end justify-between px-9 pb-1.5">
      <span className="text-[15px] font-semibold tracking-[-0.01em] tabular">9:41</span>
      <div className="flex items-center gap-1.5">
        {/* Cellular */}
        <svg viewBox="0 0 18 12" aria-hidden className="h-3 w-[18px]" fill="currentColor">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 4.6} y={8 - i * 2.4} width="3" height={4 + i * 2.4} rx="1" />
          ))}
        </svg>
        {/* Wi-Fi */}
        <svg viewBox="0 0 16 12" aria-hidden className="h-3 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M1.2 4.4a10 10 0 0 1 13.6 0" />
          <path d="M3.8 7a6.4 6.4 0 0 1 8.4 0" />
          <path d="M6.4 9.5a2.7 2.7 0 0 1 3.2 0" />
        </svg>
        {/* Battery */}
        <svg viewBox="0 0 27 12" aria-hidden className="h-3 w-[27px]">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3.2" fill="none" stroke="currentColor" strokeOpacity="0.38" />
          <rect x="2" y="2" width="19" height="8" rx="2" fill="currentColor" />
          <path d="M24.2 4.3a2.4 2.4 0 0 1 0 3.4Z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  )
}

/** 390 × 844 — the iPhone 14 logical viewport, drawn at 1× and scaled by the
 * caller. The bezel is a single 54px-radius stroke; inside it the safe areas
 * are real: 54px of status bar at the top, 34px of home indicator at the
 * bottom. Content never touches either. */
export function PhoneFrame({
  appearance = "light",
  label,
  className,
  children,
}: {
  appearance?: Appearance
  label: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cx(
        appearances[appearance],
        "bg-surface relative flex h-[844px] w-[390px] shrink-0 flex-col overflow-hidden",
        "rounded-[54px] shadow-xl",
        "ring-1 ring-black/8 dark:ring-white/10",
        className,
      )}
    >
      <StatusBar />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <div className="flex h-[34px] shrink-0 items-center justify-center">
        <span className="bg-fg h-[5px] w-[140px] rounded-full" />
      </div>
    </div>
  )
}

/** The large-title header: 34px bold on the left, round glyph buttons on the
 * right, no border under it. */
export function PhoneHeader({
  title,
  leading,
  actions,
}: {
  title: ReactNode
  leading?: ReactNode
  actions?: ReactNode
}) {
  return (
    <header className="flex shrink-0 items-center gap-2.5 px-5 pt-2 pb-3.5">
      {leading}
      <h2 className="text-style-large-title text-fg flex min-w-0 flex-1 items-center gap-2.5">
        {title}
      </h2>
      {actions ? <div className="flex shrink-0 items-center gap-3.5">{actions}</div> : null}
    </header>
  )
}
