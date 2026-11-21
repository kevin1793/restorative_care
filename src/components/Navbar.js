import React, { useEffect, useRef } from "react";
import { HeartPulse, Menu, X, Phone } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

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

  // The menu is always in the DOM so it can slide; `inert` takes the closed
  // menu out of the tab order and the accessibility tree (React 18 doesn't
  // support the attribute as a prop, so it's set here). Declared before the
  // focus effect so the menu is already interactive when focus moves in.
  useEffect(() => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.toggleAttribute("inert", !open);
    }
  }, [open]);

  // Focus first mobile menu item when opened
  useEffect(() => {
    if (open && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector("a");

      if (firstLink) {
        firstLink.focus({ preventScroll: true });
      }
    }
  }, [open]);

  // Hide the navbar when scrolling down and bring it back on scroll up.
  // Only takes effect below the xl breakpoint (hamburger layout); the full
  // desktop navbar always stays visible via the xl:translate-y-0 class.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const DELTA = 8; // ignore tiny scroll jitters
    const REVEAL_ZONE = 80; // always visible near the top of the page

    const update = () => {
      const y = window.scrollY;
      if (y <= REVEAL_ZONE) {
        setHidden(false);
      } else if (y - lastY > DELTA) {
        setHidden(true);
      } else if (lastY - y > DELTA) {
        setHidden(false);
      }
      if (Math.abs(y - lastY) > DELTA) lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header>
      <nav
        className={`
          w-full bg-white shadow-md
          fixed top-0 left-0 z-50
          transition-transform duration-300 motion-reduce:transition-none
          xl:translate-y-0
          ${hidden && !open ? "-translate-y-[110%]" : "translate-y-0"}
        `}
        aria-label="Main navigation"
        onFocus={() => setHidden(false)}
      >
        <div
          className="
            max-w-7xl mx-auto
            px-6 py-5
            flex justify-between items-center gap-3
          "
        >
          {/* Logo */}
          <RouterLink
            to="/"
            className={`
              flex items-center space-x-2 min-h-[44px] min-w-0 xl:shrink-0
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

            <span className="text-base min-[400px]:text-xl sm:text-2xl font-serif font-bold leading-tight sm:whitespace-nowrap">
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
          <div className="hidden xl:flex items-center space-x-5 ml-6 flex-shrink-0">
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
              inline-flex shrink-0 items-center justify-center min-w-[44px] min-h-[44px]
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

        {/* Mobile Menu — always rendered so it can slide: the grid row
            animates between 0fr and 1fr (height auto, no fixed max-height
            guess); the overflow-hidden inner wrapper clips it, and `inert`
            (set in an effect above) keeps closed links unfocusable. */}
        <div
          id="mobile-navigation"
          ref={mobileMenuRef}
          className={`
            xl:hidden
            grid
            transition-[grid-template-rows] duration-300 ease-out
            motion-reduce:transition-none
            ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
          `}
        >
          <div className="min-h-0 overflow-hidden">
          <div
            className="
              bg-white
              border-t border-gray-200
              shadow-lg
              max-h-[calc(100dvh-5.5rem)] overflow-y-auto
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
          </div>
        </div>
      </nav>
    </header>
  );
}