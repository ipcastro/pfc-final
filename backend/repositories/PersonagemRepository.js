const BaseRepository = require('./BaseRepository');
const Personagem = require('../models/Personagem');
const mongoose = require('mongoose');

class PersonagemRepository extends BaseRepository {
  constructor() {
    super(Personagem);
  }

  async createPersonagem(personagemData) {
    try {
      return await this.model.create(personagemData);
    } catch (error) {
      throw error;
    }
  }

  async getAllPersonagens() {
    try {
      return await this.model.find({});
    } catch (error) {
      throw error;
    }
  }

  async getPersonagemById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      return await this.model.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async updatePersonagem(id, updateData) {
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

  async deletePersonagem(id) {
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

module.exports = new PersonagemRepository();