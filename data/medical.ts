export const patient = {
  name: "Mertcan Esmergül",
  fields: [
    { label: "Date of Birth", value: "28 July, 1997", icon: "birthday" as const },
    { label: "Gender", value: "Male", icon: "gender" as const },
    { label: "Blood Type", value: "A rh+", icon: "blood" as const },
    { label: "GP Doctor", value: "Mattheus Clarkson", icon: "doctor" as const },
  ],
}

export const steps = {
  range: "29 Jun - 5 Jul",
  total: "31,600",
  goal: 9_000,
  values: [6_800, 2_900, 2_600, 7_400, 8_200, 5_900, 4_100],
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
}

export const sleep = {
  range: "29 Jun - 5 Jul",
  verdict: "Excellent",
  score: 98,
  segments: [
    { name: "Duration", value: 49, color: "var(--color-chart-3)" },
    { name: "Bedtime", value: 29, color: "var(--color-chart-4)" },
    { name: "Interruptions", value: 20, color: "var(--color-chart-2)" },
  ],
  rows: [
    { label: "Duration: 7h 50m", score: "49/50", color: "var(--color-chart-3)" },
    { label: "Bedtime: 20m earlier", score: "29/30", color: "var(--color-chart-4)" },
    { label: "Interruptions: 5m wake up", score: "20/20", color: "var(--color-chart-2)" },
  ],
}

export const activeDays = {
  month: "July",
  total: "32,459",
  selectedDay: 5,
  /** move / exercise / running completion per day, as fractions of goal. */
  days: Array.from({ length: 21 }, (_, i) => {
    const day = i + 1
    const fade = day > 11 ? 0.25 : 1
    return {
      day,
      move: (0.45 + ((day * 37) % 55) / 100) * fade,
      exercise: (0.35 + ((day * 53) % 65) / 100) * fade,
      running: (0.3 + ((day * 29) % 70) / 100) * fade,
    }
  }),
}

export const activityRings = {
  date: "July 5, 2026",
  rings: [
    { name: "Move", value: 1_228, goal: 1_400, color: "var(--color-chart-4)", display: "1,228 kcal" },
    { name: "Exercise", value: 122, goal: 150, color: "var(--color-chart-1)", display: "2h 2m" },
    { name: "Running", value: 6.0, goal: 8, color: "var(--color-chart-2)", display: "6.0 km" },
  ],
}

export const alerts = {
  range: "29 Jun - 5 Jul",
  count: 12,
  items: [
    {
      id: "al1",
      title: "High Heart rate",
      date: "June, 12",
      tone: "danger" as const,
      body: "Your heart rate rose above 120 BPM while you seemed to be inactive for 10 minutes starting at 8:59 AM, 12 June.",
    },
    {
      id: "al2",
      title: "Medical ID",
      date: "June, 9",
      tone: "warning" as const,
      body: "Your emergency contact and allergy information was updated in your Medical ID.",
    },
  ],
}

export type PatientStatus = "Stable" | "Monitoring" | "Critical"

export interface PatientRow {
  id: string
  name: string
  condition: string
  status: PatientStatus
  lastVisit: string
  physician: string
}

export const patients: PatientRow[] = [
  { id: "p1", name: "Livia Saris", condition: "Hypertension", status: "Stable", lastVisit: "Jul 02, 2026", physician: "Mattheus Clarkson" },
  { id: "p2", name: "Jaydon Aminoff", condition: "Arrhythmia", status: "Monitoring", lastVisit: "Jun 28, 2026", physician: "Elena Ruiz" },
  { id: "p3", name: "Maria Lubin", condition: "Type 2 diabetes", status: "Stable", lastVisit: "Jun 21, 2026", physician: "Mattheus Clarkson" },
  { id: "p4", name: "Ann Press", condition: "Post-op recovery", status: "Critical", lastVisit: "Jul 04, 2026", physician: "Sofia Lind" },
  { id: "p5", name: "Steven Rule", condition: "Asthma", status: "Stable", lastVisit: "May 30, 2026", physician: "Elena Ruiz" },
  { id: "p6", name: "Lauren Prosso", condition: "Migraine", status: "Monitoring", lastVisit: "Jun 12, 2026", physician: "Sofia Lind" },
]

export const patientTotals = { count: 540, pages: 9 }
