/** Content for the recreated reference screens. Kept out of the pages so each
 * page is only layout, the way the templates are. */

/* ---- Workspace settings ------------------------------------------------ */

export interface FeatureCard {
  id: string
  title: string
  blurb: string
  action: string
}

export const workspaceFeatures: FeatureCard[] = [
  {
    id: "migration",
    title: "Issue Migration Assistant",
    blurb: "Copy over existing issues from Jira, Shortcut, Asana or GitHub.",
    action: "Migrate issues",
  },
  {
    id: "initiatives",
    title: "Initiatives",
    blurb: "Plan strategic product work and monitor progress at scale.",
    action: "Try initiatives",
  },
  {
    id: "cycles",
    title: "Cycles",
    blurb: "Track your team's workload and velocity with Cycles.",
    action: "Try Cycles",
  },
  {
    id: "views",
    title: "Views",
    blurb: "Create filtered views that you can save and share with others.",
    action: "Open views",
  },
  {
    id: "triage",
    title: "Triage",
    blurb: "Prioritize issues created from outside your team and customer support integrations.",
    action: "Try Triage",
  },
]

export interface IntegrationCard {
  id: "github" | "gitlab" | "slack" | "figma"
  title: string
  blurb: string
  action: string
}

export const workspaceIntegrations: IntegrationCard[] = [
  { id: "github", title: "GitHub", blurb: "Link pull requests, commits and automate workflows.", action: "Connect" },
  { id: "gitlab", title: "GitLab", blurb: "Link merge requests and automate workflows.", action: "Connect" },
  { id: "slack", title: "Slack", blurb: "Send notifications to channels and create issues from messages.", action: "Connect" },
  { id: "figma", title: "Figma", blurb: "Embed file previews in issues.", action: "Connect" },
]

/* ---- Business hours ---------------------------------------------------- */

export interface BusinessDay {
  day: string
  enabled: boolean
  intervals: { from: string; to: string }[]
}

export const businessHours: BusinessDay[] = [
  { day: "Monday", enabled: true, intervals: [{ from: "08:00", to: "19:30" }] },
  {
    day: "Tuesday",
    enabled: true,
    intervals: [
      { from: "08:00", to: "12:30" },
      { from: "14:30", to: "19:30" },
    ],
  },
  { day: "Wednesday", enabled: true, intervals: [{ from: "08:00", to: "19:30" }] },
  { day: "Thursday", enabled: true, intervals: [{ from: "08:00", to: "19:30" }] },
  {
    day: "Friday",
    enabled: true,
    intervals: [
      { from: "08:00", to: "12:30" },
      { from: "14:30", to: "19:00" },
    ],
  },
  { day: "Saturday", enabled: false, intervals: [{ from: "", to: "" }] },
  { day: "Sunday", enabled: false, intervals: [{ from: "", to: "" }] },
]

/* ---- Analytics --------------------------------------------------------- */

export const analyticsKpis = [
  { label: "Total sales", value: "$78,500" },
  { label: "Gross profit", value: "$42,700" },
  { label: "Gross margin", value: "54.36%" },
  { label: "Total orders", value: "320" },
]

export const salesLabels = ["May 24", "Jun 3", "Jun 13", "Jun 23"]

/** One point per day across the 30-day window; the axis only labels four of
 * them, which is why the arrays are longer than `salesLabels`. */
export const salesCurrent = [
  22, 25, 24, 31, 38, 33, 36, 44, 41, 49, 55, 58, 54, 57, 63, 61, 66, 64, 68, 65,
  62, 59, 63, 66, 64, 68, 70, 72, 76, 79,
]

export const salesPrevious = [
  18, 19, 21, 20, 24, 23, 26, 28, 27, 30, 33, 32, 36, 38, 37, 41, 44, 43, 47, 50,
  52, 55, 57, 56, 59, 61, 60, 62, 58, 55,
]

export const orderLabels = ["May 24", "Jun 1", "Jun 8", "Jun 15", "Jun 23"]
export const ordersCurrent = [96, 268, 205, 141, 246]
export const ordersPrevious = [178, 213, 122, 168, 183]

export const sessionSeries = [
  120, 145, 138, 176, 205, 232, 218, 264, 301, 288, 330, 372, 356, 390, 368, 344,
  312, 336, 298, 276, 254, 268, 240, 226, 212, 236, 218, 204, 232, 248,
]

export const conversionRows = [
  { label: "Added to cart", sub: "284 sessions", value: "5.86%", delta: "0.1%", up: true },
  { label: "Reached checkout", sub: "196 sessions", value: "4.02%", delta: "0.4%", up: true },
  { label: "Converted", sub: "112 sessions", value: "2.31%", delta: "0.2%", up: false },
]

/* ---- Mobile ------------------------------------------------------------ */

export interface Conversation {
  name: string
  time: string
  preview: string
  status: "online" | "offline"
}

export const conversations: Conversation[] = [
  {
    name: "Michael Thompson",
    time: "5:02 PM",
    preview:
      "The new collaboration between Drake and Future is fire! We should listen to it together soon!",
    status: "offline",
  },
  {
    name: "Emily Davis",
    time: "2:30 PM",
    preview:
      "I just listened to Future's new album, and I can't believe how amazing it is! Did you see the cover?",
    status: "online",
  },
  {
    name: "Sarah Johnson",
    time: "11:15 AM",
    preview: "I found some awesome merchandise from my favorite artist! Can't wait to show you!",
    status: "online",
  },
  {
    name: "David Miller",
    time: "9:07 AM",
    preview: "I heard there's a new artist dropping a single this Friday. Excited to see what it's like!",
    status: "offline",
  },
  {
    name: "John Anderson",
    time: "Yesterday",
    preview: "Did you catch Drake's concert last night? It was insane! I can't wait to hear the new record.",
    status: "online",
  },
  {
    name: "Jessica Brown",
    time: "Yesterday",
    preview: "I just finished the documentary about hip-hop history. You have to check it out!",
    status: "offline",
  },
  {
    name: "James Wilson",
    time: "Yesterday",
    preview: "Looking forward to the music festival next month! It's going to be epic!",
    status: "online",
  },
]

export interface Message {
  from: "them" | "me"
  text: string
  reaction?: string
}

export const thread: Message[] = [
  {
    from: "them",
    text: "The new collaboration between Drake and Future is fire! I can't get enough of it! We should listen to it together soon!",
  },
  { from: "me", text: "Absolutely! I love their vibe together. Which song is your favorite?" },
  { from: "them", text: "I really like the beat on 'Life Is Good.' It's such a banger!", reaction: "😍" },
  {
    from: "me",
    text: "That one's a classic! I've been playing it on repeat. Are you planning to go to the concert next month?",
  },
  { from: "them", text: "For sure! I already got my tickets. Can't wait to see them live!" },
  { from: "me", text: "Nice! Let's make it a group thing. I can invite a few friends too!" },
  { from: "them", text: "Sounds great! The more, the merrier." },
  { from: "them", text: "Looking forward to it!", reaction: "👍" },
]

export const feedPosts = [
  {
    id: "home",
    artist: "Drake",
    caption: "In My Feelings. Dropping 09/20 at midnight.",
    likes: "610K",
    comments: "2,910",
    shares: "324K",
  },
  {
    id: "discover",
    artist: "Future",
    caption: "HNDRXX. 05/15 at midnight. We up now.",
    likes: "423K",
    comments: "4,246",
    shares: "217K",
  },
]
