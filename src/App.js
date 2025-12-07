import logo from './logo.png';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import About from "./pages/About";
import ServicesPage from "./pages/ServicesPage";
import VeteransPage from "./pages/VeteransPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/veterans" element={<VeteransPage />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
