import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// Auth Imports
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetSuccess from "./pages/auth/ResetSuccess";
import OtpVerification from "./pages/auth/OtpVerification";

// Pages Imports
import Home from "./pages/Home";
import SplashScreen from "./components/SplashScreen";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Teams from "./pages/Teams";
import Schedule from "./pages/Schedule";
import Contact from "./pages/Contact";
import MatchDetails from "./pages/MatchDetails";
import Premium from "./pages/Premium";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Careers from "./pages/Careers";
import Faqs from './pages/Faqs';
import AboutUs from "./pages/AboutUs";
import Advertise from "./pages/Advertise"
import Archive from "./pages/Archive";
import News from "./pages/News";
import Profile from "./pages/Profile";
import Videos from "./pages/Videos";
import NotFound from "./pages/NotFound";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");


    if (!hasSeenSplash) {
      setLoading(true);
    }

    const perfEntries = window.performance.getEntriesByType("navigation");
    if (perfEntries.length > 0 && (perfEntries[0] as any).type === "reload") {
      setLoading(true);
    }
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem("hasSeenSplash", "true");
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <SplashScreen onFinish={handleFinish} />
      ) : (
        <Router>
          <Toaster richColors position="top-right" duration={5000} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<OtpVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-success" element={<ResetSuccess />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/news" element={<News />} />
            <Route path="/details/:type/:id" element={<MatchDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollToTopButton />
        </Router>
      )}
    </>
  );
}

export default App;