import {
  PHONE_HREF,
  PHONE_DISPLAY,
  EMAIL,
  EMAIL_HREF,
  ADDRESS_STREET,
  ADDRESS_CITY_LINE,
  ADDRESS_FULL,
  MAPS_URL,
} from "../siteInfo";
import { Phone, Mail, MapPin, Navigation } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/Seo";
import OpenStatus from "../components/OpenStatus";

import ContactForm from "../components/ContactForm";
import contactHeroImg from "../assets/images/contact_hero.webp";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import { button, cardTitle, sectionTitle, sectionY, textLink } from "../ui";

const [EMAIL_USER, EMAIL_DOMAIN] = EMAIL.split("@");

export default function ContactPage() {
  return (
    <>
      <Seo path="/contact" />


      {/* Main Content */}
      <div className="pt-[var(--nav-h,87px)]">
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
          className={`${sectionY} bg-white`}
          aria-labelledby="contact-info-heading"
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 id="contact-info-heading" className={sectionTitle}>
              We’re Here to Help
            </h2>

            <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed mb-4">
              Whether you’re exploring home health services, need information
              about insurance, or want assistance creating a personalized care
              plan, our team is ready to guide you every step of the way.
            </p>

            <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12">
              Not sure if we serve your area?{" "}
              <RouterLink
                to="/service-area"
                className={textLink}
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
                  text: (
                    <>
                      Talk with a member of our care team.
                      {/* Only appears once HOURS is set in src/siteInfo.js */}
                      <OpenStatus align="center" className="mt-2" />
                    </>
                  ),
                  action: (
                    <a
                      href={PHONE_HREF}
                      className={`${button("primary")} w-full`}
                    >
                      <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                      Call {PHONE_DISPLAY}
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
                        {EMAIL_USER}@
                        <wbr />
                        {EMAIL_DOMAIN}
                      </span>
                    </>
                  ),
                  action: (
                    <a
                      href={EMAIL_HREF}
                      className={`${button("secondary")} w-full`}
                    >
                      <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                      Send an Email
                    </a>
                  ),
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  text: (
                    <>
                      {ADDRESS_STREET}
                      <br />
                      {ADDRESS_CITY_LINE}
                    </>
                  ),
                  action: (
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${button("secondary")} w-full`}
                      aria-label="Get directions to our Bedford office in Google Maps — opens in a new tab"
                    >
                      <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
                      Get Directions
                    </a>
                  ),
                },
              ].map(({ icon: Icon, title, text, action }) => (
                <article
                  key={title}
                  className="min-w-0 flex flex-col items-center bg-white border border-primary/10 p-6 sm:p-8 rounded-2xl shadow-brand"
                >
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primaryLight text-primary mb-4">
                    <Icon className="w-8 h-8" aria-hidden="true" />
                  </span>

                  <h3 className={`${cardTitle} mb-2`}>{title}</h3>

                  <p className="text-gray-700 leading-relaxed mb-6">{text}</p>

                  <div className="mt-auto w-full">{action}</div>
                </article>
              ))}
            </div>

            <p className="mt-8 text-gray-700">
              Prefer to write?{" "}
              <a
                href="#send-message"
                className={textLink}
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
          className={`${sectionY} bg-primaryLight`}
          aria-labelledby="contact-form-heading"
        >
          <div className="max-w-5xl mx-auto px-6">
            <h2
              id="contact-form-heading"
              className={`${sectionTitle} text-center`}
            >
              Send Us a Message
            </h2>

            <ContactForm showHeading={false} />
          </div>
        </section>

        {/* Map Section */}
        <section
          className={`${sectionY} bg-white`}
          aria-labelledby="map-heading"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 id="map-heading" className={sectionTitle}>
              Our Location
            </h2>

            <p className="text-gray-800 mb-8 leading-relaxed">
              Visit our Bedford office location or contact us to schedule an
              appointment.
            </p>

            <div className="rounded-2xl overflow-hidden shadow-brand">
              <iframe
                title="Map showing the Restorative Care HHS office location in Bedford, Texas"
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_FULL)}&output=embed`}
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

        <CtaBand
          id="cta-heading"
          title="Need Assistance Right Away?"
          text="Call us today to discuss your needs or schedule a free in-home assessment."
        />
      </div>
    </>
  );
}