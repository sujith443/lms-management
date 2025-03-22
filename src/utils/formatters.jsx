/**
 * Format a date to a readable string
 * @param {string|Date} date - The date to format
 * @param {object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    };
    
    try {
      return dateObj.toLocaleDateString('en-US', defaultOptions);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };
  
  /**
   * Format a datetime to a readable string
   * @param {string|Date} datetime - The datetime to format
   * @param {object} options - Formatting options
   * @returns {string} Formatted datetime string
   */
  export const formatDateTime = (datetime, options = {}) => {
    if (!datetime) return '';
    
    const dateObj = typeof datetime === 'string' ? new Date(datetime) : datetime;
    
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      ...options
    };
    
    try {
      return dateObj.toLocaleString('en-US', defaultOptions);
    } catch (error) {
      console.error('Error formatting datetime:', error);
      return '';
    }
  };
  
  /**
   * Format a file size to a readable string (B, KB, MB, GB)
   * @param {number} bytes - The size in bytes
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted file size
   */
  export const formatFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  /**
   * Format a duration in seconds to a readable string (HH:MM:SS)
   * @param {number} seconds - The duration in seconds
   * @returns {string} Formatted duration
   */
  export const formatDuration = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    const parts = [];
    
    if (hours > 0) {
      parts.push(hours.toString().padStart(2, '0'));
    }
    
    parts.push(minutes.toString().padStart(2, '0'));
    parts.push(remainingSeconds.toString().padStart(2, '0'));
    
    return parts.join(':');
  };
  
  /**
   * Format a number with commas as thousands separators
   * @param {number} number - The number to format
   * @returns {string} Formatted number
   */
  export const formatNumber = (number, options = {}) => {
    if (number === undefined || number === null) return '';
    
    try {
      return number.toLocaleString('en-US', options);
    } catch (error) {
      console.error('Error formatting number:', error);
      return number.toString();
    }
  };
  
  /**
   * Format a percentage
   * @param {number} value - The value to format as percentage
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted percentage
   */
  export const formatPercentage = (value, decimals = 1) => {
    if (value === undefined || value === null) return '';
    
    try {
      return `${value.toFixed(decimals)}%`;
    } catch (error) {
      console.error('Error formatting percentage:', error);
      return `${value}%`;
    }
  };
  
  /**
   * Format a phone number
   * @param {string} phoneNumber - The phone number to format
   * @returns {string} Formatted phone number
   */
  export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    
    // Remove all non-numeric characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    } else if (cleaned.length > 10) {
      return `+${cleaned.substring(0, cleaned.length - 10)} (${cleaned.substring(cleaned.length - 10, cleaned.length - 7)}) ${cleaned.substring(cleaned.length - 7, cleaned.length - 4)}-${cleaned.substring(cleaned.length - 4)}`;
    }
    
    return phoneNumber; // Return original if we can't format it
  };
  
  /**
   * Get relative time string (e.g., "5 minutes ago", "2 days ago")
   * @param {string|Date} date - The date to calculate relative time from
   * @returns {string} Relative time string
   */
  export const getRelativeTimeString = (date) => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffTime = Math.abs(now - dateObj);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        if (diffMinutes === 0) {
          return 'Just now';
        }
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 30) {
      const diffWeeks = Math.floor(diffDays / 7);
      return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
    } else {
      const diffYears = Math.floor(diffDays / 365);
      return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
    }
  };
  
  /**
   * Truncate text with ellipsis if it exceeds the maximum length
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    
    if (text.length <= maxLength) return text;
    
    return text.substring(0, maxLength) + '...';
  };