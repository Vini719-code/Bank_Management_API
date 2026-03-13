import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import AccountCard from '../Components/AccountCard';
import AccountForm from '../Components/AccountForm';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await api.getAllAccounts();
      setAccounts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch accounts');
      console.error('Error fetching accounts:', err);
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

  // Filter and search accounts
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.accountHolderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || account.accountType === filterType;
    
    return matchesSearch && matchesFilter;
  });

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
          All Accounts
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage all bank accounts
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Accounts
            </label>
            <input
              type="text"
              placeholder="Search by name, account number, or branch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter by Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Accounts</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>

          {/* Results Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Results
            </label>
            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-900 dark:text-white">
                {filteredAccounts.length} of {accounts.length} accounts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      {filteredAccounts.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            {searchTerm || filterType !== 'all' ? 'No matching accounts' : 'No accounts'}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating a new account.'
            }
          </p>
          {(searchTerm || filterType !== 'all') && (
            <button
              onClick={() => { setSearchTerm(''); setFilterType('all'); }}
              className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.map((account) => (
            <AccountCard
              key={account._id}
              account={account}
              onAccountUpdate={handleAccountUpdated}
              onAccountDelete={handleAccountDeleted}
            />
          ))}
        </div>
      )}

      {/* Account Form Modal */}
      <AccountForm onAccountCreated={handleAccountCreated} />
    </div>
  );
};

export default Accounts;
