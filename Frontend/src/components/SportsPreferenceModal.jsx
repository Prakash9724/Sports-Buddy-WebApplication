import React, { useState } from 'react';
import { X } from 'lucide-react';

const indoorSports = ['Badminton', 'Table Tennis', 'Chess', 'Carrom', 'Boxing', 'Gym', 'Yoga', 'Swimming'];
const outdoorSports = ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Tennis', 'Athletics', 'Hockey', 'Kabaddi'];

const SportsPreferenceModal = ({ isOpen, onClose, onSubmit, initialPreferences }) => {
  const [selectedSports, setSelectedSports] = useState({
    indoor: initialPreferences?.indoor || [],
    outdoor: initialPreferences?.outdoor || []
  });

  const toggleSport = (type, sport) => {
    setSelectedSports(prev => ({
      ...prev,
      [type]: prev[type].includes(sport)
        ? prev[type].filter(s => s !== sport)
        : [...prev[type], sport]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sports Preferences:", selectedSports);
    onSubmit(selectedSports);
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
                      ${selectedSports.indoor.includes(sport)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-200 hover:border-blue-500'
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedSports.indoor.includes(sport)}
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
                      ${selectedSports.outdoor.includes(sport)
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'border-gray-200 hover:border-green-500'
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedSports.outdoor.includes(sport)}
                      onChange={() => toggleSport('outdoor', sport)}
                    />
                    <span>{sport}</span>
                  </label>
                ))}
              </div>
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