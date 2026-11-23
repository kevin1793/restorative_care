import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

import { HOURS, TIME_ZONE } from "../siteInfo";
import {
  getOpenStatus,
  formatTime,
  formatDayAndTime,
  formatHoursSummary,
  sameClock,
} from "../utils/openStatus";

// The office's regular hours are written in its own (Central) time
const SCHEDULE = formatHoursSummary(HOURS);

// Two lines, worked out from the office hours in src/siteInfo.js:
//   "Open now, closes at 5:00 PM" / "Closed now, opens Monday 9:00 AM", in
//     the VISITOR's own time zone. Needs the visitor's clock, so it appears
//     only after the page loads.
//   "Mon–Fri, 9 AM–5 PM Central · Hours may vary on holidays", the regular
//     schedule. Fixed text, so it's in the page from the start. The status
//     line can't know about holiday closures, hence the note.
// Shows nothing until HOURS is filled in.
//
// `tone` picks colors for a light or a dark background; `align` is "start"
// or "center". `layout="inline"` puts both on one centered row (wrapping on
// narrow screens), for the slim hours strip under the homepage hero.
// Renders <span>s so it can sit inside a paragraph.
export default function OpenStatus({
  tone = "light",
  align = "start",
  layout = "stacked",
  className = "",
}) {
  const [now, setNow] = useState(null);

  // Start after mount (the visitor's clock isn't known before), then keep
  // the status current without a refresh
  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  if (!SCHEDULE) return null;

  const inline = layout === "inline";
  const centered = inline || align === "center";
  const subText = tone === "dark" ? "text-white/70" : "text-gray-700";
  // `indent` lines it up under the status text, past the clock icon and dot
  const scheduleLine = (indent) => (
    <span
      className={`block leading-relaxed ${subText} ${
        inline ? "text-xs sm:text-sm" : "text-xs"
      } ${centered ? "text-center" : indent ? "pl-[2.625rem]" : ""}`}
    >
      {SCHEDULE} Central &middot; Hours may vary on holidays
    </span>
  );

  const status = now && getOpenStatus(now, HOURS, TIME_ZONE);
  const outer = inline
    ? `flex flex-wrap items-center justify-center gap-x-3 gap-y-1 ${className}`
    : `block ${className}`;
  if (!status) {
    return <span className={outer}>{scheduleLine(false)}</span>;
  }

  const { isOpen, changesAt } = status;
  const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const sameZoneClock = sameClock(now, visitorZone, TIME_ZONE);

  // Times are always in the visitor's zone; name the zone when it differs
  // from the office's so "5:00 PM" can't be misread as the office's time
  const when = isOpen
    ? formatTime(changesAt, undefined, { withZoneName: !sameZoneClock })
    : formatDayAndTime(changesAt, undefined);

  const sentence = isOpen
    ? `Open now, closes at ${when}`
    : `Closed now, opens ${when}`;

  const text = tone === "dark" ? "text-white/90" : "text-gray-800";
  const dot = isOpen
    ? tone === "dark"
      ? "bg-green-400"
      : "bg-green-600"
    : tone === "dark"
    ? "bg-white/50"
    : "bg-gray-500";

  return (
    <span className={outer}>
      <span
        className={`flex items-center gap-2 text-sm font-medium ${text} ${
          centered ? "justify-center" : ""
        }`}
      >
        <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${dot}`}
          aria-hidden="true"
        />
        <span>{sentence}</span>
      </span>
      {inline ? (
        <>
          <span className={`hidden sm:block ${subText}`} aria-hidden="true">
            &middot;
          </span>
          {scheduleLine(false)}
        </>
      ) : (
        <span className="mt-1 block">{scheduleLine(true)}</span>
      )}
    </span>
  );
}
