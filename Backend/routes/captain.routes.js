const express = require('express');
const router = express.Router();
const { authCaptain } = require('../middleware/auth.middleware')
const { registerCaptain, loginCaptain, captainProfile, captainLogout } = require('../controllers/captain.controller');

router.post('/register', registerCaptain);
router.post('/login', loginCaptain);
router.get('/profile', authCaptain, captainProfile);
router.post('/logout', authCaptain, captainLogout);

module.exports = router;