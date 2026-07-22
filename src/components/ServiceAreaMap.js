import { useEffect, useRef } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { json } from "d3-fetch";
import { feature } from "topojson-client";

const SERVED_COUNTIES = new Set([
  "Collin",
  "Dallas",
  "Denton",
  "Ellis",
  "Hood",
  "Johnson",
  "Kaufman",
  "Parker",
  "Tarrant",
  "Wise",
  "Navarro",
]);

// Real U.S. Census county boundary data (report §4.1) — not hand-drawn
// shapes, so the geography stays accurate if the service area changes.
const COUNTIES_TOPOLOGY_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const BEDFORD_COORDINATES = [-97.1431, 32.8437]; // [longitude, latitude]

export default function ServiceAreaMap() {
  const svgRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const width = 680;
    const height = 620;

    json(COUNTIES_TOPOLOGY_URL).then((us) => {
      if (cancelled) return;

      const allCounties = feature(us, us.objects.counties).features;
      // Texas county FIPS codes all start with "48"
      const texasCounties = allCounties.filter((d) =>
        d.id.toString().startsWith("48")
      );
      const texasFeatureCollection = {
        type: "FeatureCollection",
        features: texasCounties,
      };

      const projection = geoMercator().fitSize(
        [width, height],
        texasFeatureCollection
      );
      const path = geoPath(projection);

      const svg = svgRef.current;
      if (!svg) return;
      svg.innerHTML = "";

      texasCounties.forEach((county) => {
        const el = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        el.setAttribute("d", path(county));
        el.setAttribute(
          "fill",
          SERVED_COUNTIES.has(county.properties.name) ? "#2d6db2" : "#e1e0d9"
        );
        el.setAttribute("stroke", "#ffffff");
        el.setAttribute("stroke-width", "0.75");
        svg.appendChild(el);
      });

      const [hqX, hqY] = projection(BEDFORD_COORDINATES);
      const hqMarker = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      hqMarker.setAttribute("cx", hqX);
      hqMarker.setAttribute("cy", hqY);
      hqMarker.setAttribute("r", "5");
      hqMarker.setAttribute("fill", "#D85A30");
      hqMarker.setAttribute("stroke", "#ffffff");
      hqMarker.setAttribute("stroke-width", "1.5");
      svg.appendChild(hqMarker);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 680 620"
      width="100%"
      role="img"
      aria-label="Map of Texas highlighting the eleven counties served by Restorative Care Home Health Services: Collin, Dallas, Denton, Ellis, Hood, Johnson, Kaufman, Parker, Tarrant, Wise, and Navarro, with the Bedford office marked"
      className="mx-auto max-w-2xl"
    />
  );
}
