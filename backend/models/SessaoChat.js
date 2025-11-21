const mongoose = require('mongoose');
const { getChatConnection } = require('../database/chatDb');

const sessaoChatSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        default: 'anonimo'
    },
    botId: String,
    startTime: Date,
    endTime: Date,
    messages: [mongoose.Schema.Types.Mixed],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'sessoesChat',
    timestamps: true
});

// Export function that returns the model when the connection is ready
let SessaoChat;

function getSessaoChatModel() {
  if (!SessaoChat) {
    const chatConnection = getChatConnection();
    SessaoChat = chatConnection.model('SessaoChat', sessaoChatSchema);
  }
  return SessaoChat;
}

module.exports = getSessaoChatModel;