const express = require('express');
const placeController = require('../controllers/placeController');
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');

const router = express.Router();

router.get('/places/:placeId', placeController.place_details);
router.post('/places', upload, placeController.add_new_place);
router.post('/places/:placeId/comment', auth, placeController.post_comment);

module.exports = router;
