const contentRepository = require('../repositories/ContentRepository');

class ContentService {
  async saveContent(contentData) {
    try {
      return await contentRepository.saveContent(contentData);
    } catch (error) {
      throw error;
    }
  }

  async getContent() {
    try {
      return await contentRepository.getContent();
    } catch (error) {
      throw error;
    }
  }

  async updateContent(updateData) {
    try {
      return await contentRepository.updateContent(updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteContent() {
    try {
      return await contentRepository.deleteContent();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ContentService();