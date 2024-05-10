const express = require('express');
const { webProtection } = require('../middleware/web.protection');
const { updateCompany } = require('../controllers/company.controller');

const router =  express.Router();

// todo: Copmany Router
router.put("/company/:id", webProtection, updateCompany)

module.exports = router;