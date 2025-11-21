const BaseRepository = require('./BaseRepository');
const Hq = require('../models/Hq');

class HqRepository extends BaseRepository {
  constructor() {
    super(Hq);
  }

  async saveHq(hqData) {
    try {
      const filter = { type: 'main_hq' };
      const dataToSave = { ...hqData, type: 'main_hq' };
      return await this.model.findOneAndReplace(filter, dataToSave, { 
        upsert: true, 
        new: true, 
        lean: true 
      });
    } catch (error) {
      throw error;
    }
  }

  async getHq() {
    try {
      return await this.model.findOne({ type: 'main_hq' }).lean();
    } catch (error) {
      throw error;
    }
  }

  async updateHq(updateData) {
    try {
      delete updateData._id;
      delete updateData.type;
      return await this.model.findOneAndUpdate(
        { type: 'main_hq' },
        { $set: updateData },
        { new: true, lean: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteHq() {
    try {
      return await this.model.deleteOne({ type: 'main_hq' });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new HqRepository();