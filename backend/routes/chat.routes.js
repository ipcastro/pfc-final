const express = require('express');
const router = express.Router();
const chatController = require('../controllers/ChatController');

// Rotas para logs de acesso do chatbot
router.post('/log', chatController.createLogAcesso);
router.get('/logs', chatController.getLogAcessos);

// Rotas para sessões de chat
router.post('/sessao', chatController.createSessaoChat);
router.get('/sessao/:id', chatController.getSessaoChatById);
router.get('/sessao-id/:sessionId', chatController.getSessaoChatBySessionId);
router.put('/sessao/:sessionId', chatController.updateSessaoChat);
router.delete('/sessao/:sessionId', chatController.deleteSessaoChat);

module.exports = router;