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

/**
 * Handles scroll + focus reset on route change (important for screen readers),
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

    // Ensure page scroll resets
    window.scrollTo(0, 0);

    // The first load is announced by the browser itself
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    // Wait a moment for the new page's <Seo /> to update document.title
    const timer = setTimeout(() => setAnnouncement(document.title), 300);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {children}
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