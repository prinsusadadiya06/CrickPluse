import React from "react";
import { Facebook, Twitter, Youtube } from "lucide-react";
import { FaPinterest, FaAndroid, FaApple } from "react-icons/fa";

const PinterestIcon = FaPinterest as React.ElementType;
const AndroidIcon = FaAndroid as React.ElementType;
const AppleIcon = FaApple as React.ElementType;

const Footer: React.FC = () => {
  return (

    <footer className="bg-gray-700 text-white mt-[120px] py-8">
      <div className="w-[1024px] mx-auto px-8 flex flex-col gap-8">

        {/* columns */}
        <div className="flex w-[1024px] px-32 columns-4 justify-between text-white p-5 ">

          {/* Logo */}
          <div className="text-2xl font-bold">
            <img src="/HeaderLogo.png" alt="CrickPulse" className="h-14 w-auto transform scale-150" />
          </div>

          {/* APPS */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold mb-2">APPS</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-sm">
                <AndroidIcon size={22} /><p className="text-[14px] text-bold">Android</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <AppleIcon size={22} /> <p className="text-[14px] text-bold">IOS</p>
              </div>

            </div>
          </div>

          {/* FOLLOW US ON */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-base mb-2">FOLLOW US ON</h3>
            <div className="flex flex-col gap-4">
              <a href="https://www.facebook.com" target="_blank"  rel="noopener noreferrer" className="flex items-center gap-4 text-[14px] text-bold"><Facebook size={22}  /> Facebook</a>
              <a href="https://www.twitter.com" target="_blank"  rel="noopener noreferrer" className="flex items-center gap-4 text-[14px] text-bold"><Twitter size={22} /> Twitter</a>
              <a href="https://www.youtube.com" target="_blank"  rel="noopener noreferrer" className="flex items-center gap-4 text-[14px] text-bold"><Youtube size={22} /> Youtube</a>
              <a href="https://www.pinterest.com" target="_blank"  rel="noopener noreferrer" className="flex items-center gap-4 text-[14px] text-bold">
                <PinterestIcon size={16} /> Pinterest
              </a>
            </div>
          </div>

          {/* COMPANY */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold mb-2">COMPANY</h3>
            <div className="flex flex-col gap-4">
              <a href="/careers" className="hover:text-gray-300 text-[14px]  text-bold">Careers</a>
               <a href="/advertise" className="hover:text-gray-300 text-[14px]  text-bold">Advertise</a>
              <a href="/about" className="hover:text-gray-300 text-[14px] text-bold">About Us</a>
              <a href="/privacy" className="hover:text-gray-300 text-[14px] text-bold">Privacy Notice</a>
              <a href="/terms" className="hover:text-gray-300 text-[14px] text-bold">Terms of Service</a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="text-center text-xs mt-[50px]">
          © 2026 CrickPulse.com, CrickPulse Platforms Limited. All rights reserved | The Times of India | Navbharat Times
        </div>

      </div>
    </footer>
  );
};

export default Footer;