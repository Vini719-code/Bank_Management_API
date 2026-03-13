import React, { useState, useEffect } from 'react';
import { 
  UserIcon, 
  EnvelopeIcon, 
  ArrowRightOnRectangleIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { CameraIcon } from '@heroicons/react/24/solid';

const EnhancedProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    address: '',
    memberSince: '',
    bio: '',
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      twoFactorAuth: true
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock data for now - replace with API call
    setProfile({
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Bank Manager',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Anytown, USA 12345',
      memberSince: '2020-01-15',
      bio: 'Experienced banking professional with expertise in financial management and customer relations.',
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        twoFactorAuth: true
      }
    });
  }, []);

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // API call would go here
      // await apiService.updateProfile(editForm);
      setProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    // Clear tokens, redirect to login, etc.
  };

  const stats = [
    { label: 'Total Accounts', value: '127', change: '+12%', positive: true },
    { label: 'Total Balance', value: '₹2.5M', change: '+8%', positive: true },
    { label: 'Transactions', value: '1,843', change: '+15%', positive: true },
    { label: 'Active Today', value: '89', change: '-2%', positive: false }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: UserIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'preferences', name: 'Preferences', icon: PencilIcon }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-blue-600" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <CameraIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white mb-1">{profile.name}</h1>
              <p className="text-blue-100 mb-2">{profile.role}</p>
              <p className="text-blue-200 text-sm mb-4">Member since {new Date(profile.memberSince).toLocaleDateString()}</p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {!isEditing ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      ) : (
                        <CheckIcon className="h-4 w-4" />
                      )}
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      <XMarkIcon className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</p>
                    <p className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                ))}
              </div>

              {/* Profile Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={editForm.name || ''}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white font-medium">{profile.name}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={editForm.email || ''}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white font-medium">{profile.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={editForm.phone || ''}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white font-medium">{profile.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                        {isEditing ? (
                          <textarea
                            name="address"
                            value={editForm.address || ''}
                            onChange={handleChange}
                            rows={2}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white font-medium">{profile.address}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                        <p className="text-gray-900 dark:text-white font-medium">{new Date(profile.memberSince).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About</h3>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={editForm.bio || ''}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {profile.bio || 'No bio provided yet.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Configure
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Update your password regularly</p>
                  </div>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                  </div>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={editForm.preferences?.emailNotifications ?? profile.preferences.emailNotifications}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via SMS</p>
                  </div>
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={editForm.preferences?.smsNotifications ?? profile.preferences.smsNotifications}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfile;
