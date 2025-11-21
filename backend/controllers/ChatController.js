const chatService = require('../services/ChatService');

exports.createLogAcesso = async (req, res) => {
  try {
    const log = await chatService.createLogAcesso(req.body);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.getLogAcessos = async (req, res) => {
  try {
    const logs = await chatService.getLogAcessos(req.query);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.createSessaoChat = async (req, res) => {
  try {
    const session = await chatService.createSessaoChat(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.getSessaoChatById = async (req, res) => {
  try {
    const session = await chatService.getSessaoChatById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Sessão de chat não encontrada' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.getSessaoChatBySessionId = async (req, res) => {
  try {
    const session = await chatService.getSessaoChatBySessionId(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Sessão de chat não encontrada' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.updateSessaoChat = async (req, res) => {
  try {
    const session = await chatService.updateSessaoChatBySessionId(req.params.sessionId, req.body);
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.deleteSessaoChat = async (req, res) => {
  try {
    const result = await chatService.deleteSessaoChatBySessionId(req.params.sessionId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};