import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const EventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    sport: '',
    location: '',
    date: '',
    time: '',
    maxParticipants: '',
    description: ''
  });

  const sports = [
    'Football', 'Basketball', 'Tennis', 'Cricket', 
    'Volleyball', 'Swimming', 'Running', 'Yoga'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement event creation logic with backend
    console.log('Create Event:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden relative">
    {/* Beautiful SVG Background Animation */}
    <div className="absolute inset-0 z-0">
      <svg
        className="w-full h-full opacity-20"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient)"
          d="M0,0V900H1440V0C1440,0,1200,300,960,300C720,300,480,0,240,0C0,0,0,300,0,300Z"
          className="animate-wave"
        />
      </svg>
    </div>
  
    {/* Form Container */}
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
      <div className="bg-white shadow-2xl rounded-lg transform transition-all ">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-3xl font-bold leading-6 text-gray-900">Create New Event</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Event Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              required
              className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform focus:scale-105 outline-gray-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
  
          {/* Sport Selection */}
          <div>
            <label htmlFor="sport" className="block text-sm font-medium text-gray-700">
              Sports
            </label>
            <select
              id="sport"
              required
              className="mt-1 block p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  transition-all duration-200 ease-in-out transform focus:scale-105 outline-gray-500"
              value={formData.sport}
              onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
            >
              <option value="">Select a sport</option>
              {sports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>
  
          {/* Date and Time */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  required
                  className="focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md transition-all duration-200 ease-in-out transform focus:scale-105 outline-gray-500"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
  
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  id="time"
                  required
                  className="focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md transition-all duration-200 ease-in-out transform focus:scale-105 outline-gray-500"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
          </div>
  
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="location"
                required
                className="focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md transition-all duration-200 ease-in-out transform focus:scale-105 outline-gray-500"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>
  
          {/* Maximum Participants */}
          <div>
            <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">
              Maximum Participants
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="maxParticipants"
                required
                min="2"
                className="focus:ring-indigo-500 p-3 outline-gray-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md transition-all duration-200 ease-in-out transform focus:scale-105 "
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
              />
            </div>
          </div>
  
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="mt-1 block w-full rounded-md outline-gray-500 p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform focus:scale-105"
              placeholder="Add any additional details about the event..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
  
          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default EventForm;