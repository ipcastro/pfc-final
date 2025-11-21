const BaseRepository = require('./BaseRepository');
const Content = require('../models/Content');

class ContentRepository extends BaseRepository {
  constructor() {
    super(Content);
  }

  async saveContent(contentData) {
    try {
      const filter = { type: 'main_content' };
      const dataToSave = { ...contentData, type: 'main_content' };
      return await this.model.findOneAndReplace(filter, dataToSave, { 
        upsert: true, 
        new: true, 
        lean: true 
      });
    } catch (error) {
      throw error;
    }
  }

  async getContent() {
    try {
      return await this.model.findOne({ type: 'main_content' }).lean();
    } catch (error) {
      throw error;
    }
  }

  async updateContent(updateData) {
    try {
      delete updateData._id;
      delete updateData.type;
      return await this.model.findOneAndUpdate(
        { type: 'main_content' },
        { $set: updateData },
        { new: true, lean: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteContent() {
    try {
      return await this.model.deleteOne({ type: 'main_content' });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ContentRepository();