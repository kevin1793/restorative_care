// Single source of truth for every indexable page's search/share metadata.
//
// Used by three things so they can never drift apart:
//   - <Seo /> (src/components/Seo.js) sets the tags in the browser,
//   - scripts/prerender.js writes a static copy of each page's <head> into the
//     build so crawlers and link-preview bots see the right tags without
//     running JavaScript,
//   - the same script generates sitemap.xml.
//
// CommonJS on purpose: the Node build script can require() it directly, and
// webpack still lets the app import it.

const SITE_URL = "https://restorativecarehhs.com";
const SITE_NAME = "Restorative Care HHS";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const OG_IMAGE_ALT =
  "Restorative Care HHS — compassionate home health care in Bedford, Texas";

const routes = [
  {
    path: "/",
    title: "Restorative Care HHS – Home Health Care Services in Texas",
    description:
      "Restorative Care HHS provides professional in-home health care, skilled nursing, and personal care services to support comfort, independence, and wellbeing for patients at home.",
    heading: "Compassionate Home Health Care in Bedford, TX",
    changefreq: "monthly",
    priority: "1.0",
  },
  {
    path: "/services",
    title: "Our Services | Restorative Care HHS",
    description:
      "Explore Restorative Care HHS's home health, personal attendant, and private duty services — skilled nursing, therapy, and daily living support in Bedford, TX.",
    heading: "Our Services",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/veterans",
    title: "Veteran Services | Restorative Care HHS",
    description:
      "Restorative Care HHS provides compassionate respite and homemaker caregiving services for veterans under VCA and TriWest agreements. Learn how to get started.",
    heading: "Quality Home Care for Veterans",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/service-area",
    title: "Counties We Serve | Restorative Care HHS",
    description:
      "Restorative Care HHS serves 11 counties across North and Central Texas, including Collin, Dallas, Denton, Ellis, Hood, Johnson, Kaufman, Navarro, Parker, Tarrant, and Wise.",
    heading: "Counties We Serve",
    changefreq: "yearly",
    priority: "0.8",
  },
  {
    path: "/contact",
    title: "Contact Us | Restorative Care HHS",
    description:
      "Reach Restorative Care Home Health Services in Bedford, TX by phone, email, or our contact form to schedule a free in-home assessment.",
    heading: "Contact Us",
    changefreq: "yearly",
    priority: "0.9",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Restorative Care HHS",
    description:
      "How Restorative Care Home Health Services collects, uses, and protects the personal information you share with us.",
    heading: "Privacy Policy",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service | Restorative Care HHS",
    description:
      "Terms governing your use of the Restorative Care Home Health Services website.",
    heading: "Terms of Service",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/accessibility",
    title: "Accessibility Statement | Restorative Care HHS",
    description:
      "Restorative Care Home Health Services is committed to making this website accessible to everyone, including people with disabilities. Learn what we do and how to reach us for help.",
    heading: "Accessibility Statement",
    changefreq: "yearly",
    priority: "0.4",
  },
  {
    path: "/nondiscrimination",
    title: "Notice of Nondiscrimination | Restorative Care HHS",
    description:
      "Restorative Care Home Health Services does not discriminate. Free language assistance and aids for people with disabilities are available. Learn how to file a complaint.",
    heading: "Notice of Nondiscrimination",
    changefreq: "yearly",
    priority: "0.4",
  },
];

const byPath = Object.fromEntries(routes.map((r) => [r.path, r]));

// The "page not found" page. Not in `routes` on purpose: it must stay out of
// the sitemap and carry noindex. scripts/prerender.js writes it to
// build/404.html, which the server returns (with a real 404 status) for any
// URL that isn't a page — see public/.htaccess.
const notFound = {
  title: "Page Not Found | Restorative Care HHS",
  description:
    "The page you were looking for could not be found. Return to the Restorative Care HHS home page or contact us for help.",
  heading: "Page Not Found",
};

module.exports = {
  notFound,
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  OG_IMAGE_ALT,
  routes,
  byPath,
};
