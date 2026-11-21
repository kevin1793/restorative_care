import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExternalLink } from "lucide-react";

import molinaLogo from "../assets/insurance/molina.svg";
import aetnaLogo from "../assets/insurance/aetna.svg";
import medicareLogo from "../assets/insurance/medicare.svg";
import texasHhsLogo from "../assets/insurance/texas-hhs.png";
import superiorLogo from "../assets/insurance/superior.png";
import triwestLogo from "../assets/insurance/triwest.png";
import tangoLogo from "../assets/insurance/tango.svg";

// Payer logos are the property of their respective owners and are shown only
// to identify the programs we're contracted with. Sources: Molina, Aetna,
// Medicare and Texas HHS via Wikimedia Commons; Superior HealthPlan, TriWest
// and Tango from their own sites.
//
// Logo sizing: logos come in very different proportions (Medicare.gov is
// ~7:1, Molina ~3:1), so a single max-width/height makes the wide ones look
// tiny or the tall ones huge. `logoWidth` is the base width in px, picked so
// every logo covers roughly the same visual area (wider aspect => wider but
// shorter). It scales up from `sm` via the --logo-scale variable and is
// always capped to the card so nothing overflows on narrow phones.
//
// `dark: true` marks logos with white lettering (Texas HHS, Tango), which
// are drawn on a navy tile so they stay readable.
//
// Exported so ContactForm can reuse the same lists for its Insurance/Payer
// dropdown (report §4.2) without the two lists drifting out of sync.
export const GOVERNMENT_PROGRAMS = [
  {
    name: "Texas Medicaid — Traditional",
    note: "Skilled home health services",
    logo: texasHhsLogo,
    logoWidth: 112,
    dark: true,
    url: "https://www.hhs.texas.gov/services/health/medicaid-chip",
  },
  {
    name: "Texas Medicaid — Long-Term Care",
    note: "Personal care via HHA/PCA",
    logo: texasHhsLogo,
    logoWidth: 112,
    dark: true,
    url: "https://www.hhs.texas.gov/services/aging/long-term-care",
  },
  {
    name: "Traditional Medicare",
    note: "Skilled home health services",
    logo: medicareLogo,
    logoWidth: 150,
    url: "https://www.medicare.gov/",
  },
];

export const MANAGED_CARE_ORGANIZATIONS = [
  "Molina Healthcare",
  "TriWest",
  "Aetna",
  "Tango",
  "Superior HealthPlan",
];

const MANAGED_CARE_DETAILS = {
  "Molina Healthcare": {
    logo: molinaLogo,
    logoWidth: 104,
    url: "https://www.molinahealthcare.com/",
  },
  TriWest: {
    logo: triwestLogo,
    logoWidth: 112,
    url: "https://www.triwest.com/",
  },
  Aetna: {
    logo: aetnaLogo,
    logoWidth: 100,
    url: "https://www.aetna.com/",
  },
  Tango: {
    logo: tangoLogo,
    logoWidth: 120,
    dark: true,
    url: "https://tangocare.com/",
  },
  "Superior HealthPlan": {
    logo: superiorLogo,
    logoWidth: 108,
    url: "https://www.superiorhealthplan.com/",
  },
};

const hostOf = (url) => new URL(url).hostname.replace(/^www\./, "");

// Fixed-height logo well so every card lines up whatever the logo's
// proportions. The payer name stays as alt text so the card is still
// readable if the image fails to load.
function LogoWell({ logo, name, logoWidth, dark = false }) {
  return (
    <div
      className={`flex items-center justify-center h-14 sm:h-16 w-full [--logo-scale:1] sm:[--logo-scale:1.15] ${
        dark ? "bg-primary rounded-lg" : ""
      }`}
    >
      <img
        src={logo}
        alt={name}
        loading="lazy"
        style={{
          width: `min(calc(var(--logo-scale) * ${logoWidth}px), calc(100% - 1rem))`,
          height: "auto",
          maxHeight: "75%",
        }}
        className="object-contain"
      />
    </div>
  );
}

function WebsiteLink({ url, name }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={hostOf(url)}
      aria-label={`${name} website (${hostOf(url)}) — opens in a new tab`}
      className="mt-auto pt-3 w-full min-h-[48px] border-t border-primary/10 inline-flex items-center justify-center gap-1.5 text-sm text-primary underline underline-offset-4 hover:text-primary/80 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md whitespace-nowrap"
    >
      <span>Visit website</span>
      <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
    </a>
  );
}

export default function InsuranceSection() {
  const focusClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-md";

  const cardClasses =
    "flex flex-col items-center text-center min-w-0 bg-white border border-primary/15 rounded-xl shadow-brand hover:shadow-brand-hover transition-shadow duration-200";

  const disclaimerClasses =
    "text-xs text-gray-600 text-center mt-4 max-w-2xl mx-auto leading-snug";

  return (
    <section
      id="insurance"
      className="py-12 md:py-20 bg-white"
      aria-labelledby="insurance-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2
          id="insurance-heading"
          className="text-2xl sm:text-3xl font-semibold text-primary text-center mb-4"
        >
          Insurance &amp; Payers We Accept
        </h2>

        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
          We're proud to be contracted and credentialed with the following
          programs, so more families can access our care.
        </p>

        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
            Government Programs
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {GOVERNMENT_PROGRAMS.map((program) => (
              <li key={program.name} className={`${cardClasses} p-5`}>
                <LogoWell
                  logo={program.logo}
                  name={program.name}
                  logoWidth={program.logoWidth}
                  dark={program.dark}
                />
                <span className="block font-semibold text-primary text-sm mt-3">
                  {program.name}
                </span>
                <span className="block text-gray-700 text-sm mt-1 mb-4">
                  {program.note}
                </span>
                <WebsiteLink url={program.url} name={program.name} />
              </li>
            ))}
          </ul>

          <p className={disclaimerClasses}>
            The Texas Health and Human Services and Medicare names and logos
            belong to their respective government agencies. We are an
            independent provider, and their use here does not imply
            endorsement by or affiliation with any government agency.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
            Managed Care Organizations
          </h3>

          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {MANAGED_CARE_ORGANIZATIONS.map((name) => {
              const payer = MANAGED_CARE_DETAILS[name];
              return (
                <li
                  key={name}
                  className={`${cardClasses} p-3 sm:p-4 basis-[calc(50%-0.375rem)] sm:basis-[calc(33.333%-0.667rem)]`}
                >
                  <LogoWell
                    logo={payer.logo}
                    name={name}
                    logoWidth={payer.logoWidth}
                    dark={payer.dark}
                  />
                  <div className="h-3" aria-hidden="true" />
                  <WebsiteLink url={payer.url} name={name} />
                </li>
              );
            })}
          </ul>

          <p className={disclaimerClasses}>
            Molina Healthcare, TriWest, Aetna, tango and Superior HealthPlan
            names and logos are trademarks of their respective owners and are
            shown only to identify the plans we accept. Their use does not
            imply endorsement.
          </p>
        </div>

        <p className="text-center text-gray-700 mt-10">
          Not sure if your plan is covered?{" "}
          <RouterLink
            to="/contact"
            className={`text-primary underline underline-offset-4 hover:text-primary/80 ${focusClasses}`}
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
          >
            Contact us
          </RouterLink>{" "}
          and we'll help you find out.
        </p>
      </div>
    </section>
  );
}
