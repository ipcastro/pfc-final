const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// Rota de cadastro
router.post('/register', userController.registerUser);

// Rota de login
router.post('/login', userController.loginUser);

module.exports = router;