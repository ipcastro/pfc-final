const personagemRepository = require('../repositories/PersonagemRepository');
const mongoose = require('mongoose');

class PersonagemService {
  async createPersonagem(personagemData) {
    try {
      const personagem = await personagemRepository.createPersonagem(personagemData);
      return { message: 'Personagem criado com sucesso', id: personagem._id };
    } catch (error) {
      throw error;
    }
  }

  async getAllPersonagens() {
    try {
      return await personagemRepository.getAllPersonagens();
    } catch (error) {
      throw error;
    }
  }

  async getPersonagemById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      
      const personagem = await personagemRepository.getPersonagemById(id);
      if (!personagem) {
        throw new Error('Personagem não encontrado');
      }
      
      return personagem;
    } catch (error) {
      throw error;
    }
  }

  async updatePersonagem(id, updateData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      
      const result = await personagemRepository.updatePersonagem(id, updateData);
      if (result.matchedCount === 0) {
        throw new Error('Personagem não encontrado');
      }
      
      return { message: 'Personagem atualizado com sucesso', modifiedCount: result.modifiedCount };
    } catch (error) {
      throw error;
    }
  }

  async deletePersonagem(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      
      const result = await personagemRepository.deletePersonagem(id);
      if (result.deletedCount === 0) {
        throw new Error('Personagem não encontrado');
      }
      
      return { message: 'Personagem excluído com sucesso' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PersonagemService();