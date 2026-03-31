import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, Mail, User } from "lucide-react";
import { toast } from "sonner";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://crickpluse.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.log("Error fetching user");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden border">

        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex items-center gap-4">

          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-white text-blue-600 flex items-center justify-center text-xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-sm text-blue-100">{user?.email}</p>
          </div>

        </div>

        {/* Content */}
        <div className="p-6 space-y-4">

          {/* Name */}
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border hover:shadow-sm transition">
            <User className="text-indigo-500" size={20} />
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-semibold text-gray-800">
                {user?.name || "N/A"}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border hover:shadow-sm transition">
            <Mail className="text-indigo-500" size={20} />
            <div>
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="font-semibold text-gray-800">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border">
            <div className="text-indigo-500 text-lg">🔒</div>
            <div>
              <p className="text-xs text-gray-500">Password</p>
              <p className="font-semibold text-gray-800">••••••</p>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.removeItem("token");

              toast.success("Logged out successfully");

              setTimeout(() => {
                window.location.href = "/login";
              }, 1000);
            }}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Profile;