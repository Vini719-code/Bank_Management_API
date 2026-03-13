import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const EnhancedAccountForm = ({ account, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    accountType: 'Checking',
    accountHolder: '',
    branch: '',
    balance: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (account) {
      setFormData({
        accountNumber: account.accountNumber || '',
        accountType: account.accountType || 'Checking',
        accountHolder: account.accountHolder || '',
        branch: account.branch || '',
        balance: account.balance?.toString() || '',
      });
    }
  }, [account]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }
    
    if (!formData.accountHolder.trim()) {
      newErrors.accountHolder = 'Account holder name is required';
    }
    
    if (!formData.balance || parseFloat(formData.balance) < 0) {
      newErrors.balance = 'Balance must be a valid positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      await onSave({
        ...formData,
        balance: parseFloat(formData.balance)
      });
    } catch (error) {
      console.error('Failed to save account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const accountTypes = ['Checking', 'Savings', 'Business', 'Investment'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-backdrop">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4 modal-content">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {account ? 'Edit Account' : 'Add New Account'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={isLoading}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Account Number */}
          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Account Number *
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.accountNumber 
                  ? 'border-red-300 dark:border-red-600 form-error' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter account number"
              disabled={isLoading}
            />
            {errors.accountNumber && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.accountNumber}</p>
            )}
          </div>

          {/* Account Type */}
          <div>
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Account Type *
            </label>
            <select
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            >
              {accountTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Account Holder */}
          <div>
            <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Account Holder Name *
            </label>
            <input
              type="text"
              id="accountHolder"
              name="accountHolder"
              value={formData.accountHolder}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.accountHolder 
                  ? 'border-red-300 dark:border-red-600 form-error' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter account holder name"
              disabled={isLoading}
            />
            {errors.accountHolder && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.accountHolder}</p>
            )}
          </div>

          {/* Branch */}
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Branch
            </label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter branch name"
              disabled={isLoading}
            />
          </div>

          {/* Initial Balance */}
          <div>
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {account ? 'Current Balance' : 'Initial Balance'} *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">₹</span>
              <input
                type="number"
                id="balance"
                name="balance"
                step="0.01"
                min="0"
                value={formData.balance}
                onChange={handleChange}
                className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                  errors.balance 
                    ? 'border-red-300 dark:border-red-600 form-error' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="0.00"
                disabled={isLoading}
              />
            </div>
            {errors.balance && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.balance}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed btn-animate"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>{account ? 'Updating...' : 'Creating...'}</span>
                </div>
              ) : (
                <span>{account ? 'Update Account' : 'Create Account'}</span>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnhancedAccountForm;
