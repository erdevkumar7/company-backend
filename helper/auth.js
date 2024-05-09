const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

// Generate Token
exports.generateToken = async (payload) => {
    const jwt = jsonwebtoken.sign(payload, process.env.SIGNING_KEY)
    return jwt;
}

// Password Hashing
exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

// Password Validation
exports.isValidPassword = async (submittedPassword, storedPassword) => {
    try {
        return await bcrypt.compare(submittedPassword, storedPassword) || false
    }
    catch (e) {
        throw new Error(e)
    }
}
