const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  company_name: {
    type: String,
  },
  company_email: {
    type: String,
    required: true,
    // unique: true,
  },
});

const Company = mongoose.model("company", schema);

module.exports = Company;