import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service | Restorative Care HHS</title>
        <meta
          name="description"
          content="Terms governing your use of the Restorative Care Home Health Services website."
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

      <main id="main-content" className="pt-16">
        <section className="py-20 bg-white" aria-labelledby="terms-heading">
          <div className="max-w-3xl mx-auto px-6">
            <h1
              id="terms-heading"
              className="text-4xl font-bold text-primary mb-4"
            >
              Terms of Service
            </h1>

            <p className="text-sm text-gray-700 mb-10">
              Last updated: July 21, 2026
            </p>

            <div className="space-y-8 text-gray-800 leading-relaxed">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Purpose of This Website
                </h2>
                <p>
                  This website provides general information about Restorative
                  Care Home Health Services, Inc. and allows visitors to
                  request information about our services. Nothing on this
                  site constitutes medical advice, and using this website
                  does not establish a caregiver-client relationship — that
                  begins only after a formal in-home assessment and care
                  agreement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Use of the Contact Form
                </h2>
                <p>
                  By submitting the contact form, you consent to Restorative
                  Care Home Health Services, Inc. contacting you by phone,
                  email, or text about the services you've requested. Please
                  do not include sensitive medical details in the form — a
                  team member will follow up to discuss your care needs
                  directly and securely.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Accuracy of Information
                </h2>
                <p>
                  We work to keep service, insurance, and coverage
                  information on this site accurate and current, but details
                  can change. Please confirm specifics — including insurance
                  coverage and service availability in your area — directly
                  with our office before making care decisions.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Intellectual Property
                </h2>
                <p>
                  The content, branding, and design of this website belong to
                  Restorative Care Home Health Services, Inc. and may not be
                  reproduced without permission.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Contact Us
                </h2>
                <p>
                  Questions about these terms can be directed to{" "}
                  <a
                    href="mailto:inforestorativecare@gmail.com"
                    className="text-primary underline underline-offset-4"
                  >
                    inforestorativecare@gmail.com
                  </a>{" "}
                  or{" "}
                  <a
                    href="tel:8172858515"
                    className="text-primary underline underline-offset-4"
                  >
                    (817) 285-8515
                  </a>
                  .
                </p>
              </div>

              <p className="text-sm text-gray-700 pt-6 border-t border-gray-200">
                This page is a general-purpose starting point and has not
                been reviewed by an attorney. Restorative Care Home Health
                Services, Inc. should have this page reviewed for
                Texas-specific compliance requirements before relying on it
                as a final legal document.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
