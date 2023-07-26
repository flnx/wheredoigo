const express = require('express');

// Middlewares
const { auth } = require('../middlewares/auth');
const { uploadAvatar } = require('../middlewares/images');
const { validateData } = require('../middlewares/dataValidators/validateData');

// YUP Validators
const registerSchema = require('../validators/user/userRegisterSchema');
const loginSchema = require('../validators/user/userLoginSchema');


const userController = require('../controllers/userController');
const router = express.Router();

// -- GET --
router.get(
    '/user/activities', 
    auth, 
    userController.get_last_activities
);

router.get(
    '/user/favorites', 
    auth, 
    userController.get_user_favorites
);


// -- POST --
router.post(
    '/login', 
    validateData(loginSchema),
    userController.login
);

router.post(
    '/register', 
    validateData(registerSchema),
    userController.register
);

// -- PUT --
router.put(
    '/user/avatar', 
    auth, 
    uploadAvatar, 
    userController.change_avatar
);

// -- DELETE --
router.delete(
    '/user/delete', 
    auth, 
    userController.delete_user_account
);

module.exports = router;
