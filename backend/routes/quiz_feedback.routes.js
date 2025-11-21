const express = require('express');
const router = express.Router();
const QuizFeedbackController = require('../controllers/QuizFeedbackController');

// Rota para adicionar novo feedback. A autenticação é verificada dentro do controlador.
router.post('/', QuizFeedbackController.addFeedback);

// Rota para verificar se o feedback foi dado para um quiz específico. A autenticação é verificada dentro do controlador.
router.get('/check/:quizId', QuizFeedbackController.checkFeedback);

module.exports = router;
