# Restorative Care HHS website

Marketing site for Restorative Care Home Health Services, Inc. (Bedford, TX) at
<https://restorativecarehhs.com>. A React single-page app (Create React App +
Tailwind CSS) that is pre-rendered per page at build time and uploaded to
Hostinger over FTPS.

## Everyday commands

| Command | What it does |
| --- | --- |
| `npm start` | Dev server at <http://localhost:3000> with live reload |
| `npm test` | Runs the tests (watch mode); `CI=true npm test -- --watchAll=false` runs them once |
| `npm run lint` | ESLint over `src` |
| `npm run build` | Production build into `build/`, then pre-renders every page and writes `sitemap.xml` |
| `npm run deploy` | Build, upload `build/` to the host, remove old build files from the server, then check the live site |
| `npm run deploy:only` | Upload the existing `build/` without rebuilding |
| `npm run verify:live` | Read-only checks of the live site (page titles, 404s, redirects, security headers, caching, sitemap) |
| `npm run deploy:setup` | One-time: saves the FTP password to the git-ignored `.env.deploy` |
| `npm run build:county-data` | Rebuilds `public/data/dfw-counties.json` (the map's county outlines) |

Deploying needs the FTP password. `npm run deploy:setup` stores it in
`.env.deploy` (never committed); without that file the deploy script asks for it.
Run deploys from PowerShell, not Git Bash, if you ever pass a remote folder such
as `FTP_REMOTE_DIR=/careers`: Git Bash rewrites `/careers` into a Windows path.

## Where things are

```
public/            files copied as-is: .htaccess, fonts, og-image, icons, county data
scripts/           deploy.js, verify-live.js, prerender.js, setup-deploy.js, build-county-data.js
src/siteInfo.js    phone, email, address and OPENING HOURS: change them once, here
src/seo/routes.js  every page's title, description and sitemap settings
src/seo/jsonld.js  per-page structured data (breadcrumbs, services) for search engines
src/pages/         one file per page
src/components/    Navbar, Footer, ContactForm, AccessibilityControls, OpenStatus, ...
src/hooks/         useScrollReveal (scroll fade-in)
docs/              CONTENT-REVIEW.md: copy still waiting on sign-off
```

## How a page is built and served

1. `react-scripts build` makes the app in `build/`.
2. `scripts/prerender.js` (runs automatically after the build) writes a copy of
   `index.html` for every page in `src/seo/routes.js` (`services.html`,
   `veterans.html`, ...) with that page's own title, description, canonical URL,
   share tags, structured data and Content-Security-Policy, plus `404.html` and
   `sitemap.xml`. Crawlers and link previews that don't run JavaScript see the
   right tags for each URL.
3. `public/.htaccess` serves `/services` from `services.html`, answers unknown
   URLs with a real 404 (`404.html`), redirects `www` to the bare domain, and sets
   security headers and cache rules. HTTP to HTTPS is handled by Hostinger's CDN.

### Adding a page

1. Create `src/pages/NewPage.js` and add `<Seo path="/new" />` to it.
2. Add a `<Route>` for it in `src/App.js`.
3. Add its entry (title, description, heading, `source`, sitemap values) to
   `src/seo/routes.js`. A test fails if `App.js` and `routes.js` disagree.

## Opening hours

`src/components/OpenStatus.js` shows "Open now, closes at 5:00 PM" or "Closed
now, opens Monday 8:00 AM", in the visitor's own time zone, in the footer and on
the Contact page. It shows nothing until `HOURS` in `src/siteInfo.js` is set, for
example:

```js
const HOURS = [{ days: [1, 2, 3, 4, 5], open: "08:00", close: "17:00" }];
```

(`days`: 0 = Sunday ... 6 = Saturday; times are the office's local time, set by
`TIME_ZONE`.)

## Accessibility and motion

- The floating accessibility button (text size, high contrast, underlined links)
  stores its choice in `localStorage` (`rc-a11y-prefs`); `public/a11y-init.js`
  applies it before first paint. Keep the key in sync between the two files.
- Text sizes change the root font size, so layout is built in `rem`. The navbar
  switches between the full row and the menu button by a container query in
  `rem`, and multi-column layouts collapse earlier at larger sizes
  (`a11y-size-N` rules in `src/index.css`).
- Page and scroll animations (`src/index.css`, `src/hooks/useScrollReveal.js`)
  are off for visitors who ask for reduced motion and when printing.

## Tests and CI

Tests live beside the code (`*.test.js`) and cover the opening-hours maths, the
contact form's validation and spam trap, the accessibility controls, the route
list, and a render of the app. GitHub Actions (`.github/workflows/ci.yml`) runs
lint, tests and a build on every push.

## Notes

- The careers site at `/careers` is a separate app (Qualiply) living in its own
  folder on the same host; the `.htaccess` here leaves real folders alone.
- Fonts are self-hosted in `public/fonts` and declared in `public/index.html`
  (not in CSS) because Create React App can't bundle root-relative `url()`s.
  Rename a font file if you replace it: browsers cache fonts for a year.
