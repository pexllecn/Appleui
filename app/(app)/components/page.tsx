"use client"

import { useState } from "react"
import Link from "next/link"
import {
  RiAddLine,
  RiArrowRightLine,
  RiInboxLine,
  RiLayoutGridLine,
  RiPaletteLine,
} from "@remixicon/react"
import { Card, CardBody, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Delta } from "@/components/ui/delta"
import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { SearchField, TextField } from "@/components/ui/field"
import { Select } from "@/components/ui/select"
import { Menu, MenuButton, MenuItem, MenuTrigger } from "@/components/ui/menu"
import { Pagination } from "@/components/ui/pagination"
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs"
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table"
import { EmptyState } from "@/components/ui/empty-state"
import { Kbd, ProgressBar, Separator, Skeleton } from "@/components/ui/misc"
import { AreaChart } from "@/components/charts/area-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { ComboChart } from "@/components/charts/combo-chart"
import { FunnelChart } from "@/components/charts/funnel-chart"
import { BarList } from "@/components/charts/bar-list"
import { Heatmap } from "@/components/charts/heatmap"
import { Sparkline } from "@/components/charts/sparkline"
import { ActivityRings, DonutChart, GaugeChart, ProgressRing } from "@/components/charts/radial"
import { CrumbChip, PageHeader } from "@/components/shell/page-header"
import { MONTHS, compactUsd } from "@/lib/format"
import { seededInts } from "@/lib/random"

const TREND = [12, 18, 16, 22, 26, 24, 31, 34, 33, 39, 42, 48]
const SERIES = [{ name: "Revenue", color: "var(--color-chart-1)", values: TREND.map((n) => n * 120) }]
const HEAT = Array.from({ length: 26 }, (_, w) => seededInts(9000 + w, 7, 0, 12))

const SEGMENTS = [
  { name: "Paid search", value: 46, color: "var(--color-chart-1)" },
  { name: "Paid social", value: 30, color: "var(--color-chart-2)" },
  { name: "Email", value: 13, color: "var(--color-chart-3)" },
  { name: "Affiliates", value: 11, color: "var(--color-chart-4)" },
]

export default function ComponentsPage() {
  const [segment, setSegment] = useState("day")
  const [page, setPage] = useState(3)
  const [checked, setChecked] = useState(true)

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Components", icon: <RiLayoutGridLine className="size-4" /> },
        ]}
        title="Components"
        actions={
          <Link
            href="/components/color"
            className="bg-accent text-accent-fg focus-visible:ring-ring/45 inline-flex h-9 items-center gap-2 rounded-xl px-4 text-subheadline font-medium outline-none focus-visible:ring-[3px]"
          >
            <RiPaletteLine className="size-4" />
            Color
          </Link>
        }
      />

      <p className="text-style-body text-fg-secondary mb-6 max-w-2xl">
        Every primitive and chart in the system, live. Interaction is real — press the buttons,
        scrub the charts, tab through the controls.
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Buttons" description="Five variants across four sizes">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary">Primary</Button>
            <Button>Secondary</Button>
            <Button variant="tinted">Tinted</Button>
            <Button variant="plain">Plain</Button>
            <Button variant="destructive">Delete</Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button size="sm" variant="primary">
              Small
            </Button>
            <Button size="md" variant="primary">
              Medium
            </Button>
            <Button size="lg" variant="primary">
              Large
            </Button>
            <Button size="icon" variant="primary" aria-label="Add">
              <RiAddLine />
            </Button>
            <Button isDisabled>Disabled</Button>
          </div>
        </Section>

        <Section title="Badges and deltas" description="Status pills and signed change">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Neutral</Badge>
            <Badge tone="accent">Awareness</Badge>
            <Badge tone="info">Traffic</Badge>
            <Badge tone="success" dot>
              Active
            </Badge>
            <Badge tone="warning" dot>
              Paused
            </Badge>
            <Badge tone="danger" dot>
              Failed
            </Badge>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Delta value={8.4} />
            <Delta value={-3.1} />
            <Delta value={14.8} tone="purple" />
            <Delta value={2.6} tone="accent" />
          </div>
        </Section>

        <Section title="Form controls" description="Built on react-aria-components">
          <div className="flex flex-col gap-4">
            <TextField label="Workspace name" defaultValue="Board team" />
            <Select
              label="Objective"
              options={[
                { id: "awareness", label: "Awareness" },
                { id: "traffic", label: "Traffic" },
                { id: "leads", label: "Leads" },
              ]}
              defaultSelectedKey="awareness"
            />
            <SearchField aria-label="Search" />
            <div className="flex flex-wrap items-center gap-6">
              <Checkbox isSelected={checked} onChange={setChecked}>
                Send weekly digest
              </Checkbox>
              <Switch defaultSelected>Auto-refresh</Switch>
            </div>
          </div>
        </Section>

        <Section title="Selection" description="Segmented control, tabs, menu, pagination">
          <SegmentedControl
            aria-label="Granularity"
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
            value={segment}
            onChange={setSegment}
          />

          <Tabs defaultSelectedKey="overview" className="mt-4">
            <TabList aria-label="Sections">
              <Tab id="overview">Overview</Tab>
              <Tab id="activity">Activity</Tab>
              <Tab id="settings">Settings</Tab>
            </TabList>
            <TabPanel id="overview" className="text-style-subheadline text-fg-secondary">
              Selected granularity: <span className="text-fg font-medium">{segment}</span>
            </TabPanel>
            <TabPanel id="activity" className="text-style-subheadline text-fg-secondary">
              Four people touched this board today.
            </TabPanel>
            <TabPanel id="settings" className="text-style-subheadline text-fg-secondary">
              Nothing to configure yet.
            </TabPanel>
          </Tabs>

          <div className="mt-4 flex items-center gap-2">
            <MenuTrigger>
              <MenuButton className="border-border bg-surface text-fg hover:bg-fill-quaternary focus-visible:ring-ring/45 inline-flex h-8.5 items-center rounded-md border px-3.5 text-subheadline font-medium shadow-xs outline-none focus-visible:ring-[3px]">
                Open menu
              </MenuButton>
              <Menu>
                <MenuItem>Duplicate</MenuItem>
                <MenuItem>View report</MenuItem>
                <MenuItem>Archive</MenuItem>
              </Menu>
            </MenuTrigger>
            <Kbd>⌘K</Kbd>
          </div>

          <Pagination className="mt-4" page={page} totalPages={8} onChange={setPage} />
        </Section>

        <Section title="People" description="Deterministic tint per name — no images to load">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar name="Livia Saris" size="xs" />
            <Avatar name="Jaydon Aminoff" size="sm" />
            <Avatar name="Maria Lubin" size="md" status="online" />
            <Avatar name="Ann Press" size="lg" status="away" />
            <Avatar name="Steven Rule" size="xl" />
          </div>
          <AvatarGroup
            className="mt-4"
            names={["Livia Saris", "Jaydon Aminoff", "Maria Lubin", "Ann Press", "Steven Rule", "Lauren Prosso"]}
          />
        </Section>

        <Section title="Feedback" description="Progress, skeletons, separators, empty states">
          <div className="flex flex-col gap-3">
            <ProgressBar value={72} label="Storage used" />
            <ProgressBar value={38} tone="success" label="Uptime budget" />
            <ProgressBar value={91} tone="danger" label="Rate limit" />
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
        </Section>
      </div>

      <h2 className="text-style-title2 text-fg mt-8 mb-4">Charts</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Area" description="Smooth, gradient-filled, with a scrubbing crosshair">
          <AreaChart labels={MONTHS} series={SERIES} formatValue={compactUsd} height={190} />
        </Section>

        <Section title="Bar" description="Optional capacity track behind each value">
          <BarChart
            labels={MONTHS}
            values={TREND.map((n) => n * 90)}
            max={5000}
            showTrack
            formatValue={compactUsd}
            height={190}
          />
        </Section>

        <Section title="Combo" description="Bars on the left axis, a line on the right">
          <ComboChart
            labels={MONTHS}
            bars={{ name: "Spend", values: TREND.map((n) => n * 220) }}
            line={{ name: "ROAS", values: TREND.map((n) => 2 + n / 22) }}
            formatBar={compactUsd}
            height={190}
          />
        </Section>

        <Section title="Funnel" description="Bands that neck into one another">
          <FunnelChart
            stages={[
              { name: "Visits", value: 96_400, color: "var(--color-chart-1)" },
              { name: "Sign-ups", value: 38_600, color: "var(--color-chart-2)" },
              { name: "Trials", value: 14_100, color: "var(--color-chart-3)" },
              { name: "Customers", value: 5_200, color: "var(--color-chart-4)" },
            ]}
          />
        </Section>

        <Section title="Gauge and donut" description="Round-capped arcs with a gap between segments">
          <div className="flex flex-wrap items-center justify-around gap-6">
            <GaugeChart segments={SEGMENTS} centerValue="46%" centerLabel="Paid search" size={220} />
            <DonutChart segments={SEGMENTS} centerValue="98" centerLabel="Score" />
          </div>
        </Section>

        <Section title="Activity rings" description="Concentric rings with dim tracks">
          <div className="flex flex-wrap items-center justify-around gap-6">
            <ActivityRings
              rings={[
                { name: "Move", value: 1_228, goal: 1_400, color: "var(--color-chart-4)" },
                { name: "Exercise", value: 122, goal: 150, color: "var(--color-chart-1)" },
                { name: "Running", value: 6, goal: 8, color: "var(--color-chart-2)" },
              ]}
              size={170}
            />
            <div className="flex items-center gap-2">
              {[0.9, 0.6, 0.35, 0.15].map((v) => (
                <ProgressRing
                  key={v}
                  size={40}
                  rings={[
                    { value: v, goal: 1, color: "var(--color-chart-4)" },
                    { value: v * 0.8, goal: 1, color: "var(--color-chart-1)" },
                    { value: v * 0.6, goal: 1, color: "var(--color-chart-2)" },
                  ]}
                />
              ))}
            </div>
          </div>
        </Section>

        <Section title="Bar list" description="A ranked list where the row is the bar">
          <BarList
            items={[
              { name: "Google Ads", value: 39 },
              { name: "Meta", value: 25 },
              { name: "X Ads", value: 14 },
              { name: "LinkedIn", value: 8 },
              { name: "Email", value: 7 },
            ]}
          />
        </Section>

        <Section title="Sparkline and heatmap" description="Trend at a glance; density over a year">
          <div className="grid grid-cols-2 gap-4">
            <Sparkline values={TREND} height={56} />
            <Sparkline values={[...TREND].reverse()} color="var(--color-danger)" height={56} />
          </div>
          <Heatmap className="mt-4" weeks={HEAT} color="var(--color-chart-3)" />
        </Section>
      </div>

      <h2 className="text-style-title2 text-fg mt-8 mb-4">Data</h2>

      <Card>
        <CardHeader title="Table" description="Sticky header, hairline rows, hover state" />
        <CardBody>
          <div className="bg-surface border-border overflow-hidden rounded-xl border">
            <Table>
              <THead>
                <TH>Campaign</TH>
                <TH>Status</TH>
                <TH align="right">Spend</TH>
              </THead>
              <TBody>
                {[
                  ["Founder story video", "Active", "$34,800"],
                  ["Holiday gift guide", "Paused", "$30,884"],
                  ["Spring launch", "Draft", "$0"],
                ].map(([name, status, spend]) => (
                  <TR key={name}>
                    <TD>{name}</TD>
                    <TD>
                      <Badge
                        tone={status === "Active" ? "success" : status === "Paused" ? "warning" : "neutral"}
                        dot
                      >
                        {status}
                      </Badge>
                    </TD>
                    <TD align="right">{spend}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card className="mt-4">
        <CardHeader title="Empty state" description="What a surface says when it has nothing" />
        <CardBody>
          <div className="bg-surface border-border rounded-xl border">
            <EmptyState
              icon={<RiInboxLine />}
              title="Inbox zero"
              description="Nothing needs your attention. New mentions and assignments will land here."
              action={
                <Button variant="primary">
                  Compose
                  <RiArrowRightLine />
                </Button>
              }
            />
          </div>
        </CardBody>
      </Card>
    </>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader title={title} description={description} />
      <CardBody>{children}</CardBody>
    </Card>
  )
}
