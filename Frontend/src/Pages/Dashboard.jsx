import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import AccountCard from '../Components/AccountCard';
import AccountForm from '../Components/AccountForm';
import { ChartBarIcon, BuildingLibraryIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await api.getAllAccounts();
      setAccounts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch accounts');
      console.error('Error fetching accounts:', err);
      setAccounts([]); // Ensure accounts is always an array
    } finally {
      setLoading(false);
    }
  };

  const handleAccountCreated = (newAccount) => {
    setAccounts(prev => [newAccount, ...prev]);
  };

  const handleAccountUpdated = (updatedAccount) => {
    setAccounts(prev => 
      prev.map(account => 
        account._id === updatedAccount._id ? updatedAccount : account
      )
    );
  };

  const handleAccountDeleted = (deletedId) => {
    setAccounts(prev => prev.filter(account => account._id !== deletedId));
  };

  // Calculate statistics
  const totalAccounts = accounts?.length || 0;
  const totalBalance = accounts?.reduce((sum, account) => sum + (account.balance || 0), 0) || 0;
  const savingsAccounts = accounts?.filter(account => account.accountType === 'Savings').length || 0;
  const currentAccounts = accounts?.filter(account => account.accountType === 'Current').length || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={fetchAccounts}
              className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your bank accounts and transactions
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BuildingLibraryIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Accounts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalAccounts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{totalBalance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Savings</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{savingsAccounts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UsersIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Current</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentAccounts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Accounts */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Accounts
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {accounts.length} accounts
          </div>
        </div>

        {accounts.length === 0 ? (
          <div className="text-center py-12">
            <BuildingLibraryIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No accounts</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new account.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
              <AccountCard
                key={account._id || account.accountNumber}
                account={account}
                onAccountUpdate={handleAccountUpdated}
                onAccountDelete={handleAccountDeleted}
              />
            ))}
          </div>
        )}
      </div>

      {/* Account Form Modal */}
      <AccountForm onAccountCreated={handleAccountCreated} />
    </div>
  );
};

export default Dashboard;
