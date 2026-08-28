import type { Metadata, Viewport } from "next"
import { appearanceScript } from "@/components/shell/theme-toggle"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: "AppleUI — a dashboard design system",
    template: "%s · AppleUI",
  },
  description:
    "An Apple-flavoured design system for data-dense dashboards: 430 tokens, react-aria components, and SVG chart cards.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set the appearance before first paint to avoid a light flash. */}
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
