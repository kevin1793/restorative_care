import { useEffect, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { json } from "d3-fetch";
import { SERVED_COUNTIES } from "../servedCounties";
import { MAPS_URL } from "../siteInfo";

const SERVED_SET = new Set(SERVED_COUNTIES);

// Real U.S. Census county boundary data (report §4.1) — not hand-drawn
// shapes, so the geography stays accurate if the service area changes.
// This is a small local file (served counties plus their neighbors) built by
// scripts/build-county-data.js, instead of the full ~1 MB U.S. county file
// that used to be downloaded from a CDN on every visit.
const COUNTIES_URL = `${process.env.PUBLIC_URL || ""}/data/dfw-counties.json`;
const BEDFORD_COORDINATES = [-97.1431, 32.8437]; // [longitude, latitude]

const WIDTH = 600;
const HEIGHT = 540;

// Colors. Served counties use the brand navy; everything else is a cool,
// quiet tint so the service area is the obvious focus.
const COLORS = {
  served: "#122C71",
  servedActive: "#D85A30",
  other: "#E4E8F3",
  stroke: "#FFFFFF",
  hq: "#D85A30",
};

// Fine-tune a few labels that would otherwise sit on top of the office marker
const LABEL_OFFSETS = { Tarrant: [-6, -20] };

// The map is zoomed in on the counties we serve (plus the surrounding
// counties for context) instead of showing all of Texas, where the service
// area was a tiny cluster in one corner.
//
// Linked with the county list beside it both ways: the list passes in
// activeCounty, and pointing at (mouse) or tapping (touch) a served county
// here reports it back through onActiveCountyChange so its pill lights up.
export default function ServiceAreaMap({
  activeCounty = null,
  onActiveCountyChange = () => {},
}) {
  const [shapes, setShapes] = useState(null);
  const [hq, setHq] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    json(COUNTIES_URL)
      .then((data) => {
        if (cancelled) return;

        const texasCounties = data.features;
        const served = texasCounties.filter((d) =>
          SERVED_SET.has(d.properties.name)
        );

        const projection = geoMercator().fitExtent(
          [
            [24, 24],
            [WIDTH - 24, HEIGHT - 24],
          ],
          { type: "FeatureCollection", features: served }
        );
        const path = geoPath(projection);

        setShapes(
          texasCounties.map((county) => {
            const name = county.properties.name;
            const isServed = SERVED_SET.has(name);
            const [cx, cy] = isServed ? path.centroid(county) : [0, 0];
            return { id: county.id, name, isServed, d: path(county), cx, cy };
          })
        );
        const [hqX, hqY] = projection(BEDFORD_COORDINATES);
        setHq({ x: hqX, y: hqY });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const label =
    "Map of North Texas highlighting the eleven counties served by Restorative Care Home Health Services: Collin, Dallas, Denton, Ellis, Hood, Johnson, Kaufman, Navarro, Parker, Tarrant, and Wise, with the Bedford office marked";

  if (failed) {
    return (
      <div
        className="flex items-center justify-center text-center text-gray-700 p-8 rounded-xl bg-primaryLight"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
        role="status"
      >
        The map couldn’t load right now. The full list of counties we serve is
        shown beside it.
      </div>
    );
  }

  if (!shapes) {
    return (
      <div
        className="w-full rounded-xl bg-primaryLight animate-pulse motion-reduce:animate-none"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
        role="status"
        aria-label="Loading map"
      />
    );
  }

  const servedShapes = shapes.filter((s) => s.isServed);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width="100%"
      role="img"
      aria-label={label}
      className="block w-full h-auto rounded-xl bg-primaryLight/60"
      // A tap anywhere off the served counties clears a touch selection
      onClick={() => onActiveCountyChange(null)}
    >
      <g aria-hidden="true">
        {/* Surrounding counties first, so served counties draw on top */}
        {shapes
          .filter((s) => !s.isServed)
          .map((s) => (
            <path
              key={s.id}
              d={s.d}
              fill={COLORS.other}
              stroke={COLORS.stroke}
              strokeWidth="1"
            />
          ))}

        {servedShapes.map((s) => (
          <path
            key={s.id}
            d={s.d}
            fill={
              activeCounty === s.name ? COLORS.servedActive : COLORS.served
            }
            stroke={COLORS.stroke}
            strokeWidth="1.5"
            style={{ transition: "fill 150ms ease", cursor: "pointer" }}
            // Mouse: follow the pointer. Touch has no hover, so a tap
            // selects the county until another tap moves or clears it.
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") onActiveCountyChange(s.name);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") onActiveCountyChange(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onActiveCountyChange(s.name);
            }}
          />
        ))}

        {/* County names: hidden on narrow phones, where they'd be too small
            to read — the county list sits right below the map there. */}
        <g className="hidden sm:block" style={{ pointerEvents: "none" }}>
          {servedShapes.map((s) => {
            const [dx, dy] = LABEL_OFFSETS[s.name] || [0, 0];
            return (
              <text
                key={s.id}
                x={s.cx + dx}
                y={s.cy + dy}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#FFFFFF"
                fontSize="13"
                fontWeight="600"
                style={{ letterSpacing: "0.01em" }}
              >
                {s.name}
              </text>
            );
          })}
        </g>

        {hq && (
          // The office pin and its label open the office in Google Maps.
          // Pointer/touch only (tabIndex -1): the whole map is one image to
          // screen readers and keyboards, and the "Our Bedford office" card
          // beside it has the same link for them.
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            className="group cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <title>Open our Bedford office in Google Maps</title>
            {/* Invisible, larger tap target around the small dot */}
            <circle cx={hq.x} cy={hq.y} r="18" fill="transparent" />
            {/* soft pulsing ring; static for people who prefer reduced motion */}
            <circle
              cx={hq.x}
              cy={hq.y}
              r="11"
              fill={COLORS.hq}
              opacity="0.35"
              className="animate-ping motion-reduce:animate-none"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <circle
              cx={hq.x}
              cy={hq.y}
              r="7"
              fill={COLORS.hq}
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            <g
              transform={`translate(${hq.x - 112}, ${hq.y + 10})`}
              className="hidden sm:block"
            >
              <rect
                width="104"
                height="24"
                rx="12"
                className="fill-white transition-colors group-hover:fill-[#FFF4EF]"
                stroke={COLORS.hq}
                strokeWidth="1.5"
              />
              <text
                x="52"
                y="12.5"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#8A2F12"
                fontSize="12"
                fontWeight="700"
                className="group-hover:underline"
              >
                Bedford office
              </text>
            </g>
          </a>
        )}
      </g>
    </svg>
  );
}
