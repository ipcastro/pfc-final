const hqRepository = require('../repositories/HqRepository');

class HqService {
  async saveHq(hqData) {
    try {
      return await hqRepository.saveHq(hqData);
    } catch (error) {
      throw error;
    }
  }

  async getHq() {
    try {
      return await hqRepository.getHq();
    } catch (error) {
      throw error;
    }
  }

  async updateHq(updateData) {
    try {
      return await hqRepository.updateHq(updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteHq() {
    try {
      return await hqRepository.deleteHq();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new HqService();