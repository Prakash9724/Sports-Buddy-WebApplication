import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Slidebar from '../components/Slidebar';

const EventForm = () => {
  const navigate = useNavigate();

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
    // try {
    //   const token = localStorage.getItem('token');
    //   const formDataToSend = new FormData();
      
    //   // Append all form fields to FormData
    //   Object.keys(formData).forEach(key => {
    //     if (key === 'rules' || key === 'facilities') {
    //       formDataToSend.append(key, JSON.stringify(formData[key]));
    //     } else {
    //       formDataToSend.append(key, formData[key]);
    //     }
    //   });

    //   const response = await fetch('http://localhost:5000/api/admin/events', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     },
    //     body: formDataToSend
    //   });

    //   const data = await response.json();

    //   if (data.success) {
    //     toast.success('Event created successfully!');
    //     navigate('/admin-events');
    //   } else {
    //     toast.error(data.message);
    //   }
    // } catch (error) {
    //   console.error('Error creating event:', error);
    //   toast.error('Failed to create event');
    // }

    console.log(formData);
    
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Slidebar />
      
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Event</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
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
                onClick={() => navigate('/admin-events')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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