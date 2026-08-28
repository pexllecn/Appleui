import { seededInts } from "@/lib/random"

export const profile = {
  name: "Mertcan Esmergül",
  handle: "@sitenley",
  plan: "PRO",
  contributions: { value: "$7,462", delta: 14.8 },
  stats: [
    { value: "9B", label: "Lifetime tokens" },
    { value: "562.7M", label: "Peak tokens" },
    { value: "12h 54m", label: "Longest task" },
    { value: "62 days", label: "Top streak" },
  ],
  weeks: Array.from({ length: 52 }, (_, w) => seededInts(4200 + w, 7, 0, 12)),
}

export const agents = {
  month: "December",
  total: 32,
  /** One bar per day of the month. */
  daily: seededInts(77, 31, 8, 34),
}

export const activityFeed = [
  { id: "a1", actor: "Livia Saris", action: "merged", target: "feat/chart-tooltips", when: "12m ago" },
  { id: "a2", actor: "Jaydon Aminoff", action: "commented on", target: "Design tokens RFC", when: "1h ago" },
  { id: "a3", actor: "Maria Lubin", action: "opened", target: "Sidebar collapse states", when: "3h ago" },
  { id: "a4", actor: "Ann Press", action: "deployed", target: "production · v2.4.0", when: "Yesterday" },
]
