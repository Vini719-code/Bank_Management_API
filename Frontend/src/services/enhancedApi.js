const API_BASE_URL = 'https://bank-management-api-2.onrender.com/api';

class EnhancedApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.cache = new Map();
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  // Request interceptor
  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }

  // Response interceptor
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }

  // Apply request interceptors
  async applyRequestInterceptors(config) {
    let modifiedConfig = config;
    for (const interceptor of this.requestInterceptors) {
      modifiedConfig = await interceptor(modifiedConfig);
    }
    return modifiedConfig;
  }

  // Apply response interceptors
  async applyResponseInterceptors(response) {
    let modifiedResponse = response;
    for (const interceptor of this.responseInterceptors) {
      modifiedResponse = await interceptor(modifiedResponse);
    }
    return modifiedResponse;
  }

  // Enhanced request method with caching, retries, and interceptors
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = `${url}:${JSON.stringify(options)}`;
    
    // Check cache for GET requests
    if (!options.method || options.method === 'GET') {
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey);
        if (Date.now() - cached.timestamp < 60000) { // 1 minute cache
          return cached.data;
        }
      }
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Apply request interceptors
    const finalConfig = await this.applyRequestInterceptors(config);

    // Retry logic
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount <= maxRetries) {
      try {
        const response = await fetch(url, finalConfig);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Apply response interceptors
        const modifiedData = await this.applyResponseInterceptors(data);
        
        // Cache GET requests
        if (!options.method || options.method === 'GET') {
          this.cache.set(cacheKey, {
            data: modifiedData,
            timestamp: Date.now()
          });
        }
        
        return modifiedData;
      } catch (error) {
        retryCount++;
        
        if (retryCount > maxRetries) {
          console.error('API request failed after retries:', error);
          throw error;
        }
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
      }
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Account related methods with enhanced features
  async getAccounts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/accounts?${queryString}` : '/accounts';
    return this.request(endpoint);
  }

  async getAccount(id, includeTransactions = false) {
    const endpoint = includeTransactions 
      ? `/accounts/${id}?include=transactions` 
      : `/accounts/${id}`;
    return this.request(endpoint);
  }

  async createAccount(accountData) {
    const endpoint = '/accounts';
    const response = await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(accountData),
    });
    
    // Clear cache after creating
    this.clearCache();
    return response;
  }

  async updateAccount(id, accountData) {
    const endpoint = `/accounts/${id}`;
    const response = await this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(accountData),
    });
    
    // Clear cache after updating
    this.clearCache();
    return response;
  }

  async deleteAccount(id) {
    const endpoint = `/accounts/${id}`;
    const response = await this.request(endpoint, {
      method: 'DELETE',
    });
    
    // Clear cache after deleting
    this.clearCache();
    return response;
  }

  async deposit(id, amount) {
    const endpoint = `/accounts/deposit/${id}?amount=${amount}`;
    const response = await this.request(endpoint, {
      method: 'PUT',
    });
    
    // Clear cache after transaction
    this.clearCache();
    return response;
  }

  async withdraw(id, amount) {
    const endpoint = `/accounts/withdraw/${id}?amount=${amount}`;
    const response = await this.request(endpoint, {
      method: 'PUT',
    });
    
    // Clear cache after transaction
    this.clearCache();
    return response;
  }

  // Transaction methods
  async getTransactions(accountId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString 
      ? `/accounts/${accountId}/transactions?${queryString}` 
      : `/accounts/${accountId}/transactions`;
    return this.request(endpoint);
  }

  async createTransaction(accountId, transactionData) {
    const endpoint = `/accounts/${accountId}/transactions`;
    const response = await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
    
    this.clearCache();
    return response;
  }

  // User/Profile related methods
  async getProfile() {
    return this.request('/profile');
  }

  async updateProfile(profileData) {
    const endpoint = '/profile';
    const response = await this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    
    // Clear cache after updating profile
    this.cache.clear();
    return response;
  }

  // Authentication methods
  async login(credentials) {
    const endpoint = '/auth/login';
    const response = await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      this.addRequestInterceptor((config) => {
        config.headers.Authorization = `Bearer ${response.token}`;
        return config;
      });
    }
    
    return response;
  }

  async logout() {
    const endpoint = '/auth/logout';
    await this.request(endpoint, {
      method: 'POST',
    });
    
    // Clear token and cache
    localStorage.removeItem('authToken');
    this.cache.clear();
  }

  // Reports and analytics
  async getAccountSummary(accountId, period = 'month') {
    const endpoint = `/accounts/${accountId}/summary?period=${period}`;
    return this.request(endpoint);
  }

  async getBankAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/analytics?${queryString}` : '/analytics';
    return this.request(endpoint);
  }

  // Bulk operations
  async bulkUpdateAccounts(updates) {
    const endpoint = '/accounts/bulk-update';
    const response = await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify({ updates }),
    });
    
    this.clearCache();
    return response;
  }

  async exportAccounts(format = 'csv') {
    const endpoint = `/accounts/export?format=${format}`;
    return this.request(endpoint);
  }

  // Search and filtering
  async searchAccounts(query, filters = {}) {
    const params = new URLSearchParams({ q: query, ...filters });
    const endpoint = `/accounts/search?${params}`;
    return this.request(endpoint);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Utility methods
  async validateAccountNumber(accountNumber) {
    const endpoint = `/accounts/validate-number?number=${accountNumber}`;
    return this.request(endpoint);
  }

  async getAccountTypes() {
    return this.request('/account-types');
  }

  async getBranches() {
    return this.request('/branches');
  }
}

// Create singleton instance
export const enhancedApiService = new EnhancedApiService();

// Add default request interceptor for authentication
const token = localStorage.getItem('authToken');
if (token) {
  enhancedApiService.addRequestInterceptor((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

// Add default response interceptor for error handling
enhancedApiService.addResponseInterceptor(async (response) => {
  // Handle global errors here
  if (response.error) {
    console.error('API Error:', response.error);
    // You could show a toast notification here
  }
  return response;
});

export default enhancedApiService;
