const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tiki-restaurant');
    console.log('MongoDB connecté');
  } catch (error) {
    console.error('Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;