const personagemService = require('../services/PersonagemService');

exports.getAllPersonagens = async (req, res) => {
  try {
    const personagens = await personagemService.getAllPersonagens();
    res.json(personagens);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.getPersonagemById = async (req, res) => {
  try {
    const personagem = await personagemService.getPersonagemById(req.params.id);
    res.json(personagem);
  } catch (error) {
    if (error.message === 'ID inválido') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Personagem não encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.createPersonagem = async (req, res) => {
  try {
    const result = await personagemService.createPersonagem(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.updatePersonagem = async (req, res) => {
  try {
    const result = await personagemService.updatePersonagem(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    if (error.message === 'ID inválido') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Personagem não encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.deletePersonagem = async (req, res) => {
  try {
    const result = await personagemService.deletePersonagem(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === 'ID inválido') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Personagem não encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};