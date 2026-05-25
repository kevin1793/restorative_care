import React, { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mgvpkdba");
  const formRef = useRef(null);
  const successRef = useRef(null);

  // Clear form and move focus to success message
  useEffect(() => {
    if (state.succeeded && formRef.current) {
      formRef.current.reset();

      if (successRef.current) {
        successRef.current.focus();
      }
    }
  }, [state.succeeded]);

  const focusClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2";

  const inputClasses = `
    w-full
    border border-gray-300
    rounded-xl
    p-3
    text-gray-900
    bg-white
    placeholder:text-gray-500
    ${focusClasses}
  `;

  return (
    <section
      id="contact"
      className="
        bg-gradient-to-b from-white to-primaryLight
        py-20
        border-t border-gray-200
      "
      aria-labelledby="contact-form-heading"
    >
      <div className="max-w-2xl mx-auto px-6">
        {/* Section Heading */}
        <h2
          id="contact-form-heading"
          className="text-3xl font-semibold text-center text-primary mb-8"
        >
          Get in Touch
        </h2>

        <p className="text-center text-gray-800 mb-10 leading-relaxed">
          Have questions about our services or need assistance? Fill out the
          form below and a member of our care team will reach out shortly.
        </p>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="
            bg-gray-50
            shadow-md
            rounded-2xl
            p-8
            space-y-6
          "
          action="https://formspree.io/f/mgvpkdba"
          method="POST"
          noValidate
          aria-describedby="form-description"
        >
          <p id="form-description" className="sr-only">
            All required fields must be completed before submitting the form.
          </p>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-900 font-medium mb-2"
            >
              Name <span aria-hidden="true">*</span>
            </label>

            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={state.errors?.some(
                (error) => error.field === "name"
              )}
              className={inputClasses}
            />

            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="text-red-700 mt-2 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-900 font-medium mb-2"
            >
              Email Address <span aria-hidden="true">*</span>
            </label>

            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              required
              aria-required="true"
              aria-invalid={state.errors?.some(
                (error) => error.field === "email"
              )}
              className={inputClasses}
            />

            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-red-700 mt-2 text-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-900 font-medium mb-2"
            >
              Phone Number <span aria-hidden="true">*</span>
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              required
              aria-required="true"
              aria-invalid={state.errors?.some(
                (error) => error.field === "phone"
              )}
              className={inputClasses}
            />

            <ValidationError
              prefix="Phone"
              field="phone"
              errors={state.errors}
              className="text-red-700 mt-2 text-sm"
            />
          </div>

          {/* Service Needed */}
          <div>
            <label
              htmlFor="service"
              className="block text-gray-900 font-medium mb-2"
            >
              Service Needed <span aria-hidden="true">*</span>
            </label>

            <select
              id="service"
              name="service"
              required
              aria-required="true"
              aria-invalid={state.errors?.some(
                (error) => error.field === "service"
              )}
              className={inputClasses}
              defaultValue=""
            >
              <option value="" disabled>
                Select a service
              </option>

              <option value="Home Health Care">
                Home Health Care
              </option>

              <option value="Therapy Services">
                Therapy Services
              </option>

              <option value="Nursing Support">
                Nursing Support
              </option>

              <option value="Personal Care Assistance">
                Personal Care Assistance
              </option>

              <option value="Other">
                Other
              </option>
            </select>

            <ValidationError
              prefix="Service"
              field="service"
              errors={state.errors}
              className="text-red-700 mt-2 text-sm"
            />
          </div>

          {/* Referral */}
          <div>
            <label
              htmlFor="referral"
              className="block text-gray-900 font-medium mb-2"
            >
              How did you hear about us?
            </label>

            <input
              id="referral"
              type="text"
              name="referral"
              autoComplete="off"
              placeholder="For example: Google, friend, doctor, or hospital"
              className={inputClasses}
            />

            <ValidationError
              prefix="Referral"
              field="referral"
              errors={state.errors}
              className="text-red-700 mt-2 text-sm"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-gray-900 font-medium mb-2"
            >
              Message <span aria-hidden="true">*</span>
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              required
              aria-required="true"
              aria-invalid={state.errors?.some(
                (error) => error.field === "message"
              )}
              placeholder="Tell us how we can help..."
              className={inputClasses}
            />

            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-red-700 mt-2 text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={state.submitting}
              aria-disabled={state.submitting}
              className={`
                inline-flex items-center justify-center
                bg-primary text-white
                px-6 py-3 rounded-full
                font-medium
                transition-colors duration-200
                hover:bg-primary/90
                disabled:opacity-70
                disabled:cursor-not-allowed
                ${focusClasses}
              `}
            >
              {state.submitting
                ? "Sending Message..."
                : "Send Message"}
            </button>
          </div>

          {/* Success Message */}
          {state.succeeded && (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="
                text-green-700
                text-center
                mt-4
                font-medium
                bg-green-50
                border border-green-200
                rounded-xl
                p-4
              "
            >
              Thank you! Your message has been sent successfully.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}