export const kpis = [
  { label: "Ad spend", value: "$24,380", delta: 8.4, icon: "money" as const },
  { label: "Impressions", value: "1.94M", delta: 12.6, icon: "eye" as const },
  { label: "Conversions", value: "1,286", delta: 5.2, icon: "convert" as const },
  { label: "Cost per click", value: "$1.24", delta: -3.1, icon: "cursor" as const },
]

export const funnel = {
  total: "96.4K",
  delta: 5.8,
  stages: [
    { name: "Visits", value: 96_400, label: "96.4K", color: "var(--color-chart-1)" },
    { name: "Sign-ups", value: 38_600, label: "38.6K", color: "var(--color-chart-2)" },
    { name: "Trials", value: 14_100, label: "14.1K", color: "var(--color-chart-3)" },
    { name: "Customers", value: 5_200, label: "5.2K", color: "var(--color-chart-4)" },
  ],
}

export const spendByChannel = {
  total: "$24,880",
  delta: 8.4,
  leadShare: "46%",
  leadName: "Paid search",
  segments: [
    { name: "Paid search", value: 11_400, color: "var(--color-chart-1)" },
    { name: "Paid social", value: 7_620, color: "var(--color-chart-2)" },
    { name: "Email", value: 3_180, color: "var(--color-chart-3)" },
    { name: "Affiliates", value: 2_680, color: "var(--color-chart-4)" },
  ],
}

export const sessionsByChannel = [
  { name: "Google Ads", value: 39, brand: "google" as const },
  { name: "Meta", value: 25, brand: "meta" as const },
  { name: "X Ads", value: 14, brand: "x" as const },
  { name: "LinkedIn", value: 8, brand: "linkedin" as const },
  { name: "Email", value: 7, brand: "email" as const },
]

export const sessionsByCampaign = [
  { name: "Founder story video", value: 31, brand: "global" as const },
  { name: "Holiday gift guide", value: 24, brand: "meta" as const },
  { name: "Brand search", value: 19, brand: "google" as const },
  { name: "Webinar signups", value: 15, brand: "x" as const },
  { name: "Cart retargeting", value: 11, brand: "linkedin" as const },
]

export const sessionsByLandingPage = [
  { name: "/pricing", value: 34, brand: "global" as const },
  { name: "/templates", value: 27, brand: "global" as const },
  { name: "/", value: 21, brand: "global" as const },
  { name: "/docs/install", value: 12, brand: "global" as const },
  { name: "/changelog", value: 6, brand: "global" as const },
]

export const adSpend = {
  total: "$217.7K",
  delta: 9.4,
  roas: "3.6x",
  bars: [9_500, 10_400, 11_600, 10_800, 13_100, 15_000, 14_200, 16_500, 18_100, 17_400, 22_300, 25_400],
  line: [2.6, 2.8, 3.0, 2.9, 3.2, 3.4, 3.3, 3.6, 3.8, 3.7, 4.0, 4.1],
}

export const visitors = {
  total: "134,400",
  delta: 8.8,
  series: [
    {
      name: "Organic",
      color: "var(--color-chart-1)",
      total: "74,500",
      values: [4_900, 5_100, 5_000, 5_400, 5_600, 5_900, 6_100, 6_300, 6_600, 7_000, 7_300, 7_800],
    },
    {
      name: "Paid",
      color: "var(--color-chart-2)",
      total: "38,500",
      values: [2_600, 2_700, 2_650, 2_900, 3_000, 3_150, 3_200, 3_350, 3_450, 3_600, 3_750, 3_950],
    },
    {
      name: "Social",
      color: "var(--color-chart-3)",
      total: "21,400",
      values: [1_400, 1_450, 1_500, 1_550, 1_650, 1_700, 1_800, 1_850, 1_950, 2_050, 2_150, 2_300],
    },
  ],
}

export type Delivery = "Active" | "Paused" | "Draft"
export type Objective = "Awareness" | "Traffic" | "Conversions" | "Leads" | "Retargeting"
export type Brand = "google" | "meta" | "x" | "linkedin" | "email" | "global"

export interface Campaign {
  id: string
  name: string
  brand: Brand
  delivery: Delivery
  objective: Objective
  updated: string
  spend: number
  selected?: boolean
}

export const campaigns: Campaign[] = [
  { id: "c1", name: "Founder story video · Global", brand: "global", delivery: "Active", objective: "Awareness", updated: "Jul 22, 2026", spend: 34_800 },
  { id: "c2", name: "Holiday gift guide · Global", brand: "meta", delivery: "Paused", objective: "Traffic", updated: "Sep 16, 2026", spend: 30_884, selected: true },
  { id: "c3", name: "Founder story video · US", brand: "linkedin", delivery: "Active", objective: "Conversions", updated: "Dec 24, 2026", spend: 1_330 },
  { id: "c4", name: "Newsletter promo · EU", brand: "global", delivery: "Paused", objective: "Leads", updated: "Dec 08, 2026", spend: 34_445, selected: true },
  { id: "c5", name: "Spring launch · UK", brand: "global", delivery: "Draft", objective: "Awareness", updated: "Oct 04, 2026", spend: 0 },
  { id: "c6", name: "Brand search · US", brand: "global", delivery: "Paused", objective: "Leads", updated: "Mar 23, 2026", spend: 19_116 },
  { id: "c7", name: "Cart retargeting · UK", brand: "global", delivery: "Draft", objective: "Awareness", updated: "Aug 21, 2026", spend: 0 },
  { id: "c8", name: "Newsletter promo · US", brand: "meta", delivery: "Active", objective: "Awareness", updated: "Oct 24, 2026", spend: 28_095 },
  { id: "c9", name: "Webinar signups · UK", brand: "x", delivery: "Active", objective: "Awareness", updated: "Mar 08, 2026", spend: 25_305 },
  { id: "c10", name: "Case study promo · UK", brand: "google", delivery: "Active", objective: "Retargeting", updated: "Mar 01, 2026", spend: 333 },
]

export const campaignTotals = { count: 80, pages: 8 }
