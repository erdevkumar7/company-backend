const express = require('express');
const { registration, loginUser, getUserById, updateUser} = require('../controllers/user.controller');
const { webProtection } = require('../middleware/web.protection');

const router =  express.Router();

// Registration and Login Router
router.post("/user", registration);
router.post("/login", loginUser);
router.get("/user/:id", getUserById)
router.put("/user/:id", updateUser)




module.exports = router;