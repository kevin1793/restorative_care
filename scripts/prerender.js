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
// It also writes build/sitemap.xml. The server maps /services -> services.html
// (see the rewrite rules in public/.htaccess).

const fs = require("fs");
const path = require("path");
const {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  OG_IMAGE_ALT,
  routes,
} = require("../src/seo/routes");

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
//  - frames: the Facebook page plugin and the Google map embed
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://formspree.io",
  "frame-src https://www.facebook.com https://www.google.com https://maps.google.com",
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

function headTags(route) {
  const url = urlFor(route);
  const tags = [
    `<meta http-equiv="Content-Security-Policy" content="${esc(CSP)}" />`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(OG_IMAGE)}" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${esc(OG_IMAGE)}" />`,
  ];

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
    `<p>Restorative Care Home Health Services, Inc. · 221 Bedford Road Suite 320, Bedford, TX 76022 · ` +
    `<a href="tel:8172858515">(817) 285-8515</a></p>` +
    `<nav aria-label="Site pages"><ul>${links}</ul></nav>` +
    `</main></noscript>`
  );
}

function render(route) {
  let html = template;

  // Replace the dev-server fallback title and drop any stale per-page tags
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(route.title)}</title>`);
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, "");
  html = html.replace(/<meta\s+(?:property|name)="(?:og|twitter):[^"]*"[^>]*>/gi, "");
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, "");

  // Put the generated tags right after <meta charset> so the CSP is first
  html = html.replace(
    /(<meta\s+charset="utf-8"\s*\/?>)/i,
    `$1\n    ${headTags(route)}`
  );

  // Crawler/no-JS summary just before the app root
  html = html.replace(/(<div id="root"><\/div>)/i, `${noscriptSummary(route)}$1`);

  if (!html.includes(`<link rel="canonical" href="${esc(urlFor(route))}"`)) {
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

// sitemap.xml
const lastmod = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map(
      (r) =>
        `  <url>\n    <loc>${esc(urlFor(r))}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
    )
    .join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
console.log(`prerender: sitemap.xml (${routes.length} URLs)`);
