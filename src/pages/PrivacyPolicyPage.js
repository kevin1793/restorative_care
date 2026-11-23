import { PHONE_HREF, PHONE_DISPLAY, EMAIL, EMAIL_HREF, ADDRESS_FULL } from "../siteInfo";
import React from "react";
import Seo from "../components/Seo";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Seo path="/privacy-policy" />


      <div className="pt-[var(--nav-h,87px)]">
        <section className="py-12 md:py-20 bg-white" aria-labelledby="privacy-heading">
          <div className="max-w-3xl mx-auto px-6">
            <h1
              id="privacy-heading"
              style={{ "--i": 0 }}
              className="hero-rise text-3xl sm:text-4xl font-bold text-primary mb-4"
            >
              Privacy Policy
            </h1>

            <p
              style={{ "--i": 1 }}
              className="hero-rise text-sm text-gray-700 mb-10"
            >
              Last updated: November 23, 2026
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
                  about the services you’ve requested. We do not sell your
                  personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Third-Party Services
                </h2>
                <p>
                  Our contact form is processed through Formspree, a
                  third-party form service. Our Contact page embeds a Google
                  map, which may set its own cookies or collect visit data
                  independent of this site. Links to our Facebook Page and to
                  Google Maps take you to those services, which have their
                  own privacy policies.
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
                  {ADDRESS_FULL}
                  <br />
                  Phone:{" "}
                  <a
                    href={PHONE_HREF}
                    className="text-primary underline underline-offset-4"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <br />
                  Email:{" "}
                  <a
                    href={EMAIL_HREF}
                    className="text-primary underline underline-offset-4"
                  >
                    {EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
