# AppleUI

An Apple-flavoured design system for data-dense dashboards, and five templates built on it.

Every colour in the system is derived from Apple's published system palette. Each hue is converted
to OKLCH, snapped to the ramp step that matches its own perceptual lightness — Apple blue lands on
600, Apple yellow on 200 — and the remaining steps are spread from there. The anchor step
reproduces Apple's value exactly.

## What's here

| Route | What it is |
| --- | --- |
| `/components/color` | The whole colour system: system colours, 14 ramps, every semantic token, live |
| `/components` | Every primitive and chart, interactive |
| `/templates/dashboard` | Home — recent hires, monthly target, revenue, contribution heatmap, metric row |
| `/templates/marketing` | KPIs, acquisition funnel, spend gauge, session bar lists, spend-vs-ROAS combo, stacked visitors, campaigns table |
| `/templates/calendar` | Month grid with event chips and an event-detail popover |
| `/templates/profile` | Cover, stat tiles, activity heatmap, agents chart, activity feed |
| `/templates/medical-report` | Patient card, steps, sleep donut, per-day activity rings, alerts, patients table |
| `/screens` | Five reference layouts rebuilt on the system — see [DESIGN-LANGUAGE.md](DESIGN-LANGUAGE.md) |

Nav entries without a template of their own (`Finance`, `Projects`, `HR Team`, `Inbox`) resolve to
a designed empty state rather than a 404, so the sidebar stays honest about what exists.

## Screens

`/screens` recreates five reference designs — a workspace settings window, a business-hours editor,
an appearance pane, a dark analytics dashboard and four iOS screens — using only the system's own
tokens and components. [DESIGN-LANGUAGE.md](DESIGN-LANGUAGE.md) is the close read behind them: how
the staging, structure, type, colour, elevation, controls and charts of those references work, and
what each rule maps to here.

Each one is staged the way the references stage themselves: a single rounded window, or a row of
devices, floating on a flat grey ground. `components/frames/` holds that staging — `ScreenCanvas`,
`WindowFrame`, `PhoneFrame` and the settings nav that three of the windows share.

Appearance is scoped rather than global: `.appearance-light` and `.appearance-dark` re-declare the
semantic layer on any subtree, so a light window and a dark one can sit side by side on the same
page, and a window keeps its own appearance whatever the app around it is set to.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck
npm run build:tokens # regenerate styles/theme.css from the palette
```

## The token system

`styles/theme.css` is generated — edit `scripts/palette.mjs` (the Apple anchors) or
`scripts/build-tokens.mjs` (the ramp maths and semantic layer), then run `npm run build:tokens`.
It is written in four layers:

```css
@theme {                 /* 1 · primitives — ramps, radii, shadows, motion, type */
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
}
```

430 tokens in total. Components only ever reference the semantic layer — `bg-accent`,
`text-fg-secondary`, `border-border` — so switching appearance never touches a component.

### The Apple parts

- **Backgrounds** follow Apple's grouped-background hierarchy, inverted for a light UI: a recessed
  grey container (`bg-subtle`) holds raised white content (`surface`).
- **Labels** are the four translucent ink levels — 100% / 60% / 30% / 18%.
- **Fills** are Apple's four translucent greys, used for tracks, chips and pressed states.
- **Separators** are hairlines at Apple's own opacities, with an opaque variant.
- **Type** is the SF Pro scale — caption2 through large-title — with Apple's negative tracking,
  exposed both as Tailwind text sizes and as `text-style-*` utilities.
- **Materials** are vibrancy: `saturate(180%)` plus a blur, with an opaque fallback.

## Structure

```
app/(app)/        routes, all inside the app shell
components/ui/    primitives, built on react-aria-components
components/charts/ SVG charts — no charting dependency
components/shell/ sidebar, page header, appearance toggle
components/frames/ window, phone and settings-nav staging for /screens
styles/           theme.css (generated), typography.css, globals.css
scripts/          the token generator and its OKLCH colour maths
data/             sample data for the templates
```

## Charts

Written directly in SVG rather than pulled from a charting library, so the visual language — stroke
weights, corner radii, round caps, tooltip chrome — matches the rest of the system exactly. Area
(with stacking, an optional line-only mode and either even or rounded axis ticks), bar (with a
capacity track), grouped bar (period over period), combo (dual axis), funnel, gauge, donut,
activity rings, bar list, heatmap, sparkline. All theme-aware and keyboard-reachable.

## Accessibility

Interactive components are built on `react-aria-components`, so focus management, keyboard
interaction and ARIA come from the library rather than from hand-rolled handlers. The shared focus
ring is defined once in `utils/cx.ts`. Charts expose their data through `aria-label` and per-point
focusable targets. `prefers-reduced-motion` is honoured globally.
