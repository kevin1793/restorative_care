import React from "react";
import { HeartPulse, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const navLinks = [
    // { label: "Home", href: "#" },
    // { label: "About Us", href: "#about" },
    // { label: "Services", href: "#services" },
    // { label: "Careers", href: "#careers" },
    { label: "Contact Us", href: "#contact" },
    { label: "Call Us: (817)-285-8515", href: "tel:8172858515" },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2">
          <HeartPulse className="text-teal-600 w-7 h-7" />
          <span className="text-2xl font-merriweather text-gray-800">
            Restorative Care HHS
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-700 hover:text-teal-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-700 hover:text-teal-600"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-6 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
