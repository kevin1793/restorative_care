import React, { useEffect } from "react";
import { HeartPulse, Users, Home } from "lucide-react";

import servicesHeroImg from "../assets/images/services.jpg";

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <main id="main-content" className="pt-10">
        {/* Hero Section */}
        <section
          className="
            relative w-full
            min-h-[350px] md:min-h-[650px]
            flex items-center justify-center
            text-center px-6
          "
          aria-labelledby="services-hero-heading"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-top"
            style={{
              backgroundImage: `url(${servicesHeroImg})`,
            }}
            aria-hidden="true"
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-teal-950/60"
            aria-hidden="true"
          />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h1
              id="services-hero-heading"
              className="
                text-4xl md:text-5xl
                font-bold text-white
                mb-4 drop-shadow-lg
              "
            >
              Our Services
            </h1>

            <p
              className="
                text-white
                max-w-2xl mx-auto
                text-lg md:text-xl
                leading-relaxed
                drop-shadow
              "
            >
              Restorative Care HHS is dedicated to providing compassionate,
              professional, and personalized care to support comfort, dignity,
              and independence at home.
            </p>
          </div>
        </section>

        {/* Home Health Section */}
        <section
          className="py-20 bg-white"
          aria-labelledby="home-health-heading"
        >
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            <HeartPulse
              className="w-12 h-12 text-primary mb-4"
              aria-hidden="true"
            />

            <h2
              id="home-health-heading"
              className="text-3xl font-semibold text-primary mb-4"
            >
              Home Health
            </h2>

            <div className="space-y-4 max-w-2xl">
              <p className="text-gray-800 leading-relaxed">
                <strong>Restorative</strong> is more than a word—it represents
                our mission to bring comfort, healing, and dignity to every
                person we serve. Our philosophy of care shines through the
                commitment of our skilled nurses and caregivers who work
                tirelessly to make a positive impact.
              </p>

              <p className="text-gray-800 leading-relaxed">
                Home health care may be appropriate if a new diagnosis, chronic
                illness, hospitalization, or surgery requires changes in daily
                lifestyle. Our compassionate, expert team provides specialized
                care so you receive the proper support for your unique needs.
              </p>

              <p className="text-gray-800 leading-relaxed">
                Our primary goal is to help you return to the activities you
                love, improve independence, and confidently manage your
                condition — all within the comfort and safety of your home.
              </p>
            </div>
          </div>
        </section>

        {/* PAS Section */}
        <section
          className="py-20 bg-primaryLight"
          aria-labelledby="pas-heading"
        >
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            <Users
              className="w-12 h-12 text-primary mb-4"
              aria-hidden="true"
            />

            <h2
              id="pas-heading"
              className="text-3xl font-semibold text-primary mb-4"
            >
              Personal Attendant Services (PAS)
            </h2>

            <div className="space-y-4 max-w-2xl">
              <p className="text-gray-800 leading-relaxed">
                We strive to make a meaningful difference in the lives of those
                we care for by helping them regain independence. Our attendants
                provide warm, dependable care that allows you to remain
                comfortable at home while maintaining autonomy.
              </p>

              <p className="text-gray-800 leading-relaxed">
                Our PAS caregivers assist with a wide range of daily,
                non-medical needs:
              </p>

              {/* Service List */}
              <div className="text-left">
                <ul className="list-disc list-inside text-gray-800 space-y-2">
                  <li>House cleaning and laundry</li>
                  <li>Meal preparation and feeding assistance</li>
                  <li>Transportation to doctor’s visits</li>
                  <li>Dressing, bathing, and grooming assistance</li>
                  <li>Walking and exercising support</li>
                  <li>Shopping and errands</li>
                </ul>
              </div>

              <p className="text-gray-800 leading-relaxed">
                Our attendants are available 24/7 for clients who need
                assistance with daily activities. Our support team also ensures
                seamless scheduling and coordination to create the best care
                experience possible.
              </p>
            </div>
          </div>
        </section>

        {/* Private Duty Section */}
        <section
          className="py-20 bg-white"
          aria-labelledby="private-duty-heading"
        >
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            <Home
              className="w-12 h-12 text-primary mb-4"
              aria-hidden="true"
            />

            <h2
              id="private-duty-heading"
              className="text-3xl font-semibold text-primary mb-4"
            >
              Private Duty
            </h2>

            <div className="space-y-4 max-w-2xl">
              <p className="text-gray-800 leading-relaxed">
                Restorative offers private duty care for clients who need
                additional assistance to remain safe, comfortable, and
                independent in their homes. This service also provides respite
                care for family caregivers.
              </p>

              <p className="text-primary font-bold leading-relaxed">
                Private duty services may include:
              </p>

              {/* Service List */}
              <div className="text-left">
                <ul className="list-disc list-inside text-gray-800 space-y-2">
                  <li>
                    Personal care including bathing, dressing, hygiene,
                    transfers, and ambulation
                  </li>

                  <li>Homemaker and companion care</li>

                  <li>Meal preparation</li>

                  <li>Medication reminders</li>

                  <li>
                    Trained support for clients with specific needs such as
                    Alzheimer’s care, hospice care, or end-of-life care
                  </li>
                </ul>
              </div>

              <p className="text-gray-800 leading-relaxed">
                Private duty care may better suit individuals whose needs differ
                from traditional home health care, especially regarding payment
                methods.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-16 bg-primaryLight text-center"
          aria-labelledby="cta-heading"
        >
          <div className="max-w-3xl mx-auto px-6">
            <h2
              id="cta-heading"
              className="text-2xl md:text-3xl font-semibold text-primary mb-4"
            >
              Ready to Get Started?
            </h2>

            <p className="text-gray-800 mb-6 max-w-xl mx-auto leading-relaxed">
              Contact Restorative Care Home Health Services to schedule your
              free in-home assessment and begin your care plan today.
            </p>

            <a
              href="tel:8172858515"
              className={buttonClasses}
            >
              Call Us Now: (817) 285-8515
            </a>
          </div>
        </section>
      </main>
    </>
  );
}