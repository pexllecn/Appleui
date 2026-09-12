"use client"

import {
  RiAppsLine,
  RiArrowRightSLine,
  RiBankCard2Line,
  RiCalendarCheckLine,
  RiCompasses2Line,
  RiEmotionLine,
  RiExchangeLine,
  RiFileList3Line,
  RiFlagLine,
  RiFolderLine,
  RiLayoutGridLine,
  RiPriceTag3Line,
  RiPuzzle2Line,
  RiRocket2Line,
  RiSettings4Line,
  RiShieldKeyholeLine,
  RiShieldCheckLine,
  RiSpeedUpLine,
  RiTeamLine,
  RiTimerLine,
  RiUpload2Line,
  RiUserSettingsLine,
  type RemixiconComponentType,
} from "@remixicon/react"
import { ScreenCanvas, SettingsSection, WindowFrame, WindowPane } from "@/components/frames/frame"
import {
  BackChip,
  NavGroupLabel,
  NavRow,
  SettingsNavColumn,
} from "@/components/frames/settings-nav"
import { BrandMark } from "@/components/frames/brand-marks"
import { Button } from "@/components/ui/button"
import { PageHeader, CrumbChip } from "@/components/shell/page-header"
import { workspaceFeatures, workspaceIntegrations } from "@/data/screens"
import { cx } from "@/utils/cx"

const WORKSPACE_NAV: { label: string; active?: boolean }[] = [
  { label: "Overview", active: true },
  { label: "General" },
  { label: "Security" },
  { label: "Members" },
  { label: "Labels" },
  { label: "Projects" },
  { label: "Templates" },
  { label: "Initiatives" },
  { label: "SLAs" },
  { label: "Asks" },
  { label: "Applications" },
  { label: "Emojis" },
  { label: "Plans" },
  { label: "Billing" },
  { label: "Import / Export" },
  { label: "Integrations" },
]

const ACCOUNT_NAV = ["Profile", "Preferences", "Notifications"]

const FEATURE_ICONS: Record<string, RemixiconComponentType> = {
  migration: RiExchangeLine,
  initiatives: RiRocket2Line,
  cycles: RiSpeedUpLine,
  views: RiLayoutGridLine,
  triage: RiShieldCheckLine,
}

/** The icon tile that opens every feature card: a 32px rounded square of the
 * quaternary fill with a 16px line glyph centred in it. Same tile, same size,
 * on all five cards — the icon carries the meaning, the tile carries nothing. */
function IconTile({ icon: Icon }: { icon: RemixiconComponentType }) {
  return (
    <span className="bg-fill-quaternary text-fg grid size-8 place-items-center rounded-lg">
      <Icon aria-hidden className="size-4" />
    </span>
  )
}

function LearnMore() {
  return (
    <a
      href="#learn-more"
      className={cx(
        "text-accent inline-flex items-center gap-0.5 text-footnote font-medium",
        "hover:underline focus-visible:ring-ring/45 rounded-sm outline-none focus-visible:ring-[3px]",
      )}
    >
      Learn more
      <RiArrowRightSLine aria-hidden className="size-4" />
    </a>
  )
}

export default function WorkspaceScreen() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Screens" },
          { label: "Workspace", icon: <RiSettings4Line className="size-4" /> },
        ]}
        title="Workspace settings"
      />

      <ScreenCanvas>
        <WindowFrame className="bg-bg-subtle" height={880}>
          {/* Nav column. It sits on the window's grey, never on white, which is
            * why the selected row is a raised white chip. */}
          <SettingsNavColumn width={278} className="px-4 pt-5 pb-4">
            <BackChip />

            <div className="mt-5 flex flex-col gap-0.5">
              <NavGroupLabel icon={RiAppsLine}>Workspace</NavGroupLabel>
              {WORKSPACE_NAV.map((item) => (
                <NavRow key={item.label} label={item.label} active={item.active} indent />
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-0.5">
              <NavGroupLabel icon={RiUserSettingsLine}>My account</NavGroupLabel>
              {ACCOUNT_NAV.map((label) => (
                <NavRow key={label} label={label} indent />
              ))}
            </div>
          </SettingsNavColumn>

          {/* Content pane: a white card inset from three window edges, with its
            * own radius. The gap is what makes the nav read as chrome. */}
          <WindowPane className="bg-surface border-border-subtle my-3 mr-3 rounded-[20px] border">
            <div className="px-12 pt-11 pb-12 max-xl:px-8">
              <h1 className="text-style-large-title text-fg">Workspace</h1>
              <p className="text-style-subheadline text-fg-secondary mt-2">
                Manage your workspace settings. Your workspace is in the{" "}
                <span className="text-fg font-semibold">United States</span> region.
              </p>

              <SettingsSection title="Explore features" className="mt-11">
                <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
                  {workspaceFeatures.map((feature) => (
                    <article
                      key={feature.id}
                      className="border-border-subtle flex flex-col rounded-xl border p-5"
                    >
                      <IconTile icon={FEATURE_ICONS[feature.id]} />
                      <h3 className="text-style-subheadline text-fg mt-4 font-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-style-footnote text-fg-secondary mt-1.5">
                        {feature.blurb}
                      </p>
                      <div className="mt-5 flex items-center gap-4">
                        <Button size="sm" className="rounded-lg px-3">
                          {feature.action}
                        </Button>
                        <LearnMore />
                      </div>
                    </article>
                  ))}
                </div>
              </SettingsSection>

              <SettingsSection title="Integrations" className="mt-12">
                <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
                  {workspaceIntegrations.map((integration) => (
                    <article
                      key={integration.id}
                      className="border-border-subtle flex flex-col rounded-xl border p-5"
                    >
                      <BrandMark brand={integration.id} />
                      <h3 className="text-style-subheadline text-fg mt-4 font-semibold">
                        {integration.title}
                      </h3>
                      <p className="text-style-footnote text-fg-secondary mt-1.5 flex-1">
                        {integration.blurb}
                      </p>
                      <div className="mt-5">
                        <Button size="sm" className="rounded-lg px-3">
                          {integration.action}
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </SettingsSection>

              <SettingsSection title="Workspace controls" className="mt-12">
                <div className="border-border-subtle divide-border-subtle divide-y rounded-xl border">
                  {[
                    { icon: RiShieldKeyholeLine, label: "Security", value: "SAML SSO enforced" },
                    { icon: RiTeamLine, label: "Members", value: "48 members · 6 guests" },
                    { icon: RiPriceTag3Line, label: "Labels", value: "23 labels in 4 groups" },
                    { icon: RiFolderLine, label: "Projects", value: "12 active" },
                    { icon: RiFileList3Line, label: "Templates", value: "8 templates" },
                    { icon: RiFlagLine, label: "Initiatives", value: "3 in flight" },
                    { icon: RiTimerLine, label: "SLAs", value: "Off" },
                    { icon: RiCalendarCheckLine, label: "Cycles", value: "2 week cadence" },
                    { icon: RiPuzzle2Line, label: "Applications", value: "5 authorised" },
                    { icon: RiEmotionLine, label: "Emojis", value: "116 custom" },
                    { icon: RiBankCard2Line, label: "Billing", value: "Business · annual" },
                    { icon: RiUpload2Line, label: "Import / Export", value: "Last export 12 Aug" },
                    { icon: RiCompasses2Line, label: "Plans", value: "Business" },
                  ].map((row) => (
                    <button
                      key={row.label}
                      type="button"
                      className={cx(
                        "hover:bg-fill-quaternary flex w-full items-center gap-3 px-4 py-3 text-left",
                        "transition-colors duration-fast first:rounded-t-xl last:rounded-b-xl",
                        "focus-visible:ring-ring/45 outline-none focus-visible:ring-[3px]",
                      )}
                    >
                      <row.icon aria-hidden className="text-fg-secondary size-4.5 shrink-0" />
                      <span className="text-style-subheadline text-fg flex-1 truncate">
                        {row.label}
                      </span>
                      <span className="text-style-footnote text-fg-secondary truncate">
                        {row.value}
                      </span>
                      <RiArrowRightSLine aria-hidden className="text-fg-tertiary size-4" />
                    </button>
                  ))}
                </div>
              </SettingsSection>
            </div>
          </WindowPane>
        </WindowFrame>
      </ScreenCanvas>
    </>
  )
}
