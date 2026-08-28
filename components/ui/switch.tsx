"use client"

import { Switch as AriaSwitch, type SwitchProps } from "react-aria-components"
import { cx } from "@/utils/cx"

/** Apple's switch: 51×31 at full size, with a thumb that stretches on press. */
export function Switch({ className, children, ...props }: SwitchProps) {
  return (
    <AriaSwitch
      {...props}
      className={cx(
        "group inline-flex items-center gap-3 text-subheadline",
        "disabled:opacity-40",
        typeof className === "string" ? className : undefined,
      )}
    >
      {(renderProps) => (
        <>
          <span
            className={cx(
              "relative h-[31px] w-[51px] shrink-0 rounded-full p-0.5",
              "transition-colors duration-normal ease-standard",
              "bg-fill",
              "group-selected:bg-success",
              "group-focus-visible:ring-[3px] group-focus-visible:ring-ring/45",
            )}
          >
            <span
              className={cx(
                "block size-[27px] rounded-full bg-white",
                "shadow-[0_3px_8px_rgb(0_0_0/0.15),0_1px_1px_rgb(0_0_0/0.16)]",
                "transition-transform duration-normal ease-out-quint",
                "group-selected:translate-x-5",
              )}
            />
          </span>
          {typeof children === "function" ? children(renderProps) : children}
        </>
      )}
    </AriaSwitch>
  )
}
