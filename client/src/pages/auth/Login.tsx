import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Apple } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Basic form validation
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Backend API 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password,
          }
        );

        localStorage.setItem("token", data.token);

        toast.success("Login successful");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);

      } catch (err: any) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl md:px-8 px-4 md:py-8 py-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo1.png" alt="CrickPulse" className="h-12 mb-2" />
          <p className="text-gray-500 font-semibold text-xl md:text-2xl text-center">
            Welcome back to CrickPulse
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              aria-label="Email Address"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              aria-label="Password"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Forgot password */}
          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-blue-600 underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google */}
        <button
          className="w-full flex items-center justify-center gap-3 border py-2.5 rounded-lg hover:bg-gray-50 transition mb-3"
          aria-label="Continue with Google"
        >
          {FcGoogle({ size: 20 })}
          Continue with Google
        </button>

        {/* Apple */}
        <button
          className="w-full flex items-center justify-center gap-3 border py-2.5 rounded-lg hover:bg-gray-50 transition"
          aria-label="Continue with Apple"
        >
          <Apple size={20} />
          Continue with Apple
        </button>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?
          <Link to="/register" className="text-blue-600 ml-1 font-medium underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;