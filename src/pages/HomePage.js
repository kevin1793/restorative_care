import React from "react";
import { HeartPulse, Home, Users, Phone } from "lucide-react";
import nurseImage1 from "../assets/images/nurse_care1.jpg";
import ContactForm from "../components/ContactForm";
import { Link as RouterLink } from "react-router-dom";
import nurseCall from "../assets/images/calling.jpg";

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primaryLight to-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            Restorative Care HHS
          </h1>
          <h1 className="font-fancy text-4xl md:text-5xl font-bold text-primary mb-6">
            Compassionate Care, Right at Home
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
            We provide professional, personalized home health services that
            support comfort, dignity, and independence.
          </p>
          <a
            href="#contact"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition"
          >
            Message Us
          </a>
          <a
            href="tel:8172858515"
            className="bg-primary w-32 m-1 text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition"
          >
            Call Us
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img
            src={nurseImage1}
            alt="Home Care"
            className="rounded-2xl shadow-md"
          />
          <div>
            <h2 className="text-3xl font-semibold text-primary mb-4">
              About Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At <strong>Restorative Care HHS</strong>, we believe everyone deserves
              comfort and dignity at home. Our skilled nurses and compassionate
              caregivers are dedicated to helping each client live with
              independence, safety, and respect.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether it’s daily living assistance, therapy, or specialized
              medical care — we’re here to bridge care and compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-primaryLight">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-primary mb-12">
            Our Home Health Services
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Home Health Aide / CNA */}
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-left">
              <HeartPulse className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl text-center font-semibold text-gray-800 mb-4">
                Home Health Aide / CNA
              </h3>
              <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                <li>Bathing</li>
                <li>Dressing & Grooming</li>
                <li>Toileting</li>
                <li>Mobility Assistance</li>
                <li>Oral Hygiene & Denture Care</li>
                <li>And more</li>
              </ul>
            </div>

            {/* Skilled Nursing / Non-Skilled Nursing */}
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-left">
              <Users className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl text-center font-semibold text-gray-800 mb-4">
                Skilled Nursing / Non-Skilled Nursing
              </h3>
              <p className="text-gray-600 text-sm">
                Professional in-home nursing care, including monitoring health conditions, administering medications, and providing support for recovery and chronic care management.
              </p>
            </div>

            {/* Other Services */}
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-left">
              <Home className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl text-center font-semibold text-gray-800 mb-4">
                Other Services
              </h3>
              <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                <li>Wound Care</li>
                <li>Occupational Therapy</li>
                <li>Physical Therapy</li>
              </ul>
            </div>
          </div>

          <div className="mt-20">
            <RouterLink
            to="/services"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition"
            >
              Learn More
            </RouterLink>
          </div>
        </div>
      </section>

      <section id="contact">
        <ContactForm />
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Text / Info on the Left */}
          <div className="text-left">
            <div className="flex items-center mb-4">
            <Phone className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl font-semibold text-primary">
              Let’s Talk About Your Care Needs
            </h2>
          </div>
            <p className="text-gray-600 mb-8">
              We’re here to answer your questions and help you find the best care
              plan for your loved ones.
            </p>
            <a
              href="tel:8172858515"
              className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition"
            >
              Call Us Today
            </a>
          </div>

          {/* Image on the Right */}
          <div>
            <img
              src={nurseCall}
              alt="Caregiving"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-semibold text-primary mb-4">
            Let’s Talk About Your Care Needs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We’re here to answer your questions and help you find the best care
            plan for your loved ones.
          </p>
          <a
            href="tel:8172858515"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition"
          >
            Call Us Today
          </a>
        </div>
      </section> */}

      <section className="py-20 bg-primaryLight">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Quality Home Care for Veterans
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Restorative Care Home Health Services provides compassionate respite and 
            homemaker caregiving services for veterans under VCA and TriWest agreements. 
            We help veterans maintain independence, comfort, and dignity at home with 
            personalized care tailored to each individual.
          </p>
          <RouterLink
            to="/veterans"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition"
            onClick={() => window.scrollTo(0, 0)}
          >
            Learn More
          </RouterLink>
        </div>
      </section>

      {/* Insurances Section */}
      <section id="insurances" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-primary mb-12">
            Insurances We Accept
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              "Molina",
              "Superior",
              "Blue Cross Blue Shield Texas",
              "VA",
              "Medicare",
              "Humana",
              "Wellcare",
              "Medicaid",
            ].map((insurance) => (
              <div
                key={insurance}
                className="bg-primaryLight border p-5 rounded-xl shadow-sm hover:shadow-md transition text-center"
              >
                <p className="text-primary font-medium">{insurance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
