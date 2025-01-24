import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Trophy, Users, Bell, Edit, Mail, Phone, User, Briefcase, Heart } from 'lucide-react';
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

  useEffect(() => {
    fetchUserData();
    fetchRegisteredEvents();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Profile load nahi ho paya');
    }
  };

  const fetchRegisteredEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/user/registered-events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setRegisteredEvents(data.events);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Events load nahi ho paye');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedData) => {
    console.log("Updated Profile Data:", updatedData); // Console log the data
    
    // Update the local state immediately for instant UI update
    setUser(prev => ({
      ...prev,
      personal: updatedData.personal,
      professional: updatedData.professional
    }));
    
    // Close the modal
    setIsProfileModalOpen(false);
    
    // Show success toast
    toast.success('Profile update ho gaya! 🎉');

    // Later we'll add the API call here
    // try {
    //   const token = localStorage.getItem('token');
    //   const response = await fetch('http://localhost:4000/api/user/profile', ...);
    //   // ... rest of the API logic
    // } catch (error) {
    //   console.error('Error:', error);
    //   toast.error('Profile update nahi ho paya');
    // }
  };

  const handleSportsUpdate = (updatedSports) => {
    console.log("Updated Sports Preferences:", updatedSports);
    
    // Update the local state
    setUser(prev => ({
      ...prev,
      sportsPreferences: updatedSports
    }));
    
    // Close the modal
    setIsSportsModalOpen(false);
    
    // Show success toast
    toast.success('Sports preferences update ho gaye! 🎯');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
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
              <>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{user?.personal?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{user?.personal?.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-gray-900">{user?.personal?.dateOfBirth}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-900">
                        {user?.personal?.address}, {user?.personal?.city}, {user?.personal?.state} - {user?.personal?.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="text-gray-900">{user?.personal?.gender}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'professional' && (
              <>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Occupation</p>
                      <p className="text-gray-900">{user?.professional?.occupation}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="text-gray-900">{user?.professional?.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="text-gray-900">{user?.professional?.experience}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {user?.professional?.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Education</p>
                    <p className="text-gray-900">{user?.professional?.education}</p>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'sports' && (
              <>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Indoor Sports</h3>
                  <div className="flex flex-wrap gap-2">
                    {user?.sportsPreferences?.indoor.map((sport, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Outdoor Sports</h3>
                  <div className="flex flex-wrap gap-2">
                    {user?.sportsPreferences?.outdoor.map((sport, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Registered Events */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Registered Events</h2>
          
          {registeredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No events registered yet</p>
              <Link 
                to="/events" 
                className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredEvents.map((event) => (
                <Link
                  key={event._id}
                  to={`/event/${event._id}`}
                  className="block bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={`http://localhost:4000${event.image}`}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        event.status === 'active' ? 'bg-green-100 text-green-800' : 
                        event.status === 'completed' ? 'bg-gray-100 text-gray-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.currentParticipants}/{event.maxParticipants}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Update Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSubmit={handleProfileUpdate}
        initialData={user}
      />

      <SportsPreferenceModal
        isOpen={isSportsModalOpen}
        onClose={() => setIsSportsModalOpen(false)}
        onSubmit={handleSportsUpdate}
        initialPreferences={user?.sportsPreferences}
      />
    </div>
  );
};

export default Dashboard;




