import React, { useState } from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const EnhancedAccountCard = ({ account, onEdit, onDelete, onDeposit, onWithdraw }) => {
  const [showTransaction, setShowTransaction] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    const amount = parseFloat(transactionAmount);
    
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      if (transactionType === 'deposit') {
        await onDeposit(account.id, amount);
      } else {
        await onWithdraw(account.id, amount);
      }
      setTransactionAmount('');
      setShowTransaction(false);
    } catch (error) {
      console.error('Transaction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountTypeColor = (type) => {
    const colors = {
      'Checking': 'text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900',
      'Savings': 'text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900',
      'Business': 'text-purple-600 bg-purple-100 dark:text-purple-300 dark:bg-purple-900',
      'Default': 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-900'
    };
    return colors[type] || colors['Default'];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 card-hover">
      {/* Account Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3">
            <BanknotesIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {account.accountType}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccountTypeColor(account.accountType)}`}>
              {account.accountType}
            </span>
          </div>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(account)}
            className="p-2 text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            title="Edit Account"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(account.id)}
            className="p-2 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Delete Account"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Account Information */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Holder</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{account.accountHolder}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Account No</span>
          <span className="text-sm font-mono font-semibold text-gray-900 dark:text-white">{account.accountNumber}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Branch</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{account.branch || 'Main Branch'}</span>
        </div>
        
        <div className="flex justify-between items-center py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg px-3">
          <span className="text-sm font-medium text-green-700 dark:text-green-300">Balance</span>
          <span className="text-xl font-bold text-green-600 dark:text-green-400">{formatCurrency(account.balance)}</span>
        </div>
      </div>

      {/* Transaction Section */}
      {!showTransaction ? (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => {
              setShowTransaction(true);
              setTransactionType('deposit');
            }}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium btn-animate shadow-md hover:shadow-lg"
            disabled={isLoading}
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Deposit</span>
          </button>
          <button
            onClick={() => {
              setShowTransaction(true);
              setTransactionType('withdraw');
            }}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium btn-animate shadow-md hover:shadow-lg"
            disabled={isLoading}
          >
            <ArrowUpTrayIcon className="h-4 w-4" />
            <span>Withdraw</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleTransaction} className="space-y-3 mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {transactionType === 'deposit' ? 'Deposit Amount' : 'Withdraw Amount'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">₹</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                autoFocus
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="submit"
              className={`flex items-center justify-center space-x-2 text-white px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                transactionType === 'deposit'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <span>{transactionType === 'deposit' ? 'Deposit' : 'Withdraw'}</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowTransaction(false);
                setTransactionAmount('');
              }}
              className="flex items-center justify-center space-x-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
              disabled={isLoading}
            >
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onEdit(account)}
          className="flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium border border-blue-200 dark:border-blue-800"
        >
          <PencilIcon className="h-4 w-4" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(account.id)}
          className="flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium border border-red-200 dark:border-red-800"
        >
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default EnhancedAccountCard;
