import { PHONE_HREF, PHONE_DISPLAY, PHONE_DASHED } from "../siteInfo";
import { button, focusRingText } from "../ui";
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

  // No separate "Contact Us" link: the Request Care button goes to the
  // Contact page, and dropping the duplicate lets the full row fit on
  // laptop screens. The footer still lists Contact Us.
  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Veterans", href: "/veterans" },
    { label: "Service Area", href: "/service-area" },
  ];

  const careersLink = {
    label: "Careers",
    href: "https://restorativecarehhs.com/careers/",
  };

  const focusClasses = focusRingText;

  // The page you're on is marked in both menus (color + underline on
  // desktop, tinted row on mobile) and announced with aria-current
  const isCurrent = (href) => location.pathname === href;

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
            px-4 sm:px-6 py-3
            flex justify-between items-center gap-3
          "
        >
          {/* Logo */}
          <RouterLink
            to="/"
            className={`
              nav-logo flex items-center gap-2 min-h-[44px] min-w-0
              text-gray-900
              ${focusClasses}
            `}
            onClick={handleLogoClick}
            aria-label="Go to Restorative Care HHS homepage"
          >
            <HeartPulse
              className="text-primary w-7 h-7 shrink-0"
              aria-hidden="true"
            />

            {/* One line from 360px up; on the very smallest phones it may
                wrap rather than run into the call and menu buttons */}
            <span className="text-base min-[400px]:text-xl font-serif font-bold leading-tight min-[360px]:whitespace-nowrap">
              Restorative Care HHS
            </span>
          </RouterLink>

          {/* Desktop Navigation — shown only when the navbar is wide enough
              for the whole row (3 links + Careers + phone button + Request
              Care). The threshold is in rem inside a container query (see
              .nav-cq in src/index.css), and rem follows the visitor's text
              size setting, so it moves up automatically: ~1170px at the
              default size, wider at larger text sizes. Narrower than that
              gets the hamburger menu instead of a clipped row. */}
          <ul className="nav-desktop-links items-center gap-x-6 flex-shrink-0">
            {navLinks.map((link) => {
              const current = isCurrent(link.href);
              return (
                <li key={link.label}>
                  <RouterLink
                    to={link.href}
                    aria-current={current ? "page" : undefined}
                    className={`
                      font-medium whitespace-nowrap transition-colors
                      underline-offset-8 decoration-2
                      ${current ? "text-primary underline" : "text-gray-900 hover:text-primary"}
                      ${focusClasses}
                    `}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </RouterLink>
                </li>
              );
            })}

            <li>
              <a
                href={careersLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  font-medium whitespace-nowrap transition-colors
                  text-gray-900 hover:text-primary
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
          <div className="nav-desktop-actions items-center gap-3 ml-4 flex-shrink-0">
            <a
              href={PHONE_HREF}
              className={`${button("secondary", "sm")} whitespace-nowrap`}
              aria-label={`Call Restorative Care HHS at ${PHONE_DASHED}`}
            >
              <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>

            <RouterLink
              to="/contact"
              aria-current={isCurrent("/contact") ? "page" : undefined}
              className={`${button("primary", "sm")} whitespace-nowrap`}
              onClick={closeMenu}
            >
              Request Care
            </RouterLink>
          </div>

          {/* Mobile: a one-tap call button beside the menu button, so
              calling doesn't mean opening the menu first */}
          <div className="nav-mobile flex shrink-0 items-center">
            <a
              href={PHONE_HREF}
              className={`
                inline-flex items-center justify-center w-11 h-11 rounded-full
                text-primary hover:bg-primaryLight transition-colors
                ${focusClasses}
              `}
              aria-label={`Call Restorative Care HHS at ${PHONE_DASHED}`}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(!open)}
              className={`
                inline-flex items-center justify-center w-11 h-11 rounded-full
                text-gray-900 hover:text-primary hover:bg-primaryLight
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
              {navLinks.map((link) => {
                const current = isCurrent(link.href);
                return (
                  <li key={link.label}>
                    <RouterLink
                      to={link.href}
                      aria-current={current ? "page" : undefined}
                      className={`
                        block px-4 sm:px-6 py-3.5 font-medium transition-colors
                        border-l-4
                        ${
                          current
                            ? "border-primary bg-primaryLight text-primary"
                            : "border-transparent text-gray-900 hover:bg-primaryLight hover:text-primary"
                        }
                        ${focusClasses}
                      `}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </RouterLink>
                  </li>
                );
              })}

              <li>
                <a
                  href={careersLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    block px-4 sm:px-6 py-3.5 font-medium transition-colors
                    border-l-4 border-transparent
                    text-gray-900 hover:bg-primaryLight hover:text-primary
                    ${focusClasses}
                  `}
                  onClick={closeMenu}
                  aria-label={`${careersLink.label} opens in a new tab`}
                >
                  {careersLink.label}
                </a>
              </li>
            </ul>

            {/* Mobile Actions: tap-to-call + primary CTA, the same buttons
                as the rest of the site */}
            <div className="flex flex-col gap-3 px-4 sm:px-6 py-4 border-t border-gray-200">
              <a
                href={PHONE_HREF}
                className={button("secondary")}
                aria-label={`Call Restorative Care HHS at ${PHONE_DASHED}`}
                onClick={closeMenu}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>

              <RouterLink
                to="/contact"
                aria-current={isCurrent("/contact") ? "page" : undefined}
                className={button("primary")}
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