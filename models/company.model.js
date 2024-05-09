const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    company_name: String,
    company_email: { type: String, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
