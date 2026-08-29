"use client"

import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components"
import { cx, focusRing } from "@/utils/cx"

type Variant = "primary" | "secondary" | "tinted" | "plain" | "destructive"
type Size = "sm" | "md" | "lg" | "icon"

const variants: Record<Variant, string> = {
  // Filled: the one call to action on a screen.
  primary: cx(
    "bg-accent text-accent-fg shadow-xs",
    "hover:bg-accent-hover pressed:bg-accent-active",
  ),
  // Gray: Apple's default bordered button.
  secondary: cx(
    "bg-surface text-fg border border-border shadow-xs",
    "hover:bg-fill-quaternary pressed:bg-fill-tertiary",
  ),
  // Tinted: accent text on a wash of the same hue.
  tinted: cx(
    "bg-accent-subtle text-accent",
    "hover:bg-accent-muted pressed:bg-accent-muted",
  ),
  plain: cx("text-accent", "hover:bg-fill-quaternary pressed:bg-fill-tertiary"),
  destructive: cx(
    "bg-danger text-white shadow-xs",
    "hover:bg-danger-hover pressed:bg-danger-hover",
  ),
}

const sizes: Record<Size, string> = {
  sm: "h-7 px-2.5 gap-1.5 text-caption1 rounded-sm",
  md: "h-8.5 px-3.5 gap-2 text-subheadline rounded-md",
  lg: "h-11 px-5 gap-2 text-body rounded-xl",
  icon: "size-8.5 rounded-md",
}

export interface ButtonProps extends AriaButtonProps {
  variant?: Variant
  size?: Size
  className?: string
}

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={cx(
        "inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap select-none",
        "transition-[background-color,box-shadow,transform] duration-fast ease-standard",
        "pressed:scale-[0.97]",
        "disabled:pointer-events-none disabled:opacity-40",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        sizes[size],
        variants[variant],
        focusRing,
        className,
      )}
    />
  )
}
