import React, { useEffect } from "react";
import { Link } from "react-router-dom";

interface SubscribeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen = false,
  onClose = () => {},
}) => {
  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center bg-black bg-opacity-50 z-50 px-0 sm:px-3"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:w-11/12 max-w-lg md:max-w-3xl sm:rounded-lg h-auto sm:h-[70vh] shadow-lg relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl pl-[13px]"
        >
          ×
        </button>

        {/* Header row */}
        <div className="flex justify-between items-center border-b-2 border-[#E2E2E2] p-4 sm:p-5 pb-5 mb-4">
          <h2 className="font-bold text-base md:text-base">
            CrickPluse Plus Ads Free Plan
          </h2>
          <span className="font-bold flex items-center px-[18px] sm:px-[26px] gap-2 sm:gap-3 text-sm sm:text-base">
            INR 199 <span className="font-normal">|</span>
          </span>
        </div>

        {/* Card-like description */}
        <div className="bg-white shadow-md p-3 rounded-md mb-6 w-11/12 max-w-md mx-auto flex flex-col gap-2">
          <h3 className="font-bold text-sm sm:text-base">No Ads</h3>
          <p className="text-xs text-gray-600">
            Enjoy an ad-free experience (Excludes Branded content & In-video ads)
          </p>
        </div>

        {/* Subscribe button */}
        <Link
          to="/login"
          className="w-full md:w-[36%] bg-blue-500 hover:bg-blue-600 text-white font-bold text-base sm:text-lg py-3 block mx-auto text-center md:mt-[50px] md:mb-6 mb-3"
        >
          Subscribe Now
        </Link>
      </div>
    </div>
  );
};

export default SubscribeModal;