import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10 text-gray-700">
        {/* About */}
        <div>
          <h2 className="text-lg font-semibold text-primary mb-3">Restorative Care HHS</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Dedicated to providing compassionate home health care that empowers
            independence and promotes wellness.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-md font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:8172858515" className="hover:text-primary">Call Us: (817)-285-8515</a></li>
            {/* <li><a href="#about" className="hover:text-primary">About Us</a></li>
            <li><a href="#services" className="hover:text-primary">Services</a></li>
            <li><a href="#careers" className="hover:text-primary">Careers</a></li>
            <li><a href="#contact" className="hover:text-primary">Contact</a></li> */}
          </ul>
        </div>

        {/* Social */}
        {/* <div>
          <h3 className="text-md font-semibold mb-3">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary"><Facebook /></a>
            <a href="#" className="hover:text-primary"><Instagram /></a>
            <a href="#" className="hover:text-primary"><Linkedin /></a>
          </div>
        </div> */}
      </div>

      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Restorative Care HHS. All rights reserved.
      </div>
      {/* <div className="border-t bg-primaryLight border-gray-200 text-center py-4 text-sm text-gray-500">
        Built with Care by <a href="https://kevin1793.github.io" className="hover:text-primary">KC Designs</a>.
      </div> */}
    </footer>
  );
}
