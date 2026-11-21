import OpenStatus from "./OpenStatus";
import { PHONE_HREF, PHONE_DISPLAY, PHONE_DASHED, EMAIL, EMAIL_HREF, ADDRESS_STREET, ADDRESS_CITY_LINE } from "../siteInfo";
import React from "react";
import {
  HeartPulse,
  Facebook,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

// Confirmed active account (Status Update, July 23) — only list platforms
// Juice has actually confirmed are active. Shared with FacebookFeedEmbed
// so the URL only lives in one place.
import { FACEBOOK_PAGE_URL as FACEBOOK_URL } from "./FacebookFeedEmbed";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Licensed by Texas HHSC" },
  { icon: BadgeCheck, label: "Medicare & Medicaid Accepted" },
  { icon: MapPin, label: "Serving the DFW Metroplex" },
];

export default function Footer() {
  // Focus ring only (no corner radius), so round buttons can keep their own
  // shape. focusClasses adds the small radius used by text links.
  const ringClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primaryDark";
  const focusClasses = `${ringClasses} rounded-md`;

  // Solid dark-navy background is the highest-visual-impact change in the
  // design system pass (report §4.4) — a thin, low-contrast footer is the
  // single biggest signal of "default template" rather than a considered
  // build, so light text/links on primaryDark replace the old light-gray
  // treatment throughout. Links are padded to a 44px tap height.
  const linkClasses = `inline-block py-2.5 text-white/80 hover:text-white transition-colors ${focusClasses}`;

  const headingClasses =
    "text-sm font-semibold uppercase tracking-wider text-white/70 mb-3";

  const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  return (
    <footer className="bg-primaryDark text-white" role="contentinfo">
      {/* Accent line ties the footer to the map/office marker color */}
      <div
        className="h-1 bg-gradient-to-r from-[#D85A30] via-primary to-primaryDark"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 [&>*]:min-w-0">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-white/10 border border-white/20">
              <HeartPulse className="w-6 h-6 text-white" aria-hidden="true" />
            </span>
            <span className="text-lg font-serif font-bold leading-snug">
              Restorative Care Home Health Services, Inc.
            </span>
          </div>

          <p className="text-white/80 leading-relaxed mb-5 max-w-md">
            Dedicated to providing compassionate home health care that empowers
            independence and promotes wellness.
          </p>

          <ul className="flex flex-wrap gap-2 mb-6">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-sm text-white/90"
              >
                <Icon
                  className="w-4 h-4 shrink-0 text-[#F2A58A]"
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>

          {/* Call and Facebook buttons share one height (h-12) and a fully
              round shape so they line up as a pair. */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={PHONE_HREF}
              className={`inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-white bg-white text-primaryDark font-medium hover:bg-primaryLight transition-colors ${ringClasses}`}
              aria-label={`Call Restorative Care HHS at ${PHONE_DASHED}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Restorative Care HHS on Facebook — opens in a new tab"
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-primaryDark transition-colors ${ringClasses}`}
            >
              <Facebook className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer quick links" className="lg:col-span-2">
          <h2 className={headingClasses}>Quick Links</h2>

          <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4">
            <li>
              <RouterLink to="/services" className={linkClasses} onClick={toTop}>
                Services
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/veterans" className={linkClasses} onClick={toTop}>
                Veterans
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/service-area"
                className={linkClasses}
                onClick={toTop}
              >
                Service Area
              </RouterLink>
            </li>
            <li>
              <a
                href="https://restorativecarehhs.com/careers/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
                aria-label="Careers opens in a new tab"
              >
                Careers
              </a>
            </li>
            <li>
              <RouterLink to="/contact" className={linkClasses} onClick={toTop}>
                Contact Us
              </RouterLink>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <nav aria-label="Footer contact links" className="lg:col-span-3">
          <h2 className={headingClasses}>Contact</h2>

          <ul>
            <li>
              <a
                href={EMAIL_HREF}
                className={`flex items-start gap-3 py-2.5 text-white/80 hover:text-white transition-colors ${focusClasses}`}
                aria-label={`Email us at ${EMAIL}`}
              >
                <Mail
                  className="w-5 h-5 shrink-0 mt-0.5 text-[#F2A58A]"
                  aria-hidden="true"
                />
                <span className="[overflow-wrap:anywhere]">
                  inforestorativecare@
                  <wbr />
                  gmail.com
                </span>
              </a>
            </li>

            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=221+Bedford+Road+Suite+320+Bedford,+TX+76022"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-3 py-2.5 text-white/80 hover:text-white transition-colors ${focusClasses}`}
                aria-label={`${ADDRESS_STREET}, ${ADDRESS_CITY_LINE}: open in Google Maps, opens in a new tab`}
              >
                <MapPin
                  className="w-5 h-5 shrink-0 mt-0.5 text-[#F2A58A]"
                  aria-hidden="true"
                />
                <span>
                  {ADDRESS_STREET}
                  <br />
                  {ADDRESS_CITY_LINE}
                </span>
              </a>
            </li>

            {/* Only appears once HOURS is set in src/siteInfo.js */}
            <li className="py-1">
              <OpenStatus tone="dark" />
            </li>
          </ul>
        </nav>

        {/* Service area teaser */}
        <div className="sm:col-span-2 lg:col-span-3">
          <h2 className={headingClasses}>Where We Serve</h2>

          <p className="text-white/80 leading-relaxed mb-2">
            Proudly serving families across 11 counties in North and Central
            Texas.
          </p>

          <RouterLink
            to="/service-area"
            onClick={toTop}
            className={`inline-flex items-center gap-2 py-2.5 font-medium text-white underline underline-offset-4 hover:text-[#F2A58A] transition-colors ${focusClasses}`}
          >
            See all counties
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </RouterLink>
        </div>
      </div>

      {/* Bottom bar: legal links + copyright. On phones, extra bottom padding
          keeps the floating accessibility button (fixed, bottom-left) off the
          last line; from md up the centered text is well clear of it. */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 pt-4 pb-20 md:pb-6 flex flex-col items-center gap-2 text-sm text-white/70">
          <div className="text-center order-last">
            <p>
              © {new Date().getFullYear()} Restorative Care Home Health
              Services, Inc. All rights reserved.
            </p>

            <p className="mt-1">
              Design and Built by{" "}
              <a
                href="https://omniweb.tech"
                target="_blank"
                rel="noopener noreferrer"
                className={`${focusClasses} font-semibold underline underline-offset-2 hover:text-white`}
                aria-label="OmniWeb, designer and builder of this website — opens in a new tab"
              >
                OmniWeb
              </a>
            </p>
          </div>

          <nav aria-label="Legal and accessibility" className="order-first">
            <ul className="flex flex-wrap items-center justify-center gap-x-5">
              <li>
                <RouterLink
                  to="/privacy-policy"
                  className={linkClasses}
                  onClick={toTop}
                >
                  Privacy Policy
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/terms-of-service"
                  className={linkClasses}
                  onClick={toTop}
                >
                  Terms of Service
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/accessibility"
                  className={linkClasses}
                  onClick={toTop}
                >
                  Accessibility Statement
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/nondiscrimination"
                  className={linkClasses}
                  onClick={toTop}
                >
                  Notice of Nondiscrimination
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
