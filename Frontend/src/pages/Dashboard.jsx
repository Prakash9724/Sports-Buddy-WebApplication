import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Trophy, Users, Bell, Edit, Mail, Phone, User, Briefcase, Heart, Building } from 'lucide-react';
import { toast } from 'react-hot-toast';
import UserProfileModal from '../components/UserProfileModal';
import SportsPreferenceModal from '../components/SportsPreferenceModal';

// Dummy user data
const dummyUser = {
  personal: {
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya@gmail.com",
    phone: "+91 9876543210",
    gender: "Female",
    dateOfBirth: "1995-06-15",
    address: "123, Green Park",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001"
  },
  professional: {
    occupation: "Software Engineer",
    company: "Tech Solutions Ltd",
    experience: "5 years",
    education: "B.Tech in Computer Science",
    skills: ["Leadership", "Team Management", "Problem Solving"]
  },
  sportsPreferences: {
    indoor: ["Badminton", "Table Tennis", "Chess"],
    outdoor: ["Cricket", "Football", "Tennis"]
  }
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSportsModalOpen, setIsSportsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('userToken');
        const userData = localStorage.getItem('userData');

        if (!token) {
          navigate('/login');
          return;
        }

        // Set initial user data from localStorage
        if (userData) {
          setUser(JSON.parse(userData));
        }

        // Fetch latest user data
        const profileResponse = await fetch('https://sports-buddy-webapplication.onrender.com/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (profileResponse.status === 401) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('userData');
          navigate('/login');
          return;
        }

        const profileData = await profileResponse.json();
        
        if (profileData.success) {
          setUser(profileData.user);
          
          // Fetch registered events
          const eventsResponse = await fetch('https://sports-buddy-webapplication.onrender.com/api/users/registered-events', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          const eventsData = await eventsResponse.json();
          if (eventsData.success) {
            setRegisteredEvents(eventsData.events);
          }
        } else {
          toast.error(profileData.message);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleProfileUpdate = (updatedUser) => {
    console.log('Updating user in dashboard:', updatedUser); // Debug log
    setUser(updatedUser);
    
    // Also update userData in localStorage
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  const handleSportsUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please login to view your dashboard</p>
          <Link 
            to="/login"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card with Gradient Border */}
        <div className="bg-white rounded-2xl p-1 mb-8 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500">
          <div className="bg-white rounded-xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full p-1">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-indigo-600" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-gray-600 mt-1">{user?.professional?.occupation} at {user?.professional?.company}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
                <button
                  onClick={() => setIsSportsModalOpen(true)}
                  className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Update Sports
                </button>
              </div>
            </div>

            {/* Fancy Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex flex-wrap gap-4">
                {['personal', 'professional', 'sports'].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-4 px-4 relative ${
                      activeTab === tab
                        ? 'text-indigo-600 font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Details
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content with Cards */}
            <div className="bg-gray-50 rounded-xl p-6 ">
              {activeTab === 'personal' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span>{user.personal?.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <span>{user.personal?.gender || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span>{user.personal?.dateOfBirth || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span>{user.personal?.address || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-gray-400" />
                      <span>{user.personal?.city}, {user.personal?.state} - {user.personal?.pincode}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'professional' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                      <span>{user.professional?.occupation || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-gray-400" />
                      <span>{user.professional?.company || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span>{user.professional?.experience || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span>{user.professional?.education || 'Not provided'}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {user.professional?.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sports' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Indoor Sports</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {user.sportsPreferences?.indoor?.map((sport, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Outdoor Sports</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {user.sportsPreferences?.outdoor?.map((sport, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Registered Events Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Your Sports Journey 🏆
          </h2>
          {registeredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredEvents.map((event) => (
                <Link 
                  key={event._id} 
                  to={`/event/${event._id}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={`https://sports-buddy-webapplication.onrender.com${event.image}`}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                      {event.sport}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                      <Clock className="h-4 w-4 ml-4 mr-2" />
                      {event.time}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="text-gray-500 mb-4">Abhi tak koi events join nahi kiye? 🤔</div>
              <Link 
                to="/events" 
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                Events Explore Karo! 🎯
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Profile Update Modal */}
      <UserProfileModal
        key={user?._id}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdate={handleProfileUpdate}
      />

      <SportsPreferenceModal
        isOpen={isSportsModalOpen}
        onClose={() => setIsSportsModalOpen(false)}
        user={user}
        onUpdate={handleSportsUpdate}
      />
    </div>
  );
};

export default Dashboard;




