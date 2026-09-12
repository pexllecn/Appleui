"use client"

import {
  RiArrowDownSLine,
  RiArrowRightUpLine,
  RiArrowRightDownLine,
  RiCalendarLine,
  RiChat3Line,
  RiExpandDiagonalLine,
  RiExpandUpDownLine,
  RiFileList3Line,
  RiFileTextLine,
  RiImageLine,
  RiInformationLine,
  RiLayoutGridLine,
  RiQuestionLine,
  RiSearchLine,
  RiSettings4Line,
  RiSparkling2Fill,
  RiTerminalBoxLine,
  type RemixiconComponentType,
} from "@remixicon/react"
import { AreaChart } from "@/components/charts/area-chart"
import { GroupedBarChart } from "@/components/charts/grouped-bar-chart"
import { ScreenCanvas, WindowFrame, WindowPane } from "@/components/frames/frame"
import { PageHeader, CrumbChip } from "@/components/shell/page-header"
import { Kbd } from "@/components/ui/misc"
import {
  analyticsKpis,
  conversionRows,
  orderLabels,
  ordersCurrent,
  ordersPrevious,
  salesCurrent,
  salesLabels,
  salesPrevious,
  sessionSeries,
} from "@/data/screens"
import { cx, focusRing } from "@/utils/cx"

const CURRENT = "#6366F1"
const PREVIOUS = "#7B7BD4"

const NAV: { icon: RemixiconComponentType; label: string; badge?: string; tag?: string; active?: boolean }[] = [
  { icon: RiLayoutGridLine, label: "Dashboard", active: true },
  { icon: RiFileList3Line, label: "Templates" },
  { icon: RiChat3Line, label: "Chat", badge: "12" },
  { icon: RiFileTextLine, label: "Documents" },
  { icon: RiTerminalBoxLine, label: "Recipes" },
  { icon: RiImageLine, label: "Art", tag: "UPGRADE" },
]

/** A filter control: pill, hairline border, leading glyph, trailing chevron.
 * Every control on the toolbar is this one shape, so the row reads as a set. */
function FilterPill({
  icon: Icon,
  children,
  trailing = true,
}: {
  icon?: RemixiconComponentType
  children: React.ReactNode
  trailing?: boolean
}) {
  return (
    <button
      type="button"
      className={cx(
        "border-border bg-surface text-fg inline-flex h-9 items-center gap-2 rounded-xl border px-3",
        "text-footnote font-medium",
        "hover:bg-fill-quaternary transition-colors duration-fast",
        focusRing,
      )}
    >
      {Icon ? <Icon aria-hidden className="text-fg-secondary size-4" /> : null}
      {children}
      {trailing ? <RiArrowDownSLine aria-hidden className="text-fg-tertiary size-4" /> : null}
    </button>
  )
}

/** Four numbers in one bordered strip, split by hairlines rather than by gaps.
 * Separate cards would say "four things"; one strip says "one summary". */
function KpiStrip() {
  return (
    <div className="border-border divide-border grid grid-cols-4 divide-x rounded-2xl border max-md:grid-cols-2 max-md:divide-x-0">
      {analyticsKpis.map((kpi) => (
        <div key={kpi.label} className="px-5 py-4">
          <div className="text-fg-secondary flex items-center gap-1.5 text-footnote">
            {kpi.label}
            <RiInformationLine aria-hidden className="text-fg-tertiary size-3.5" />
          </div>
          <p className="text-style-title1 text-fg mt-2 tabular">{kpi.value}</p>
        </div>
      ))}
    </div>
  )
}

function Panel({
  title,
  value,
  action,
  children,
  className,
}: {
  title: string
  value?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cx("border-border rounded-2xl border p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-style-headline text-fg truncate">{title}</h3>
          {value ? <p className="text-style-title1 text-fg mt-1.5 tabular">{value}</p> : null}
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function ViewReport() {
  return (
    <button
      type="button"
      className={cx(
        "border-border bg-surface-raised text-fg inline-flex h-8 shrink-0 items-center rounded-lg border px-3",
        "text-caption1 font-medium",
        "hover:bg-fill-quaternary transition-colors duration-fast",
        focusRing,
      )}
    >
      View report
    </button>
  )
}

function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-5">
      {items.map((item) => (
        <span key={item.label} className="text-fg-secondary flex items-center gap-2 text-caption1">
          <span className="size-2 rounded-full" style={{ background: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  )
}

const dayLabels = ["May 24", "Jun 3", "Jun 13", "Jun 23"]
const denseLabels = salesCurrent.map((_, i) => dayLabels[Math.floor(i / 8)] ?? "Jun 23")

export default function AnalyticsScreen() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Screens" },
          { label: "Analytics", icon: <RiLayoutGridLine className="size-4" /> },
        ]}
        title="Analytics dashboard"
      />

      <ScreenCanvas>
        <WindowFrame appearance="dark" height={900} className="bg-bg">
          {/* Sidebar. On a dark window the divider does the work a background
            * shift does in light — the sidebar is the same black as the pane. */}
          <div className="border-border-subtle flex w-[268px] shrink-0 flex-col border-r p-3 max-lg:hidden">
            <button
              type="button"
              className={cx(
                "bg-surface-raised/60 border-border-subtle flex items-center gap-2.5 rounded-xl border p-2.5",
                "hover:bg-surface-raised transition-colors duration-fast",
                focusRing,
              )}
            >
              <span className="bg-fg text-bg grid size-8 shrink-0 place-items-center rounded-lg">
                <RiSparkling2Fill aria-hidden className="size-4.5" />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="text-style-caption1 text-fg-secondary block">Project</span>
                <span className="text-style-subheadline text-fg block truncate font-medium">
                  Personal
                </span>
              </span>
              <RiExpandUpDownLine aria-hidden className="text-fg-tertiary size-4 shrink-0" />
            </button>

            <button
              type="button"
              className={cx(
                "text-fg-secondary mt-2.5 flex h-10 items-center gap-2.5 rounded-xl px-2.5",
                "hover:bg-fill-quaternary transition-colors duration-fast text-subheadline",
                focusRing,
              )}
            >
              <RiSearchLine aria-hidden className="size-4.5" />
              Search
              <Kbd>⌘K</Kbd>
            </button>

            <nav aria-label="Sections" className="mt-4 flex flex-col gap-0.5">
              {NAV.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  aria-current={item.active ? "page" : undefined}
                  className={cx(
                    "flex h-10 items-center gap-3 rounded-xl px-2.5 text-subheadline",
                    "transition-colors duration-fast",
                    item.active
                      ? "bg-fill-tertiary text-fg font-medium"
                      : "text-fg-secondary hover:bg-fill-quaternary hover:text-fg",
                    focusRing,
                  )}
                >
                  <item.icon aria-hidden className="size-4.5 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge ? (
                    <span className="bg-fill-tertiary text-fg-secondary rounded-full px-2 py-0.5 text-caption2 font-medium tabular">
                      {item.badge}
                    </span>
                  ) : null}
                  {item.tag ? (
                    <span className="bg-fill-tertiary text-fg-secondary rounded-md px-1.5 py-0.5 text-[10px] font-semibold tracking-wide">
                      {item.tag}
                    </span>
                  ) : null}
                </button>
              ))}
            </nav>

            <div className="flex-1" />

            <div className="flex flex-col gap-0.5">
              {[
                { icon: RiSettings4Line, label: "Settings" },
                { icon: RiQuestionLine, label: "Help" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={cx(
                    "text-fg-secondary hover:text-fg hover:bg-fill-quaternary flex h-10 items-center gap-3 rounded-xl px-2.5",
                    "text-subheadline transition-colors duration-fast",
                    focusRing,
                  )}
                >
                  <item.icon aria-hidden className="size-4.5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <WindowPane>
            <div className="px-8 pt-7 pb-10 max-md:px-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-style-large-title text-fg">Hey, Mikhail</h1>
                  <p className="text-style-footnote text-fg-secondary mt-1.5">
                    Sunday, June 23, 2024
                  </p>
                </div>
                <button
                  type="button"
                  className={cx(
                    "bg-fg text-bg inline-flex h-9 items-center gap-2 rounded-xl px-3.5 text-footnote font-medium",
                    "hover:opacity-90 transition-opacity duration-fast",
                    focusRing,
                  )}
                >
                  Get the Chrome extension
                  <RiArrowRightUpLine aria-hidden className="size-4" />
                </button>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <FilterPill icon={RiCalendarLine}>Last 30 days</FilterPill>
                <FilterPill icon={RiCalendarLine}>Compare: Previous period</FilterPill>
                <div className="ml-auto">
                  <button
                    type="button"
                    className={cx(
                      "border-border bg-surface text-fg inline-flex h-9 items-center gap-2 rounded-xl border px-3",
                      "text-footnote font-medium hover:bg-fill-quaternary transition-colors duration-fast",
                      focusRing,
                    )}
                  >
                    <RiExpandDiagonalLine aria-hidden className="text-fg-secondary size-4" />
                    Full-screen
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <KpiStrip />
              </div>

              <div className="mt-5 grid grid-cols-[1.55fr_1fr] gap-5 max-lg:grid-cols-1">
                <Panel title="Total sales" action={<ViewReport />}>
                  <AreaChart
                    series={[
                      { name: "May 24 - Jun 23, 2024", color: CURRENT, values: salesCurrent },
                      { name: "Apr 24 - May 23, 2023", color: PREVIOUS, values: salesPrevious },
                    ]}
                    labels={denseLabels}
                    fill={false}
                    height={190}
                    showLabels={false}
                    axis="nice"
                    formatValue={(n) => `$${Math.round(n)}k`}
                  />
                  <div className="text-fg-tertiary mt-2 flex justify-between text-caption2">
                    {salesLabels.map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                  <Legend
                    items={[
                      { label: "May 24 - Jun 23, 2024", color: CURRENT },
                      { label: "Apr 24 - May 23, 2023", color: PREVIOUS },
                    ]}
                  />
                </Panel>

                <Panel title="Total orders" action={<ViewReport />}>
                  <GroupedBarChart
                    labels={orderLabels}
                    height={190}
                    formatValue={(n) => Math.round(n).toString()}
                    series={[
                      { name: "May 24 - Jun 23, 2024", color: PREVIOUS, values: ordersPrevious },
                      { name: "Apr 24 - May 23, 2023", color: CURRENT, values: ordersCurrent },
                    ]}
                  />
                  <Legend
                    items={[
                      { label: "May 24 - Jun 23, 2024", color: PREVIOUS },
                      { label: "Apr 24 - May 23, 2023", color: CURRENT },
                    ]}
                  />
                </Panel>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-5 max-lg:grid-cols-1">
                <Panel title="Online store sessions" value="390" action={<ViewReport />}>
                  <AreaChart
                    series={[{ name: "Sessions", color: CURRENT, values: sessionSeries }]}
                    labels={denseLabels}
                    height={150}
                    showLabels={false}
                    axis="nice"
                    formatValue={(n) => Math.round(n).toString()}
                  />
                  <div className="text-fg-tertiary mt-2 flex justify-between text-caption2">
                    {salesLabels.map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                </Panel>

                <Panel
                  title="Online store conversion rate"
                  value="82.05%"
                  action={<ViewReport />}
                >
                  <ul className="divide-border-subtle divide-y">
                    {conversionRows.map((row) => (
                      <li key={row.label} className="flex items-center gap-4 py-3 first:pt-0">
                        <span className="min-w-0 flex-1">
                          <span className="text-style-subheadline text-fg block truncate">
                            {row.label}
                          </span>
                          <span className="text-style-caption1 text-fg-secondary block">
                            {row.sub}
                          </span>
                        </span>
                        <span className="text-style-subheadline text-fg tabular">{row.value}</span>
                        <span
                          className={cx(
                            "flex w-16 items-center justify-end gap-0.5 text-caption1 tabular",
                            row.up ? "text-success" : "text-danger",
                          )}
                        >
                          {row.up ? (
                            <RiArrowRightUpLine aria-hidden className="size-3.5" />
                          ) : (
                            <RiArrowRightDownLine aria-hidden className="size-3.5" />
                          )}
                          {row.delta}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Panel>
              </div>
            </div>
          </WindowPane>
        </WindowFrame>
      </ScreenCanvas>
    </>
  )
}
