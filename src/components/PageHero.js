import React from "react";

// Shared hero banner for dedicated pages (Services, Veterans, Contact, and
// future pages) — report §4.7.1. Consolidates three previously bespoke
// heroes that each had their own inconsistent overlay color (an off-brand
// teal, a plain black, etc.) into one navy-gradient treatment that matches
// the rest of the site, and guarantees new pages stay visually consistent
// automatically instead of needing a one-off hero built each time.
export default function PageHero({ title, subtitle, imageSrc, imageAlt }) {
  return (
    <section
      className="relative w-full h-80 md:h-96 flex items-center justify-center text-center px-6 overflow-hidden"
      aria-labelledby="page-hero-heading"
    >
      <img
        src={imageSrc}
        alt={imageAlt || ""}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/85 to-primaryDark/85"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h1
          id="page-hero-heading"
          className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
        >
          {title}
        </h1>

        {subtitle && (
          <p className="text-white max-w-2xl mx-auto text-lg md:text-xl leading-relaxed drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
