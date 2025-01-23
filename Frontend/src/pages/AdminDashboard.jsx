import React from "react";
import Slidebar from "../components/Slidebar";
import { Users, CalendarDays, Trophy, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  // Mock data - replace with API calls
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: <Users size={24} className="text-blue-600" />,
      change: "+12%",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Events",
      value: "45",
      icon: <CalendarDays size={24} className="text-green-600" />,
      change: "+8%",
      bgColor: "bg-green-50",
    },
    {
      title: "Sports Categories",
      value: "18",
      icon: <Trophy size={24} className="text-purple-600" />,
      change: "+5%",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Participations",
      value: "3,456",
      icon: <TrendingUp size={24} className="text-pink-600" />,
      change: "+15%",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Slidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back, Admin! 👋</h1>
            <p className="text-gray-600">Here's what's happening with your platform today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} p-6 rounded-xl shadow-sm`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white shadow-sm">
                    {stat.icon}
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Recent Activities & Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activities
              </h2>
              {/* Add activities list here */}
            </div>

            {/* Charts */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Participation Trends
              </h2>
              {/* Add charts here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
