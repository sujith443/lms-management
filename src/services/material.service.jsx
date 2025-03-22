import ApiService from './api';
import { API } from '../utils/constants';

/**
 * Material Service for handling learning material operations
 */
class MaterialService extends ApiService {
  constructor() {
    super(API.BASE_URL);
  }
  
  /**
   * Get all materials
   * @param {Object} params - Query parameters (e.g., page, limit, search, etc.)
   * @returns {Promise} Materials list
   */
  async getMaterials(params = {}) {
    try {
      // Convert params object to URL query string
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      return await this.get(`${API.MATERIALS.LIST}${query}`);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get a specific material by ID
   * @param {string|number} materialId - Material ID
   * @returns {Promise} Material details
   */
  async getMaterial(materialId) {
    try {
      return await this.get(API.MATERIALS.DETAILS(materialId));
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Upload a new material
   * @param {File} file - The file to upload
   * @param {Object} metadata - Material metadata
   * @param {Function} onProgress - Progress callback function
   * @returns {Promise} Upload response
   */
  async uploadMaterial(file, metadata, onProgress) {
    try {
      return await this.uploadFile(API.MATERIALS.UPLOAD, file, metadata, onProgress);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Update material metadata
   * @param {string|number} materialId - Material ID
   * @param {Object} metadata - Material metadata to update
   * @returns {Promise} Updated material
   */
  async updateMaterial(materialId, metadata) {
    try {
      return await this.put(API.MATERIALS.UPDATE(materialId), metadata);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Delete a material
   * @param {string|number} materialId - Material ID
   * @returns {Promise} Deletion response
   */
  async deleteMaterial(materialId) {
    try {
      return await this.delete(API.MATERIALS.DELETE(materialId));
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Download a material
   * @param {string|number} materialId - Material ID
   * @returns {Promise} Download URL or file blob
   */
  async downloadMaterial(materialId) {
    try {
      // First get the download URL or token
      const response = await this.get(API.MATERIALS.DOWNLOAD(materialId));
      
      // If the API returns a direct URL, return it
      if (response.url) {
        return response.url;
      }
      
      // Otherwise, make a request to download the file
      const downloadResponse = await fetch(API.MATERIALS.DOWNLOAD(materialId), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });
      
      // Check if response is ok
      if (!downloadResponse.ok) {
        throw new Error('Download failed');
      }
      
      // Return the blob data
      return await downloadResponse.blob();
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get related materials
   * @param {string|number} materialId - Material ID
   * @returns {Promise} Related materials
   */
  async getRelatedMaterials(materialId) {
    try {
      return await this.get(`${API.MATERIALS.DETAILS(materialId)}/related`);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Mark material as viewed
   * @param {string|number} materialId - Material ID
   * @returns {Promise} View tracking response
   */
  async markAsViewed(materialId) {
    try {
      return await this.post(`${API.MATERIALS.DETAILS(materialId)}/view`);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Update material progress
   * @param {string|number} materialId - Material ID
   * @param {number} progress - Progress percentage (0-100)
   * @returns {Promise} Progress update response
   */
  async updateProgress(materialId, progress) {
    try {
      return await this.post(`${API.MATERIALS.DETAILS(materialId)}/progress`, { progress });
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Toggle star/favorite status of material
   * @param {string|number} materialId - Material ID
   * @param {boolean} starred - Star status (true to star, false to unstar)
   * @returns {Promise} Star update response
   */
  async toggleStar(materialId, starred) {
    try {
      return await this.post(`${API.MATERIALS.DETAILS(materialId)}/star`, { starred });
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get starred materials
   * @param {Object} params - Query parameters
   * @returns {Promise} Starred materials
   */
  async getStarredMaterials(params = {}) {
    try {
      // Convert params object to URL query string
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      return await this.get(`${API.MATERIALS.LIST}/starred${query}`);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Report an issue with a material
   * @param {string|number} materialId - Material ID
   * @param {Object} issueData - Issue details
   * @returns {Promise} Issue report response
   */
  async reportIssue(materialId, issueData) {
    try {
      return await this.post(`${API.MATERIALS.DETAILS(materialId)}/issue`, issueData);
    } catch (error) {
      throw error;
    }
  }
}

export default new MaterialService();