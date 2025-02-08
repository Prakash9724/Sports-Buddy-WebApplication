import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ChevronRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
    window.scrollTo(0, 0);
  }, []);

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://sports-buddy-webapplication.onrender.com/api/users/registered-events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.events);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Events fetch karne mein error aaya');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">My Upcoming Events</h1>
          <p className="text-indigo-100 text-lg">
            Track your registered events and stay updated with your sports activities
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link
                key={event._id}
                to={`/event/${event._id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`${event.image}`}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-indigo-200 text-sm">{event.sport}</p>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>{new Date(event.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>{event.currentParticipants?.length || 0}/{event.maxParticipants} participants</span>
                  </div>

                  {/* View Details Button */}
                  <div className="pt-3 flex items-center justify-end text-indigo-600 group-hover:text-indigo-700">
                    <span className="text-sm font-medium">View Details</span>
                    <ChevronRight className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-600 mb-8">You haven't registered for any upcoming events yet.</p>
            <Link
              to="/events"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Events
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents; 