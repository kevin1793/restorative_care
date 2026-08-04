import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import veteransHero from "../assets/images/veterans.webp";

export default function VeteransPage() {
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

  const linkClasses = `
    text-primary
    underline
    underline-offset-4
    hover:text-primary/80
    ${focusClasses}
  `;

  return (
    <>
      <Helmet>
        <title>Veteran Services | Restorative Care HHS</title>
        <meta
          name="description"
          content="Restorative Care HHS provides compassionate respite and homemaker caregiving services for veterans under VCA and TriWest agreements. Learn how to get started."
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
      <main id="main-content" className="pt-16">
        {/* Hero Section */}
        <section
          className="
            relative w-full
            min-h-[350px] md:min-h-[650px]
            flex items-center justify-center
            text-center px-6
          "
          aria-labelledby="veterans-hero-heading"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${veteransHero})`,
            }}
            aria-hidden="true"
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            aria-hidden="true"
          />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-white">
            <h1
              id="veterans-hero-heading"
              className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg"
            >
              Quality Home Care for Veterans
            </h1>

            <p className="text-lg md:text-xl leading-relaxed drop-shadow">
              Restorative Care Home Health Services provides compassionate
              respite and homemaker caregiving services to veterans under VCA
              and TriWest agreements.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section
          className="py-20 bg-white"
          aria-labelledby="care-steps-heading"
        >
          <div className="max-w-5xl mx-auto px-6">
            <h2
              id="care-steps-heading"
              className="text-3xl font-semibold text-primary mb-10 text-center"
            >
              How to Get Care
            </h2>

            <div className="space-y-8 text-gray-800 leading-relaxed">
              {/* Step 1 */}
              <article>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Step 1: Apply for VA Health Care
                </h3>

                <p>
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
                  if you’re a veteran and want to apply for VA health care. You
                  must be enrolled in VA health care to receive care at VA
                  facilities or have the VA cover your care through a community
                  care provider like Restorative Care Home Health Services.
                </p>
              </article>

              {/* Step 2 */}
              <article>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Step 2: Gather Required Documents
                </h3>

                <p>
                  Prepare important documents including Social Security numbers
                  for you, your spouse, and qualified dependents, military
                  discharge information, insurance cards, and optionally last
                  year’s household income and deductible expense information.
                </p>
              </article>

              {/* Step 3 */}
              <article>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Step 3: Speak With Your VA Case Manager
                </h3>

                <p>
                  If you are already receiving VA care, speak with your case
                  manager about obtaining a caregiver. Eligibility typically
                  requires assistance with at least one{" "}
                  <strong>Activity of Daily Living (ADL)</strong>, such as:
                </p>

                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Personal hygiene</li>
                  <li>Dressing</li>
                  <li>Toileting</li>
                  <li>Transferring</li>
                  <li>Ambulating</li>
                  <li>Eating</li>
                </ul>
              </article>

              {/* Step 4 */}
              <article>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Step 4: Update Existing VA Information
                </h3>

                <p>
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
                  if you already receive VA health care benefits and need to
                  update personal, insurance, or financial information.
                </p>
              </article>

              {/* Step 5 */}
              <article>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Step 5: Schedule Your Assessment
                </h3>

                <p>
                  Once Restorative Care Home Health Services receives the
                  referral, our agency will schedule a free in-home assessment
                  to create an individualized care plan. Care services will then
                  be scheduled to begin.
                </p>
              </article>

              {/* Additional Info */}
              <div className="pt-6 border-t border-gray-200">
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

            <p className="text-gray-800 mb-6 leading-relaxed">
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