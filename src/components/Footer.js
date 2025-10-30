import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10 text-gray-700">
        {/* About */}
        <div>
          <h2 className="text-lg font-semibold text-teal-700 mb-3">Restorative Care HHS</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Dedicated to providing compassionate home health care that empowers
            independence and promotes wellness.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-md font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:8172858515" className="hover:text-teal-600">Call Us: (817)-285-8515</a></li>
            {/* <li><a href="#about" className="hover:text-teal-600">About Us</a></li>
            <li><a href="#services" className="hover:text-teal-600">Services</a></li>
            <li><a href="#careers" className="hover:text-teal-600">Careers</a></li>
            <li><a href="#contact" className="hover:text-teal-600">Contact</a></li> */}
          </ul>
        </div>

        {/* Social */}
        {/* <div>
          <h3 className="text-md font-semibold mb-3">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-teal-600"><Facebook /></a>
            <a href="#" className="hover:text-teal-600"><Instagram /></a>
            <a href="#" className="hover:text-teal-600"><Linkedin /></a>
          </div>
        </div> */}
      </div>

      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Restorative Care HHS. All rights reserved.
      </div>
      <div className="border-t bg-teal-50 border-gray-200 text-center py-4 text-sm text-gray-500">
        Built with Care by <a href="https://kevin1793.github.io" className="hover:text-teal-600">KC Designs</a>.
      </div>
    </footer>
  );
}
