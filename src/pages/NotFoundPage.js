import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Seo from "../components/Seo";
import { notFound } from "../seo/routes";

const focusClasses =
  "focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary";

const buttonClasses = `inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors duration-200 ${focusClasses}`;

const buttonOutlineClasses = `inline-flex items-center justify-center bg-white text-primary border-2 border-primary px-6 py-3 rounded-full font-medium hover:bg-primaryLight transition-colors duration-200 ${focusClasses}`;

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
            <p className="text-primary font-semibold mb-2">Error 404</p>

            <h1
              id="not-found-heading"
              className="text-3xl sm:text-4xl font-bold text-primary mb-4"
            >
              {notFound.heading}
            </h1>

            <p className="text-gray-800 leading-relaxed mb-8">
              Sorry, we couldn't find the page you were looking for. It may
              have moved, or the web address may have a typo. You can head
              back to our home page, browse our services, or call us at{" "}
              <a
                href="tel:8172858515"
                className="text-primary underline underline-offset-4"
              >
                (817) 285-8515
              </a>{" "}
              and we'll be glad to help.
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
