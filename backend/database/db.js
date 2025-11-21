// Database connection configuration
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const dbName = process.env.DATABASE_NAME || 'fisica_divertida';

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: dbName,
    });
    console.log(`✅ Conectado ao MongoDB: ${dbName}`);

    mongoose.connection.on('error', err => {
      console.error('❌ Erro na conexão com Mongoose:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ Conexão com MongoDB perdida');
    });

  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };