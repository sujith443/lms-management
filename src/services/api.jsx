import { STORAGE_KEYS } from '../utils/constants';

/**
 * Base API Service for making HTTP requests
 */
class ApiService {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }
  
  /**
   * Get authentication token from localStorage
   * @returns {string} Token
   */
  getToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
  
  /**
   * Create headers for API request
   * @param {boolean} includeAuth - Whether to include authentication header
   * @returns {Headers} Request headers
   */
  createHeaders(includeAuth = true) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers.append('Authorization', `Bearer ${token}`);
      }
    }
    
    return headers;
  }
  
  /**
   * Make HTTP GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Response
   */
  async get(endpoint, options = {}) {
    const url = this.baseURL + endpoint;
    const headers = this.createHeaders();
    
    const config = {
      method: 'GET',
      headers,
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Make HTTP POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Response
   */
  async post(endpoint, data = {}, options = {}) {
    const url = this.baseURL + endpoint;
    const headers = this.createHeaders();
    
    const config = {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Make HTTP PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Response
   */
  async put(endpoint, data = {}, options = {}) {
    const url = this.baseURL + endpoint;
    const headers = this.createHeaders();
    
    const config = {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Make HTTP PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Response
   */
  async patch(endpoint, data = {}, options = {}) {
    const url = this.baseURL + endpoint;
    const headers = this.createHeaders();
    
    const config = {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Make HTTP DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Response
   */
  async delete(endpoint, options = {}) {
    const url = this.baseURL + endpoint;
    const headers = this.createHeaders();
    
    const config = {
      method: 'DELETE',
      headers,
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Handle successful API response
   * @param {Response} response - Fetch response object
   * @returns {Promise} Parsed response
   */
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (response.ok) {
        return data;
      }
      
      // Handle API errors
      const error = new Error(data.message || 'API Error');
      error.status = response.status;
      error.data = data;
      throw error;
    }
    
    if (response.ok) {
      return response;
    }
    
    // Handle non-JSON errors
    const error = new Error('API Error');
    error.status = response.status;
    throw error;
  }
  
  /**
   * Handle network or other errors
   * @param {Error} error - The error that occurred
   * @throws {Error} The processed error
   */
  handleError(error) {
    // Add any global error handling here
    console.error('API Error:', error);
    
    // Re-throw the error for the calling code to handle
    throw error;
  }
  
  /**
   * Upload a file to the server
   * @param {string} endpoint - API endpoint
   * @param {File} file - The file to upload
   * @param {Object} metadata - Additional metadata to include
   * @param {Function} onProgress - Progress callback function
   * @returns {Promise} Upload response
   */
  async uploadFile(endpoint, file, metadata = {}, onProgress) {
    const url = this.baseURL + endpoint;
    const token = this.getToken();
    
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    
    // Add any metadata
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key]);
    });
    
    return new Promise((resolve, reject) => {
      // Create XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();
      
      // Handle progress events
      if (onProgress && xhr.upload) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(progress);
          }
        };
      }
      
      // Handle completion
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch {
            resolve(xhr.responseText);
          }
        } else {
          try {
            const error = JSON.parse(xhr.responseText);
            reject(new Error(error.message || 'Upload failed'));
          } catch {
            reject(new Error('Upload failed'));
          }
        }
      };
      
      // Handle errors
      xhr.onerror = () => {
        reject(new Error('Network error during upload'));
      };
      
      // Open and send the request
      xhr.open('POST', url, true);
      
      // Add auth token if available
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }
      
      xhr.send(formData);
    });
  }
}

export default ApiService;