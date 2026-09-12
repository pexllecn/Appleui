import { extendTailwindMerge } from "tailwind-merge"

/** Apple's text styles are named, not sized — `text-footnote`, not `text-sm`.
 * tailwind-merge can't know that, so out of the box it reads every one of them
 * as a text *colour* and lets it win over the colour class beside it: write
 * `text-fg text-footnote` and the ink silently disappears. Registering the
 * scale as font sizes puts each class back in its own group. */
const TEXT_STYLES = [
  "caption2",
  "caption1",
  "footnote",
  "subheadline",
  "callout",
  "body",
  "headline",
  "title3",
  "title2",
  "title1",
  "large-title",
  "display",
  "display-lg",
]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: [...TEXT_STYLES, ...TEXT_STYLES.map((style) => `style-${style}`)] },
      ],
    },
  },
})

type ClassValue = string | number | null | false | undefined | ClassValue[]

/** Join conditional class names and let the last Tailwind utility win. */
export function cx(...args: ClassValue[]): string {
  return twMerge(flatten(args))
}

function flatten(args: ClassValue[]): string {
  let out = ""
  for (const arg of args) {
    if (!arg && arg !== 0) continue
    const value = Array.isArray(arg) ? flatten(arg) : String(arg)
    if (value) out += (out && " ") + value
  }
  return out
}

/** The focus ring every interactive component shares. */
export const focusRing = [
  "outline-none",
  "focus-visible:ring-[3px] focus-visible:ring-ring/45",
  "focus-visible:border-accent",
]

/** Applied while a pointer is held down — Apple's press-in feel. */
export const pressable = "active:scale-[0.98] transition-transform duration-instant ease-standard"
