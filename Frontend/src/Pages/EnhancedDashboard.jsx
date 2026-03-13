import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import EnhancedAccountCard from '../Components/EnhancedAccountCard';
import EnhancedAccountForm from '../Components/EnhancedAccountForm';
import apiService from '../services/api';

const EnhancedDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      // Connect to backend API - uncomment when backend is ready
      const data = await apiService.getAccounts();
      setAccounts(data);
      
      // Mock data fallback for development
      // const mockAccounts = [
      //   {
      //     id: 1,
      //     accountNumber: 'ACC001',
      //     accountType: 'Checking',
      //     accountHolder: 'John Doe',
      //     branch: 'Main Branch',
      //     balance: 5432.50,
      //   },
      //   {
      //     id: 2,
      //     accountNumber: 'ACC002',
      //     accountType: 'Savings',
      //     accountHolder: 'John Doe',
      //     branch: 'Downtown Branch',
      //     balance: 12500.00,
      //   },
      //   {
      //     id: 3,
      //     accountNumber: 'ACC003',
      //     accountType: 'Business',
      //     accountHolder: 'John Doe',
      //     branch: 'Westside Branch',
      //     balance: 7500.00,
      //   },
      // ];
      // setAccounts(mockAccounts);
    } catch (err) {
      setError('Failed to fetch accounts');
      console.error(err);
      
      // Fallback to mock data if API fails
      const mockAccounts = [
        {
          id: 1,
          accountNumber: 'ACC001',
          accountType: 'Checking',
          accountHolder: 'John Doe',
          branch: 'Main Branch',
          balance: 5432.50,
        },
        {
          id: 2,
          accountNumber: 'ACC002',
          accountType: 'Savings',
          accountHolder: 'John Doe',
          branch: 'Downtown Branch',
          balance: 12500.00,
        },
        {
          id: 3,
          accountNumber: 'ACC003',
          accountType: 'Business',
          accountHolder: 'John Doe',
          branch: 'Westside Branch',
          balance: 7500.00,
        },
      ];
      setAccounts(mockAccounts);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = () => {
    setEditingAccount(null);
    setShowForm(true);
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setShowForm(true);
  };

  const handleSaveAccount = async (accountData) => {
    try {
      if (editingAccount) {
        // Update existing account
        await apiService.updateAccount(editingAccount.id, accountData);
        setAccounts(prev => 
          prev.map(acc => acc.id === editingAccount.id ? { ...accountData, id: editingAccount.id } : acc)
        );
      } else {
        // Create new account
        const newAccount = await apiService.createAccount(accountData);
        setAccounts(prev => [...prev, newAccount]);
      }
      setShowForm(false);
      setEditingAccount(null);
    } catch (err) {
      setError('Failed to save account');
      console.error(err);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await apiService.deleteAccount(accountId);
        setAccounts(prev => prev.filter(acc => acc.id !== accountId));
      } catch (err) {
        setError('Failed to delete account');
        console.error(err);
      }
    }
  };

  const handleDeposit = async (accountId, amount) => {
    try {
      await apiService.deposit(accountId, amount);
      setAccounts(prev =>
        prev.map(acc =>
          acc.id === accountId ? { ...acc, balance: acc.balance + amount } : acc
        )
      );
    } catch (err) {
      setError('Failed to process deposit');
      console.error(err);
    }
  };

  const handleWithdraw = async (accountId, amount) => {
    try {
      const account = accounts.find(acc => acc.id === accountId);
      if (account.balance < amount) {
        alert('Insufficient Balance');
        return;
      }
      
      await apiService.withdraw(accountId, amount);
      setAccounts(prev =>
        prev.map(acc =>
          acc.id === accountId ? { ...acc, balance: acc.balance - amount } : acc
        )
      );
    } catch (err) {
      setError('Failed to process withdrawal');
      console.error(err);
    }
  };

  // Filter and sort accounts
  const filteredAndSortedAccounts = accounts
    .filter(account => {
      const matchesSearch = 
        account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.accountType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.accountHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.branch.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || account.accountType === filterType;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.accountHolder.localeCompare(b.accountHolder);
        case 'balance':
          return b.balance - a.balance;
        case 'type':
          return a.accountType.localeCompare(b.accountType);
        default:
          return 0;
      }
    });

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const accountTypes = [...new Set(accounts.map(acc => acc.accountType))];

  const stats = [
    {
      label: 'Total Accounts',
      value: accounts.length,
      change: '+12%',
      positive: true,
      icon: '📊'
    },
    {
      label: 'Total Balance',
      value: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(totalBalance),
      change: '+8%',
      positive: true,
      icon: '💰'
    },
    {
      label: 'Active Today',
      value: Math.floor(accounts.length * 0.7),
      change: '+5%',
      positive: true,
      icon: '📈'
    },
    {
      label: 'Pending Transactions',
      value: '3',
      change: '-2',
      positive: false,
      icon: '⏳'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bank Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your bank accounts and transactions
            </p>
          </div>
          <button
            onClick={handleAddAccount}
            className="mt-4 sm:mt-0 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Account</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Types</option>
            {accountTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="name">Sort by Name</option>
            <option value="balance">Sort by Balance</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className={`text-sm font-medium mt-2 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredAndSortedAccounts.length} of {accounts.length} accounts
        </p>
        <button
          onClick={() => window.location.href = '/accounts'}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
        >
          View All Accounts →
        </button>
      </div>

      {/* Accounts Grid */}
      {filteredAndSortedAccounts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <MagnifyingGlassIcon className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No accounts found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first account'
            }
          </p>
          {!searchTerm && filterType === 'all' && (
            <button
              onClick={handleAddAccount}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Your First Account
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedAccounts.map((account) => (
            <EnhancedAccountCard
              key={account.id}
              account={account}
              onEdit={handleEditAccount}
              onDelete={handleDeleteAccount}
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
            />
          ))}
        </div>
      )}

      {/* Account Form Modal */}
      {showForm && (
        <EnhancedAccountForm
          account={editingAccount}
          onSave={handleSaveAccount}
          onCancel={() => {
            setShowForm(false);
            setEditingAccount(null);
          }}
        />
      )}
    </div>
  );
};

export default EnhancedDashboard;
