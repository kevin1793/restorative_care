import * as info from "./siteInfo";

test("phone and email links match the displayed values", () => {
  expect(info.PHONE_HREF).toBe(`tel:${info.PHONE_TEL}`);
  expect(info.PHONE_DISPLAY.replace(/\D/g, "")).toBe(info.PHONE_TEL);
  expect(info.PHONE_DASHED.replace(/\D/g, "")).toBe(info.PHONE_TEL);
  expect(info.EMAIL_HREF).toBe(`mailto:${info.EMAIL}`);
});

test("opening hours are either off (null) or well formed", () => {
  const blocks = info.HOURS || [];
  blocks.forEach(({ days, open, close }) => {
    expect(days.length).toBeGreaterThan(0);
    days.forEach((d) => {
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThanOrEqual(6);
    });
    expect(open).toMatch(/^([01]\d|2[0-3]):[0-5]\d$/);
    expect(close).toMatch(/^(([01]\d|2[0-3]):[0-5]\d|24:00)$/);
  });
  expect(info.HOURS === null || Array.isArray(info.HOURS)).toBe(true);
});
