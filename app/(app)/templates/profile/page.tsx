"use client"

import { useState } from "react"
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiEditBoxLine,
  RiEmotionLine,
  RiShareBoxLine,
} from "@remixicon/react"
import { Card, CardBody, CardMetric } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Delta } from "@/components/ui/delta"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Heatmap } from "@/components/charts/heatmap"
import { BarChart } from "@/components/charts/bar-chart"
import { CrumbChip, NotificationBell, PageHeader } from "@/components/shell/page-header"
import { activityFeed, agents, profile } from "@/data/profile"
import { MONTHS } from "@/lib/format"

const RANGES = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
]

export default function ProfilePage() {
  const [range, setRange] = useState("weekly")
  const [monthOffset, setMonthOffset] = useState(0)

  return (
    <div className="mx-auto max-w-[860px]">
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Mertcan", icon: <CrumbChip tone="neutral">M</CrumbChip> },
          { label: "Profile", icon: <RiEmotionLine className="size-4" /> },
        ]}
        title="Profile"
        actions={<NotificationBell count={5} />}
      />

      {/* Cover + identity */}
      <Card tone="plain" className="overflow-hidden">
        <div
          className="h-[190px] rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, var(--color-chart-2) 0%, var(--color-chart-3) 46%, var(--color-chart-4) 100%)",
          }}
        />
        <div className="relative -mt-11 px-5">
          <div className="flex items-end justify-between gap-4">
            <span className="bg-fill-secondary ring-bg text-fg grid size-[88px] place-items-center rounded-full text-large-title font-semibold ring-4 backdrop-blur-sm">
              M
            </span>
            <div className="flex items-center gap-2.5 pb-2">
              <Button>
                <RiShareBoxLine />
                Share
              </Button>
              <Button>
                <RiEditBoxLine />
                Edit
              </Button>
              </div>
            </div>

            <h2 className="text-style-title1 text-fg mt-4">{profile.name}</h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-style-callout text-fg-secondary">{profile.handle}</span>
              <Badge>{profile.plan}</Badge>
            </div>
          </div>
        </Card>

        {/* Contributions */}
        <Card className="mt-5">
          <CardMetric
            label="Contributions this year"
            value={profile.contributions.value}
            delta={<Delta value={profile.contributions.delta} tone="purple" />}
          />
          <CardBody className="pt-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {profile.stats.map((stat) => (
                <div key={stat.label} className="bg-surface border-border rounded-xl border p-3">
                  <p className="text-style-headline text-fg tabular">{stat.value}</p>
                  <p className="text-style-footnote text-fg-secondary mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-style-subheadline text-fg font-medium">Activity</p>
              <SegmentedControl
                aria-label="Activity range"
                size="sm"
                options={RANGES}
                value={range}
                onChange={setRange}
              />
            </div>
            <Heatmap
              className="mt-3"
              weeks={profile.weeks}
              labels={MONTHS}
              color="var(--color-chart-3)"
            />
          </CardBody>
        </Card>

        {/* Agents */}
        <Card className="mt-5">
          <CardMetric
            label="Agents"
            value={`${agents.total} agents`}
            action={
              <div className="border-border bg-surface flex h-8.5 items-center gap-1 rounded-xl border px-1 shadow-xs">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => setMonthOffset((m) => m - 1)}
                  className="text-fg-secondary hover:bg-fill-quaternary hover:text-fg focus-visible:ring-ring/45 grid size-6.5 place-items-center rounded-lg outline-none focus-visible:ring-[3px]"
                >
                  <RiArrowLeftSLine className="size-4" />
                </button>
                <span className="text-style-subheadline text-fg min-w-20 text-center font-medium">
                  {monthName(monthOffset)}
                </span>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => setMonthOffset((m) => m + 1)}
                  className="text-fg-secondary hover:bg-fill-quaternary hover:text-fg focus-visible:ring-ring/45 grid size-6.5 place-items-center rounded-lg outline-none focus-visible:ring-[3px]"
                >
                  <RiArrowRightSLine className="size-4" />
                </button>
              </div>
            }
          />
          <CardBody className="pt-6">
            <BarChart
              labels={agents.daily.map((_, i) => String(i + 1))}
              values={agents.daily}
              color="var(--color-chart-3)"
              showAxis={false}
              height={190}
            />
          </CardBody>
        </Card>

        {/* Activity feed */}
        <Card className="mt-5">
          <CardMetric label="Recent activity" value={activityFeed.length} />
          <CardBody className="pt-4">
            <ul className="bg-surface border-border divide-border-subtle divide-y overflow-hidden rounded-xl border">
              {activityFeed.map((entry) => (
                <li key={entry.id} className="flex items-center gap-3 px-3.5 py-3">
                  <Avatar name={entry.actor} size="md" />
                  <p className="text-style-subheadline text-fg-secondary min-w-0 flex-1 truncate">
                    <span className="text-fg font-medium">{entry.actor}</span> {entry.action}{" "}
                    <span className="text-fg font-medium">{entry.target}</span>
                  </p>
                  <span className="text-style-caption1 text-fg-tertiary shrink-0">{entry.when}</span>
                </li>
              ))}
            </ul>
          </CardBody>
      </Card>
    </div>
  )
}

function monthName(offset: number) {
  const base = new Date(Date.UTC(2026, 11, 1))
  base.setUTCMonth(base.getUTCMonth() + offset)
  return base.toLocaleString("en-US", { month: "long", timeZone: "UTC" })
}
