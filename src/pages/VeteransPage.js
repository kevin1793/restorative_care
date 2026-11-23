import React from "react";
import Seo from "../components/Seo";
import veteransHero from "../assets/images/veterans.webp";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import { cardTitle, sectionTitle, sectionY, textLink } from "../ui";

export default function VeteransPage() {
  const linkClasses = textLink;

  // Numbered step timeline instead of a plain stack of headed paragraphs
  // (report §4.7.2). The real VA.gov hrefs are preserved exactly as they
  // were before — only the visual structure changed.
  const steps = [
    {
      title: "Apply for VA Health Care",
      content: (
        <>
          Use{" "}
          <a
            href="https://www.va.gov/find-forms/about-form-10-10ez/"
            className={linkClasses}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open VA Form 10-10EZ application page in a new tab"
          >
            VA Form 10-10EZ
          </a>{" "}
          if you’re a veteran and want to apply for VA health care. You must
          be enrolled in VA health care to receive care at VA facilities or
          have the VA cover your care through a community care provider like
          Restorative Care HHS.
        </>
      ),
    },
    {
      title: "Gather Required Documents",
      content:
        "Prepare important documents including Social Security numbers for you, your spouse, and qualified dependents, military discharge information, insurance cards, and optionally last year’s household income and deductible expense information.",
    },
    {
      title: "Speak With Your VA Case Manager",
      content: (
        <>
          If you are already receiving VA care, speak with your case manager
          about obtaining a caregiver. Eligibility typically requires
          assistance with at least one{" "}
          <strong>Activity of Daily Living (ADL)</strong>, such as:
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>Personal hygiene</li>
            <li>Dressing</li>
            <li>Toileting</li>
            <li>Transferring</li>
            <li>Ambulating</li>
            <li>Eating</li>
          </ul>
        </>
      ),
    },
    {
      title: "Update Existing VA Information",
      content: (
        <>
          Use{" "}
          <a
            href="https://www.va.gov/find-forms/about-form-10-10ezr/"
            className={linkClasses}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open VA Form 10-10EZR update page in a new tab"
          >
            VA Form 10-10EZR
          </a>{" "}
          if you already receive VA health care benefits and need to update
          personal, insurance, or financial information.
        </>
      ),
    },
    {
      title: "Schedule Your Assessment",
      content:
        "Once we receive the referral, we’ll schedule a free in-home assessment to create an individualized care plan. Care services will then be scheduled to begin.",
    },
  ];

  return (
    <>
      <Seo path="/veterans" />


      {/* Main Content */}
      <div className="pt-[var(--nav-h,87px)]">
        {/* Hero Section — shared component (report §4.7.1); also fixes
            the plain black overlay that used to sit here */}
        <PageHero
          title="Quality Home Care for Veterans"
          subtitle="Restorative Care Home Health Services provides compassionate respite and homemaker caregiving services to veterans under VCA and TriWest agreements."
          imageSrc={veteransHero}
          imageAlt=""
        />

        {/* How to Get Care — numbered step timeline (report §4.7.2) */}
        <section
          className={`${sectionY} bg-white`}
          aria-labelledby="care-steps-heading"
        >
          <div className="max-w-3xl mx-auto px-6">
            <h2
              id="care-steps-heading"
              className={`${sectionTitle} text-center`}
            >
              How to Get Care
            </h2>

            <ol className="reveal-blocks relative mt-8">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-5 pb-10 last:pb-0">
                  <span className="relative flex-shrink-0">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-serif font-bold z-10 relative">
                      {i + 1}
                    </span>
                    {i < steps.length - 1 && (
                      <span
                        className="absolute left-1/2 top-10 -translate-x-1/2 w-0.5 bg-primaryLight"
                        style={{ height: "calc(100% + 1.5rem)" }}
                        aria-hidden="true"
                      />
                    )}
                  </span>

                  <div className="text-gray-800 leading-relaxed pt-1.5">
                    <h3 className={`${cardTitle} mb-2`}>
                      {step.title}
                    </h3>
                    <div>{step.content}</div>
                  </div>
                </li>
              ))}
            </ol>

            {/* Additional Info */}
            <div className="pt-6 mt-2 border-t border-gray-200 text-gray-800 leading-relaxed">
              <p>
                For additional information, visit the official{" "}
                <a
                  href="https://www.va.gov/health-care/apply-for-health-care-form-10-10ez/introduction"
                  className={linkClasses}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit the official VA Health Care website in a new tab"
                >
                  VA Health Care Website
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <CtaBand
          id="cta-heading"
          title="Ready to Get Started?"
          text="Contact us to schedule your free in-home assessment and begin your care plan today."
          secondary={{ label: "Send Us a Message", to: "/contact" }}
        />
      </div>
    </>
  );
}