# Appleui

A working recreation of the visual language in the supplied desktop and mobile references. The implementation uses warm neutral navigation, inset content surfaces, restrained system typography, fine dividers, and carefully differentiated cards, forms, tables, and charts.

Read [DESIGN_LANGUAGE.md](./DESIGN_LANGUAGE.md) for the full reference analysis, measured color values, inferred dimensions, component rules, and fidelity decisions.

## Run locally

Requires Node.js 22 or later and pnpm 11.

```sh
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

```sh
pnpm typecheck
pnpm build
pnpm start
```

## Screens

| Route | Experience |
| --- | --- |
| `/` | Workspace feature and integration cards |
| `/people` | Searchable contacts, table/Kanban/list, filters, sorting, selection, editing, CSV export |
| `/documents` | Document cards, editor, text-file upload, search, date filters, duplication, download, reversible trash |
| `/analytics` | Store metrics and charts, period/comparison controls, report details and CSV downloads |
| `/hours` | Weekly availability, multiple shifts, timezone selection, overlap validation |
| `/appearance` | System/light/dark themes, miniature previews, custom primary colors |
| `/social` | Music feed, likes, follows, saved posts, comments, searchable demo conversations and message composer |
| `/general` | Workspace preferences |
| `/integrations` | Integration previews and product links |

The sidebar collapses to an icon rail. On phones it becomes a navigation drawer. Use Command/Ctrl+K to find a screen. Theme and local edits persist across reloads.

## Scope

This is an interactive frontend reference implementation. Records, documents, preferences, and conversations are saved in versioned browser local storage. Analytics uses sample data; integration cards describe the connection boundary and do not claim to connect live accounts. Messages and comments remain on the current device. A backend, authentication, and authorized provider integrations are needed for production collaboration.

The musician names and conversations are fictional demo content. Portraits are loaded from Unsplash. The application uses the system font and Lucide icons without an external font request.

## Structure

- `app/globals.css`: semantic theme tokens, shared controls, typography, application frame, responsive navigation.
- `components/ui.tsx`: buttons, native accessible dialogs, badges, avatars, headers, downloads, and feedback.
- `components/workspace-app.tsx`: navigation, theme, command search, and screen composition.
- `components/screens/`: screen-specific components and styles.
- `lib/storage.ts`: versioned local persistence with an in-memory fallback.

Built with Next.js 16, React 19, TypeScript, and plain CSS. The production build prerenders all nine application routes.
