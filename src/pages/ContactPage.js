import { useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ContactForm from "../components/ContactForm";
import contactHeroImg from "../assets/images/contact_hero.webp";
import PageHero from "../components/PageHero";

export default function ContactPage() {
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
        <title>Contact Us | Restorative Care HHS</title>
        <meta
          name="description"
          content="Reach Restorative Care Home Health Services in Bedford, TX by phone, email, or our contact form to schedule a free in-home assessment."
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
        {/* Hero Section — shared component (report §4.9.1); also fixes
            the off-brand teal overlay that used to sit here */}
        <PageHero
          title="Contact Us"
          subtitle="Reach out with any questions — we’re here to support your care needs with compassion and professionalism."
          imageSrc={contactHeroImg}
          imageAlt=""
        />

        {/* Contact Information */}
        <section
          className="py-20 bg-white"
          aria-labelledby="contact-info-heading"
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2
              id="contact-info-heading"
              className="text-3xl font-semibold text-primary mb-6"
            >
              We’re Here to Help
            </h2>

            <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed mb-4">
              Whether you're exploring home health services, need information
              about insurance, or want assistance creating a personalized care
              plan, our team is ready to guide you every step of the way.
            </p>

            <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed mb-12">
              Not sure if we serve your area?{" "}
              <RouterLink
                to="/service-area"
                className="text-primary underline underline-offset-4 hover:text-primary/80"
                onClick={() => window.scrollTo(0, 0)}
              >
                See the counties we cover
              </RouterLink>
              .
            </p>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-10">
              {/* Phone */}
              <article className="bg-primaryLight p-8 rounded-2xl shadow-brand hover:shadow-brand-hover hover:-translate-y-0.5 transition-all duration-200 text-center">
                <Phone
                  className="w-10 h-10 text-primary mx-auto mb-4"
                  aria-hidden="true"
                />

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Phone
                </h3>

                <a
                  href="tel:8172858515"
                  className={`
                    text-gray-800 underline underline-offset-4
                    hover:text-primary
                    ${focusClasses}
                  `}
                >
                  Call (817) 285-8515
                </a>
              </article>

              {/* Email */}
              <article className="bg-primaryLight p-8 rounded-2xl shadow-brand hover:shadow-brand-hover hover:-translate-y-0.5 transition-all duration-200 text-center">
                <Mail
                  className="w-10 h-10 text-primary mx-auto mb-4"
                  aria-hidden="true"
                />

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Email
                </h3>

                <a
                  href="mailto:inforestorativecare@gmail.com"
                  className={`
                    break-words
                    text-gray-800 underline underline-offset-4
                    hover:text-primary
                    ${focusClasses}
                  `}
                >
                  inforestorativecare@gmail.com
                </a>
              </article>

              {/* Address */}
              <article className="bg-primaryLight p-8 rounded-2xl shadow-brand hover:shadow-brand-hover hover:-translate-y-0.5 transition-all duration-200 text-center">
                <MapPin
                  className="w-10 h-10 text-primary mx-auto mb-4"
                  aria-hidden="true"
                />

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Address
                </h3>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=221+Bedford+Road+Suite+320+Bedford+TX+76022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    text-gray-800 underline underline-offset-4
                    hover:text-primary
                    ${focusClasses}
                  `}
                  aria-label="Open our Bedford office location in Google Maps"
                >
                  221 Bedford Road Suite 320
                  <br />
                  Bedford, TX 76022
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section
          className="py-20 bg-primaryLight"
          aria-labelledby="contact-form-heading"
        >
          <div className="max-w-5xl mx-auto px-6">
            <h2
              id="contact-form-heading"
              className="text-3xl font-semibold text-primary text-center mb-8"
            >
              Send Us a Message
            </h2>

            <ContactForm />
          </div>
        </section>

        {/* Map Section */}
        <section
          className="py-20 bg-white"
          aria-labelledby="map-heading"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2
              id="map-heading"
              className="text-3xl font-semibold text-primary mb-6"
            >
              Our Location
            </h2>

            <p className="text-gray-800 mb-8 leading-relaxed">
              Visit our Bedford office location or contact us to schedule an
              appointment.
            </p>

            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                title="Map showing the Restorative Care HHS office location in Bedford, Texas"
                src="https://www.google.com/maps?q=221+Bedford+Road+Suite+320+Bedford,+TX+76022&output=embed"
                width="100%"
                height="350"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
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
              Need Assistance Right Away?
            </h2>

            <p className="text-gray-800 mb-6 leading-relaxed">
              Call us today to discuss your needs or schedule a free in-home
              assessment.
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