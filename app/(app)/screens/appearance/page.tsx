"use client"

import { useState } from "react"
import {
  RiArchiveLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiBankCard2Line,
  RiBrushLine,
  RiComputerLine,
  RiGiftLine,
  RiKey2Line,
  RiNotification3Line,
  RiPuzzle2Line,
  RiSettings4Line,
  RiShieldUserLine,
  RiUser3Line,
  RiWindow2Line,
  type RemixiconComponentType,
} from "@remixicon/react"
import { ScreenCanvas, WindowFrame, WindowPane } from "@/components/frames/frame"
import { BackChip, NavRow, SettingsNavColumn } from "@/components/frames/settings-nav"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/misc"
import { PageHeader, CrumbChip, NotificationBell } from "@/components/shell/page-header"
import { cx, focusRing } from "@/utils/cx"

type Theme = "system" | "light" | "dark"

const GENERAL_CHILDREN: { icon: RemixiconComponentType; label: string }[] = [
  { icon: RiUser3Line, label: "Account" },
  { icon: RiKey2Line, label: "Password" },
  { icon: RiShieldUserLine, label: "Connected accounts" },
  { icon: RiWindow2Line, label: "Sessions" },
]

const ROOT_NAV: { icon: RemixiconComponentType; label: string; theme?: boolean }[] = [
  { icon: RiBankCard2Line, label: "Billing" },
  { icon: RiGiftLine, label: "Credits" },
  { icon: RiPuzzle2Line, label: "Integrations" },
  { icon: RiBrushLine, label: "Appearance", theme: true },
  { icon: RiNotification3Line, label: "Notifications" },
  { icon: RiArchiveLine, label: "Archives" },
]

/** The preview is a drawing of an app, not a screenshot of one, so its colours
 * are literal rather than tokenised: a theme swatch has to keep showing dark
 * when the page around it is light, and the other way round. */
const PREVIEW = {
  light: { chrome: "#FFFFFF", block: "#EDEDF0", line: "#E2E2E6" },
  dark: { chrome: "#1C1C1E", block: "#2E2E31", line: "#3A3A3C" },
}

function MiniWindow({ tone, className }: { tone: "light" | "dark"; className?: string }) {
  const c = PREVIEW[tone]
  return (
    <div className={cx("flex h-full flex-col p-2.5", className)} style={{ background: c.chrome }}>
      <div className="flex gap-1">
        {["#FF5F57", "#FEBC2E", "#28C840"].map((dot) => (
          <span key={dot} className="size-1.5 rounded-full" style={{ background: dot }} />
        ))}
      </div>
      <div className="mt-2.5 flex min-h-0 flex-1 gap-2">
        <div className="flex w-1/3 flex-col gap-1.5">
          {[100, 72, 86, 60].map((w, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full"
              style={{ width: `${w}%`, background: c.line }}
            />
          ))}
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-2 grid-rows-2 gap-1.5">
          <span className="rounded-[3px]" style={{ background: c.block }} />
          <span className="rounded-[3px]" style={{ background: c.block }} />
          <span className="col-span-2 rounded-[3px]" style={{ background: c.block }} />
        </div>
      </div>
    </div>
  )
}

/** Selection is a 2px accent ring with a 2px gap — never a border swap, which
 * would shift the card by a pixel and make the row twitch as you click along it. */
function ThemeCard({
  theme,
  label,
  selected,
  onSelect,
}: {
  theme: Theme
  label: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cx(
          "h-[150px] overflow-hidden rounded-xl text-left",
          "transition-[box-shadow,transform] duration-fast ease-standard",
          "ring-1 ring-border-subtle",
          selected && "ring-accent ring-2 ring-offset-2 ring-offset-surface",
          focusRing,
        )}
      >
        {theme === "system" ? (
          <div className="grid h-full grid-cols-2">
            <MiniWindow tone="light" />
            <MiniWindow tone="dark" />
          </div>
        ) : (
          <MiniWindow tone={theme} />
        )}
      </button>
      <span className="text-style-footnote text-fg">{label}</span>
    </div>
  )
}

function ColorField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 flex-1">
      <label className="text-style-footnote text-fg mb-2 block font-medium" htmlFor={label}>
        {label}
      </label>
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="border-border size-9 shrink-0 rounded-lg border"
          style={{ background: value }}
        />
        <input
          id={label}
          type="text"
          defaultValue={value}
          className={cx(
            "bg-surface border-border text-fg h-11 min-w-0 flex-1 rounded-xl border px-3.5",
            "text-subheadline tabular",
            focusRing,
          )}
        />
      </div>
    </div>
  )
}

export default function AppearanceScreen() {
  const [theme, setTheme] = useState<Theme>("system")

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Screens" },
          { label: "Appearance", icon: <RiBrushLine className="size-4" /> },
        ]}
        title="Appearance settings"
      />

      <ScreenCanvas>
        <WindowFrame className="bg-bg-subtle" height={840}>
          <SettingsNavColumn width={268} className="px-4 pt-5 pb-4">
            <BackChip label="Back" />

            <div className="mt-5 flex flex-col gap-0.5">
              <button
                type="button"
                className={cx(
                  "text-fg flex h-9 items-center gap-2.5 rounded-xl px-3 text-subheadline font-medium",
                  "hover:bg-fill-quaternary transition-colors duration-fast",
                  focusRing,
                )}
                aria-expanded
              >
                <RiSettings4Line aria-hidden className="text-fg-secondary size-4.5" />
                <span className="flex-1 text-left">General</span>
                <RiArrowDownSLine aria-hidden className="text-fg-tertiary size-4" />
              </button>

              {GENERAL_CHILDREN.map((item) => (
                <NavRow key={item.label} icon={item.icon} label={item.label} indent />
              ))}

              <div className="mt-1 flex flex-col gap-0.5">
                {ROOT_NAV.map((item) => (
                  <NavRow key={item.label} icon={item.icon} label={item.label} active={item.theme} />
                ))}
              </div>
            </div>
          </SettingsNavColumn>

          <WindowPane className="bg-surface border-border-subtle my-3 mr-3 rounded-[20px] border">
            {/* Top bar: the trail on the left, identity on the right, nothing
              * between them. It is the only row in the pane that is not text. */}
            <div className="flex items-center justify-between gap-4 px-10 pt-6 max-md:px-5">
              <nav aria-label="Breadcrumb">
                <ol className="text-fg-secondary flex items-center gap-1 text-footnote">
                  {["Home", "Settings", "Appearance"].map((crumb, i, all) => (
                    <li key={crumb} className="flex items-center gap-1">
                      {i > 0 ? (
                        <RiArrowRightSLine aria-hidden className="text-fg-quaternary size-4" />
                      ) : null}
                      <span className={cx(i === all.length - 1 && "text-fg font-medium")}>
                        {crumb}
                      </span>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="flex items-center gap-3">
                <NotificationBell count={0} />
                <Avatar name="Kenji Watanabe" size="lg" />
              </div>
            </div>

            <div className="px-10 pt-6 pb-14 max-md:px-5">
              <h1 className="text-style-large-title text-fg">Appearance</h1>

              <section className="mt-9">
                <h2 className="text-style-title3 text-fg">Theme</h2>
                <p className="text-style-footnote text-fg-secondary mt-1.5">
                  Choose the theme you prefer to customise the application.
                </p>
                <div className="mt-5 grid max-w-[900px] grid-cols-3 gap-5 max-md:grid-cols-1">
                  <ThemeCard
                    theme="system"
                    label="System default"
                    selected={theme === "system"}
                    onSelect={() => setTheme("system")}
                  />
                  <ThemeCard
                    theme="light"
                    label="Light"
                    selected={theme === "light"}
                    onSelect={() => setTheme("light")}
                  />
                  <ThemeCard
                    theme="dark"
                    label="Dark"
                    selected={theme === "dark"}
                    onSelect={() => setTheme("dark")}
                  />
                </div>
              </section>

              <Separator className="my-9 max-w-[900px]" />

              <section>
                <h2 className="text-style-title3 text-fg">Custom brand colors</h2>
                <p className="text-style-footnote text-fg-secondary mt-1.5">
                  Customize your own brand colours.
                </p>
                <div className="mt-5 flex max-w-[560px] gap-6 max-md:flex-col">
                  <ColorField label="Brand color (Light theme)" value="#000000" />
                  <ColorField label="Brand color (Dark theme)" value="#F5F5F5" />
                </div>
                <button
                  type="button"
                  className={cx(
                    "bg-fg text-bg mt-7 inline-flex h-11 items-center rounded-full px-7",
                    "text-subheadline font-medium",
                    "hover:opacity-90 pressed:scale-[0.98] transition-[opacity,transform] duration-fast",
                    focusRing,
                  )}
                >
                  Update
                </button>
              </section>

              <section className="mt-12">
                <h2 className="text-style-title3 text-fg">Interface density</h2>
                <p className="text-style-footnote text-fg-secondary mt-1.5">
                  How much breathing room the application leaves between rows.
                </p>
                <div className="border-border-subtle mt-5 flex max-w-[560px] flex-col gap-0 rounded-xl border">
                  {[
                    { label: "Comfortable", hint: "The default. 44px rows.", on: true },
                    { label: "Compact", hint: "36px rows, tighter type.", on: false },
                  ].map((option, i) => (
                    <button
                      key={option.label}
                      type="button"
                      className={cx(
                        "flex items-center gap-3 px-4 py-3.5 text-left",
                        i > 0 && "border-border-subtle border-t",
                        "hover:bg-fill-quaternary transition-colors duration-fast",
                        "first:rounded-t-xl last:rounded-b-xl",
                        focusRing,
                      )}
                    >
                      <span
                        className={cx(
                          "grid size-[18px] shrink-0 place-items-center rounded-full border",
                          option.on ? "border-accent border-[5px]" : "border-border-strong",
                        )}
                      />
                      <span className="min-w-0">
                        <span className="text-style-subheadline text-fg block font-medium">
                          {option.label}
                        </span>
                        <span className="text-style-footnote text-fg-secondary block">
                          {option.hint}
                        </span>
                      </span>
                      <RiComputerLine aria-hidden className="text-fg-tertiary ml-auto size-4.5" />
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </WindowPane>
        </WindowFrame>
      </ScreenCanvas>
    </>
  )
}
