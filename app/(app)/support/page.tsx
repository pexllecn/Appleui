import { RiCustomerService2Line } from "@remixicon/react"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { CrumbChip, PageHeader } from "@/components/shell/page-header"

export default function SupportPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Support", icon: <RiCustomerService2Line className="size-4" /> },
        ]}
        title="Support"
      />
      <Card>
        <EmptyState
          icon={<RiCustomerService2Line />}
          title="Nothing needs your attention"
          description="Open tickets from your team will appear here. This route exists so every sidebar item resolves."
        />
      </Card>
    </>
  )
}
