const mongoose = require('mongoose');
const userService = require('../../src/services/user')
const Roles = require('../../src/models/roles')

async function initDb() {
  try {
    const mongoURI = 'mongodb://localhost:27017/shop';
    await mongoose.connect(mongoURI);
    console.log('Terhubung ke MongoDB');

    const role = await userService.addRole(
      'Admin'
    )
    if (role) {
      console.log('Role berhasil ditambahkan');
    }

    const admin = await Roles.findOne({ name: "Admin" });

    const user = await userService.addUser({
      name: 'admin',
      username: 'admin',
      email: 'admin@gmail.com',
      role: admin,
      password: 'password',
    })
    if (user) {
      console.log('Admin berhasil ditambahkan');
    }

  } catch (error) {
    console.error('Koneksi error:', error.message);
    process.exit(1);
  }
};

initDb();
