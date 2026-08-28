"use client"

import { useState } from "react"
import {
  RiAddLine,
  RiAlarmLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarLine,
  RiCornerDownLeftLine,
  RiGlobalLine,
  RiGroupLine,
  RiInboxLine,
  RiTimeLine,
  RiVideoOnLine,
} from "@remixicon/react"
import { Dialog, DialogTrigger, Popover } from "react-aria-components"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Kbd } from "@/components/ui/misc"
import { CrumbChip, NotificationBell, PageHeader } from "@/components/shell/page-header"
import { buildMonthGrid, calendarMonth, events, toneChip, type CalendarEvent } from "@/data/calendar"
import { WEEKDAYS } from "@/lib/format"
import { cx } from "@/utils/cx"

const MAX_VISIBLE = 4

export default function CalendarPage() {
  const [monthOffset, setMonthOffset] = useState(0)

  const base = new Date(Date.UTC(calendarMonth.year, calendarMonth.month + monthOffset, 1))
  const year = base.getUTCFullYear()
  const month = base.getUTCMonth()
  const label = base.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })

  const cells = buildMonthGrid(year, month)
  const byDate = new Map<string, CalendarEvent[]>()
  for (const event of events) {
    byDate.set(event.date, [...(byDate.get(event.date) ?? []), event])
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Mertcan", icon: <CrumbChip tone="neutral">M</CrumbChip> },
          { label: "Calendar", icon: <RiCalendarLine className="size-4" /> },
        ]}
        title={label}
        actions={
          <>
            <NotificationBell count={5} />
            <Button size="icon" aria-label="Inbox">
              <RiInboxLine />
            </Button>
            <div className="border-border bg-surface flex h-9 items-center gap-1 rounded-xl border px-1 shadow-xs">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setMonthOffset((m) => m - 1)}
                className="text-fg-secondary hover:bg-fill-quaternary hover:text-fg focus-visible:ring-ring/45 grid size-7 place-items-center rounded-lg outline-none focus-visible:ring-[3px]"
              >
                <RiArrowLeftSLine className="size-4.5" />
              </button>
              <span className="text-style-subheadline text-fg min-w-32 text-center font-medium">
                {label}
              </span>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setMonthOffset((m) => m + 1)}
                className="text-fg-secondary hover:bg-fill-quaternary hover:text-fg focus-visible:ring-ring/45 grid size-7 place-items-center rounded-lg outline-none focus-visible:ring-[3px]"
              >
                <RiArrowRightSLine className="size-4.5" />
              </button>
            </div>
            <Button variant="primary">
              <RiAddLine />
              New event
            </Button>
          </>
        }
      />

      <div className="bg-bg-subtle dark:bg-surface dark:border-border rounded-2xl border border-transparent p-3">
        <div className="grid grid-cols-7 gap-2 pb-2">
          {WEEKDAYS.map((day) => (
            <div key={day} className="text-style-footnote text-fg-secondary py-1 text-center">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {cells.map((cell) => {
            const dayEvents = byDate.get(cell.iso) ?? []
            const visible = dayEvents.slice(0, MAX_VISIBLE)
            const overflow = dayEvents.length - visible.length

            return (
              <div
                key={cell.iso}
                className={cx(
                  "min-h-[128px] rounded-xl p-2",
                  cell.inMonth
                    ? "bg-surface border-border border"
                    : "bg-fill-tertiary border border-transparent",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cx(
                      "text-style-footnote tabular",
                      cell.inMonth ? "text-fg" : "text-fg-tertiary",
                    )}
                  >
                    {cell.day}
                  </span>
                  {overflow > 0 ? (
                    <span className="text-style-caption2 text-fg-secondary">+{overflow} more</span>
                  ) : null}
                </div>

                <div className="mt-1.5 flex flex-col gap-1">
                  {visible.map((event) => (
                    <EventChip key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

function EventChip({ event }: { event: CalendarEvent }) {
  return (
    <DialogTrigger>
      <Button
        variant="plain"
        className={cx(
          "h-auto w-full justify-between gap-1 rounded-md px-1.5 py-1 text-caption2 font-medium",
          "hover:brightness-95",
          toneChip[event.tone],
        )}
      >
        <span className="truncate">{event.title}</span>
        {event.time ? <span className="shrink-0 opacity-80 tabular">{event.time}</span> : null}
      </Button>

      <Popover
        placement="right top"
        offset={8}
        className="entering:animate-scale-in border-border w-[340px] rounded-2xl border shadow-popover"
      >
        <Dialog className="outline-none">
          <EventDetail event={event} />
        </Dialog>
      </Popover>
    </DialogTrigger>
  )
}

function EventDetail({ event }: { event: CalendarEvent }) {
  const date = new Date(`${event.date}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  })

  return (
    <div className="bg-surface overflow-hidden rounded-2xl">
      <div className="bg-bg-subtle dark:bg-fill-quaternary px-4 py-3.5">
        <h2 className="text-style-title3 text-fg">{event.title}</h2>
        <p className="text-style-subheadline text-fg-secondary mt-0.5">{date}</p>
      </div>

      <div className="flex flex-col gap-2 p-3">
        {event.meet ? (
          <Row icon={<RiVideoOnLine />} label="Google Meet">
            <span className="bg-fill-quaternary text-fg-secondary rounded-md px-1.5 py-0.5 text-caption2 font-mono">
              {event.meet}
            </span>
            <Button variant="primary" size="sm">
              Join
            </Button>
          </Row>
        ) : null}

        {event.time ? (
          <Row
            icon={<RiTimeLine />}
            label={
              <span className="flex items-center gap-1.5 tabular">
                {event.time}
                <span className="text-fg-tertiary">→</span>
                {event.endTime}
              </span>
            }
          >
            {event.duration ? (
              <span className="bg-fill-quaternary text-fg-secondary rounded-md px-1.5 py-0.5 text-caption2">
                {event.duration}
              </span>
            ) : null}
          </Row>
        ) : null}

        {event.timezone ? (
          <Row icon={<RiGlobalLine />} label={event.timezone}>
            <Kbd>
              <RiCornerDownLeftLine className="size-3" />
            </Kbd>
          </Row>
        ) : null}

        {event.participants?.length ? (
          <div className="bg-bg-subtle dark:bg-fill-quaternary rounded-xl p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-style-subheadline text-fg-secondary flex items-center gap-2">
                <RiGroupLine className="size-4" />
                Participants
              </span>
              <RiGroupLine className="text-fg-tertiary size-4" />
            </div>
            <ul className="mt-2 flex flex-col gap-1.5">
              {event.participants.map((email) => (
                <li key={email} className="flex items-center gap-2">
                  <Avatar name={email} size="sm" />
                  <span className="text-style-footnote text-fg truncate">{email}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {event.reminder ? (
          <Row icon={<RiAlarmLine />} label={<span>Reminders {event.reminder}</span>}>
            <Kbd>
              <RiCornerDownLeftLine className="size-3" />
            </Kbd>
          </Row>
        ) : null}
      </div>
    </div>
  )
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div className="bg-bg-subtle dark:bg-fill-quaternary flex items-center gap-2.5 rounded-xl px-2.5 py-2">
      <span className="text-fg-secondary shrink-0 [&_svg]:size-4">{icon}</span>
      <span className="text-style-subheadline text-fg min-w-0 flex-1 truncate">{label}</span>
      {children ? <span className="flex shrink-0 items-center gap-1.5">{children}</span> : null}
    </div>
  )
}
