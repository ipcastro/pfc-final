const BaseRepository = require('./BaseRepository');
const Page = require('../models/Page');
const mongoose = require('mongoose');

class PageRepository extends BaseRepository {
  constructor() {
    super(Page);
  }

  async createPage(pageData) {
    try {
      return await this.model.create(pageData);
    } catch (error) {
      throw error;
    }
  }

  async getAllPages() {
    try {
      return await this.model.find({});
    } catch (error) {
      throw error;
    }
  }

  async getPageById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      return await this.model.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async updatePage(id, updateData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      delete updateData._id;
      return await this.model.updateOne({ _id: id }, { $set: updateData });
    } catch (error) {
      throw error;
    }
  }

  async deletePage(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      return await this.model.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PageRepository();