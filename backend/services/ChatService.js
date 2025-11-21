const logAcessoRepository = require('../repositories/LogAcessoRepository');
const sessaoChatRepository = require('../repositories/SessaoChatRepository');

class ChatService {
  async createLogAcesso(logData) {
    try {
      return await logAcessoRepository.create(logData);
    } catch (error) {
      throw error;
    }
  }

  async getLogAcessos(query = {}) {
    try {
      return await logAcessoRepository.findAll(query);
    } catch (error) {
      throw error;
    }
  }

  async createSessaoChat(sessionData) {
    try {
      return await sessaoChatRepository.create(sessionData);
    } catch (error) {
      throw error;
    }
  }

  async getSessaoChatById(id) {
    try {
      return await sessaoChatRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getSessaoChatBySessionId(sessionId) {
    try {
      return await sessaoChatRepository.findBySessionId(sessionId);
    } catch (error) {
      throw error;
    }
  }

  async updateSessaoChatBySessionId(sessionId, updateData) {
    try {
      return await sessaoChatRepository.updateBySessionId(sessionId, updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteSessaoChatBySessionId(sessionId) {
    try {
      return await sessaoChatRepository.deleteBySessionId(sessionId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ChatService();