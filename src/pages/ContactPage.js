import { useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "../components/ContactForm";
import contactHeroImg from "../assets/images/contact_hero.jpg";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-10">

      {/* Hero / Header */}
      <section
        className="relative w-full h-[350px] md:h-[650px] flex items-center justify-center text-center px-6"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${contactHeroImg})` }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-teal-900/50"></div>

        {/* Text Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl drop-shadow">
            Reach out with any questions — we’re here to support your care needs 
            with compassion and professionalism.
          </p>
        </div>
      </section>

      {/* Contact Info + Description */}
      <section className="pt-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-primary mb-6">
            We're Here to Help
          </h2>

          <p className="text-gray-600 max-w-2xl leading-relaxed mb-8">
            Whether you're exploring home health services, need information about 
            insurance, or want assistance creating a personalized care plan, our 
            team is ready to guide you every step of the way.
          </p>

          {/* Contact Boxes */}
          <div className="grid md:grid-cols-3 gap-10 mt-4 w-full">
            {/* Phone */}
            <div className="bg-primaryLight p-8 rounded-2xl shadow text-center">
              <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Phone
              </h3>
              <a
                href="tel:8172858515"
                className="text-gray-700 hover:text-primary"
              >
                (817) 285-8515
              </a>
            </div>

            {/* Email */}
            <div className="bg-primaryLight p-8 rounded-2xl shadow text-center">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Email
              </h3>
              <a
                href="mailto:inforestorativecare@gmail.com"
                className="text-gray-700 hover:text-primary"
              >
                inforestorativecare@gmail.com
              </a>
            </div>

            {/* Address */}
            <div className="bg-primaryLight p-8 rounded-2xl shadow text-center">
            <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Address
            </h3>
            <a
              href="https://www.google.com/maps/search/?api=1&query=221+Bedford+Road+Suite+320+Bedford+TX+76022"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary"
            >
              221 Bedford Road Suite 320
              <br /> Bedford, TX 76022
            </a>
          </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      {/* <section className="py-20 bg-primaryLight">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-primary text-center mb-8">
            Send Us a Message
          </h2>
          <ContactForm />
        </div>
      </section> */}

      {/* Map */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-semibold text-primary mb-6">
          Our Location
        </h2>

        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Restorative Care HHS Office"
              src="https://www.google.com/maps?q=221+Bedford+Road+Suite+320+Bedford,+TX+76022&output=embed"
              width="100%"
              height="350"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA (Matches ServicesPage bottom CTA) */}
      <section className="py-16 bg-primaryLight text-center">
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
          Need Assistance Right Away?
        </h3>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Call us today to discuss your needs or schedule a free in-home assessment.
        </p>
        <a
          href="tel:8172858515"
          className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition"
        >
          Call Us Now
        </a>
      </section>
    </div>
  );
}
