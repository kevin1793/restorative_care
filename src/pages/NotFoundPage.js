import { PHONE_HREF, PHONE_DISPLAY } from "../siteInfo";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Seo from "../components/Seo";
import { notFound } from "../seo/routes";
import { button } from "../ui";

const buttonClasses = button("primary");
const buttonOutlineClasses = button("secondary");

// Shown for any URL that isn't a real page. Kept out of search results
// (noindex) and out of the sitemap.
export default function NotFoundPage() {
  return (
    <>
      <Seo title={notFound.title} description={notFound.description} noindex />

      <div className="pt-[var(--nav-h,87px)]">
        <section
          className="py-16 md:py-24 bg-white"
          aria-labelledby="not-found-heading"
        >
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p
              style={{ "--i": 0 }}
              className="hero-rise text-primary font-semibold mb-2"
            >
              Error 404
            </p>

            <h1
              id="not-found-heading"
              style={{ "--i": 1 }}
              className="hero-rise text-3xl sm:text-4xl font-bold text-primary mb-4"
            >
              {notFound.heading}
            </h1>

            <p className="text-gray-800 leading-relaxed mb-8">
              Sorry, we couldn’t find the page you were looking for. It may
              have moved, or the web address may have a typo. You can head
              back to our home page, browse our services, or call us at{" "}
              <a
                href={PHONE_HREF}
                className="text-primary underline underline-offset-4"
              >
                {PHONE_DISPLAY}
              </a>{" "}
              and we’ll be glad to help.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <RouterLink to="/" className={buttonClasses}>
                Go to Home Page
              </RouterLink>
              <RouterLink to="/services" className={buttonOutlineClasses}>
                Our Services
              </RouterLink>
              <RouterLink to="/contact" className={buttonOutlineClasses}>
                Contact Us
              </RouterLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
