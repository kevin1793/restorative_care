// One-off helper: builds public/data/dfw-counties.json, the small county
// boundary file used by the Service Area map.
//
// The map used to download the whole U.S. county file (~1 MB+) from a CDN on
// every visit just to draw 11 counties and their neighbors. This script pulls
// the same U.S. Census-derived data once, keeps only the served counties plus
// the surrounding ones that fall inside the map frame, rounds the coordinates,
// and writes a compact GeoJSON file that ships with the site.
//
// Usage: node scripts/build-county-data.js
// Re-run only if the list of served counties changes.

const fs = require("fs");
const path = require("path");
const { feature } = require("topojson-client");
const { geoBounds } = require("d3-geo");

const SOURCE = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const SERVED = [
  "Collin",
  "Dallas",
  "Denton",
  "Ellis",
  "Hood",
  "Johnson",
  "Kaufman",
  "Navarro",
  "Parker",
  "Tarrant",
  "Wise",
];
const MARGIN_DEGREES = 0.6; // surrounding counties to keep for context
const DECIMALS = 3; // ~100 m precision, plenty at this zoom

const round = (n) => Number(n.toFixed(DECIMALS));
const roundCoords = (c) =>
  typeof c[0] === "number" ? [round(c[0]), round(c[1])] : c.map(roundCoords);

async function main() {
  const res = await fetch(SOURCE);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const us = await res.json();

  const texas = feature(us, us.objects.counties).features.filter((d) =>
    String(d.id).startsWith("48")
  );
  const served = texas.filter((d) => SERVED.includes(d.properties.name));
  if (served.length !== SERVED.length) {
    throw new Error(`Expected ${SERVED.length} served counties, found ${served.length}`);
  }

  // Frame = bounding box of all served counties, padded by the margin
  let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const d of served) {
    const [[x0, y0], [x1, y1]] = geoBounds(d);
    minX = Math.min(minX, x0);
    minY = Math.min(minY, y0);
    maxX = Math.max(maxX, x1);
    maxY = Math.max(maxY, y1);
  }
  const frame = [
    minX - MARGIN_DEGREES,
    minY - MARGIN_DEGREES,
    maxX + MARGIN_DEGREES,
    maxY + MARGIN_DEGREES,
  ];

  const keep = texas.filter((d) => {
    if (SERVED.includes(d.properties.name)) return true;
    const [[x0, y0], [x1, y1]] = geoBounds(d);
    return x1 >= frame[0] && x0 <= frame[2] && y1 >= frame[1] && y0 <= frame[3];
  });

  const out = {
    type: "FeatureCollection",
    features: keep.map((d) => ({
      type: "Feature",
      id: d.id,
      properties: { name: d.properties.name },
      geometry: {
        type: d.geometry.type,
        coordinates: roundCoords(d.geometry.coordinates),
      },
    })),
  };

  const file = path.resolve(__dirname, "..", "public", "data", "dfw-counties.json");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(out));
  const kb = (fs.statSync(file).size / 1024).toFixed(1);
  console.log(`Wrote ${keep.length} counties to public/data/dfw-counties.json (${kb} KB)`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
