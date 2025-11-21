const BaseRepository = require('./BaseRepository');
const User = require('../models/User');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    try {
      // Include the password field for authentication
      return await this.model.findOne({ email }).select('+password');
    } catch (error) {
      throw error;
    }
  }

  async create(userData) {
    try {
      const user = new this.model(userData);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserRepository();