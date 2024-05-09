const express = require('express');
const { registration, loginUser} = require('../controllers/user.controller');

const router =  express.Router();

// Registration and Login Router
router.post("/user", registration);
router.post("/login", loginUser);



module.exports = router;