import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Slidebar from '../components/Slidebar';

const EventForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get event ID if editing
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const indoorSports = ['Badminton', 'Table Tennis', 'Chess', 'Carrom', 'Boxing', 'Gym', 'Yoga', 'Swimming'];
  const outdoorSports = ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Tennis', 'Athletics', 'Hockey', 'Kabaddi'];

  const [formData, setFormData] = useState({
    title: '',
    sport: '',
    sportType: '', // 'indoor' or 'outdoor'
    date: '',
    time: '',
    duration: '',
    location: '',
    address: '',
    maxParticipants: '',
    entryFee: '',
    description: '',
    eligibility: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    rules: [''],
    facilities: [''],
    image: null
  });

  // Fetch event details if editing
  useEffect(() => {
    if (id) {
      fetchEventDetails();
    } else {
      setInitialLoading(false);
    }
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://sports-buddy-webapplication.onrender.com/api/admin/events/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        // Format date for input field
        const eventData = {
          ...data.event,
          date: new Date(data.event.date).toISOString().split('T')[0]
        };
        setFormData(eventData);
      } else {
        toast.error('Failed to fetch event details');
        if (response.status === 401 || response.status === 403) {
          navigate('/admin/login');
        }
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Failed to fetch event details');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array fields (rules and facilities)
  const handleArrayChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const formDataToSend = new FormData();
      
      // Filter out participants field if it's empty
      const dataToSend = { ...formData };
      if (!dataToSend.participants || dataToSend.participants.length === 0) {
        delete dataToSend.participants;
      }
      
      Object.keys(dataToSend).forEach(key => {
        if (key === 'rules' || key === 'facilities') {
          formDataToSend.append(key, JSON.stringify(dataToSend[key]));
        } else if (key === 'image' && dataToSend[key] instanceof File) {
          formDataToSend.append(key, dataToSend[key]);
        } else if (key !== 'image') {
          formDataToSend.append(key, dataToSend[key]);
        }
      });

      const url = id 
        ? `https://sports-buddy-webapplication.onrender.com/api/admin/events/${id}`
        : 'https://sports-buddy-webapplication.onrender.com/api/admin/events';

      const response = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success(id ? 'Event updated successfully!' : 'Event created successfully!');
        navigate('/admin/events');
      } else {
        toast.error(data.message);
        if (response.status === 401 || response.status === 403) {
          navigate('/admin/login');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(id ? 'Failed to update event' : 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Slidebar />
      
      <div className="flex-1 overflow-auto p-8">
        {initialLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {id ? 'Edit Event' : 'Create New Event'}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sport Type</label>
                  <select
                    name="sportType"
                    value={formData.sportType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                    required
                  >
                    <option value="">Select Sport Type</option>
                    <option value="indoor">Indoor Sports</option>
                    <option value="outdoor">Outdoor Sports</option>
                  </select>

                  <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                  <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                    disabled={!formData.sportType}
                  >
                    <option value="">Select Sport</option>
                    {formData.sportType === 'indoor' && 
                      indoorSports.map(sport => (
                        <option key={sport} value={sport}>{sport}</option>
                      ))
                    }
                    {formData.sportType === 'outdoor' && 
                      outdoorSports.map(sport => (
                        <option key={sport} value={sport}>{sport}</option>
                      ))
                    }
                  </select>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 2 hours"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Location and Participants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entry Fee</label>
                  <input
                    type="text"
                    name="entryFee"
                    value={formData.entryFee}
                    onChange={handleChange}
                    placeholder="e.g., ₹200 per person"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              {/* Eligibility */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Eligibility Criteria</label>
                
                {/* Height Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Minimum Height (cm)</label>
                    <input
                      type="number"
                      name="minHeight"
                      value={formData.minHeight}
                      onChange={handleChange}
                      placeholder="e.g., 150"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Maximum Height (cm)</label>
                    <input
                      type="number"
                      name="maxHeight"
                      value={formData.maxHeight}
                      onChange={handleChange}
                      placeholder="e.g., 190"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Weight Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Minimum Weight (kg)</label>
                    <input
                      type="number"
                      name="minWeight"
                      value={formData.minWeight}
                      onChange={handleChange}
                      placeholder="e.g., 45"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Maximum Weight (kg)</label>
                    <input
                      type="number"
                      name="maxWeight"
                      value={formData.maxWeight}
                      onChange={handleChange}
                      placeholder="e.g., 85"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Other Eligibility Criteria */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Other Requirements</label>
                  <textarea
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                    placeholder="e.g., Age limit, skill level requirements, etc."
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Rules */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Rules & Guidelines</label>
                  <button
                    type="button"
                    onClick={() => addArrayField('rules')}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    + Add Rule
                  </button>
                </div>
                {formData.rules.map((rule, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={rule}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'rules')}
                      placeholder={`Rule ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    {formData.rules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, 'rules')}
                        className="px-2 text-red-600 hover:text-red-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Facilities */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Available Facilities</label>
                  <button
                    type="button"
                    onClick={() => addArrayField('facilities')}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    + Add Facility
                  </button>
                </div>
                {formData.facilities.map((facility, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={facility}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'facilities')}
                      placeholder={`Facility ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    {formData.facilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, 'facilities')}
                        className="px-2 text-red-600 hover:text-red-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/admin/events')}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {id ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    id ? 'Update Event' : 'Create Event'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventForm;