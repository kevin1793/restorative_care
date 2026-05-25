import React from "react";

export default function Footer() {
  const focusClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md";

  return (
    <footer
      className="bg-gray-50 border-t border-gray-200"
      role="contentinfo"
    >
      <div
        className="
          max-w-7xl mx-auto px-6 py-10
          grid md:grid-cols-3 gap-10
          text-gray-800
        "
      >
        {/* About */}
        <div>
          <h2 className="text-lg font-semibold text-primary mb-3">
            Restorative Care HHS
          </h2>

          <p className="text-sm text-gray-700 leading-relaxed">
            Dedicated to providing compassionate home health care that empowers
            independence and promotes wellness.
          </p>
        </div>

        {/* Contact Links */}
        <nav aria-label="Footer contact links">
          <h3 className="text-md font-semibold mb-3 text-gray-900">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="tel:8172858515"
                className={`text-gray-800 hover:text-primary transition-colors ${focusClasses}`}
                aria-label="Call Restorative Care HHS at 817-285-8515"
              >
                Call Us: (817) 285-8515
              </a>
            </li>

            <li>
              <a
                href="mailto:inforestorativecare@gmail.com"
                className={`text-gray-800 hover:text-primary transition-colors ${focusClasses}`}
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
                className={`text-gray-800 hover:text-primary transition-colors ${focusClasses}`}
                aria-label="Open address in Google Maps"
              >
                221 Bedford Road Suite 320, Bedford, TX 76022
              </a>
            </li>
          </ul>
        </nav>

        {/* Optional Social (kept accessible even if empty) */}
        <div aria-label="Social media links">
          <h3 className="text-md font-semibold mb-3 text-gray-900">
            Connect
          </h3>

          <p className="text-sm text-gray-600">
            Follow us on social media for updates and care information.
          </p>

          {/* If you later re-enable icons, they should include aria-labels */}
        </div>
      </div>

      {/* Copyright */}
      <div
        className="
          border-t border-gray-200
          text-center py-4
          text-sm text-gray-600
        "
        role="contentinfo"
      >
        © {new Date().getFullYear()} Restorative Care HHS. All rights reserved.
      </div>
    </footer>
  );
}