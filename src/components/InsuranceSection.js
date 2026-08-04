import React from "react";
import { Link as RouterLink } from "react-router-dom";

// Text badges only — real payer logos require permission from each
// company under their brand guidelines (report §4.2). Text is the safe
// default until Juice decides whether to pursue logo permissions.
// Exported so ContactForm can reuse the same list for its Insurance/Payer
// dropdown (report §4.2) without the two lists drifting out of sync.
export const GOVERNMENT_PROGRAMS = [
  {
    name: "Texas Medicaid — Traditional",
    note: "Skilled home health services",
  },
  {
    name: "Texas Medicaid — Long-Term Care",
    note: "Personal care via HHA/PCA",
  },
  {
    name: "Traditional Medicare",
    note: "Skilled home health services",
  },
];

export const MANAGED_CARE_ORGANIZATIONS = [
  "Molina Healthcare",
  "TriWest",
  "Aetna",
  "Tango",
  "Superior HealthPlan",
];

export default function InsuranceSection() {
  const focusClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-md";

  return (
    <section
      id="insurance"
      className="py-20 bg-white scroll-mt-24"
      aria-labelledby="insurance-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2
          id="insurance-heading"
          className="text-3xl font-semibold text-primary text-center mb-4"
        >
          Insurance &amp; Payers We Accept
        </h2>

        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
          We're proud to be contracted and credentialed with the following
          programs, so more families can access our care.
        </p>

        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Government Programs
          </h3>

          {/* Styled as cards to match the Managed Care badge grid below,
              so the section reads as one cohesive system (report §4.4)
              instead of "a list, then some badges." */}
          <ul className="grid sm:grid-cols-3 gap-3">
            {GOVERNMENT_PROGRAMS.map((program) => (
              <li
                key={program.name}
                className="bg-primaryLight rounded-lg py-3 px-4 text-left"
              >
                <span className="block font-medium text-primary text-sm">
                  {program.name}
                </span>
                <span className="block text-gray-700 text-sm mt-1">
                  {program.note}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Managed Care Organizations
          </h3>

          <ul className="grid sm:grid-cols-3 gap-3">
            {MANAGED_CARE_ORGANIZATIONS.map((name) => (
              <li
                key={name}
                className="bg-primaryLight text-primary text-center font-medium text-sm rounded-lg py-3 px-4"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-gray-700 mt-10">
          Not sure if your plan is covered?{" "}
          <RouterLink
            to="/contact"
            className={`text-primary underline underline-offset-4 hover:text-primary/80 ${focusClasses}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            Contact us
          </RouterLink>{" "}
          and we'll help you find out.
        </p>
      </div>
    </section>
  );
}
