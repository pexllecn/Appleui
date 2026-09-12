import Link from "next/link"
import type { Metadata } from "next"
import {
  RiArrowRightUpLine,
  RiBrushLine,
  RiLayoutGridLine,
  RiSettings4Line,
  RiSmartphoneLine,
  RiTimeLine,
  type RemixiconComponentType,
} from "@remixicon/react"
import { PageHeader, CrumbChip } from "@/components/shell/page-header"
import { Card } from "@/components/ui/card"
import { cx } from "@/utils/cx"

export const metadata: Metadata = { title: "Screens" }

const SCREENS: {
  href: string
  icon: RemixiconComponentType
  title: string
  blurb: string
  note: string
}[] = [
  {
    href: "/screens/workspace",
    icon: RiSettings4Line,
    title: "Workspace settings",
    blurb:
      "A settings window: nav on the window's grey, content on a white card inset from it, feature and integration cards in a three-then-four column grid.",
    note: "Light",
  },
  {
    href: "/screens/business-hours",
    icon: RiTimeLine,
    title: "Business hours",
    blurb:
      "An icon rail, a settings column, and a schedule editor whose rows stay aligned whether a day has one interval or two.",
    note: "Light",
  },
  {
    href: "/screens/appearance",
    icon: RiBrushLine,
    title: "Appearance",
    blurb:
      "Theme previews drawn rather than screenshotted, a selection ring that does not move the card, and hex fields for the brand colours.",
    note: "Light",
  },
  {
    href: "/screens/analytics",
    icon: RiLayoutGridLine,
    title: "Analytics",
    blurb:
      "The dark one: a KPI strip split by hairlines, two comparison charts, a session area and a conversion breakdown.",
    note: "Dark",
  },
  {
    href: "/screens/mobile",
    icon: RiSmartphoneLine,
    title: "Mobile",
    blurb:
      "Four iPhone screens — a feed in both appearances, a conversation list and a thread — sharing one set of tokens with the desktop windows.",
    note: "Light + dark",
  },
]

export default function ScreensIndex() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Screens", icon: <RiLayoutGridLine className="size-4" /> },
        ]}
        title="Screens"
      />

      <p className="text-style-body text-fg-secondary mb-6 max-w-[680px]">
        Five reference layouts rebuilt on the system&rsquo;s own tokens and components — no new
        colours, no one-off type sizes. Each is staged the way the reference stages it: a single
        rounded window, or a row of devices, floating on a flat grey ground.
      </p>

      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        {SCREENS.map((screen) => (
          <Card key={screen.href} tone="raised" className="p-0">
            <Link
              href={screen.href}
              className={cx(
                "flex h-full flex-col gap-3 rounded-2xl p-5",
                "hover:bg-fill-quaternary transition-colors duration-fast",
                "focus-visible:ring-ring/45 outline-none focus-visible:ring-[3px]",
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="bg-fill-quaternary text-fg grid size-8 place-items-center rounded-lg">
                  <screen.icon aria-hidden className="size-4" />
                </span>
                <span className="text-style-headline text-fg flex-1">{screen.title}</span>
                <span className="text-style-caption1 text-fg-tertiary">{screen.note}</span>
                <RiArrowRightUpLine aria-hidden className="text-fg-tertiary size-4" />
              </div>
              <p className="text-style-footnote text-fg-secondary">{screen.blurb}</p>
            </Link>
          </Card>
        ))}
      </div>
    </>
  )
}
