/**
 * API endpoints
 */
export const API = {
    BASE_URL: 'https://api.svitlms.edu.in/api/v1',
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh-token',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password'
    },
    USER: {
      PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/profile',
      CHANGE_PASSWORD: '/user/change-password',
      NOTIFICATION_SETTINGS: '/user/notification-settings'
    },
    COURSES: {
      LIST: '/courses',
      DETAILS: (id) => `/courses/${id}`,
      CREATE: '/courses',
      UPDATE: (id) => `/courses/${id}`,
      DELETE: (id) => `/courses/${id}`,
      ENROLL: (id) => `/courses/${id}/enroll`,
      PROGRESS: (id) => `/courses/${id}/progress`
    },
    MATERIALS: {
      LIST: '/materials',
      DETAILS: (id) => `/materials/${id}`,
      UPLOAD: '/materials/upload',
      UPDATE: (id) => `/materials/${id}`,
      DELETE: (id) => `/materials/${id}`,
      DOWNLOAD: (id) => `/materials/${id}/download`
    },
    ASSIGNMENTS: {
      LIST: '/assignments',
      DETAILS: (id) => `/assignments/${id}`,
      CREATE: '/assignments',
      UPDATE: (id) => `/assignments/${id}`,
      DELETE: (id) => `/assignments/${id}`,
      SUBMIT: (id) => `/assignments/${id}/submit`,
      GRADE: (id, submissionId) => `/assignments/${id}/submissions/${submissionId}/grade`
    },
    ANNOUNCEMENTS: {
      LIST: '/announcements',
      DETAILS: (id) => `/announcements/${id}`,
      CREATE: '/announcements',
      UPDATE: (id) => `/announcements/${id}`,
      DELETE: (id) => `/announcements/${id}`
    },
    STUDENTS: {
      LIST: '/students',
      DETAILS: (id) => `/students/${id}`,
      PROGRESS: (id) => `/students/${id}/progress`
    }
  };
  
  /**
   * File upload constraints
   */
  export const UPLOAD = {
    MAX_FILE_SIZE: 200 * 1024 * 1024, // 200MB
    SUPPORTED_IMAGE_FORMATS: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    SUPPORTED_DOCUMENT_FORMATS: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain'
    ],
    SUPPORTED_VIDEO_FORMATS: ['video/mp4', 'video/webm', 'video/ogg'],
    SUPPORTED_AUDIO_FORMATS: ['audio/mpeg', 'audio/ogg', 'audio/wav'],
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_VIDEO_SIZE: 200 * 1024 * 1024, // 200MB
    MAX_AUDIO_SIZE: 50 * 1024 * 1024, // 50MB
    MAX_DOCUMENT_SIZE: 50 * 1024 * 1024 // 50MB
  };
  
  /**
   * Storage keys for localStorage
   */
  export const STORAGE_KEYS = {
    AUTH_TOKEN: 'svit_lms_token',
    REFRESH_TOKEN: 'svit_lms_refresh_token',
    USER: 'svit_lms_user',
    THEME: 'svit_lms_theme',
    LANGUAGE: 'svit_lms_language',
    NOTIFICATION_SETTINGS: 'svit_lms_notification_settings'
  };
  
  /**
   * Pagination defaults
   */
  export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
    DEFAULT_PAGE: 1
  };
  
  /**
   * Time constants in milliseconds
   */
  export const TIME = {
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
    WEEK: 7 * 24 * 60 * 60 * 1000,
    MONTH: 30 * 24 * 60 * 60 * 1000,
    YEAR: 365 * 24 * 60 * 60 * 1000,
    TOKEN_REFRESH_INTERVAL: 15 * 60 * 1000 // 15 minutes
  };
  
  /**
   * User roles
   */
  export const USER_ROLES = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
    GUEST: 'guest'
  };
  
  /**
   * Course status options
   */
  export const COURSE_STATUS = {
    ACTIVE: 'active',
    UPCOMING: 'upcoming',
    COMPLETED: 'completed',
    ARCHIVED: 'archived',
    DRAFT: 'draft'
  };
  
  /**
   * Material types
   */
  export const MATERIAL_TYPES = {
    PDF: 'pdf',
    VIDEO: 'video',
    AUDIO: 'audio',
    DOCUMENT: 'document',
    PRESENTATION: 'presentation',
    LINK: 'link',
    OTHER: 'other'
  };
  
  /**
   * Assignment status options
   */
  export const ASSIGNMENT_STATUS = {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    SUBMITTED: 'submitted',
    LATE_SUBMITTED: 'late_submitted',
    GRADED: 'graded',
    OVERDUE: 'overdue'
  };
  
  /**
   * Notification types
   */
  export const NOTIFICATION_TYPES = {
    ANNOUNCEMENT: 'announcement',
    ASSIGNMENT: 'assignment',
    GRADE: 'grade',
    COMMENT: 'comment',
    SYSTEM: 'system'
  };
  
  /**
   * Color schemes for charts
   */
  export const CHART_COLORS = {
    PRIMARY: [
      '#3f51b5', '#5c6bc0', '#7986cb', '#9fa8da', '#c5cae9'
    ],
    SECONDARY: [
      '#ff6e40', '#ff8a65', '#ffab91', '#ffccbc', '#fbe9e7'
    ],
    SUCCESS: [
      '#66bb6a', '#81c784', '#a5d6a7', '#c8e6c9', '#e8f5e9'
    ],
    INFO: [
      '#29b6f6', '#4fc3f7', '#81d4fa', '#b3e5fc', '#e1f5fe'
    ],
    WARNING: [
      '#ffa726', '#ffb74d', '#ffcc80', '#ffe0b2', '#fff8e1'
    ],
    DANGER: [
      '#ef5350', '#e57373', '#ef9a9a', '#ffcdd2', '#ffebee'
    ]
  };
  
  /**
   * Default settings
   */
  export const DEFAULT_SETTINGS = {
    THEME: 'light',
    LANGUAGE: 'en',
    NOTIFICATION: {
      EMAIL_NOTIFICATIONS: true,
      ASSIGNMENT_REMINDERS: true,
      COURSE_ANNOUNCEMENTS: true,
      GRADE_UPDATES: true,
      DISCUSSION_REPLIES: true,
      SYSTEM_ANNOUNCEMENTS: false
    }
  };