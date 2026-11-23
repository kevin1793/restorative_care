import React from "react";
import { Phone } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

import { PHONE_HREF, PHONE_DISPLAY } from "../siteInfo";
import { bandY, button, sectionTitle } from "../ui";

// The light-blue "Ready to get started?" band at the bottom of a page. One
// component so every page ends the same way: a heading, a line of text, an
// optional note, a Call button, and optionally a second button.
//
//   secondary: { label, to }  internal link for the second button (optional)
//   note:      extra line under the text, e.g. the insurance cross-link
export default function CtaBand({ id, title, text, note, secondary }) {
  return (
    <section
      className={`${bandY} bg-primaryLight text-center`}
      aria-labelledby={id}
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2 id={id} className={sectionTitle}>
          {title}
        </h2>

        <p className="text-gray-800 max-w-xl mx-auto leading-relaxed mb-6">
          {text}
        </p>

        {note && <p className="text-sm text-gray-700 mb-6">{note}</p>}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <a href={PHONE_HREF} className={button("primary")}>
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            Call {PHONE_DISPLAY}
          </a>

          {secondary && (
            <RouterLink to={secondary.to} className={button("secondary")}>
              {secondary.label}
            </RouterLink>
          )}
        </div>
      </div>
    </section>
  );
}
