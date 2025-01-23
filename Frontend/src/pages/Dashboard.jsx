import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Plus, Edit } from 'lucide-react';
import UserProfileModal from '../components/UserProfileModal';
import { toast } from 'react-hot-toast';

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

  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isProfessionalModalOpen, setIsProfessionalModalOpen] = useState(false);
  const [isSportsModalOpen, setIsSportsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    personalDetails: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    professionalDetails: {
      occupation: 'Software Engineer',
      company: 'Tech Corp',
      experience: '5',
      skills: ['JavaScript', 'React']
    },
    sportsPreferences: {
      indoor: ['Badminton', 'Chess'],
      outdoor: ['Cricket', 'Football']
    }
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    // try {
    //   const token = localStorage.getItem('token');
    //   const response = await fetch('http://localhost:5000/api/users/profile', {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
    //   const data = await response.json();
    //   if (data.success) {
    //     setUserProfile(data.user);
    //   }
    // } catch (error) {
    //   console.error('Profile fetch karne mein error:', error);
    // }
    console.log("userProfile",userProfile);
    
  };

  const handlePersonalUpdate = (formData) => {
    console.log('Personal Details Update:', formData);
    setIsPersonalModalOpen(false);
  };

  const handleProfessionalUpdate = (formData) => {
    console.log('Professional Details Update:', formData);
    setIsProfessionalModalOpen(false);
  };

  const handleSportsUpdate = (formData) => {
    console.log('Sports Preferences Update:', formData);
    setIsSportsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Personal Details Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            <button
              onClick={() => setIsPersonalModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Personal Details
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <p><span className="font-medium">Name:</span> {userProfile.personalDetails.firstName} {userProfile.personalDetails.lastName}</p>
            <p><span className="font-medium">Email:</span> {userProfile.personalDetails.email}</p>
            <p><span className="font-medium">Phone:</span> {userProfile.personalDetails.phone || 'Not provided'}</p>
            <p><span className="font-medium">Address:</span> {userProfile.personalDetails.address || 'Not provided'}</p>
            <p><span className="font-medium">City:</span> {userProfile.personalDetails.city || 'Not provided'}</p>
            <p><span className="font-medium">State:</span> {userProfile.personalDetails.state || 'Not provided'}</p>
            <p><span className="font-medium">Pincode:</span> {userProfile.personalDetails.pincode || 'Not provided'}</p>
          </div>
        </div>

        {/* Professional Details Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Professional Information</h2>
            <button
              onClick={() => setIsProfessionalModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Professional Details
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <p><span className="font-medium">Occupation:</span> {userProfile.professionalDetails.occupation || 'Not provided'}</p>
            <p><span className="font-medium">Company:</span> {userProfile.professionalDetails.company || 'Not provided'}</p>
            <p><span className="font-medium">Experience:</span> {userProfile.professionalDetails.experience ? `${userProfile.professionalDetails.experience} years` : 'Not provided'}</p>
            <p><span className="font-medium">Skills:</span> {userProfile.professionalDetails.skills?.join(', ') || 'Not provided'}</p>
          </div>
        </div>

        {/* Sports Preferences Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Sports Preferences</h2>
            <button
              onClick={() => setIsSportsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Sports Preferences
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Indoor Sports</h4>
              <div className="flex flex-wrap gap-2">
                {userProfile.sportsPreferences?.indoor?.length > 0 ? (
                  userProfile.sportsPreferences.indoor.map(sport => (
                    <span key={sport} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                      {sport}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No indoor sports selected</p>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Outdoor Sports</h4>
              <div className="flex flex-wrap gap-2">
                {userProfile.sportsPreferences?.outdoor?.length > 0 ? (
                  userProfile.sportsPreferences.outdoor.map(sport => (
                    <span key={sport} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {sport}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No outdoor sports selected</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Existing Events Section */}
      
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
            
          </div>
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

      {/* Personal Details Modal */}
      <UserProfileModal
        isOpen={isPersonalModalOpen}
        onClose={() => setIsPersonalModalOpen(false)}
        onSubmit={handlePersonalUpdate}
        initialData={userProfile.personalDetails}
        type="personal"
      />

      {/* Professional Details Modal */}
      <UserProfileModal
        isOpen={isProfessionalModalOpen}
        onClose={() => setIsProfessionalModalOpen(false)}
        onSubmit={handleProfessionalUpdate}
        initialData={userProfile.professionalDetails}
        type="professional"
      />

      {/* Sports Preferences Modal */}
      <UserProfileModal
        isOpen={isSportsModalOpen}
        onClose={() => setIsSportsModalOpen(false)}
        onSubmit={handleSportsUpdate}
        initialData={userProfile.sportsPreferences}
        type="sports"
      />
    </div>
  );
};

export default Dashboard;




