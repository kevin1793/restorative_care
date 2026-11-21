import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

import { HOURS, TIME_ZONE } from "../siteInfo";
import {
  getOpenStatus,
  formatTime,
  formatDayAndTime,
  sameClock,
} from "../utils/openStatus";

// "Open now · closes at 5:00 PM" / "Closed · opens Monday at 8:00 AM", worked
// out from the office hours in src/siteInfo.js and shown in the VISITOR's
// own time zone. Shows nothing until HOURS is filled in there, and nothing
// on the server-rendered/no-JS page (it needs the visitor's clock).
//
// `tone` picks colors for a light or a dark background. Renders a <span> so
// it can sit inside a paragraph.
export default function OpenStatus({ tone = "light", className = "" }) {
  const [now, setNow] = useState(null);

  // Start after mount (the visitor's clock isn't known before), then keep
  // the status current without a refresh
  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return null;
  const status = getOpenStatus(now, HOURS, TIME_ZONE);
  if (!status) return null;

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
    <span
      className={`flex items-center gap-2 text-sm font-medium ${text} ${className}`}
    >
      <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${dot}`}
        aria-hidden="true"
      />
      <span>{sentence}</span>
    </span>
  );
}
