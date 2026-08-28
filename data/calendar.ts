export type EventTone = "lime" | "pink" | "purple" | "blue" | "mint" | "orange"

export interface CalendarEvent {
  id: string
  title: string
  /** ISO date, so the grid can place it without any timezone maths. */
  date: string
  time?: string
  endTime?: string
  duration?: string
  tone: EventTone
  meet?: string
  timezone?: string
  reminder?: string
  participants?: string[]
}

/** One class string per tone: background plus the label colour that sits on it. */
export const toneChip: Record<EventTone, string> = {
  lime: "bg-lime-100 text-lime-800 dark:bg-lime-400/20 dark:text-lime-200",
  pink: "bg-pink-100 text-pink-700 dark:bg-pink-400/20 dark:text-pink-200",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-400/20 dark:text-purple-200",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-400/20 dark:text-blue-200",
  mint: "bg-mint-100 text-mint-800 dark:bg-mint-400/20 dark:text-mint-200",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-400/20 dark:text-orange-200",
}

const team = [
  "hi@mertcan.works",
  "stevenrule@gmail.com",
  "laurenprosso@outlook.com",
  "jasonclay@gmail.com",
]

export const calendarMonth = { year: 2026, month: 7 } // August 2026

export const events: CalendarEvent[] = [
  { id: "e1", title: "Coffee", date: "2026-07-28", time: "09:30", endTime: "10:00", duration: "30m", tone: "lime" },
  { id: "e2", title: "Payday", date: "2026-07-30", tone: "lime" },
  { id: "e3", title: "Brunch", date: "2026-08-01", time: "11:00", endTime: "12:30", duration: "1h 30m", tone: "lime" },
  {
    id: "e4",
    title: "Stand-up",
    date: "2026-08-02",
    time: "11:30",
    endTime: "12:15",
    duration: "45m",
    tone: "pink",
    meet: "wol-yxef-aim",
    timezone: "GMT+1 Amsterdam",
    reminder: "2h before",
    participants: team,
  },
  { id: "e5", title: "1:1 sync", date: "2026-08-02", time: "16:30", endTime: "17:00", duration: "30m", tone: "lime", participants: team.slice(0, 2) },
  { id: "e6", title: "Gym", date: "2026-08-05", time: "07:00", endTime: "08:00", duration: "1h", tone: "pink" },
  { id: "e7", title: "Game night", date: "2026-08-08", time: "19:00", endTime: "22:00", duration: "3h", tone: "purple" },
  { id: "e8", title: "Deploy window", date: "2026-08-11", time: "20:30", endTime: "21:30", duration: "1h", tone: "mint" },
  { id: "e9", title: "Retro", date: "2026-08-14", time: "15:00", endTime: "16:00", duration: "1h", tone: "blue", meet: "kva-mtrq-ozp", timezone: "GMT+1 Amsterdam", participants: team },
  { id: "e10", title: "Planning", date: "2026-08-17", time: "10:00", endTime: "11:30", duration: "1h 30m", tone: "blue", participants: team },
  { id: "e11", title: "Haircut", date: "2026-08-17", time: "16:00", endTime: "16:45", duration: "45m", tone: "lime" },
  { id: "e12", title: "Stand-up", date: "2026-08-20", time: "11:30", endTime: "12:15", duration: "45m", tone: "pink", meet: "wol-yxef-aim", timezone: "GMT+1 Amsterdam", reminder: "2h before", participants: team },
  { id: "e13", title: "Team lunch", date: "2026-08-20", time: "13:00", endTime: "14:00", duration: "1h", tone: "purple" },
  { id: "e14", title: "Portfolio review", date: "2026-08-20", time: "14:30", endTime: "15:30", duration: "1h", tone: "blue", participants: team.slice(0, 3) },
  { id: "e15", title: "1:1 sync", date: "2026-08-20", time: "16:30", endTime: "17:00", duration: "30m", tone: "lime" },
  { id: "e16", title: "Design crit", date: "2026-08-25", time: "14:00", endTime: "15:00", duration: "1h", tone: "purple", participants: team },
  { id: "e17", title: "Payday", date: "2026-08-31", tone: "lime" },
]

/** Sunday-first grid covering the whole month plus its leading and trailing days. */
export function buildMonthGrid(year: number, month: number) {
  const first = new Date(Date.UTC(year, month, 1))
  const start = new Date(first)
  start.setUTCDate(1 - first.getUTCDay())

  return Array.from({ length: 42 }, (_, i) => {
    const day = new Date(start)
    day.setUTCDate(start.getUTCDate() + i)
    return {
      iso: day.toISOString().slice(0, 10),
      day: day.getUTCDate(),
      inMonth: day.getUTCMonth() === month,
    }
  })
}
