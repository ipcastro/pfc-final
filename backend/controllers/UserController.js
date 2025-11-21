const userService = require('../services/UserService');

// Controller for user registration
exports.registerUser = async (req, res) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    // Handle specific error types
    if (error.message.includes('obrigatório')) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes('cadastrado')) {
      return res.status(400).json({ message: error.message });
    }
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Dados inválidos.', details: errors });
    }
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }
    
    res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
  }
};

// Controller for user login
exports.loginUser = async (req, res) => {
  try {
    const result = await userService.login(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new user (admin)
exports.createUser = async (req, res) => {
  try {
    const result = await userService.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    res.json(user);
  } catch (error) {
    if (error.message === 'ID inválido') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const result = await userService.update(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    if (error.message === 'ID inválido') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Este e-mail já está cadastrado') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const result = await userService.delete(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === 'ID inválido') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};