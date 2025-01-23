import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, Trophy, AlertCircle, CheckCircle } from 'lucide-react';

const EventInfo = () => {
  const { eventId } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);

  // Mock event data - replace with API call
  const event = {
    id: eventId,
    title: 'Weekend Football Tournament',
    sport: 'Football',
    image: 'https://cdn.britannica.com/69/228369-050-0B18A1F6/Asian-Cup-Final-2019-Hasan-Al-Haydos-Qatar-Japan-Takumi-Minamino.jpg', // Replace with actual image URL
    date: '2024-03-20',
    time: '10:00 AM',
    duration: '4 hours',
    location: 'Central Park Football Ground',
    address: '123, Sports Complex, Central Park, Mumbai',
    eligibility: '18+ years, Any skill level welcome',
    maxParticipants: 22,
    currentParticipants: 15,
    registrationDeadline: '2024-03-18',
    entryFee: '₹200 per person',
    description: 'Join us for an exciting football tournament! This event is perfect for both beginners and experienced players. Teams will be formed on the spot to ensure fair play.',
    rules: [
      'Players must bring their own sports shoes',
      'Tournament format will be decided based on final participation',
      'Fair play is mandatory',
      'Organizers decision will be final'
    ],
    facilities: [
      'Changing rooms available',
      'First aid support',
      'Drinking water',
      'Parking space'
    ],
    organizer: {
      name: 'Sports Buddy Organization',
      contact: '+91 9876543210',
      email: 'organizer@sportsbuddy.com'
    }
  };

  const handleRegistration = async () => {
    try {
      // API call to register user for the event
      console.log('Registering for event:', eventId);
      setIsRegistered(true);
      // Show success message
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Event Image and Quick Info */}
          <div className="lg:col-span-5">
            {/* Event Image */}
            <div className="sticky top-8">
              <div className="relative h-[400px] rounded-xl overflow-hidden mb-6">
                <img
                  src={event.image}
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
                      {event.date} at {event.time}
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
              <button
                onClick={handleRegistration}
                disabled={isRegistered}
                className={`w-full py-4 px-6 rounded-xl text-white font-medium text-lg transition-all ${
                  isRegistered
                    ? 'bg-green-600 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200'
                }`}
              >
                {isRegistered ? (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 mr-2" />
                    Registered Successfully
                  </span>
                ) : (
                  'Register Now'
                )}
              </button>
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
                      <p>{event.eligibility}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-indigo-600" />
                    <div>
                      <p className="font-medium">Registration Deadline</p>
                      <p>{event.registrationDeadline}</p>
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

              <h3 className="text-lg font-semibold mb-3">Rules & Guidelines</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                {event.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className=" w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full text-sm flex items-center justify-center mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Facilities Available</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">{facility}</span>
                  </div>
                ))}
              </div>
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