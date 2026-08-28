import { seededInts } from "@/lib/random"

export const recentHires = {
  total: 56,
  people: [
    { name: "Livia Saris", when: "Joined today", role: "Backend Engineer" },
    { name: "Jaydon Aminoff", when: "2 days ago", role: "UI Designer" },
    { name: "Maria Lubin", when: "5 days ago", role: "User Researcher" },
    { name: "Ann Press", when: "A week ago", role: "DevOps Engineer" },
  ],
}

/** Monthly billing against a flat 10K capacity — the bars carry a track. */
export const monthlySpend = {
  capacity: 10_000,
  values: [3_240, 7_050, 8_480, 6_980, 3_180, 2_420, 3_620, 5_240, 6_640, 4_580, 9_400, 7_820],
}

export const revenue = {
  total: 18_240,
  delta: 9.4,
  values: [1_120, 2_080, 2_640, 2_460, 3_580, 3_180, 3_420, 4_400, 4_820, 4_180, 3_920, 6_020],
}

export const contributions = {
  total: 958,
  delta: 14.8,
  stats: [
    { value: "9B", label: "Lifetime tokens" },
    { value: "562.7M", label: "Peak tokens" },
    { value: "12h 54m", label: "Longest task" },
    { value: "62 days", label: "Top streak" },
  ],
  /** 52 weeks × 7 days. Seeded so the server and client agree. */
  weeks: Array.from({ length: 52 }, (_, w) => seededInts(1000 + w, 7, 0, 12)),
}

export const summaryCards = [
  { label: "Customers", value: 8_642, delta: 4.6, trend: [12, 18, 16, 22, 26, 24, 31, 34, 33, 39, 42, 48] },
  { label: "Unit sold", value: 24_180, delta: 7.2, trend: [30, 28, 33, 31, 38, 42, 40, 46, 49, 53, 51, 58] },
  { label: "Orders", value: 3_920, delta: -2.1, trend: [40, 44, 42, 39, 41, 37, 38, 34, 36, 33, 31, 30] },
  { label: "Support tickets", value: 214, delta: -12.4, trend: [58, 54, 51, 49, 44, 46, 41, 38, 34, 31, 27, 22] },
]
