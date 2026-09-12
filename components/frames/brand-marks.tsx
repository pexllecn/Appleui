import { RiGithubFill, RiGitlabFill } from "@remixicon/react"
import { cx } from "@/utils/cx"

/** Integration logos. Slack and Figma are drawn rather than pulled from the
 * icon set, because their marks are multi-colour and a monochrome stand-in
 * reads as a generic glyph next to GitHub's. Brand colours are the one place
 * in the system that ignores the token layer — they are not ours to re-tint. */

function Slack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path fill="#E01E5A" d="M5.04 15.12a2.52 2.52 0 1 1-2.52-2.52h2.52v2.52Z" />
      <path fill="#E01E5A" d="M6.3 15.12a2.52 2.52 0 0 1 5.04 0v6.3a2.52 2.52 0 0 1-5.04 0v-6.3Z" />
      <path fill="#36C5F0" d="M8.82 5.04a2.52 2.52 0 1 1 2.52-2.52v2.52H8.82Z" />
      <path fill="#36C5F0" d="M8.82 6.3a2.52 2.52 0 0 1 0 5.04h-6.3a2.52 2.52 0 0 1 0-5.04h6.3Z" />
      <path fill="#2EB67D" d="M18.96 8.82a2.52 2.52 0 1 1 2.52 2.52h-2.52V8.82Z" />
      <path fill="#2EB67D" d="M17.7 8.82a2.52 2.52 0 0 1-5.04 0V2.52a2.52 2.52 0 0 1 5.04 0v6.3Z" />
      <path fill="#ECB22E" d="M15.18 18.96a2.52 2.52 0 1 1-2.52 2.52v-2.52h2.52Z" />
      <path fill="#ECB22E" d="M15.18 17.7a2.52 2.52 0 0 1 0-5.04h6.3a2.52 2.52 0 0 1 0 5.04h-6.3Z" />
    </svg>
  )
}

function Figma({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 36" aria-hidden className={className}>
      <path fill="#1ABCFE" d="M12 18a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z" />
      <path fill="#0ACF83" d="M0 30a6 6 0 0 1 6-6h6v6a6 6 0 0 1-12 0Z" />
      <path fill="#FF7262" d="M12 0v12h6a6 6 0 0 0 0-12h-6Z" />
      <path fill="#F24E1E" d="M0 6a6 6 0 0 0 6 6h6V0H6a6 6 0 0 0-6 6Z" />
      <path fill="#A259FF" d="M0 18a6 6 0 0 0 6 6h6V12H6a6 6 0 0 0-6 6Z" />
    </svg>
  )
}

export type BrandMarkKey = "github" | "gitlab" | "slack" | "figma"

export function BrandMark({ brand, className }: { brand: BrandMarkKey; className?: string }) {
  if (brand === "slack") return <Slack className={cx("size-7", className)} />
  if (brand === "figma") return <Figma className={cx("h-7 w-[18.7px]", className)} />
  if (brand === "gitlab")
    return <RiGitlabFill aria-hidden className={cx("size-7 text-[#FC6D26]", className)} />
  return <RiGithubFill aria-hidden className={cx("text-fg size-7", className)} />
}
