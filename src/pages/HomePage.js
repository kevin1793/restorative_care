import { PHONE_HREF, PHONE_DISPLAY } from "../siteInfo";
import React from "react";
import {
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
  ArrowDown,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

import nurseImage1 from "../assets/images/nurse_care1.webp";
import nurseCall from "../assets/images/calling.webp";
import veteransImage from "../assets/images/veterans.webp";
import Seo from "../components/Seo";
import ContactForm from "../components/ContactForm";
import InsuranceSection from "../components/InsuranceSection";
import FacebookFeedEmbed, {
  FACEBOOK_PAGE_URL,
} from "../components/FacebookFeedEmbed";

// One service in the "Our Home Health Services" section. Fixed rem width
// (instead of a grid with breakpoints) so cards wrap by how much room there is
// and how large the visitor's text size is: three across on a wide screen,
// two or one as the screen narrows or text grows, with the last row centered.
function ServiceCard({ icon: Icon, title, text }) {
  return (
    <article className="w-full max-w-md md:w-[17rem] rounded-2xl border border-primary/10 bg-white p-6 text-left transition-colors duration-200 hover:border-primary/30 hover:shadow-brand">
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primaryLight text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>

      <h4 className="mb-2 text-lg font-semibold text-gray-900">{title}</h4>

      <p className="text-sm leading-relaxed text-gray-700">{text}</p>
    </article>
  );
}

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
    px-4 py-2.5 min-h-[44px] rounded-full
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

  const trustBadges = [
    { icon: ShieldCheck, label: "Licensed by Texas HHSC" },
    { icon: MapPinned, label: "Serving the DFW Metroplex" },
    { icon: BadgeCheck, label: "Medicare & Medicaid Accepted" },
  ];

  return (
    <>
      <Seo path="/" />

      {/* Main Content */}
      <div className="pt-[var(--nav-h,87px)]">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden bg-gradient-to-b from-primaryLight to-white pt-12 pb-8 md:py-20"
          aria-labelledby="hero-heading"
        >
          {/* Subtle background texture — soft blurred accent instead of a
              flat wash, so the hero doesn't read identically to the other
              light-blue sections on the page (report §4.4) */}
          <div
            className="hero-glow absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            {/* Keyword-rich h1 is visually hidden (sr-only) but stays in the
                page for search engines and screen readers; the script
                tagline below is the visible hero text. */}
            <h1 id="hero-heading" className="sr-only">
              Compassionate Home Health Care in Bedford, TX
            </h1>

            {/* Visible hero tagline (decorative duplicate of the h1 message) */}
            <p
              style={{ "--i": 0 }}
              className="hero-rise font-fancy text-xl min-[400px]:text-2xl sm:text-4xl md:text-5xl text-balance !leading-[1.8] font-bold text-primary mb-6"
              aria-hidden="true"
            >
              Compassionate Care, Right at Home in the DFW Area
            </p>

            <p
              style={{ "--i": 1 }}
              className="hero-rise text-gray-800 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              We provide professional, personalized home health services that
              support comfort, dignity, and independence.
            </p>

            {/* Call is the higher-intent action for healthcare leads, so
                it's the solid primary button; messaging is secondary
                (report §1.2) */}
            <div
              style={{ "--i": 2 }}
              className="hero-rise flex flex-wrap justify-center gap-4"
            >
              <a
                href={PHONE_HREF}
                className={buttonClasses}
              >
                Call Us: {PHONE_DISPLAY}
              </a>

              <a
                href="#contact"
                className={buttonOutlineClasses}
              >
                Message Us
              </a>
            </div>

            {/* Trust bar (report §1.3) */}
            <ul
              style={{ "--i": 3 }}
              className="hero-rise flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10 text-sm text-gray-700"
            >
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
          className="py-12 md:py-20 bg-white"
          aria-labelledby="about-heading"
        >
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <img
              src={nurseImage1}
              alt="A skilled home health nurse providing compassionate care to an elderly patient in their home"
              width="799"
              height="533"
              className="rounded-2xl shadow-md w-full"
              loading="lazy"
            />

            <div>
              <h2
                id="about-heading"
                className="text-2xl sm:text-3xl font-semibold text-primary mb-4"
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
              <ul className="grid sm:grid-cols-3 gap-5 sm:gap-6 mb-8">
                {missionHighlights.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-start gap-4 sm:block">
                    <span className="inline-flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-primaryLight text-primary sm:mb-3">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {text}
                      </p>
                    </div>
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
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
              >
                Learn About Our Services →
              </RouterLink>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-14 md:py-20 bg-primaryLight"
          aria-labelledby="services-heading"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2
                id="services-heading"
                className="text-2xl sm:text-3xl font-semibold text-primary mb-3"
              >
                Our Home Health Services
              </h2>

              <p className="text-gray-700 max-w-2xl mx-auto mb-7">
                Care falls into two categories, depending on what your loved
                one needs.
              </p>

              {/* Quick-move buttons: scroll to each category below */}
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#skilled-services"
                  className={`inline-flex items-center gap-2 min-h-[44px] rounded-full border border-primary/25 bg-white px-5 py-2 font-medium text-primary hover:bg-primary hover:text-white transition-colors duration-200 ${focusClasses}`}
                >
                  Skilled Services
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="#personal-care-services"
                  className={`inline-flex items-center gap-2 min-h-[44px] rounded-full border border-primary/25 bg-white px-5 py-2 font-medium text-primary hover:bg-primary hover:text-white transition-colors duration-200 ${focusClasses}`}
                >
                  Personal Care Services
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Skilled Services */}
            <div id="skilled-services" className="mb-16 md:mb-20">
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-2">
                  Skilled Services
                </h3>

                <p className="text-gray-700 max-w-xl mx-auto">
                  Best for recovering from an illness, injury, or surgery, or
                  managing an ongoing medical condition at home.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-5">
                {skilledServices.map((service) => (
                  <ServiceCard key={service.title} {...service} />
                ))}
              </div>
            </div>

            {/* Personal Care & Long-Term Support Services — client-supplied
                wording (Nov 2026) for Medicaid LTSS / STAR+PLUS and MCOs.
                The HHA card that used to sit here was dropped: HHA is billed
                through Medicare (see the Services page), not Medicaid. */}
            <div id="personal-care-services">
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-3">
                  Personal Care &amp; Long-Term Support Services
                </h3>

                <p className="text-gray-700 max-w-2xl mx-auto mb-3 leading-relaxed">
                  We provide compassionate, non-skilled personal care
                  assistance to help individuals remain safe, comfortable, and
                  independent in their homes.
                </p>

                <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  Our services include assistance with bathing, dressing,
                  grooming, mobility, meal preparation, and other activities of
                  daily living.
                </p>
              </div>

              <article className="max-w-3xl mx-auto rounded-2xl border border-primary/10 bg-white p-6 sm:p-8 text-left transition-colors duration-200 hover:border-primary/30 hover:shadow-brand">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primaryLight text-primary">
                    <ClipboardCheck className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">
                      Medicaid &amp; Managed Care Coverage
                    </h4>

                    <p className="mb-3 text-gray-700 leading-relaxed">
                      Personal care services may be available to eligible
                      individuals through Texas Medicaid Long-Term Services and
                      Supports (LTSS), including STAR+PLUS and participating
                      Managed Care Organizations (MCOs).
                    </p>

                    <p className="mb-4 text-gray-700 leading-relaxed">
                      Our team works with clients, families, and care
                      coordinators to coordinate authorized personal care
                      services.
                    </p>

                    <p className="border-t border-gray-200 pt-4 text-sm text-gray-700 leading-relaxed">
                      Coverage and services are subject to Medicaid
                      eligibility, health plan participation, and authorization
                      requirements.
                    </p>
                  </div>
                </div>
              </article>

              {/* Lands on the Personal Care section of the Services page
                  (RouteAnnouncer in App.js scrolls to the #hash target) */}
              <div className="mt-8 text-center">
                <RouterLink
                  to="/services#personal-care-heading"
                  className={buttonOutlineClasses}
                >
                  Learn More About Personal Care Services
                </RouterLink>
              </div>
            </div>

            <div className="mt-14 text-center">
              <RouterLink
                to="/services"
                className={buttonClasses}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
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
          aria-labelledby="contact-form-heading"
          className="py-12 md:py-20 bg-gradient-to-b from-white to-primaryLight border-t border-gray-200"
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* <h2
              id="contact-heading"
              className="text-2xl sm:text-3xl font-semibold text-primary mb-8 text-center"
            >
              Contact Us
            </h2> */}

            <ContactForm />
          </div>
        </section>

        {/* Contact CTA */}
        <section
          className="py-12 md:py-20 bg-gray-50
          

        "
          aria-labelledby="cta-heading"
        >
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Phone
                  className="w-8 h-8 text-primary mr-3"
                  aria-hidden="true"
                />

                <h2
                  id="cta-heading"
                  className="text-2xl sm:text-3xl font-semibold text-primary"
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
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
                >
                  Skilled Services
                </RouterLink>

                <a
                  href="#personal-care-services"
                  className={`${pillClasses} ${focusClasses}`}
                >
                  Personal Care
                </a>

                <RouterLink
                  to="/veterans"
                  className={`${pillClasses} ${focusClasses}`}
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
                >
                  Veteran Services
                </RouterLink>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={PHONE_HREF}
                  className={buttonClasses}
                >
                  Call Us Today: {PHONE_DISPLAY}
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
                width="612"
                height="408"
                className="rounded-2xl shadow-md w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Veterans Section */}
        <section
          className="py-12 md:py-20 bg-primaryLight"
          aria-labelledby="veterans-heading"
        >
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <img
              src={veteransImage}
              alt="A caregiver assisting a veteran client at home"
              width="1000"
              height="688"
              className="rounded-2xl shadow-md w-full order-first md:order-last"
              loading="lazy"
            />

            <div className="text-center md:text-left">
              <h2
                id="veterans-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4"
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
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
                >
                  Learn More About Veteran Services
                </RouterLink>

                <a
                  href="https://restorativecarehhs.com/careers/"
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
          className="py-12 md:py-20 bg-primaryLight"
          aria-labelledby="tips-heading"
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2
              id="tips-heading"
              className="text-2xl sm:text-3xl font-semibold text-primary mb-4"
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
      </div>
    </>
  );
}