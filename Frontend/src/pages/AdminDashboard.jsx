import React, { useState, useEffect } from "react";
import Slidebar from "../components/Slidebar";
import { Users, CalendarDays, Trophy, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch Stats
      const statsResponse = await fetch('http://localhost:5000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const statsData = await statsResponse.json();

      // Fetch Recent Activities
      const activitiesResponse = await fetch('http://localhost:5000/api/admin/activities', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const activitiesData = await activitiesResponse.json();

      // Fetch Chart Data
      const chartResponse = await fetch('http://localhost:5000/api/admin/participation-trends', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const chartData = await chartResponse.json();

      setStats({
        totalUsers: {
          title: "Total Users",
          value: statsData.totalUsers,
          icon: <Users size={24} className="text-blue-600" />,
          change: statsData.userGrowth,
          bgColor: "bg-blue-50",
        },
        activeEvents: {
          title: "Active Events",
          value: statsData.activeEvents,
          icon: <CalendarDays size={24} className="text-green-600" />,
          change: statsData.eventGrowth,
          bgColor: "bg-green-50",
        },
        sportsCategories: {
          title: "Sports Categories",
          value: statsData.sportsCategories,
          icon: <Trophy size={24} className="text-purple-600" />,
          change: statsData.categoryGrowth,
          bgColor: "bg-purple-50",
        },
        totalParticipations: {
          title: "Total Participations",
          value: statsData.totalParticipations,
          icon: <TrendingUp size={24} className="text-pink-600" />,
          change: statsData.participationGrowth,
          bgColor: "bg-pink-50",
        },
      });

      setActivities(activitiesData.activities);
      setChartData(chartData.trends);
      setIsLoading(false);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Slidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

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
            {stats && Object.values(stats).map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} p-6 rounded-xl shadow-sm`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white shadow-sm">
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    parseFloat(stat.change) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value.toLocaleString()}
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
                {activities.map((activity) => (
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
