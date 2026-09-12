# The design language, read closely

Five reference screens — a workspace settings window, four iOS screens, a business-hours editor,
an appearance pane and a dark analytics dashboard — come from different products, but they are
the same design language. This is what that language actually is, rule by rule, and how each rule
lands in this repo's tokens. Every screen under [`/screens`](app/(app)/screens) is built from
these rules and nothing else: no new colours, no one-off type sizes, no component that exists only
on one page.

---

## 1 · Staging: the product is an object

None of the references show a full-bleed app. Every one shows a **single rounded window floating on
a flat grey ground**, inset on all four sides, with a long soft shadow and a hairline. The mobile
screen is the same idea with a different object — four devices on the same ground.

That is a deliberate claim: the interface is a thing you are looking at, not a surface you are
inside. Three consequences follow, and they are load-bearing:

- **The ground is never lighter than the window.** Light: ground `bg-bg-muted` (#E5E5EA) under a
  window of `bg-bg-subtle` (#F2F2F7) or `surface` (#FFF). The window reads as raised before the
  shadow does any work. A ground and a window at the same value is the most common way to lose the
  whole effect.
- **A dark app is still staged on a light ground.** The analytics screen is near-black, but its
  ground is the page's own grey. Appearance belongs to the window, not to the room it sits in —
  which is why `ScreenCanvas` takes no appearance prop at all and `WindowFrame` does.
- **The corner radius is big enough to see.** 26px on the window, so the curve is visible against
  the nav column inside it. At 8px the object reads as a `<div>`; at 26px it reads as a window.

## 2 · Structure: chrome, then content, and a visible seam between them

Every desktop reference is 2–3 vertical bands, left to right, each narrower in purpose than the one
before:

| Band | Width | Holds |
| --- | --- | --- |
| Icon rail | 64px | App-level switching. Glyphs only, no labels. |
| Nav column | 250–280px | Section list, grouped, with 12px group captions. |
| Content pane | the rest | One column of content, ~48px side padding, max ~900px measure. |

The seam between chrome and content is drawn in exactly one of two ways, and **which one is chosen
is decided by the background, not by taste**:

- **Inset card.** The content pane is a white card with its own 20px radius, floated 12px off three
  window edges. The nav column sits on the window's grey. Used by the workspace and appearance
  screens.
- **Hairline.** Both sides are white, so a 1px separator does the work and nothing floats. Used by
  the business-hours screen and by the dark dashboard.

This is also what decides the selected-row treatment, and the rule is mechanical:

- Nav on **grey** → selected row is a **raised white chip** (`surface`, hairline, `shadow-xs`). It
  has grey to lift off.
- Nav on **white** → selected row is a **flat grey wash** (`fill-quaternary`). A raised chip on
  white would have nothing to lift from, so it would just look like a rectangle.

`SelectionStyle` in [`settings-nav.tsx`](components/frames/settings-nav.tsx) is exactly these two
cases, and the pair is why one component covers three different-looking windows.

## 3 · Type: four sizes do all the work

Across five screens there are essentially four roles, and the references are strict about them:

| Role | Size | Where |
| --- | --- | --- |
| Page title | 34px bold, −0.03em | One per pane. "Workspace", "Business hours", "Hey, Mikhail". |
| Section title | 20px semibold | "Explore features", "Theme", "Custom brand colors". |
| Body / row label | 15px regular | Nav rows, table cells, input values, list titles. |
| Secondary / caption | 13px, secondary ink | Descriptions, column headers, timestamps, axis labels. |

Mapped onto this system: `text-style-large-title`, `text-style-title3`, `text-subheadline`,
`text-style-footnote` / `text-caption1`. Nothing in between gets invented. The page title is the
only thing on a pane set in bold, and hierarchy below it is carried by **ink level rather than
size** — one 15px line in `fg` above a 13px line in `fg-secondary` reads as a heading and its
description without either being enlarged.

Two details that are easy to miss and obvious once broken:

- **Numbers are tabular everywhere** — KPIs, times, message counts, axis labels. A time column
  where "08:00" and "14:30" don't align is the fastest way to make a settings table look amateur.
- **Emphasis inside a sentence is weight, not colour.** "your workspace is in the **United States**
  region" — the emphasis is `font-semibold` in the same ink, never the accent. The accent is
  reserved for things you can click.

## 4 · Colour: a monochrome UI with one accent and honest brand marks

Ink is greyscale — `fg` / `fg-secondary` / `fg-tertiary`, Apple's translucent label levels.
Surfaces are white, grey, or near-black. Against that, colour is rationed to four jobs:

1. **Accent** — the current selection ring, links ("Learn more ›"), the sent message bubble,
   checked boxes. Apple blue (`#007AFF` light / `#0A84FF` dark) in this system.
2. **Status** — success green and danger red, only on deltas, unread badges and destructive
   controls (the red × that removes an interval).
3. **Data** — the dashboard's indigo pair. Two tones of one hue, not two hues: the comparison line
   is the *same series last period*, and giving it a different colour would imply a different thing.
4. **Brand** — GitHub, GitLab, Slack, Figma in their own colours. This is the one place the token
   layer is deliberately bypassed; a re-tinted Slack mark is a wrong Slack mark.

The strongest colour move in the whole set is the **neutral primary button** — the black "Update"
pill, black "Get the Chrome extension". When the interface is already monochrome, black *is* the
loudest possible fill, and it leaves blue free to mean "interactive" rather than "important".

## 5 · Elevation: shadows separate, hairlines divide

- **Shadow** is used once per composition, on the window itself (`shadow-xl`). Cards inside the
  window get a **hairline and no shadow**. Stacking shadows inside a shadowed window is what makes
  a layout look muddy at a glance without it being obvious why.
- **Dividers do the work shadows would.** Rows in the business-hours table, entries in a
  conversion list, and the four cells of the KPI strip are separated by 1px separators, never by
  gaps plus borders.
- **The KPI strip is one bordered container split by vertical hairlines**, not four cards. Four
  cards would say "four things"; one strip says "one summary, four numbers". The dark dashboard
  does this, and it's the single most copied-wrong detail in dashboards.

## 6 · Controls: one shape, one height, repeated

Every control in the references is a rounded rectangle with a hairline, 36–44px tall, 10–12px
radius, with an optional leading glyph and an optional trailing chevron:

- Filter pills (`Last 30 days ▾`, `Compare: Previous period ▾`) — same shape as the buttons beside
  them, which is what makes a toolbar read as a set rather than a pile.
- Text and time inputs — same border, same radius, sized so the *column* is legible, not so the
  value just fits.
- Buttons — secondary is white + hairline; primary is filled. Both `shadow-xs` at most.

The affordances that carry state are small and consistent: a **checkbox** is a 18px rounded square
that fills with the accent; a **radio** is a ring that thickens rather than gaining a dot; a
**selection ring** is 2px of accent with a 2px offset gap — never a border swap, which would move
the card by a pixel and make a row of them twitch as you click along it.

Icons are line glyphs at 16–20px, `fg-secondary` when inert, `fg` when active — with one exception
worth naming: the **iOS tab bar switches from line to filled** for the active tab instead of
changing colour. At 24px on a phone, weight reads faster than hue.

## 7 · Data display: charts are chrome, not decoration

The dashboard's charts follow the same rules as everything else, which is why they don't look
bolted on:

- **Lines, not filled areas, when two periods are compared.** Two washes of colour under two lines
  in the same hue is unreadable; this is why `AreaChart` grew a `fill={false}` mode.
- **Round axis numbers beat precise ones.** `$0 / $40k / $80k`, not `$0 / $26k / $53k` — hence the
  `axis="nice"` option. An axis is a reading aid, not a report of the maximum.
- **Bars are paired, thin, and rounded at the top only.** The pairing carries the comparison, so
  the two tones can be close.
- **Grid lines are the faintest thing on the card** (`chart-grid`, ~9% ink), below the axis labels,
  which are themselves `fg-tertiary`.
- **The number lives in the card header, above the chart.** "390" is the answer; the chart is the
  evidence.

## 8 · Mobile: the same language, different physics

The four iOS screens are not a separate design system — they are these tokens at phone scale, plus
three platform rules that don't apply on desktop:

- **Safe areas are real.** 54px of status bar, 34px of home indicator, and content never touches
  either. The large title sits directly under the status bar with no border below it.
- **Translucency replaces borders.** The feed overlay is one blurred slab pinned *inside* the
  artwork (`bg-black/45` + `backdrop-blur-xl`) holding byline, caption and counts together — not a
  bar below the image. This is the same "material" idea as the desktop popovers, used structurally.
- **Bubbles are 20px radius, tail-less, and aligned by author** — accent for sent, `fill-tertiary`
  for received. Alignment already says who is speaking, so the tail is decoration the redraw can
  drop.

The dark Discover screen and the light Home screen are the *same component tree*. Only the tokens
change between them, which is the practical test of whether an appearance layer is real.

## 9 · What this cost the system

Recreating the references honestly required five changes to the system rather than five pages of
special-case CSS — that ratio is the point:

| Change | Why |
| --- | --- |
| `.appearance-light` / `.appearance-dark` scoped token blocks, emitted by `scripts/build-tokens.mjs` | A page has to show a light window and a dark one side by side. |
| `dark:` variant re-scoped in `globals.css` | So a light window stays light inside a dark app. |
| `AreaChart` `fill`, `showLabels`, `axis` props | Line-only comparison, four dates under thirty points, round axis numbers. |
| `GroupedBarChart` | Period-over-period bars, laid out in CSS so the corner radius survives stretching. |
| `cx()` teaching tailwind-merge the named text scale | `text-footnote` was being read as a *colour* and silently deleting the colour class beside it. This was a live bug in the existing charts too. |

Everything else — every surface, ink level, radius, shadow, control height and chart colour on
those five screens — came from tokens that already existed.
