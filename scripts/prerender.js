// Runs automatically after `npm run build` (npm "postbuild" hook).
//
// The site is a single-page React app: every URL used to serve the same
// index.html, whose <head> described only the home page. Browsers that run
// JavaScript were fine (the <Seo /> component fixes the tags), but search
// engines, link-preview bots (Facebook, iMessage, Slack, LinkedIn, ...) and
// anything that doesn't run JS saw the home page's title and description for
// every URL.
//
// This script fixes that without changing how the app works. For each page in
// src/seo/routes.js it writes a copy of build/index.html with that page's own:
//   - <title>, meta description, canonical URL
//   - Open Graph / Twitter share tags
//   - a short <noscript> summary with links (visible to crawlers and no-JS
//     visitors; the React app replaces nothing in it when JS runs)
//   - Content-Security-Policy (production only; the dev server needs looser
//     rules for hot reloading)
// It also writes build/404.html (noindex, no canonical) for URLs that aren't
// pages, and build/sitemap.xml. The server maps /services -> services.html
// (see the rewrite rules in public/.htaccess).

const fs = require("fs");
const { execFileSync } = require("child_process");
const path = require("path");
const {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  OG_IMAGE_ALT,
  routes,
  notFound,
} = require("../src/seo/routes");
const { jsonLdFor } = require("../src/seo/jsonld");
const siteInfo = require("../src/siteInfo");

const buildDir = path.resolve(__dirname, "..", "build");
const templatePath = path.join(buildDir, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("prerender: build/index.html not found. Run `npm run build` first.");
  process.exit(1);
}

// What the site is allowed to load. Everything else is blocked by the browser.
//  - scripts: only our own files (no inline scripts)
//  - styles: own files plus inline style attributes (React and the map use them)
//  - images: own files and data: URIs
//  - connect: our own files plus Formspree (the contact form)
//  - frames: the Google map embed on the Contact page
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://formspree.io",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
].join("; ");

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const template = fs.readFileSync(templatePath, "utf8");

function urlFor(route) {
  return route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
}

// `isNotFound`: the 404 page has no canonical URL of its own and must stay out
// of search results.
function headTags(route, isNotFound = false) {
  const url = isNotFound ? null : urlFor(route);
  const tags = [
    `<meta http-equiv="Content-Security-Policy" content="${esc(CSP)}" />`,
    `<meta name="description" content="${esc(route.description)}" />`,
    isNotFound
      ? `<meta name="robots" content="noindex, follow" />`
      : `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    url && `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(OG_IMAGE)}" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${esc(OG_IMAGE)}" />`,
  ].filter(Boolean);

  // Page-specific structured data (breadcrumbs, services). "<" is escaped so
  // nothing in the data can close the script tag early.
  jsonLdFor(route).forEach((entry) => {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(entry).replace(
        /</g,
        "\u003c"
      )}</script>`
    );
  });

  // The home page hero uses the decorative script font; load it early there
  // only (other pages don't use it).
  if (route.path === "/") {
    tags.push(
      `<link rel="preload" href="/fonts/playwrite-au-tas.woff2" as="font" type="font/woff2" crossorigin />`
    );
  }
  return tags.join("\n    ");
}

function noscriptSummary(route) {
  const links = routes
    .map((r) => `<li><a href="${esc(r.path)}">${esc(r.heading)}</a></li>`)
    .join("");
  return (
    `<noscript><main>` +
    `<h1>${esc(route.heading)}</h1>` +
    `<p>${esc(route.description)}</p>` +
    `<p>Restorative Care Home Health Services, Inc. · ${esc(siteInfo.ADDRESS_FULL)} · ` +
    `<a href="${esc(siteInfo.PHONE_HREF)}">${esc(siteInfo.PHONE_DISPLAY)}</a></p>` +
    `<nav aria-label="Site pages"><ul>${links}</ul></nav>` +
    `</main></noscript>`
  );
}

function render(route, isNotFound = false) {
  let html = template;

  // Replace the dev-server fallback title and drop any stale per-page tags
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(route.title)}</title>`);
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, "");
  html = html.replace(/<meta\s+(?:property|name)="(?:og|twitter):[^"]*"[^>]*>/gi, "");
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, "");

  // Put the generated tags right after <meta charset> so the CSP is first
  html = html.replace(
    /(<meta\s+charset="utf-8"\s*\/?>)/i,
    `$1\n    ${headTags(route, isNotFound)}`
  );

  // Crawler/no-JS summary just before the app root
  html = html.replace(/(<div id="root"><\/div>)/i, `${noscriptSummary(route)}$1`);

  const marker = isNotFound
    ? `<meta name="robots" content="noindex, follow" />`
    : `<link rel="canonical" href="${esc(urlFor(route))}"`;
  if (!html.includes(marker)) {
    throw new Error(`prerender: failed to inject head tags for ${route.path}`);
  }
  return html;
}

for (const route of routes) {
  const html = render(route);
  const file =
    route.path === "/"
      ? templatePath
      : path.join(buildDir, `${route.path.replace(/^\//, "")}.html`);
  fs.writeFileSync(file, html);
  console.log(`prerender: ${route.path.padEnd(20)} -> ${path.relative(buildDir, file)}`);
}

// 404.html: shown (with a real 404 status) for any URL that isn't a page.
// Its noscript summary needs a path-less route object.
fs.writeFileSync(
  path.join(buildDir, "404.html"),
  render({ path: "/404", ...notFound }, true)
);
console.log(`prerender: ${"(not found)".padEnd(20)} -> 404.html`);

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const projectRoot = path.resolve(__dirname, "..");

// The date a page's source file last changed in git (YYYY-MM-DD). Search
// engines use <lastmod> to decide when to re-crawl, so it should not claim
// every page changed on every deploy. Falls back to today when the file has
// uncommitted edits, or git isn't available.
function lastmodFor(route) {
  try {
    const run = (args) =>
      execFileSync("git", args, {
        cwd: projectRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
    if (run(["status", "--porcelain", "--", route.source])) return today;
    return run(["log", "-1", "--format=%cs", "--", route.source]) || today;
  } catch (e) {
    return today;
  }
}
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map(
      (r) =>
        `  <url>\n    <loc>${esc(urlFor(r))}</loc>\n    <lastmod>${lastmodFor(r)}</lastmod>\n` +
        `    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
    )
    .join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
console.log(`prerender: sitemap.xml (${routes.length} URLs)`);
