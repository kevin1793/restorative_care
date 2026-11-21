// Works out whether the office is open at a given moment, from hours written
// in the office's own time zone (see HOURS in src/siteInfo.js), so the
// visitor can be shown "Open now" or "Closed" and the next change in their
// own time zone.
//
// Pure functions on purpose (the "now" and the time zone are passed in), so
// they can be tested without a browser or a real clock.

const MINUTE = 60 * 1000;
const DAY_MINUTES = 24 * 60;
const WEEK_MINUTES = 7 * DAY_MINUTES;

// The weekday, hour and minute on a wall clock in the given time zone
function zonedClock(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type).value;
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    weekday: weekdays.indexOf(get("weekday")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
  };
}

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// Every block of opening time as [start, end) in minutes since the start of
// the office's Sunday, sorted so a week can be walked in order
function weeklyIntervals(hours) {
  const intervals = [];
  hours.forEach(({ days, open, close }) => {
    days.forEach((day) => {
      intervals.push([
        day * DAY_MINUTES + toMinutes(open),
        day * DAY_MINUTES + toMinutes(close),
      ]);
    });
  });
  return intervals.sort((a, b) => a[0] - b[0]);
}

/**
 * @param {Date} now
 * @param {{days:number[], open:string, close:string}[] | null} hours
 *        written in the office's local time; days 0 = Sunday ... 6 = Saturday
 * @param {string} officeZone  IANA zone name, e.g. "America/Chicago"
 * @returns {null | { isOpen: boolean, changesAt: Date }}
 *          changesAt is the next moment the status flips: the closing time
 *          when open now, the next opening time when closed. null when no
 *          hours are set.
 */
export function getOpenStatus(now, hours, officeZone) {
  if (!hours || hours.length === 0) return null;

  const clock = zonedClock(now, officeZone);
  const nowMinute = clock.weekday * DAY_MINUTES + clock.hour * 60 + clock.minute;
  const intervals = weeklyIntervals(hours);

  // The office's own "now" is truncated to the minute; the result is an
  // instant that many minutes ahead of the real current minute
  const instantAfter = (minutes) =>
    new Date(Math.floor(now.getTime() / MINUTE) * MINUTE + minutes * MINUTE);

  const current = intervals.find(
    ([start, end]) => nowMinute >= start && nowMinute < end
  );

  if (current) {
    // Hours that run straight into the next block (open until midnight,
    // then open again from midnight) count as one stretch
    let end = current[1];
    for (let i = 0; i < intervals.length; i += 1) {
      const runEnd = end;
      const next = intervals.find(
        ([start]) => start === runEnd % WEEK_MINUTES && start !== current[0]
      );
      if (!next) break;
      end += next[1] - next[0];
    }
    return { isOpen: true, changesAt: instantAfter(end - nowMinute) };
  }

  // Closed: the next block start, wrapping past the end of the week
  const minutesUntilOpen = Math.min(
    ...intervals.map(
      ([start]) => (start - nowMinute + WEEK_MINUTES) % WEEK_MINUTES
    )
  );
  return { isOpen: false, changesAt: instantAfter(minutesUntilOpen) };
}

// "5:00 PM", or "5:00 PM CDT" with the zone name, in any time zone. Leave
// timeZone undefined for the visitor's own.
export function formatTime(date, timeZone, { withZoneName = false } = {}) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    ...(withZoneName ? { timeZoneName: "short" } : {}),
  }).format(date);
}

// "Monday 8:00 AM" in any time zone
export function formatDayAndTime(date, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

// Whether two time zones show the same clock time right now
export function sameClock(date, zoneA, zoneB) {
  return formatTime(date, zoneA) === formatTime(date, zoneB);
}
