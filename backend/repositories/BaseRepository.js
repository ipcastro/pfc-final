class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const entity = new this.model(data);
      return await entity.save();
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

  async findAll(query = {}, options = {}) {
    try {
      return await this.model.find(query, null, options);
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

  async findOne(query, options = {}) {
    try {
      return await this.model.findOne(query, null, options);
    } catch (error) {
      throw error;
    }
  }

  async updateOne(query, data, options = {}) {
    try {
      return await this.model.updateOne(query, data, options);
    } catch (error) {
      throw error;
    }
  }

  async deleteMany(query) {
    try {
      return await this.model.deleteMany(query);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseRepository;