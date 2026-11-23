import { PHONE_HREF, PHONE_DISPLAY, EMAIL, EMAIL_HREF, ADDRESS_FULL } from "../siteInfo";
import React from "react";
import Seo from "../components/Seo";
import { Link as RouterLink } from "react-router-dom";

const linkClasses =
  "text-primary underline underline-offset-4 hover:text-primary/80 rounded-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2";

export default function AccessibilityStatementPage() {
  return (
    <>
      <Seo path="/accessibility" />

      <div className="pt-[var(--nav-h,87px)]">
        <section
          className="py-12 md:py-20 bg-white"
          aria-labelledby="accessibility-heading"
        >
          <div className="max-w-3xl mx-auto px-6">
            <h1
              id="accessibility-heading"
              style={{ "--i": 0 }}
              className="hero-rise text-3xl sm:text-4xl font-bold text-primary mb-4"
            >
              Accessibility Statement
            </h1>

            <p
              style={{ "--i": 1 }}
              className="hero-rise text-sm text-gray-700 mb-10"
            >
              Last updated: November 21, 2026
            </p>

            <div className="space-y-8 text-gray-800 leading-relaxed">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Our Commitment
                </h2>
                <p>
                  Restorative Care Home Health Services, Inc. is committed to
                  making our website usable by everyone, including people with
                  disabilities and older adults. We work to meet the Web
                  Content Accessibility Guidelines (WCAG) 2.1, Level AA, the
                  standard used by federal accessibility rules for health care
                  providers.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  What We Do
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Text size and contrast controls.</strong> Use the
                    accessibility button at the bottom-left of every page to
                    enlarge text, switch to high contrast, or underline all
                    links. Your choices are remembered on your device.
                  </li>
                  <li>
                    <strong>Keyboard access.</strong> Every page can be used
                    with a keyboard alone, with a visible focus indicator and a
                    "Skip to main content" link at the top of each page.
                  </li>
                  <li>
                    <strong>Screen reader support.</strong> We use clear page
                    titles, headings, landmarks, labeled form fields, and text
                    descriptions for meaningful images.
                  </li>
                  <li>
                    <strong>Readable design.</strong> Larger base text, strong
                    color contrast, and layouts that adapt to phones, tablets,
                    and zoomed screens without sideways scrolling.
                  </li>
                  <li>
                    <strong>Respect for your settings.</strong> We honor
                    reduced-motion preferences and never play audio or video
                    automatically.
                  </li>
                  <li>
                    <strong>Ongoing testing.</strong> We check our pages with
                    automated accessibility tools and manual keyboard review
                    whenever we make changes.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Known Limitations
                </h2>
                <p>
                  Some content comes from other companies and may not be fully
                  accessible, including our embedded Facebook feed, the Google
                  map on our Contact page, and the logos shown for insurance
                  providers. If you have trouble with any of these, contact us
                  and we will give you the same information another way.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Other Ways to Reach Us
                </h2>
                <p>
                  You never need to use this website to get care or
                  information. We can help by phone, and we can provide
                  information in other formats, such as large print or audio,
                  on request. Callers who are deaf, hard of hearing, or have a
                  speech disability can reach us through Texas Relay by dialing
                  711.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Feedback and Help
                </h2>
                <p className="mb-4">
                  If you find a barrier on this site, or need content in a
                  different format, please tell us the page and what went
                  wrong. We aim to respond within two business days.
                </p>
                <p>
                  Restorative Care Home Health Services, Inc.
                  <br />
                  {ADDRESS_FULL}
                  <br />
                  Phone:{" "}
                  <a href={PHONE_HREF} className={linkClasses}>
                    {PHONE_DISPLAY}
                  </a>
                  <br />
                  Email:{" "}
                  <a
                    href={EMAIL_HREF}
                    className={linkClasses}
                  >
                    {EMAIL}
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Your Rights
                </h2>
                <p>
                  Our{" "}
                  <RouterLink
                    to="/nondiscrimination"
                    className={linkClasses}
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
                  >
                    Notice of Nondiscrimination
                  </RouterLink>{" "}
                  explains the free aids and language services available to
                  you and how to file a complaint with us or with the U.S.
                  Department of Health and Human Services.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
