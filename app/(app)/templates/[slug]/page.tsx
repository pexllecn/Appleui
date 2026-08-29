import { notFound } from "next/navigation"
import Link from "next/link"
import { RiLayoutGridLine } from "@remixicon/react"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { CrumbChip, PageHeader } from "@/components/shell/page-header"
import { primaryNav } from "@/data/navigation"

/** Nav entries without a template of their own land here rather than 404ing —
 * the sidebar stays honest about what exists. */
const PLACEHOLDERS = primaryNav.filter((item) => !item.built)

export function generateStaticParams() {
  return PLACEHOLDERS.map((item) => ({ slug: item.href.split("/").pop()! }))
}

export default async function TemplatePlaceholder({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = PLACEHOLDERS.find((entry) => entry.href.endsWith(`/${slug}`))
  if (!item) notFound()

  const Icon = item.icon

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Mertcan", icon: <CrumbChip tone="neutral">M</CrumbChip> },
          { label: item.label, icon: <Icon className="size-4" /> },
        ]}
        title={item.label}
      />
      <Card>
        <EmptyState
          icon={<RiLayoutGridLine />}
          title={`${item.label} isn't built yet`}
          description="This route is wired up so the navigation stays honest. The design system it would be built from is complete — start from any of the finished templates."
          action={
            <Link
              href="/templates/dashboard"
              className="bg-accent text-accent-fg focus-visible:ring-ring/45 inline-flex h-9 items-center rounded-xl px-4 text-subheadline font-medium outline-none focus-visible:ring-[3px]"
            >
              Open the dashboard
            </Link>
          }
        />
      </Card>
    </>
  )
}
