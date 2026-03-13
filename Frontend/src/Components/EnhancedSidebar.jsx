import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  CreditCardIcon, 
  UserIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const EnhancedSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { 
      name: 'Dashboard', 
      href: '/', 
      icon: HomeIcon,
      description: 'Overview and stats'
    },
    { 
      name: 'Accounts', 
      href: '/accounts', 
      icon: CreditCardIcon,
      description: 'Manage accounts'
    },
    { 
      name: 'Transactions', 
      href: '/transactions', 
      icon: BanknotesIcon,
      description: 'View transactions'
    },
    { 
      name: 'Reports', 
      href: '/reports', 
      icon: ChartBarIcon,
      description: 'Financial reports'
    },
    { 
      name: 'Documents', 
      href: '/documents', 
      icon: DocumentTextIcon,
      description: 'Bank documents'
    },
    { 
      name: 'Profile', 
      href: '/profile', 
      icon: UserIcon,
      description: 'User profile'
    },
  ];

  const isActive = (href) => location.pathname === href;

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    // Clear tokens, redirect to login, etc.
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        ${isCollapsed ? 'md:w-16' : 'md:w-64'}
        transition-all duration-300 ease-in-out
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2">
                <BanknotesIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bank Manager</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Management System</p>
              </div>
            </div>
          )}
          
          {/* Toggle buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:block p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {isCollapsed ? (
                <Bars3Icon className="h-5 w-5" />
              ) : (
                <XMarkIcon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive(item.href)
                      ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`
                    flex-shrink-0
                    ${isCollapsed ? 'h-6 w-6' : 'h-5 w-5 mr-3'}
                    ${isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-300'
                      : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                    }
                  `} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        {isActive(item.href) && (
                          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      {!isCollapsed && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {!isCollapsed ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
    </>
  );
};

export default EnhancedSidebar;
