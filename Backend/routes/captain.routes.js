const express = require('express');
const router = express.Router();
const { registerCaptain } = require('../controllers/captain.controller');

router.post('/register', registerCaptain);

module.exports = router;