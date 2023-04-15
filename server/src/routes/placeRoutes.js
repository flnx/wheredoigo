const express = require('express');

// Controllers
const { place_details, add_new_place, post_comment } = require('../controllers/placeController');

// Middlewares
const validateMongoId = require('../middlewares/validateMongoId');
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');
const { checkSession } = require('../middlewares/checkSession');

const router = express.Router();

router.get('/places/:id', validateMongoId, checkSession, place_details);
router.post('/places', auth, upload, add_new_place);
router.post('/places/:id/comment', validateMongoId, auth, post_comment);

module.exports = router;
