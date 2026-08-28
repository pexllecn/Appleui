import { cx } from "@/utils/cx"

export function Table({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cx("w-full border-collapse text-left", className)}>{children}</table>
    </div>
  )
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-surface sticky top-0 z-10">
      <tr className="border-border border-b">{children}</tr>
    </thead>
  )
}

export function TH({
  children,
  align = "left",
  className,
}: {
  children?: React.ReactNode
  align?: "left" | "right" | "center"
  className?: string
}) {
  return (
    <th
      scope="col"
      className={cx(
        "text-fg-secondary px-4 py-2.5 text-caption1 font-medium whitespace-nowrap",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </th>
  )
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>
}

export function TR({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <tr
      className={cx(
        "border-border-subtle border-b last:border-0",
        "hover:bg-fill-quaternary transition-colors duration-fast ease-standard",
        className,
      )}
    >
      {children}
    </tr>
  )
}

export function TD({
  children,
  align = "left",
  className,
}: {
  children?: React.ReactNode
  align?: "left" | "right" | "center"
  className?: string
}) {
  return (
    <td
      className={cx(
        "text-subheadline text-fg px-4 py-3 align-middle",
        align === "right" && "text-right tabular",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </td>
  )
}
