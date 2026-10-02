# evox_web

Portfolio website for Evox Tech, with a built-in admin panel for editing site content.

Built with React 18, TypeScript, Vite, Tailwind CSS and Framer Motion.

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

The site runs at http://localhost:5173. No environment variables are needed.

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload         |
| `npm run build`     | Build for production into `dist/`            |
| `npm run preview`   | Serve the production build locally           |
| `npm run lint`      | Run ESLint                                   |
| `npm run typecheck` | Type-check with TypeScript (no output files) |

## Routes

- `/` — public website (hero, about, capabilities, projects, directors, contact)
- `/careers` — job listings and individual job detail pages
- `/admin` — admin panel (login required)

## Content and the admin panel

Default site content lives in JSON files under [public/data/](public/data/):

| File             | Contents                          |
| ---------------- | --------------------------------- |
| `company.json`   | Company name, description, about   |
| `address.json`   | Office address and map embed      |
| `branding.json`  | Logo and favicon paths            |
| `social.json`    | Social media links                |
| `settings.json`  | Page title, meta description, footer text |
| `projects.json`  | Portfolio projects                |
| `directors.json` | Leadership team                   |
| `careers.json`   | Open positions                    |

On first visit, the app loads these files and saves a copy to the browser's
`localStorage`. Changes made in the admin panel only update that local copy, so
they are **not** shared with other visitors or other browsers. To publish
changes for everyone:

1. Edit content in `/admin`.
2. Export the data as JSON from the admin Settings page.
3. Copy the relevant sections into the files in `public/data/` and redeploy.

To see changes to `public/data/` in a browser that already has saved data, use
the reset option on the admin Settings page or clear the `evox_cms_data` key from
`localStorage`.

Admin credentials are defined in
[src/context/AuthContext.tsx](src/context/AuthContext.tsx). This login runs
entirely in the browser, so it does not protect anything on a public deployment.

## Project structure

```
src/
  components/
    site/    Public website sections
    hero/    Hero section effects and animations
    admin/   Admin panel layout
    ui/      Shared UI components
  context/   Auth, content and theme providers
  lib/       Storage, routing, SEO and helpers
  pages/     PublicSite, AdminPanel and admin pages
  types/     Shared TypeScript types
public/data/ Default site content (JSON)
```
