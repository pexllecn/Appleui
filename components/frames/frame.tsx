import type { ReactNode } from "react"
import { cx } from "@/utils/cx"

/** The three reference layouts all share one staging idea: the product is a
 * single rounded window floating, inset, on a flat grey ground with a long soft
 * shadow. Nothing bleeds to the edge of the page. */
export type Appearance = "light" | "dark" | "auto"

const appearances: Record<Appearance, string> = {
  light: "appearance-light",
  dark: "appearance-dark",
  auto: "",
}

/** The grey ground. Deliberately flatter and a step darker than the window it
 * holds, so the window reads as raised before any shadow is drawn. The ground
 * follows the page's appearance, never the window's: in the references a dark
 * app is still staged on light grey. */
export function ScreenCanvas({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cx("bg-bg-muted rounded-3xl p-6 max-md:p-3", className)}>
      {children}
    </div>
  )
}

/** A desktop window: 26px continuous corners, a hairline, and shadow-xl. The
 * radius is large enough that the corner curve is visible against the sidebar
 * inside it — that curve is the whole signature of the layout. */
export function WindowFrame({
  appearance = "light",
  height = 820,
  className,
  children,
}: {
  appearance?: Appearance
  height?: number
  className?: string
  children: ReactNode
}) {
  return (
    <div
      style={{ height }}
      className={cx(
        appearances[appearance],
        "bg-surface border-border-subtle flex overflow-hidden rounded-[26px] border shadow-xl",
        "text-fg",
        className,
      )}
    >
      {children}
    </div>
  )
}

/** The scrolling half of a window. Content is clipped by the window's own
 * corner radius, never by a scrollbar. */
export function WindowPane({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cx("no-scrollbar min-w-0 flex-1 overflow-y-auto", className)}>{children}</div>
  )
}

/** Section heading + optional blurb, the rhythm every settings pane opens with:
 * a semibold 20px line, then 13px secondary copy, then the content. */
export function SettingsSection({
  title,
  description,
  className,
  children,
}: {
  title: ReactNode
  description?: ReactNode
  className?: string
  children?: ReactNode
}) {
  return (
    <section className={cx("min-w-0", className)}>
      <h2 className="text-style-title3 text-fg">{title}</h2>
      {description ? (
        <p className="text-style-footnote text-fg-secondary mt-1.5">{description}</p>
      ) : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  )
}
