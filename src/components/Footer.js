import React from "react";
import { HeartPulse, Facebook } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

// Confirmed active account (Status Update, July 23) — only list platforms
// Juice has actually confirmed are active. Shared with FacebookFeedEmbed
// so the URL only lives in one place.
import { FACEBOOK_PAGE_URL as FACEBOOK_URL } from "./FacebookFeedEmbed";

export default function Footer() {
  const focusClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primaryDark rounded-md";

  // Solid dark-navy background is the highest-visual-impact change in the
  // design system pass (report §4.4) — a thin, low-contrast footer is the
  // single biggest signal of "default template" rather than a considered
  // build, so light text/links on primaryDark replace the old light-gray
  // treatment throughout.
  const linkClasses = `text-white/75 hover:text-white transition-colors ${focusClasses}`;

  return (
    <footer
      className="bg-primaryDark"
      role="contentinfo"
    >
      <div
        className="
          max-w-7xl mx-auto px-6 py-16
          grid md:grid-cols-4 gap-10
          text-white
        "
      >
        {/* Company */}
        <div className="md:col-span-1">
          <div className="flex items-center space-x-2 mb-3">
            <HeartPulse
              className="text-white w-6 h-6"
              aria-hidden="true"
            />
            <span className="text-lg font-serif font-bold text-white">
              Restorative Care Home Health Services, Inc.
            </span>
          </div>

          <p className="text-sm text-white/75 leading-relaxed">
            Dedicated to providing compassionate home health care that empowers
            independence and promotes wellness.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer quick links">
          <h3 className="text-md font-semibold mb-3 text-white">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <RouterLink to="/services" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>
                Services
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/veterans" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>
                Veterans
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/service-area" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>
                Service Area
              </RouterLink>
            </li>
            <li>
              <a
                href="https://www.restorativecarehhs.com/careers"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
                aria-label="Careers opens in a new tab"
              >
                Careers
              </a>
            </li>
            <li>
              <RouterLink to="/contact" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>
                Contact Us
              </RouterLink>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <nav aria-label="Footer contact links">
          <h3 className="text-md font-semibold mb-3 text-white">
            Contact
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="tel:8172858515"
                className={linkClasses}
                aria-label="Call Restorative Care HHS at 817-285-8515"
              >
                Call Us: (817) 285-8515
              </a>
            </li>

            <li>
              <a
                href="mailto:inforestorativecare@gmail.com"
                className={`${linkClasses} break-words`}
                aria-label="Send email to Restorative Care HHS"
              >
                Email Us: inforestorativecare@gmail.com
              </a>
            </li>

            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=221+Bedford+Road+Suite+320+Bedford,+TX+76022"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
                aria-label="Open address in Google Maps"
              >
                221 Bedford Road Suite 320, Bedford, TX 76022
              </a>
            </li>
          </ul>
        </nav>

        {/* Connect + Legal */}
        <div>
          <h3 className="text-md font-semibold mb-3 text-white">
            Connect
          </h3>

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Restorative Care HHS on Facebook — opens in a new tab"
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-primaryDark transition-colors mb-6 ${focusClasses}`}
          >
            <Facebook className="w-5 h-5" aria-hidden="true" />
          </a>

          <h3 className="text-md font-semibold mb-3 text-white">
            Legal
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <RouterLink to="/privacy-policy" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>
                Privacy Policy
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/terms-of-service" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>
                Terms of Service
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="
          border-t border-white/10
          text-center py-4
          text-sm text-white/60
        "
      >
        © {new Date().getFullYear()} Restorative Care Home Health Services, Inc. All rights reserved.
      </div>
    </footer>
  );
}
