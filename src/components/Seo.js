import React from "react";
import { Helmet } from "react-helmet-async";

import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  OG_IMAGE_ALT,
  byPath,
} from "../seo/routes";

// Sets the document title, description, canonical URL and Open Graph /
// Twitter share tags for a page. Pass `path` for a page listed in
// src/seo/routes.js, or `title` + `noindex` for pages that should stay out of
// search results (like the 404 page).
export default function Seo({ path, title, description, noindex = false }) {
  const route = byPath[path];
  const pageTitle = title || (route && route.title) || SITE_NAME;
  const pageDescription = description || (route && route.description) || "";
  const url = route ? `${SITE_URL}${route.path === "/" ? "/" : route.path}` : null;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {pageDescription && <meta name="description" content={pageDescription} />}
      {noindex && <meta name="robots" content="noindex, follow" />}
      {url && <link rel="canonical" href={url} />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      {pageDescription && (
        <meta property="og:description" content={pageDescription} />
      )}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:alt" content={OG_IMAGE_ALT} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {pageDescription && (
        <meta name="twitter:description" content={pageDescription} />
      )}
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}
