import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  //Backend API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }

    try {
      const id = toast.loading("Sending OTP...");

      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      toast.success("OTP sent to your email", { id });

      navigate("/otp", { state: { email } });

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl md:px-8 px-4 md:py-8 py-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo1.png" alt="CrickPulse" className="h-12 mb-2" />
          <p className="text-gray-500 font-semibold text-xl md:text-2xl text-center">
            Forgot Password
          </p>
          <span className="text-gray-400 text-sm text-center mt-1">
            Enter your email to receive OTP
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${error ? "border-red-500" : ""
                }`}
              aria-label="Email Address"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* Send OTP */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 rounded-lg font-semibold transition"
            aria-label="Send OTP"
          >
            Send OTP
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?
          <Link to="/login" className="text-blue-600 ml-1 font-medium underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;