import { PHONE_HREF, PHONE_DISPLAY, HOURS } from "../siteInfo";
import OpenStatus from "../components/OpenStatus";
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
import FacebookFollowCard from "../components/FacebookFollowCard";
import {
  button,
  cardTitle,
  photo,
  pill,
  sectionTitle,
  sectionY,
  subsectionTitle,
  textLink,
} from "../ui";

// Page order, with backgrounds alternating white / light blue so each
// section is clearly separate:
//   Hero (light-to-white) · Hours strip · About (white) · Services (light)
//   · Veterans (white) · Insurance (light) · Get in Touch (white)
//   · Tips From Our Team (light)

// One service in the "Our Home Health Services" section. Fixed rem width
// (instead of a grid with breakpoints) so cards wrap by how much room there is
// and how large the visitor's text size is: three across on a wide screen,
// two or one as the screen narrows or text grows, with the last row centered.
// Information, not a link, so no hover state.
function ServiceCard({ icon: Icon, title, text }) {
  return (
    <article className="w-full max-w-md md:w-[17rem] rounded-2xl border border-primary/10 bg-white p-6 text-left">
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primaryLight text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>

      <h4 className={`${cardTitle} mb-2`}>{title}</h4>

      <p className="text-sm leading-relaxed text-gray-700">{text}</p>
    </article>
  );
}

export default function HomePage() {
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

  // Quick links in the "Let's Talk" panel: each goes to that service's own
  // section on its detail page
  const careLinks = [
    { label: "Skilled Services", to: "/services#skilled-services-heading" },
    { label: "Personal Care", to: "/services#personal-care-heading" },
    { label: "Veteran Services", to: "/veterans" },
  ];

  return (
    <>
      <Seo path="/" />

      {/* Main Content */}
      <div className="pt-[var(--nav-h,87px)]">
        {/* Hero Section */}
        <section
          // Tighter on phones so the hero, its buttons and the office-hours
          // strip below all fit on a typical phone screen without scrolling
          className="relative overflow-hidden bg-gradient-to-b from-primaryLight to-white pt-8 pb-6 sm:pt-12 sm:pb-8 md:py-20"
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
              className="hero-rise font-fancy text-xl min-[400px]:text-2xl sm:text-4xl md:text-5xl text-balance !leading-[1.8] font-bold text-primary mb-4 sm:mb-6"
              aria-hidden="true"
            >
              Compassionate Care, Right at Home in the DFW Area
            </p>

            <p
              style={{ "--i": 1 }}
              className="hero-rise text-gray-800 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed"
            >
              We provide professional, personalized home health services that
              support comfort, dignity, and independence.
            </p>

            {/* Call is the higher-intent action for healthcare leads, so
                it's the solid primary button; messaging is secondary
                (report §1.2). Side by side on phones too (two equal
                columns); there the call button just says "Call Us", since
                the number doesn't fit in half the width. */}
            <div
              style={{ "--i": 2 }}
              className="hero-rise grid grid-cols-2 gap-3 max-w-sm mx-auto sm:flex sm:flex-wrap sm:justify-center sm:gap-4 sm:max-w-none"
            >
              <a
                href={PHONE_HREF}
                aria-label={`Call us at ${PHONE_DISPLAY}`}
                className={button("primary", "compact")}
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="sm:hidden">Call Us</span>
                <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
              </a>

              <a href="#contact" className={button("secondary", "compact")}>
                Message Us
              </a>
            </div>

            {/* Trust bar (report §1.3) */}
            <ul
              style={{ "--i": 3 }}
              className="hero-rise flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-x-8 sm:gap-y-3 mt-6 sm:mt-10 text-xs sm:text-sm text-gray-700"
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

        {/* Slim office-hours strip: open/closed right now, the regular
            schedule and a holiday note, where families look first. Shows
            nothing until HOURS is set in src/siteInfo.js. */}
        {HOURS && (
          <section
            aria-label="Office hours"
            className="border-y border-primary/10 bg-primaryLight"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
              <OpenStatus layout="inline" />
            </div>
          </section>
        )}

        {/* About Section */}
        <section
          id="about"
          className={`${sectionY} bg-white`}
          aria-labelledby="about-heading"
        >
          {/* Photo + mission text side by side, then the three highlights
              as a full-width row below. The highlights used to sit inside
              the text column, which made it much taller than the photo and
              left big gaps above and below the image. */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <img
                src={nurseImage1}
                alt="A skilled home health nurse providing compassionate care to an elderly patient in their home"
                width="799"
                height="533"
                className={photo}
                loading="lazy"
              />

              <div>
                <h2 id="about-heading" className={sectionTitle}>
                  About Our Mission
                </h2>

                <p className="text-gray-800 leading-relaxed mb-4">
                  At <strong>Restorative Care HHS</strong>, we believe everyone
                  deserves comfort and dignity at home. Our skilled nurses and
                  compassionate caregivers are dedicated to helping each client
                  live with independence, safety, and respect.
                </p>

                <p className="text-gray-800 leading-relaxed mb-8">
                  Whether it’s daily living assistance, therapy, or specialized
                  medical care, our team is here for you. We bring care and
                  compassion together, right where it’s needed most.
                </p>

                <RouterLink to="/services" className={button("secondary")}>
                  Explore Our Services
                </RouterLink>
              </div>
            </div>

            {/* Mission broken into scannable highlights instead of a dense
                paragraph (report §2.2). Tinted panels, not bordered cards:
                they're information, not links, so no hover state. */}
            <ul className="mt-10 md:mt-14 grid sm:grid-cols-3 gap-4 sm:gap-6">
              {missionHighlights.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="flex items-start gap-4 sm:block rounded-2xl bg-primaryLight p-5 sm:p-6"
                >
                  <span className="inline-flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-white text-primary sm:mb-4">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className={`${cardTitle} mb-1`}>{title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className={`${sectionY} bg-primaryLight`}
          aria-labelledby="services-heading"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 id="services-heading" className={sectionTitle}>
                Our Home Health Services
              </h2>

              <p className="text-gray-700 max-w-2xl mx-auto mb-7">
                Care falls into two categories, depending on what your loved
                one needs.
              </p>

              {/* Quick-move buttons: scroll to each category below */}
              <div className="flex flex-wrap justify-center gap-3">
                <a href="#skilled-services" className={pill}>
                  Skilled Services
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>

                <a href="#personal-care-services" className={pill}>
                  Personal Care Services
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Skilled Services */}
            <div id="skilled-services" className="mb-16 md:mb-20">
              <div className="text-center mb-8">
                <h3 className={subsectionTitle}>Skilled Services</h3>

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
                <h3 className={subsectionTitle}>
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

              <article className="max-w-3xl mx-auto rounded-2xl border border-primary/10 bg-white p-6 sm:p-8 text-left">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primaryLight text-primary">
                    <ClipboardCheck className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <div>
                    <h4 className={`${cardTitle} mb-3`}>
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
                  className={button("secondary")}
                >
                  Learn About Personal Care
                </RouterLink>
              </div>
            </div>

            <div className="mt-14 text-center">
              <RouterLink to="/services" className={button("primary")}>
                See All Services
              </RouterLink>

              {/* Cross-link to Insurance & Payers (report §4.6) — each
                  service's payer note relates directly to that section */}
              <p className="mt-4 text-sm text-gray-700">
                Wondering if we accept your insurance?{" "}
                <a href="#insurance" className={textLink}>
                  See Insurance &amp; Payers we accept →
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Veterans Section — right after Services, since it's a service
            line too. Image on the right on desktop so it zigzags with About
            (image left) above; image above the text on phones. */}
        <section
          className={`${sectionY} bg-white`}
          aria-labelledby="veterans-heading"
        >
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <img
              src={veteransImage}
              alt="A caregiver assisting a veteran client at home"
              width="1000"
              height="688"
              className={`${photo} md:order-last`}
              loading="lazy"
            />

            <div className="text-center md:text-left">
              <h2 id="veterans-heading" className={sectionTitle}>
                Quality Home Care for Veterans
              </h2>

              <p className="text-gray-800 mb-8 leading-relaxed">
                We provide compassionate respite and homemaker caregiving
                services for veterans under VCA and TriWest agreements. We help veterans maintain
                independence, comfort, and dignity at home with personalized
                care tailored to each individual.
              </p>

              <RouterLink to="/veterans" className={button("primary")}>
                Learn About Veteran Care
              </RouterLink>
            </div>
          </div>
        </section>

        <InsuranceSection />

        {/* Get in Touch: the contact form, with the "Let's Talk" call panel
            beside it (below it on phones). These used to be two separate
            sections in a row asking for the same thing. */}
        <section
          id="contact"
          aria-labelledby="contact-form-heading"
          className={`${sectionY} bg-white`}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
              <h2 id="contact-form-heading" className={sectionTitle}>
                Get in Touch
              </h2>

              <p className="text-gray-800 leading-relaxed">
                Have questions about our services or need assistance? Fill out
                the form and a member of our care team will reach out shortly.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-3">
                <ContactForm showHeading={false} showIntro={false} />
              </div>

              <aside
                aria-labelledby="talk-heading"
                // Stays in view beside the (much taller) form on desktop
                className="lg:col-span-2 lg:sticky lg:top-[calc(var(--nav-h,5rem)+1.5rem)] overflow-hidden rounded-2xl bg-primaryLight max-w-2xl w-full mx-auto"
              >
                <img
                  src={nurseCall}
                  alt="A medical care coordinator taking a phone call to assist a patient’s family"
                  width="612"
                  height="408"
                  className="w-full aspect-[3/2] object-cover"
                  loading="lazy"
                />

                <div className="p-6 sm:p-8">
                  <h3 id="talk-heading" className={subsectionTitle}>
                    Let’s Talk About Your Care Needs
                  </h3>

                  <p className="text-gray-800 leading-relaxed mb-6">
                    We’re here to answer your questions and help you find the
                    best care plan for your loved ones.
                  </p>

                  <a href={PHONE_HREF} className={`${button("primary")} w-full`}>
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Call {PHONE_DISPLAY}
                  </a>

                  {/* Quick-link pills (report §3.18) */}
                  <p className="mt-6 mb-3 text-sm font-semibold text-gray-900">
                    Explore our care
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {careLinks.map(({ label, to }) => (
                      <RouterLink key={label} to={to} className={pill}>
                        {label}
                      </RouterLink>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Tips From Our Team — follow card for the Facebook Page (report
            §4.10; was a live feed embed, see FacebookFollowCard.js).
            Supportive/supplementary content, so it sits after the main
            CTAs and just before the footer rather than competing with
            them for attention. */}
        <section
          className={`${sectionY} bg-primaryLight`}
          aria-labelledby="tips-heading"
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 id="tips-heading" className={sectionTitle}>
              Tips From Our Team
            </h2>

            <p className="text-gray-700 mb-10 leading-relaxed">
              We regularly share helpful posts on Facebook. Follow along to
              see them as they go up.
            </p>

            <FacebookFollowCard />
          </div>
        </section>
      </div>
    </>
  );
}
