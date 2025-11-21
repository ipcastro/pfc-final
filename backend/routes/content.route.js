const express = require('express');
const router = express.Router();
const contentController = require('../controllers/ContentController');

// Rotas para conteúdo
router.get('/', contentController.getContent);
router.post('/', contentController.saveContent);
router.put('/', contentController.updateContent);
router.delete('/', contentController.deleteContent);

module.exports = router;