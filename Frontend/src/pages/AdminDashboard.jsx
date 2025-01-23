import React from "react";
import Slidebar from "../components/Slidebar";
import { Users, CalendarDays, Trophy, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  // Mock data for activities
  const recentActivities = [
    {
      id: 1,
      type: "New Registration",
      user: "Priya Sharma",
      time: "2 minutes ago",
      icon: <Users size={20} className="text-blue-500" />,
    },
    {
      id: 2,
      type: "Event Created",
      user: "Sports Club Mumbai",
      time: "1 hour ago",
      icon: <CalendarDays size={20} className="text-green-500" />,
    },
    {
      id: 3,
      type: "Tournament Started",
      user: "Cricket Championship",
      time: "3 hours ago",
      icon: <Trophy size={20} className="text-purple-500" />,
    }
  ];

  // Mock data for chart
  const chartData = [
    { month: 'Jan', users: 400, events: 24 },
    { month: 'Feb', users: 600, events: 28 },
    { month: 'Mar', users: 800, events: 35 },
    { month: 'Apr', users: 1000, events: 40 },
    { month: 'May', users: 1200, events: 45 },
    { month: 'Jun', users: 1500, events: 52 },
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700">View All</button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-gray-50">{activity.icon}</div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                      <p className="text-sm text-gray-500">{activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Participation Trends */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Participation Trends</h2>
                <select className="text-sm border rounded-md p-1">
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={2} />
                    <Line type="monotone" dataKey="events" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
