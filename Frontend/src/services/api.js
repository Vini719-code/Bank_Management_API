// const API_BASE_URL = 'http://localhost:8000/api/accounts';
const API_BASE_URL = 'https://bank-management-api-5.onrender.com/api/accounts';


export const api = {
  // Get all accounts
  getAllAccounts: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  },

  // Get account by ID
  getAccountById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching account:', error);
      throw error;
    }
  },

  // Create new account
  createAccount: async (accountData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  // Update account
  updateAccount: async (id, accountData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating account:', error);
      throw error;
    }
  },

  // Delete account
  deleteAccount: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  },

  // Deposit money
  depositMoney: async (id, amount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deposit/${id}?amount=${amount}`, {
        method: 'PUT',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error depositing money:', error);
      throw error;
    }
  },

  // Withdraw money
  withdrawMoney: async (id, amount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/withdraw/${id}?amount=${amount}`, {
        method: 'PUT',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error withdrawing money:', error);
      throw error;
    }
  },
};
