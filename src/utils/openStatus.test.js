import {
  getOpenStatus,
  formatTime,
  sameClock,
  formatHoursSummary,
} from "./openStatus";

const CT = "America/Chicago";
const weekdays = [{ days: [1, 2, 3, 4, 5], open: "08:00", close: "17:00" }];

// Dates below are written in UTC. In November Chicago is UTC-6 (CST); in June
// it is UTC-5 (CDT).
describe("getOpenStatus", () => {
  test("returns null when no hours are set", () => {
    expect(getOpenStatus(new Date(), null, CT)).toBeNull();
    expect(getOpenStatus(new Date(), [], CT)).toBeNull();
  });

  test("open during a weekday, with today's closing time", () => {
    // Tuesday 24 Nov 2026, 9:00 AM CST
    const now = new Date("2026-11-24T15:00:00Z");
    const status = getOpenStatus(now, weekdays, CT);
    expect(status.isOpen).toBe(true);
    // closes 5:00 PM CST = 23:00 UTC
    expect(status.changesAt.toISOString()).toBe("2026-11-24T23:00:00.000Z");
  });

  test("closed before opening on a weekday, opens the same day", () => {
    // Tuesday 7:00 AM CST
    const status = getOpenStatus(new Date("2026-11-24T13:00:00Z"), weekdays, CT);
    expect(status.isOpen).toBe(false);
    expect(status.changesAt.toISOString()).toBe("2026-11-24T14:00:00.000Z");
  });

  test("closed on the weekend, opens Monday morning", () => {
    // Saturday 28 Nov 2026, noon CST
    const status = getOpenStatus(new Date("2026-11-28T18:00:00Z"), weekdays, CT);
    expect(status.isOpen).toBe(false);
    // Monday 30 Nov, 8:00 AM CST = 14:00 UTC
    expect(status.changesAt.toISOString()).toBe("2026-11-30T14:00:00.000Z");
  });

  test("closed after hours on Friday, opens the next Monday", () => {
    // Friday 27 Nov 2026, 5:30 PM CST = 23:30 UTC
    const status = getOpenStatus(new Date("2026-11-27T23:30:00Z"), weekdays, CT);
    expect(status.isOpen).toBe(false);
    expect(status.changesAt.toISOString()).toBe("2026-11-30T14:00:00.000Z");
  });

  test("the closing minute itself counts as closed", () => {
    // Tuesday 5:00 PM CST exactly
    const status = getOpenStatus(new Date("2026-11-24T23:00:00Z"), weekdays, CT);
    expect(status.isOpen).toBe(false);
  });

  test("follows daylight saving time", () => {
    // Tuesday 9 Jun 2026, 9:00 AM CDT = 14:00 UTC
    const status = getOpenStatus(new Date("2026-06-09T14:00:00Z"), weekdays, CT);
    expect(status.isOpen).toBe(true);
    // closes 5:00 PM CDT = 22:00 UTC
    expect(status.changesAt.toISOString()).toBe("2026-06-09T22:00:00.000Z");
  });

  test("a lunch gap splits the day", () => {
    const split = [
      { days: [1], open: "08:00", close: "12:00" },
      { days: [1], open: "13:00", close: "17:00" },
    ];
    // Monday 30 Nov, 12:30 PM CST = 18:30 UTC: in the gap
    const gap = getOpenStatus(new Date("2026-11-30T18:30:00Z"), split, CT);
    expect(gap.isOpen).toBe(false);
    expect(gap.changesAt.toISOString()).toBe("2026-11-30T19:00:00.000Z");
  });

  test("back-to-back blocks count as one stretch", () => {
    const joined = [
      { days: [1], open: "08:00", close: "12:00" },
      { days: [1], open: "12:00", close: "17:00" },
    ];
    // Monday 11:00 AM CST: closes at 5 PM, not noon
    const status = getOpenStatus(new Date("2026-11-30T17:00:00Z"), joined, CT);
    expect(status.isOpen).toBe(true);
    expect(status.changesAt.toISOString()).toBe("2026-11-30T23:00:00.000Z");
  });

  test("open late: close at midnight", () => {
    const late = [{ days: [5], open: "09:00", close: "24:00" }];
    // Friday 27 Nov, 10:00 PM CST = Saturday 04:00 UTC
    const status = getOpenStatus(new Date("2026-11-28T04:00:00Z"), late, CT);
    expect(status.isOpen).toBe(true);
    // midnight CST = 06:00 UTC
    expect(status.changesAt.toISOString()).toBe("2026-11-28T06:00:00.000Z");
  });
});

describe("time formatting in another time zone", () => {
  test("shows the same instant on the visitor's clock", () => {
    const instant = new Date("2026-11-24T23:00:00Z"); // 5:00 PM in Chicago
    expect(formatTime(instant, CT)).toBe("5:00 PM");
    expect(formatTime(instant, "America/New_York")).toBe("6:00 PM");
    expect(formatTime(instant, "America/Los_Angeles", { withZoneName: true })).toBe(
      "3:00 PM PST"
    );
  });

  test("sameClock tells whether two zones agree right now", () => {
    const now = new Date("2026-11-24T23:00:00Z");
    expect(sameClock(now, CT, "America/Chicago")).toBe(true);
    expect(sameClock(now, CT, "America/New_York")).toBe(false);
  });
});

describe("formatHoursSummary", () => {
  test("nothing to show without hours", () => {
    expect(formatHoursSummary(null)).toBeNull();
    expect(formatHoursSummary([])).toBeNull();
  });

  test("a weekday range", () => {
    expect(
      formatHoursSummary([{ days: [1, 2, 3, 4, 5], open: "09:00", close: "17:00" }])
    ).toBe("Mon–Fri, 9 AM–5 PM");
  });

  test("odd days, minutes, and several blocks", () => {
    expect(
      formatHoursSummary([
        { days: [5, 1, 3], open: "08:30", close: "12:00" },
        { days: [6], open: "10:00", close: "24:00" },
      ])
    ).toBe("Mon, Wed, Fri, 8:30 AM–12 PM · Sat, 10 AM–12 AM");
  });
});
