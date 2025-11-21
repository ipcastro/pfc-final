const contentService = require('../services/ContentService');

exports.getContent = async (req, res) => {
  try {
    const content = await contentService.getContent();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const content = await contentService.updateContent(req.body);
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const result = await contentService.deleteContent();
    res.json({ message: 'Conteúdo excluído com sucesso', result });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.saveContent = async (req, res) => {
  try {
    const content = await contentService.saveContent(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};