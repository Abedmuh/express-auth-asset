const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  name: String,
  required: true
})

const Role = mongoose.model("role", rolesSchema);

module.exports = Role;