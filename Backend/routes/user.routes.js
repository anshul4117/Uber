const express = require('express');
const { registerUser, loginUser, userProfile, logoutUser } = require('../controllers/user.controller');
const { authUser } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', authUser, userProfile);
router.post('/logout', authUser, logoutUser);

module.exports = router;