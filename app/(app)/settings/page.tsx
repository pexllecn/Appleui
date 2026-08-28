"use client"

import { RiSettings3Line } from "@remixicon/react"
import { Card, CardBody, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { TextField } from "@/components/ui/field"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/misc"
import { CrumbChip, PageHeader } from "@/components/shell/page-header"

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Settings", icon: <RiSettings3Line className="size-4" /> },
        ]}
        title="Settings"
      />

      <div className="mx-auto max-w-[720px]">
        <Card>
          <CardHeader title="Profile" description="How you appear across the workspace" />
          <CardBody className="flex flex-col gap-4">
            <TextField label="Display name" defaultValue="Mertcan Esmergül" />
            <TextField label="Email" defaultValue="hi@boardui.com" type="email" />
            <Select
              label="Time zone"
              options={[
                { id: "ams", label: "GMT+1 · Amsterdam" },
                { id: "utc", label: "GMT+0 · UTC" },
                { id: "pst", label: "GMT−8 · Los Angeles" },
              ]}
              defaultSelectedKey="ams"
            />
          </CardBody>
        </Card>

        <Card className="mt-4">
          <CardHeader title="Notifications" description="What reaches you, and where" />
          <CardBody className="flex flex-col gap-4">
            <Switch defaultSelected>
              <span className="flex flex-col">
                <span className="text-style-subheadline text-fg font-medium">Weekly digest</span>
                <span className="text-style-footnote text-fg-secondary">
                  A Monday summary of every board you follow
                </span>
              </span>
            </Switch>
            <Separator />
            <Switch>
              <span className="flex flex-col">
                <span className="text-style-subheadline text-fg font-medium">Mentions</span>
                <span className="text-style-footnote text-fg-secondary">
                  Push a notification when someone @-mentions you
                </span>
              </span>
            </Switch>
            <Separator />
            <Switch defaultSelected>
              <span className="flex flex-col">
                <span className="text-style-subheadline text-fg font-medium">Threshold alerts</span>
                <span className="text-style-footnote text-fg-secondary">
                  Tell me when a metric moves more than 10% week over week
                </span>
              </span>
            </Switch>
          </CardBody>
        </Card>

        <div className="mt-4 flex justify-end gap-2.5">
          <Button>Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </div>
      </div>
    </>
  )
}
