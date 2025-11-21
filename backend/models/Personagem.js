const mongoose = require('mongoose');

const personagemSchema = new mongoose.Schema({}, { strict: false, timestamps: true, collection: 'personagens' });

const Personagem = mongoose.model('Personagem', personagemSchema);
module.exports = Personagem;