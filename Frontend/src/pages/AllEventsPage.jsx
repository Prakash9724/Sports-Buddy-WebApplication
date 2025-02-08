import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://sports-buddy-webapplication.onrender.com/api/events');
        const data = await response.json();
        
        if (data.success) {
          setEvents(data.events);
          setLoading(false);
        } else {
          setError(data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events');
        setLoading(false);
      }
    };

    fetchEvents();
    window.scrollTo(0, 0);
  }, []);

  // Filter events based on search and sport type
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = sportFilter === 'all' || event.sportType === sportFilter;
    return matchesSearch && matchesSport;
  });

  // Add loading state UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Add error state UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Sports Events</h1>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Sports</option>
            <option value="indoor">Indoor Sports</option>
            <option value="outdoor">Outdoor Sports</option>
          </select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link 
              to={`/event/${event._id}`}
              key={event._id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
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

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{event.description}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time} ({event.duration})</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-600 font-medium">{event.entryFee}</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      event.sportType === 'indoor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {event.sport}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Events Message */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No events found 🏃‍♀️</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEventsPage;