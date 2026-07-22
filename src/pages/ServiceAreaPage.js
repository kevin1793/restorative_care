import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ServiceAreaMap from "../components/ServiceAreaMap";

const COUNTIES = [
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
];

export default function ServiceAreaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const focusClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary";

  const buttonClasses = `
    inline-flex items-center justify-center
    bg-primary text-white
    px-6 py-3 rounded-full
    font-medium
    hover:bg-primary/90
    transition-colors duration-200
    ${focusClasses}
  `;

  return (
    <>
      <Helmet>
        <title>Counties We Serve | Restorative Care HHS</title>
        <meta
          name="description"
          content="Restorative Care HHS serves 11 counties across North and Central Texas, including Collin, Dallas, Denton, Ellis, Hood, Johnson, Kaufman, Parker, Tarrant, Wise, and Navarro."
        />
      </Helmet>

      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="
          sr-only
          focus:not-sr-only
          focus:absolute
          focus:top-4
          focus:left-4
          focus:z-50
          focus:bg-white
          focus:text-black
          focus:px-4
          focus:py-2
          focus:rounded-md
          focus:shadow-lg
        "
      >
        Skip to main content
      </a>

      <main id="main-content" className="pt-16">
        {/* Hero */}
        <section
          className="bg-gradient-to-b from-primaryLight to-white py-20"
          aria-labelledby="service-area-heading"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1
              id="service-area-heading"
              className="text-4xl md:text-5xl font-bold text-primary mb-6"
            >
              Counties We Serve
            </h1>

            <p className="text-gray-800 text-lg leading-relaxed max-w-2xl mx-auto">
              Restorative Care Home Health Services proudly serves families
              across 11 counties in North and Central Texas.
            </p>
          </div>
        </section>

        {/* Map + County List */}
        <section className="py-16 bg-white" aria-labelledby="county-list-heading">
          <div className="max-w-4xl mx-auto px-6">
            <ServiceAreaMap />

            <h2 id="county-list-heading" className="sr-only">
              List of counties served
            </h2>

            {/* Plain-text list — required for SEO and screen readers,
                not just decoration alongside the map (report §4.1) */}
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 mt-10 text-gray-800">
              {COUNTIES.map((county) => (
                <li key={county} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {county} County
                </li>
              ))}
            </ul>

            <div className="text-center mt-12">
              <RouterLink
                to="/contact"
                className={buttonClasses}
                onClick={() => window.scrollTo(0, 0)}
              >
                Check if We Serve Your Area
              </RouterLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
