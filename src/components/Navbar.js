import { PHONE_HREF, PHONE_DISPLAY, PHONE_DASHED } from "../siteInfo";
import React, { useEffect, useRef } from "react";
import { HeartPulse, Menu, X, Phone } from "lucide-react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const barRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Publish the navbar's real height as --nav-h on <html>. The navbar is
  // fixed, and its height grows with the visitor's text size setting (rem
  // padding and type), so pages use `pt-[var(--nav-h)]` to start below it
  // instead of a hard-coded pixel offset that goes stale at larger sizes.
  // Measures the bar only (not the open mobile menu) so opening the menu
  // doesn't shift the page.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;

    const publish = () => {
      document.documentElement.style.setProperty(
        "--nav-h",
        `${bar.getBoundingClientRect().height}px`
      );
    };

    publish();
    if (typeof ResizeObserver === "undefined") return undefined;

    // Apply later changes on the next frame, not inside the observer's own
    // callback: changing --nav-h moves the page content, and doing that
    // inside the callback makes the browser report "ResizeObserver loop
    // completed with undelivered notifications".
    let frame = 0;
    const observer = new ResizeObserver(() => {
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          publish();
        });
      }
    });
    observer.observe(bar);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Veterans", href: "/veterans" },
    { label: "Service Area", href: "/service-area" },
    { label: "Contact Us", href: "/contact" },
  ];

  const careersLink = {
    label: "Careers",
    href: "https://restorativecarehhs.com/careers/",
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
  // Only takes effect in the hamburger layout; the full desktop navbar
  // always stays visible (see the .nav-root rule in src/index.css).
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

  // Logo: from any other page, the link goes home and the page change resets
  // the scroll (see RouteAnnouncer in App.js). When already on the home page
  // the link would do nothing, so scroll back to the top smoothly instead,
  // and drop any #section from the address.
  const handleLogoClick = (event) => {
    setOpen(false);
    if (location.pathname !== "/") return;

    event.preventDefault();

    // Drop a leftover #section from the address, but only once the scroll
    // has finished: changing the URL while a smooth scroll is starting makes
    // the browser hold the animation back for about a second.
    const clearHash = () => {
      if (window.location.hash) navigate("/", { replace: true });
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      // "auto" defers to the CSS scroll-behavior, which index.css sets to
      // instant for visitors who ask for reduced motion
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      clearHash();
      return;
    }

    let finished = false;
    let fallbackTimer;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.removeEventListener("scrollend", finish);
      clearTimeout(fallbackTimer);
      clearHash();
    };
    window.addEventListener("scrollend", finish);
    // Browsers without the scrollend event: assume the animation is done
    fallbackTimer = setTimeout(finish, 1500);

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <header className="nav-cq">
      <nav
        className={`
          nav-root
          w-full bg-white shadow-md
          fixed top-0 left-0 z-50
          transition-transform duration-300 motion-reduce:transition-none
          ${hidden && !open ? "-translate-y-[110%]" : "translate-y-0"}
        `}
        aria-label="Main navigation"
        onFocus={() => setHidden(false)}
      >
        <div
          ref={barRef}
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
              nav-logo flex items-center space-x-2 min-h-[44px] min-w-0
              text-gray-900
              ${focusClasses}
            `}
            onClick={handleLogoClick}
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

          {/* Desktop Navigation — shown only when the navbar is wide enough
              for the whole row (4 links + Careers + phone button + Request
              Care). The threshold is in rem inside a container query (see
              .nav-cq in src/index.css), and rem follows the visitor's text
              size setting, so it moves up automatically: ~1350px at the
              default size, ~1800px at the largest. Narrower than that gets
              the hamburger menu instead of a clipped row. */}
          <ul
            className="
              nav-desktop-links
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
          <div className="nav-desktop-actions items-center space-x-5 ml-6 flex-shrink-0">
            <a
              href={PHONE_HREF}
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
              aria-label={`Call Restorative Care HHS at ${PHONE_DASHED}`}
            >
              <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {PHONE_DISPLAY}
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
              nav-mobile
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
            nav-mobile
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
              max-h-[calc(100dvh-var(--nav-h,5.5rem))] overflow-y-auto
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
                href={PHONE_HREF}
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
                aria-label={`Call Restorative Care HHS at ${PHONE_DASHED}`}
                onClick={closeMenu}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {PHONE_DISPLAY}
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