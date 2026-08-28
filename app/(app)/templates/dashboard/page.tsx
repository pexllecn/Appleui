"use client"

import { useState } from "react"
import {
  RiAddLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiBox3Line,
  RiChat3Line,
  RiFilter3Line,
  RiHome5Line,
  RiShoppingBag3Line,
  RiUser3Line,
} from "@remixicon/react"
import { Card, CardBody, CardHeader, CardMetric } from "@/components/ui/card"
import { Delta } from "@/components/ui/delta"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Select } from "@/components/ui/select"
import { AreaChart } from "@/components/charts/area-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { Heatmap } from "@/components/charts/heatmap"
import { Sparkline } from "@/components/charts/sparkline"
import { CrumbChip, NotificationBell, PageHeader } from "@/components/shell/page-header"
import { contributions, monthlySpend, recentHires, revenue, summaryCards } from "@/data/dashboard"
import { compact, compactUsd, MONTHS, usd } from "@/lib/format"

const RANGES = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
] as const

const summaryIcons = [RiUser3Line, RiBox3Line, RiShoppingBag3Line, RiChat3Line]

export default function DashboardPage() {
  const [hirePage, setHirePage] = useState(0)
  const [month, setMonth] = useState(0)
  const [spendRange, setSpendRange] = useState<string>("weekly")
  const [revenueRange, setRevenueRange] = useState<string>("weekly")
  const [activityRange, setActivityRange] = useState<string>("weekly")

  const hires = recentHires.people.slice(hirePage * 4, hirePage * 4 + 4)

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Mertcan", icon: <CrumbChip tone="neutral">M</CrumbChip> },
          { label: "Home", icon: <RiHome5Line className="size-4" /> },
        ]}
        title="Welcome Mertcan"
        actions={
          <>
            <NotificationBell count={5} />
            <Button size="md">
              <RiFilter3Line />
              Filters
            </Button>
            <Button variant="primary" size="md">
              <RiAddLine />
              Create ticket
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Recent hires */}
        <Card>
          <CardMetric
            label="Recent hires"
            value={recentHires.total}
            action={
              <Select
                aria-label="Team"
                options={[
                  { id: "board", label: "Board team" },
                  { id: "design", label: "Design" },
                  { id: "eng", label: "Engineering" },
                ]}
                defaultSelectedKey="board"
              />
            }
          />
          <CardBody className="pt-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {hires.map((person) => (
                <div key={person.name} className="bg-surface border-border rounded-xl border p-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={person.name} size="lg" />
                    <div className="min-w-0">
                      <p className="text-style-subheadline text-fg truncate font-semibold">
                        {person.name}
                      </p>
                      <p className="text-style-footnote text-fg-secondary">{person.when}</p>
                    </div>
                  </div>
                  <p className="bg-fill-quaternary text-fg-secondary mt-3 rounded-lg py-1.5 text-center text-caption1">
                    {person.role}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button
                onPress={() => setHirePage((p) => Math.max(0, p - 1))}
                isDisabled={hirePage === 0}
              >
                <RiArrowLeftLine />
                Previous
              </Button>
              <Button
                onPress={() => setHirePage((p) => p + 1)}
                isDisabled={(hirePage + 1) * 4 >= recentHires.people.length}
              >
                Next
                <RiArrowRightLine />
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Monthly billing */}
        <Card>
          <CardMetric
            label={MONTHS[month] === "Jan" ? "January" : monthName(month)}
            value={usd(monthlySpend.values[month])}
            action={
              <SegmentedControl
                aria-label="Range"
                options={[...RANGES]}
                value={spendRange as (typeof RANGES)[number]["value"]}
                onChange={setSpendRange}
              />
            }
          />
          <CardBody className="pt-5">
            <BarChart
              labels={MONTHS}
              values={monthlySpend.values}
              showTrack
              max={monthlySpend.capacity}
              selectedIndex={month}
              onSelect={setMonth}
              formatValue={compactUsd}
              height={240}
            />
          </CardBody>
        </Card>

        {/* Revenue */}
        <Card>
          <CardMetric
            label="Revenue"
            value={usd(revenue.total)}
            delta={<Delta value={revenue.delta} />}
            action={
              <SegmentedControl
                aria-label="Range"
                options={[...RANGES]}
                value={revenueRange as (typeof RANGES)[number]["value"]}
                onChange={setRevenueRange}
              />
            }
          />
          <CardBody className="pt-5">
            <AreaChart
              labels={MONTHS}
              series={[{ name: "Revenue", color: "var(--color-chart-1)", values: revenue.values }]}
              formatValue={compactUsd}
              height={230}
            />
          </CardBody>
        </Card>

        {/* Contributions */}
        <Card>
          <CardMetric
            label="Contributions this year"
            value={contributions.total}
            delta={<Delta value={contributions.delta} tone="purple" />}
          />
          <CardBody className="pt-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {contributions.stats.map((stat) => (
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
                options={[...RANGES]}
                value={activityRange as (typeof RANGES)[number]["value"]}
                onChange={setActivityRange}
              />
            </div>
            <Heatmap
              className="mt-3"
              weeks={contributions.weeks}
              labels={MONTHS}
              color="var(--color-chart-3)"
            />
          </CardBody>
        </Card>
      </div>

      {/* Summary row */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card, i) => {
          const Icon = summaryIcons[i]
          return (
            <Card key={card.label}>
              <CardHeader
                title={
                  <span className="bg-surface border-border grid size-9 place-items-center rounded-xl border">
                    <Icon className="text-fg-secondary size-4.5" />
                  </span>
                }
              />
              <CardBody>
                <p className="text-style-subheadline text-fg-secondary">{card.label}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-style-title2 text-fg tabular">
                    {compact(card.value, card.value >= 10_000 ? 1 : 2)}
                  </span>
                  <Delta value={card.delta} />
                </div>
                <Sparkline
                  className="mt-3"
                  values={card.trend}
                  color={card.delta >= 0 ? "var(--color-chart-1)" : "var(--color-danger)"}
                />
              </CardBody>
            </Card>
          )
        })}
      </div>
    </>
  )
}

function monthName(index: number) {
  return new Date(2026, index, 1).toLocaleString("en-US", { month: "long" })
}
