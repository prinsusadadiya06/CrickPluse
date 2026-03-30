import React from "react";
import { useNavigate } from "react-router-dom";

const ResetSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl md:px-8 px-4 md:py-8 py-4 text-center">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">

          <img
            src="/logo1.png"
            alt="CrickPulse"
            className="h-12 mb-4"
          />

          <div className="flex justify-center mb-4">
            <svg
              className="w-16 h-16 text-green-500"
              viewBox="0 0 52 52"
            >
              <circle
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="circle"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                d="M14 27l7 7 16-16"
                className="check"
              />
            </svg>
          </div>

          <p className="text-gray-500 font-semibold text-xl md:text-2xl">
            Password Reset Successful
          </p>

          <span className="text-gray-400 text-sm mt-1">
            Your password has been updated successfully
          </span>

        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 rounded-lg font-semibold transition"
        >
          Go to Login
        </button>

      </div>

    </div>
  );
};

export default ResetSuccess;