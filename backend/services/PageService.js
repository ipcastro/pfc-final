const pageRepository = require('../repositories/PageRepository');
const mongoose = require('mongoose');

class PageService {
  async createPage(pageData) {
    try {
      const page = await pageRepository.createPage(pageData);
      return { message: 'Página criada com sucesso', id: page._id };
    } catch (error) {
      throw error;
    }
  }

  async getAllPages() {
    try {
      return await pageRepository.getAllPages();
    } catch (error) {
      throw error;
    }
  }

  async getPageById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      
      const page = await pageRepository.getPageById(id);
      if (!page) {
        throw new Error('Página não encontrada');
      }
      
      return page;
    } catch (error) {
      throw error;
    }
  }

  async updatePage(id, updateData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      
      const result = await pageRepository.updatePage(id, updateData);
      if (result.matchedCount === 0) {
        throw new Error('Página não encontrada');
      }
      
      return { message: 'Página atualizada com sucesso', modifiedCount: result.modifiedCount };
    } catch (error) {
      throw error;
    }
  }

  async deletePage(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      
      const result = await pageRepository.deletePage(id);
      if (result.deletedCount === 0) {
        throw new Error('Página não encontrada');
      }
      
      return { message: 'Página excluída com sucesso' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PageService();