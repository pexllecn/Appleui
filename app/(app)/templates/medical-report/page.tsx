"use client"

import { useState } from "react"
import {
  RiAddCircleFill,
  RiAddLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiAsterisk,
  RiFilter3Line,
  RiHeartPulseFill,
  RiMenLine,
  RiPulseLine,
  RiSparkling2Fill,
  RiStethoscopeLine,
  RiWaterFlashLine,
} from "@remixicon/react"
import { Card, CardBody, CardMetric } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Select } from "@/components/ui/select"
import { SearchField } from "@/components/ui/field"
import { Pagination } from "@/components/ui/pagination"
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table"
import { BarChart } from "@/components/charts/bar-chart"
import { ActivityRings, DonutChart, ProgressRing } from "@/components/charts/radial"
import { CrumbChip, NotificationBell, PageHeader } from "@/components/shell/page-header"
import {
  activeDays,
  activityRings,
  alerts,
  patient,
  patientTotals,
  patients,
  sleep,
  steps,
  type PatientStatus,
} from "@/data/medical"
import { cx } from "@/utils/cx"

const fieldIcons = {
  birthday: RiAsterisk,
  gender: RiMenLine,
  blood: RiWaterFlashLine,
  doctor: RiStethoscopeLine,
}

const statusTone: Record<PatientStatus, React.ComponentProps<typeof Badge>["tone"]> = {
  Stable: "success",
  Monitoring: "warning",
  Critical: "danger",
}

export default function MedicalReportPage() {
  const [page, setPage] = useState(1)
  const [selectedDay, setSelectedDay] = useState(activeDays.selectedDay)

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Mertcan", icon: <CrumbChip tone="neutral">M</CrumbChip> },
          { label: "Medical Profile", icon: <RiPulseLine className="size-4" /> },
        ]}
        title="Medical Profile"
        actions={
          <>
            <NotificationBell count={5} />
            <Button>
              <RiFilter3Line />
              Filters
            </Button>
            <Button variant="primary">
              <RiAddLine />
              File a report
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Patient */}
        <Card>
          <CardBody className="pt-8">
            <div className="flex justify-center">
              <span className="relative">
                <span className="bg-fill-secondary text-fg grid size-[72px] place-items-center rounded-full text-title1 font-semibold">
                  M
                </span>
                <RiAddCircleFill className="text-fg-tertiary bg-surface absolute -top-0.5 -right-0.5 size-5 rounded-full" />
              </span>
            </div>
            <h2 className="text-style-title2 text-fg mt-3 text-center">{patient.name}</h2>

            <ul className="mt-4 flex flex-col gap-2">
              {patient.fields.map((field) => {
                const Icon = fieldIcons[field.icon]
                return (
                  <li
                    key={field.label}
                    className="bg-surface border-border flex items-center gap-2.5 rounded-xl border px-3 py-2.5"
                  >
                    <Icon className="text-fg-tertiary size-4 shrink-0" />
                    <span className="text-style-subheadline text-fg-secondary flex-1">
                      {field.label}
                    </span>
                    <span className="text-style-subheadline text-fg font-semibold">
                      {field.value}
                    </span>
                  </li>
                )
              })}
            </ul>
          </CardBody>
        </Card>

        {/* Steps */}
        <Card>
          <CardMetric
            label="Steps"
            value={
              <span className="flex items-baseline gap-1.5 whitespace-nowrap">
                {steps.total}
                <span className="text-style-subheadline text-fg-secondary font-normal whitespace-nowrap">
                  total steps
                </span>
              </span>
            }
            action={<RangeNav label={steps.range} />}
          />
          <CardBody className="pt-6">
            <BarChart
              labels={steps.labels}
              values={steps.values}
              max={steps.goal}
              showTrack
              showValueAxis={false}
              color="var(--color-chart-5)"
              formatValue={(n) => n.toLocaleString()}
              height={218}
            />
          </CardBody>
        </Card>

        {/* Sleep */}
        <Card>
          <CardMetric
            label="Sleep score"
            value={sleep.verdict}
            action={<RangeNav label={sleep.range} />}
          />
          <CardBody className="pt-4">
            <div className="flex justify-center">
              <DonutChart
                segments={sleep.segments}
                centerValue={String(sleep.score)}
                size={156}
                thickness={12}
              />
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {sleep.rows.map((row) => (
                <li
                  key={row.label}
                  className="bg-surface border-border flex items-center gap-2.5 rounded-xl border px-3 py-2.5"
                >
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ background: row.color }}
                  />
                  <span className="text-style-subheadline text-fg flex-1 truncate">{row.label}</span>
                  <span className="text-style-subheadline text-fg-secondary tabular">
                    {row.score}
                  </span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Most active days */}
        <Card>
          <CardMetric
            label="Most active days"
            value={
              <span className="flex items-baseline gap-1.5 whitespace-nowrap">
                {activeDays.total}
                <span className="text-style-subheadline text-fg-secondary font-normal whitespace-nowrap">
                  total steps
                </span>
              </span>
            }
            action={<RangeNav label={activeDays.month} width="w-16" />}
          />
          <CardBody className="pt-4">
            <div className="bg-surface border-border rounded-xl border p-4">
              <p className="text-style-title3 text-fg">Jul</p>
              <div className="mt-3 grid grid-cols-7 gap-1">
                {activeDays.days.map((day) => (
                  <button
                    key={day.day}
                    type="button"
                    onClick={() => setSelectedDay(day.day)}
                    aria-label={`July ${day.day}`}
                    aria-pressed={selectedDay === day.day}
                    className={cx(
                      "flex flex-col items-center gap-1 rounded-xl border px-1 py-1.5",
                      "focus-visible:ring-ring/45 outline-none focus-visible:ring-[3px]",
                      "transition-colors duration-fast",
                      selectedDay === day.day
                        ? "border-border bg-surface shadow-xs"
                        : "hover:bg-fill-quaternary border-transparent",
                    )}
                  >
                    <span className="text-style-footnote text-fg tabular">{day.day}</span>
                    <ProgressRing
                      size={26}
                      rings={[
                        { value: day.move, goal: 1, color: "var(--color-chart-4)" },
                        { value: day.exercise, goal: 1, color: "var(--color-chart-1)" },
                        { value: day.running, goal: 1, color: "var(--color-chart-2)" },
                      ]}
                    />
                  </button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Activity rings */}
        <Card>
          <CardMetric label={`Activity for ${activityRings.date}`} value="" />
          <CardBody className="pt-2">
            <div className="grid grid-cols-3 gap-2">
              {activityRings.rings.map((ring) => (
                <div key={ring.name} className="bg-surface border-border rounded-xl border p-2.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ background: ring.color }}
                    />
                    <span className="text-style-caption1 text-fg-secondary truncate">
                      {ring.name}
                    </span>
                  </div>
                  <p className="text-style-subheadline text-fg mt-1 font-semibold tabular">
                    {ring.display}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <ActivityRings rings={activityRings.rings} size={210} />
            </div>
          </CardBody>
        </Card>

        {/* Alerts */}
        <Card>
          <CardMetric
            label="Important alerts"
            value={
              <span className="flex items-baseline gap-1.5 whitespace-nowrap">
                {alerts.count}
                <span className="text-style-subheadline text-fg-secondary font-normal">
                  this week
                </span>
              </span>
            }
            action={<RangeNav label={alerts.range} />}
          />
          <CardBody className="pt-4">
            <ul className="flex flex-col gap-3">
              {alerts.items.map((alert) => (
                <li key={alert.id} className="bg-surface border-border rounded-xl border p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cx(
                        "grid size-9 shrink-0 place-items-center rounded-full text-white",
                        alert.tone === "danger" ? "bg-danger" : "bg-warning",
                      )}
                    >
                      {alert.tone === "danger" ? (
                        <RiHeartPulseFill className="size-4.5" />
                      ) : (
                        <RiSparkling2Fill className="size-4.5" />
                      )}
                    </span>
                    <span className="text-style-caption1 text-fg-tertiary">{alert.date}</span>
                  </div>
                  <p className="text-style-headline text-fg mt-3">{alert.title}</p>
                  <p className="text-style-footnote text-fg-secondary mt-1">{alert.body}</p>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      {/* Patients */}
      <Card className="mt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4.5 pb-4">
          <div>
            <p className="text-style-subheadline text-fg-secondary">Total Results</p>
            <p className="text-style-headline text-fg mt-0.5 tabular">
              {patientTotals.count} patients
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              aria-label="Status"
              options={[
                { id: "all", label: "All statuses" },
                { id: "stable", label: "Stable" },
                { id: "critical", label: "Critical" },
              ]}
              defaultSelectedKey="all"
            />
            <Select
              aria-label="Condition"
              options={[
                { id: "all", label: "All conditions" },
                { id: "cardiac", label: "Cardiac" },
                { id: "metabolic", label: "Metabolic" },
              ]}
              defaultSelectedKey="all"
            />
            <SearchField aria-label="Search patients" className="w-48" />
          </div>
        </div>

        <div className="bg-surface border-border overflow-hidden rounded-xl border">
          <Table>
            <THead>
              <TH>Patient</TH>
              <TH>Condition</TH>
              <TH>Status</TH>
              <TH>Last visit</TH>
              <TH>Physician</TH>
            </THead>
            <TBody>
              {patients.map((row) => (
                <TR key={row.id}>
                  <TD>
                    <span className="flex items-center gap-2.5">
                      <Avatar name={row.name} size="md" />
                      <span className="font-medium">{row.name}</span>
                    </span>
                  </TD>
                  <TD className="text-fg-secondary">{row.condition}</TD>
                  <TD>
                    <Badge tone={statusTone[row.status]} dot>
                      {row.status}
                    </Badge>
                  </TD>
                  <TD className="text-fg-secondary">{row.lastVisit}</TD>
                  <TD className="text-fg-secondary">{row.physician}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>

        <div className="px-5 py-4">
          <Pagination page={page} totalPages={patientTotals.pages} onChange={setPage} />
        </div>
      </Card>
    </>
  )
}

function RangeNav({ label, width = "w-28" }: { label: string; width?: string }) {
  return (
    <div className="border-border bg-surface flex h-8.5 items-center gap-1 rounded-xl border px-1 shadow-xs">
      <button
        type="button"
        aria-label="Previous range"
        className="text-fg-secondary hover:bg-fill-quaternary hover:text-fg focus-visible:ring-ring/45 grid size-6.5 place-items-center rounded-lg outline-none focus-visible:ring-[3px]"
      >
        <RiArrowLeftSLine className="size-4" />
      </button>
      <span
        className={cx("text-style-subheadline text-fg text-center font-medium", width)}
      >
        {label}
      </span>
      <button
        type="button"
        aria-label="Next range"
        className="text-fg-secondary hover:bg-fill-quaternary hover:text-fg focus-visible:ring-ring/45 grid size-6.5 place-items-center rounded-lg outline-none focus-visible:ring-[3px]"
      >
        <RiArrowRightSLine className="size-4" />
      </button>
    </div>
  )
}
