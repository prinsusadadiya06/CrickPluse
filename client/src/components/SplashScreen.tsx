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
      className={`
    fixed inset-0 z-[9999]
    flex items-center justify-center
    bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500
    transition-opacity duration-700
    ${fadeOut ? "opacity-0" : "opacity-100"}
  `}
    >
      <div className="flex flex-col items-center justify-center text-center">

        <img
          src={logo}
          alt="CrickPulse Logo"
          className="w-28 sm:w-36 md:w-44 mb-6 animate-[logoFloat_2s_ease-in-out_infinite]"
        />

        <div className="w-10 h-10 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>

        <p className="mt-4 text-white text-base sm:text-lg font-semibold animate-pulse">
          Loading CrickPulse...
        </p>

      </div>
    </div>
  );
};

export default SplashScreen;