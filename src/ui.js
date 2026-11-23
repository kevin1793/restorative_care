// Shared UI class names, so every page draws buttons, links, pills and
// headings the same way. Before this, each page kept its own copy of these
// strings and they had drifted apart (four button heights, four heading
// sizes). Change a style here and it changes everywhere.
//
// Tailwind only generates classes it can find written out in full in the
// source, so every class below is a complete literal string, never built
// from pieces.

// Keyboard focus ring. focusRingText adds the small radius used on text links.
export const focusRing =
  "focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary";
export const focusRingText = `${focusRing} rounded-md`;

// Buttons. Every variant has the same 2px border (transparent-looking on the
// solid one), so solid and outline buttons are exactly the same height.
const BUTTON_BASE = `inline-flex items-center justify-center gap-2 rounded-full border-2 font-medium text-center transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed ${focusRing}`;

const BUTTON_VARIANTS = {
  // Main action in a section (one per section, as a rule)
  primary:
    "border-primary bg-primary text-white hover:bg-primary/90 hover:border-primary/90",
  // Everything else
  secondary: "border-primary bg-white text-primary hover:bg-primaryLight",
};

const BUTTON_SIZES = {
  md: "min-h-[48px] px-5 sm:px-6 py-3",
  // Navbar, small cards
  sm: "min-h-[44px] px-4 py-2 text-sm",
  // Two buttons side by side on phones: narrower padding, one line
  compact: "min-h-[48px] px-3 sm:px-6 py-3 whitespace-nowrap",
};

/** e.g. button() or button("secondary", "sm") */
export function button(variant = "primary", size = "md") {
  return `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]}`;
}

// Underlined text link inside a sentence
export const textLink = `text-primary underline underline-offset-4 hover:text-primary/80 ${focusRingText}`;

// Small rounded link (quick links, "jump to" buttons). White with a light
// border, so it reads on both white and light-blue sections.
export const pill = `inline-flex items-center gap-2 min-h-[44px] rounded-full border border-primary/25 bg-white px-4 py-2 text-sm font-medium text-primary hover:border-primary hover:bg-primary hover:text-white transition-colors duration-200 ${focusRing}`;

// Non-interactive label on a card ("Via Medicare", "Private pay")
export const tag =
  "inline-block rounded-full bg-primaryLight px-3 py-1 text-xs font-semibold text-primary";

// Headings
export const sectionTitle =
  "text-2xl sm:text-3xl font-semibold text-primary mb-4";
export const subsectionTitle =
  "text-xl sm:text-2xl font-semibold text-primary mb-2";
export const cardTitle = "text-lg font-semibold text-gray-900";

// Vertical spacing of a page section, and of the shorter call-to-action band
export const sectionY = "py-12 md:py-20";
export const bandY = "py-10 md:py-16";

// Photos placed in a section (not hero backgrounds)
export const photo = "rounded-2xl shadow-brand w-full";
