const express = require('express');

// Middlewares
const { auth } = require('../middlewares/auth');
const { uploadAvatar } = require('../middlewares/images');

const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/change-avatar', auth, uploadAvatar, userController.change_avatar);

module.exports = router;