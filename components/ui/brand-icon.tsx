import {
  RiGlobalLine,
  RiGoogleFill,
  RiLinkedinFill,
  RiMailLine,
  RiMetaFill,
  RiTwitterXFill,
} from "@remixicon/react"
import { cx } from "@/utils/cx"

const brands = {
  google: RiGoogleFill,
  meta: RiMetaFill,
  x: RiTwitterXFill,
  linkedin: RiLinkedinFill,
  email: RiMailLine,
  global: RiGlobalLine,
}

export type BrandKey = keyof typeof brands

export function BrandIcon({ brand, className }: { brand: BrandKey; className?: string }) {
  const Icon = brands[brand]
  return <Icon aria-hidden className={cx("size-4 shrink-0", className)} />
}
