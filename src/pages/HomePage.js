import React from "react";
import { HeartPulse, Home, Users, Phone } from "lucide-react";
import nurseImage1 from "../assets/images/nurse_care1.jpg";
import ContactForm from "../components/ContactForm";

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-teal-700 mb-6">
            Restorative Care HHS
          </h1>
          <h1 className="font-fancy text-4xl md:text-5xl font-bold text-teal-700 mb-6">
            Compassionate Care, Right at Home
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
            We provide professional, personalized home health services that
            support comfort, dignity, and independence.
          </p>
          <a
            href="tel:8172858515"
            className="bg-teal-600 text-white px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition"
          >
            Get In Touch
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
            <h2 className="text-3xl font-semibold text-teal-700 mb-4">
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

      <section id="contact">
        <ContactForm />
      </section>

      {/* Services Section */}
      {/* <section id="services" className="py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-teal-700 mb-12">
            Our Home Health Services
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
              <HeartPulse className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Skilled Nursing
              </h3>
              <p className="text-gray-600 text-sm">
                Professional in-home nursing care to manage recovery, medication,
                and chronic conditions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
              <Users className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Personal Care
              </h3>
              <p className="text-gray-600 text-sm">
                Compassionate assistance with daily living activities like
                bathing, dressing, and meals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
              <Home className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Therapy Services
              </h3>
              <p className="text-gray-600 text-sm">
                Physical and occupational therapy as well as wound care to help clients regain
                independence and mobility.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <section id="services" className="py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-teal-700 mb-12">
            Our Home Health Services
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Home Health Aide / CNA */}
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-left">
              <HeartPulse className="w-10 h-10 text-teal-600 mx-auto mb-4" />
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
              <Users className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl text-center font-semibold text-gray-800 mb-4">
                Skilled Nursing / Non-Skilled Nursing
              </h3>
              <p className="text-gray-600 text-sm">
                Professional in-home nursing care, including monitoring health conditions, administering medications, and providing support for recovery and chronic care management.
              </p>
            </div>

            {/* Other Services */}
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-left">
              <Home className="w-10 h-10 text-teal-600 mx-auto mb-4" />
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
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Phone className="w-10 h-10 text-teal-600 mx-auto mb-4" />
          <h2 className="text-3xl font-semibold text-teal-700 mb-4">
            Let’s Talk About Your Care Needs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We’re here to answer your questions and help you find the best care
            plan for your loved ones.
          </p>
          <a
            href="tel:8172858515"
            className="bg-teal-600 text-white px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition"
          >
            Call Us Today
          </a>
        </div>
      </section>
    </div>
  );
}
