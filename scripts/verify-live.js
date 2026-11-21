// Checks the live site after a deploy: that pages load with their own titles,
// unknown URLs are real 404s, the www host redirects, security headers and
// cache rules are in place, and the JavaScript served is the build just made.
//
// Usage: npm run verify:live            (also runs at the end of `npm run deploy`)
//        node scripts/verify-live.js https://staging.example.com
// Exits with a non-zero status if anything fails. Only reads from the site.

const fs = require("fs");
const path = require("path");
const { SITE_URL, routes } = require("../src/seo/routes");

const base = (process.argv[2] || SITE_URL).replace(/\/$/, "");
const results = [];

function record(ok, name, detail = "") {
  results.push({ ok, name, detail });
  console.log(`${ok ? "  ok  " : " FAIL "} ${name}${detail ? `  (${detail})` : ""}`);
}

function get(url) {
  return fetch(url, { redirect: "manual" });
}

const pageUrl = (route) => `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
const decodeEntities = (s) => (s || "").replace(/&amp;/g, "&");

async function main() {
  console.log(`Checking ${base}\n`);

  // Every page: 200, its own <title>, its own canonical URL
  for (const route of routes) {
    const res = await get(base + (route.path === "/" ? "/" : route.path));
    const html = await res.text();
    const title = decodeEntities((html.match(/<title>([^<]*)<\/title>/) || [])[1]);
    const canonical = (html.match(/rel="canonical" href="([^"]*)"/) || [])[1];
    record(res.status === 200, `${route.path} returns 200`, `got ${res.status}`);
    record(title === route.title, `${route.path} has its own title`, title);
    record(canonical === pageUrl(route), `${route.path} canonical URL`, canonical);
  }

  // Unknown URL: a real 404 with the friendly page
  const missing = await get(`${base}/this-page-does-not-exist`);
  const missingHtml = await missing.text();
  record(missing.status === 404, "unknown URL returns 404", `got ${missing.status}`);
  record(/Page Not Found/.test(missingHtml), "404 shows the Page Not Found page");
  record(/noindex/.test(missingHtml), "404 page is noindex");

  // www redirects to the bare domain
  if (base === SITE_URL) {
    const www = await get(SITE_URL.replace("https://", "https://www.") + "/services");
    const where = www.headers.get("location");
    record(
      www.status === 301 && where === `${SITE_URL}/services`,
      "www redirects to the bare domain",
      `${www.status} -> ${where}`
    );
  }

  // Security headers and page caching
  const home = await get(`${base}/`);
  [
    ["strict-transport-security", /max-age=\d+/],
    ["x-content-type-options", /nosniff/],
    ["referrer-policy", /./],
    ["permissions-policy", /./],
    ["x-frame-options", /SAMEORIGIN/],
    ["content-security-policy", /frame-ancestors/],
  ].forEach(([header, pattern]) => {
    const value = home.headers.get(header) || "";
    record(pattern.test(value), `header ${header}`, value.slice(0, 50));
  });
  record(
    /no-cache/.test(home.headers.get("cache-control") || ""),
    "pages are revalidated (no-cache)",
    home.headers.get("cache-control")
  );

  // The live JavaScript is the build just made, and is cached for a year
  const homeHtml = await (await get(`${base}/`)).text();
  const liveScript = (homeHtml.match(/\/static\/js\/main\.[a-z0-9]+\.js/) || [])[0];
  const manifestPath = path.resolve(__dirname, "..", "build", "asset-manifest.json");
  if (fs.existsSync(manifestPath) && base === SITE_URL) {
    const expected = JSON.parse(fs.readFileSync(manifestPath, "utf8")).files["main.js"];
    record(liveScript === expected, "live JavaScript matches the latest build", liveScript);
  }
  if (liveScript) {
    const js = await get(base + liveScript);
    record(js.status === 200, "main script loads", `got ${js.status}`);
    record(
      /max-age=31536000/.test(js.headers.get("cache-control") || ""),
      "hashed script is cached for a year",
      js.headers.get("cache-control")
    );
  }

  // Sitemap and robots
  const sitemap = await get(`${base}/sitemap.xml`);
  const sitemapXml = await sitemap.text();
  record(
    sitemap.status === 200 && routes.every((r) => sitemapXml.includes(pageUrl(r))),
    "sitemap.xml lists every page"
  );
  record((await get(`${base}/robots.txt`)).status === 200, "robots.txt loads");

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  if (failed.length) {
    console.log("Failed:\n" + failed.map((f) => `  - ${f.name} ${f.detail}`).join("\n"));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`verify-live could not run: ${err.message}`);
  process.exit(1);
});
