const express = require('express');
const router = express.Router();
const personagemController = require('../controllers/PersonagemController');

// Rotas para personagens
router.get('/', personagemController.getAllPersonagens);
router.get('/:id', personagemController.getPersonagemById);
router.post('/', personagemController.createPersonagem);
router.put('/:id', personagemController.updatePersonagem);
router.delete('/:id', personagemController.deletePersonagem);

module.exports = router;