"use client"

import { Checkbox as AriaCheckbox, type CheckboxProps } from "react-aria-components"
import { RiCheckLine, RiSubtractLine } from "@remixicon/react"
import { cx } from "@/utils/cx"

export function Checkbox({ className, children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={cx(
        "group flex items-center gap-2.5 text-subheadline",
        typeof className === "string" ? className : undefined,
      )}
    >
      {(renderProps) => (
        <>
          <span
            className={cx(
              "grid size-[18px] shrink-0 place-items-center rounded-[6px] border",
              "transition-colors duration-fast ease-standard",
              renderProps.isSelected || renderProps.isIndeterminate
                ? "bg-accent border-accent text-accent-fg"
                : "bg-surface border-border-strong",
              renderProps.isFocusVisible && "ring-ring/45 ring-[3px]",
            )}
          >
            {renderProps.isIndeterminate ? (
              <RiSubtractLine className="size-3.5" />
            ) : renderProps.isSelected ? (
              <RiCheckLine className="size-3.5" />
            ) : null}
          </span>
          {typeof children === "function" ? children(renderProps) : children}
        </>
      )}
    </AriaCheckbox>
  )
}
