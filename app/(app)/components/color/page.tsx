"use client"

import { RiPaletteLine } from "@remixicon/react"
import palette from "@/data/palette.json"
import { Card, CardBody, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Swatch, TokenRow } from "@/components/color/swatch"
import { CrumbChip, PageHeader } from "@/components/shell/page-header"
import { cx } from "@/utils/cx"

const ramps = palette.ramps as Record<string, Record<string, string>>
const anchors = palette.anchorSteps as Record<string, number>
const system = palette.system as Record<string, { light: string; dark: string }>
const gray = palette.gray as Record<string, string>
const steps = palette.steps as number[]

const BACKGROUNDS = [
  { token: "bg", swatch: "bg-bg", description: "The window itself" },
  { token: "bg-subtle", swatch: "bg-bg-subtle", description: "Recessed group container" },
  { token: "bg-muted", swatch: "bg-bg-muted", description: "One level deeper" },
  { token: "surface", swatch: "bg-surface", description: "Raised content" },
  { token: "surface-raised", swatch: "bg-surface-raised", description: "Popovers, sheets" },
  { token: "surface-sunken", swatch: "bg-surface-sunken", description: "Wells and tracks" },
  { token: "material", swatch: "material", description: "Vibrancy blur" },
]

const LABELS = [
  { token: "fg", swatch: "bg-fg", description: "Primary label" },
  { token: "fg-secondary", swatch: "bg-fg-secondary", description: "Secondary label · 60%" },
  { token: "fg-tertiary", swatch: "bg-fg-tertiary", description: "Tertiary label · 30%" },
  { token: "fg-quaternary", swatch: "bg-fg-quaternary", description: "Quaternary label · 18%" },
  { token: "fg-placeholder", swatch: "bg-fg-placeholder", description: "Placeholder text" },
]

const SEPARATORS = [
  { token: "border", swatch: "bg-border", description: "Default hairline" },
  { token: "border-subtle", swatch: "bg-border-subtle", description: "Inside a group" },
  { token: "border-strong", swatch: "bg-border-strong", description: "Control outline" },
  { token: "separator", swatch: "bg-separator", description: "Row divider" },
  { token: "separator-opaque", swatch: "bg-separator-opaque", description: "Opaque divider" },
]

const FILLS = [
  { token: "fill", swatch: "bg-fill", description: "Thick fill · 20%" },
  { token: "fill-secondary", swatch: "bg-fill-secondary", description: "16%" },
  { token: "fill-tertiary", swatch: "bg-fill-tertiary", description: "12%" },
  { token: "fill-quaternary", swatch: "bg-fill-quaternary", description: "8%" },
]

const STATUS = [
  { token: "accent", swatch: "bg-accent", description: "Primary action" },
  { token: "accent-subtle", swatch: "bg-accent-subtle", description: "Tinted background" },
  { token: "success", swatch: "bg-success", description: "Positive" },
  { token: "warning", swatch: "bg-warning", description: "Needs attention" },
  { token: "danger", swatch: "bg-danger", description: "Destructive" },
  { token: "info", swatch: "bg-info", description: "Informational" },
  { token: "ring", swatch: "bg-ring", description: "Focus ring" },
]

const CHART_TOKENS = Array.from({ length: 8 }, (_, i) => ({
  token: `chart-${i + 1}`,
  swatch: `bg-chart-${i + 1}`,
  description: `Series ${i + 1}`,
}))

export default function ColorPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Board team", icon: <CrumbChip>B</CrumbChip> },
          { label: "Components", icon: <CrumbChip tone="neutral">C</CrumbChip> },
          { label: "Color", icon: <RiPaletteLine className="size-4" /> },
        ]}
        title="Color"
      />

      <p className="text-style-body text-fg-secondary mb-6 max-w-2xl">
        Every colour here is generated from Apple&rsquo;s system palette. Each hue is converted to
        OKLCH, snapped to the ramp step that matches its own lightness — Apple blue is a 600, Apple
        yellow is a 200 — and the remaining steps are spread from there. The anchor step reproduces
        Apple&rsquo;s published value exactly; it is ringed below.
      </p>

      {/* Apple system colours */}
      <Card className="mb-4">
        <CardHeader
          title="System colours"
          description="Apple's published values, light and dark. These are what the semantic tokens resolve to."
        />
        <CardBody>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {Object.entries(system).map(([name, value]) => (
              <div key={name} className="bg-surface border-border rounded-xl border p-3">
                <div className="flex gap-1.5">
                  <span
                    className="border-border-subtle h-12 flex-1 rounded-lg border"
                    style={{ background: value.light }}
                    title={`Light ${value.light}`}
                  />
                  <span
                    className="border-border-subtle h-12 flex-1 rounded-lg border"
                    style={{ background: value.dark }}
                    title={`Dark ${value.dark}`}
                  />
                </div>
                <p className="text-style-subheadline text-fg mt-2.5 font-medium capitalize">
                  {name}
                </p>
                <p className="text-style-caption2 text-fg-tertiary font-mono">
                  {value.light} · {value.dark}
                </p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Ramps */}
      <Card className="mb-4">
        <CardHeader
          title="Ramps"
          description="Eleven steps per hue. The ringed swatch is the Apple anchor."
          action={
            <Badge tone="accent">
              {Object.keys(ramps).length * steps.length + Object.keys(gray).length} swatches
            </Badge>
          }
        />
        <CardBody className="flex flex-col gap-6">
          <div>
            <div className="mb-2 flex items-baseline gap-2">
              <h3 className="text-style-headline text-fg">Gray</h3>
              <span className="text-style-caption1 text-fg-secondary">
                Apple&rsquo;s six system greys, light and dark, as one continuous ramp
              </span>
            </div>
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${Object.keys(gray).length}, minmax(0, 1fr))` }}
            >
              {Object.entries(gray).map(([step, value]) => (
                <Swatch key={step} name={`gray-${step}`} step={step} value={value} />
              ))}
            </div>
          </div>

          {Object.entries(ramps).map(([hue, scale]) => (
            <div key={hue}>
              <div className="mb-2 flex items-baseline gap-2">
                <h3 className="text-style-headline text-fg capitalize">{hue}</h3>
                <span className="text-style-caption1 text-fg-secondary">
                  anchored at {anchors[hue]}
                </span>
              </div>
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
              >
                {steps.map((step) => (
                  <Swatch
                    key={step}
                    name={`${hue}-${step}`}
                    step={step}
                    value={scale[String(step)]}
                    isAnchor={anchors[hue] === step}
                  />
                ))}
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Semantic tokens */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TokenCard
          title="Backgrounds"
          description="Apple's grouped-background hierarchy, inverted for a light UI"
          tokens={BACKGROUNDS}
        />
        <TokenCard
          title="Labels"
          description="Four levels of text emphasis, as translucent inks"
          tokens={LABELS}
        />
        <TokenCard title="Separators" description="Hairlines and control outlines" tokens={SEPARATORS} />
        <TokenCard
          title="Fills"
          description="Translucent greys for tracks, chips and pressed states"
          tokens={FILLS}
        />
        <TokenCard title="Accent and status" description="Action, success, warning, danger" tokens={STATUS} />
        <TokenCard
          title="Chart palette"
          description="Eight series colours, ordered for contrast between neighbours"
          tokens={CHART_TOKENS}
        />
      </div>

      {/* Usage */}
      <Card className="mt-4">
        <CardHeader
          title="How the layers fit together"
          description="theme.css is written by scripts/build-tokens.mjs in four layers"
        />
        <CardBody>
          <div className="bg-surface border-border overflow-x-auto rounded-xl border p-4">
            <pre className="text-style-caption1 text-fg-secondary font-mono">
{`@theme {                 /* 1 · primitives — ramps, radii, shadows, motion, type */
  --color-blue-600: #007AFF;
}

@theme inline {          /* 2 · semantic names, left unresolved so they can swap */
  --color-accent: var(--ui-accent);
}

:root {                  /* 3 · light appearance */
  --ui-accent: #007AFF;
}

.dark {                  /* 4 · dark appearance */
  --ui-accent: #0A84FF;
}`}
            </pre>
          </div>
          <p className="text-style-footnote text-fg-secondary mt-3">
            Components only ever reference the semantic layer — <code className="font-mono">bg-accent</code>,{" "}
            <code className="font-mono">text-fg-secondary</code>,{" "}
            <code className="font-mono">border-border</code> — so switching appearance never touches
            a component.
          </p>
        </CardBody>
      </Card>
    </>
  )
}

function TokenCard({
  title,
  description,
  tokens,
}: {
  title: string
  description: string
  tokens: { token: string; swatch: string; description: string }[]
}) {
  return (
    <Card>
      <CardHeader title={title} description={description} />
      <CardBody>
        <div className={cx("bg-surface border-border rounded-xl border p-1.5")}>
          {tokens.map((entry) => (
            <TokenRow
              key={entry.token}
              token={entry.token}
              description={entry.description}
              swatchClass={entry.swatch}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
