import Link from "next/link"
import {
  RiArrowRightUpLine,
  RiCalendarLine,
  RiEmotionLine,
  RiHome5Line,
  RiLayoutGridLine,
  RiMegaphoneLine,
  RiPaletteLine,
  RiPulseLine,
} from "@remixicon/react"
import palette from "@/data/palette.json"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cx } from "@/utils/cx"

const TEMPLATES = [
  {
    href: "/templates/dashboard",
    icon: RiHome5Line,
    title: "Dashboard",
    blurb: "Recent hires, a monthly target with capacity tracks, revenue, a contribution heatmap and a metric row.",
  },
  {
    href: "/templates/marketing",
    icon: RiMegaphoneLine,
    title: "Marketing",
    blurb: "KPIs, an acquisition funnel, a spend gauge, session bar lists, a dual-axis spend-vs-ROAS chart and the campaigns table.",
  },
  {
    href: "/templates/calendar",
    icon: RiCalendarLine,
    title: "Calendar",
    blurb: "A month grid with tinted event chips and an event-detail popover carrying the meeting link, times and participants.",
  },
  {
    href: "/templates/profile",
    icon: RiEmotionLine,
    title: "Profile",
    blurb: "Cover, stat tiles, a year of activity as a heatmap, a per-day agents chart and an activity feed.",
  },
  {
    href: "/templates/medical-report",
    icon: RiPulseLine,
    title: "Medical report",
    blurb: "Patient card, weekly steps, a sleep donut, concentric activity rings per day, alerts and the patients table.",
  },
]

const REFERENCE = [
  {
    href: "/components/color",
    icon: RiPaletteLine,
    title: "Color",
    blurb: "Every ramp, every semantic token, live and copy-to-clipboard.",
  },
  {
    href: "/components",
    icon: RiLayoutGridLine,
    title: "Components",
    blurb: "Every primitive and chart, interactive.",
  },
]

const rampCount = Object.keys(palette.ramps as object).length + 1

export default function OverviewPage() {
  return (
    <div className="mx-auto max-w-[1100px] pt-6">
      <header className="mb-9">
        <Badge tone="accent">Design system</Badge>
        <h1 className="text-style-display text-fg mt-3">AppleUI</h1>
        <p className="text-style-body text-fg-secondary mt-3 max-w-2xl">
          An Apple-flavoured design system for data-dense dashboards. Every colour is derived from
          Apple&rsquo;s published system palette in OKLCH, every chart is hand-written SVG, and every
          component is built on react-aria-components.
        </p>

        <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["430", "design tokens"],
            [String(rampCount), "colour ramps"],
            ["10", "chart types"],
            ["5", "templates"],
          ].map(([value, label]) => (
            <div key={label} className="bg-bg-subtle dark:bg-surface rounded-2xl px-4 py-3.5">
              <dt className="text-style-title2 text-fg tabular">{value}</dt>
              <dd className="text-style-footnote text-fg-secondary mt-0.5">{label}</dd>
            </div>
          ))}
        </dl>
      </header>

      <h2 className="text-style-eyebrow text-fg-tertiary mb-3">Reference</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {REFERENCE.map((entry) => (
          <Tile key={entry.href} {...entry} />
        ))}
      </div>

      <h2 className="text-style-eyebrow text-fg-tertiary mt-9 mb-3">Templates</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((entry) => (
          <Tile key={entry.href} {...entry} />
        ))}
      </div>
    </div>
  )
}

function Tile({
  href,
  icon: Icon,
  title,
  blurb,
}: {
  href: string
  icon: typeof RiHome5Line
  title: string
  blurb: string
}) {
  return (
    <Link
      href={href}
      className={cx(
        "group focus-visible:ring-ring/45 rounded-2xl outline-none focus-visible:ring-[3px]",
      )}
    >
      <Card className="hover:bg-bg-muted dark:hover:bg-surface-raised h-full p-5 transition-colors duration-fast">
        <div className="flex items-start justify-between gap-3">
          <span className="bg-surface border-border grid size-10 place-items-center rounded-xl border">
            <Icon className="text-fg-secondary size-5" />
          </span>
          <RiArrowRightUpLine className="text-fg-quaternary group-hover:text-fg-secondary size-5 transition-colors duration-fast" />
        </div>
        <h3 className="text-style-headline text-fg mt-4">{title}</h3>
        <p className="text-style-footnote text-fg-secondary mt-1.5">{blurb}</p>
      </Card>
    </Link>
  )
}
