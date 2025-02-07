import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const indoorSports = ['Badminton', 'Table Tennis', 'Chess', 'Carrom', 'Boxing', 'Gym', 'Yoga', 'Swimming'];
const outdoorSports = ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Tennis', 'Athletics', 'Hockey', 'Kabaddi'];

const SportsPreferenceModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    indoor: user?.sportsPreferences?.indoor || [],
    outdoor: user?.sportsPreferences?.outdoor || [],
    skillLevel: user?.sportsPreferences?.skillLevel || '',
    availability: user?.sportsPreferences?.availability || [],
    preferredLocations: user?.sportsPreferences?.preferredLocations || []
  });

  const toggleSport = (type, sport) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(sport)
        ? prev[type].filter(s => s !== sport)
        : [...prev[type], sport]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://sports-buddy-webapplication.onrender.com/api/users/sports-preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ sportsPreferences: formData })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Sports preferences update ho gaye!');
        onUpdate(data.user);
        onClose();
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Sports preferences update nahi ho paye');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Update Sports Preferences</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Indoor Sports */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Indoor Sports</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {indoorSports.map((sport) => (
                  <label
                    key={sport}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer transition-colors
                      ${formData.indoor.includes(sport)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-200 hover:border-blue-500'
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.indoor.includes(sport)}
                      onChange={() => toggleSport('indoor', sport)}
                    />
                    <span>{sport}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Outdoor Sports */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Outdoor Sports</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {outdoorSports.map((sport) => (
                  <label
                    key={sport}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer transition-colors
                      ${formData.outdoor.includes(sport)
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'border-gray-200 hover:border-green-500'
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.outdoor.includes(sport)}
                      onChange={() => toggleSport('outdoor', sport)}
                    />
                    <span>{sport}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skill Level */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Skill Level</h3>
              <select
                value={formData.skillLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, skillLevel: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Skill Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SportsPreferenceModal; 