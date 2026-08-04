import React, { useEffect } from "react";
import {
  Stethoscope,
  Activity,
  HeartHandshake,
  MessageCircle,
  Users,
  HeartPulse,
  ClipboardCheck,
  Home,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

import servicesHeroImg from "../assets/images/services.webp";
import nurseImage1 from "../assets/images/nurse_care1.webp";
import PageHero from "../components/PageHero";

// Kept identical to the homepage's Skilled Services copy (report §4.6 —
// the two pages must not contradict each other) so this page can serve as
// the fuller reference without duplicating drafting decisions.
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

// Personal Care Services aren't one program — they're three different
// payer paths (report §4.6, correction from Juice July 23). Each is tied
// to a specific program, not a generic "non-skilled care" bucket.
const payerPaths = [
  {
    icon: HeartPulse,
    title: "Home Health Aide (HHA)",
    payer: "Via Medicare",
    bestFor: "Personal care alongside skilled nursing or therapy",
    text: "A Home Health Aide provides hands-on personal care — like bathing, dressing, and grooming — as part of a Medicare-covered home health plan. This service is only available when a doctor has also ordered skilled care, such as nursing or therapy, for a medical reason. The aide works alongside that skilled team to support daily comfort while the medical needs are being treated. It isn't offered as a standalone service — it comes as part of the larger Medicare home health plan.",
  },
  {
    icon: ClipboardCheck,
    title: "Personal Attendant Services (PAS)",
    payer: "Via Medicaid",
    bestFor: "Ongoing daily-living support, no skilled order needed",
    text: "Personal Attendant Services provide ongoing, hands-on help with everyday tasks — bathing, dressing, meal preparation, light housekeeping, and more — for clients who qualify for long-term care support through Texas Medicaid. Unlike a Home Health Aide, PAS doesn't require a skilled nursing order — it's available on its own for anyone who needs regular help staying safe and independent at home, based on their Medicaid eligibility.",
  },
  {
    icon: Home,
    title: "Private Duty",
    payer: "Private pay",
    bestFor: "Flexible hours, no wait for approval",
    text: "Private Duty care offers the same kind of personal, hands-on support as Personal Attendant Services — help with bathing, dressing, meals, companionship, and more — but is paid for directly by the client or family rather than through Medicaid or Medicare. Families often choose Private Duty when they want more flexible hours, don't qualify for Medicaid's program, or want to begin care right away without waiting through an approval process.",
  },
];

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
      <Helmet>
        <title>Our Services | Restorative Care HHS</title>
        <meta
          name="description"
          content="Explore Restorative Care HHS's home health, personal attendant, and private duty services — skilled nursing, therapy, and daily living support in Bedford, TX."
        />
      </Helmet>

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
        {/* Hero Section — shared component (report §4.6/§4.7.1); also
            fixes the off-brand teal overlay that used to sit here */}
        <PageHero
          title="Our Services"
          subtitle="Restorative Care HHS is dedicated to providing compassionate, professional, and personalized care to support comfort, dignity, and independence at home."
          imageSrc={servicesHeroImg}
          imageAlt=""
        />

        {/* "Which service is right for you?" quick-scan snapshot (report
            §4.6, optional-but-recommended) — safe to build in full now
            that the taxonomy below actually matches it. */}
        <section
          className="py-16 bg-white"
          aria-labelledby="comparison-heading"
        >
          <div className="max-w-5xl mx-auto px-6">
            <h2
              id="comparison-heading"
              className="text-2xl font-semibold text-primary text-center mb-8"
            >
              Which service is right for you?
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a
                href="#skilled-services-heading"
                className={`block bg-white border border-gray-200 rounded-xl p-5 text-left shadow-sm hover:shadow-brand hover:-translate-y-0.5 transition-all duration-200 ${focusClasses}`}
              >
                <span className="block font-semibold text-gray-900 mb-1">
                  Skilled Services
                </span>
                <span className="block text-sm text-gray-700 mb-2">
                  Recovering from illness, injury, or surgery
                </span>
                <span className="inline-block text-xs font-semibold text-primary bg-primaryLight rounded-full px-3 py-1">
                  Medicare &amp; Medicaid
                </span>
              </a>

              {payerPaths.map((path) => (
                <a
                  key={path.title}
                  href="#personal-care-heading"
                  className={`block bg-white border border-gray-200 rounded-xl p-5 text-left shadow-sm hover:shadow-brand hover:-translate-y-0.5 transition-all duration-200 ${focusClasses}`}
                >
                  <span className="block font-semibold text-gray-900 mb-1">
                    {path.title}
                  </span>
                  <span className="block text-sm text-gray-700 mb-2">
                    {path.bestFor}
                  </span>
                  <span className="inline-block text-xs font-semibold text-primary bg-primaryLight rounded-full px-3 py-1">
                    {path.payer}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Skilled Services */}
        <section
          className="py-20 bg-primaryLight"
          aria-labelledby="skilled-services-heading"
        >
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <img
              src={nurseImage1}
              alt="A skilled home health nurse providing compassionate care to an elderly patient in their home"
              className="rounded-2xl shadow-brand w-full order-first md:order-last"
              loading="lazy"
            />

            <div>
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-primary mb-4">
                <Stethoscope className="w-6 h-6" aria-hidden="true" />
              </span>

              <h2
                id="skilled-services-heading"
                className="text-3xl font-semibold text-primary mb-2 scroll-mt-28"
              >
                Skilled Services
              </h2>

              <p className="text-sm font-semibold text-primary mb-4">
                Medicare &amp; Medicaid-certified, clinical care
              </p>

              <p className="text-gray-800 leading-relaxed mb-6">
                Registered nurses and licensed therapists provide medical care
                at home for clients recovering from illness, injury, or
                surgery, or managing an ongoing condition.
              </p>

              <ul className="space-y-4">
                {skilledServices.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3">
                    <Icon
                      className="w-5 h-5 text-primary flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-semibold text-gray-900">
                        {title}
                      </span>
                      <span className="block text-sm text-gray-700">
                        {text}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Personal Care Services (Non-Skilled) — three payer paths, not
            one blended service (report §4.6 correction, July 23) */}
        <section
          className="py-20 bg-white text-center"
          aria-labelledby="personal-care-heading"
        >
          <div className="max-w-5xl mx-auto px-6">
            <h2
              id="personal-care-heading"
              className="text-3xl font-semibold text-primary mb-4 scroll-mt-28"
            >
              Personal Care Services (Non-Skilled)
            </h2>

            <p className="text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
              Non-skilled personal care — help with daily activities like
              bathing, dressing, and meal preparation — can be accessed in
              three different ways, depending on your situation and coverage.
              Here's how each option works:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {payerPaths.map(({ icon: Icon, title, payer, text }) => (
                <article
                  key={title}
                  className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-brand hover:shadow-brand-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon
                    className="w-8 h-8 text-primary mb-3"
                    aria-hidden="true"
                  />

                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {title}
                  </h3>

                  <span className="inline-block text-xs font-semibold text-primary bg-primaryLight rounded-full px-3 py-1 mb-3">
                    {payer}
                  </span>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {text}
                  </p>
                </article>
              ))}
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

            {/* Cross-link to Insurance & Payers on the homepage (report §4.6) */}
            <p className="text-sm text-gray-700 mb-6">
              Wondering if we accept your insurance?{" "}
              <a
                href="/#insurance"
                className={`text-primary underline underline-offset-4 hover:text-primary/80 ${focusClasses}`}
              >
                See Insurance &amp; Payers we accept →
              </a>
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