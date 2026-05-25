import React, { useEffect, useRef } from "react";
import { HeartPulse, Menu, X } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Veterans", href: "/veterans" },
    {
      label: "Careers",
      href: "https://www.restorativecarehhs.com/careers",
    },
    { label: "Contact Us", href: "/contact" },
    { label: "Call Us: (817) 285-8515", href: "tel:8172858515" },
  ];

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

  const handleScrollLink = (e, id) => {
    e.preventDefault();

    navigate("/");

    setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 50);

    setOpen(false);
  };

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

          {/* Desktop Navigation */}
          <ul
            className="
              hidden md:flex
              items-center
              space-x-8
            "
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.label === "Message Us" ? (
                  <button
                    onClick={(e) => handleScrollLink(e, "contact")}
                    className={`
                      text-gray-900
                      hover:text-primary
                      transition-colors
                      ${focusClasses}
                    `}
                  >
                    {link.label}
                  </button>
                ) : link.href.startsWith("http") ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      text-gray-900
                      hover:text-primary
                      transition-colors
                      ${focusClasses}
                    `}
                    onClick={closeMenu}
                    aria-label={`${link.label} opens in a new tab`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <RouterLink
                    to={link.href}
                    className={`
                      text-gray-900
                      hover:text-primary
                      transition-colors
                      ${focusClasses}
                    `}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </RouterLink>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(!open)}
            className={`
              md:hidden
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
              md:hidden
              bg-white
              border-t border-gray-200
              shadow-lg
            "
          >
            <ul className="flex flex-col py-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
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
                      aria-label={`${link.label} opens in a new tab`}
                    >
                      {link.label}
                    </a>
                  ) : (
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
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}