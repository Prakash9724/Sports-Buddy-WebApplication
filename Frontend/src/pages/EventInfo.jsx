import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, AlertCircle, CheckCircle, Mail, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

const EventInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/events/${id}`);
      const data = await response.json();
      
      if (data.success) {
        console.log("Event data:", data.event); // Debug log
        setEvent(data.event);
      } else {
        toast.error('Event details nahi mil paye');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Event load nahi ho paya');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login first');
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:4000/api/events/${id}/register`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setIsRegistered(true);
        toast.success('Registration successful! 🎉');
        // Refresh event details
        fetchEventDetails();
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Event not found 😢</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Event Image and Quick Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              {/* Event Image */}
              <div className="relative h-[400px] rounded-xl overflow-hidden mb-6">
                <img
                  src={`http://localhost:4000${event.image}`}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="inline-block px-3 py-1 bg-indigo-600 rounded-full text-sm font-medium text-white">
                      {event.sport}
                    </span>
                    <span className="text-white/90 text-sm">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-indigo-600 font-medium">Entry Fee</p>
                    <p className="text-2xl font-bold text-indigo-900">{event.entryFee}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Spots Left</p>
                    <p className="text-2xl font-bold text-green-900">
                      {event.maxParticipants - event.currentParticipants}
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration Button */}
              <div className="mt-6">
                <button
                  onClick={handleRegistration}
                  disabled={isRegistered || event?.currentParticipants >= event?.maxParticipants}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-center ${
                    isRegistered 
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : event?.currentParticipants >= event?.maxParticipants
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isRegistered 
                    ? 'Already Registered ✓'
                    : event?.currentParticipants >= event?.maxParticipants
                      ? 'Event Full'
                      : 'Register Now'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Event Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Event Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 text-indigo-600" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p>{event.location}</p>
                      <p className="text-sm text-gray-500">{event.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-3 text-indigo-600" />
                    <div>
                      <p className="font-medium">Participants</p>
                      <p>{event.currentParticipants} of {event.maxParticipants} registered</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <AlertCircle className="h-5 w-5 mr-3 text-indigo-600" />
                    <div>
                      <p className="font-medium">Eligibility</p>
                      <p>{event.eligibility?.otherRequirements || 'Open for all'}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-indigo-600" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                      <p className="text-sm text-gray-500">Duration: {event.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Progress */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{event.currentParticipants} registered</span>
                  <span>{event.maxParticipants - event.currentParticipants} spots left</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${(event.currentParticipants / event.maxParticipants) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About the Event</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>

              {event.rules && event.rules.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mb-3">Rules & Guidelines</h3>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    {event.rules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full text-sm flex items-center justify-center mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {event.facilities && event.facilities.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mb-3">Facilities Available</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-600">{facility}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Organizer Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Organizer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Organizer</p>
                  <p className="font-medium text-gray-900">{event.organizer.name}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Contact</p>
                  <p className="font-medium text-gray-900">{event.organizer.contact}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium text-gray-900">{event.organizer.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo; 