import React, { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mgvpkdba"); // Your Formspree form ID
  const formRef = useRef(null);

  // Clear form when submission succeeds
  useEffect(() => {
    if (state.succeeded && formRef.current) {
      formRef.current.reset();
    }
  }, [state.succeeded]);

  return (
    <section className="bg-gradient-to-b from-white to-primaryLight py-20 border-t border-gray-200" id="contact">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">
          Get in Touch
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Have questions about our services or need assistance? Fill out the form
          below and a member of our care team will reach out shortly.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-gray-50 shadow-md rounded-2xl p-8 space-y-6"
          action="https://formspree.io/f/mgvpkdba"
          method="POST"
        >
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <ValidationError prefix="Phone" field="phone" errors={state.errors} />
          </div>

          {/* Service Needed */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Service Needed</label>
            <select
              name="service"
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a service</option>
              <option value="Home Health Care">Home Health Care</option>
              <option value="Therapy Services">Therapy Services</option>
              <option value="Nursing Support">Nursing Support</option>
              <option value="Personal Care Assistance">Personal Care Assistance</option>
              <option value="Other">Other</option>
            </select>
            <ValidationError prefix="Service" field="service" errors={state.errors} />
          </div>

          {/* How did you hear about us */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              How did you hear about us?
            </label>
            <input
              type="text"
              name="referral"
              placeholder="(e.g., Google, friend, doctor, etc.)"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <ValidationError prefix="Referral" field="referral" errors={state.errors} />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="4"
              required
              placeholder="Tell us how we can help..."
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition"
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </button>
          </div>

          {state.succeeded && (
            <p className="text-green-600 text-center mt-4 font-medium">
              Thank you! Your message has been sent.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
