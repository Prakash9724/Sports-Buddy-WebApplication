import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Slidebar from '../components/Slidebar';
import { Edit, Trash2, Eye, X, Users } from 'lucide-react';

const AdminEventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Please login first');
        return;
      }

      const response = await fetch('http://localhost:4000/api/admin/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Fetched events:', data.events); // Debug log
        setEvents(data.events);
      } else {
        toast.error(data.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  // Filter and search functionality
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.sport.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`http://localhost:4000/api/admin/events/${eventId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.success) {
          toast.success('Event deleted successfully');
          fetchEvents();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event');
      }
    }
  };

  const fetchParticipants = async (eventId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:4000/api/admin/events/${eventId}/participants`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setSelectedEvent({
          ...events.find(e => e._id === eventId),
          participants: data.participants
        });
        setShowParticipants(true);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Participants ki list load nahi hui');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <Slidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Slidebar />
      
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
            <Link
              to="/admin/events-form"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create New Event
            </Link>
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{event.sport} ({event.sportType})</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📅 {new Date(event.date).toLocaleDateString()} at {event.time}</p>
                    <p>📍 {event.location}</p>
                    <p>👥 {event.currentParticipants}/{event.maxParticipants} participants</p>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <Link
                      to={`/admin/event/${event._id}`}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                    >
                      <Eye size={20} />
                    </Link>
                    <Link
                      to={`/admin/edit-event/${event._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button
                      onClick={() => fetchParticipants(event._id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                    >
                      <Users size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No events found</p>
            </div>
          )}
        </div>
      </div>

      {showParticipants && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Participants - {selectedEvent.title}</h2>
              <button onClick={() => setShowParticipants(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedEvent.participants.map((participant) => (
                <div key={participant._id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{participant.firstName} {participant.lastName}</p>
                      <p className="text-sm text-gray-500">{participant.email}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(participant.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventsList; 