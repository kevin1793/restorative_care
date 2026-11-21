import React, { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Check } from "lucide-react";

// Matches the site-wide taxonomy exactly (report §3.17 / §4.9.3) — 5
// Skilled Services + 2 Personal Care Services. "Private Duty" is
// intentionally not a checkbox here: it describes how care is paid for,
// not a type of service, and that's exactly what the free-text Insurance
// field below is for.
const SERVICE_OPTIONS = [
  "Skilled Nursing",
  "Occupational Therapy",
  "Physical Therapy",
  "Speech Therapy",
  "Medical Social Work",
  "Home Health Aide",
  "Personal Attendant Services",
];

// showHeading: the Contact page already has its own "Send Us a Message"
// heading right above the form, so it passes false to avoid two stacked
// headings (and a duplicate element id).
// Where each error's "fix it" link should send focus
const FIELD_FOCUS_ID = {
  name: "name",
  email: "email",
  phone: "phone",
  services: "service-0",
  message: "message",
};

// Inline error shown under a field and referenced by aria-describedby
function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="text-red-700 mt-2 text-sm font-medium">
      {message}
    </p>
  );
}

function validate(form) {
  const data = new FormData(form);
  const errors = {};

  if (!String(data.get("name") || "").trim()) {
    errors.name = "Please enter your name.";
  }

  const email = String(data.get("email") || "").trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }

  const phone = String(data.get("phone") || "");
  if (!phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Please enter a 10-digit phone number, like (817) 555-0123.";
  }

  if (data.getAll("services").length === 0) {
    errors.services = "Please select at least one service.";
  }

  if (!String(data.get("message") || "").trim()) {
    errors.message = "Please tell us how we can help.";
  }

  return errors;
}

export default function ContactForm({ showHeading = true }) {
  const [state, handleSubmit] = useForm("mgvpkdba");
  const [errs, setErrs] = useState({});
  const formRef = useRef(null);
  const successRef = useRef(null);
  const summaryRef = useRef(null);

  const invalid = (field) =>
    !!errs[field] || !!state.errors?.some((error) => error.field === field);

  const errorCount = Object.keys(errs).length;

  // Check the form ourselves first so every problem is explained in words,
  // announced to screen readers, and focus lands on the error summary.
  const onSubmit = (event) => {
    const found = validate(formRef.current);
    setErrs(found);

    if (Object.keys(found).length > 0) {
      event.preventDefault();
      // wait a tick so the summary exists before focusing it
      setTimeout(() => summaryRef.current && summaryRef.current.focus(), 0);
      return undefined;
    }

    return handleSubmit(event);
  };

  // Clear a field's error as soon as the visitor edits it
  const clearError = (event) => {
    const field = event.target.name;
    if (field && errs[field]) {
      setErrs(({ [field]: removed, ...rest }) => rest);
    }
  };

  const focusField = (field) => (event) => {
    event.preventDefault();
    const el = document.getElementById(FIELD_FOCUS_ID[field]);
    if (el) el.focus();
  };

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
    transition-colors
    focus:border-primary
    aria-[invalid=true]:border-2 aria-[invalid=true]:border-red-700
    ${focusClasses}
  `;

  return (
    <div>
      {/* Parent sections already supply the horizontal page padding, so no
          extra px here — otherwise the form lost ~50px of width on phones. */}
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        {showHeading && (
          <h2
            id="contact-form-heading"
            className="text-2xl sm:text-3xl font-semibold text-center text-primary mb-4"
          >
            Get in Touch
          </h2>
        )}

        <p className="text-center text-gray-800 mb-6 sm:mb-8 leading-relaxed">
          Have questions about our services or need assistance? Fill out the
          form below and a member of our care team will reach out shortly.
        </p>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={onSubmit}
          onChange={clearError}
          className="
            bg-gray-50
            shadow-brand
            rounded-2xl
            p-4 min-[400px]:p-6 sm:p-8
            space-y-5 sm:space-y-6
          "
          action="https://formspree.io/f/mgvpkdba"
          method="POST"
          noValidate
          aria-describedby="form-description"
        >
          <p id="form-description" className="sr-only">
            All required fields must be completed before submitting the form.
          </p>

          {errorCount > 0 && (
            <div
              ref={summaryRef}
              tabIndex={-1}
              role="alert"
              className="rounded-xl border-2 border-red-700 bg-red-50 p-4 text-red-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-700"
            >
              <p className="font-semibold mb-2">
                {errorCount === 1
                  ? "There is 1 problem with your message:"
                  : `There are ${errorCount} problems with your message:`}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(errs).map(([field, message]) => (
                  <li key={field}>
                    <a
                      href={`#${FIELD_FOCUS_ID[field]}`}
                      onClick={focusField(field)}
                      className="underline underline-offset-4 font-medium focus:outline-none focus-visible:ring-4 focus-visible:ring-red-700 rounded-sm"
                    >
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Name / Email / Phone — 2-column grid on desktop (report §3.9) */}
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-900 font-medium mb-1.5"
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
                aria-invalid={invalid("name")}
                aria-describedby={errs.name ? "name-error" : undefined}
                className={inputClasses}
              />

              <FieldError id="name-error" message={errs.name} />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
                className="text-red-700 mt-2 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-900 font-medium mb-1.5"
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
                aria-invalid={invalid("email")}
                aria-describedby={errs.email ? "email-error" : undefined}
                className={inputClasses}
              />

              <FieldError id="email-error" message={errs.email} />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-700 mt-2 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block text-gray-900 font-medium mb-1.5"
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
                aria-invalid={invalid("phone")}
                aria-describedby={errs.phone ? "phone-error" : undefined}
                className={inputClasses}
              />

              <FieldError id="phone-error" message={errs.phone} />
              <ValidationError
                prefix="Phone"
                field="phone"
                errors={state.errors}
                className="text-red-700 mt-2 text-sm"
              />
            </div>
          </div>

          {/* Service(s) Needed — multi-select checkboxes instead of a
              single-select dropdown, since clients often need more than
              one type of care at once (report §4.9.3) */}
          <fieldset aria-describedby={errs.services ? "services-error" : undefined}>
            <legend className="text-gray-900 font-medium mb-1">
              Service(s) Needed <span aria-hidden="true">*</span>
            </legend>

            <p className="text-sm text-gray-700 mb-3">Select all that apply</p>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {SERVICE_OPTIONS.map((service, index) => (
                <label
                  key={service}
                  className="flex items-start gap-3 min-h-[3rem] rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-gray-800 cursor-pointer hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:bg-primaryLight transition-colors"
                >
                  {/* Custom-drawn box: the native one rendered as a dark
                      square before it was checked */}
                  <span className="relative mt-0.5 w-5 h-5 shrink-0">
                    <input
                      id={`service-${index}`}
                      type="checkbox"
                      name="services"
                      value={service}
                      className={`peer appearance-none w-5 h-5 rounded border-2 border-gray-400 bg-white checked:bg-primary checked:border-primary cursor-pointer transition-colors ${focusClasses}`}
                    />
                    <Check
                      className="absolute inset-0 m-auto w-3.5 h-3.5 text-white hidden peer-checked:block pointer-events-none"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="leading-snug">{service}</span>
                </label>
              ))}
            </div>

            <FieldError id="services-error" message={errs.services} />
            <ValidationError
              prefix="Services"
              field="services"
              errors={state.errors}
              className="text-red-700 mt-2 text-sm"
            />
          </fieldset>

          {/* Insurance / Payer — free text rather than a fixed dropdown,
              so PPO/out-of-network clients aren't silently filtered out
              before a human ever sees the lead (report §4.9.3) */}
          <div>
            <label
              htmlFor="insurance-payer"
              className="block text-gray-900 font-medium mb-1.5"
            >
              Insurance / Payer
            </label>

            <input
              id="insurance-payer"
              type="text"
              name="insurance"
              autoComplete="off"
              placeholder="e.g. Medicare, Molina"
              aria-invalid={invalid("insurance")}
                aria-describedby={errs.insurance ? "insurance-error" : undefined}
              className={inputClasses}
            />

            <p className="text-sm text-gray-700 mt-2 leading-snug">
              Not sure if we accept your plan? Tell us what you have —
              including PPO or out-of-network coverage — and we'll help you
              find out.
            </p>

            <ValidationError
              prefix="Insurance"
              field="insurance"
              errors={state.errors}
              className="text-red-700 mt-2 text-sm"
            />
          </div>

          {/* Referral */}
          <div>
            <label
              htmlFor="referral"
              className="block text-gray-900 font-medium mb-1.5"
            >
              How did you hear about us?
            </label>

            <input
              id="referral"
              type="text"
              name="referral"
              autoComplete="off"
              placeholder="e.g. Google or a friend"
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
              className="block text-gray-900 font-medium mb-1.5"
            >
              Message <span aria-hidden="true">*</span>
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              required
              aria-required="true"
              aria-invalid={invalid("message")}
                aria-describedby={errs.message ? "message-error" : undefined}
              placeholder="Tell us how we can help..."
              className={inputClasses}
            />

            <FieldError id="message-error" message={errs.message} />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-red-700 mt-2 text-sm"
            />
          </div>

          {/* Privacy-conscious note (report §3.9) */}
          <p className="text-sm text-gray-700 text-center leading-snug sm:leading-relaxed">
            For your privacy, please avoid including sensitive medical
            details in this form. A team member will follow up to discuss
            your care needs directly.
          </p>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={state.submitting}
              aria-disabled={state.submitting}
              className={`
                inline-flex items-center justify-center
                w-full sm:w-auto
                bg-primary text-white
                px-8 py-3 rounded-full
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
    </div>
  );
}