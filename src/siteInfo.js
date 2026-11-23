// The business's contact details and opening hours, in one place. Pages,
// the footer, the nav and the build scripts all read from here, so a change
// (new phone number, new hours) is made once.
//
// CommonJS on purpose, like src/seo/routes.js: scripts/prerender.js can
// require() it directly, and webpack still lets the app import it.

const PHONE_DISPLAY = "(817) 285-8515";
const PHONE_DASHED = "817-285-8515";
const PHONE_TEL = "8172858515";
const PHONE_HREF = `tel:${PHONE_TEL}`;

const EMAIL = "inforestorativecare@gmail.com";
const EMAIL_HREF = `mailto:${EMAIL}`;

const ADDRESS_STREET = "221 Bedford Road Suite 320";
const ADDRESS_CITY_LINE = "Bedford, TX 76022";
const ADDRESS_FULL = `${ADDRESS_STREET}, ${ADDRESS_CITY_LINE}`;
// Opens the office in Google Maps (search link, so it works on every device
// and hands off to the Maps app on phones)
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_FULL
)}`;

// Opening hours, as the office's own local time. The "open now" display
// (src/components/OpenStatus.js) works out whether the office is open for the
// visitor's current moment and shows times in the visitor's own time zone.
//
// Leave HOURS as null to show nothing. To turn it on, list one entry per
// block of hours:
//   days  0 = Sunday ... 6 = Saturday
//   open / close  24-hour "HH:MM" (close may be "24:00" for midnight)
// For example Monday to Friday, 8 AM to 5 PM:
//   [{ days: [1, 2, 3, 4, 5], open: "08:00", close: "17:00" }]
const TIME_ZONE = "America/Chicago";
const HOURS = null;

module.exports = {
  PHONE_DISPLAY,
  PHONE_DASHED,
  PHONE_TEL,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  ADDRESS_STREET,
  ADDRESS_CITY_LINE,
  ADDRESS_FULL,
  MAPS_URL,
  TIME_ZONE,
  HOURS,
};
