import React from "react";
import {
  HeartPulse,
  Users,
  Phone,
  Stethoscope,
  HeartHandshake,
  Activity,
  ShieldCheck,
  MapPinned,
  BadgeCheck,
  MessageCircle,
  ClipboardCheck,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

import nurseImage1 from "../assets/images/nurse_care1.webp";
import nurseCall from "../assets/images/calling.webp";
import veteransImage from "../assets/images/veterans.webp";
import ContactForm from "../components/ContactForm";
import InsuranceSection from "../components/InsuranceSection";
import FacebookFeedEmbed, {
  FACEBOOK_PAGE_URL,
} from "../components/FacebookFeedEmbed";

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

  const buttonOutlineClasses = `
    inline-flex items-center justify-center
    bg-white text-primary
    border-2 border-primary
    px-6 py-3 rounded-full
    font-medium
    hover:bg-primaryLight
    transition-colors duration-200
    ${focusClasses}
  `;

  const pillClasses = `
    inline-flex items-center
    bg-primaryLight text-primary
    text-sm font-medium
    px-4 py-2 rounded-full
    hover:bg-primary hover:text-white
    transition-colors duration-200
  `;

  const missionHighlights = [
    {
      icon: Stethoscope,
      title: "Skilled Nursing",
      text: "Professional medical care delivered at home.",
    },
    {
      icon: HeartHandshake,
      title: "Personal Care",
      text: "Support with daily living for comfort and dignity.",
    },
    {
      icon: Activity,
      title: "Therapy Services",
      text: "Helping clients regain strength and independence.",
    },
  ];

  // Client-benefit copy drafted per report §3.17 — pending Juice's review
  // and sign-off before treating the exact wording as final (scope-of-
  // service language can matter for licensing compliance).
  const skilledServices = [
    {
      icon: Stethoscope,
      title: "Skilled Nursing",
      text: "Registered nurses manage medications, monitor health conditions, and provide wound care at home, while teaching clients and family caregivers how to manage day-to-day between visits.",
    },
    {
      icon: Activity,
      title: "Physical Therapy",
      text: "Helps clients rebuild strength, balance, and mobility after an illness, injury, or surgery, so they can move safely and confidently in their own home.",
    },
    {
      icon: HeartHandshake,
      title: "Occupational Therapy",
      text: "Focuses on relearning everyday tasks like dressing, bathing, and cooking, helping clients regain independence in their own routines.",
    },
    {
      icon: MessageCircle,
      title: "Speech Therapy",
      text: "Supports communication and swallowing difficulties, often following a stroke or other medical event, helping clients eat safely and express themselves clearly.",
    },
    {
      icon: Users,
      title: "Medical Social Work",
      text: "Connects clients and families with community resources, emotional support, and guidance for navigating care decisions and next steps.",
    },
  ];

  const nonSkilledServices = [
    {
      icon: HeartPulse,
      title: "Home Health Aide (HHA)",
      text: "Hands-on help with bathing, dressing, grooming, and mobility, so clients can maintain their comfort, dignity, and daily routines at home.",
    },
    {
      icon: ClipboardCheck,
      title: "Personal Care Attendant (PCA)",
      text: "Day-to-day support with personal care and household tasks for clients who qualify for long-term care services through Texas Medicaid.",
    },
  ];

  const trustBadges = [
    { icon: ShieldCheck, label: "Licensed by Texas HHSC" },
    { icon: MapPinned, label: "Serving the DFW Metroplex" },
    { icon: BadgeCheck, label: "Medicare & Medicaid Accepted" },
  ];

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
          className="relative overflow-hidden bg-gradient-to-b from-primaryLight to-white py-20"
          aria-labelledby="hero-heading"
        >
          {/* Subtle background texture — soft blurred accent instead of a
              flat wash, so the hero doesn't read identically to the other
              light-blue sections on the page (report §4.4) */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            {/* Serif headline echoes the brand's existing serif wordmark
                (already used for the logo/footer name) and is sized up for
                more visual weight (report §4.4) */}
            <h1
              id="hero-heading"
              className="font-serif text-5xl md:text-6xl font-bold text-primary mb-6"
            >
              Compassionate Home Health Care in Bedford, TX
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

            {/* Call is the higher-intent action for healthcare leads, so
                it's the solid primary button; messaging is secondary
                (report §1.2) */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:8172858515"
                className={buttonClasses}
              >
                Call Us: (817) 285-8515
              </a>

              <a
                href="#contact"
                className={buttonOutlineClasses}
              >
                Message Us
              </a>
            </div>

            {/* Trust bar (report §1.3) */}
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10 text-sm text-gray-700">
              {trustBadges.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon
                    className="w-4 h-4 text-primary"
                    aria-hidden="true"
                  />
                  {label}
                </li>
              ))}
            </ul>
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

              <p className="text-gray-800 leading-relaxed mb-8">
                At <strong>Restorative Care HHS</strong>, we believe everyone
                deserves comfort and dignity at home. Our skilled nurses and
                compassionate caregivers are dedicated to helping each client
                live with independence, safety, and respect.
              </p>

              {/* Mission broken into scannable bullets instead of a dense
                  paragraph (report §2.2) */}
              <ul className="grid sm:grid-cols-3 gap-6 mb-8">
                {missionHighlights.map(({ icon: Icon, title, text }) => (
                  <li key={title}>
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primaryLight text-primary mb-3">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="text-gray-800 leading-relaxed mb-8">
                Whether it’s daily living assistance, therapy, or specialized
                medical care, our team is here for you. We bring care and
                compassion together, right where it’s needed most.
              </p>

              <RouterLink
                to="/services"
                className={buttonOutlineClasses}
                onClick={() => window.scrollTo(0, 0)}
              >
                Learn About Our Services →
              </RouterLink>
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
              className="text-3xl font-semibold text-primary text-center mb-4"
            >
              Our Home Health Services
            </h2>

            <p className="text-center text-gray-700 max-w-2xl mx-auto mb-8">
              Care falls into two categories, depending on what your loved
              one needs.
            </p>

            {/* "At a glance" quick-scan strip (report §4.6) — a light
                version scoped to the taxonomy that's actually live today.
                The full 4-path comparison (adding HHA/PAS/Private Duty)
                belongs on the dedicated Services page once that page is
                rebuilt off the old, retired Home Health/PAS/Private Duty
                structure — building it there now would mean building on
                a page structure the plan already marked as retired. */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
              <a
                href="#skilled-services"
                className={`block bg-white rounded-xl p-5 text-left shadow-sm hover:shadow-brand hover:-translate-y-0.5 transition-all duration-200 ${focusClasses}`}
              >
                <span className="block font-semibold text-gray-900 mb-1">
                  Skilled Services
                </span>
                <span className="block text-sm text-gray-700">
                  Best for recovering from an illness, injury, or surgery, or
                  managing an ongoing medical condition at home.
                </span>
              </a>

              <a
                href="#personal-care-services"
                className={`block bg-white rounded-xl p-5 text-left shadow-sm hover:shadow-brand hover:-translate-y-0.5 transition-all duration-200 ${focusClasses}`}
              >
                <span className="block font-semibold text-gray-900 mb-1">
                  Personal Care Services
                </span>
                <span className="block text-sm text-gray-700">
                  Best for help with daily living &mdash; bathing, dressing,
                  grooming, and mobility &mdash; through Medicaid.
                </span>
              </a>
            </div>

            {/* Skilled Services */}
            <div id="skilled-services" className="mb-16 scroll-mt-24">
              <h3 className="text-lg font-semibold text-primary border-b-2 border-primary pb-2 mb-8 inline-block">
                Skilled Services
              </h3>

              <div className="flex flex-wrap justify-center gap-8">
                {skilledServices.map(({ icon: Icon, title, text }) => (
                  <article
                    key={title}
                    className="bg-white p-8 rounded-2xl shadow-brand hover:shadow-brand-hover hover:-translate-y-0.5 transition-all duration-200 text-left flex-1 basis-[280px] max-w-sm"
                  >
                    <Icon
                      className="w-10 h-10 text-primary mb-4"
                      aria-hidden="true"
                    />

                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {title}
                    </h4>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Personal Care / Non-Skilled Services */}
            <div id="personal-care-services" className="scroll-mt-24">
              <h3 className="text-lg font-semibold text-primary border-b-2 border-primary pb-2 mb-2 inline-block">
                Personal Care Services (Non-Skilled)
              </h3>

              <p className="text-sm text-gray-700 mb-8">
                Available through Long-Term Care via Texas Medicaid.
              </p>

              <div className="flex flex-wrap justify-center gap-8">
                {nonSkilledServices.map(({ icon: Icon, title, text }) => (
                  <article
                    key={title}
                    className="bg-white p-8 rounded-2xl shadow-brand hover:shadow-brand-hover hover:-translate-y-0.5 transition-all duration-200 text-left flex-1 basis-[280px] max-w-sm"
                  >
                    <Icon
                      className="w-10 h-10 text-primary mb-4"
                      aria-hidden="true"
                    />

                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {title}
                    </h4>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <RouterLink
                to="/services"
                className={buttonClasses}
                onClick={() => window.scrollTo(0, 0)}
              >
                Learn More About Our Services
              </RouterLink>

              {/* Cross-link to Insurance & Payers (report §4.6) — each
                  service's payer note relates directly to that section */}
              <p className="mt-4 text-sm text-gray-700">
                Wondering if we accept your insurance?{" "}
                <a
                  href="#insurance"
                  className={`text-primary underline underline-offset-4 hover:text-primary/80 ${focusClasses}`}
                >
                  See Insurance &amp; Payers we accept →
                </a>
              </p>
            </div>
          </div>
        </section>

        <InsuranceSection />

        {/* Contact Form */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-20 bg-white
          
                             bg-gradient-to-b from-white to-primaryLight
         py-20
       border-t border-gray-200
       "
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* <h2
              id="contact-heading"
              className="text-3xl font-semibold text-primary mb-8 text-center"
            >
              Contact Us
            </h2> */}

            <ContactForm />
          </div>
        </section>

        {/* Contact CTA */}
        <section
          className="py-20 bg-gray-50
          

        "
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

              <p className="text-gray-800 mb-6 leading-relaxed">
                We’re here to answer your questions and help you find the best
                care plan for your loved ones.
              </p>

              {/* Quick-link pills (report §3.18) */}
              <div className="flex flex-wrap gap-3 mb-8">
                <RouterLink
                  to="/services"
                  className={`${pillClasses} ${focusClasses}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Skilled Services
                </RouterLink>

                <a
                  href="#services"
                  className={`${pillClasses} ${focusClasses}`}
                >
                  Personal Care
                </a>

                <RouterLink
                  to="/veterans"
                  className={`${pillClasses} ${focusClasses}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Veteran Services
                </RouterLink>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:8172858515"
                  className={buttonClasses}
                >
                  Call Us Today: (817) 285-8515
                </a>

                <a
                  href="#contact"
                  className={buttonOutlineClasses}
                >
                  Message Us
                </a>
              </div>
            </div>

            <div>
              <img
                src={nurseCall}
                alt="A medical care coordinator taking a phone call to assist a patient's family"
                className="rounded-2xl shadow-md w-full object-cover"
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
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <img
              src={veteransImage}
              alt="A caregiver assisting a veteran client at home"
              className="rounded-2xl shadow-md w-full order-first md:order-last"
              loading="lazy"
            />

            <div className="text-center md:text-left">
              <h2
                id="veterans-heading"
                className="text-3xl md:text-4xl font-bold text-primary mb-4"
              >
                Quality Home Care for Veterans
              </h2>

              <p className="text-gray-800 mb-8 leading-relaxed">
                Restorative Care Home Health Services provides compassionate
                respite and homemaker caregiving services for veterans under
                VCA and TriWest agreements. We help veterans maintain
                independence, comfort, and dignity at home with personalized
                care tailored to each individual.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <RouterLink
                  to="/veterans"
                  className={buttonClasses}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Learn More About Veteran Services
                </RouterLink>

                <a
                  href="https://www.restorativecarehhs.com/careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonOutlineClasses}
                  aria-label="Join Our Care Team — opens careers page in a new tab"
                >
                  Join Our Care Team
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Tips From Our Team — live Facebook feed (report §4.10).
            Supportive/supplementary content, so it sits after the main
            CTAs and just before the footer rather than competing with
            them for attention. */}
        <section
          className="py-20 bg-primaryLight"
          aria-labelledby="tips-heading"
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2
              id="tips-heading"
              className="text-3xl font-semibold text-primary mb-4"
            >
              Tips From Our Team
            </h2>

            <p className="text-gray-700 mb-10 leading-relaxed">
              We regularly share home health tips, caregiving advice, and
              agency updates on Facebook — follow along for more.
            </p>

            <FacebookFeedEmbed />

            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonOutlineClasses} mt-10`}
            >
              Follow Us on Facebook
            </a>
          </div>
        </section>
      </main>
    </>
  );
}