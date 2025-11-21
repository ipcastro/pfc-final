const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// Criar novo usuário (apenas admin)
router.post('/', userController.createUser);

// Listar todos os usuários (apenas admin)
router.get('/', userController.getAllUsers);

// Obter usuário específico (apenas admin)
router.get('/:id', userController.getUserById);

// Atualizar usuário (apenas admin)
router.put('/:id', userController.updateUser);

// Excluir usuário (apenas admin)
router.delete('/:id', userController.deleteUser);

module.exports = router;