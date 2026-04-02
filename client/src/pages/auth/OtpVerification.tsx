import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";



const OtpVerification: React.FC = () => {

  const location = useLocation();
  const email = location.state?.email;

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < otp.length - 1) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  //Backend API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    try {
      setIsLoading(true);

      await axios.post("https://crickpluse.onrender.com/api/auth/verify-otp", {
        email,
        otp: code,
      });

      toast.success("OTP verified successfully");

      navigate("/reset-password", { state: { email } });

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  //Reset OTP

  const handleResend = async () => {
    try {
      setIsResending(true);

      const id = toast.loading("Resending OTP...");

      await axios.post("https://crickpluse.onrender.com/api/auth/forgot-password", {
        email: location.state?.email,
      });

      toast.success("OTP resent successfully", { id });

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error resending OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl md:px-8 px-4 md:py-8 py-4">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">

          <img
            src="/logo1.png"
            alt="CrickPulse"
            className="h-12 mb-2"
          />

          <p className="text-gray-500 font-semibold text-xl md:text-2xl text-center">
            OTP Verification
          </p>

          <span className="text-gray-400 text-sm text-center mt-1">
            Enter the 4-digit code sent to your email
          </span>

        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center border rounded-xl focus:ring-2 focus:ring-blue-500 text-xl font-semibold outline-none"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed active:scale-95 text-white py-2.5 rounded-lg font-semibold transition flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>

        </form>

        {/* Resend */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn't receive the code?
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-blue-600 ml-1 font-medium underline disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        </p>

        {/* Back to login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered your password?
          <Link
            to="/login"
            className="text-blue-600 ml-1 font-medium underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default OtpVerification;