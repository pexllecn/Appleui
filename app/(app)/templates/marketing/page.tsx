"use client"

import { useMemo, useState } from "react"
import {
  RiAddLine,
  RiArrowDownSLine,
  RiCursorLine,
  RiDeleteBin6Line,
  RiEyeLine,
  RiFilter3Line,
  RiMegaphoneLine,
  RiMoneyDollarCircleLine,
  RiMoreLine,
  RiPencilLine,
  RiSearchLine,
  RiUserFollowLine,
} from "@remixicon/react"
import { Card, CardBody, CardMetric } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Delta } from "@/components/ui/delta"
import { Checkbox } from "@/components/ui/checkbox"
import { Select } from "@/components/ui/select"
import { SearchField } from "@/components/ui/field"
import { Pagination } from "@/components/ui/pagination"
import { BrandIcon } from "@/components/ui/brand-icon"
import { Menu, MenuButton, MenuItem, MenuTrigger } from "@/components/ui/menu"
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs"
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table"
import { AreaChart } from "@/components/charts/area-chart"
import { ComboChart } from "@/components/charts/combo-chart"
import { FunnelChart } from "@/components/charts/funnel-chart"
import { GaugeChart } from "@/components/charts/radial"
import { BarList } from "@/components/charts/bar-list"
import { CrumbChip, NotificationBell, PageHeader } from "@/components/shell/page-header"
import {
  adSpend,
  campaignTotals,
  campaigns,
  funnel,
  kpis,
  sessionsByCampaign,
  sessionsByChannel,
  sessionsByLandingPage,
  spendByChannel,
  visitors,
  type Delivery,
  type Objective,
} from "@/data/marketing"
import { compactNum, compactUsd, MONTHS, usd } from "@/lib/format"
import { cx } from "@/utils/cx"

const kpiIcons = {
  money: RiMoneyDollarCircleLine,
  eye: RiEyeLine,
  convert: RiUserFollowLine,
  cursor: RiCursorLine,
}

const objectiveTone: Record<Objective, React.ComponentProps<typeof Badge>["tone"]> = {
  Awareness: "accent",
  Traffic: "info",
  Conversions: "success",
  Leads: "warning",
  Retargeting: "danger",
}

const deliveryDot: Record<Delivery, string> = {
  Active: "bg-success",
  Paused: "bg-warning",
  Draft: "bg-accent",
}

const RANGE_OPTIONS = [
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" },
  { id: "year", label: "This year" },
]

export default function MarketingPage() {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(campaigns.filter((c) => c.selected).map((c) => c.id)),
  )
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")

  const rows = useMemo(
    () => campaigns.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  )

  const allSelected = rows.length > 0 && rows.every((c) => selected.has(c.id))
  const someSelected = rows.some((c) => selected.has(c.id))

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Mertcan", icon: <CrumbChip tone="neutral">M</CrumbChip> },
          { label: "Marketing", icon: <RiMegaphoneLine className="size-4" /> },
        ]}
        title="Marketing"
        actions={
          <>
            <NotificationBell count={5} />
            <Button>
              <RiFilter3Line />
              Filters
            </Button>
            <Button variant="primary">
              <RiAddLine />
              New campaign
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpiIcons[kpi.icon]
          return (
            <Card key={kpi.label} className="p-5">
              <span className="bg-surface border-border grid size-9 place-items-center rounded-xl border">
                <Icon className="text-fg-secondary size-4.5" />
              </span>
              <p className="text-style-subheadline text-fg-secondary mt-4">{kpi.label}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-style-title1 text-fg tabular">{kpi.value}</span>
                <Delta value={kpi.delta} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Funnel · gauge · sessions */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardMetric
            label="Acquisition funnel"
            value={funnel.total}
            delta={<Delta value={funnel.delta} />}
            action={
              <Select
                aria-label="Range"
                options={RANGE_OPTIONS}
                defaultSelectedKey="30d"
                className="[&_button]:gap-1.5"
              />
            }
          />
          <CardBody className="pt-4">
            <FunnelChart stages={funnel.stages} />
            <div className="mt-3 grid grid-cols-4 gap-2">
              {funnel.stages.map((stage) => (
                <div key={stage.name} className="bg-surface border-border rounded-xl border p-2.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ background: stage.color }}
                    />
                    <span className="text-style-caption1 text-fg-secondary truncate">
                      {stage.name}
                    </span>
                  </div>
                  <p className="text-style-subheadline text-fg mt-1 font-semibold tabular">
                    {stage.label}
                  </p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardMetric
            label="Spend by channel"
            value={spendByChannel.total}
            delta={<Delta value={spendByChannel.delta} />}
            action={
              <Select aria-label="Range" options={RANGE_OPTIONS} defaultSelectedKey="30d" />
            }
          />
          <CardBody className="pt-6">
            <div className="flex justify-center">
              <GaugeChart
                segments={spendByChannel.segments}
                centerValue={spendByChannel.leadShare}
                centerLabel={spendByChannel.leadName}
              />
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {spendByChannel.segments.map((segment) => (
                <div key={segment.name} className="flex items-center gap-1.5">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ background: segment.color }}
                  />
                  <span className="text-style-footnote text-fg-secondary">{segment.name}</span>
                  <span className="text-style-footnote text-fg font-semibold tabular">
                    {usd(segment.value)}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="p-2">
          <Tabs defaultSelectedKey="channels">
            <div className="flex items-center justify-between gap-3 px-3 pt-2">
              <TabList aria-label="Sessions breakdown" className="min-w-0 flex-1 gap-4 border-0">
                <Tab id="channels">Channels</Tab>
                <Tab id="campaigns">Campaigns</Tab>
                <Tab id="pages">Landing pages</Tab>
              </TabList>
              <span className="text-style-eyebrow text-fg-tertiary shrink-0 pb-2.5">Sessions</span>
            </div>

            {(
              [
                ["channels", sessionsByChannel],
                ["campaigns", sessionsByCampaign],
                ["pages", sessionsByLandingPage],
              ] as const
            ).map(([id, items]) => (
              <TabPanel key={id} id={id} className="px-2 pt-3 pb-2">
                <BarList
                  items={items.map((item) => ({
                    name: item.name,
                    value: item.value,
                    icon: <BrandIcon brand={item.brand} />,
                  }))}
                />
              </TabPanel>
            ))}
          </Tabs>
        </Card>
      </div>

      {/* Spend vs ROAS · visitors */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardMetric
            label={`Ad spend · ROAS ${adSpend.roas}`}
            value={adSpend.total}
            delta={<Delta value={adSpend.delta} />}
            action={<Select aria-label="Range" options={RANGE_OPTIONS} defaultSelectedKey="year" />}
          />
          <CardBody className="pt-6">
            <ComboChart
              labels={MONTHS}
              bars={{ name: "Ad spend", values: adSpend.bars }}
              line={{ name: "ROAS", values: adSpend.line }}
              formatBar={compactUsd}
              formatLine={(n) => `${n.toFixed(1)}x`}
            />
          </CardBody>
          <div className="grid grid-cols-2 gap-3 px-5 pb-5">
            <div className="bg-surface border-border rounded-xl border p-3">
              <div className="flex items-center gap-1.5">
                <span className="bg-chart-1 size-2.5 rounded-full" />
                <span className="text-style-footnote text-fg-secondary">Ad spend · total</span>
              </div>
              <p className="text-style-headline text-fg mt-1 tabular">{adSpend.total}</p>
            </div>
            <div className="bg-surface border-border rounded-xl border p-3">
              <div className="flex items-center gap-1.5">
                <span className="bg-chart-2 size-2.5 rounded-full" />
                <span className="text-style-footnote text-fg-secondary">ROAS · average</span>
              </div>
              <p className="text-style-headline text-fg mt-1 tabular">{adSpend.roas}</p>
            </div>
          </div>
        </Card>

        <Card>
          <CardMetric
            label="Visitors"
            value={visitors.total}
            delta={<Delta value={visitors.delta} />}
            action={<Select aria-label="Range" options={RANGE_OPTIONS} defaultSelectedKey="year" />}
          />
          <CardBody className="pt-6">
            <AreaChart
              labels={MONTHS}
              series={visitors.series}
              stacked
              formatValue={compactNum}
              height={252}
            />
          </CardBody>
          <div className="grid grid-cols-3 gap-3 px-5 pb-5">
            {visitors.series.map((series) => (
              <div key={series.name} className="bg-surface border-border rounded-xl border p-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ background: series.color }}
                  />
                  <span className="text-style-footnote text-fg-secondary">{series.name}</span>
                </div>
                <p className="text-style-headline text-fg mt-1 tabular">{series.total}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Campaigns */}
      <Card className="mt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4.5 pb-4">
          <div>
            <p className="text-style-subheadline text-fg-secondary">Total Results</p>
            <p className="text-style-headline text-fg mt-0.5 tabular">
              {campaignTotals.count} campaigns
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              aria-label="Channel"
              options={[
                { id: "all", label: "All channels" },
                { id: "google", label: "Google Ads" },
                { id: "meta", label: "Meta" },
              ]}
              defaultSelectedKey="all"
            />
            <Select
              aria-label="Objective"
              options={[
                { id: "all", label: "All objectives" },
                { id: "awareness", label: "Awareness" },
                { id: "leads", label: "Leads" },
              ]}
              defaultSelectedKey="all"
            />
            <Select
              aria-label="Spend"
              options={[
                { id: "all", label: "All spend" },
                { id: "high", label: "Over $10K" },
              ]}
              defaultSelectedKey="all"
            />
            <SearchField
              aria-label="Search campaigns"
              value={query}
              onChange={setQuery}
              className="w-48"
            />
          </div>
        </div>

        <div className="bg-surface border-border overflow-hidden rounded-xl border">
          <Table>
            <THead>
              <TH className="w-10 pr-0">
                <Checkbox
                  aria-label="Select all campaigns"
                  isSelected={allSelected}
                  isIndeterminate={!allSelected && someSelected}
                  onChange={(next) =>
                    setSelected(next ? new Set(rows.map((c) => c.id)) : new Set())
                  }
                />
              </TH>
              <TH>
                <span className="inline-flex items-center gap-1">
                  Campaign
                  <RiArrowDownSLine className="size-3.5" />
                </span>
              </TH>
              <TH>Delivery</TH>
              <TH>Objective</TH>
              <TH>
                <span className="inline-flex items-center gap-1">
                  Last updated
                  <RiArrowDownSLine className="size-3.5" />
                </span>
              </TH>
              <TH align="right">
                <span className="inline-flex items-center gap-1">
                  Spend
                  <RiArrowDownSLine className="size-3.5" />
                </span>
              </TH>
              <TH align="right">Actions</TH>
            </THead>
            <TBody>
              {rows.map((campaign) => (
                <TR key={campaign.id}>
                  <TD className="pr-0">
                    <Checkbox
                      aria-label={`Select ${campaign.name}`}
                      isSelected={selected.has(campaign.id)}
                      onChange={() => toggle(campaign.id)}
                    />
                  </TD>
                  <TD>
                    <span className="flex items-center gap-2.5">
                      <span className="bg-fill-quaternary text-fg-secondary grid size-7 shrink-0 place-items-center rounded-full">
                        <BrandIcon brand={campaign.brand} />
                      </span>
                      <span className="font-medium">{campaign.name}</span>
                    </span>
                  </TD>
                  <TD>
                    <span
                      className={cx(
                        "border-border bg-surface inline-flex h-8 items-center gap-2 rounded-lg border px-2.5",
                        "text-caption1 font-medium",
                      )}
                    >
                      <span className={cx("size-2 rounded-full", deliveryDot[campaign.delivery])} />
                      {campaign.delivery}
                      <RiArrowDownSLine className="text-fg-tertiary size-3.5" />
                    </span>
                  </TD>
                  <TD>
                    <Badge tone={objectiveTone[campaign.objective]}>{campaign.objective}</Badge>
                  </TD>
                  <TD className="text-fg-secondary">{campaign.updated}</TD>
                  <TD align="right" className={campaign.spend === 0 ? "text-fg-tertiary" : ""}>
                    {usd(campaign.spend)}
                  </TD>
                  <TD align="right">
                    <span className="flex items-center justify-end gap-0.5">
                      <IconAction label={`Delete ${campaign.name}`}>
                        <RiDeleteBin6Line />
                      </IconAction>
                      <IconAction label={`Edit ${campaign.name}`}>
                        <RiPencilLine />
                      </IconAction>
                      <MenuTrigger>
                        <MenuButton
                          aria-label={`More actions for ${campaign.name}`}
                          className="text-fg-secondary hover:bg-fill-quaternary hover:text-fg focus-visible:ring-ring/45 grid size-8 place-items-center rounded-lg outline-none focus-visible:ring-[3px]"
                        >
                          <RiMoreLine className="size-4" />
                        </MenuButton>
                        <Menu>
                          <MenuItem>Duplicate</MenuItem>
                          <MenuItem>View report</MenuItem>
                          <MenuItem>Archive</MenuItem>
                        </Menu>
                      </MenuTrigger>
                    </span>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>

          {rows.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <RiSearchLine className="text-fg-quaternary mx-auto size-7" />
              <p className="text-style-subheadline text-fg mt-3 font-medium">No campaigns found</p>
              <p className="text-style-footnote text-fg-secondary mt-1">
                Nothing matches “{query}”. Try a different search.
              </p>
            </div>
          ) : null}
        </div>

        <div className="px-5 py-4">
          <Pagination page={page} totalPages={campaignTotals.pages} onChange={setPage} />
        </div>
      </Card>
    </>
  )
}

function IconAction({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cx(
        "text-fg-secondary hover:bg-fill-quaternary hover:text-fg grid size-8 place-items-center rounded-lg",
        "transition-colors duration-fast",
        "focus-visible:ring-ring/45 outline-none focus-visible:ring-[3px]",
        "[&_svg]:size-4",
      )}
    >
      {children}
    </button>
  )
}
