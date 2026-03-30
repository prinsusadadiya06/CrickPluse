import React, { useEffect, useState } from "react";
import logo from "../assets/HeaderLogo.png";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 600);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen
      bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500
      transition-opacity duration-700
      ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="CrickPulse Logo"
        className="w-32 sm:w-40 md:w-44 mb-5 drop-shadow-xl animate-[logoFloat_2s_ease-in-out_infinite]"
      />

      {/* Spinner */}
      <div className="w-12 h-12 border-[3px] border-white/25 border-t-white rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="mt-5 text-white text-lg font-semibold tracking-wide animate-pulse">
        Loading CrickPulse...
      </p>

      {/* Animation */}
      <style>
        {`
        @keyframes logoFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        `}
      </style>
    </div>
  );
};

export default SplashScreen;