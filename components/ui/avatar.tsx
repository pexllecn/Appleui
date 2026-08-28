import { cx } from "@/utils/cx"

const sizes = {
  xs: "size-5 text-caption2",
  sm: "size-6 text-caption2",
  md: "size-8 text-caption1",
  lg: "size-10 text-subheadline",
  xl: "size-14 text-title3",
}

/** Deterministic tint per person, so the same name always gets the same colour. */
const TINTS = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200",
  "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200",
  "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200",
]

function tintFor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return TINTS[hash % TINTS.length]
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function Avatar({
  name,
  size = "md",
  status,
  className,
}: {
  name: string
  size?: keyof typeof sizes
  status?: "online" | "away" | "offline"
  className?: string
}) {
  return (
    <span className={cx("relative inline-flex shrink-0", className)}>
      <span
        aria-hidden
        className={cx(
          "inline-flex items-center justify-center rounded-full font-semibold select-none",
          sizes[size],
          tintFor(name),
        )}
      >
        {initials(name)}
      </span>
      <span className="sr-only">{name}</span>
      {status ? (
        <span
          aria-hidden
          className={cx(
            "border-surface absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2",
            status === "online" && "bg-success",
            status === "away" && "bg-warning",
            status === "offline" && "bg-fill",
          )}
        />
      ) : null}
    </span>
  )
}

export function AvatarGroup({
  names,
  max = 4,
  className,
}: {
  names: string[]
  max?: number
  className?: string
}) {
  const shown = names.slice(0, max)
  const extra = names.length - shown.length
  return (
    <div className={cx("flex items-center -space-x-2", className)}>
      {shown.map((name) => (
        <Avatar key={name} name={name} size="md" className="ring-surface rounded-full ring-2" />
      ))}
      {extra > 0 ? (
        <span className="bg-fill-tertiary text-fg-secondary ring-surface inline-flex size-8 items-center justify-center rounded-full text-caption1 font-semibold ring-2">
          +{extra}
        </span>
      ) : null}
    </div>
  )
}
