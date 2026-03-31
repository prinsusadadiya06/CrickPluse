import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";


const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  //Backend API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("https://crickpluse.onrender.com/api/auth/reset-password", {
        email,
        newPassword,
      });

      navigate("/reset-success");

    } catch (err: any) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl md:px-8 px-4 md:py-8 py-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo1.png" alt="CrickPulse" className="h-12 mb-2" />
          <p className="text-gray-500 font-semibold text-xl md:text-2xl text-center">
            Reset Password
          </p>
          <span className="text-gray-400 text-sm text-center mt-1">
            Set a new password for your account
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              aria-label="New Password"
              className="w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              aria-label={showNewPassword ? "Hide new password" : "Show new password"}
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-label="Confirm Password"
              className="w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 rounded-lg font-semibold transition"
            aria-label="Reset Password"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?
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

export default ResetPassword;