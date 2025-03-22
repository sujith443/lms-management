import ApiService from './api';
import { API, STORAGE_KEYS } from '../utils/constants';

/**
 * Authentication Service for handling user authentication operations
 */
class AuthService extends ApiService {
  constructor() {
    super(API.BASE_URL);
  }
  
  /**
   * Login a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Login response with user data and tokens
   */
  async login(email, password) {
    try {
      const response = await this.post(API.AUTH.LOGIN, { email, password });
      
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      }
      
      if (response.refreshToken) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      }
      
      if (response.user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Registration response
   */
  async register(userData) {
    try {
      const response = await this.post(API.AUTH.REGISTER, userData);
      
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      }
      
      if (response.refreshToken) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      }
      
      if (response.user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Logout the current user
   * @returns {Promise} Logout response
   */
  async logout() {
    try {
      // Call logout API if server needs to invalidate token
      await this.post(API.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      
      return { success: true };
    }
  }
  
  /**
   * Get the current authenticated user
   * @returns {Object|null} User data or null if not authenticated
   */
  getCurrentUser() {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    return userJson ? JSON.parse(userJson) : null;
  }
  
  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated, false otherwise
   */
  isAuthenticated() {
    return !!this.getToken();
  }
  
  /**
   * Check if user has a specific role
   * @param {string} role - The role to check
   * @returns {boolean} True if user has the role, false otherwise
   */
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }
  
  /**
   * Request password reset for a user
   * @param {string} email - User email
   * @returns {Promise} Reset request response
   */
  async forgotPassword(email) {
    try {
      return await this.post(API.AUTH.FORGOT_PASSWORD, { email });
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Reset user password with reset token
   * @param {string} token - Password reset token
   * @param {string} newPassword - New password
   * @returns {Promise} Password reset response
   */
  async resetPassword(token, newPassword) {
    try {
      return await this.post(API.AUTH.RESET_PASSWORD, { token, newPassword });
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Change user password (when already authenticated)
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise} Password change response
   */
  async changePassword(currentPassword, newPassword) {
    try {
      return await this.post(API.USER.CHANGE_PASSWORD, { currentPassword, newPassword });
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Refresh authentication token
   * @returns {Promise} Token refresh response
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    try {
      const response = await this.post(API.AUTH.REFRESH_TOKEN, { refreshToken });
      
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      }
      
      if (response.refreshToken) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      }
      
      return response;
    } catch (error) {
      // If refresh fails, log out the user
      this.logout();
      throw error;
    }
  }
  
  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise} Profile update response
   */
  async updateProfile(profileData) {
    try {
      const response = await this.put(API.USER.UPDATE_PROFILE, profileData);
      
      // Update user in localStorage if successful
      if (response.user) {
        const currentUser = this.getCurrentUser();
        const updatedUser = { ...currentUser, ...response.user };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get user profile
   * @returns {Promise} User profile data
   */
  async getProfile() {
    try {
      const response = await this.get(API.USER.PROFILE);
      
      // Update user in localStorage if different
      if (response.user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Update notification settings
   * @param {Object} settings - Notification settings
   * @returns {Promise} Settings update response
   */
  async updateNotificationSettings(settings) {
    try {
      return await this.put(API.USER.NOTIFICATION_SETTINGS, settings);
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();