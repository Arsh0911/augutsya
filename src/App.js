// src/App.js
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Store from './pages/Store';
import Utilities from './pages/Utilities';
import ContactUs from './pages/Contact-us';
import AboutUs from './pages/About-us'; 
import PrivacyPolicy from "./pages/PrivacyPolicy";




export default function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/store" element={<Store />} />
        <Route path="/utilities" element={<Utilities />} />
        <Route path="/contact-us" element={<ContactUs />} />
       <Route path="/about" element={<AboutUs />} />
       <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        
      </Routes>
      <Footer />
    </div>
  );
}
