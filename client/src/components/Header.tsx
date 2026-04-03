import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

import {
  Home, Calendar, Users, Briefcase, Crown, ChevronDown, Menu, Megaphone, User, Archive, Video, FileText, Layers
} from "lucide-react";

// Navigation Links
const navLinks = [
  { name: "Live Scores", to: "/", icon: <Home size={18} /> },
  { name: "Schedule", to: "/schedule", icon: <Calendar size={18} /> },
  { name: "Archives", to: "/archive", icon: <Archive size={18} /> },
  { name: "News", to: "/news", icon: <FileText size={18} /> },
  { name: "Teams", to: "/teams", icon: <Users size={18} /> },
  { name: "Videos", to: "/videos", icon: <Video size={18} /> },
];

const moreLinks = [
  { name: "FAQs", to: "/faqs" },
  { name: "Careers", to: "/careers", icon: <Briefcase size={18} /> },
  { name: "Support", to: "/contact", icon: <Megaphone size={18} /> },
];

const Header: React.FC = () => {

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://crickpluse.onrender.co/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (isLoggedIn) fetchProfile();
  }, [isLoggedIn]);



  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const moreRef = useRef<HTMLDivElement>(null);


  // Prevent scrolling when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      // lock scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // unlock scroll
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50  bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="max-w-8xl mx-4 flex items-center justify-between h-14 relative">

          {/* Hamburger - Mobile */}
          <button
            aria-label="Open menu"
            className="md:hidden text-white"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={28} />
          </button>

          {/* Logo */}
          <img src="/HeaderLogo.png" alt="CrickPulse Logo" className="h-14 w-auto transform scale-150" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-white font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "text-yellow-300" : "hover:text-gray-200"
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* More Dropdown */}
            <div className="relative group" ref={moreRef}>
              <button className="flex items-center gap-1 hover:text-gray-200">
                More <ChevronDown size={16} />
              </button>

              <div className="absolute left-0 mt-2.5 w-44 bg-white shadow-lg border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {moreLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Go Premium */}
            <NavLink
              to="/premium"
              className="bg-white text-gray-700 px-4 py-1.5 rounded-full shadow hover:bg-gray-100"
            >
              Go Premium
            </NavLink>

            {/* Profile / Login */}
            <div className="relative" ref={profileRef}>

              {/* WRAPPER */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      navigate("/login");
                    } else {
                      setProfileOpen(!profileOpen);
                    }
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-white hover:bg-white hover:text-blue-600 transition-colors"
                >
                  <User size={18} />
                </button>

                {/* GREEN DOT */}
                {isLoggedIn && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 border-2 border-white rounded-full shadow-[0_0_6px_2px_rgba(34,197,94,0.6)]"></span>
                )}
              </div>

              {/* Dropdown */}
              {profileOpen && isLoggedIn && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg border z-50">
                  <div
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="flex items-center gap-2 px-4 py-2 border-b text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  >
                    <User size={16} />
                    <div>
                      <p className="font-semibold">{profile?.name || "My Profile"}</p>
                      <p className="text-xs text-gray-400">{profile?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");

                      toast.success("Logged out successfully");

                      setProfileOpen(false);
                      setMobileOpen(false);

                      navigate("/login");
                    }}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile GET APP button */}
          <button
            onClick={() => navigate("/login")}
            className="md:hidden bg-white text-blue-600 rounded-full pt-1 pb-2.5 px-3 font-bold text-sm"
          >
            GET APP
          </button>
        </div>
      </header>


      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* LEFT PANEL */}
          <div className="w-[80%] bg-[#ECF0F1] h-full shadow-lg flex flex-col overflow-y-auto">
            {/* HEADER */}
            <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-3">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            {/* MENU LIST */}
            <div className="bg-white ">
              {/* Account Section */}
              <button
                onClick={() => {
                  setMobileOpen(false);

                  if (isLoggedIn) {
                    navigate("/profile");
                  } else {
                    navigate("/login");
                  }
                }}
                className="flex items-center gap-3 px-4 py-3 border-b font-medium hover:bg-gray-50 transition"
              >
                <User size={18} />
                My Account
              </button>

              {/* Spacer */}
              <div className="h-6 bg-gray-100"></div>

              <NavLink
                to="/schedule"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-50 transition"
              >
                <Calendar size={18} />
                Schedule
              </NavLink>

              <NavLink
                to="/archive"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-50 transition"
              >
                <Archive size={18} />
                Archive
              </NavLink>

              <NavLink
                to="/teams"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-50 transition"
              >
                <Users size={18} />
                Teams
              </NavLink>

              <div className="h-6 bg-gray-100"></div>

              {/* Premium Section */}
              <NavLink
                to="/premium"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 font-semibold text-yellow-600 hover:bg-gray-50 transition"
              >
                <Crown size={18} />
                Go Premium
              </NavLink>

              <div className="h-6 bg-gray-100"></div>

              {/* Careers & Advertise */}
              <NavLink
                to="/careers"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-50 transition"
              >
                <Briefcase size={18} />
                Careers
              </NavLink>

              <NavLink
                to="/advertise"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
              >
                <Megaphone size={18} />
                Advertise With Us
              </NavLink>

              <div className="h-6 bg-gray-100"></div>

              {/* Legal / Info */}
              <NavLink
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 border-b px-4 py-3 hover:bg-gray-50 transition"
              >
                About Us
              </NavLink>

              <NavLink
                to="/privacy"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 border-b px-4 py-3 hover:bg-gray-50 transition"
              >
                Privacy Notice
              </NavLink>

              <NavLink
                to="/terms"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
              >
                Terms of Service
              </NavLink>
            </div>
          </div>

          {/* OVERLAY */}
          <div
            className="w-[20%] bg-black/40"
            onClick={() => setMobileOpen(false)}
          ></div>
        </div>
      )}

      {/* MOBILE BOTTOM NAV */}
      <div className="bottom-0 bg-white overflow-hidden fixed w-full h-16 flex items-center p-2 justify-between z-10 md:hidden">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </NavLink>

        <NavLink
          to="/schedule"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs">Matches</span>
        </NavLink>

        <NavLink
          to="/schedule"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          <Layers className="h-5 w-5" />
          <span className="text-xs">Series</span>
        </NavLink>

        <NavLink
          to="/videos"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          <Video className="h-5 w-5" />
          <span className="text-xs">Videos</span>
        </NavLink>

        <NavLink
          to="/news"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          <FileText className="h-5 w-5" />
          <span className="text-xs">News</span>
        </NavLink>

      </div>
    </>
  );
};

export default Header;