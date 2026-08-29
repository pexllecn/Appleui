import {
  RiBankLine,
  RiCustomerService2Line,
  RiEmotionLine,
  RiFolderLine,
  RiHome5Line,
  RiInboxLine,
  RiMegaphoneLine,
  RiPulseLine,
  RiSettings3Line,
  RiTeamLine,
  type RemixiconComponentType,
} from "@remixicon/react"
import { RiCalendarLine } from "@remixicon/react"

export interface NavItem {
  label: string
  href: string
  icon: RemixiconComponentType
  badge?: number
  /** False for routes that render the shared empty state rather than a template. */
  built?: boolean
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/templates/dashboard", icon: RiHome5Line, badge: 152, built: true },
  { label: "Marketing", href: "/templates/marketing", icon: RiMegaphoneLine, built: true },
  { label: "Calendar", href: "/templates/calendar", icon: RiCalendarLine, built: true },
  { label: "Finance", href: "/templates/finance", icon: RiBankLine },
  { label: "Projects", href: "/templates/projects", icon: RiFolderLine },
  { label: "Medical Report", href: "/templates/medical-report", icon: RiPulseLine, built: true },
  { label: "HR Team", href: "/templates/hr-team", icon: RiTeamLine },
  { label: "Profile", href: "/templates/profile", icon: RiEmotionLine, built: true },
  { label: "Inbox", href: "/templates/inbox", icon: RiInboxLine, badge: 91 },
]

export const secondaryNav: NavItem[] = [
  { label: "Support", href: "/support", icon: RiCustomerService2Line },
  { label: "Settings", href: "/settings", icon: RiSettings3Line },
]

export const account = {
  name: "Mertcan Esmergül",
  handle: "@sitenley",
  team: "Board team",
  email: "hi@boardui.com",
}
