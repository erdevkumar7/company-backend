const mongoose = require('mongoose');
require('dotenv').config()

const companyDB = process.env.DATABASE

mongoose.connect(`mongodb://127.0.0.1:27017/${companyDB}`)
.then(()=>{console.log('Database connected ...')});

const db = {};

db.User = require('./user.model');
db.Company = require('./company.model')

module.exports = db;