import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Plus, Edit } from 'lucide-react';
import UserProfileModal from '../components/UserProfileModal';

const Dashboard = () => {
  // Mock data - will be replaced with API calls
  const [events] = useState([
    {
      id: 1,
      title: 'Weekend Football Match',
      sport: 'Football',
      location: 'Central Park',
      date: '2024-03-20',
      time: '10:00 AM',
      participants: 12,
      maxParticipants: 22
    },
    {
      id: 2,
      title: 'Basketball Tournament',
      sport: 'Basketball',
      location: 'Community Center',
      date: '2024-03-22',
      time: '2:00 PM',
      participants: 8,
      maxParticipants: 15
    }
  ]);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUserProfile(data.user);
      }
    } catch (error) {
      console.error('Profile fetch karne mein error:', error);
    }
  };

  const handleProfileUpdate = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setUserProfile(data.user);
        setIsProfileModalOpen(false);
      }
    } catch (error) {
      console.error('Profile update mein error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
          
          {userProfile && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Personal Details</h3>
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
                <div className="space-y-3">
                  <p><span className="font-medium">Name:</span> {userProfile.firstName} {userProfile.lastName}</p>
                  <p><span className="font-medium">Email:</span> {userProfile.email}</p>
                  <p><span className="font-medium">Phone:</span> {userProfile.phone || 'Not provided'}</p>
                  <p><span className="font-medium">Address:</span> {userProfile.address || 'Not provided'}</p>
                  <p><span className="font-medium">City:</span> {userProfile.city || 'Not provided'}</p>
                  <p><span className="font-medium">State:</span> {userProfile.state || 'Not provided'}</p>
                  <p><span className="font-medium">Pincode:</span> {userProfile.pincode || 'Not provided'}</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Sports Preferences</h3>
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Indoor Sports</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.sportsPreferences?.indoor?.map(sport => (
                        <span key={sport} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Outdoor Sports</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.sportsPreferences?.outdoor?.map(sport => (
                        <span key={sport} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Existing Events Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <Link
            to="/create-event"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full">
                    {event.sport}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    {event.participants}/{event.maxParticipants} participants
                  </div>
                </div>
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{
                        width: `${(event.participants / event.maxParticipants) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Update Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSubmit={handleProfileUpdate}
        initialData={userProfile}
      />
    </div>
  );
};

export default Dashboard;




