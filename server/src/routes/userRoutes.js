const express = require('express');

// Middlewares
const { auth } = require('../middlewares/auth');
const { uploadAvatar } = require('../middlewares/images');

const userController = require('../controllers/userController');
const router = express.Router();

router.get('/user/last-activities', auth, userController.get_last_activities);
router.get('/user/favorites', auth, userController.get_user_favorites);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/change-avatar', auth, uploadAvatar, userController.change_avatar);
router.delete('/user/delete', auth, userController.delete_user_account);

module.exports = router;
