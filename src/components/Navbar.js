import React from "react";
import { HeartPulse, Menu, X } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Veterans", href: "/veterans" },
    { label: "Careers", href: "https://restorativecarehhs.com/careers" }, // External link to your careers app
    { label: "Contact Us", href: "/contact" },
    { label: "Call Us: (817)-285-8515", href: "tel:8172858515" },
  ];

  const handleScrollLink = (e, id) => {
    e.preventDefault();
    navigate("/"); // navigate to homepage
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 50);
    setOpen(false); // close mobile menu if open
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <RouterLink
          to="/"
          className="flex items-center space-x-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          <HeartPulse className="text-primary w-7 h-7" />
          <span className="text-2xl font-merriweather text-gray-800">
            Restorative Care HHS
          </span>
        </RouterLink>


        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) =>
            link.label === "Message Us" ? (
              <button
                key={link.label}
                onClick={(e) => handleScrollLink(e, "contact")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <RouterLink
                key={link.label}
                to={link.href}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {link.label}
              </RouterLink>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-700 hover:text-primary"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {navLinks.map((link) =>
            link.label === "Message Us" ? (
              <button
                key={link.label}
                onClick={(e) => handleScrollLink(e, "contact")}
                className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-primaryLight hover:text-primary"
              >
                {link.label}
              </button>
            ) : (
              <RouterLink
                key={link.label}
                to={link.href}
                className="block px-6 py-3 text-gray-700 hover:bg-primaryLight hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </RouterLink>
            )
          )}
        </div>
      )}
    </nav>
  );
}
