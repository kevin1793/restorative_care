import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { useEffect, useRef, useState } from "react";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import VeteransPage from "./pages/VeteransPage";
import ContactPage from "./pages/ContactPage";
import ServiceAreaPage from "./pages/ServiceAreaPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import AccessibilityStatementPage from "./pages/AccessibilityStatementPage";
import NondiscriminationPage from "./pages/NondiscriminationPage";
import NotFoundPage from "./pages/NotFoundPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AccessibilityControls from "./components/AccessibilityControls";
import useScrollReveal from "./hooks/useScrollReveal";

/**
 * Handles scroll + focus reset on page change (important for screen readers),
 * and announces the new page's title in a polite live region. In a single-page
 * app the browser doesn't announce a page load on navigation, so without this
 * a screen reader user gets no confirmation that the page changed.
 */
function RouteAnnouncer({ children }) {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Move focus to top of page on route change
    const main = document.getElementById("main-content");

    if (main) {
      main.focus();
    }

    // Ensure page scroll resets. "instant" because the site scrolls smoothly
    // otherwise (see index.css), and a page change should not animate. Keyed
    // on pathname only: an in-page link like #contact changes the hash, not
    // the page, and must be left to scroll to its target.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // The first load is announced by the browser itself
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    // Wait a moment for the new page's <Seo /> to update document.title
    const timer = setTimeout(() => setAnnouncement(document.title), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Sections below the fold rise in as they scroll into view
  useScrollReveal(location.pathname);

  return (
    <>
      {/* Keyed by page so each new page fades in (see .page-enter) */}
      <div key={location.pathname} className="page-enter">
        {children}
      </div>
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        {/* Skip link target should exist on every page */}
        <a
          href="#main-content"
          className="
            sr-only
            focus:not-sr-only
            focus:absolute
            focus:top-2
            focus:left-2
            focus:bg-white
            focus:text-black
            focus:px-4
            focus:py-2
            focus:z-50
            focus:rounded-md
          "
        >
          Skip to main content
        </a>

        <Navbar />

        {/* Main landmark for accessibility */}
        <main id="main-content" tabIndex={-1} className="outline-none">
          <RouteAnnouncer>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/veterans" element={<VeteransPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/service-area" element={<ServiceAreaPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route
                path="/accessibility"
                element={<AccessibilityStatementPage />}
              />
              <Route
                path="/nondiscrimination"
                element={<NondiscriminationPage />}
              />
              <Route
                path="/terms-of-service"
                element={<TermsOfServicePage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </RouteAnnouncer>
        </main>

        <Footer />

        <AccessibilityControls />
      </Router>
    </HelmetProvider>
  );
}

export default App;