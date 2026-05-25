import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import VeteransPage from "./pages/VeteransPage";
import ContactPage from "./pages/ContactPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/**
 * Handles scroll + focus reset on route change (important for screen readers)
 */
function RouteAnnouncer({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Move focus to top of page on route change
    const main = document.getElementById("main-content");

    if (main) {
      main.focus();
    }

    // Ensure page scroll resets
    window.scrollTo(0, 0);
  }, [location]);

  return children;
}

function App() {
  return (
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
      <main id="main-content" tabIndex={-1}>
        <RouteAnnouncer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/veterans" element={<VeteransPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </RouteAnnouncer>
      </main>

      <Footer />
    </Router>
  );
}

export default App;