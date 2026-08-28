import { twMerge } from "tailwind-merge"

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
