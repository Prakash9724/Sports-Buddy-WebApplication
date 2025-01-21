import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Plus } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <Link
            to="/create-event"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </Link>
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
    </div>

   
  );
};

export default Dashboard;




