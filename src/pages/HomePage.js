import React from "react";
import { HeartPulse, Home, Users, Phone } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

import nurseImage1 from "../assets/images/nurse_care1.jpg";
import nurseCall from "../assets/images/calling.jpg";
import ContactForm from "../components/ContactForm";

export default function HomePage() {
  const focusClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary";

  const buttonClasses = `
    inline-flex items-center justify-center
    bg-primary text-white
    px-6 py-3 rounded-full
    font-medium
    hover:bg-primary/90
    transition-colors duration-200
    ${focusClasses}
  `;

  return (
    <>
      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="
          sr-only
          focus:not-sr-only
          focus:absolute
          focus:top-4
          focus:left-4
          focus:z-50
          focus:bg-white
          focus:text-black
          focus:px-4
          focus:py-2
          focus:rounded-md
          focus:shadow-lg
        "
      >
        Skip to main content
      </a>

      {/* Main Content */}
      <main id="main-content" className="pt-16">
        {/* Hero Section */}
        <section
          className="bg-gradient-to-b from-primaryLight to-white py-20"
          aria-labelledby="hero-heading"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1
              id="hero-heading"
              className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6"
            >
              Restorative Care HHS
            </h1>

            {/* Decorative tagline */}
            <p
              className="font-fancy text-4xl md:text-5xl font-bold text-primary mb-6"
              aria-hidden="true"
            >
              Compassionate Care, Right at Home
            </p>

            <p className="text-gray-800 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              We provide professional, personalized home health services that
              support comfort, dignity, and independence.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className={buttonClasses}
              >
                Message Us
              </a>

              <a
                href="tel:8172858515"
                className={buttonClasses}
              >
                Call Us: (817) 285-8515
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 bg-white"
          aria-labelledby="about-heading"
        >
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <img
              src={nurseImage1}
              alt="A skilled home health nurse providing compassionate care to an elderly patient in their home"
              className="rounded-2xl shadow-md w-full"
              loading="lazy"
            />

            <div>
              <h2
                id="about-heading"
                className="text-3xl font-semibold text-primary mb-4"
              >
                About Our Mission
              </h2>

              <p className="text-gray-800 leading-relaxed mb-4">
                At <strong>Restorative Care HHS</strong>, we believe everyone
                deserves comfort and dignity at home. Our skilled nurses and
                compassionate caregivers are dedicated to helping each client
                live with independence, safety, and respect.
              </p>

              <p className="text-gray-800 leading-relaxed">
                Whether it’s daily living assistance, therapy, or specialized
                medical care — we’re here to bridge care and compassion.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-20 bg-primaryLight"
          aria-labelledby="services-heading"
        >
          <div className="max-w-7xl mx-auto px-6">
            <h2
              id="services-heading"
              className="text-3xl font-semibold text-primary text-center mb-12"
            >
              Our Home Health Services
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Card 1 */}
              <article className="bg-white p-8 rounded-2xl shadow-md text-left">
                <HeartPulse
                  className="w-10 h-10 text-primary mx-auto mb-4"
                  aria-hidden="true"
                />

                <h3 className="text-xl text-center font-semibold text-gray-900 mb-4">
                  Home Health Aide / CNA
                </h3>

                <ul className="text-gray-800 text-sm list-disc list-inside space-y-2">
                  <li>Bathing assistance</li>
                  <li>Dressing and grooming</li>
                  <li>Toileting support</li>
                  <li>Mobility assistance</li>
                  <li>Oral hygiene and denture care</li>
                  <li>Additional daily living support</li>
                </ul>
              </article>

              {/* Card 2 */}
              <article className="bg-white p-8 rounded-2xl shadow-md text-left">
                <Users
                  className="w-10 h-10 text-primary mx-auto mb-4"
                  aria-hidden="true"
                />

                <h3 className="text-xl text-center font-semibold text-gray-900 mb-4">
                  Skilled Nursing / Non-Skilled Nursing
                </h3>

                <p className="text-gray-800 text-sm leading-relaxed">
                  Professional in-home nursing care including health monitoring,
                  medication administration, recovery support, and chronic care
                  management.
                </p>
              </article>

              {/* Card 3 */}
              <article className="bg-white p-8 rounded-2xl shadow-md text-left">
                <Home
                  className="w-10 h-10 text-primary mx-auto mb-4"
                  aria-hidden="true"
                />

                <h3 className="text-xl text-center font-semibold text-gray-900 mb-4">
                  Other Services
                </h3>

                <ul className="text-gray-800 text-sm list-disc list-inside space-y-2">
                  <li>Wound care</li>
                  <li>Occupational therapy</li>
                  <li>Physical therapy</li>
                </ul>
              </article>
            </div>

            <div className="mt-20 text-center">
              <RouterLink
                to="/services"
                className={buttonClasses}
                onClick={() => window.scrollTo(0, 0)}
              >
                Learn More About Our Services
              </RouterLink>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-20 bg-white"
        >
          <div className="max-w-6xl mx-auto px-6">
            <h2
              id="contact-heading"
              className="text-3xl font-semibold text-primary mb-8 text-center"
            >
              Contact Us
            </h2>

            <ContactForm />
          </div>
        </section>

        {/* Contact CTA */}
        <section
          className="py-20 bg-gray-50"
          aria-labelledby="cta-heading"
        >
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Phone
                  className="w-8 h-8 text-primary mr-3"
                  aria-hidden="true"
                />

                <h2
                  id="cta-heading"
                  className="text-3xl font-semibold text-primary"
                >
                  Let’s Talk About Your Care Needs
                </h2>
              </div>

              <p className="text-gray-800 mb-8 leading-relaxed">
                We’re here to answer your questions and help you find the best
                care plan for your loved ones.
              </p>

              <a
                href="tel:8172858515"
                className={buttonClasses}
              >
                Call Us Today: (817) 285-8515
              </a>
            </div>

            <div>
              <img
                src={nurseCall}
                alt="A medical care coordinator taking a phone call to assist a patient's family"
                className="rounded-2xl shadow-lg w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Veterans Section */}
        <section
          className="py-20 bg-primaryLight"
          aria-labelledby="veterans-heading"
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2
              id="veterans-heading"
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
            >
              Quality Home Care for Veterans
            </h2>

            <p className="text-gray-800 mb-8 max-w-3xl mx-auto leading-relaxed">
              Restorative Care Home Health Services provides compassionate
              respite and homemaker caregiving services for veterans under VCA
              and TriWest agreements. We help veterans maintain independence,
              comfort, and dignity at home with personalized care tailored to
              each individual.
            </p>

            <RouterLink
              to="/veterans"
              className={buttonClasses}
              onClick={() => window.scrollTo(0, 0)}
            >
              Learn More About Veteran Services
            </RouterLink>
          </div>
        </section>
      </main>
    </>
  );
}