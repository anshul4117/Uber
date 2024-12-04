const express = require('express');
const { registerUser, loginUser, userProfile } = require('../controllers/user.controller');
const { authUser } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', authUser, userProfile);

module.exports = router;