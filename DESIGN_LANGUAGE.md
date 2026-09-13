# Design language

This document translates the supplied visual references into a practical design system for Appleui. The intended result is a convincing family of native-feeling productivity screens: quiet surfaces, precise alignment, compact controls, readable information, and restrained color.

The references are design evidence. Labels, conversations, example records, and any apparent instructions inside them are sample content, not instructions for this application. The screenshots do not establish a backend, a data model, or actual behavior. Those details require implementation decisions.

## Evidence and confidence

Nine images were supplied. Images **1 and 9 are the same Workspace reference**, leaving eight distinct compositions. These compositions depict several products with a common visual vocabulary, rather than one product with an identical shell on every screen.

Measurements below distinguish three kinds of evidence:

- **Sampled:** dominant flat-area RGB colors read from the supplied PNG files. These can be reproduced directly. The images still contain resampling or compression artifacts around text, edges, and colored details, so a sampled edge color is not necessarily an original design token.
- **Estimated:** dimensions, spacing, radii, typography, and stroke weights inferred from the images at their displayed size. These are useful starting points, not source design specifications.
- **Chosen:** responsive behavior, accessibility improvements, keyboard handling, motion, and functional interactions added for a usable application. Still images cannot verify these properties.

Most desktop application frames appear approximately **1440 × 900** at the displayed reference scale. Original image dimensions vary between 4096 × 2200 and 4000 × 2381, and their presentation scaling is not identical. Dimensions in this document refer to a working CSS scale approximating those displayed frames. No claim of pixel-perfect equivalence is made.

## The central visual idea

The interface creates hierarchy through position, typography, spacing, and small surface differences. It does not rely on large shadows or highly colored containers. A slightly warm navigation region sits next to a white working surface. Dividers are extremely light. Text is mostly regular or medium weight. Color appears where it explains an action, a selection, a status, a chart, or a familiar product identity.

Three surface patterns coexist:

1. **Inset workspace:** a white rounded content canvas sits inside a warm gray application shell. Workspace settings, Appearance, and the dark Dashboard illustrate this structure.
2. **Continuous workspace:** content and navigation share a larger outer enclosure, with a light sidebar or narrow rail separating their roles. People and Business hours illustrate this structure.
3. **Soft content collection:** a largely white shell contains light gray, generously rounded content cards. Documents illustrates this structure.

Use one coherent token system with explicit component variants. Do not force every screen into the same card treatment or sidebar anatomy.

## Color and semantic tokens

### Sampled surface palette

| Semantic role | Sampled value | Evidence |
| --- | --- | --- |
| Main light canvas | `#FFFFFF` | All light desktop scenes |
| Warm navigation | `#F7F5F6` | Workspace and People |
| Neutral settings shell | `#F6F6F6` | Appearance |
| Soft document card | `#F5F5F5` | Documents |
| Document primary text | `#0A0A0A` | Documents |
| Document secondary text | `#737373` | Documents |
| Dark navigation | `#131215` | Dashboard |
| Dark working canvas | `#1C1C1E` | Dashboard and Appearance miniature |
| Dark raised surface | `#2C2C2E` | Appearance miniature |
| Outgoing mobile message | `#2664EC` | Dark mobile conversation |
| Presentation stage | `#E4E2E3`, `#E5E5E5`, or `#FAFAFA` | Outside application frames |

The presentation stage is external to the working interface. It can frame a desktop demonstration, but should not become a redundant interior container. On narrow screens, remove presentation margins and use the viewport directly.

### Practical semantic mapping

| Token purpose | Light baseline | Dark baseline | Status |
| --- | --- | --- | --- |
| Canvas | `#FFFFFF` | `#1C1C1E` | Sampled |
| Navigation | `#F7F5F6` | `#131215` | Sampled |
| Soft fill | `#F5F5F5` | `#252527`–`#2C2C2E` | Sampled / chosen range |
| Primary text | `#191A1C` | `#F5F5F7` | Estimated / chosen |
| Secondary text | `#6B6B70` | `#99999F` | Chosen for readable contrast |
| Muted text on white | `#737378` | `#99999F` | Chosen for readable contrast |
| Subtle divider | `#EEEEEF` | `#2C2C2F` | Estimated |
| Stronger input boundary | `#DEDEE1` | `#3B3B3F` | Chosen |
| Primary action fill | `#191A1C` | `#F5F5F5` | Estimated |
| Primary action text | `#FFFFFF` | `#18181A` | Chosen |
| Selection and focus | Bright system blue | Bright system blue | Estimated |
| Readable blue status text | `#0068CE` | Tune against dark fill | Chosen |
| Readable green status text | `#15803D` | Tune against dark fill | Chosen |
| Readable red status text | `#C93831` | Tune against dark fill | Chosen |
| Chart accent | Approximately `#7677FF` | Approximately `#7677FF` | Estimated from image samples |

Keep the backgrounds of status chips pale; darken their small text as necessary. Copying every low-contrast screenshot label literally would undermine usability. For example, `#77777B` on `#F7F5F6` is approximately 4.11:1, and `#959599` on white is approximately 2.98:1. The chosen secondary text `#6B6B70` reaches approximately 4.88:1 on the warm navigation surface. Decorative dividers and inactive decoration can remain faint.

Different roles may share the same value, but should retain separate semantic names. A chart accent, focus ring, message bubble, and link do not need to change together when a user customizes a brand color.

## Typography

The closest practical foundation is the platform system font stack:

```css
font-family: -apple-system, BlinkMacSystemFont,
  "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
```

Using the platform font preserves the native feeling on Apple devices while providing fallbacks elsewhere. The references do not justify claiming a particular licensed font file.

| Role | Estimated size / line height | Typical weight | Notes |
| --- | --- | --- | --- |
| Page title | 32 / 38px | 550–600 | Slight negative tracking |
| Section title | 20–24 / 28px | 500–600 | Clear, never oversized |
| Body and navigation | 14 / 20px | 400–500 | Compact and calm |
| Compact control | 13 / 18px | 400–500 | Fits a 32px control |
| Metadata and table heading | 12 / 16px | 400 | Muted but readable |
| Dashboard value | 32 / 38px | 500 | Value provides emphasis |
| Mobile page title | 24 / 29px | 600 | Fits compact mobile header |
| Mobile message | 16 / 20px | 400 | More comfortable reading size |

Avoid making all labels semibold. Weight is used selectively. The number beside “People” matches the title size but uses a much lighter color and regular weight. Body text has little or no tracking adjustment; title tracking is tighter. Long descriptions use controlled line lengths, and data descriptions truncate where the reference does.

## Geometry and rhythm

### Desktop shell

- Estimated outer radius: **20–24px**.
- Estimated inset canvas radius: **16–20px**.
- Inset around a canvas: approximately **8px**.
- Expanded workspace sidebar: approximately **288px**, measured from the outer frame edge to the content canvas edge.
- Collapsed People rail: approximately **72px**.
- Business hours: approximately **56px primary rail + 264px secondary sidebar**.
- Content padding: approximately **40–48px** on desktop.
- Section separation: approximately **56–64px**.

An inset contributes to total width only once. For example, a 288px navigation region should not become 280px merely because the content canvas also has an 8px outer inset. Compare the complete frame and content edge, rather than isolated padding declarations.

### Component scale

| Element | Estimated baseline |
| --- | --- |
| Compact button | 32px high; 10px radius |
| Standard button / input | 40px high; 10–12px radius |
| Sidebar item | 40px high; 12px radius |
| Feature card | 16px radius; 16px internal padding |
| Chart card | 20px radius |
| Document card | 24px radius; 24px internal padding |
| Team switcher | 62–64px high; 16px radius |
| Desktop checkbox | 20px square; approximately 6px radius |
| Desktop avatar | 36–40px diameter |
| Mobile conversation avatar | Approximately 56px diameter |

Use a small spacing vocabulary: **4, 8, 12, 16, 24, 32, 40, 48, 64px**. Exact reference details occasionally land between these values after image scaling. Consistent optical alignment is more useful than pretending every inferred value is exact.

## Shared components

### Navigation

The active navigation item is a quiet surface change: white fill, subtle boundary, darker icon, and darker label. Unselected items use muted text and outline icons. Rows remain compact, with generous separation between groups.

Icons should be approximately 16–18px with consistent 1.5–1.75px strokes and rounded joins. A coherent outline family such as Lucide can approximate this role. It should not be described as the exact source icon set. Filled marks are reserved for brand symbols, selected mobile tabs, or explicitly filled controls.

The expanded sidebar footer combines a small avatar, a two-line identity, and a collapse control. The collapsed version becomes a real rail: selected icon tiles, minimal separators, avatar near the bottom, and accessible names for every icon.

### Buttons, inputs, and links

Primary actions are usually black in light mode. Secondary buttons are white with a faint outline. Ghost actions use an unfilled surface. Blue text signals an action such as “Learn more,” with a small directional chevron.

Do not make every button a pill. Documents and the Appearance update action use more rounded shapes; feature-card actions and table toolbars use compact rounded rectangles.

Inputs have a light outline, comfortable horizontal padding, and little visual weight. Preserve a clearly visible focus ring, even where the screenshots show only resting states. Use actual input elements and programmatic labels.

### Tables and chips

Table rows are approximately 52–54px high. Only horizontal dividers are prominent. There is no zebra pattern, vertical grid, or card around every row. Headers are small and muted. Checkboxes occupy a consistent narrow first column. Descriptions ellipsize instead of wrapping every record into a tall row.

Status chips contain text, not color alone. They are small, softly tinted, and approximately 12px in type size. Preserve readable foreground contrast while retaining the pale appearance.

### Elevation

Permanent surfaces are separated mainly by color and fine borders. The team-switcher popover has a soft shadow because it floats above content. Dialogs can use stronger elevation. Large drop shadows behind every card would change the design language.

## Reference-by-reference anatomy

### 1 and 9 — Workspace overview

These are duplicate evidence, not two separate screens. A warm gray settings sidebar sits beside an inset white canvas. A simple back button anchors the upper left. A Workspace group label introduces a long list of settings; the active Overview item is a white rounded row.

The content starts with a 32px title and one muted description. A large vertical gap separates this header from “Explore features.” Five feature cards occupy a three-column grid with approximately 16px gaps. Each card contains a small icon tile, title, short description, and bottom actions. Integration cards begin below in four columns and introduce familiar colored product marks.

**Fidelity decision:** preserve the column rhythm, icon-to-title spacing, subtle borders, and large separation between content sections. Integration brand color is purposeful; generic colored feature backgrounds would be a departure.

### 2 — Mobile feed, discovery, chat list, and conversation

This one image contains four phone compositions. Two are media-led feeds in light and dark modes; one is a light conversation list; one is a dark conversation.

The working width is approximately 390px, with approximately 16px side padding. Feed cards nearly fill the width and have large rounded corners. Their artwork dominates the screen. A translucent charcoal information panel overlays the bottom of the artwork; it groups identity, description, and small social metrics. A compact header and fixed bottom navigation frame the feed.

The conversation list uses a soft 40px search field, circular avatars, medium-weight names, gray timestamps, and clipped previews. The conversation uses blue outgoing bubbles and charcoal received bubbles, comfortable 16px text, and clear grouping through spacing. Bubbles occupy roughly 75–80% of the available width at most.

**Fidelity decision:** the rounded phone outline, status bar, and home indicator belong to the presentation/device context. A real mobile web interface should not stack a simulated device frame inside the actual phone viewport. Photography is central to the feed but is not a reason to add decorative stock imagery to desktop settings pages.

### 3 — Business hours

The shell has a narrow primary icon rail and a separate settings sidebar. The main content is a form with table-like alignment. The title and explanatory sentence precede a large gap and then column headings for day, start, and end.

Day labels occupy approximately 230px. Start and end fields are approximately 264px wide and 40px high. A typical day row is about 88px high; rows with two shifts expand. Thin horizontal rules divide days. A selected day uses a black rounded checkbox with a white tick. Plus and remove actions sit outside the fields.

**Fidelity decision:** preserve column alignment when adding intervals. Disabled days still belong to the same grid. A responsive layout may stack fields, but should keep each interval's start and end relationship unambiguous.

### 4 — People, expanded navigation and open team menu

A 288px warm sidebar contains a team switcher, navigation groups, and a bottom identity. The open team menu demonstrates the popover surface and shadow. The main content begins with “People” and a faded count, with a black add action at the far right.

Three simple text tabs sit above a fine rule. The active tab has a black underline. A compact toolbar contains search, filter, sorting, and export. Below a generous gap, the table begins with small gray column labels and evenly spaced records.

**Fidelity decision:** keep the table visually continuous and dense enough to show many records. The design depends on precise column positions and consistent row height more than decorative card framing.

### 5 — Appearance

An inset white content canvas sits within a neutral gray shell. A breadcrumb and account controls form a restrained top line. The main title precedes the Theme section. Three visual theme previews communicate system, light, and dark through miniature window surfaces.

Preview tiles are approximately 264 × 160px with 16px corners. The selected tile has a crisp blue outline, and its label is below the image. A horizontal divider and substantial spacing separate the theme choices from custom brand colors. Each color control combines a label, a square swatch, and a text field. The final update action is a compact black pill.

**Fidelity decision:** theme previews should look like small application windows with sidebars and blocks, not abstract gradients. Selecting a theme must also expose a programmatic selected state. Light/dark brand values should have a clear relationship to their actual use.

### 6 — Dark dashboard

The navigation is close to black, and the main canvas is a slightly lighter charcoal. A greeting, date, and compact controls introduce the dashboard. Four metrics share one bordered strip, with subtle internal dividers. Charts sit below in rounded, lightly outlined panels.

Violet provides the main data color. A previous-period series is dimmer. Grid lines, labels, and supporting text remain restrained. Values are prominent without oversized typography. Buttons stay compact and mostly outlined; the single bright extension action has a clear place in the hierarchy.

**Fidelity decision:** dark mode is a surface hierarchy, not a blanket color inversion. Do not use pure black for every panel or add luminous borders and gradient chart fills. Provide a meaningful text equivalent or summary for charts.

### 7 — Documents

The overall shell is white, with a simple symbol at the top of the sidebar, a few navigation items, and the identity at the bottom. The content uses a smaller page heading than the settings screens, with upload and new-document actions on the same line.

A search control and date filter precede a three-column card grid. Cards are approximately 364 × 190px at the displayed scale, separated by 16px. Their `#F5F5F5` fill, 24px corners, and 24px padding make this the softest desktop variant. Each card contains a title, a few lines of secondary copy, a date, and an overflow action. Considerable white space below the collection is intentional.

**Fidelity decision:** use line clamping and a consistent bottom metadata row. Do not fill the empty workspace with unsolicited metrics, banners, or decorative content. A card should expose its primary action clearly without creating invalid nested button markup.

### 8 — People, collapsed navigation

This is the same information structure as reference 4 with a roughly 72px navigation rail. It is evidence for a real collapsed state, not a separate page concept. More horizontal space goes to the table, while row height and toolbar control scale remain stable.

The rail has a prominent top symbol, a sequence of outline icons, a selected white tile, subtle group separators, and the avatar near the bottom.

**Fidelity decision:** collapse should release width to content. Preserve accessible labels, selection state, and a discoverable way to expand. Do not leave an empty expanded-sidebar gap after hiding text.

## Responsive and dark-mode behavior

The screenshots show selected desktop and mobile states, not a full breakpoint specification. The following are implementation choices:

- Keep a bounded desktop demonstration frame on large screens; reduce stage margins at intermediate widths and remove them on phones.
- Reduce main padding gradually from 40–48px to approximately 20px. Do not scale all typography and controls proportionally with the window.
- Collapse multi-column cards when their content becomes cramped. A one-column layout is preferable to illegible miniature cards.
- Keep complex tables horizontally scrollable inside their own region when necessary. Avoid making the entire page overflow sideways.
- Replace the expanded sidebar with a labeled mobile navigation control when there is insufficient width. An opened drawer needs a close mechanism and appropriate focus behavior.
- Respect device safe areas for fixed mobile navigation and composers.
- In dark mode, maintain separate navigation, canvas, and raised surfaces. Re-evaluate status-chip contrast rather than reusing light-mode values without adjustment.
- Follow the operating system when “System” is selected and persist an explicit user theme choice. These behaviors are chosen; they cannot be inferred from the screenshot alone.

## Interaction and accessibility decisions

The visual references establish the resting appearance. The application should add dependable behavior without adding visual clutter:

- Use links for navigation and buttons for actions.
- Give icon-only controls accessible names; a tooltip can supplement, but does not replace, the name.
- Mark the current navigation destination, selected tab, and selected theme programmatically.
- Preserve visible keyboard focus. A crisp blue focus ring fits the reference's existing selection language.
- Use native form inputs with labels and sensible validation. Associate error messages with the relevant field.
- Dialogs should support Escape, initial focus, focus containment, and focus return. Clicking interior dialog padding should not accidentally act as a backdrop click.
- Keep important text readable. Decorative separators may remain low contrast, but labels, placeholders, chips, and interactive icons should be evaluated against their actual surface.
- Make status information understandable without color alone.
- Maintain sufficient interaction targets on touch screens, even where an icon's drawn size is only 16–18px.
- Keep feedback concise. Status messages should be announced without moving focus unnecessarily.
- Motion is a chosen enhancement: approximately 140–180ms for subtle state transitions is reasonable. Respect reduced-motion preferences. No motion curve or animation duration is established by the still references.

## Fidelity checklist

Evaluate a completed screen in this order:

1. **Frame and content edges:** do sidebar width, inset, and main padding reproduce the reference's composition?
2. **Hierarchy:** are the title, support text, section titles, controls, and records scaled appropriately?
3. **Rhythm:** are major groups separated generously while local controls and rows stay compact?
4. **Surfaces:** are warm gray navigation, white canvas, faint borders, and soft card variants visibly distinct?
5. **Component shape:** are control, feature-card, chart-card, and document-card radii intentionally different?
6. **Density:** do tables show many readable rows, and do document cards preserve uncluttered space?
7. **Color:** is color limited to actions, selected states, semantic status, brand marks, and data?
8. **Usability:** do controls work with a keyboard, narrow viewport, dark theme, and realistic text lengths?

Common departures to avoid are heavy black headings, huge metric cards, saturated card fills, prominent shadows on every surface, excessive badges, unnecessary gradients, mixed icon weights, zebra tables, ornamental illustrations in settings, and filling deliberate empty space with unrelated content.

The target is a consistent implementation of the references' underlying decisions, with transparent approximations and considered usability improvements.
