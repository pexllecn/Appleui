import type { Metadata } from "next"
import {
  RiAddLine,
  RiArrowLeftSLine,
  RiChat3Fill,
  RiChat3Line,
  RiCheckboxCircleFill,
  RiHeartFill,
  RiHome5Fill,
  RiHome5Line,
  RiInboxLine,
  RiMore2Fill,
  RiPhoneFill,
  RiQrScan2Line,
  RiSearchLine,
  RiSendPlaneFill,
  RiSmartphoneLine,
  RiSparkling2Fill,
  RiSparkling2Line,
  RiVidiconFill,
  RiVoiceprintFill,
  type RemixiconComponentType,
} from "@remixicon/react"
import { ScreenCanvas } from "@/components/frames/frame"
import { PhoneFrame, PhoneHeader } from "@/components/frames/phone-frame"
import { Avatar } from "@/components/ui/avatar"
import { PageHeader, CrumbChip } from "@/components/shell/page-header"
import { conversations, feedPosts, thread } from "@/data/screens"
import { cx } from "@/utils/cx"

export const metadata: Metadata = { title: "Mobile screens" }

/** The phones are drawn at 1× and the row is scaled once, so every measurement
 * inside them stays a real iOS measurement. */
const SCALE = 0.8

/** Cover art stands in for a photograph: a desaturated duotone wash with real
 * film grain over it, so the glass bar above has something textured to sit on
 * and the overlay's blur has something to actually blur. */
function CoverArt({ seed, className }: { seed: string; className?: string }) {
  const grainId = `grain-${seed}`
  return (
    <div className={cx("relative overflow-hidden bg-gray-800", className)}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 15%, #E8E8EA 0%, #8E8E93 38%, #3A3A3C 72%, #0B0B0C 100%)",
        }}
      />
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.22] mix-blend-overlay">
        <filter id={grainId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grainId})`} />
      </svg>
    </div>
  )
}

function VerifiedTick() {
  return <RiCheckboxCircleFill aria-hidden className="size-4 shrink-0 text-[#0A84FF]" />
}

function GlassButton({
  icon: Icon,
  label,
}: {
  icon: RemixiconComponentType
  label: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-8 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md"
    >
      <Icon aria-hidden className="size-4" />
    </button>
  )
}

function StatChip({
  icon: Icon,
  value,
}: {
  icon: RemixiconComponentType
  value: string
}) {
  return (
    <span className="flex items-center gap-1.5 text-[13px] font-semibold text-white/90 tabular">
      <Icon aria-hidden className="size-4" />
      {value}
    </span>
  )
}

/** The feed card. The overlay is a single translucent slab pinned inside the
 * artwork, not a bar below it — one blurred rectangle holds the byline, the
 * caption and the counts, so the card stays one object. */
function FeedCard({
  post,
  follow = false,
}: {
  post: (typeof feedPosts)[number]
  follow?: boolean
}) {
  return (
    <article className="relative mx-4 overflow-hidden rounded-[22px]">
      <CoverArt seed={post.id} className="aspect-[4/5] w-full" />

      <div className="absolute top-3 right-3">
        <GlassButton icon={RiMore2Fill} label="More" />
      </div>

      <div className="absolute inset-x-2.5 bottom-2.5 rounded-[18px] bg-black/45 p-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Avatar name={post.artist} size="sm" className="ring-1 ring-white/25 rounded-full" />
          <span className="text-[15px] font-semibold text-white">{post.artist}</span>
          <VerifiedTick />
          {follow ? (
            <button
              type="button"
              className="ml-1.5 rounded-full bg-white px-3 py-1 text-[13px] font-semibold text-black"
            >
              Follow
            </button>
          ) : null}
        </div>
        <p className="mt-2 text-[14px] leading-[20px] text-white/85">{post.caption}</p>
        <div className="mt-3 flex items-center gap-5">
          <StatChip icon={RiHeartFill} value={post.likes} />
          <StatChip icon={RiChat3Fill} value={post.comments} />
          <StatChip icon={RiSendPlaneFill} value={post.shares} />
        </div>
      </div>
    </article>
  )
}

/** Five destinations, glyph only, hairline above. The active one is filled
 * rather than tinted — weight carries selection at this size better than hue. */
function TabBar({ active }: { active: "home" | "discover" }) {
  const tabs: { id: string; icon: RemixiconComponentType; on: boolean; label: string }[] = [
    { id: "home", icon: active === "home" ? RiHome5Fill : RiHome5Line, on: active === "home", label: "Home" },
    {
      id: "discover",
      icon: active === "discover" ? RiSparkling2Fill : RiSparkling2Line,
      on: active === "discover",
      label: "Discover",
    },
    { id: "search", icon: RiSearchLine, on: false, label: "Search" },
    { id: "inbox", icon: RiInboxLine, on: false, label: "Inbox" },
  ]

  return (
    <nav
      aria-label="Tabs"
      className="border-border-subtle mt-auto flex shrink-0 items-center justify-around border-t px-3 pt-2.5 pb-1"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          aria-label={tab.label}
          aria-current={tab.on ? "page" : undefined}
          className={cx("grid size-11 place-items-center", tab.on ? "text-fg" : "text-fg-tertiary")}
        >
          <tab.icon aria-hidden className="size-6" />
        </button>
      ))}
      <button type="button" aria-label="Profile" className="grid size-11 place-items-center">
        <Avatar name="Mikhail Orlov" size="sm" className="ring-fg/15 rounded-full ring-2" />
      </button>
    </nav>
  )
}

function HeaderGlyph({ icon: Icon, label, dot }: { icon: RemixiconComponentType; label: string; dot?: boolean }) {
  return (
    <button type="button" aria-label={label} className="text-fg relative">
      <Icon aria-hidden className="size-6" />
      {dot ? (
        <span className="bg-danger border-surface absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2" />
      ) : null}
    </button>
  )
}

/** Message bubble. 20px radius on both sides, no tail: the tail is the one
 * iMessage detail that never survives being redrawn at a different radius, and
 * the alignment already says who is speaking. */
function Bubble({ message }: { message: (typeof thread)[number] }) {
  const mine = message.from === "me"
  return (
    <div className={cx("relative flex", mine ? "justify-end" : "justify-start")}>
      <div
        className={cx(
          "max-w-[78%] rounded-[20px] px-3.5 py-2 text-[15px] leading-[20px]",
          mine ? "bg-accent text-white" : "bg-fill-tertiary text-fg",
        )}
      >
        {message.text}
      </div>
      {message.reaction ? (
        <span
          className={cx(
            "bg-surface absolute -bottom-3 rounded-full text-[15px] leading-none",
            mine ? "right-2" : "left-2",
          )}
        >
          {message.reaction}
        </span>
      ) : null}
    </div>
  )
}

export default function MobileScreens() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Screens" },
          { label: "Mobile", icon: <RiSmartphoneLine className="size-4" /> },
        ]}
        title="Mobile screens"
      />

      {/* Four 390-point phones laid out at 1×, then scaled as a group so the
        * set fits one screen without any of them being re-drawn at a size the
        * type scale was never built for. */}
      <ScreenCanvas className="overflow-x-auto">
        <div style={{ height: 844 * SCALE, width: (390 * 4 + 32 * 3) * SCALE }}>
          <div className="flex origin-top-left gap-8" style={{ transform: `scale(${SCALE})` }}>
          {/* 1 · Feed, light */}
          <PhoneFrame appearance="light" label="Home feed">
            <PhoneHeader
              title="Home"
              actions={
                <>
                  <HeaderGlyph icon={RiQrScan2Line} label="Scan" />
                  <HeaderGlyph icon={RiChat3Line} label="Messages" dot />
                </>
              }
            />
            <div className="no-scrollbar flex-1 overflow-y-auto pb-3">
              <FeedCard post={feedPosts[0]} />
              <div className="mt-3">
                <FeedCard post={feedPosts[1]} />
              </div>
            </div>
            <TabBar active="home" />
          </PhoneFrame>

          {/* 2 · Discover, dark — same layout, opposite appearance. Nothing but
            * the tokens change between this phone and the one before it. */}
          <PhoneFrame appearance="dark" label="Discover feed">
            <PhoneHeader
              title="Discover"
              actions={
                <>
                  <HeaderGlyph icon={RiQrScan2Line} label="Scan" />
                  <HeaderGlyph icon={RiChat3Line} label="Messages" dot />
                </>
              }
            />
            <div className="no-scrollbar flex-1 overflow-y-auto pb-3">
              <FeedCard post={feedPosts[1]} follow />
              <div className="mt-3">
                <FeedCard post={feedPosts[0]} follow />
              </div>
            </div>
            <TabBar active="discover" />
          </PhoneFrame>

          {/* 3 · Conversation list */}
          <PhoneFrame appearance="light" label="Chat list">
            <PhoneHeader
              leading={
                <button type="button" aria-label="Back" className="text-fg -ml-1.5">
                  <RiArrowLeftSLine aria-hidden className="size-7" />
                </button>
              }
              title={
                <>
                  Chat
                  <span className="bg-danger grid size-6 shrink-0 place-items-center rounded-full text-[13px] leading-none font-semibold text-white tabular">
                    1
                  </span>
                </>
              }
            />
            <div className="px-4 pb-2">
              <div className="bg-fill-tertiary flex h-10 items-center gap-2 rounded-xl px-3">
                <RiSearchLine aria-hidden className="text-fg-secondary size-4.5" />
                <span className="text-fg-placeholder text-[15px]">Search</span>
              </div>
            </div>
            <ul className="no-scrollbar flex-1 overflow-y-auto px-4">
              {conversations.map((chat) => (
                <li key={chat.name} className="flex gap-3 py-3">
                  <Avatar name={chat.name} size="lg" status={chat.status} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-fg min-w-0 flex-1 truncate text-[15px] font-semibold">
                        {chat.name}
                      </span>
                      <span className="text-fg-secondary shrink-0 text-[13px]">{chat.time}</span>
                    </div>
                    <p className="text-fg-secondary mt-0.5 line-clamp-2 text-[13px] leading-[18px]">
                      {chat.preview}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </PhoneFrame>

          {/* 4 · Thread, dark */}
          <PhoneFrame appearance="dark" label="Chat thread">
            <header className="border-border-subtle flex shrink-0 items-center gap-2.5 border-b px-4 pb-3">
              <button type="button" aria-label="Back" className="text-fg -ml-1.5">
                <RiArrowLeftSLine aria-hidden className="size-7" />
              </button>
              <Avatar name="Michael Thompson" size="lg" />
              <div className="min-w-0 flex-1">
                <p className="text-fg truncate text-[15px] font-semibold">Michael Thompson</p>
                <p className="text-fg-secondary text-[12px]">Active 2m ago</p>
              </div>
              <button type="button" aria-label="Call" className="text-fg">
                <RiPhoneFill aria-hidden className="size-5" />
              </button>
              <button type="button" aria-label="Video call" className="text-fg">
                <RiVidiconFill aria-hidden className="size-5" />
              </button>
            </header>

            <div className="no-scrollbar flex flex-1 flex-col justify-end gap-3.5 overflow-y-auto px-4 py-4">
              {thread.map((message, i) => (
                <Bubble key={i} message={message} />
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2.5 px-4 pt-1 pb-2">
              <button
                type="button"
                aria-label="Attach"
                className="bg-fill-tertiary text-fg grid size-9 shrink-0 place-items-center rounded-full"
              >
                <RiAddLine aria-hidden className="size-5" />
              </button>
              <div className="bg-fill-tertiary flex h-9 min-w-0 flex-1 items-center gap-2 rounded-full px-4">
                <span className="text-fg-placeholder flex-1 truncate text-[15px]">Message...</span>
                <RiVoiceprintFill aria-hidden className="text-fg-secondary size-4.5" />
              </div>
            </div>
          </PhoneFrame>
          </div>
        </div>
      </ScreenCanvas>
    </>
  )
}
