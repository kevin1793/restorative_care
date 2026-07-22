import React, { useEffect, useRef } from "react";
import { HeartPulse, Menu, X, Phone } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Veterans", href: "/veterans" },
    { label: "Service Area", href: "/service-area" },
    { label: "Contact Us", href: "/contact" },
  ];

  const careersLink = {
    label: "Careers",
    href: "https://www.restorativecarehhs.com/careers",
  };

  const focusClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md";

  // Close menu with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);

        if (menuButtonRef.current) {
          menuButtonRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus first mobile menu item when opened
  useEffect(() => {
    if (open && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector("a");

      if (firstLink) {
        firstLink.focus();
      }
    }
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header>
      <nav
        className="
          w-full bg-white shadow-md
          fixed top-0 left-0 z-50
        "
        aria-label="Main navigation"
      >
        <div
          className="
            max-w-7xl mx-auto
            px-6 py-4
            flex justify-between items-center
          "
        >
          {/* Logo */}
          <RouterLink
            to="/"
            className={`
              flex items-center space-x-2
              text-gray-900
              ${focusClasses}
            `}
            onClick={() => window.scrollTo(0, 0)}
            aria-label="Go to Restorative Care HHS homepage"
          >
            <HeartPulse
              className="text-primary w-7 h-7"
              aria-hidden="true"
            />

            <span className="text-2xl font-merriweather">
              Restorative Care HHS
            </span>
          </RouterLink>

          {/* Desktop Navigation — xl breakpoint: with the 18px base type
              size, 4 links + Careers + phone button + Request Care needs
              roughly 1100px. md (768px) and even lg (1024px) squeeze or
              overflow it, so the full row only shows at xl (1280px+);
              narrower desktop/tablet widths get the hamburger menu. */}
          <ul
            className="
              hidden xl:flex
              items-center
              space-x-6
              flex-shrink-0
            "
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <RouterLink
                  to={link.href}
                  className={`
                    text-gray-900
                    hover:text-primary
                    transition-colors
                    whitespace-nowrap
                    ${focusClasses}
                  `}
                  onClick={closeMenu}
                >
                  {link.label}
                </RouterLink>
              </li>
            ))}

            <li>
              <a
                href={careersLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  text-gray-900
                  hover:text-primary
                  transition-colors
                  whitespace-nowrap
                  ${focusClasses}
                `}
                onClick={closeMenu}
                aria-label={`${careersLink.label} opens in a new tab`}
              >
                {careersLink.label}
              </a>
            </li>
          </ul>

          {/* Desktop Actions: tap-to-call + primary CTA */}
          <div className="hidden xl:flex items-center space-x-4 ml-6 flex-shrink-0">
            <a
              href="tel:8172858515"
              className={`
                flex items-center gap-2
                text-primary font-medium
                border border-primary/30
                rounded-full
                px-4 py-2
                whitespace-nowrap
                hover:bg-primaryLight
                transition-colors
                ${focusClasses}
              `}
              aria-label="Call Restorative Care HHS at 817-285-8515"
            >
              <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              (817) 285-8515
            </a>

            <RouterLink
              to="/contact"
              className={`
                bg-primary text-white
                rounded-full
                px-5 py-2
                font-medium
                whitespace-nowrap
                hover:bg-primary/90
                transition-colors
                ${focusClasses}
              `}
              onClick={closeMenu}
            >
              Request Care
            </RouterLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(!open)}
            className={`
              xl:hidden
              p-2
              text-gray-900
              hover:text-primary
              transition-colors
              ${focusClasses}
            `}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? (
              <X aria-hidden="true" />
            ) : (
              <Menu aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            id="mobile-navigation"
            ref={mobileMenuRef}
            className="
              xl:hidden
              bg-white
              border-t border-gray-200
              shadow-lg
            "
          >
            <ul className="flex flex-col py-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <RouterLink
                    to={link.href}
                    className={`
                      block
                      px-6 py-4
                      text-gray-900
                      hover:bg-primaryLight
                      hover:text-primary
                      transition-colors
                      ${focusClasses}
                    `}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </RouterLink>
                </li>
              ))}

              <li>
                <a
                  href={careersLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    block
                    px-6 py-4
                    text-gray-900
                    hover:bg-primaryLight
                    hover:text-primary
                    transition-colors
                    ${focusClasses}
                  `}
                  onClick={closeMenu}
                  aria-label={`${careersLink.label} opens in a new tab`}
                >
                  {careersLink.label}
                </a>
              </li>
            </ul>

            {/* Mobile Actions: tap-to-call + primary CTA */}
            <div className="flex flex-col gap-3 px-6 py-4 border-t border-gray-200">
              <a
                href="tel:8172858515"
                className={`
                  flex items-center justify-center gap-2
                  text-primary font-medium
                  border border-primary/30
                  rounded-full
                  px-4 py-3
                  hover:bg-primaryLight
                  transition-colors
                  ${focusClasses}
                `}
                aria-label="Call Restorative Care HHS at 817-285-8515"
                onClick={closeMenu}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                (817) 285-8515
              </a>

              <RouterLink
                to="/contact"
                className={`
                  flex items-center justify-center
                  bg-primary text-white
                  rounded-full
                  px-4 py-3
                  font-medium
                  hover:bg-primary/90
                  transition-colors
                  ${focusClasses}
                `}
                onClick={closeMenu}
              >
                Request Care
              </RouterLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}