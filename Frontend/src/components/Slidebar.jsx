import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Bell,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Slidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Admin logged out successfully');
    navigate('/admin/login');
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={24} />,
      path: "/admin/dashboard",
    },
    {
      title: "Users",
      icon: <Users size={24} />,
      path: "/admin/users",
    },
    {
      title: "Events",
      icon: <CalendarDays size={24} />,
      path: "/admin/events",
    },
    {
      title: "Sports",
      icon: <Trophy size={24} />,
      path: "/admin-dashboard/sports",
    },
    {
      title: "Notifications",
      icon: <Bell size={24} />,
      path: "/admin-dashboard/notifications",
    },
    {
      title: "Settings",
      icon: <Settings size={24} />,
      path: "/admin-dashboard/settings",
    },
  ];

  return (
    <div
      className={`${
        isExpanded ? "w-72" : "w-20"
      } h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-8 bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        {isExpanded ? (
          <ChevronLeft size={20} />
        ) : (
          <ChevronRight size={20} />
        )}
      </button>

      {/* Logo Section */}
      <div className="p-4 border-b">
        {isExpanded ? (
          <h1 className="text-xl font-bold text-indigo-600">Sports Buddy</h1>
        ) : (
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">SB</span>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="py-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-4 py-3 mb-1 transition-colors ${
              location.pathname === item.path
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <span className={location.pathname === item.path ? "text-indigo-600" : ""}>
                {item.icon}
              </span>
              {isExpanded && (
                <span className="ml-3 font-medium">{item.title}</span>
              )}
            </div>
          </Link>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleAdminLogout}
          className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <LogOut size={24} />
          {isExpanded && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Slidebar;
