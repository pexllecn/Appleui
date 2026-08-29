"use client"

import {
  Input as AriaInput,
  Label as AriaLabel,
  SearchField as AriaSearchField,
  TextField as AriaTextField,
  type InputProps,
  type SearchFieldProps,
  type TextFieldProps,
} from "react-aria-components"
import { RiSearchLine } from "@remixicon/react"
import { cx, focusRing } from "@/utils/cx"

const control = cx(
  "h-8.5 w-full rounded-md bg-surface px-3",
  "border border-border text-subheadline text-fg",
  "placeholder:text-fg-placeholder",
  "transition-[box-shadow,border-color] duration-fast ease-standard",
  "disabled:opacity-40",
  focusRing,
)

export function Label({ className, ...props }: React.ComponentPropsWithoutRef<typeof AriaLabel>) {
  return (
    <AriaLabel
      {...props}
      className={cx("text-style-footnote text-fg-secondary font-medium", className)}
    />
  )
}

export function Input({ className, ...props }: InputProps) {
  return <AriaInput {...props} className={cx(control, className as string)} />
}

export function TextField({
  label,
  description,
  placeholder,
  className,
  ...props
}: TextFieldProps & { label?: string; description?: string; placeholder?: string }) {
  return (
    <AriaTextField {...props} className={cx("flex flex-col gap-1.5", className as string)}>
      {label ? <Label>{label}</Label> : null}
      <Input placeholder={placeholder} />
      {description ? <p className="text-style-caption1 text-fg-tertiary">{description}</p> : null}
    </AriaTextField>
  )
}

export function SearchField({
  placeholder = "Search",
  className,
  ...props
}: SearchFieldProps & { placeholder?: string }) {
  return (
    <AriaSearchField {...props} className={cx("relative", className as string)}>
      <RiSearchLine
        aria-hidden
        className="text-fg-tertiary pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
      />
      <AriaInput
        placeholder={placeholder}
        className={cx(control, "bg-fill-quaternary border-transparent pl-8.5")}
      />
    </AriaSearchField>
  )
}
