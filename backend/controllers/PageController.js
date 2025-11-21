const pageService = require('../services/PageService');

exports.getAllPages = async (req, res) => {
  try {
    const pages = await pageService.getAllPages();
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.getPageById = async (req, res) => {
  try {
    const page = await pageService.getPageById(req.params.id);
    res.json(page);
  } catch (error) {
    if (error.message === 'ID inválido') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Página não encontrada') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.createPage = async (req, res) => {
  try {
    const result = await pageService.createPage(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const result = await pageService.updatePage(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    if (error.message === 'ID inválido') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Página não encontrada') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const result = await pageService.deletePage(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === 'ID inválido') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Página não encontrada') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};