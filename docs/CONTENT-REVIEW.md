# Content waiting on review

These notes were left in the code while the site was built. They mark copy and
decisions that need the owner's sign-off, or point at sections of the original
project report ("report §x.y"). They are listed here so nothing is forgotten;
the comments themselves are still in the code at the lines shown.

## Needs sign-off

- `src/components/Footer.js:17` // Juice has actually confirmed are active. Shared with FacebookFeedEmbed
- `src/pages/HomePage.js:99` // Client-benefit copy drafted per report §3.17 — pending Juice's review
- `src/pages/ServicesPage.js:51` // payer paths (report §4.6, correction from Juice July 23). Each is tied

## References to the project report

- `src/components/AccessibilityControls.js:12` // normal base size (report §3.15).
- `src/components/ContactForm.js:5` // Matches the site-wide taxonomy exactly (report §3.17 / §4.9.3) — 5
- `src/components/ContactForm.js:245` {/* Name / Email / Phone — 2-column grid on desktop (report §3.9) */}
- `src/components/ContactForm.js:339` one type of care at once (report §4.9.3) */}
- `src/components/ContactForm.js:385` before a human ever sees the lead (report §4.9.3) */}
- `src/components/ContactForm.js:475` {/* Privacy-conscious note (report §3.9) */}
- `src/components/FacebookFeedEmbed.js:8` // someone to grab a new post URL every time (report §4.10).
- `src/components/Footer.js:35` // design system pass (report §4.4) — a thin, low-contrast footer is the
- `src/components/InsuranceSection.js:29` // dropdown (report §4.2) without the two lists drifting out of sync.
- `src/components/PageHero.js:4` // future pages) — report §4.7.1. Consolidates three previously bespoke
- `src/components/ServiceAreaMap.js:8` // Real U.S. Census county boundary data (report §4.1) — not hand-drawn
- `src/pages/ContactPage.js:37` {/* Hero Section — shared component (report §4.9.1); also fixes
- `src/pages/HomePage.js:162` light-blue sections on the page (report §4.4) */}
- `src/pages/HomePage.js:195` (report §1.2) */}
- `src/pages/HomePage.js:215` {/* Trust bar (report §1.3) */}
- `src/pages/HomePage.js:265` paragraph (report §2.2) */}
- `src/pages/HomePage.js:394` {/* Cross-link to Insurance & Payers (report §4.6) — each
- `src/pages/HomePage.js:458` {/* Quick-link pills (report §3.18) */}
- `src/pages/HomePage.js:568` {/* Tips From Our Team — live Facebook feed (report §4.10).
- `src/pages/ServiceAreaPage.js:125` not just decoration alongside the map (report §4.1). */}
- `src/pages/ServicesPage.js:19` // Kept identical to the homepage's Skilled Services copy (report §4.6 —
- `src/pages/ServicesPage.js:102` {/* Hero Section — shared component (report §4.6/§4.7.1); also
- `src/pages/ServicesPage.js:223` one blended service (report §4.6 correction, July 23) */}
- `src/pages/ServicesPage.js:289` {/* Cross-link to Insurance & Payers on the homepage (report §4.6) */}
- `src/pages/VeteransPage.js:34` // (report §4.7.2). The real VA.gov hrefs are preserved exactly as they
- `src/pages/VeteransPage.js:115` {/* Hero Section — shared component (report §4.7.1); also fixes
- `src/pages/VeteransPage.js:124` {/* How to Get Care — numbered step timeline (report §4.7.2) */}
