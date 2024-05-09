// db.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const host = process.env.HOST
    const port = process.env.DBPORT
    const dbName = process.env.DBNAME
    const URI = `mongodb://${host}:${port}/${dbName}`;
    // const URI = `mongodb://localhost:/${dbName}`;
    await mongoose.connect(URI);
    console.log('Successfully connected to database');
  } catch (error) {
    console.error('Koneksi error:', error.message);
  }
};

module.exports = connectToDatabase;