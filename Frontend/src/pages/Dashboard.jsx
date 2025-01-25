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
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:4000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log("Profile data:", data); // Debug log

        if (data.success) {
          setUser(data.user);
          // After getting user, fetch their events
          fetchRegisteredEvents(token);
        } else {
          toast.error(data.message);
          if (response.status === 401) {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Profile load nahi ho paya');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const fetchRegisteredEvents = async (token) => {
    try {
      const response = await fetch('http://localhost:4000/api/users/registered-events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log("Events data:", data); // Debug log
      
      if (data.success) {
        setRegisteredEvents(data.events || []);
      } else {
        toast.error(data.message || 'Events load nahi ho paye');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Events load nahi ho paye');
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-gray-600">{user?.professional?.occupation} at {user?.professional?.company}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsProfileModalOpen(true);
                }}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  setIsSportsModalOpen(true);
                }}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Heart className="h-4 w-4 mr-2" />
                Update Sports
              </button>
            </div>
          </div>

          {/* Profile Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                className={`pb-4 px-1 ${
                  activeTab === 'personal'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('personal')}
              >
                Personal Details
              </button>
              <button
                className={`pb-4 px-1 ${
                  activeTab === 'professional'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('professional')}
              >
                Professional Details
              </button>
              <button
                className={`pb-4 px-1 ${
                  activeTab === 'sports'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('sports')}
              >
                Sports Preferences
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Registered Events */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Registered Events</h2>
          {registeredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registeredEvents.map((event) => (
                <Link 
                  key={event._id} 
                  to={`/event/${event._id}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <img 
                      src={`http://localhost:4000${event.image}`}
                      alt={event.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                      <p className="text-sm text-indigo-600">{event.sport}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Koi registered events nahi hain 😢</p>
          )}
        </div>
      </div>

      {/* Profile Update Modal */}
      <UserProfileModal
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




