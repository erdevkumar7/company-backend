const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", schema);

module.exports = User;
