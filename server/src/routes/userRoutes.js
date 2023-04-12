const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middlewares/auth');
const { uploadAvatar } = require('../middlewares/images');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/change-avatar', auth, uploadAvatar, userController.change_avatar);

module.exports = router;