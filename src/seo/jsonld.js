// Structured data (JSON-LD) for each page, written into the page's static
// HTML by scripts/prerender.js so search engines read it without running any
// JavaScript. The business itself (name, address, phone, areas served) is
// described once in public/index.html; these entries add the page-specific
// parts and point back at that business by its @id.
//
// CommonJS for the same reason as routes.js.

const { SITE_URL } = require("./routes");

const BUSINESS_ID = `${SITE_URL}/#business`;

// Names match the list in public/index.html's service catalog
const SERVICE_NAMES = [
  "Skilled Nursing",
  "Physical Therapy",
  "Occupational Therapy",
  "Speech Therapy",
  "Medical Social Work",
  "Home Health Aide (HHA)",
  "Personal Care Attendant (PCA)",
];

function breadcrumbs(route) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: route.heading,
        item: `${SITE_URL}${route.path}`,
      },
    ],
  };
}

function servicesList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Home health services",
    itemListElement: SERVICE_NAMES.map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name,
        provider: { "@id": BUSINESS_ID },
      },
    })),
  };
}

function veteransService(route) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Respite and homemaker caregiving for veterans",
    description: route.description,
    provider: { "@id": BUSINESS_ID },
    audience: { "@type": "Audience", audienceType: "Veterans" },
    url: `${SITE_URL}${route.path}`,
  };
}

// An array of JSON-LD objects for a route (empty for the home page, whose
// data lives in index.html)
function jsonLdFor(route) {
  if (route.path === "/") return [];
  const entries = [breadcrumbs(route)];
  if (route.path === "/services") entries.push(servicesList());
  if (route.path === "/veterans") entries.push(veteransService(route));
  return entries;
}

module.exports = { jsonLdFor };
