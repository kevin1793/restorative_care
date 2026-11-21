import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/Seo";
import { MapPin, Phone, MessageSquare } from "lucide-react";

import ServiceAreaMap, { SERVED_COUNTIES } from "../components/ServiceAreaMap";

export default function ServiceAreaPage() {
  // Hovering a county in the list lights it up on the map (mouse/touch
  // enhancement only — the list itself is plain text for everyone else).
  const [activeCounty, setActiveCounty] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const focusClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary";

  return (
    <>
      <Seo path="/service-area" />

      <div className="pt-[var(--nav-h,87px)]">
        {/* Hero */}
        <section
          className="bg-gradient-to-b from-primaryLight to-white py-12 md:py-20"
          aria-labelledby="service-area-heading"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-primary shadow-sm border border-primary/10 mb-5">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Based in Bedford, Texas
            </p>

            <h1
              id="service-area-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6"
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
        <section
          className="py-10 md:py-16 bg-primaryLight"
          aria-labelledby="county-list-heading"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
              {/* Map card */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-brand p-4 sm:p-6">
                <ServiceAreaMap activeCounty={activeCounty} />

                {/* Legend */}
                <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-800">
                  <li className="flex items-center gap-2">
                    <span
                      className="inline-block w-4 h-4 rounded bg-primary"
                      aria-hidden="true"
                    />
                    Counties we serve
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      className="inline-block w-4 h-4 rounded bg-[#E4E8F3] border border-gray-300"
                      aria-hidden="true"
                    />
                    Other counties
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      className="inline-block w-3.5 h-3.5 rounded-full bg-[#D85A30] border-2 border-white shadow ring-1 ring-[#D85A30]"
                      aria-hidden="true"
                    />
                    Our Bedford office
                  </li>
                </ul>
              </div>

              {/* County list */}
              <div className="lg:col-span-2">
                <h2
                  id="county-list-heading"
                  className="text-2xl font-semibold text-primary mb-2 text-center lg:text-left"
                >
                  11 counties, one local team
                </h2>
                <p className="text-gray-700 leading-relaxed mb-5 text-center lg:text-left">
                  If you live in one of these counties, our team can bring
                  skilled care and personal support to you at home.
                </p>

                {/* Plain-text list — required for SEO and screen readers,
                    not just decoration alongside the map (report §4.1). */}
                <ul className="grid grid-cols-2 gap-3">
                  {SERVED_COUNTIES.map((county) => (
                    <li
                      key={county}
                      onMouseEnter={() => setActiveCounty(county)}
                      onMouseLeave={() => setActiveCounty(null)}
                      className={`flex items-center gap-2 bg-white border rounded-xl px-3 py-3 text-sm font-medium text-primary shadow-sm transition-colors ${
                        activeCounty === county
                          ? "border-[#D85A30] bg-[#FFF4EF]"
                          : "border-primary/15"
                      }`}
                    >
                      <MapPin
                        className="w-4 h-4 shrink-0 text-[#D85A30]"
                        aria-hidden="true"
                      />
                      <span className="leading-tight">
                        <span className="block sm:inline">{county}</span>{" "}
                        <span className="block sm:inline text-xs sm:text-sm font-normal sm:font-medium text-gray-600 sm:text-primary">
                          County
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA band */}
            <div className="mt-10 md:mt-14 rounded-2xl bg-gradient-to-br from-primary to-primaryDark text-white p-6 sm:p-10 text-center shadow-brand">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
                Not sure if we serve your address?
              </h2>
              <p className="text-white/90 max-w-xl mx-auto mb-6 leading-relaxed">
                Give us a call or send a message. We'll confirm quickly and
                help you with next steps.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                <a
                  href="tel:8172858515"
                  className={`inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 min-h-[48px] rounded-full font-medium hover:bg-primaryLight transition-colors ${focusClasses} focus-visible:ring-white focus-visible:ring-offset-primary`}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Call (817) 285-8515
                </a>
                <RouterLink
                  to="/contact"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
                  className={`inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 min-h-[48px] rounded-full font-medium hover:bg-white/10 transition-colors ${focusClasses} focus-visible:ring-white focus-visible:ring-offset-primary`}
                >
                  <MessageSquare className="w-5 h-5" aria-hidden="true" />
                  Check if We Serve Your Area
                </RouterLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
