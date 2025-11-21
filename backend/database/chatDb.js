// Chat database connection configuration
require('dotenv').config();
const mongoose = require('mongoose');

const chatUri = process.env.MONGODB_URI || 'mongodb+srv://isacastro014:hqTCC3@cluster0.lpltg9p.mongodb.net/';
const chatDbName = 'Chatbot';

async function connectToChatDatabase() {
  const existingConnection = mongoose.connections.find(conn =>
    conn.name === chatDbName && conn.readyState === 1
  );

  if (existingConnection) {
    console.log(`✅ Já conectado ao database de chat: ${chatDbName}`);
    return existingConnection;
  }

  try {
    const chatConnection = await mongoose.createConnection(chatUri, {
      dbName: chatDbName,
    });

    console.log(`✅ Conectado ao MongoDB para chat, database: ${chatDbName}`);

    chatConnection.on('error', err => {
      console.error('❌ Erro na conexão com database de chat:', err);
    });

    chatConnection.on('disconnected', () => {
      console.log('⚠️ Conexão com database de chat perdida');
    });

    return chatConnection;
  } catch (error) {
    console.error("❌ Erro ao conectar ao database de chat:", error);
    throw error;
  }
}

function getChatConnection() {
  const chatConnection = mongoose.connections.find(conn =>
    conn.name === chatDbName && conn.readyState === 1
  );

  if (!chatConnection) {
    throw new Error('Database de chat não conectado');
  }

  return chatConnection;
}

module.exports = {
  connectToChatDatabase,
  getChatConnection,
  chatDbName
};