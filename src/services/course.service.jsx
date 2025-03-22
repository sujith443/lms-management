import ApiService from './api';
import { API } from '../utils/constants';

/**
 * Course Service for handling course-related operations
 */
class CourseService extends ApiService {
  constructor() {
    super(API.BASE_URL);
  }
  
  /**
   * Get all courses
   * @param {Object} params - Query parameters (e.g., page, limit, search, etc.)
   * @returns {Promise} Courses list
   */
  async getCourses(params = {}) {
    try {
      // Convert params object to URL query string
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      return await this.get(`${API.COURSES.LIST}${query}`);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get a specific course by ID
   * @param {string|number} courseId - Course ID
   * @returns {Promise} Course details
   */
  async getCourse(courseId) {
    try {
      return await this.get(API.COURSES.DETAILS(courseId));
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Create a new course
   * @param {Object} courseData - Course data to create
   * @returns {Promise} Created course
   */
  async createCourse(courseData) {
    try {
      return await this.post(API.COURSES.CREATE, courseData);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Update an existing course
   * @param {string|number} courseId - Course ID
   * @param {Object} courseData - Course data to update
   * @returns {Promise} Updated course
   */
  async updateCourse(courseId, courseData) {
    try {
      return await this.put(API.COURSES.UPDATE(courseId), courseData);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Delete a course
   * @param {string|number} courseId - Course ID
   * @returns {Promise} Deletion response
   */
  async deleteCourse(courseId) {
    try {
      return await this.delete(API.COURSES.DELETE(courseId));
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Enroll in a course
   * @param {string|number} courseId - Course ID
   * @returns {Promise} Enrollment response
   */
  async enrollCourse(courseId) {
    try {
      return await this.post(API.COURSES.ENROLL(courseId));
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get course progress
   * @param {string|number} courseId - Course ID
   * @returns {Promise} Course progress data
   */
  async getCourseProgress(courseId) {
    try {
      return await this.get(API.COURSES.PROGRESS(courseId));
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get course modules
   * @param {string|number} courseId - Course ID
   * @returns {Promise} Course modules
   */
  async getCourseModules(courseId) {
    try {
      return await this.get(`${API.COURSES.DETAILS(courseId)}/modules`);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Create a new module in a course
   * @param {string|number} courseId - Course ID
   * @param {Object} moduleData - Module data
   * @returns {Promise} Created module
   */
  async createModule(courseId, moduleData) {
    try {
      return await this.post(`${API.COURSES.DETAILS(courseId)}/modules`, moduleData);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Update a module
   * @param {string|number} courseId - Course ID
   * @param {string|number} moduleId - Module ID
   * @param {Object} moduleData - Module data
   * @returns {Promise} Updated module
   */
  async updateModule(courseId, moduleId, moduleData) {
    try {
      return await this.put(`${API.COURSES.DETAILS(courseId)}/modules/${moduleId}`, moduleData);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Delete a module
   * @param {string|number} courseId - Course ID
   * @param {string|number} moduleId - Module ID
   * @returns {Promise} Deletion response
   */
  async deleteModule(courseId, moduleId) {
    try {
      return await this.delete(`${API.COURSES.DETAILS(courseId)}/modules/${moduleId}`);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get course announcements
   * @param {string|number} courseId - Course ID
   * @returns {Promise} Course announcements
   */
  async getCourseAnnouncements(courseId) {
    try {
      return await this.get(`${API.COURSES.DETAILS(courseId)}/announcements`);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Create course announcement
   * @param {string|number} courseId - Course ID
   * @param {Object} announcementData - Announcement data
   * @returns {Promise} Created announcement
   */
  async createAnnouncement(courseId, announcementData) {
    try {
      return await this.post(`${API.COURSES.DETAILS(courseId)}/announcements`, announcementData);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get course assignments
   * @param {string|number} courseId - Course ID
   * @returns {Promise} Course assignments
   */
  async getCourseAssignments(courseId) {
    try {
      return await this.get(`${API.COURSES.DETAILS(courseId)}/assignments`);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get students enrolled in a course
   * @param {string|number} courseId - Course ID
   * @param {Object} params - Query parameters
   * @returns {Promise} Enrolled students
   */
  async getCourseStudents(courseId, params = {}) {
    try {
      // Convert params object to URL query string
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      return await this.get(`${API.COURSES.DETAILS(courseId)}/students${query}`);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get student progress in a course
   * @param {string|number} courseId - Course ID
   * @param {string|number} studentId - Student ID
   * @returns {Promise} Student progress data
   */
  async getStudentProgress(courseId, studentId) {
    try {
      return await this.get(`${API.COURSES.DETAILS(courseId)}/students/${studentId}/progress`);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get course materials
   * @param {string|number} courseId - Course ID
   * @returns {Promise} Course materials
   */
  async getCourseMaterials(courseId) {
    try {
      return await this.get(`${API.COURSES.DETAILS(courseId)}/materials`);
    } catch (error) {
      throw error;
    }
  }
}

export default new CourseService();