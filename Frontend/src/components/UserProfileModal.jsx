import React, { useState } from 'react';
import { X } from 'lucide-react';

const UserProfileModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    personal: {
      firstName: initialData?.personal?.firstName || '',
      lastName: initialData?.personal?.lastName || '',
      email: initialData?.personal?.email || '',
      phone: initialData?.personal?.phone || '',
      gender: initialData?.personal?.gender || '',
      dateOfBirth: initialData?.personal?.dateOfBirth || '',
      address: initialData?.personal?.address || '',
      city: initialData?.personal?.city || '',
      state: initialData?.personal?.state || '',
      pincode: initialData?.personal?.pincode || ''
    },
    professional: {
      occupation: initialData?.professional?.occupation || '',
      company: initialData?.professional?.company || '',
      experience: initialData?.professional?.experience || '',
      education: initialData?.professional?.education || '',
      skills: initialData?.professional?.skills || []
    }
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [skillInput, setSkillInput] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                className={`pb-4 px-1 ${
                  activeTab === 'personal'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('personal')}
              >
                Personal Details
              </button>
              <button
                className={`pb-4 px-1 ${
                  activeTab === 'professional'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('professional')}
              >
                Professional Details
              </button>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            {activeTab === 'personal' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.personal.firstName}
                    onChange={(e) => handleChange('personal', 'firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.personal.lastName}
                    onChange={(e) => handleChange('personal', 'lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.personal.email}
                    onChange={(e) => handleChange('personal', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.personal.phone}
                    onChange={(e) => handleChange('personal', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.personal.gender}
                    onChange={(e) => handleChange('personal', 'gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.personal.dateOfBirth}
                    onChange={(e) => handleChange('personal', 'dateOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.personal.address}
                    onChange={(e) => handleChange('personal', 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.personal.city}
                    onChange={(e) => handleChange('personal', 'city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.personal.state}
                    onChange={(e) => handleChange('personal', 'state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={formData.personal.pincode}
                    onChange={(e) => handleChange('personal', 'pincode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'professional' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Occupation
                    </label>
                    <input
                      type="text"
                      value={formData.professional.occupation}
                      onChange={(e) => handleChange('professional', 'occupation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.professional.company}
                      onChange={(e) => handleChange('professional', 'company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience
                    </label>
                    <input
                      type="text"
                      value={formData.professional.experience}
                      onChange={(e) => handleChange('professional', 'experience', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Education
                    </label>
                    <input
                      type="text"
                      value={formData.professional.education}
                      onChange={(e) => handleChange('professional', 'education', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
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

export default UserProfileModal;