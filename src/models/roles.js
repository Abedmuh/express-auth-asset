const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
})

const Role = mongoose.model("roles", rolesSchema);

module.exports = Role;