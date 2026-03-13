import React from 'react';
import { UserCircleIcon, EnvelopeIcon, BriefcaseIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // In a real app, this would handle logout logic
      alert('Logged out successfully!');
      // Redirect to login page or clear session
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <UserCircleIcon className="h-20 w-20 text-blue-500" />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-blue-100">Bank Administrator</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <UserCircleIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                    <p className="text-gray-900 dark:text-white">John Doe</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">john.doe@bank.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                    <p className="text-gray-900 dark:text-white">Bank Administrator</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Account Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Total Accounts</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">1,234</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <p className="text-sm text-green-600 dark:text-green-400">Active Today</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">89</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">Pending</p>
                  <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">12</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <p className="text-sm text-purple-600 dark:text-purple-400">Total Balance</p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">₹2.5M</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                <p className="text-gray-900 dark:text-white">Banking Operations</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="text-gray-900 dark:text-white">New York, USA</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                <p className="text-gray-900 dark:text-white">January 2020</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex space-x-4">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Profile</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
