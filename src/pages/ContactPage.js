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


      {/* Main Content */}
      <div className="pt-[87px] xl:pt-[94px]">
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
          className="py-12 md:py-20 bg-gradient-to-b from-white to-primaryLight"
          aria-labelledby="contact-info-heading"
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary/80 mb-3">
              Get in touch
            </p>

            <h2
              id="contact-info-heading"
              className="text-2xl sm:text-3xl font-semibold text-primary mb-5"
            >
              We’re Here to Help
            </h2>

            <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed mb-4">
              Whether you're exploring home health services, need information
              about insurance, or want assistance creating a personalized care
              plan, our team is ready to guide you every step of the way.
            </p>

            <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12">
              Not sure if we serve your area?{" "}
              <RouterLink
                to="/service-area"
                className={`text-primary underline underline-offset-4 hover:text-primary/80 rounded-sm ${focusClasses}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                See the counties we cover
              </RouterLink>
              .
            </p>

            {/* Contact Cards — each ends in a clear action button */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 text-center max-w-md lg:max-w-none mx-auto">
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  text: "Talk with a member of our care team.",
                  action: (
                    <a
                      href="tel:8172858515"
                      className={`inline-flex items-center justify-center gap-2 w-full min-h-[48px] px-5 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors ${focusClasses}`}
                    >
                      <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                      (817) 285-8515
                    </a>
                  ),
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  text: (
                    <>
                      Send your questions to
                      <br />
                      <span className="font-medium text-gray-900">
                        inforestorativecare@
                        <wbr />
                        gmail.com
                      </span>
                    </>
                  ),
                  action: (
                    <a
                      href="mailto:inforestorativecare@gmail.com"
                      className={`inline-flex items-center justify-center gap-2 w-full min-h-[48px] px-5 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primaryLight transition-colors ${focusClasses}`}
                    >
                      <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                      Send an email
                    </a>
                  ),
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  text: (
                    <>
                      221 Bedford Road Suite 320
                      <br />
                      Bedford, TX 76022
                    </>
                  ),
                  action: (
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=221+Bedford+Road+Suite+320+Bedford+TX+76022"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 w-full min-h-[48px] px-5 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primaryLight transition-colors ${focusClasses}`}
                      aria-label="Get directions to our Bedford office in Google Maps — opens in a new tab"
                    >
                      Get directions
                    </a>
                  ),
                },
              ].map(({ icon: Icon, title, text, action }) => (
                <article
                  key={title}
                  className="min-w-0 flex flex-col items-center bg-white border border-primary/10 p-6 sm:p-8 rounded-2xl shadow-brand hover:shadow-brand-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primaryLight text-primary mb-4">
                    <Icon className="w-8 h-8" aria-hidden="true" />
                  </span>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-6">{text}</p>

                  <div className="mt-auto w-full">{action}</div>
                </article>
              ))}
            </div>

            <p className="mt-8 text-gray-700">
              Prefer to write?{" "}
              <a
                href="#send-message"
                className={`text-primary underline underline-offset-4 hover:text-primary/80 rounded-sm ${focusClasses}`}
              >
                Send us a message below
              </a>
              .
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section
          id="send-message"
          className="scroll-mt-24 py-12 md:py-20 bg-primaryLight"
          aria-labelledby="contact-form-heading"
        >
          <div className="max-w-5xl mx-auto px-6">
            <h2
              id="contact-form-heading"
              className="text-2xl sm:text-3xl font-semibold text-primary text-center mb-8"
            >
              Send Us a Message
            </h2>

            <ContactForm showHeading={false} />
          </div>
        </section>

        {/* Map Section */}
        <section
          className="py-12 md:py-20 bg-white"
          aria-labelledby="map-heading"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2
              id="map-heading"
              className="text-2xl sm:text-3xl font-semibold text-primary mb-6"
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
          className="py-10 md:py-16 bg-primaryLight text-center"
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
      </div>
    </>
  );
}