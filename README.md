# evox_web

Portfolio website for Evox Technology, with a built-in admin panel for editing site content.

Built with React 18, TypeScript, Vite, Tailwind CSS and Framer Motion.

Live site: https://madushashanaka.github.io/evox_web/

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173. No environment variables are needed.

Don't open the site with VS Code Live Server or by opening `dist/index.html`
directly. The app needs Vite to compile it, so use `npm run dev` (or
`npm run preview` after a build).

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

## Editing content

Site content lives in the repo:

| Path                       | Contents                                  |
| -------------------------- | ----------------------------------------- |
| `public/data/company.json`   | Company name, description, about        |
| `public/data/address.json`   | Office address and map embed            |
| `public/data/branding.json`  | Logo and favicon paths                  |
| `public/data/social.json`    | Social media links                      |
| `public/data/settings.json`  | Page title, meta description, footer text |
| `public/data/projects.json`  | Portfolio projects                      |
| `public/data/directors.json` | Leadership team                         |
| `public/data/careers.json`   | Open positions                          |
| `public/images/`             | Logos, project and director images      |

To update the live site:

1. Run `npm run dev` and open http://localhost:5173/admin.
2. Edit content. Each save writes straight into `public/data/` and
   `public/images/` through a dev-server plugin
   ([src/lib/cmsWriterPlugin.ts](src/lib/cmsWriterPlugin.ts)).
3. Review the changes with `git diff`, then commit and push to `main`.

Saving only works with the dev server running. On the deployed site, the admin
panel can view content but can't save it.

Admin credentials are defined in
[src/context/AuthContext.tsx](src/context/AuthContext.tsx). The login check
runs in the browser, so it does not protect anything on the public site.

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages, using
[.github/workflows/deploy.yml](.github/workflows/deploy.yml). Check progress
under the repo's **Actions** tab.

One-time setup: in **Settings → Pages**, set **Source** to **GitHub Actions**.

GitHub Pages serves the site from `/evox_web/`, not the domain root. The
workflow passes this path to Vite through `BASE_PATH` (see
[vite.config.ts](vite.config.ts)), and the build fails if the output doesn't
use it. In code, wrap any root-relative link or image URL in `withBase()` from
[src/lib/nav.ts](src/lib/nav.ts), for example `withBase('/careers')`.

## Project structure

```
src/
  components/
    site/    Public website sections
    hero/    Hero section effects and animations
    admin/   Admin panel layout
    ui/      Shared UI components
  context/   Auth, content and theme providers
  lib/       Storage, routing, SEO, CMS dev-server plugin
  pages/     PublicSite, AdminPanel and admin pages
  types/     Shared TypeScript types
public/
  data/      Site content (JSON)
  images/    Site images
```
