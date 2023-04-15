const express = require('express');
const validateMongoId = require('../middlewares/validateMongoId');
const placeController = require('../controllers/placeController');
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');
const { checkSession } = require('../middlewares/checkSession');

const router = express.Router();

router.get('/places/:placeId', validateMongoId, checkSession, placeController.place_details);
router.post('/places', auth, upload, placeController.add_new_place);
router.post('/places/:placeId/comment', validateMongoId, auth, placeController.post_comment);

module.exports = router;
