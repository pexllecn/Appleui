"use client"

import { useState } from "react"
import { RiCheckLine, RiFileCopyLine } from "@remixicon/react"
import { cx } from "@/utils/cx"

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      setTimeout(() => setCopied((c) => (c === value ? null : c)), 1400)
    } catch {
      // Clipboard is unavailable (insecure context, or permission denied).
      // The value is on screen either way.
    }
  }
  return { copied, copy }
}

/** One step of a ramp. Click copies the hex. */
export function Swatch({
  name,
  value,
  step,
  isAnchor,
}: {
  name: string
  value: string
  step: number | string
  isAnchor?: boolean
}) {
  const { copied, copy } = useCopy()
  const isCopied = copied === value

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      title={`${name} · ${value}`}
      className={cx(
        "group focus-visible:ring-ring/45 relative flex flex-col gap-1.5 rounded-lg text-left outline-none focus-visible:ring-[3px]",
      )}
    >
      <span
        className={cx(
          "border-border-subtle relative block h-14 w-full rounded-lg border",
          "transition-transform duration-fast ease-out-quint group-hover:scale-[1.04]",
        )}
        style={{ background: value }}
      >
        {isAnchor ? (
          <span
            className="ring-fg/70 absolute inset-0 rounded-lg ring-2 ring-offset-2"
            style={{ ["--tw-ring-offset-color" as string]: "var(--color-bg)" }}
            aria-hidden
          />
        ) : null}
        <span
          className={cx(
            "absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-fast",
            "group-hover:opacity-100",
            isCopied && "opacity-100",
          )}
        >
          <span className="material-thick text-fg grid size-7 place-items-center rounded-full shadow-sm">
            {isCopied ? <RiCheckLine className="size-4" /> : <RiFileCopyLine className="size-3.5" />}
          </span>
        </span>
      </span>
      <span className="px-0.5">
        <span className="text-style-caption2 text-fg block font-medium tabular">{step}</span>
        <span className="text-style-caption2 text-fg-tertiary block font-mono">{value}</span>
      </span>
    </button>
  )
}

/** A semantic token: shows the resolved colour plus the variable name. */
export function TokenRow({
  token,
  description,
  swatchClass,
}: {
  token: string
  description?: string
  swatchClass: string
}) {
  const { copied, copy } = useCopy()
  const variable = `var(--color-${token})`

  return (
    <button
      type="button"
      onClick={() => copy(variable)}
      className={cx(
        "hover:bg-fill-quaternary focus-visible:ring-ring/45 flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left",
        "transition-colors duration-fast outline-none focus-visible:ring-[3px]",
      )}
    >
      <span
        className={cx(
          "border-border-subtle size-9 shrink-0 rounded-lg border",
          swatchClass,
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="text-style-subheadline text-fg block font-mono">{token}</span>
        {description ? (
          <span className="text-style-caption1 text-fg-secondary block">{description}</span>
        ) : null}
      </span>
      {copied === variable ? (
        <RiCheckLine className="text-success size-4 shrink-0" />
      ) : (
        <RiFileCopyLine className="text-fg-quaternary size-4 shrink-0" />
      )}
    </button>
  )
}
