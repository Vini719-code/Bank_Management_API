import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChartBarIcon,
  BuildingLibraryIcon,
  UserCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: ChartBarIcon,
    },
    {
      name: 'Accounts',
      path: '/accounts',
      icon: BuildingLibraryIcon,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: UserCircleIcon,
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <BuildingLibraryIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Bank System
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              © 2024 Bank Management System
            </p>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
