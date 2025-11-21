const getSessaoChatModel = require('../models/SessaoChat');

class SessaoChatRepository {
  constructor() {
    this.getModel = getSessaoChatModel;
  }

  get model() {
    return this.getModel();
  }

  async create(sessionData) {
    try {
      return await this.model.create(sessionData);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query = {}, options = {}) {
    try {
      return await this.model.find(query, null, options);
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findBySessionId(sessionId) {
    try {
      return await this.model.findOne({ sessionId: sessionId });
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, data) {
    try {
      return await this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
      });
    } catch (error) {
      throw error;
    }
  }

  async updateBySessionId(sessionId, data) {
    try {
      return await this.model.findOneAndUpdate(
        { sessionId: sessionId },
        { $set: data },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteBySessionId(sessionId) {
    try {
      return await this.model.deleteOne({ sessionId: sessionId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new SessaoChatRepository();