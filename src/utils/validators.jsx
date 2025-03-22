/**
 * Validate an email address
 * @param {string} email - The email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    
    // Simple email regex pattern for basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate a password strength
   * @param {string} password - The password to validate
   * @returns {object} Validation result and strength score
   */
  export const validatePassword = (password) => {
    if (!password) {
      return {
        isValid: false,
        score: 0,
        message: 'Password is required'
      };
    }
    
    let score = 0;
    const messages = [];
    
    // Check length
    if (password.length < 8) {
      messages.push('Password must be at least 8 characters long');
    } else {
      score += 1;
    }
    
    // Check for uppercase letters
    if (!/[A-Z]/.test(password)) {
      messages.push('Password must contain at least one uppercase letter');
    } else {
      score += 1;
    }
    
    // Check for lowercase letters
    if (!/[a-z]/.test(password)) {
      messages.push('Password must contain at least one lowercase letter');
    } else {
      score += 1;
    }
    
    // Check for numbers
    if (!/[0-9]/.test(password)) {
      messages.push('Password must contain at least one number');
    } else {
      score += 1;
    }
    
    // Check for special characters
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      messages.push('Password must contain at least one special character');
    } else {
      score += 1;
    }
    
    return {
      isValid: score >= 4,
      score,
      message: messages.length > 0 ? messages[0] : 'Password is strong'
    };
  };
  
  /**
   * Validate a required field
   * @param {string} value - The field value
   * @param {string} fieldName - The name of the field
   * @returns {object} Validation result
   */
  export const validateRequired = (value, fieldName = 'Field') => {
    const isEmpty = value === undefined || value === null || String(value).trim() === '';
    
    return {
      isValid: !isEmpty,
      message: isEmpty ? `${fieldName} is required` : ''
    };
  };
  
  /**
   * Validate a minimum length
   * @param {string} value - The field value
   * @param {number} minLength - The minimum length required
   * @param {string} fieldName - The name of the field
   * @returns {object} Validation result
   */
  export const validateMinLength = (value, minLength, fieldName = 'Field') => {
    if (!value) {
      return {
        isValid: false,
        message: `${fieldName} is required`
      };
    }
    
    const isValid = String(value).length >= minLength;
    
    return {
      isValid,
      message: isValid ? '' : `${fieldName} must be at least ${minLength} characters long`
    };
  };
  
  /**
   * Validate a maximum length
   * @param {string} value - The field value
   * @param {number} maxLength - The maximum length allowed
   * @param {string} fieldName - The name of the field
   * @returns {object} Validation result
   */
  export const validateMaxLength = (value, maxLength, fieldName = 'Field') => {
    if (!value) {
      return {
        isValid: true,
        message: ''
      };
    }
    
    const isValid = String(value).length <= maxLength;
    
    return {
      isValid,
      message: isValid ? '' : `${fieldName} must be no more than ${maxLength} characters long`
    };
  };
  
  /**
   * Validate a numeric value
   * @param {string|number} value - The field value
   * @param {string} fieldName - The name of the field
   * @returns {object} Validation result
   */
  export const validateNumeric = (value, fieldName = 'Field') => {
    if (value === undefined || value === null || value === '') {
      return {
        isValid: true,
        message: ''
      };
    }
    
    const isValid = !isNaN(Number(value));
    
    return {
      isValid,
      message: isValid ? '' : `${fieldName} must be a number`
    };
  };
  
  /**
   * Validate a phone number
   * @param {string} phone - The phone number to validate
   * @returns {object} Validation result
   */
  export const validatePhone = (phone) => {
    if (!phone) {
      return {
        isValid: true,
        message: ''
      };
    }
    
    // Remove all non-numeric characters
    const cleaned = ('' + phone).replace(/\D/g, '');
    
    // Check if it's a valid length (at least 10 digits)
    const isValid = cleaned.length >= 10;
    
    return {
      isValid,
      message: isValid ? '' : 'Please enter a valid phone number'
    };
  };
  
  /**
   * Validate a date
   * @param {string|Date} date - The date to validate
   * @param {string} fieldName - The name of the field
   * @returns {object} Validation result
   */
  export const validateDate = (date, fieldName = 'Date') => {
    if (!date) {
      return {
        isValid: true,
        message: ''
      };
    }
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const isValid = !isNaN(dateObj.getTime());
    
    return {
      isValid,
      message: isValid ? '' : `Please enter a valid ${fieldName.toLowerCase()}`
    };
  };
  
  /**
   * Validate a URL
   * @param {string} url - The URL to validate
   * @returns {object} Validation result
   */
  export const validateUrl = (url) => {
    if (!url) {
      return {
        isValid: true,
        message: ''
      };
    }
    
    try {
      new URL(url);
      return {
        isValid: true,
        message: ''
      };
    } catch (error) {
      return {
        isValid: false,
        message: 'Please enter a valid URL'
      };
    }
  };
  
  /**
   * Validate a file size
   * @param {File} file - The file to validate
   * @param {number} maxSize - The maximum size in bytes
   * @returns {object} Validation result
   */
  export const validateFileSize = (file, maxSize) => {
    if (!file) {
      return {
        isValid: true,
        message: ''
      };
    }
    
    const isValid = file.size <= maxSize;
    
    return {
      isValid,
      message: isValid ? '' : `File size must be less than ${(maxSize / (1024 * 1024)).toFixed(2)} MB`
    };
  };
  
  /**
   * Validate a file type
   * @param {File} file - The file to validate
   * @param {Array} allowedTypes - Array of allowed MIME types or extensions
   * @returns {object} Validation result
   */
  export const validateFileType = (file, allowedTypes) => {
    if (!file) {
      return {
        isValid: true,
        message: ''
      };
    }
    
    // Check by MIME type
    const isValidMime = allowedTypes.some(type => file.type === type);
    
    // Check by extension if MIME check fails
    const extension = file.name.split('.').pop().toLowerCase();
    const isValidExt = allowedTypes.some(type => type.toLowerCase() === `.${extension}`);
    
    const isValid = isValidMime || isValidExt;
    
    return {
      isValid,
      message: isValid ? '' : 'File type not supported'
    };
  };
  
  /**
   * Run multiple validations and return the first error
   * @param {Array} validations - Array of validation results
   * @returns {object} The first validation error, or valid result
   */
  export const runValidations = (validations) => {
    for (const validation of validations) {
      if (!validation.isValid) {
        return validation;
      }
    }
    
    return { isValid: true, message: '' };
  };