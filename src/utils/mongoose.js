// db.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const mongoURI = 'mongodb://localhost:27017/shop';
    await mongoose.connect(mongoURI);
    console.log('Terhubung ke MongoDB');
  } catch (error) {
    console.error('Koneksi error:', error.message);
  }
};

module.exports = connectToDatabase;