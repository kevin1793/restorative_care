import React from "react";
import {
  Facebook,
  HeartPulse,
  Lightbulb,
  HeartHandshake,
  Megaphone,
  ExternalLink,
} from "lucide-react";

import { FACEBOOK_PAGE_URL } from "../siteInfo";

// "Tips From Our Team" card: what the agency posts on Facebook and a button to
// follow the Page. Built into the site instead of Facebook's Page Plugin,
// which came up empty for this Page (Facebook sent no posts or cover photo,
// and browsers that block third-party cookies show nothing at all). This
// always renders, loads no Facebook code or tracking, and matches the site.
const TOPICS = [
  { icon: Lightbulb, label: "Home health tips" },
  { icon: HeartHandshake, label: "Caregiving advice" },
  { icon: Megaphone, label: "Agency & Medicaid updates" },
];

export default function FacebookFollowCard() {
  const focusClasses =
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary";

  return (
    <div className="bg-white rounded-2xl shadow-brand p-6 sm:p-8 max-w-2xl mx-auto text-left">
      {/* Who: the agency's Page, with the same mark as the navbar/footer */}
      <div className="flex items-center gap-4">
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <HeartPulse className="h-7 w-7" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-serif font-bold text-gray-900 leading-snug">
            Restorative Care Home Health Services
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-700">
            <Facebook className="h-4 w-4 shrink-0 text-[#1877F2]" aria-hidden="true" />
            Our Facebook Page
          </p>
        </div>
      </div>

      {/* What we post */}
      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {TOPICS.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-3 rounded-xl bg-primaryLight px-4 py-3 text-sm font-medium text-gray-900 sm:flex-col sm:items-start sm:gap-2"
          >
            <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>

      <a
        href={FACEBOOK_PAGE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Restorative Care HHS on Facebook — opens in a new tab"
        className={`mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 min-h-[48px] font-medium text-white hover:bg-primary/90 transition-colors ${focusClasses}`}
      >
        <Facebook className="h-5 w-5" aria-hidden="true" />
        Follow Us on Facebook
        <ExternalLink className="h-4 w-4 opacity-80" aria-hidden="true" />
      </a>
    </div>
  );
}
