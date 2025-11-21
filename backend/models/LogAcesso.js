const mongoose = require('mongoose');
const { getChatConnection } = require('../database/chatDb');

const logAcessoSchema = new mongoose.Schema({
    col_data: String,
    col_hora: String,
    col_IP: String,
    col_nome_bot: String,
    col_acao: String
}, {
    collection: 'tb_cl_user_log_acess',
    timestamps: true
});

// Export function that returns the model when the connection is ready
let LogAcesso;

function getLogAcessoModel() {
  if (!LogAcesso) {
    const chatConnection = getChatConnection();
    LogAcesso = chatConnection.model('LogAcesso', logAcessoSchema);
  }
  return LogAcesso;
}

module.exports = getLogAcessoModel;