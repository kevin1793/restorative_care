import React from "react";
import { HeartPulse } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  const focusClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md";

  const linkClasses = `text-gray-700 hover:text-primary transition-colors ${focusClasses}`;

  return (
    <footer
      className="bg-gray-50 border-t border-gray-200"
      role="contentinfo"
    >
      <div
        className="
          max-w-7xl mx-auto px-6 py-12
          grid md:grid-cols-4 gap-10
          text-gray-800
        "
      >
        {/* Company */}
        <div className="md:col-span-1">
          <div className="flex items-center space-x-2 mb-3">
            <HeartPulse
              className="text-primary w-6 h-6"
              aria-hidden="true"
            />
            <span className="text-lg font-merriweather text-primary">
              Restorative Care Home Health Services, Inc.
            </span>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            Dedicated to providing compassionate home health care that empowers
            independence and promotes wellness.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer quick links">
          <h3 className="text-md font-semibold mb-3 text-gray-900">
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
          <h3 className="text-md font-semibold mb-3 text-gray-900">
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
          <h3 className="text-md font-semibold mb-3 text-gray-900">
            Connect
          </h3>

          <p className="text-sm text-gray-700 mb-6">
            Follow us on social media for updates and care information.
          </p>

          <h3 className="text-md font-semibold mb-3 text-gray-900">
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
          border-t border-gray-200
          text-center py-4
          text-sm text-gray-700
        "
      >
        © {new Date().getFullYear()} Restorative Care Home Health Services, Inc. All rights reserved.
      </div>
    </footer>
  );
}
