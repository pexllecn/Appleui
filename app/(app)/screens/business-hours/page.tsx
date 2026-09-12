"use client"

import { useState } from "react"
import {
  RiAddLine,
  RiBillLine,
  RiChat3Line,
  RiCloseLine,
  RiGitBranchLine,
  RiHashtag,
  RiHome5Line,
  RiLockLine,
  RiNotification3Line,
  RiSearchLine,
  RiSettings4Line,
  RiShieldUserLine,
  RiSideBarLine,
  RiTeamLine,
  RiTimeLine,
  RiUser3Line,
  type RemixiconComponentType,
} from "@remixicon/react"
import { ScreenCanvas, WindowFrame, WindowPane } from "@/components/frames/frame"
import { NavGroupLabel, NavRow, SettingsNavColumn } from "@/components/frames/settings-nav"
import { Avatar } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { PageHeader, CrumbChip } from "@/components/shell/page-header"
import { businessHours } from "@/data/screens"
import { cx, focusRing } from "@/utils/cx"

const RAIL: { icon: RemixiconComponentType; label: string; active?: boolean }[] = [
  { icon: RiHome5Line, label: "Home" },
  { icon: RiSearchLine, label: "Search" },
  { icon: RiNotification3Line, label: "Notifications" },
  { icon: RiChat3Line, label: "Conversations" },
  { icon: RiSettings4Line, label: "Settings", active: true },
]

const PERSONAL: { icon: RemixiconComponentType; label: string }[] = [
  { icon: RiUser3Line, label: "Account details" },
  { icon: RiNotification3Line, label: "Notifications" },
  { icon: RiLockLine, label: "Security" },
]

const WORKSPACE: { icon: RemixiconComponentType; label: string; active?: boolean }[] = [
  { icon: RiSettings4Line, label: "General" },
  { icon: RiTimeLine, label: "Business hours", active: true },
  { icon: RiTeamLine, label: "Team" },
  { icon: RiBillLine, label: "Billing" },
  { icon: RiShieldUserLine, label: "Channels" },
  { icon: RiGitBranchLine, label: "Integrations" },
  { icon: RiHashtag, label: "Tags" },
  { icon: RiBillLine, label: "Rules" },
]

/** A time field. Bordered, 12px radius, 44px tall, and wide enough that 05:00
 * never crowds its own box — the row reads as two equal columns, not as a
 * label with a scrap of input after it. */
function TimeInput({ value, label }: { value: string; label: string }) {
  return (
    <input
      type="text"
      aria-label={label}
      defaultValue={value}
      placeholder="--:--"
      className={cx(
        "bg-surface border-border text-fg h-11 w-full rounded-xl border px-3.5",
        "text-subheadline tabular placeholder:text-fg-placeholder",
        "transition-[border-color,box-shadow] duration-fast",
        focusRing,
      )}
    />
  )
}

function RowButton({
  label,
  tone = "neutral",
  icon: Icon,
}: {
  label: string
  tone?: "neutral" | "danger"
  icon: RemixiconComponentType
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cx(
        "grid size-6 shrink-0 place-items-center rounded-md",
        "transition-colors duration-fast",
        tone === "danger"
          ? "text-danger hover:bg-danger-subtle"
          : "text-fg-tertiary hover:text-fg hover:bg-fill-quaternary",
        focusRing,
      )}
    >
      <Icon aria-hidden className="size-4.5" />
    </button>
  )
}

export default function BusinessHoursScreen() {
  const [enabled, setEnabled] = useState(() =>
    Object.fromEntries(businessHours.map((d) => [d.day, d.enabled])),
  )

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Screens" },
          { label: "Business hours", icon: <RiTimeLine className="size-4" /> },
        ]}
        title="Business hours"
      />

      <ScreenCanvas>
        <WindowFrame height={900}>
          {/* Icon rail — 64px, glyph-only, the app's top-level switch. */}
          <div className="border-border-subtle flex w-16 shrink-0 flex-col items-center border-r py-4 max-md:hidden">
            <span className="grid size-9 place-items-center rounded-xl bg-[#FF6B2C]">
              <span className="h-2.5 w-5 rounded-full bg-black/85" />
            </span>
            <div className="mt-8 flex flex-1 flex-col items-center gap-2">
              {RAIL.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  aria-label={item.label}
                  aria-current={item.active ? "page" : undefined}
                  className={cx(
                    "grid size-9 place-items-center rounded-xl transition-colors duration-fast",
                    item.active
                      ? "bg-fill-tertiary text-fg"
                      : "text-fg-tertiary hover:bg-fill-quaternary hover:text-fg",
                    focusRing,
                  )}
                >
                  <item.icon aria-hidden className="size-5" />
                </button>
              ))}
            </div>
            <Avatar name="Mara Whitfield" size="lg" className="rounded-xl" />
          </div>

          {/* Settings nav — on white, so the selected row is a flat grey wash. */}
          <SettingsNavColumn width={250} className="border-border-subtle border-r px-3 py-4">
            <div className="flex items-center justify-between px-2 pb-3">
              <span className="text-style-headline text-fg">Settings</span>
              <button
                type="button"
                aria-label="Collapse settings"
                className={cx(
                  "text-fg-tertiary hover:text-fg grid size-7 place-items-center rounded-md",
                  focusRing,
                )}
              >
                <RiSideBarLine aria-hidden className="size-4.5" />
              </button>
            </div>

            <NavGroupLabel>Personal settings</NavGroupLabel>
            <div className="flex flex-col gap-0.5">
              {PERSONAL.map((item) => (
                <NavRow key={item.label} icon={item.icon} label={item.label} selection="fill" />
              ))}
            </div>

            <NavGroupLabel className="mt-4">Workspace settings</NavGroupLabel>
            <div className="flex flex-col gap-0.5">
              {WORKSPACE.map((item) => (
                <NavRow
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  active={item.active}
                  selection="fill"
                />
              ))}
            </div>
          </SettingsNavColumn>

          <WindowPane>
            <div className="mx-auto max-w-[880px] px-10 pt-10 pb-16 max-md:px-5">
              <h1 className="text-style-large-title text-fg">Business hours</h1>
              <p className="text-style-subheadline text-fg-secondary mt-3 max-w-[560px]">
                Your current timezone is set to{" "}
                <span
                  className={cx(
                    "border-border text-fg mx-0.5 inline-flex items-center rounded-md border",
                    "bg-fill-quaternary px-1.5 py-0.5 text-footnote font-medium",
                  )}
                >
                  Berlin, Germany (GMT+2)
                </span>
                , which is what we&rsquo;ll use to set your business hours. You can change it under
                account details.
              </p>

              {/* Column headers, then one hairline-separated block per day. The
                * grid is declared once and every row inherits it, so a day with
                * two intervals still lines up with a day that has one. */}
              <div className="mt-10">
                <div className="text-fg-secondary border-border-subtle grid grid-cols-[200px_1fr_1fr_64px] gap-4 border-b pb-2.5 text-caption1 max-lg:grid-cols-[130px_1fr_1fr_64px]">
                  <span>Day</span>
                  <span>Starting time</span>
                  <span>Ending time</span>
                  <span />
                </div>

                {businessHours.map((row) => (
                  <div
                    key={row.day}
                    className="border-border-subtle grid grid-cols-[200px_1fr_1fr_64px] items-start gap-x-4 gap-y-3 border-b py-5 max-lg:grid-cols-[130px_1fr_1fr_64px]"
                  >
                    <div className="flex h-11 items-center">
                      <Checkbox
                        isSelected={enabled[row.day]}
                        onChange={(v) => setEnabled((s) => ({ ...s, [row.day]: v }))}
                      >
                        <span className="text-style-subheadline text-fg">{row.day}</span>
                      </Checkbox>
                    </div>

                    {/* Intervals stack inside the row's own three columns. */}
                    <div className="col-span-3 grid grid-cols-[1fr_1fr_64px] gap-x-4 gap-y-3">
                      {row.intervals.map((interval, i) => (
                        <div key={i} className="contents">
                          <TimeInput value={interval.from} label={`${row.day} start ${i + 1}`} />
                          <TimeInput value={interval.to} label={`${row.day} end ${i + 1}`} />
                          <div className="flex h-11 items-center gap-1.5">
                            {i > 0 ? (
                              <RowButton
                                icon={RiCloseLine}
                                tone="danger"
                                label={`Remove interval ${i + 1} on ${row.day}`}
                              />
                            ) : null}
                            <RowButton icon={RiAddLine} label={`Add an interval on ${row.day}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WindowPane>
        </WindowFrame>
      </ScreenCanvas>
    </>
  )
}
