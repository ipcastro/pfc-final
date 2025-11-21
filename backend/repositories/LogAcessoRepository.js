const getLogAcessoModel = require('../models/LogAcesso');

class LogAcessoRepository {
  constructor() {
    this.getModel = getLogAcessoModel;
  }

  get model() {
    return this.getModel();
  }

  async create(logData) {
    try {
      return await this.model.create(logData);
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

  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new LogAcessoRepository();