import React, { useState } from 'react';
import { api } from '../services/api';

const AccountCard = ({ account, onAccountUpdate, onAccountDelete }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [editData, setEditData] = useState({ ...account });
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const updatedAccount = await api.depositMoney(account._id, parseFloat(amount));
      onAccountUpdate(updatedAccount);
      setShowDepositModal(false);
      setAmount('');
      alert('Money deposited successfully!');
    } catch (error) {
      alert('Error depositing money: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const updatedAccount = await api.withdrawMoney(account._id, parseFloat(amount));
      onAccountUpdate(updatedAccount);
      setShowWithdrawModal(false);
      setAmount('');
      alert('Money withdrawn successfully!');
    } catch (error) {
      alert('Error withdrawing money: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const updatedAccount = await api.updateAccount(account._id, editData);
      onAccountUpdate(updatedAccount);
      setShowEditModal(false);
      alert('Account updated successfully!');
    } catch (error) {
      alert('Error updating account: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      setLoading(true);
      try {
        await api.deleteAccount(account._id);
        onAccountDelete(account._id);
        alert('Account deleted successfully!');
      } catch (error) {
        alert('Error deleting account: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {account.accountHolderName}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            account.accountType === 'Savings' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
          }`}>
            {account.accountType}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Account No:</span>
            <span className="font-mono text-gray-900 dark:text-white">{account.accountNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Branch:</span>
            <span className="text-gray-900 dark:text-white">{account.branch}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Balance:</span>
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              ₹{account.balance.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowDepositModal(true)}
              className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              Deposit
            </button>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Withdraw
            </button>
            <button
              onClick={() => setShowEditModal(true)}
              className="px-3 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Deposit Money</h3>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleDeposit}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Deposit'}
              </button>
              <button
                onClick={() => { setShowDepositModal(false); setAmount(''); }}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Withdraw Money</h3>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleWithdraw}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Withdraw'}
              </button>
              <button
                onClick={() => { setShowWithdrawModal(false); setAmount(''); }}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Edit Account</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Account Holder Name"
                value={editData.accountHolderName}
                onChange={(e) => setEditData({...editData, accountHolderName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Account Number"
                value={editData.accountNumber}
                onChange={(e) => setEditData({...editData, accountNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <select
                value={editData.accountType}
                onChange={(e) => setEditData({...editData, accountType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
              </select>
              <input
                type="text"
                placeholder="Branch"
                value={editData.branch}
                onChange={(e) => setEditData({...editData, branch: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="Balance"
                value={editData.balance}
                onChange={(e) => setEditData({...editData, balance: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleEdit}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
              <button
                onClick={() => { setShowEditModal(false); setEditData({...account}); }}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountCard;
