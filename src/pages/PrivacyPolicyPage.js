import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Restorative Care HHS</title>
        <meta
          name="description"
          content="How Restorative Care Home Health Services collects, uses, and protects the personal information you share with us."
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
        <section className="py-20 bg-white" aria-labelledby="privacy-heading">
          <div className="max-w-3xl mx-auto px-6">
            <h1
              id="privacy-heading"
              className="text-4xl font-bold text-primary mb-4"
            >
              Privacy Policy
            </h1>

            <p className="text-sm text-gray-700 mb-10">
              Last updated: July 21, 2026
            </p>

            <div className="space-y-8 text-gray-800 leading-relaxed">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Information We Collect
                </h2>
                <p>
                  When you use our contact form or call our office, we may
                  collect your name, email address, phone number, service
                  interest, insurance/payer information, and any message you
                  choose to share with us. We do not knowingly collect
                  sensitive medical information through this website — please
                  avoid including protected health information in the
                  contact form, and discuss those details with our care team
                  directly by phone.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  How We Use Your Information
                </h2>
                <p>
                  We use the information you provide to respond to your
                  inquiry, schedule a free in-home assessment, and follow up
                  about the services you've requested. We do not sell your
                  personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Third-Party Services
                </h2>
                <p>
                  Our contact form is processed through Formspree, a
                  third-party form service. Some pages on this site may embed
                  content from Facebook or Google, which may set their own
                  cookies or collect visit data independent of this site.
                  Please review those providers' own privacy policies for
                  details.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Your Choices
                </h2>
                <p>
                  You may contact us at any time to ask what information we
                  have on file for you, or to request that we delete it,
                  using the contact information below.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Contact Us
                </h2>
                <p>
                  Restorative Care Home Health Services, Inc.
                  <br />
                  221 Bedford Road Suite 320, Bedford, TX 76022
                  <br />
                  Phone:{" "}
                  <a
                    href="tel:8172858515"
                    className="text-primary underline underline-offset-4"
                  >
                    (817) 285-8515
                  </a>
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:inforestorativecare@gmail.com"
                    className="text-primary underline underline-offset-4"
                  >
                    inforestorativecare@gmail.com
                  </a>
                </p>
              </div>

              <p className="text-sm text-gray-700 pt-6 border-t border-gray-200">
                This policy is a general-purpose starting point and has not
                been reviewed by an attorney. Restorative Care Home Health
                Services, Inc. should have this page reviewed for
                Texas-specific and HIPAA-adjacent compliance requirements
                before relying on it as a final legal document.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
