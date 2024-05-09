const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/company_db')
.then(()=>{console.log('Database connected ...')});

const db = {};

db.User = require('./user.model');
db.Company = require('./company.model')

module.exports = db;