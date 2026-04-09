import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

    // Basic form validation
    const validateForm = () => {
        const newErrors: { name?: string; email?: string; password?: string } = {};
        if (!name.trim()) newErrors.name = "Full Name is required";
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
                setIsLoading(true);

                await axios.post("https://crickpluse.onrender.com/api/auth/register", {
                    name,
                    email,
                    password,
                });

                toast.success("Registration successful");

                setTimeout(() => {
                    window.location.href = "/login";
                }, 1000);

            } catch (err: any) {
                toast.error(err.response?.data?.message || "Register failed");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl md:px-8 px-4 md:py-8 py-4">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img src="/logo1.png" alt="CrickPulse" className="h-12 mb-2" />
                    <p className="text-gray-500 font-semibold text-xl md:text-2xl text-center">
                        Get started with CrickPulse
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            aria-label="Full Name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

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

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed active:scale-95 text-white py-2.5 rounded-lg font-semibold transition flex items-center justify-center"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Creating...
                            </span>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="px-3 text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Login link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-blue-600 ml-1 cursor-pointer font-medium underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;