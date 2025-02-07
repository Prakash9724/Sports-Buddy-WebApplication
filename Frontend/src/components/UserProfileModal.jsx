import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';

const UserProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    personal: {
      email: user?.email || '',
      phone: user?.personal?.phone || '',
      gender: user?.personal?.gender || '',
      dateOfBirth: user?.personal?.dateOfBirth ? new Date(user?.personal?.dateOfBirth).toISOString().split('T')[0] : '',
      address: user?.personal?.address || '',
      city: user?.personal?.city || '',
      state: user?.personal?.state || '',
      pincode: user?.personal?.pincode || '',
      firstName: user?.personal?.firstName || '',
      lastName: user?.personal?.lastName || ''
    },
    professional: {
      occupation: user?.professional?.occupation || '',
      company: user?.professional?.company || '',
      experience: user?.professional?.experience || '',
      education: user?.professional?.education || '',
      skills: user?.professional?.skills || []
    },
    sportsPreferences: {
      indoor: user?.sportsPreferences?.indoor || [],
      outdoor: user?.sportsPreferences?.outdoor || [],
      skillLevel: user?.sportsPreferences?.skillLevel || '',
      availability: user?.sportsPreferences?.availability || [],
      preferredLocations: user?.sportsPreferences?.preferredLocations || []
    }
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [skillInput, setSkillInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please login again');
        return;
      }

      const response = await fetch('https://sports-buddy-webapplication.onrender.com/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Update response:', data); // Debug log

      if (data.success) {
        toast.success('Profile updated successfully!');
        // Update local storage
        localStorage.setItem('userData', JSON.stringify(data.user));
        onUpdate(data.user);
        onClose();
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        professional: {
          ...prev.professional,
          skills: [...prev.professional.skills, skillInput.trim()]
        }
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      professional: {
        ...prev.professional,
        skills: prev.professional.skills.filter(skill => skill !== skillToRemove)
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Edit Profile
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Full View with Top Tabs */}
          <div className="h-[80vh] md:h-auto">
            {/* Tabs - Visible on all screens */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                {['personal', 'professional', 'skills'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`py-4 px-1 relative ${
                      activeTab === tab
                        ? 'text-indigo-600 font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Details
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="max-h-[calc(80vh-8rem)] md:max-h-[600px] overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Tab Content */}
                <div className="space-y-6">
                  {activeTab === 'personal' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.personal.firstName}
                          onChange={(e) => handleChange('personal', 'firstName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.personal.email}
                          onChange={(e) => handleChange('personal', 'email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.personal.phone}
                          onChange={(e) => handleChange('personal', 'phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                          value={formData.personal.gender}
                          onChange={(e) => handleChange('personal', 'gender', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={formData.personal.dateOfBirth}
                          onChange={(e) => handleChange('personal', 'dateOfBirth', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          value={formData.personal.address}
                          onChange={(e) => handleChange('personal', 'address', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          value={formData.personal.city}
                          onChange={(e) => handleChange('personal', 'city', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          value={formData.personal.state}
                          onChange={(e) => handleChange('personal', 'state', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <input
                          type="text"
                          value={formData.personal.pincode}
                          onChange={(e) => handleChange('personal', 'pincode', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'professional' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                        <input
                          type="text"
                          value={formData.professional.occupation}
                          onChange={(e) => handleChange('professional', 'occupation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={formData.professional.company}
                          onChange={(e) => handleChange('professional', 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                        <input
                          type="text"
                          value={formData.professional.experience}
                          onChange={(e) => handleChange('professional', 'experience', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                        <input
                          type="text"
                          value={formData.professional.education}
                          onChange={(e) => handleChange('professional', 'education', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'skills' && (
                    <div className="space-y-4">
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Add a skill"
                        />
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.professional.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm flex items-center"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-2 text-indigo-400 hover:text-indigo-600"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200 mt-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-sm font-medium"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto flex-1 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-all text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UserProfileModal;