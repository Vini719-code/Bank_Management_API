import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserIcon, 
  SunIcon, 
  MoonIcon,
  BellIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const EnhancedNavbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Mobile menu button */}
          <div className="flex items-center">
            <button className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Right side - Navigation items */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <p className="text-sm text-gray-900 dark:text-white">New account created successfully</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <p className="text-sm text-gray-900 dark:text-white">Deposit of ₹5,000 completed</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <Link
              to="/settings"
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Settings"
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative group"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="relative">
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {isDarkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
                </span>
              </div>
            </button>

            {/* Profile */}
            <Link
              to="/profile"
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Profile"
            >
              <UserIcon className="h-5 w-5" />
            </Link>

            {/* User Avatar */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Bank Manager</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EnhancedNavbar;
